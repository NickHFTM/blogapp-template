import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnInit {
  title = 'Blog';
  isDarkMode = false;

  ngOnInit(): void {
    const savedTheme = localStorage.getItem('theme');

    this.isDarkMode = savedTheme === 'dark';
    document.documentElement.classList.toggle('dark-theme', this.isDarkMode);
  }

  toggleDarkMode(): void {
    this.isDarkMode = !this.isDarkMode;

    document.documentElement.classList.toggle('dark-theme', this.isDarkMode);
    localStorage.setItem('theme', this.isDarkMode ? 'dark' : 'light');
  }
}
