import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {
  savedUsername = localStorage.getItem('username') ?? 'User';
  constructor(private router: Router) { }

  exit() {
    localStorage.removeItem('username');
    this.router.navigate(['/login']);
  }
}
