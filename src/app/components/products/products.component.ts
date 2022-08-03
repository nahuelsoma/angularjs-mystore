import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

import {
  Product,
  CreateProductDto,
  UpdateProductDto,
} from '../../models/product.model';
import { StoreService } from '../../services/store.service';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  myShoppingCart: Product[] = [];
  total: number = 0;
  products: Product[] = [];
  // today = new Date();
  // date = new Date(2015, 1, 8);
  showProductDetail = false;

  productChosen!: Product;

  limit = 8;
  offset = 0;

  statusDetail: 'loading' | 'success' | 'error' | 'init' = 'init';

  constructor(
    private storeService: StoreService,
    private productsService: ProductsService
  ) {
    this.myShoppingCart = this.storeService.getShoppingCart();
  }

  ngOnInit(): void {
    this.loadMore();
  }

  loadMore() {
    this.productsService
      .getAllProducts(this.limit, this.offset)
      .subscribe((data) => {
        this.products = this.products.concat(data);
        this.offset += this.limit;
      });
  }

  onAddToCart(product: Product) {
    this.storeService.addProduct(product);
    this.total = this.storeService.getTotal();
  }

  toggleProductDetail() {
    this.showProductDetail = !this.showProductDetail;
  }

  onShowDetail(id: string) {
    this.statusDetail = 'loading';
    this.toggleProductDetail();
    this.productsService.getProduct(id).subscribe({
      next: (v) => this.showDetailOk(v),
      error: (e) => this.showDetailError(e),
      complete: () => console.log('complete'),
    });
    //   .subscribe(
    //   (data) => {
    //     this.productChosen = data;
    //     this.statusDetail = 'success';
    //   },
    //   (errorMsg) => {
    //     this.productChosen = errorMsg;
    //     window.alert(errorMsg);
    //     this.statusDetail = 'error';
    //   }
    // );
  }

  showDetailOk(data: Product) {
    this.statusDetail = 'success';
    console.log('Producto obtenido:', data);
    // this.toggleProductDetail();
    this.productChosen = data;
  }

  showDetailError(error: any) {
    this.statusDetail = 'error';
    // this.productChosen = error;
    Swal.fire({
      title: 'Error',
      text: error,
      icon: 'error',
      confirmButtonText: 'ok',
    });
  }

  createNewProduct() {
    const product: CreateProductDto = {
      title: 'The product to be found 513213513541',
      description: 'The product description',
      price: 100,
      images: ['https://placeimg.com/640/480/any'],
      categoryId: 1,
    };
    this.productsService.create(product).subscribe((data) => {
      this.products.unshift(data);
    });
  }

  updateProduct() {
    const changes: UpdateProductDto = {
      title: 'This is the new title',
    };
    const id = this.productChosen.id;
    this.productsService.update(id, changes).subscribe((data) => {
      const productIndex = this.products.findIndex(
        (item) => item.id === this.productChosen.id
      );
      this.products[productIndex] = data;
      this.productChosen = data;
    });
  }

  deleteProduct() {
    const id = this.productChosen.id;
    this.productsService.delete(id).subscribe(() => {
      const productIndex = this.products.findIndex(
        (item) => item.id === this.productChosen.id
      );
      this.products.splice(productIndex, 1);
      this.showProductDetail = false;
    });
  }
}
