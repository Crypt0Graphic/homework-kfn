import { Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatSelectChange, MatSelectModule} from '@angular/material/select';
import { RouterModule } from '@angular/router';
import { orderBy } from 'lodash-es';
import { finalize } from 'rxjs';
import { Product } from 'src/app/core/models';
import { ProductService } from 'src/app/core/services';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
  selector: 'kfn-products',
  standalone: true,
  imports: [
    SharedModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    RouterModule,
    MatSelectModule
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

  onSelectChange(e: MatSelectChange){
    if (e.value === "1") {
      this.list = orderBy(this.list, item => item.price)
    } else {
      this.list = orderBy(this.list, item => item.price, 'desc')
    }

  }
}
