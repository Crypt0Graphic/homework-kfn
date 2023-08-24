import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PublicComponent } from './core/layouts/public/public.component';
import { LoginComponent } from './pages/login/login.component';
import { PrivateComponent } from './core/layouts/private/private.component';
import { ProductsComponent } from './pages/products/products.component';
import { ProductComponent } from './pages/product/product.component';
import { BasketComponent } from './pages/basket/basket.component';
import { authGuard } from './core/guards';

const routes: Routes = [
  {
    path: '',
    component: PublicComponent,
    canActivate: [authGuard],
    children: [
      { path: '', component: ProductsComponent },
      { path: 'products', component: ProductsComponent, title: 'Ürünler' },
      { path: 'product/:id', component: ProductComponent, title: 'Ürün Detay' },
      { path: 'basket', component: BasketComponent, title: 'Sepet' },
    ],
  },
  {
    path: '',
    component: PrivateComponent,
    children: [
      {
        path: 'login',
        component: LoginComponent,
        title: 'Giriş',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
