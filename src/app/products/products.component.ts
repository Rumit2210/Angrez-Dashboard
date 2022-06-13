import { Component, OnInit } from '@angular/core';
import { ApiService } from 'app/api.service';
import Swal from 'sweetalert2';
import { Products } from './product.model';
import { ProductService } from './products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  public productsModel: Products = new Products;
  public products: Products[];
  public updateProductModel: Products = new Products;
  isDashboard:boolean=false;
  p:any;
  public productList: Products[];
  search: string = '';
  name :any;
  submitButton: boolean = false;
  selectCustomer: boolean = false;
  custAppointment: boolean = false;
  viewCustomerAllData: boolean = false;
  Productdata: any[];
  constructor(
    private productService:ProductService,
    private apiService:ApiService
  ) {
    this.getAllProducts();
   }

  ngOnInit(): void {
  }
  getAllProducts() {
    this.productService.getAllProductsList().subscribe((data: any) => {
      this.products = data;
      

      for (let i = 0; i < this.products.length; i++) {
        this.products[i].index = i + 1;
      }
    });
  }
  saveProductsDetail() {
   
    this.productService.saveProductsList(this.productsModel).subscribe((data: any) => {
      this.products = data;
      // this.getAllEmployee();
      location.reload();
      this.apiService.showNotification('top', 'right', 'Product Added Successfully.', 'success');
    })
  }
  removeProductList(id: any) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You want to delete! If you delete Product then all the Product data will be delete.",
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
        this.productService.removeProductDetails(id).subscribe((req) => {
          this.apiService.showNotification('top', 'right', 'Product removed Successfully.', 'success');


        })
        Swal.fire(
          {
            title: 'Deleted!',
            text: 'Your Product has been deleted.',
            icon: 'success',
            customClass: {
              confirmButton: "btn btn-success",
            },
            buttonsStyling: false
          }
        )
        this.getAllProducts();
      }
    })

  }
  viewProDetails(data: Products) {
    // this.submitButton = true;
    this.updateProductModel = data;
  }
  UpdateProductDetails() {
    this.updateProductModel
    this.productService.updateProductList(this.updateProductModel).subscribe((req) =>{
      this.getAllProducts();
      this.apiService.showNotification('top', 'right', 'Product Details Successfully Updated.', 'success');
    
    })
  }
  

  // Search(val) {
  //   if (this.search == '') {
  //     console.log(val)
  //     this.products = this.productList;
  //   } else {
  //     console.log(val)
  //     this.transform(this.productList, val);
  //   }

  // }
  // transform(products: Products[], searchValue: string) {
  //   this.products = [];
  //   products.forEach(element => {
  //     if (element.name.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase())) {
  //       this.products.push(element);
  //     }
  //    })
  //    console.log(this.products)
  // }
  Search(){
    if(this.search==""){
      this.getAllProducts();
    }else{
      this.products=this.products.filter(res=>{
        if(res.name.toLocaleLowerCase().match(this.search.toLocaleLowerCase())){
            return res.name.toLocaleLowerCase().match(this.search.toLocaleLowerCase());
        }
        else{
            return res.category.toLocaleLowerCase().match(this.search.toLocaleLowerCase());
        }
      });
    }
  }
}
