import { Component, inject } from '@angular/core';
import { AuthService, BasketService } from './core/services';

@Component({
  selector: 'kfn-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  private authService = inject(AuthService);
  private basketService = inject(BasketService);

  ngOnInit(){
    this.authService.checkUser(false);
    this.basketService.checkBasket();
  }

}
