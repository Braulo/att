import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'att-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'Frontend';
  public currentTheme: string;

  ngOnInit(): void {
    this.currentTheme = localStorage.getItem('theme') || 'dark-theme';
    this.setTheme(this.currentTheme);
  }

  toggleTheme(): void {
    this.currentTheme === 'light-theme' ? this.setTheme('dark-theme') : this.setTheme('light-theme');
  }

  setTheme(theme: string): void {
    if (this.currentTheme) {
      document.body.classList.remove(this.currentTheme);
    }

    document.body.classList.add(theme);
    localStorage.setItem('theme', theme);
    this.currentTheme = theme;
  }
}
