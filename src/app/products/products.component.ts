import { Component, OnInit } from '@angular/core';
import { ApiService } from 'app/api.service';
import Swal from 'sweetalert2';
import { Products } from './product.model';
import { ProductService } from './products.service';
import { Category } from './category.model';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  public productsModel: Products = new Products;
  public products: Products[];
  public updateProductModel: Products = new Products;
  showList:boolean=true;  
  addProduct:boolean=true;
  addc:boolean=false;
  showCategoryList:boolean=false;
  public updateCategoryModel: Category = new Category;
  p:any;
  public categoryModel:Category =new Category;
  public category: Category[];
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
  getAllCategory() {
    this.productService.getAllCategoryList().subscribe((data: any) => {
      this.category = data;
      debugger
      

      for (let i = 0; i < this.category.length; i++) {
        this.category[i].index = i + 1;
      }
    });
  }
  saveProductsDetail() {
   this.getAllProducts();
    this.productService.saveProductsList(this.productsModel).subscribe((data: any) => {
      this.products = data;
      // this.getAllEmployee();
      location.reload();
      this.apiService.showNotification('top', 'right', 'Product Added Successfully.', 'success');
    })
  }
  saveCategoryDetail() {
   
    debugger
    this.productService.saveCategoryList(this.categoryModel).subscribe((data: any) => {
      this.category = data;
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
  removeCategoryList(id) {
    debugger
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
        this.productService.removeCategoryDetails(id).subscribe((req) => {
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
        this.getAllCategory();
      }
    })

  }
  viewProDetails(data: Products) {

    // this.showEmp = true;
    this.updateProductModel = data;
  }
  viewCategoryDetails(data: Products) {

    // this.showEmp = true;
    this.updateCategoryModel = data;
  }
  updateProductDetails() {
    
    this.productService.updateProList(this.updateProductModel).subscribe((req) => {
      this.getAllProducts();
      this.apiService.showNotification('top', 'right', 'Product Details Successfully Updated.', 'success');
    })
  }
  updateCategoryDetails() {
    this.productService.updateCategoryList(this.updateCategoryModel).subscribe((req) => {
      this.getAllCategory();
      this.apiService.showNotification('top', 'right', 'Product Details Successfully Updated.', 'success');
    })
  }
	addcategory()
  {
    this.showList=false;
    this.addProduct=false;
    this.addc=true;
    this.showCategoryList=true;
    this.getAllCategory();
  }	
		

}
