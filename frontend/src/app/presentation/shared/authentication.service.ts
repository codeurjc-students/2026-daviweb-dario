import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRouteSnapshot, GuardResult, Router, RouterStateSnapshot } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private http = inject(HttpClient);
  private cookies = inject(CookieService);
  private router = inject(Router);
  private apiUrl = `${environment.apiUrl}/auth`;

  token: string = '';

  async login(email: string, password: string) {
    try {
      const response = await firstValueFrom(
        this.http.post<{ token: string; user?: any }>(`${this.apiUrl}/login`, {
          email,
          password,
        })
      );

      const token = response.token;
      this.token = token;
      this.cookies.set('token', token, {
        expires: 1,
        path: '/',
        sameSite: 'Lax',
        secure: false,
      });

      return {
        success: true,
        token: token,
        user: response.user || { email },
      };
    } catch (error: any) {
      console.error('Error al iniciar sesión:', error);
      const message =
        error.error?.message || 'Correo electrónico o contraseña incorrectos.';

      return {
        success: false,
        error: { message },
      };
    }
  }

  getIdToken(): string {
    return this.cookies.get('token') || this.token;
  }

  async logOut(): Promise<void> {
    try {
      this.token = '';
      this.cookies.delete('token', '/');
      this.router.navigate(['']);
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  }

  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<GuardResult> {
    const token = this.getIdToken();
    if (!token) {
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }

  isAuthenticated(): boolean {
    return !!this.getIdToken();
  }
}