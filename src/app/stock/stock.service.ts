import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from 'app/api.service';
import { Observable } from 'rxjs';
import { Stock } from './stock.model';

@Injectable({
    providedIn: 'root'
})
export class StockService {

    constructor(
        private httpClient: HttpClient
    ) { }

    saveStockList(admin: Stock): Observable<any> {
        return this.httpClient.post<any>(ApiService.saveStockListURL, admin);
    }
    getAllStockList(): Observable<Stock[]> {
        return this.httpClient.get<any>(ApiService.getAllStockURL);
    }
    removeStockList(id) {
        return this.httpClient.get<any>(ApiService.removeStockListURL + id);
    }
    updateStockList(admin: Stock): Observable<any> {
        return this.httpClient.post<any>(ApiService.updateStockListURL, admin);
    }

}