import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'app/api.service';
import { Employee } from 'app/employee/employee.model';
import { EmployeeService } from 'app/employee/employee.service';
import { Services } from 'app/services/services.model';
import { ServicesService } from 'app/services/services.service';
import { Appointment } from './appointment.model';
import { Customer } from './customer.model';
import { CustomerService } from './customer.service';
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;
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
  totalCustomerPoint: any = 0;
  totalTime: any = 0;
  custAppointment: boolean = false;
  selectCustomer: boolean = false;
  selectedCustId: any;
  totalCustPoint: any[];
  tCustPoint: any = 0;
  constructor(
    private servicesService: ServicesService,
    private employeeService: EmployeeService,
    private customerService: CustomerService,
    private apiService: ApiService,
    private router: Router
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
  getCustomerPoints() {
    this.customerService.getCustAllPoint(this.selectedCustId).subscribe((data: any) => {
      this.totalCustPoint = data;
      this.tCustPoint = 0;
      this.totalCustPoint.forEach(element => {
        if (element.totalcustpoint != undefined) {
          this.tCustPoint = element.totalcustpoint;
        }
      });
    });
  }
  seletedCustomerDetails(data) {
    this.selectedCustId = data.id;
    this.appointmentModel = data;
    this.custAppointment = true;
    this.selectCustomer = true;
    this.getCustomerPoints();
    this.appointmentModel.redeempoints = 0;
  }
  saveAppointmentDetails() {
    this.appointmentModel.lessPoints = 0;
    this.appointmentModel.tCustPoint = this.tCustPoint;
    this.appointmentModel.lessPoints = this.tCustPoint - this.appointmentModel.redeempoints;
    this.appointmentModel.lessPoints = this.appointmentModel.lessPoints + this.appointmentModel.totalpoint;
    this.appointmentModel.selectedService = this.selServiceData;
    this.appointmentModel.emp = this.selectedEmp;
    this.appointmentModel.totalprice = this.totalPrice;
    this.appointmentModel.totalpoint = this.totalPoint;
    this.appointmentModel.totaltime = this.totalTime;
    this.appointmentModel.isactive = true;
    this.appointmentModel.custid = this.appointmentModel.id;
    debugger
    this.customerService.saveAppointmentList(this.appointmentModel).subscribe((data: any) => {
      this.appointment = data;
      this.router.navigate(['dashboard']);
      this.apiService.showNotification('top', 'right', 'Appointment Successfully Booked.', 'success');
    })
  }
  generateInvoicePDF(action = 'open') {
    debugger
    let docDefinition = {
      content: [
        {
          image: 'testImage'
        },

        {
          text: 'Angrez The Salon',
          fontSize: 16,
          alignment: 'center',
          color: '#047886'
        },
        {
          text: 'INVOICE',
          fontSize: 20,
          bold: true,
          alignment: 'center',
          decoration: 'underline',
          color: '#ef8157'
        }, {}, {}, {},
        {
          text: 'Customer Details',
          style: 'sectionHeader'
        },
        {
          columns: [
            [
              {
                text: this.customerModel.fname + '' + this.customerModel.lname,
                bold: true
              },
              // { text: 'Whats App Number:' + this.customerModel.whatsapp },
              // { text: 'Contact Number:' + this.customerModel.contact },
            ],
            [
              // {
              //   text: 'delivery Date: ' + this.Orderview.deliverydate,
              //   alignment: 'right'
              // },
              {
                text: `Bill No : ${((Math.random() * 1000).toFixed(0))}`,
                alignment: 'right'
              }
            ]
          ]
        }, {}, {},
        {
          text: 'Service Details',
          style: 'sectionHeader'
        },
        {
          table: {
            headerRows: 1,
            widths: ['*', 'auto', 'auto'],
            body: [
              ['Service', 'Price', 'Amount'],

              // ([this.customerModel.itemName, this.customerModel.price, this.customerModel.point,]),
              // [{ text: 'Total Amount', colSpan: 3 }, {}, {}, (this.Orderview.productPrice * this.Orderview.quantity).toFixed(2)]
            ]
          }
        },
        {
          columns: [
            // [{ qr: `${this.Orderview.username}`, fit: '50' }],
            [{ text: 'Signature', alignment: 'right', italics: true }],
          ]
        },
        {
          ul: [
            'Order can be return in max 10 days.',
            'Warrenty of the product will be subject to the manufacturer terms and conditions.',
            'This is system generated invoice.',
          ],
        },
      ]
    };
    if (action === 'download') {
      pdfMake.createPdf(docDefinition).download();
    } else if (action === 'print') {
      pdfMake.createPdf(docDefinition).print();
    } else {
      pdfMake.createPdf(docDefinition).open();
    }
  }
  viewCustomerDetails(data) {
    this.totalCustomerPoint = 0;
    this.customerModel = data;
    this.customerService.getViewAppointment(data).subscribe((data1: any) => {
      this.appointment = data1;
      this.appointment.forEach(element => {
        if (element.totalpoint != undefined) {
          this.totalCustomerPoint = this.totalCustomerPoint + element.totalpoint;
        }
      });
    });
  }
  updateCustomerDetails() {
    this.customerService.updateCustomerList(this.customerModel).subscribe((req) => {
      this.getCustomerDetails();
      this.apiService.showNotification('top', 'right', 'Test Link Sent Successfully.', 'success');
    })
  }
  removeCustomerList(id) {
    this.customerService.removeCustomerDetails(id).subscribe((req) => {
      this.apiService.showNotification('top', 'right', 'Standard removed Successfully.', 'success');
      this.getCustomerDetails();

    })
  }


}
