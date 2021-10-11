import { Component, OnInit } from '@angular/core';
import { Enquiry } from './enquiry.model';
import { EnquiryService } from './enquiry.service';

@Component({
  selector: 'app-enquiry',
  templateUrl: './enquiry.component.html',
  styleUrls: ['./enquiry.component.css']
})
export class EnquiryComponent implements OnInit {
  public enquiryModel: Enquiry = new Enquiry;
  public enquiryList: Enquiry[];
  constructor(
    private enquiryService: EnquiryService
  ) {
    this.getAllEnquiry();
  }

  ngOnInit(): void {
  }

  getAllEnquiry() {
    this.enquiryService.getAllEnquiryList().subscribe((data: any) => {
      this.enquiryList = data;
      for (let i = 0; i < this.enquiryList.length; i++) {
        this.enquiryList[i].index = i + 1;
      }
    })
  }

}
