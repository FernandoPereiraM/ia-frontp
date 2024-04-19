import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username: string = '';
  isUsernameSaved: boolean = false;

  constructor(private router: Router) {
    const savedUsername = localStorage.getItem('username');
    if (savedUsername) {
      this.username = savedUsername;
      this.isUsernameSaved = true;
    }
  }

  onEnter(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.saveUsername();
      this.router.navigateByUrl('/home');
    }
  }

  saveUsername() {
    if (this.username.trim() !== '') {
      localStorage.setItem('username', this.username.trim());
      this.isUsernameSaved = true;
    }
  }

  clearUsername() {
    localStorage.removeItem('username');
    this.username = '';
    this.isUsernameSaved = false;
  }
}
