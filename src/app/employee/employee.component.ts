import { Component, OnInit } from '@angular/core';
import { ApiService } from 'app/api.service';
import { Services } from 'app/services/services.model';
import { ServicesService } from 'app/services/services.service';
import Swal from 'sweetalert2';
import { Employee } from './employee.model';
import { EmployeeService } from './employee.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  public employeeModel: Employee = new Employee;
  public employeeReg: Employee[];
  public servicesList: Services[];
  public updateEmployeeModel: Employee = new Employee;
  serviceData: any = [];
  selServiceData: any = [];
  showEmp: Boolean = false;
  constructor(
    private employeeService: EmployeeService,
    private servicesService: ServicesService,
    private apiService: ApiService
  ) {
    this.getAllServices();
    this.getAllEmployee();
  }

  ngOnInit(): void {
  }
  addEmployee() {
    this.showEmp = true;
  }
  closeEmpForm() {
    this.showEmp = false;
  }

  getAllServices() {
    this.servicesService.getAllServicesList().subscribe((data: any) => {
      this.servicesList = data;
      this.servicesList.forEach(element => {

        let data = {
          itemName: element.name,
          id: element.id,
        }

        this.serviceData.push(data)
      });
    });
  }
  onItemSelect($event) {
    let data = {
      servicesName: $event.itemName,
      servicesId: $event.id,
    }
    this.selServiceData.push(data)
  }

  OnItemDeSelect(item: any) {

    for (let i = 0; i < this.selServiceData.length; i++) {
      if (this.selServiceData[i].servicesId == item.id) {
        this.selServiceData.splice(i, 1);
      }
    }
  }
  onSelectAll(items: any = []) {
    items.forEach(element => {
      let data1 = {
        servicesName: element.itemName,
        servicesId: element.id,
      };
      this.selServiceData.push(data1)
    });

  }
  onDeSelectAll(items: any) {
    this.selServiceData = [];
  }
  saveEmployeeDetail() {
    this.employeeModel.service = this.selServiceData;
    this.employeeModel.isactive = true;
    this.employeeService.saveEmployeeList(this.employeeModel).subscribe((data: any) => {
      this.employeeReg = data;
      this.getAllEmployee();
      location.reload();
      this.apiService.showNotification('top', 'right', 'Employee Added Successfully.', 'success');
    })
  }
  getAllEmployee() {
    this.employeeService.getAllEmployeeList().subscribe((data: any) => {
      this.employeeReg = data;

      for (let i = 0; i < this.employeeReg.length; i++) {
        this.employeeReg[i].index = i + 1;
      }
    });
  }
  viewEmpDetails(data) {

    // this.showEmp = true;
    this.updateEmployeeModel = data;
  }
  removeEmployee(id) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You want to delete! If you delete Employee then all the employee data will be delete.",
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
        this.employeeService.removeEmployeeList(id).subscribe((req) => {
          this.apiService.showNotification('top', 'right', 'Employee removed Successfully.', 'success');

        })
        Swal.fire(
          {
            title: 'Deleted!',
            text: 'Your Employee has been deleted.',
            icon: 'success',
            customClass: {
              confirmButton: "btn btn-success",
            },
            buttonsStyling: false
          }
        )
        this.getAllEmployee();
      }
    })

  }
  updateEmployeeDetails() {

    this.employeeService.updateEmpList(this.updateEmployeeModel).subscribe((req) => {
      this.getAllEmployee();
      this.apiService.showNotification('top', 'right', 'Employee Details Successfully Updated.', 'success');
    })
  }

}
