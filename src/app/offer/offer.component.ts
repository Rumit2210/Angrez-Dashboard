import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'app/api.service';
import { Employee } from 'app/employee/employee.model';
import { EmployeeService } from 'app/employee/employee.service';
import { Services } from 'app/services/services.model';
import { ServicesService } from 'app/services/services.service';
import { Appointment } from './offerappointment.model';
import { Offer } from './offer.model';
import { OfferService } from './offer.service';
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import Swal from 'sweetalert2';

pdfMake.vfs = pdfFonts.pdfMake.vfs;
@Component({
  selector: 'app-offer',
  templateUrl: './offer.component.html',
  styleUrls: ['./offer.component.css']
})
export class OfferComponent implements OnInit {
  public offerModel: Offer = new Offer;
  public appointmentModel: Appointment = new Appointment
  public appointment: Appointment[];
  public appointmentList: Appointment[];
  public offer: Offer[] = [];
  disc: number;
  public offerList: Offer[];
  selectedEmp: any;
  empId: any;
  selectedServ: any;
  servId: any;
  public employeeReg: Employee[];
  public servicesList: Services[];
  serviceData: any = [];
  search: string = '';
  totalprice: any = 0;
  totalPoint: any = 0;
  totalOfferPoint: any = 0;
  totalTime: any = 0;
  custAppointment: boolean = true;
  selectOffer: boolean = false;
  viewOfferAllData: boolean = false;
  selectedCustId: any;
  totalCustPoint: any[];
  tCustPoint: any = 0;
  offerData: any[];
  offername: string;
  offerprice: number = 0;
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
   percentage: number = 0;
  constructor(
    private servicesService: ServicesService,
    private employeeService: EmployeeService,
    private offerService: OfferService,
    private apiService: ApiService,
    private router: Router
  ) {

    this.getAllEmployee();
    this.getAllServices();
    this.getOfferDetails();
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
        this.addPoinInList();

      }

    })
  }
  addPoinInList() {
    this.totalPoint = 0;
    this.totalprice = 0;
    this.totalTime = 0;
    debugger
    this.addService.forEach(element => {
      if (element.serprice != undefined) {
        this.totalprice = this.totalprice + element.serprice;
      }
      if (element.serpoint != undefined) {
        this.totalPoint = this.totalPoint + element.serpoint;
      }
      if (element.sertime != undefined) {
        this.totalTime = this.totalTime + element.sertime;
      }
      this.disc = this.offerModel.percentage;
      this.getOfferVal();
    });
  }

  removeItem(i) {
    this.addService.splice(i, 1);
    this.addPoinInList();
  }

  saveOfferDetail(data) {
    
    this.offerModel.totalprice = this.totalprice;
    this.offerModel.offerprice = this.offerprice;
    var discount: number = +this.disc;
    this.offerModel.percentage = discount;
    this.offerModel.services=this.addService;
    debugger
    this.offerService.saveOfferList(this.offerModel).subscribe((data: any) => {
      this.offerList = data;
      debugger
      this.apiService.showNotification('top', 'right', 'Offer Added Successfully.', 'success');
      this.getOfferDetails();
      location.reload();
    })
  }

  getOfferDetails() {

    this.offerService.getAllOfferList().subscribe((data: any) => {
      this.offerList = data;
      this.offer = data;
      for (let i = 0; i < this.offer.length; i++) {
        this.offer[i].index = i + 1;
      }
    });
  }

  getOfferVal() {
    debugger
    this.offerprice = this.totalprice - (this.totalprice * (this.disc / 100));
  }
  searchOfferList(val) {
    if (this.search == '') {
      this.offer = this.offerList;
    } else {
      this.transform(this.offerList, val);
    }
  }
  transform(offer: Offer[], searchValue: string) {

    this.offer = [];
    offer.forEach(element => {
      if (element.contact.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase())) {
        this.offer.push(element);
      }
      else if (element.fname.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase())) {
        this.offer.push(element);
      }
      else if (element.lname.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase())) {
        this.offer.push(element);
      }
    })
  }
  backToOffer() {
    this.custAppointment=true;
    this.selectOffer = false;
    this.viewOfferAllData=false;
  }
  getOfferPoints() {
    this.offerService.getCustAllPoint(this.selectedCustId).subscribe((data: any) => {
      this.totalCustPoint = data;
      this.tCustPoint = 0;
      this.totalCustPoint.forEach(element => {
        if (element.totalcustpoint != undefined) {
          this.tCustPoint = element.totalcustpoint;
        }
      });
    });
  }
  seletedOfferDetails(data) {
    this.offerModel = data;
    this.selectOffer = true;
    this.getOfferPoints();
  }
  saveAppointmentDetails() {

    this.appointmentModel.lessPoints = 0;
    this.appointmentModel.totalpoint = this.totalPoint;
    this.appointmentModel.lessPoints = this.tCustPoint - this.appointmentModel.percentage;
    this.appointmentModel.lessPoints = this.appointmentModel.lessPoints + this.appointmentModel.totalpoint;
    this.appointmentModel.selectedService = this.addService;
    this.appointmentModel.offerprice = this.offerprice;
    this.appointmentModel.offername = this.offername;
    this.appointmentModel.totalpoint = this.totalPoint;
    this.appointmentModel.isactive = true;
    if (this.appointmentModel.percentage > this.appointmentModel.tCustPoint) {
      this.apiService.showNotification('top', 'right', 'You can not redeem point more than total point.', 'danger');
    }
    else {
      this.offerService.saveAppointmentList(this.appointmentModel).subscribe((data: any) => {
        this.appointment = data;
        this.router.navigate(['dashboard']);
        location.reload();
        this.apiService.showNotification('top', 'right', 'Appointment Successfully Booked.', 'success');
      })
    }

  }
  generateInvoicePDF(action = 'open') {

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
          text: 'Offer Details',
          style: 'sectionHeader'
        },
        {
          columns: [
            [
              {
                text: this.offerModel.fname + '' + this.offerModel.lname,
                bold: true
              },           
            ],
            [    
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

              
            ]
          }
        },
        {
          columns: [
         
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
  viewOfferDetails(data) {
    this.totalOfferPoint = 0;
    this.offerModel = data;
    this.offerService.getViewAppointment(data).subscribe((data1: any) => {
      this.appointment = data1;
      this.appointment.forEach(element => {
        if (element.totalpoint != undefined) {
          this.totalOfferPoint = this.totalOfferPoint + element.totalpoint;
        }
      });
    });
  }
  updateOfferDetails() {
    this.offerService.updateOfferList(this.offerModel).subscribe((req) => {
      this.getOfferDetails();
      this.apiService.showNotification('top', 'right', 'Offer Details Successfully Updated.', 'success');
    })
  }
  removeOfferList(id) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You want to delete! If you delete Offer then all the offer data will be delete.",
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
        this.offerService.removeOfferDetails(id).subscribe((req) => {
          this.apiService.showNotification('top', 'right', 'Offer removed Successfully.', 'success');

        })
        Swal.fire(
          {
            title: 'Deleted!',
            text: 'Your Offer has been deleted.',
            icon: 'success',
            customClass: {
              confirmButton: "btn btn-success",
            },
            buttonsStyling: false
          }
        )
        this.getOfferDetails();
      }
    })

  }
  onlyViewOfferDetails(id) {
    this.selectOffer = true;
    this.custAppointment = false;
    this.viewOfferAllData = true;
    this.offerService.getAllOfferDataList(id).subscribe((data: any) => {
      this.offerData = data;

      for (let i = 0; i < this.offerData.length; i++) {
        this.offerData[i].index = i + 1;
      }
    });
  }
  backToList() {
    this.selectOffer = false;
    this.custAppointment = false;
    this.viewOfferAllData = false;
  }
  openUsedServiceList(obj) {

    this.totalPriceForDetails = obj.totalprice
    this.totalPointForDetails = obj.totalpoint
    this.offerService.getServicesListUsingId(obj.id).subscribe((data: any) => {
      this.usedServices = data;

      for (let i = 0; i < this.usedServices.length; i++) {
        this.usedServices[i].index = i + 1;
      }
    });
  }

}
