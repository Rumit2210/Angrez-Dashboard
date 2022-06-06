import { Component, OnInit } from '@angular/core';
import { Console } from 'console';
import { empty } from 'rxjs';
import Swal from 'sweetalert2';
import { Expenses } from './expenses.model';
import { ExpensesService } from './expenses.service';
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { FormControl } from '@angular/forms';


pdfMake.vfs = pdfFonts.pdfMake.vfs;
@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.css']
})
export class ExpensesComponent implements OnInit {
  public ExpensesModel: Expenses = new Expenses;
  public expensesList: Expenses[];
  public expenses: Expenses[]=[];
  public Allexpenses: Expenses[]=[];
  public expensesdate: Date;
  public expensesname: string;
  public expensesprices: number;
  public employeename: string;
  public paymenttype: string;
  apiService: any;
  public search? : Date;
  public updateExpensesModel: Expenses = new Expenses;
  dailyTotal: number = 0;
  formdate: Date= new Date();
  selectedMode: any;
  searchexpenses: boolean = false;
  searchmonth: boolean = false;
  searchyear: boolean = false;
  constructor(
    private expensesService: ExpensesService
  ) {
    this.getExpensesDetails();
    this.formdate
  }

  ngOnInit(): void {
  }


  saveExpensesDetail(){
    this.expensesService.saveExpensesList(this.ExpensesModel).subscribe((data: any) => {
    this.expensesList = data;
    this.getExpensesDetails();
    })
  }

  selectChangeHandler(event: any) {
    this.selectedMode = event.target.value;
    this.ExpensesModel.paymenttype = event.target.value;
  }

  getExpensesDetails() {
    this.expensesService.getAllExpensesList().subscribe((data: any) => {
      this.Allexpenses = data;
      this.expenses = [];
      this.dailyTotal = 0;
      const curDate = new Date();
      data.forEach(element => {
      var searchdate = new Date(curDate).getDate ()
      var newdate = new Date(element.expensesdate).getDate ()
      var searchmonth = new Date(curDate).getMonth ()
      var newmonth = new Date(element.expensesdate).getMonth ()
      var searchyear = new Date(curDate).getFullYear ()
      var newyear = new Date(element.expensesdate).getFullYear ()
      if (searchdate === newdate && searchmonth === newmonth && searchyear === newyear) {
          this.expenses.push(element);
          console.log(element)
          this.dailyTotal = this.dailyTotal + element.expensesprices;
        }
        for (let i = 0; i < this.expenses.length; i++) {
          this.expenses[i].index = i + 1;
        }
     
        })
    });
  }

