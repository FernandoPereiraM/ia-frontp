import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../interface/user';
import { RecipeService } from '../../service-api/recipe.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  username: string = '';
  isUsernameSaved: boolean = false;

  constructor(private router: Router, private recipeService: RecipeService) {
    const savedUsername = localStorage.getItem('username');
    if (savedUsername) {
      this.username = savedUsername;
      this.isUsernameSaved = true;
    }
  }

  onEnter(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.saveUsername();
    }
  }
  // Inicialización del objeto User
  user: User = {
    username: '',
  };

  saveUsername() {
    if (this.username.trim() !== '') {
      localStorage.setItem('username', this.username.trim());
      this.user.username = this.username.trim();
      this.recipeService.createUser(this.user).subscribe(
        (response) => {
          console.log('User Logeado exitosamente:', response);
          this.router.navigateByUrl('/home');
        },
        (error) => {
          console.error('Error:', error);
        }
      );
    }
  }

  clearUsername() {
    localStorage.removeItem('username');
    this.username = '';
    this.isUsernameSaved = false;
  }
}
