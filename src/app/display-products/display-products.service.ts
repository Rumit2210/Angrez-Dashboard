
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from 'app/api.service';
import { Category } from 'app/products/category.model';
import { Products } from 'app/products/product.model';
import { Observable } from 'rxjs';
import { Cart } from './cart.model';
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
    getAllImagesList(id) {
        return this.httpClient.get<any>(ApiService.courosalImageURL + id);
    }
    getAllCategoryList(): Observable<Category[]> {
        return this.httpClient.get<any>(ApiService.getAllCategoryListURL);
    }
    saveCartList(admin:Cart): Observable<any> {
        debugger
        return this.httpClient.post<any>(ApiService.saveCartListURL, admin);
    }
    getAllCartList(): Observable<Cart[]> {
        return this.httpClient.get<any>(ApiService.getAllCartListURL);
    }
    getCartListById(id) {
        return this.httpClient.get<any>(ApiService.getCartDataByID + id);
    }
    removeCartDetails(data){
        
        return this.httpClient.post<any>(ApiService.removeCartDetailsURL , data);
    }
    updateCartList(admin: Cart): Observable<any[]> {
        return this.httpClient.post<any>(ApiService.updateCartListURL, admin);
    }
    saveOrderList(admin:Order)
    {
        return this.httpClient.post<any>(ApiService.saveOrderListURL, admin);
    }
    getActiveProductsList(): Observable<Products[]> {
        return this.httpClient.get<any>(ApiService.getActiveProductsURL);
    }
  

}
