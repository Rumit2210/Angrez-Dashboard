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
  formdate: Date = new Date();

  p: any;
  showList: boolean = true;
  addProduct: boolean = true;
  addc: boolean = false;
  showCategoryList: boolean = false;
  public updateCategoryModel: Category = new Category;
  public categoryModel: Category = new Category;
  public category: Category[];
  isDashboard: boolean = false;
  public productList: Products[];
  search: string = '';
  name: any;
  submitButton: boolean = false;
  selectCustomer: boolean = false;
  custAppointment: boolean = false;
  viewCustomerAllData: boolean = false;
  Productdata: any[];
  val = 0;
  addingprdtimg: any = [];
  imageError: string;
  isImageSaved: boolean = true;
  cardImageBase64: string;
  image: any;
  multi: any = [];
  constructor(
    private productService: ProductService,
    private apiService: ApiService,
  ) {
    this.getAllProducts();
    this.formdate
    this.getAllCategory();


  }

  ngOnInit(): void {


  }
  addImageUploader() {
    this.val++;
    this.addingprdtimg.push({ name: this.val });
  }
  removeImageUploader(val) {
    this.addingprdtimg.splice(val, 1);
  }
  select(event) {
    debugger
    let max_height;
    let max_width;
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const max_size = 20971520;
      const allowed_types = ['image/png', 'image/jpeg'];
      max_height = 500;
      max_width = 500;

      if (event.target.files[0].size > max_size) {
        this.imageError =
          'Maximum size allowed is ' + max_size / 1000 + 'Mb';

        return false;
      }
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const image = new Image();
        image.src = e.target.result;
        image.onload = rs => {
          const img_height = rs.currentTarget['height'];
          const img_width = rs.currentTarget['width'];
          console.log(img_height, img_width);
          if (img_height > max_height && img_width > max_width) {
            alert("image must be " + max_height + "*" + max_width);
            this.isImageSaved = false;
            this.imageError =
              'Maximum dimentions allowed ' +
              max_height +
              '*' +
              max_width +
              'px';


            return false;
          }
          else {
            const imgBase64Path = e.target.result;
            this.cardImageBase64 = imgBase64Path;

            const formdata = new FormData();
            formdata.append('file', file);

            this.productService.selectUploadImage(formdata).subscribe((response) => {
              this.image = response;
              console.log(response);


            })
            // this.previewImagePath = imgBase64Path;
          }
        };
      };

      reader.readAsDataURL(event.target.files[0]);
    }
  }
  onSelect(event) {
    let max_height;
    let max_width;
    debugger
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const max_size = 20971520;
      const allowed_types = ['image/png', 'image/jpeg'];
      max_height = 500;
      max_width = 500;

      if (event.target.files[0].size > max_size) {
        this.imageError =
          'Maximum size allowed is ' + max_size / 1000 + 'Mb';

        return false;
      }
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const image = new Image();
        image.src = e.target.result;
        image.onload = rs => {
          const img_height = rs.currentTarget['height'];
          const img_width = rs.currentTarget['width'];
          console.log(img_height, img_width);
          if (img_height > max_height && img_width > max_width) {
            alert("image must be " + max_height + "*" + max_width);
            this.isImageSaved = false;
            this.imageError =
              'Maximum dimentions allowed ' +
              max_height +
              '*' +
              max_width +
              'px';
            return false;
          }
          else {
            const imgBase64Path = e.target.result;
            this.cardImageBase64 = imgBase64Path;
            const formdata = new FormData();
            formdata.append('file', file);
            // formdata.append('catid', this.imagesModel.catid);
            // formdata.append('subcatid', this.ImagesModel.categoryId);
            // formdata.append('grandchild', this.ImagesModel.subCategoryId);


            this.productService.selectMultiUploadImage(formdata).subscribe((response) => {
              this.multi.push(response);
              console.log(response);

            })
            // this.previewImagePath = imgBase64Path;
          }
        };
      };

      reader.readAsDataURL(event.target.files[0]);
    }
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

      for (let i = 0; i < this.category.length; i++) {
        this.category[i].index = i + 1;
      }
    });
  }
  saveProductsDetail() {
    this.getAllProducts();
    this.productsModel.image = this.image;
    this.productsModel.multi = this.multi;

    this.productService.saveProductsList(this.productsModel).subscribe((data: any) => {
      this.products = data;
      this.getAllProducts();
      // location.reload();
      this.apiService.showNotification('top', 'right', 'Product Added Successfully.', 'success');
    })
  }
  saveCategoryDetail() {

    this.productService.saveCategoryList(this.categoryModel).subscribe((data: any) => {
      this.category = data;
      // this.category.push(data);

      this.apiService.showNotification('top', 'right', 'Category Added Successfully.', 'success');
      this.getAllCategory();
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
    // this.submitButton = true;
    this.updateProductModel = data;
  }
  viewCategoryDetails(data: Category) {

    // this.showEmp = true;
    this.updateCategoryModel = data;
  }

  UpdateProductDetails() {
    this.updateProductModel
    this.productService.updateProductList(this.updateProductModel).subscribe((req) => {
      this.getAllProducts();
      this.apiService.showNotification('top', 'right', 'Product Details Successfully Updated.', 'success');

    })
  }
  updateCategoryDetails() {
    this.updateCategoryModel
    this.productService.updateCategoryList(this.updateCategoryModel).subscribe((req) => {
      this.getAllCategory();
      this.apiService.showNotification('top', 'right', 'Category Details Successfully Updated.', 'success');
    })
  }
  addcategory() {
    this.showList = false;
    this.addProduct = false;
    this.addc = true;
    this.showCategoryList = true;
    this.getAllCategory();
  }
  backToProduct() {
    this.addProduct = true;
    this.addc = false;
    this.showCategoryList = false;
    this.showList = true;

  }
  Search() {
    if (this.search == "") {
      this.getAllProducts();
    } else {
      this.products = this.products.filter(res => {
        if (res.name.toLocaleLowerCase().match(this.search.toLocaleLowerCase())) {
          return res.name.toLocaleLowerCase().match(this.search.toLocaleLowerCase());
        }
        else {
          return res.category.toLocaleLowerCase().match(this.search.toLocaleLowerCase());
        }
      });
    }
  }
 

}
