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
      this.apiService.showNotification('top', 'right', 'Services Added Successfully.', 'success');
    })
  }
  getAllServices() {
    debugger
    this.servicesService.getAllServicesList().subscribe((data: any) => {
      this.servicesList = data;
      debugger
      // this.visitorList = data;
      for (let i = 0; i < this.servicesList.length; i++) {
        this.servicesList[i].index = i + 1;
      }
    });
  }
}
