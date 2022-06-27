
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from 'app/api.service';
import { Employee } from 'app/employee/employee.model';
import { Observable } from 'rxjs';
import { Category } from './category.model';
import { Products } from './product.model';
@Injectable({
    providedIn: 'root'
})
export class ProductService {

    constructor(
        private httpClient: HttpClient
    ) { }

    saveProductsList(admin: Products): Observable<any> {
        return this.httpClient.post<any>(ApiService.saveProductsListURL, admin);
    }
    saveCategoryList(admin: Category): Observable<any> {
        return this.httpClient.post<any>(ApiService.saveCategoryListURL, admin);
    }
   
    getAllProductsList(): Observable<Products[]> {
        return this.httpClient.get<any>(ApiService.getAllProductsListURL);
    }
   
    getAllCategoryList(): Observable<Category[]> {
        return this.httpClient.get<any>(ApiService.getAllCategoryListURL);
    }
    removeProductDetails(id) {
        return this.httpClient.get<any>(ApiService.removeProductDetailsURL + id);
    }
    updateProductList(admin: Products): Observable<any[]> {
        return this.httpClient.post<any>(ApiService.updateProductListURL, admin);
    }
    updateCategoryList(admin: Category): Observable<any> {
        return this.httpClient.post<any>(ApiService.updateCategoryListURL, admin);
    }
    
    removeCategoryDetails(id) {
        return this.httpClient.get<any>(ApiService.removeCategoryDetailsURL + id);
    }
    selectUploadImage(img): Observable<any> {
        debugger
        return this.httpClient.post<any>(ApiService.uploadMainImageURL, img);

    }
    selectMultiUploadImage(img): Observable<any> {
        return this.httpClient.post<any>(ApiService.uploadMultiImageURL, img);
    }
    removeOrChanged() {
        return this.httpClient.get<any>(ApiService.removeImageURL);
    }

}
