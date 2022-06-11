import { Component, OnInit } from '@angular/core';
import { ApiService } from 'app/api.service';
import Swal from 'sweetalert2';
import { Stock } from './stock.model';
import { StockService } from 'app/stock/stock.service';


@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css']
})
export class StockComponent implements OnInit {
  public stockModel: Stock = new Stock;
  public stockList: Stock[];
  public stock:Stock[];
  submitButton: Boolean = false;
  search: string = '';

  constructor(
    private stockService: StockService,
    private apiService: ApiService
  ) {
    this.getAllStock();
  }


  ngOnInit(): void {
    
  }

  saveStockDetail() {
    this.stockService.saveStockList(this.stockModel).subscribe((data: any) => {
      this.stockList = data;
      this.apiService.showNotification('top', 'right', 'Stock Added Successfully.', 'success');
      //location.reload();
      this.getAllStock();
    })
  }

  getAllStock() {
    this.stockService.getAllStockList().subscribe((data: any) => {
      this.stockList = data;
      this.stock=data;
      for (let i = 0; i < this.stockList.length; i++) {
        this.stockList[i].index = i + 1;
      }
    });
  }

  searchStockList(val) {
    if (this.search == '') {
      this.stock = this.stockList;
    } else {
      this.transform(this.stockList, val);
    }

  }
  transform(stock: Stock[], searchValue: string) {

    this.stock = [];
    stock.forEach(element => {
      if (element.sname.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase())) {
        this.stock.push(element);
      }
      else if (element.stype.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase())) {
        this.stock.push(element);
      }
      else if (element.sdealername.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase())) {
        this.stock.push(element);
      }
     })
  }
  viewStockDetails(data) {
    this.stockModel = data;
    this.submitButton = true;
  }
  cancelUpdateButton() {
    this.submitButton = false;
  }
  updateStockDetail() {
    this.stockModel
    this.stockService.updateStockList(this.stockModel).subscribe((req) => {
      this.apiService.showNotification('top', 'right', 'Update Stock Successfully.', 'success');
    })
  }
  removeStock(id) {
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
        this.stockService.removeStockList(id).subscribe((req) => {
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
        this.getAllStock();
      }
    })


  }

}