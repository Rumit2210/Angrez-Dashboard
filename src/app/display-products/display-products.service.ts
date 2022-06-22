
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from 'app/api.service';
import { Employee } from 'app/employee/employee.model';
import { Observable } from 'rxjs';
import { Category } from 'app/Products/category.model';
import { Products } from 'app/Products/product.model';
import { ImagesModel} from 'app/Products/images.model';


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
