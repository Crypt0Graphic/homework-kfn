import { Component, inject } from '@angular/core';
// Material
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
// prettier-ignore
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services';
import { environment } from 'src/environments/environment';
import { finalize } from 'rxjs';

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
  submitted = false;

  // Injects >= Angular 14
  private formBuilder = inject(FormBuilder);
  private authService = inject(AuthService);

  // Typed Forms >= Angular 14
  form = this.formBuilder.nonNullable.group({
    username: [environment.username, [Validators.required]],
    password: [environment.password, [Validators.required]],
  });

  login() {
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
          console.log(res);
        },
        error: (err) => {
          console.error('Hata: ' + err);
        },
      });
  }
}
