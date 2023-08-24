import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Login } from '../models';
import { BehaviorSubject, tap } from 'rxjs';
import jwt_decode from 'jwt-decode';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);

  public user = new BehaviorSubject<any>(null);

  login(data: Login) {
    return this.http.post<any>(`${environment.apiUrl}/auth/login`, data).pipe(
      tap((res) => {
        if (res && res.token) {
          localStorage.setItem('token', res.token);
          this.setUser(res.token);
          this.router.navigate(['/products']);
        }
        return res;
      })
    );
  }

  logout() {
    localStorage.removeItem('token');
    this.setUser(null);
    this.router.navigate(['/login']);
  }

  setUser(token: string | null) {
    if (token) {
      const payload: any = jwt_decode(token);
      this.user.next(payload.user);
    } else {
      this.user.next(null);
    }
  }
}
