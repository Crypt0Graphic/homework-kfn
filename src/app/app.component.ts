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
    this.authService.checkUser(false);
  }

}
