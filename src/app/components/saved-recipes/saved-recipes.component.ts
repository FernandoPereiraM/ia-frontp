import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Recipe } from '../../interface/recipe';
import { RecipeService } from '../../service-api/recipe.service';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-saved-recipes',
  templateUrl: './saved-recipes.component.html',
  styleUrls: ['./saved-recipes.component.css'],
})
export class SavedRecipesComponent implements OnInit {
  ngOnInit(): void {
    this.getUserRecipes();
  }
  userRecipes: any[] = [];
  recipeid: string = '';

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private recipeService: RecipeService,
  ) {}

  displayedColumns: string[] = ['name', 'date', 'view', 'delete'];
  dataSource = new MatTableDataSource<Recipe>(this.userRecipes);

  viewRecipe(recipe: Recipe) {
    localStorage.setItem('recipeId', recipe.id.toString());
    this.router.navigate(['/recipe']);
  }

  openConfirmationDialog(recipe: Recipe): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '250px',
      data: { recipeName: recipe.name },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.delRecipe(recipe);
      }
    });
  }

  getUserRecipes(): void {
    const savedUsername = localStorage.getItem('username') ?? 'User';
    this.recipeService.getUserRecipes(savedUsername).subscribe(
      (recipes) => {
        this.userRecipes = recipes;
        console.log(this.userRecipes);
      },
      (error) => {},
    );
  }

  delRecipe(recipe: Recipe) {
    console.log('Deleting recipe:', recipe);
  }
}
