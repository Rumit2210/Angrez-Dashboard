import { Component, OnInit } from '@angular/core';
import { ProductService } from './display-products.service';
import { Products } from 'app/products/product.model';
import { ImagesModel} from 'app/Products/images.model';

declare var $: any;
@Component({
  selector: 'app-display-products',
  templateUrl: './display-products.component.html',
  styleUrls: ['./display-products.component.css']
})
export class DisplayProductsComponent implements OnInit {
  public productsModel: Products = new Products;
  public products: Products[];
  public images: ImagesModel[];
  public frontimage: ImagesModel;
  selctpr:any;
  selctIm:any;
  search: string = '';
  constructor(private productService: ProductService) { 
    this.getAllProducts();
    // this.formdate;
  }

  quantity:number=0;
  
  ngOnInit(): void {
    this.getAllProducts();
  }
  getAllImages(id) {
    this.productService.getAllImagesList(id).subscribe((data: any) => {
      this.images = data;
      this.frontimage = this.images[0]
      
    });
  }

  getAllProducts() {
    this.productService.getAllProductsList().subscribe((data: any) => {
      this.products = data;
      debugger
    });
  }
  incre(){
    if(this.quantity!=10){
      this.quantity++;
    }
  }
  decre(){
    if(this.quantity!=0)
    this.quantity--;
  }
  selectedProd(data){ 
    this.selctpr=data;
    this.getAllImages(this.selctpr.id)
  }
  selectedImg(data){ 
    this.selctIm=data;
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


  // cartadd(from,align){
  //    if(this.quantity!=0){
  //     $.notify({
  //       icon: "ti-gift",
  //       message: "Item added sucessfully!!"
  //     },{
  //         type: 'success',
  //         timer: 4000,
  //         placement: {
  //             from: from,
  //             align: align
  //         },
  //         template: '<div data-notify="container" class="col-11 col-md-4 alert alert-{0} alert-with-icon" role="alert"><button type="button" aria-hidden="true" class="close" data-notify="dismiss"><i class="nc-icon nc-simple-remove"></i></button><span data-notify="icon" class="nc-icon nc-bell-55"></span> <span data-notify="title">{1}</span> <span data-notify="message">{2}</span><div class="progress" data-notify="progressbar"><div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div></div><a href="{3}" target="{4}" data-notify="url"></a></div>'
  //     });
  //    }
  //    else{
  //     $.notify({
  //       icon: "ti-gift",
  //       message: "Quantity Invalid!!"
  //     },{
  //         type: 'danger',
  //         timer: 4000,
  //         placement: {
  //             from: from,
  //             align: align
  //         },
  //         template: '<div data-notify="container" class="col-11 col-md-4 alert alert-{0} alert-with-icon" role="alert"><button type="button" aria-hidden="true" class="close" data-notify="dismiss"><i class="nc-icon nc-simple-remove"></i></button><span data-notify="icon" class="nc-icon nc-bell-55"></span> <span data-notify="title">{1}</span> <span data-notify="message">{2}</span><div class="progress" data-notify="progressbar"><div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div></div><a href="{3}" target="{4}" data-notify="url"></a></div>'
  //     });
  //    }
  // }
}
