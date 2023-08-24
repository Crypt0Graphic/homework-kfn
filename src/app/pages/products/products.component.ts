import { CommonModule } from '@angular/common';
import { Component, DestroyRef, inject } from '@angular/core';
import { ProductService } from 'src/app/core/services';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatCardModule } from '@angular/material/card';
import { Product } from 'src/app/core/models';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'kfn-products',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, RouterModule],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent {
  private destroyRef = inject(DestroyRef);
  private productService = inject(ProductService);

  list: Product[] = [];

  ngOnInit() {
    this.getList();
  }

  getList() {
    this.productService
      .list()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res) => {
          this.list = res;
          console.log('List:', this.list);
        },
        error: (err) => {
          console.error(err);
        },
      });
  }
}
