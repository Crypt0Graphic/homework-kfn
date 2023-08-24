import { Component, inject } from '@angular/core';
// prettier-ignore
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services';
import { environment } from 'src/environments/environment';
import { finalize } from 'rxjs';
// Material
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';

@Component({
  selector: 'kfn-login',
  standalone: true,
  imports: [
    MatCardModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  message = '';
  submitted = false;

  // Injects >= Angular 14
  private formBuilder = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  // Typed Forms >= Angular 14
  form = this.formBuilder.nonNullable.group({
    username: [environment.username, [Validators.required]],
    password: [environment.password, [Validators.required]],
  });

  ngOnInit() {
    this.authService.checkUser(true);
  }

  login() {
    this.message = '';
    this.submitted = true;

    this.authService
      .login(this.form.value)
      .pipe(
        finalize(() => {
          this.submitted = false;
        })
      )
      .subscribe({
        next: (res) => {
          console.log('Oturum Başarıyla Açıldı.');
        },
        error: (err) => {
          console.error(`Error: ${err.error}`);
          // Set Error Message
          this.message = err.error.toString().includes('incorrect')
            ? 'Kullanıcı ve/veya Parola Hatalı!'
            : 'Bilinmeyen Bir Hata Oluştu!';
          // Clear Password
          this.form.controls.password.setValue('');
        },
      });
  }
}
