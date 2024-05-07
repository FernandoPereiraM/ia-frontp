import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Recipe } from '../../interface/recipe';
import { RecipeService } from '../../service-api/recipe.service';

@Component({
  selector: 'app-create-recipe',
  templateUrl: './create-recipe.component.html',
  styleUrls: ['./create-recipe.component.css']
})
export class CreateRecipeComponent implements OnInit {

  scontent: string | null = null;
  username: string | null = "";

  ngOnInit() {
    this.scontent = localStorage.getItem('savedRecipe');
    this.username = localStorage.getItem('username');
  }

  recipe: Recipe = {
    id:0,
    name: '',
    description: '',
    content: '',
    username: ''
  };

  constructor(private Router: Router,private recipeService: RecipeService) {}

  submitForm() {
    this.recipe.content = this.scontent || '';
    this.recipe.username = this.username || "";
    this.recipeService.createRecipe(this.recipe).subscribe(
      (response) => {
        console.log('Receta creada exitosamente:', response);
        this.Router.navigate(['/chat']);
      },
      (error) => {
        console.error('Error al crear la receta:', error);
        console.error('Objeto',this.recipe);
      }
    );
  }
}
