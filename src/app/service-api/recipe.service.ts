import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Recipe } from '../interface/recipe';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  apiUrl = 'http://127.0.0.1:8000';

  constructor(private http: HttpClient) { }

  // Método para crear una nueva receta
  createRecipe(recipeData: any) {
    return this.http.post(`${this.apiUrl}/recipes/`, recipeData);
  }
  createUser(userData: any) {
    return this.http.post(`${this.apiUrl}/users/`, userData);
  }

  getUserRecipes(username: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/users/${username}/recipes/`);
  }

  getRecipe(recipeId: number): Observable<Recipe> {
    return this.http.get<Recipe>(`${this.apiUrl}/recipes/${recipeId}`);
  }

}
