import { Component } from '@angular/core';
import { Product } from './models/product.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  imgParent = 'https://picsum.photos/id/15/250';
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

  onLoaded(img: string) {
    console.log(`Image ${img} is loaded from Parent`);
  }
}
