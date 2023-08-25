import { CommonModule } from '@angular/common';
import { Component, DestroyRef, inject } from '@angular/core';
import { ProductService } from 'src/app/core/services';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatCardModule } from '@angular/material/card';
import { Product } from 'src/app/core/models';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatInputModule } from '@angular/material/input';
import { finalize } from 'rxjs';

@Component({
  selector: 'kfn-products',
  standalone: true,
  imports: [
    SharedModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    RouterModule,
  ],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent {
  private destroyRef = inject(DestroyRef);
  private productService = inject(ProductService);

  loading = false;
  list: Product[] = [];
  searchText = '';

  ngOnInit() {
    this.getList();
  }

  getList() {
    this.loading = true;
    this.productService
      .list()
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        finalize(() => (this.loading = false))
      )
      .subscribe({
        next: (res) => {
          this.list = res;
          // console.log('List:', this.list);
        },
        error: (err) => {
          console.error(err);
        },
      });
  }
}
