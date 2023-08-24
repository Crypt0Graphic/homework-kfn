import { CommonModule } from '@angular/common';
import { Component, DestroyRef, Input, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/core/models';
import { BasketService, ProductService } from 'src/app/core/services';

@Component({
  selector: 'kfn-product',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule],
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent {
  private route = inject(ActivatedRoute);
  private destroyRef = inject(DestroyRef);
  private productService = inject(ProductService);
  private basketService = inject(BasketService);

  item!: Product;

  ngOnInit(): void {
    this.get();
  }

  get() {
    // Get Parameter
    const id: string = this.route.snapshot.paramMap.get('id') ?? '0';
    // Call Service
    this.productService
      .get(+id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res) => {
          // console.log(res);
          this.item = res;
        },
        error: (err) => console.error(err),
      });
  }

  addToTheBasket(item: Product){
    this.basketService.add(item);
  }
}
