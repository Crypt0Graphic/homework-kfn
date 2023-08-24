import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService, BasketService } from '../../services';
import { RouterModule } from '@angular/router';
// Material
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import {MatBadgeModule} from '@angular/material/badge';

@Component({
  selector: 'kfn-header',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatTooltipModule,
    MatBadgeModule
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  private authService = inject(AuthService);
  private basketService = inject(BasketService);

  user = '';
  count = 0;

  ngOnInit() {
    this.user = this.authService.user.getValue();
    this.basketService.basket.subscribe(res => this.count = res.length);
  }

  logout() {
    this.authService.logout();
  }
}
