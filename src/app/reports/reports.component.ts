import { Component, OnInit } from '@angular/core';
import { CustomerService } from 'app/customer/customer.service';
import { Payment } from 'app/customer/payment.model';
import { element } from 'protractor';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {
  public paymentList: Payment[];
  mop: any = []
  selectedMop: any;
  mopList: any = [];

  constructor(
    private customerService: CustomerService
  ) {
    this.getAllPaymentDetails();
    this.mop = [
      {
        name: 'All'
      },
      {
        name: 'Cash'
      },
      {
        name: 'GPay',
      },
      {
        name: 'Account',
      },

    ]
  }

  ngOnInit(): void {
    this.selectedMop = 'All';
  }
  getAllPaymentDetails() {
    this.customerService.getPaymentDetails().subscribe((data: any) => {
      this.paymentList = data;
      this.mopList = data;
      for (let i = 0; i < this.paymentList.length; i++) {
        this.paymentList[i].index = i + 1;
      }
    })
  }

  selectModeOfPayment(name) {
    this.mop.forEach(element => {
      if (element.name == name) {
        this.selectedMop = element.name;
        this.viewSelectedMop();
      }
    })

  }
  viewSelectedMop() {
    this.mopList = [];
    this.paymentList.forEach(element => {
      if (element.modeofpayment == this.selectedMop) {
        this.mopList.push(element);
      }
      else if (this.selectedMop == 'All') {
        this.mopList = this.paymentList;
      }

    })
  }

}
