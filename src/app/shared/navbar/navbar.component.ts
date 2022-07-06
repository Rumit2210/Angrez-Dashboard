import { Component, OnInit, Renderer2, ViewChild, ElementRef, Directive } from '@angular/core';
import { ROUTES } from '../.././sidebar/sidebar.component';
import { NavigationEnd, Router } from '@angular/router';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { Subscription } from 'rxjs/Subscription';
import { ProductService } from 'app/display-products/display-products.service';
import { Cart } from 'app/display-products/cart.model';
import { ApiService } from 'app/api.service';
import { CustomerService } from 'app/customer/customer.service';


var misc: any = {
  navbar_menu_visible: 0,
  active_collapse: true,
  disabled_collapse_init: 0,
}

@Component({
  // moduleId: module.id,
  selector: 'navbar-cmp',
  templateUrl: 'navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent implements OnInit {
  private listTitles: any[];
  location: Location;
  private nativeElement: Node;
  private toggleButton;
  lastLogin: any = Date;
  private sidebarVisible: boolean;
  private _router: Subscription;
  public open: boolean = false;
  quantity: number = 0;
  CartList: any;
  q: any;
  total: any;
  public cart: Cart[];
  public updateCartModel: Cart = new Cart;
  @ViewChild("navbar-cmp", { static: false }) button;
  selcorder: any;
  cid: string;
  totalCustPoint: any = [];
  tCustPoint: number = 0;
  role: any;
  constructor(
    location: Location,
    private renderer: Renderer2,
    private element: ElementRef,
    private router: Router,
    private productService: ProductService,
    private apiService: ApiService,
    private customerService: CustomerService
  ) {
    this.location = location;
    this.nativeElement = element.nativeElement;
    this.sidebarVisible = false;
    this.lastLogin = localStorage.getItem('lastOutTime');
    this.role = localStorage.getItem('role');
    if (this.role == 'Customer') {
      this.getAllCart();
      this.getCustomerPoints();
    }

  }

  ngOnInit() {
    this.listTitles = ROUTES.filter(listTitle => listTitle);

    const navbar: HTMLElement = this.element.nativeElement;
    const body = document.getElementsByTagName('body')[0];
    this.toggleButton = navbar.getElementsByClassName('navbar-toggler')[0];
    if (body.classList.contains('sidebar-mini')) {
      misc.sidebar_mini_active = true;
    }
    this._router = this.router.events.filter(event => event instanceof NavigationEnd).subscribe((event: NavigationEnd) => {
      const $layer = document.getElementsByClassName('close-layer')[0];
      if ($layer) {
        $layer.remove();
      }
    });
  }

  minimizeSidebar() {
    const body = document.getElementsByTagName('body')[0];

    if (misc.sidebar_mini_active === true) {
      body.classList.remove('sidebar-mini');
      misc.sidebar_mini_active = false;

    } else {
      setTimeout(function () {
        body.classList.add('sidebar-mini');

        misc.sidebar_mini_active = true;
      }, 300);
    }

    // we simulate the window Resize so the charts will get updated in realtime.
    const simulateWindowResize = setInterval(function () {
      window.dispatchEvent(new Event('resize'));
    }, 180);

    // we stop the simulation of Window Resize after the animations are completed
    setTimeout(function () {
      clearInterval(simulateWindowResize);
    }, 1000);
  }

  isMobileMenu() {
    if (window.outerWidth < 991) {
      return false;
    }
    return true;
  }

  sidebarOpen() {
    var toggleButton = this.toggleButton;
    var html = document.getElementsByTagName('html')[0];
    setTimeout(function () {
      toggleButton.classList.add('toggled');
    }, 500);
    const mainPanel = <HTMLElement>document.getElementsByClassName('main-panel')[0];
    if (window.innerWidth < 991) {
      mainPanel.style.position = 'fixed';
    }
    html.classList.add('nav-open');
    this.sidebarVisible = true;
  }
  sidebarClose() {
    var html = document.getElementsByTagName('html')[0];
    this.toggleButton.classList.remove('toggled');
    this.sidebarVisible = false;
    html.classList.remove('nav-open');
    const mainPanel = <HTMLElement>document.getElementsByClassName('main-panel')[0];

    if (window.innerWidth < 991) {
      setTimeout(function () {
        mainPanel.style.position = '';
      }, 500);
    }
  }
  sidebarToggle() {
    // var toggleButton = this.toggleButton;
    // var body = document.getElementsByTagName('body')[0];
    if (this.sidebarVisible == false) {
      this.sidebarOpen();
    } else {
      this.sidebarClose();
    }
  }

  getTitle() {
    var titlee = this.location.prepareExternalUrl(this.location.path());
    if (titlee.charAt(0) === '#') {
      titlee = titlee.slice(1);
    }
    for (var item = 0; item < this.listTitles.length; item++) {
      var parent = this.listTitles[item];
      if (parent.path === titlee) {
        return parent.title;
      } else if (parent.children) {
        var children_from_url = titlee.split("/")[2];
        for (var current = 0; current < parent.children.length; current++) {
          if (parent.children[current].path === children_from_url) {
            return parent.children[current].title;
          }
        }
      }
    }
    return 'Dashboard';
  }

  getPath() {
    // console.log(this.location);
    return this.location.prepareExternalUrl(this.location.path());
  }


  getAllCart() {

    this.productService.getAllCartList().subscribe((data: any) => {
      this.CartList = data;
      for (let i = 0; i < this.CartList.length; i++) {
        this.CartList[i].index = i + 1;
      }
    });
  }
  removeCartList(id) {
    //  
    // Swal.fire({
    //   title: 'Are you sure?',
    //   text: "You want to delete! If you delete Customer then all the customer data will be delete.",
    //   icon: 'warning',
    //   showCancelButton: true,
    //   customClass: {
    //     confirmButton: 'btn btn-success',
    //     cancelButton: 'btn btn-danger',
    //   },
    //   confirmButtonText: 'Yes',
    //   buttonsStyling: false
    // }).then((result) => {
    //   if (result.value == true) {
    //      
    //     this.productService.removeCartDetails(id).subscribe((req) => {
    //          
    //       this.apiService.showNotification('top', 'right', 'Product removed Successfully.', 'success');
    //     })
    //     Swal.fire(
    //       {
    //         title: 'Deleted!',
    //         text: 'Your product has been deleted.',
    //         icon: 'success',
    //         customClass: {
    //           confirmButton: "btn btn-success",
    //         },
    //         buttonsStyling: false
    //       }
    //     )
    //     this.getAllCart();
    //   }
    // })

    this.productService.removeCartDetails(id).subscribe((req) => {

      this.apiService.showNotification('top', 'right', 'Product removed Successfully.', 'success');
    })
    this.getAllCart();

  }
  viewCartDetails(data: Cart) {
    this.updateCartModel = data;
  }
  UpdateCartDetails() {
    this.updateCartModel
    this.productService.updateCartList(this.updateCartModel).subscribe((req) => {
      this.getAllCart();
      this.apiService.showNotification('top', 'right', 'Quantity Details Successfully Updated.', 'success');
    })
  }
  incre(ind) {
    this.updateCartModel

    this.cart[ind].quantity = this.updateCartModel.quantity;

    this.q = this.cart[ind].quantity++;
    this.updateCartModel.quantity = this.q;
    this.UpdateCartDetails();
  }
  decre(ind) {
    // if(this.cart[ind].quantity>0){
    //   this.q= this.cart[ind].quantity --;
    //  this.updateCartModel.quantity=this.q;
    //   this.UpdateCartDetails(); 
    // }    
    this.updateCartModel
    this.cart[ind].quantity = this.updateCartModel.quantity;
    this.q = this.cart[ind].quantity--;
    this.updateCartModel.quantity = this.q;
    this.UpdateCartDetails();
  }
  sum() {
    //  
    this.total = 0;
    this.productService.getAllCartList().subscribe((data: any) => {
      data.forEach(element => {
        //   
        console.log(element.price);
        console.log(element);
        console.log(element.quantity);
        //  console.log(element.price * element.quantity);
        this.total = this.total + (element.price * element.quantity);
        console.log('total', this.total);
        for (let i = 0; i < this.CartList.length; i++) {
          this.CartList[i].index = i + 1;
        }

      })
    });
  }
  SaveOrder(data) {


    data.forEach(element => {
      //   

      //  console.log(element.price * element.quantity);
      console.log(element);
      this.selcorder = element;
      this.cid = localStorage.getItem('UserId');
      this.selcorder.uid = this.cid;
      this.selcorder.total = this.total;

      // this.cid= this.productsModel.uid;
      this.productService.saveOrderList(this.selcorder).subscribe((data: any) => {
        // this.cart = data;
        // this.getAllCart();
        this.apiService.showNotification('top', 'right', 'submitted  Successfully.', 'success');
      })
    })

  }
  getCustomerPoints() {
    this.customerService.getCustAllPoint(localStorage.getItem('UserId')).subscribe((data: any) => {
      this.totalCustPoint = data;
      this.tCustPoint = 0;
      this.totalCustPoint.forEach(element => {
        if (element.totalcustpoint != undefined) {
          this.tCustPoint = element.totalcustpoint;
        }
      });
    });
  }
}
