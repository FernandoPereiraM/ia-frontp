import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Recipe } from '../../interface/recipe';

@Component({
  selector: 'app-saved-recipes',
  templateUrl: './saved-recipes.component.html',
  styleUrls: ['./saved-recipes.component.css']
})
export class SavedRecipesComponent {
  savedRecipes: Recipe[] = [
    { name: 'Recipe 1', date: new Date('2022-04-24'), description: 'Description of Recipe 1' },
    { name: 'Recipe 2', date: new Date('2022-04-25'), description: 'Description of Recipe 2' },
    { name: 'Recipe 3', date: new Date('2022-04-26'), description: 'Description of Recipe 3' }
  ];

  displayedColumns: string[] = ['name', 'date', 'view','delete'];
  dataSource = new MatTableDataSource<Recipe>(this.savedRecipes);

  viewRecipe(recipe: Recipe) {
    // Implement logic to view recipe details
    console.log('Viewing recipe:', recipe);
  }

  delRecipe(recipe: Recipe) {
    // Implement logic to delete recipe details
    console.log('Deleting recipe:', recipe);
  }
}
