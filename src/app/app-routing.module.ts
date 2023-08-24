import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PublicComponent } from './core/layouts/public/public.component';
import { LoginComponent } from './pages/login/login.component';
import { PrivateComponent } from './core/layouts/private/private.component';
import { authGuard } from './core/guards/auth.guard';
import { ProductsComponent } from './pages/products/products.component';
import { ProductComponent } from './pages/product/product.component';
import { BasketComponent } from './pages/basket/basket.component';

const routes: Routes = [
  {
    path: '',
    component: PrivateComponent,
    canActivate: [authGuard],
    children: [
      { path: '', component: ProductsComponent },
      { path: 'products', component: ProductsComponent },
      { path: 'product/:id', component: ProductComponent },
      { path: 'basket', component: BasketComponent },
    ],
  },
  {
    path: '',
    component: PublicComponent,
    children: [
      {
        path: 'login',
        component: LoginComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
