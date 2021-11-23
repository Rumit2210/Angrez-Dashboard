import { Component, OnInit } from '@angular/core';
import { ApiService } from 'app/api.service';
import { Services } from './services.model';
import { ServicesService } from './services.service';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent implements OnInit {
  public servicesModel: Services = new Services;
  public servicesList: Services[];
  submitButton: Boolean = false;
  constructor(
    private servicesService: ServicesService,
    private apiService: ApiService
  ) {
    this.getAllServices();
  }

  ngOnInit(): void {
  }
  saveServicesDetail() {
    this.servicesService.saveServiceList(this.servicesModel).subscribe((data: any) => {
      this.servicesList = data;
      location.reload();
      this.getAllServices();
      this.apiService.showNotification('top', 'right', 'Services Added Successfully.', 'success');
    })
  }
  getAllServices() {
    this.servicesService.getAllServicesList().subscribe((data: any) => {
      this.servicesList = data;
      for (let i = 0; i < this.servicesList.length; i++) {
        this.servicesList[i].index = i + 1;
      }
    });
  }
  viewServicesDetails(data) {
    this.servicesModel = data;
    this.submitButton = true;
  }
  cancelUpdateButton() {
    this.submitButton = false;
  }
  updateServicesDetail() {
    this.servicesModel
    this.servicesService.updateServicesList(this.servicesModel).subscribe((req) => {
      this.apiService.showNotification('top', 'right', 'Update Services Successfully.', 'success');
    })
  }
  removeServices(id) {
    this.servicesService.removeServicesList(id).subscribe((req) => {
      this.apiService.showNotification('top', 'right', 'Service removed Successfully.', 'success');
      this.getAllServices();
    })
  }
}
