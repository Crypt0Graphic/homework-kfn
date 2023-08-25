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
    children: [
      { path: '', component: LoginComponent },
      {
        path: 'login',
        component: LoginComponent,
        title: 'Giriş',
      },
    ],
  },
  {
    path: '',
    component: PrivateComponent,
    canActivate: [authGuard],
    children: [
      { path: 'products', component: ProductsComponent, title: 'Tüm Ürünler' },
      { path: 'product/:id', component: ProductComponent, title: 'Ürün Detay' },
      { path: 'basket', component: BasketComponent, title: 'Sepetim' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
