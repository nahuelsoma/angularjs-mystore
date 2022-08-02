# Angular Course: Components and Services

This repository contains the project developed in the second part of the Angular course.

The following is a step-by-step description of what was learned in each class.

## Components

### Everything you will learn about components and services in ### Angular

📖 https://angular.io/guide/component-overview

Components are the main building block for Angular applications. Each component consists of:

- An HTML template that declares what renders on the page
- A TypeScript class that defines behavior
- A CSS selector that defines how the component is used in a template
- Optionally, CSS styles applied to the template

### What are components?

The best way to create a component is with the Angular CLI. You can also create a component manually.

To create a component using the Angular CLI:

- From a terminal window, navigate to the directory containing your application.
- Run the comand:

```
ng generate component <component-name>
```

Or in a short statement

```
ng g c <component-name>
```

Where `component-name>` is the name of your component.

By default, this command creates the following:

- A folder named after the component
- A component file, `<component-name>.component.ts`
- A template file, `component-name>.component.html`
- A CSS file, `component-name.component.css`
- A testing specification file, `component-name.component.spec.ts`

By creating a new component using Angular CLI, it automatically generates the import statement of the new module into `app.module.ts` file.

The new module can be incorporated into the main component using its own tag. This tag name is defined into the `<component-name>.component.ts` file.

For example, in this case the selector has the `app-img` tag.

```ts
// src/app/components/img/img.component.ts

import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-img", 👈
  templateUrl: "./img.component.html",
  styleUrls: ["./img.component.scss"],
})
export class ImgComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
```

It can be used into the `app.component.html` by adding the corresponding tag:

```html
<!-- src/app/app.component.html -->

<app-img></app-img>
```

### Using Inputs

Inputs are used for import data from the Father component to the Child component.

The decorator `@Input()` is implemented into the Child's `<component-name>.component.ts` file.

Example:

```ts
// src/app/components/img/img.component.ts

import { Component, OnInit, Input } from '@angular/core';  👈

@Component({
  selector: 'app-img',
  templateUrl: './img.component.html',
  styleUrls: ['./img.component.scss'],
})
export class ImgComponent implements OnInit {
  @Input() img: string = 'img value';  👈

  constructor() {}

  ngOnInit(): void {}
}
```

```html
<!-- src/app/app.component.html -->

<img [src]="img" width="250" *ngIf="img; else elseImg" /> 👈
<ng-template #elseImg>
  <img src="https://picsum.photos/id/1/250" />
</ng-template>
```

The value is defined dinamically with ngModel into the parent html element:

```html
<!-- src/app/app.component.html -->

<input type="text" [(ngModel)]="imgParent" />
<app-img [img]="imgParent"></app-img> 👈
```

```ts
// src/app/app.component.ts

import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  imgParent = 'https://picsum.photos/id/15/250'; 👈
}
```

### Using Outputs

Outputs are used for export data from the Child component to the Father component.

The decorator `@Output()` is implemented into the Child's `<component-name>.component.ts` file. It also needs to import the `@EventEmitter` decorator.

Example:

```ts
// src/app/components/img/img.component.ts

import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core"; 👈

@Component({
  selector: "app-img",
  templateUrl: "./img.component.html",
  styleUrls: ["./img.component.scss"],
})
export class ImgComponent implements OnInit {
  @Input() img: string = "img value";
  defaultImage = "https://picsum.photos/id/1/250";

  @Output() loaded = new EventEmitter<string>();  👈

  constructor() {}

  ngOnInit(): void {}

  imgLoader() {
    console.log(`Image ${this.img} is loaded from Child`);
    this.loaded.emit(this.img); 👈
  }

  imgError() {
    this.img = this.defaultImage;
  }
}
```

```html
<!-- src/app/app.component.html -->

<img
  [src]="img"
  (load)="imgLoader()"
  ☝
  (error)="imgError()"
  width="250"
  *ngIf="img; else elseImg"
/>
<ng-template #elseImg>
  <img [src]="defaultImage" />
</ng-template>
```

`(load)` recieves an event on image succesfull loading, and emit this event. `ingLoader` function recieve this event and excecute the function, where the `loaded` variable emit the info to the Parent component.

Into the Parent component, this data is recieved:

```html
<!-- src/app/app.component.html -->

<input type="text" [(ngModel)]="imgParent" />
<app-img (loaded)="onLoaded($event)" [img]="imgParent"></app-img> 👈
```

```ts
// src/app/app.component.ts

import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  imgParent = 'https://picsum.photos/id/15/250';

  onLoaded(img: string) {
    console.log(`Image ${img} is loaded from Parent`); 👈
  }
}
```

### Component for Product

Use Angular CLI to create a new component

```
ng g c components/product
```

This new component renderize the product box. While in the main app component is used \*ngFor to renderize all objects in an array of products.

### Component lifecycle

