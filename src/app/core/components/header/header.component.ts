import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
// Material
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AuthService } from '../../services';
import { RouterModule } from '@angular/router';

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
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  
  private authService = inject(AuthService);

  user = '';

  ngOnInit(){
    this.user = this.authService.user.getValue();
  }

  logout() {
    this.authService.logout();
  }
}
