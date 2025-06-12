import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar-component',
  templateUrl: './navbar-component.component.html',
  styleUrl: './navbar-component.component.css'
})
export class NavbarComponentComponent {

  ngAfterViewInit(): void {
    const menuIcon = document.getElementById('menu-icon');
    const navLinks = document.querySelector('.navbar-links');

    menuIcon?.addEventListener('click', () => {
      navLinks?.classList.toggle('show');
    });
  }

}
