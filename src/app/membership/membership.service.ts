
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from 'app/api.service';
import { data } from 'jquery';
import { Observable } from 'rxjs';
import { Appointment } from './membershipappointment.model';
import { Membership } from './membership.model';


@Injectable({
    providedIn: 'root'
})
export class MembershipService {

    constructor(
        private httpClient: HttpClient
    ) { }

    saveMembershipList(admin: Membership): Observable<any> {
        return this.httpClient.post<any>(ApiService.saveMembershipListURL, admin);
    }
    getAllMembershipList(): Observable<Membership[]> {
        return this.httpClient.get<any>(ApiService.getAllMembershipURL);
    }
    saveAppointmentList(admin: Appointment): Observable<any> {
        debugger
        return this.httpClient.post<any>(ApiService.saveAppointmentListURL, admin);
    }
    getAllAppointmentList(): Observable<Appointment[]> {
        return this.httpClient.get<any>(ApiService.getAllAppointmentURL);
    }
    getCompletedServices(): Observable<Appointment[]> {
        return this.httpClient.get<any>(ApiService.getAllCompletedServicesURL);
    }
    getViewAppointment(admin) {
        let data = {
            id: admin.id
        }
        return this.httpClient.post<any>(ApiService.getViewAppointmentURL, data);
    }
    updateMembershipList(admin: Membership): Observable<any> {
        return this.httpClient.post<any>(ApiService.updateMembershipListURL, admin);
    }
    removeMembershipDetails(id) {
        return this.httpClient.get<any>(ApiService.removeMembershipDetailsURL + id);
    }
    getCustAllPoint(id) {
        let data = {
            id: id
        }
        return this.httpClient.post<any>(ApiService.getMembershipTotalPointsURL, data);
    }
    getAllMembershipDataList(id) {
        let data = {
            id: id
        }
        return this.httpClient.post<any>(ApiService.getAllMembershipDataListURL, data);
    }
    getServicesListUsingId(id) {
        let data = {
            id: id
        }
        return this.httpClient.post<any>(ApiService.getUsedServicesByMembershipURL, data);
    }
}
