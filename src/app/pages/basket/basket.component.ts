import { CommonModule } from '@angular/common';
import { Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { filter, uniqBy } from 'lodash-es';
import { map } from 'rxjs';
import { Product } from 'src/app/core/models';
import { BasketService } from 'src/app/core/services';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'kfn-basket',
  standalone: true,
  imports: [
    CommonModule,
    MatListModule,
    MatCardModule,
    MatButtonModule,
    MatDividerModule,
  ],
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss'],
})
export class BasketComponent {
  private destroyRef = inject(DestroyRef);
  private basketService = inject(BasketService);

  list: Product[] = [];

  ngOnInit() {
    this.getList();
  }

  getList() {
    this.basketService.basket
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        map((items) =>
          items?.map((item: Product) => {
            item.count = filter(items, { id: item.id }).length;
            return item;
          })
        )
      )
      .subscribe({
        next: (res) => {
          this.list = uniqBy(res, (item) => item.id);
        },
        error: (err) => console.error(err),
      });
  }

  deleteAll(){
    this.basketService.deleteAll();
  }
}
