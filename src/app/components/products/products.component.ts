import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  products: Product[] = [
    {
      id: '1',
      name: 'Product 1',
      image: 'https://picsum.photos/id/78/250',
      price: 200,
    },
    {
      id: '2',
      name: 'Product 2',
      image: 'https://picsum.photos/id/79/250',
      price: 85,
    },
    {
      id: '3',
      name: 'Product 3',
      image: 'https://picsum.photos/id/80/250',
      price: 129,
    },
    {
      id: '4',
      name: 'Product 4',
      image: 'https://picsum.photos/id/81/250',
      price: 118,
    },
  ];

  cartProducts: Product[] = [];

  cartTotal: number = 0;

  constructor() {}

  ngOnInit(): void {}

  onAddToCart(product: Product) {
    this.cartProducts.push(product);
    this.cartTotal = this.cartProducts.reduce(
      (sum, item) => sum + item.price,
      0
    );
  }
}
