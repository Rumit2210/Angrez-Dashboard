import { Component, OnInit } from '@angular/core';
import { ApiService } from 'app/api.service';
import Swal from 'sweetalert2';
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
    Swal.fire({
      title: 'Are you sure?',
      text: "You want to delete! If you delete Services then all the Service Price and list will be delete.",
      icon: 'warning',
      showCancelButton: true,
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger',
      },
      confirmButtonText: 'Yes',
      buttonsStyling: false
    }).then((result) => {
      if (result.value == true) {
        this.servicesService.removeServicesList(id).subscribe((req) => {
          this.apiService.showNotification('top', 'right', 'Service removed Successfully.', 'success');

        })
        Swal.fire(
          {
            title: 'Deleted!',
            text: 'Your Service has been deleted.',
            icon: 'success',
            customClass: {
              confirmButton: "btn btn-success",
            },
            buttonsStyling: false
          }
        )
        this.getAllServices();
      }
    })


  }
}