```ts
// ../<component-name>.component.ts

import {
  Component,
  OnInit,
  OnChanges,
  AfterViewInit,
  OnDestroy,
} from "@angular/core";

@Component({
  selector: "app-<component-name>",
  templateUrl: "./<component-name>.component.html",
  styleUrls: ["./<component-name>.component.scss"],
})
export class ComponentName
  implements OnInit, OnChanges, AfterViewInit, OnDestroy
{
  constructor() { 👈
    // run before render
    // do not run async functions here
    // it runs only once per component creation
    console.log("constructor", "img value:", this.img);
  }

  ngOnChanges(): void { 👈
    // run before render
    // run many times, once every change occur, it recharges at inputs changes
    // stay listening
    // detect changes here
    console.log("ngOnChanges", "img value:", this.img);
  }

  ngOnInit(): void { 👈
    // run before render
    // run async functions here
    // run only once time at inicialization
    // do not detect changes here
    console.log("ngOnInit", "img value:", this.img);
  }

  ngAfterViewInit(): void { 👈
    // run after render
    // children handler
    console.log("ngAfterViewInit", "img value:", this.img);
  }

  ngOnDestroy(): void { 👈
    // run on component delete
    console.log("ngOnDestroy", "img value:", this.img);
  }
}
```

### ngDestroy &amp; SetInput

Processes that continues running when are destroyed, needs to be stoped.

Example:

```ts
// ../<component-name>.component.ts

export class ComponentName implements OnInit, OnDestroy {
  counter = 0;
  counterFunction: number | undefined;

  ngOnInit(): void {
    this.counterFunction = window.setInterval(() => {
      this.counter += 1;
      console.log("counter running");
    }, 1000);
    // setInterval continues running even if it is destroyed, it needs to be stopped
  }

  ngOnDestroy(): void {
    window.clearInterval(this.counterFunction); // make interval to stop running on destroy
  }
}
```

Changes can be verified with `@SimpleChanges` decorator

```ts
// ../<component-name>.component.ts

  ngOnChanges(changes: SimpleChanges): void {
    console.log('changes', changes);
  }
```

### Product List

Use Angular CLI to create a new component for the products grid

```
ng g c components/products
```

This new component renderize the product grid

Reeorganize components with correct functionality

### Components and Header

Styles has their own scope. It is not possible to change Child components styles from Parent components style files.

For doing this, the global style `/src/styles.scss` is employed.

Use Angular CLI to create a new component for the header

```
ng g c components/nav
```

### Implementing the sideMenu

Add html and css for sidebar menu.

### Parent and child communication

A new button is added into product component to add products to shopping cart. This component is conected to the parent component, products, to send product added data.

Parent component recieve product data and push it into a cart product array. This new array is used to handle the amount, the total price and the list of added products.

## Services

### Understanding services

📖 https://angular.io/tutorial/toh-pt4

Components shouldn't fetch or save data directly and they certainly shouldn't knowingly present fake data. They should focus on presenting data and delegate data access to a service.

Services are a great way to share information among classes that don't know each other.

Use Angular CLI to create a new service

```
ng g s services/store
```

All the operation functions are moved to the service.

To use the service functionality into the component, an import is needed

```ts
// ../<component-name>.component.ts
import { StoreService } from '../../services/store.service'; 👈

  ...

  constructor(private storeService: StoreService) {} 👈

    ...
```

### What is dependency injection?

In software engineering, **singleton** or single instance is a design pattern that restricts the creation of objects belonging to a class or the value of a type to a single object. It is intended to ensure that a class has only one instance and to provide a global access point to it.

If two components import one service, Angular creates only one instance of that service and use it to provide both components.

This injection pattern allow services to import other services, but if service A imports service B, service B can't import service A. Circular injection is not supported.

### Getting data from an API

📖 https://angular.io/guide/http

Most front-end applications need to communicate with a server over the HTTP protocol, to download or upload data and access other back-end services. Angular provides a client HTTP API for Angular applications, the `HttpClient` service class in `@angular/common/http`.

Use Angular CLI to create a new service

```
ng g s services/products
```

Import Http Module in `app.module.ts` file

```ts
// src/app.module.ts

import { HttpClientModule } from '@angular/common/http'; 👈

...

@NgModule({
  declarations: [
    AppComponent,
    ImgComponent,
    ProductComponent,
    ProductsComponent,
    NavComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, HttpClientModule], 👈
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

```

Create http request into the service file. For example:

```ts
// src/app/services/product.service.ts

import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http"; 👈

@Injectable({
  providedIn: "root",
})
export class ProductsService {
  constructor(private http: HttpClient) {} 👈

  getAllProducts() {
    return this.http.get("http://fakestoreapi.com/products"); 👈
  }
}
```

```ts
// src/app/components/products/products.service.ts

import { Component, OnInit } from '@angular/core';

import { Product } from '../../models/product.model';
import { StoreService } from '../../services/store.service';
import { ProductsService } from '../../services/products.service'; 👈

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  myShoppingCart: Product[] = [];
  total: number = 0;
  products: Product[] = []; 👈

  constructor(
    private storeService: StoreService,
    private productsService: ProductsService 👈
  ) {
    this.myShoppingCart = this.storeService.getShoppingCart();
  }
  ngOnInit(): void {
    this.productsService.getAllProducts().subscribe((data) => { 👈
      this.products = data;
    });
  }

  onAddToCart(product: Product) {
    this.storeService.addProduct(product);
    this.total = this.storeService.getTotal();
  }
}

```

The model should match with the data type obtained from the API

```ts
// src/app/models/product.model.ts

export interface Product {
  id: string;
  title: string;
  price: number;
  image: string;
  description: string;
  category: string;
}
```

## Pipes and Directives

### Understanding pipes

### Building your own pipe

### Getting to know directives

## Best Practices

### Basic reactivity

### Angular style guide and linters

```

```
