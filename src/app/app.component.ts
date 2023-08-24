import { Component, inject } from '@angular/core';
import { AuthService } from './core/services';

@Component({
  selector: 'kfn-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  private authService = inject(AuthService);

  ngOnInit(){
    this.checkUser();
  }

  checkUser(){
    const token = localStorage.getItem("token");
    if (token) {
      this.authService.setUser(token);
    }
  }

}
