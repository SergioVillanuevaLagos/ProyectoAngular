import { Component } from '@angular/core';
import { Router } from '@angular/router'; 
import { AutenticacionGoogleService } from '../autenticacion-google.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {

  constructor(
    private autenticacionGoogleService: AutenticacionGoogleService,
    private router: Router
  ) { 
  }

  showData() {
    const data = JSON.stringify(this.autenticacionGoogleService.getProfile());
    console.log(data);
  }

  logOut() {
    this.autenticacionGoogleService.logout();
    this.router.navigate(['login']);
 
  }
}
