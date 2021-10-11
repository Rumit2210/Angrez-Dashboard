import { Component, OnInit } from '@angular/core';
import { ApiService } from 'app/api.service';
import { Employee } from 'app/employee/employee.model';
import { EmployeeService } from 'app/employee/employee.service';
import { Services } from 'app/services/services.model';
import { ServicesService } from 'app/services/services.service';
import { Appointment } from './appointment.model';
import { Customer } from './customer.model';
import { CustomerService } from './customer.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  public customerModel: Customer = new Customer;
  public appointmentModel: Appointment = new Appointment
  public appointment: Appointment[];
  public appointmentList: Appointment[];
  public customer: Customer[] = [];
  public customerList: Customer[];
  selectedEmp: any;
  empId: any;
  public employeeReg: Employee[];
  public servicesList: Services[];
  selServiceData: any = [];
  serviceData: any = [];
  search: string = '';
  totalPrice: any = 0;
  totalPoint: any = 0;
  totalTime: any = 0;
  custAppointment: boolean = false;
  selectCustomer: boolean = false;
  constructor(
    private servicesService: ServicesService,
    private employeeService: EmployeeService,
    private customerService: CustomerService,
    private apiService: ApiService
  ) {
    this.getAllEmployee();
    this.getAllServices();
    this.getCustomerDetails();
  }

  ngOnInit(): void {
  }
  getAllEmployee() {
    this.employeeService.getAllEmployeeList().subscribe((data: any) => {
      this.employeeReg = data;
    });
  }
  selectEmpList(id) {
    this.empId = id;
    this.employeeReg.forEach(element => {
      if (element.id == id) {
        this.selectedEmp = element.fname + ' ' + element.lname;
      }
    })
  }


  getAllServices() {
    this.servicesService.getAllServicesList().subscribe((data: any) => {
      this.servicesList = data;
      this.servicesList.forEach(element => {

        let data = {
          time: element.time,
          price: element.price,
          point: element.point,
          itemName: element.name,
          id: element.id,
        }

        this.serviceData.push(data)
      });
    });
  }

  onItemSelect($event) {
    let data = {
      time: $event.time,
      price: $event.price,
      point: $event.point,
      itemName: $event.itemName,
      servicesId: $event.id,
    }
    this.selServiceData.push(data);
    debugger
    this.totalPrice = 0;
    this.totalPoint = 0; this.totalTime = 0;
    this.selServiceData.forEach(element => {
      if (element.price != undefined) {
        this.totalPrice = this.totalPrice + element.price;
      }
      if (element.point != undefined) {
        this.totalPoint = this.totalPoint + element.point;
      }
      if (element.time != undefined) {
        this.totalTime = this.totalTime + element.time;
      }
    });
  }

  OnItemDeSelect(item: any) {
    this.totalTime = 0;
    this.totalPoint = 0;
    this.totalPrice = 0;
    for (let i = 0; i < this.selServiceData.length; i++) {
      if (this.selServiceData[i].servicesId == item.id) {
        this.selServiceData.splice(i, 1);
      }
    }
    this.selServiceData.forEach(element => {
      if (element.price != undefined) {
        this.totalPrice = this.totalPrice + element.price;
      }
      if (element.point != undefined) {
        this.totalPoint = this.totalPoint + element.point;
      }
      if (element.time != undefined) {
        this.totalTime = this.totalTime + element.time;
      }
    });



  }
  onSelectAll(items: any = []) {
    items.forEach(element => {
      let data1 = {
        time: element.time,
        price: element.price,
        point: element.point,
        itemName: element.itemName,
        servicesId: element.id,
      }
      this.selServiceData.push(data1);
    });
    this.selServiceData.forEach(element => {
      if (element.price != undefined) {
        this.totalPrice = this.totalPrice + element.price;
      }
      if (element.point != undefined) {
        this.totalPoint = this.totalPoint + element.point;
      }
      if (element.time != undefined) {
        this.totalTime = this.totalTime + element.time;
      }
    });


  }
  onDeSelectAll(items: any) {
    this.selServiceData = [];
    this.totalPrice = 0;
    this.totalPoint = 0;
    this.totalTime = 0;
  }
  removeItem(id) {
    if (this.selServiceData.servicesId == id) {
      this.selServiceData.splice(1);
    }


  }
  totalServicesPrice() {

  }
  saveCustomerDetail() {
    this.customerService.saveCustomerList(this.customerModel).subscribe((data: any) => {
      this.customerList = data;
      this.apiService.showNotification('top', 'right', 'Employee Added Successfully.', 'success');
      this.getCustomerDetails();
    })
  }

  getCustomerDetails() {
    this.customerService.getAllCustomerList().subscribe((data: any) => {
      this.customerList = data;
      this.customer = data;
      for (let i = 0; i < this.customer.length; i++) {
        this.customer[i].index = i + 1;
      }
    });
  }
  searchCustomerList(val) {
    if (this.search == '') {
      this.customer = this.customerList;
    } else {
      this.transform(this.customerList, val);
    }

  }
  transform(customer: Customer[], searchValue: string) {

    this.customer = [];
    customer.forEach(element => {
      if (element.contact.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase())) {
        this.customer.push(element);
      }
      else if (element.whatsapp.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase())) {
        this.customer.push(element);
      }
      else if (element.fname.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase())) {
        this.customer.push(element);
      }
      else if (element.lname.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase())) {
        this.customer.push(element);
      }
    })
  }
  backToCustomer() {
    this.custAppointment = false;
    this.selectCustomer = false;
  }
  seletedCustomerDetails(data) {

    this.appointmentModel = data;
    this.custAppointment = true;
    this.selectCustomer = true;
  }
  saveAppointmentDetails() {
    this.appointmentModel.selectedService = this.selServiceData;
    this.appointmentModel.emp = this.selectedEmp;
    this.appointmentModel.totalprice = this.totalPrice;
    this.appointmentModel.totalpoint = this.totalPoint;
    this.appointmentModel.totaltime = this.totalTime;
    this.appointmentModel.isactive = true;
    this.appointmentModel.custid = this.appointmentModel.id;
    this.customerService.saveAppointmentList(this.appointmentModel).subscribe((data: any) => {
      this.appointment = data;
      this.apiService.showNotification('top', 'right', 'Appointment Successfully Booked.', 'success');
    })
  }

  viewCustomerDetails(data) {
    this.customerModel = data;
    this.customerService.getViewAppointment(data).subscribe((data: any) => {

    });
  }
}
