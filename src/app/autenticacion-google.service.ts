import { Injectable } from '@angular/core';
import { AuthConfig, OAuthService } from 'angular-oauth2-oidc';
import { Router } from '@angular/router';
import { UserService } from './user/user.service';
import { AuthService } from './services/auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class AutenticacionGoogleService {

  constructor(
    private oAuthService: OAuthService,
    private router: Router,
    private userService: UserService,
    private authService: AuthService
  ) { 
    this.initLogin();
  }

  initLogin() {
    const config: AuthConfig = {
      issuer: 'https://accounts.google.com',
      strictDiscoveryDocumentValidation: false,
      clientId: '176637695859-bjmoc0gsne359tjtbo70p6g40c2ti4pk.apps.googleusercontent.com',
      redirectUri: window.location.origin + '/main',
      scope: 'openid profile email',
    }

    this.oAuthService.configure(config);
    this.oAuthService.setupAutomaticSilentRefresh();
    this.oAuthService.loadDiscoveryDocumentAndTryLogin().then(() => {
      if (this.oAuthService.hasValidAccessToken()) {
        const userInfo = this.getProfile();
        if (userInfo) {
          this.processGoogleLogin(userInfo);
        }
      }
    });
  }

  login() {
    this.oAuthService.initLoginFlow();
  }

  logout() {
    this.oAuthService.logOut();
    this.authService.logout(); // Clear local authentication state
  }

  getProfile() {
    return this.oAuthService.getIdentityClaims();
  }

  processGoogleLogin(userInfo: any) {
    // Buscar si el usuario existe por correo electrónico
    this.userService.findUserByEmail(userInfo.email).subscribe({
      next: (response) => {
        if (response.data) {
          // Usuario ya existe, hacer login
          this.authService.login(response.data);
          this.router.navigate(['/']);
        } else {
          // Usuario no existe, guardar datos y redirigir al formulario de completar registro
          localStorage.setItem('googleUserData', JSON.stringify({
            Nombre: userInfo.given_name || '',
            ApellidoPaterno: userInfo.family_name || '',
            Correo: userInfo.email || ''
          }));
          this.router.navigate(['/complete-registration']);
        }
      },
      error: (err) => {
        console.error('Error verificando usuario de Google:', err);
        // En caso de error, redirigir al formulario de completar registro
        localStorage.setItem('googleUserData', JSON.stringify({
          Nombre: userInfo.given_name || '',
          ApellidoPaterno: userInfo.family_name || '',
          Correo: userInfo.email || ''
        }));
        this.router.navigate(['/complete-registration']);
      }
    });
  }
}