  removeExpensesList(id) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You want to delete! If you delete Expenses then all the expenses data will be delete.",
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
        this.expensesService.removeExpensesDetails(id).subscribe((req) => {
          this.apiService.showNotification('top', 'right', 'Expenses removed Successfully.', 'success');
        })
        Swal.fire(
          {
            title: 'Deleted!',
            text: 'Your Expenses has been deleted.',
            icon: 'success',
            customClass: {
              confirmButton: "btn btn-success",
            },
            buttonsStyling: false
          }
        )
        this.getExpensesDetails();
      }
    })

  }

  viewExpensesDetails(data) { 
    var newdates = new Date(data.expensesdate).getDate ()
    var newmonth = new Date(data.expensesdate).getMonth ()
    var newyear = new Date(data.expensesdate).getFullYear ()
    this.updateExpensesModel = data;
    var newdate=new Date(newyear,newmonth,newdates)
    data.set(data.expensesdate=newdate)
    console.log(data,"After the view Expenses")
   }

   updateExpensesDetails(){
     console.log(this.updateExpensesModel,"updatemodel")
    this.expensesService.updateExpensesList(this.updateExpensesModel).subscribe((req) => {
      this.apiService.showNotification('top', 'right', 'Expenses Details Successfully Updated.', 'success');
    })
    this.getExpensesDetails();
   }

   searmonth(){
    this.searchexpenses = true;
     this.searchmonth = true;
     this.transform(this.formdate)
   }
   searyear(){
    this.searchexpenses = true;
    this.searchmonth=false;
    this.searchyear = true;
     this.transform(this.formdate)
   }
   backToExpenses(){
     this.searchexpenses=false;
   }
   searchExpensesList(val) {
     this.searchexpenses = true;
    if (!val ) {
      this.getExpensesDetails();
    } 
    else if(val.length === 7){
    this.searchmonth = true;
    this.transform(val);
    }
    else if(val.length === 4){
      this.searchmonth=false;
      this.searchyear = true;
      this.transform(val);
      }
    else {
      this.searchyear = false;
      this.searchmonth = false;
      this.transform(val);
    }
  }
  transform(searchValue: Date) {
    this.expenses = [];
    this.dailyTotal = 0;
    var searchdate = new Date(searchValue).getDate ()
    var searchmonth = new Date(searchValue).getUTCMonth()
    var searchyear = new Date(searchValue).getFullYear ()
    this.Allexpenses.forEach(element => {
      var newdate = new Date(element.expensesdate).getDate ()
      var newmonth = new Date(element.expensesdate).getMonth ()
      var newyear = new Date(element.expensesdate).getFullYear ()
      if (searchdate === newdate && searchmonth === newmonth && searchyear === newyear && this.searchmonth == false && this.searchyear == false) {
        this.expenses.push(element);
        this.dailyTotal = this.dailyTotal + element.expensesprices;
      }
      else if (searchmonth === newmonth && searchyear === newyear && this.searchmonth == true){
        this.expenses.push(element);
        this.dailyTotal = this.dailyTotal + element.expensesprices;
      }
      else if (searchyear === newyear && this.searchyear == true && this.searchmonth == false){
        this.expenses.push(element);
        this.dailyTotal = this.dailyTotal + element.expensesprices;
      }   
     })
     for (let i = 0; i < this.expenses.length; i++) {
      this.expenses[i].index = i + 1;
    } 
  }
  

  

  generateInvoicePDF(action = 'open') {    
    this.expenses.forEach(element =>{
      this.expensesdate =element.expensesdate
    })
    var expendate = new Date(this.expensesdate).toLocaleString()
    let docDefinition = {            
        content: [
          {
            text: 'Angrez The Salon',
            fontSize: 16,
            alignment: 'center',
            color: '#047886',
            margin: [0, 0 ,0, 15] 
          },
          {
            text: 'Expenses Details',
            style: 'sectionHeader'
          },
          {
            columns: [
              [
                {
                  text: `Bill Date: ${new Date().toLocaleString()}`,
                  alignment: 'right',
                  margin: [0, 0 ,0, 15] 
                },
                { 
                  text: `Bill No : ${((Math.random() *1000).toFixed(0))}`,
                  alignment: 'right',
                  margin: [0, 0 ,0, 15] 
                }
              ]
            ]
          },
          {
            text: 'Expenses Date : ',
            alignment: 'left',
            margin: [0, 0 ,0, 15] 
          },
          {
            text: expendate,
            alignment: 'left',
            margin: [0, 0 ,0, 15] 
          },
          {
            table: {
              headerRows: 1,
              widths: ['*', 'auto', 'auto', 'auto'],
              body: [
                ['Expenses Name', 'Employee Name', 'Payment Type','Expense Prices'],
                ...this.expenses.map(p => ([p.expensesname, p.employeename, p.paymenttype, p.expensesprices + "₹"])),
                [{text: 'Total Amount', colSpan: 3}, {}, {}, this.expenses.reduce((sum, p)=> sum + p.expensesprices, 0).toFixed(2) + "₹" ]
              ]
            }
          }, 
        ],     
      };    
    if(action==='download'){    
      pdfMake.createPdf(docDefinition).download();    
    }else if(action === 'print'){    
      pdfMake.createPdf(docDefinition).print();          
    }else{    
      pdfMake.createPdf(docDefinition).open();          
    }        
  }  


}
