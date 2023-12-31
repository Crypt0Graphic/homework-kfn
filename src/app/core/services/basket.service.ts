import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../models';

@Injectable({
  providedIn: 'root',
})
export class BasketService {
  basket = new BehaviorSubject<Product[]>([]);

  add(item: Product) {
    localStorage.removeItem('basket');
    const currentBasket: Product[] = this.basket.getValue();
    const newBasket: Product[] = [...currentBasket, item];
    localStorage.setItem('basket', JSON.stringify(newBasket));
    this.basket.next(newBasket);
  }

  deleteAll() {
    localStorage.removeItem('basket');
    this.basket.next([]);
  }

  checkBasket() {
    const lsBAsket = localStorage.getItem('basket');
    if (lsBAsket) {
      this.basket.next(JSON.parse(lsBAsket));
    }
  }
}
