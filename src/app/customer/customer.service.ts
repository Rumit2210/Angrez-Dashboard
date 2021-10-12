
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from 'app/api.service';
import { data } from 'jquery';
import { Observable } from 'rxjs';
import { Appointment } from './appointment.model';
import { Customer } from './customer.model';

@Injectable({
    providedIn: 'root'
})
export class CustomerService {

    constructor(
        private httpClient: HttpClient
    ) { }

    saveCustomerList(admin: Customer): Observable<any> {
        return this.httpClient.post<any>(ApiService.saveCustomerListURL, admin);
    }
    getAllCustomerList(): Observable<Customer[]> {
        return this.httpClient.get<any>(ApiService.getAllCustomerURL);
    }
    saveAppointmentList(admin: Appointment): Observable<any> {
        return this.httpClient.post<any>(ApiService.saveAppointmentListURL, admin);
    }
    getAllAppointmentList(): Observable<Appointment[]> {
        return this.httpClient.get<any>(ApiService.getAllAppointmentURL);
    }
    getViewAppointment(admin) {
        let data = {
            id: admin.id
        }
        return this.httpClient.post<any>(ApiService.getViewAppointmentURL, data);
    }
    getDailyTotalList(): Observable<Customer[]> {
        return this.httpClient.get<any>(ApiService.getDailyTotalURL);
    }
    getMonthlyTotalList(): Observable<Customer[]> {
        return this.httpClient.get<any>(ApiService.getMonthlyTotalURL);
    }
    updateCustomerList(admin: Customer): Observable<any> {
        return this.httpClient.post<any>(ApiService.updateCustomerListURL, admin);
    }
    removeCustomerDetails(id) {
        return this.httpClient.get<any>(ApiService.removeCustomerDetailsURL + id);
    }
    updateActiveStatusList(admin: Appointment): Observable<any> {
        return this.httpClient.post<any>(ApiService.updateActiveStatusURL, admin);
    }
}
