
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from 'app/api.service';
import { Employee } from 'app/employee/employee.model';
import { Observable } from 'rxjs';
import { Cart } from './cart.model';
import { Category } from 'app/products/category.model';
import { Products } from 'app/products/product.model';
import { Order } from './order.model';
@Injectable({
    providedIn: 'root'
})
export class ProductService {

    constructor(
        private httpClient: HttpClient
    ) { }

   
    getAllProductsList(): Observable<Products[]> {
        return this.httpClient.get<any>(ApiService.getAllProductsListURL);
    }
   
    getAllCategoryList(): Observable<Category[]> {
        return this.httpClient.get<any>(ApiService.getAllCategoryListURL);
    }
    saveCartList(admin:Cart): Observable<any> {
        return this.httpClient.post<any>(ApiService.saveCartListURL, admin);
    }
    getAllCartList(): Observable<Cart[]> {
        debugger
        return this.httpClient.get<any>(ApiService.getAllCartListURL);
    }
    removeCartDetails(id){
        let data={id:id}
        return this.httpClient.post<any>(ApiService.removeCartDetailsURL , data);
    }
    updateCartList(admin: Cart): Observable<any[]> {
        return this.httpClient.post<any>(ApiService.updateCartListURL, admin);
    }
    saveOrderList(admin:Order)
    {
        return this.httpClient.post<any>(ApiService.saveOrderListURL, admin);
    }
  

}
