
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from 'app/api.service';
<<<<<<< HEAD
import { Category } from 'app/products/category.model';
import { Products } from 'app/products/product.model';
import { Observable } from 'rxjs';

=======
import { Observable } from 'rxjs';
import { Category } from 'app/Products/category.model';
import { Products } from 'app/Products/product.model';
>>>>>>> 166ff5debb2f2cf6325b2a18b5784c26943b3e8b

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
