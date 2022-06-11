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
import Swal from 'sweetalert2';

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
  selectedServ: any;
  servId: any;
  public employeeReg: Employee[];
  public servicesList: Services[];
  serviceData: any = [];
  search: string = '';
  totalPrice: any = 0;
  totalPoint: any = 0;
  totalCustomerPoint: any = 0;
  totalTime: any = 0;
  custAppointment: boolean = false;
  selectCustomer: boolean = false;
  viewCustomerAllData: boolean = false;
  selectedCustId: any;
  totalCustPoint: any[];
  tCustPoint: any = 0;
  customerData: any[];
  usedServices: any[];
  totalRecords: string;
  totalModelRecords: string;
  page: Number = 1;
  modelPage: number = 1;
  totalPriceForDetails: any;
  totalPointForDetails: any;
  addService: any = [];
  valu: 0;
  isDashboard: boolean = false;
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
    if (this.router.routerState.snapshot.url === '/dashboard') {
      this.isDashboard = true;
    }
  }

  ngOnInit(): void {
    this.addService = [{ sertime: null, serpoint: null, serprice: null, name1: this.valu, selectedServ: '', selectedEmp: '', selectedServid: null, selectedEmpid: null }]
    this.valu++;
  }
  addServiceList() {

    this.valu++;
    this.addService.push({ sertime: null, serpoint: null, serprice: null, name1: this.valu, selectedServ: '', selectedEmp: '', selectedServid: null, selectedEmpid: null });
  }
  removeServiceList(valu) {
    this.addService.splice(valu, 1);
    this.addPoinInList();
  }

  getAllEmployee() {
    this.employeeService.getAllEmployeeList().subscribe((data: any) => {
      this.employeeReg = data;
    });
  }
  selectEmpList(id, ind) {
    this.empId = id;
    this.employeeReg.forEach(element => {
      if (element.id == id) {
        this.addService[ind].selectedEmp = element.fname + ' ' + element.lname;
        this.addService[ind].selectedEmpid = id;
      }
    })
  }

  getAllServices() {
    this.servicesService.getAllServicesList().subscribe((data: any) => {
      this.servicesList = data;
    });
  }
  selectServiceList(id, ind) {
    this.servId = id;

    this.servicesList.forEach(element => {
      if (element.id == id) {
        this.addService[ind].selectedServ = element.name;
        this.addService[ind].selectedServid = id;
        this.addService[ind].serprice = element.price;
        this.addService[ind].serpoint = element.point;
        this.addService[ind].sertime = element.time;
        for (let i = 0; i < this.addService.length; i++) {
          this.addService[i].index = i + 1;
        }
        this.addPoinInList();
      }

    })
  }
  addPoinInList() {
    this.totalPoint = 0;
    this.totalPrice = 0;
    this.totalTime = 0;
    this.addService.forEach(element => {
      if (element.serprice != undefined) {
        this.totalPrice = this.totalPrice + element.serprice;
      }
      if (element.serpoint != undefined) {
        this.totalPoint = this.totalPoint + element.serpoint;
      }
      if (element.sertime != undefined) {
        this.totalTime = this.totalTime + element.sertime;
      }
    });
  }

  removeItem(i) {
    this.addService.splice(i, 1);
    this.addPoinInList();
  }

  saveCustomerDetail() {
    this.customerService.saveCustomerList(this.customerModel).subscribe((data: any) => {
      this.customerList = data;
      this.apiService.showNotification('top', 'right', 'Employee Added Successfully.', 'success');
      this.getCustomerDetails();
      location.reload();
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
    this.customerModel = data;
    this.appointmentModel = data;
    this.custAppointment = true;
    this.selectCustomer = true;
    this.getCustomerPoints();
    this.appointmentModel.redeempoints = 0;
  }
  saveAppointmentDetails() {
    this.appointmentModel.lessPoints = 0;
    this.appointmentModel.totalpoint = this.totalPoint;
    this.appointmentModel.tCustPoint = this.tCustPoint;
    this.appointmentModel.lessPoints = this.tCustPoint - this.appointmentModel.redeempoints;
    this.appointmentModel.lessPoints = this.appointmentModel.lessPoints + this.appointmentModel.totalpoint;
    this.appointmentModel.selectedService = this.addService;
    this.appointmentModel.emp = this.selectedEmp;
    this.appointmentModel.totalprice = this.totalPrice;
    this.appointmentModel.totalpoint = this.totalPoint;
    this.appointmentModel.totaltime = this.totalTime;
    this.appointmentModel.isactive = true;
    this.appointmentModel.custid = this.appointmentModel.id;

    if (this.appointmentModel.redeempoints > this.appointmentModel.tCustPoint) {
      this.apiService.showNotification('top', 'right', 'You can not redeem point more than total point.', 'danger');
    }
    else {
      this.customerService.saveAppointmentList(this.appointmentModel).subscribe((data: any) => {
        this.appointment = data;
        this.router.navigate(['dashboard']);
        location.reload();
        this.apiService.showNotification('top', 'right', 'Appointment Successfully Booked.', 'success');
      })
    }


  }
  generateInvoicePDF(customer, service) {
    let docDefinition = {
      pageSize: 'A5',
      footer: function (currentPage, pageCount) {
        return { text: "Page " + currentPage.toString() + ' of ' + pageCount, alignment: 'center', fontSize: 10, margin: [0, 20, 0, 0] }
      },
      info: {
        title: 'Angrez the salon'
      },
      content: [
        {
          columns: [
            {
              image: 'webimg',
              width: 140,
              height: 60,
              alignment: 'left',
              margin: [0, 0, 0, 10],
              color: 'black',
            },
            [
              {
                text: 'Invoice:   Billing',
                bold: true,
                style: 'companydetail'
              },
              {
                text: 'Address:   14-Commerce Complex',
                style: 'companydetail'
              },
              {
                text: 'City: Anand,  State: Gujarat',
                style: 'companydetail'
              },
              {
                text: 'Contact No: +91 942-731-8581',
                style: 'companydetail'
              },

            ]

          ],

        },
        {
          text: ' ',
          margin: [0, 10, 0, 0]
        },
        {
          text: 'Bill to,',
          alignment: 'left',
          margin: [0, 10, 0, 10]
        },
        {
          columns: [
            [
              { text: ('Customer Name:  ' + customer.fname + '  ' + customer.lname), bold: true, style: 'customerdetail' },
              { text: 'Gender:  ' + customer.gender, style: 'customerdetail' },
              { text: 'Email:  ' + customer.email, style: 'customerdetail' },
              { text: 'Contact Number:  ' + customer.contact, style: 'customerdetail' },
            ],
            [,
              {
                text: `Invoice:  ${((Math.random() * 1000).toFixed(0))}`,
                alignment: 'right',
                style: 'customerdetail'
              },
              {
                text: `Date:  ${new Date().toLocaleString()}`,
                alignment: 'right',
                style: 'customerdetail'
              },
            ]
          ]
        },
        {
          text: ' ',
          margin: [0, 10, 0, 0]
        },
        {
          layout: 'headerLineOnly',
          table: {
            headerRows: 1,
            widths: ['auto', '*', '*', 'auto', 'auto'],
            body: [
              [{ text: 'ITEMS', style: 'tablehead' }, { text: 'SERVICE', style: 'tablehead' }, { text: 'EMPLOYEE', style: 'tablehead' }, { text: 'TIME', style: 'tablehead' }, { text: 'PRICE', style: 'tablehead' }],
              ...service.map(p => ([{ text: p.index, style: 'tablecell' }, { text: p.selectedServ, style: 'tablecell' }, { text: p.selectedEmp, style: 'tablecell' }, { text: p.sertime + " min", style: 'tablecell' }, { text: "₹" + p.serprice, style: 'tablecell' }])),
            ]
          }
        },
        {
          columns: [
            [
              { text: 'Terms & Conditions', fontSize: 10, margin: [0, 50, 0, 0] },
              { text: '*  Order can be return in max 10 days.', fontSize: 10, margin: [0, 10, 0, 0] },
              { text: '*  This is system generated invoice.', fontSize: 10 },
              // { text: '*  Warrenty of the product will be subject to the \t manufacturer terms and conditions.',fontSize: 10},

            ],
            [
              { text: 'TOTAL', alignment: 'right', fontSize: 10, margin: [0, 50, 0, 0] },
              { text: "₹" + service.reduce((sum, p) => sum + p.serprice, 0), alignment: 'right', fontSize: 28 }
            ]
          ]
        },
      ],

      images: {
        webimg: 'https://res.cloudinary.com/dfojt5f1l/image/upload/v1654778945/media/keryar/output-onlinepngtools_vysa26.png',
      },
      styles:
      {
        customerdetail: {
          margin: [0, 0, 0, 5],
          fontSize: 10
        },
        companydetail: {
          alignment: 'left',
          margin: [30, 0, 0, 5],
          fontSize: 10
        },
        tablehead: {
          bold: true,
          fontSize: 10,
          alignment: 'center',
        },
        tablecell: {
          margin: [0, 0, 0, 5],
          fontSize: 10,
          alignment: 'center',
        }
      }
    };
    pdfMake.createPdf(docDefinition).open();
    pdfMake.createPdf(docDefinition).download('Angrez_Bill_' + `${new Date().toLocaleString()}` + '.pdf');
    // if (action === 'download') {

    // } else if (action === 'print') {
    //   pdfMake.createPdf(docDefinition).print();
    // } else {
    //   pdfMake.createPdf(docDefinition).open();
    // }
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
      this.apiService.showNotification('top', 'right', 'Customer Details Successfully Updated.', 'success');
    })
  }
  removeCustomerList(id) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You want to delete! If you delete Customer then all the customer data will be delete.",
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
        this.customerService.removeCustomerDetails(id).subscribe((req) => {
          this.apiService.showNotification('top', 'right', 'Customer removed Successfully.', 'success');


        })
        Swal.fire(
          {
            title: 'Deleted!',
            text: 'Your Customer has been deleted.',
            icon: 'success',
            customClass: {
              confirmButton: "btn btn-success",
            },
            buttonsStyling: false
          }
        )
        this.getCustomerDetails();
      }
    })

  }
  onlyViewCustomerDetails(id) {
    this.selectCustomer = true;
    this.custAppointment = false;
    this.viewCustomerAllData = true;
    this.customerService.getAllCustomerDataList(id).subscribe((data: any) => {
      this.customerData = data;
      for (let i = 0; i < this.customerData.length; i++) {
        this.customerData[i].index = i + 1;
      }
    });
  }
  backToList() {
    this.selectCustomer = false;
    this.custAppointment = false;
    this.viewCustomerAllData = false;
  }
  openUsedServiceList(obj) {

    this.totalPriceForDetails = obj.totalprice
    this.totalPointForDetails = obj.totalpoint
    this.customerService.getServicesListUsingId(obj.id).subscribe((data: any) => {
      this.usedServices = data;
      for (let i = 0; i < this.usedServices.length; i++) {
        this.usedServices[i].index = i + 1;
      }
    });
  }


}
