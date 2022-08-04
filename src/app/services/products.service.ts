import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
  HttpStatusCode,
} from '@angular/common/http';
import { catchError, retry, throwError, map, zip } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import {
  Product,
  CreateProductDto,
  UpdateProductDto,
} from '../models/product.model';
import { environment } from '../../environments/environment';
import { checkTime } from '../interceptors/time.interceptor';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private http: HttpClient) {}

  private apiUrl = `${environment.API_URL}/api`;

  getAllProducts(limit?: number, offset?: number) {
    let params = new HttpParams();
    if (limit && (offset || offset === 0)) {
      params = params.set('limit', limit);
      params = params.set('offset', offset);
    }
    return this.http
      .get<Product[]>(`${this.apiUrl}/products`, {
        params,
        context: checkTime(),
      })
      .pipe(
        retry(3), // retry request 3 times (4 total)
        map((products) =>
          products.map((item) => {
            return {
              ...item,
              taxes: 0.19 * item.price,
            };
          })
        )
      );
  }

  getByCategory(categoryId: string, limit: number, offset: number) {
    let params = new HttpParams();
    if (limit && (offset || offset === 0)) {
      params = params.set('limit', limit);
      params = params.set('offset', offset);
    }
    return this.http.get<Product[]>(
      `${this.apiUrl}/categories/${categoryId}/products`,
      { params }
    );
  }

  // getProductsByPage(limit: number, offset: number) {
  //   return this.http.get<Product[]>(this.apiUrl, {
  //     params: { limit, offset },
  //   });
  // }

  getProduct(id: string) {
    return this.http.get<Product>(`${this.apiUrl}/products/${id}`).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === HttpStatusCode.Conflict) {
          return throwError(() => 'algo esta mal en el server');
        }
        if (error.status === HttpStatusCode.NotFound) {
          return throwError(() => 'no se encuentra el producto capo');
        }
        if (error.status === HttpStatusCode.Conflict) {
          return throwError(() => 'no estas autorizado');
        }
        return throwError(() => 'Ups algo salio mal');
      })
    );
  }

  create(dto: CreateProductDto) {
    return this.http.post<Product>(`${this.apiUrl}/products`, dto);
  }

  update(id: string, dto: UpdateProductDto) {
    return this.http.put<Product>(`${this.apiUrl}/products/${id}`, dto);
  }

  delete(id: string) {
    return this.http.delete<boolean>(`${this.apiUrl}/products/${id}`);
  }

  fetchReadAndUpdate(id: string, dto: UpdateProductDto) {
    return zip(this.getProduct(id), this.update(id, dto));
  }

  fetchReadAndUpdatePromise(id: string, dto: UpdateProductDto) {
    return this.getProduct(id).pipe(
      switchMap((product) => this.update(product.id, dto))
    );
  }
}
