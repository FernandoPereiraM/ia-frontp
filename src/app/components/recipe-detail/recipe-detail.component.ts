import { Component, OnInit } from '@angular/core';
import { Recipe } from '../../interface/recipe';
import { RecipeService } from '../../service-api/recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe | undefined;
  dataLoaded = false;

  constructor(private recipeService: RecipeService) { }

  ngOnInit(): void {
    this.getRecipeDetails();
  }

  getRecipeDetails(): void {
    const storedRecipeId = localStorage.getItem('recipeId');
    if (storedRecipeId === null) {
        console.error('No se encontró ningún ID de receta en el almacenamiento local');
        return;
    }
    const recipeId = parseInt(storedRecipeId);
    this.recipeService.getRecipe(parseInt(storedRecipeId)).subscribe(
      (recipe) => {
        this.recipe = recipe;
        this.dataLoaded = true;
        console.log(this.recipe);
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }
}


