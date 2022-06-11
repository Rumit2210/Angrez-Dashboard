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

  p:any;
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
  removeProductList(id) {
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
        this.productService.removeProductDetails(id).subscribe((req) => {
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
        this.getAllProducts();
      }
    })

  }
  viewProDetails(data: Products) {

    // this.showEmp = true;
    this.updateProductModel = data;
  }
  updateProductDetails() {

    this.productService.updateProList(this.updateProductModel).subscribe((req) => {
      this.getAllProducts();
      this.apiService.showNotification('top', 'right', 'Product Details Successfully Updated.', 'success');
    })
  }
			
		

}
