
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from 'app/api.service';
import { Observable } from 'rxjs';
import { Category } from 'app/Products/category.model';
import { Products } from 'app/Products/product.model';

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
   
}
