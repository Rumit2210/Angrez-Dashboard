import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
declare var $: any;
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  public static HOST_URL: string = "http://localhost:8090";
  // public static HOST_URL: string = "http://31.220.59.174:4500";

  constructor(

    private http: HttpClient,
  ) { }
  httpOption = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  public static getUserLoginURL: string = ApiService.HOST_URL + '/admin/GetUsersLogin';
  public static updateLogoutDetailsURL: string = ApiService.HOST_URL + '/admin/UpdateLogoutDetails'


  public static saveServicesListURL: string = ApiService.HOST_URL + '/admin/SaveServicesList';
  public static getAllServicesURL: string = ApiService.HOST_URL + '/admin/GetAllServices';
  public static updateServicesListURL: string = ApiService.HOST_URL + '/admin/UpdateServicesList/';
  public static saveEmployeeListURL: string = ApiService.HOST_URL + '/admin/SaveEmployeeList';
  public static getAllEmployeeURL: string = ApiService.HOST_URL + '/admin/GetAllEmployee';
  public static removeEmployeeListURL: string = ApiService.HOST_URL + '/admin/RemoveEmployeeList/';
  public static saveCustomerListURL: string = ApiService.HOST_URL + '/admin/SaveCustomerList';
  public static saveLoginUserURL: string = ApiService.HOST_URL + '/authenticate/UserLogin';
  public static getAllCustomerURL: string = ApiService.HOST_URL + '/admin/GetAllCustomer';
  public static saveAppointmentListURL: string = ApiService.HOST_URL + '/admin/SaveAppointmentList';
  public static getAllAppointmentURL: string = ApiService.HOST_URL + '/admin/GetAllAppointment';
  public static getViewAppointmentURL: string = ApiService.HOST_URL + '/admin/GetViewAppointment';
  public static getAllEnquiryListURL: string = ApiService.HOST_URL + '/admin/GetAllEnquiryList';
  public static getDailyTotalURL: string = ApiService.HOST_URL + '/admin/GetDailyTotal';
  public static getMonthlyTotalURL: string = ApiService.HOST_URL + '/admin/GetMonthlyTotal';
  public static updateCustomerListURL: string = ApiService.HOST_URL + '/admin/UpdateCustomerList';
  public static removeCustomerDetailsURL: string = ApiService.HOST_URL + '/admin/removeCustomerDetails/';
  public static removeServicesListURL: string = ApiService.HOST_URL + '/admin/RemoveServicesList/';
  public static forgotPasswordURL: string = ApiService.HOST_URL + '/admin/ForgotPassword';
  public static getOneTimePasswordURL: string = ApiService.HOST_URL + '/admin/GetOneTimePassword';
  public static updatePasswordURL: string = ApiService.HOST_URL + '/admin/updatePasswordAccordingRole';
  public static updateActiveStatusURL: string = ApiService.HOST_URL + '/admin/UpdateActiveStatus';
  public static updateEnquiryStatusURL: string = ApiService.HOST_URL + '/admin/UpdateEnquiryStatus';
  public static getCustomerTotalPointsURL: string = ApiService.HOST_URL + '/admin/GetCustomerTotalPoints';
  public static updateEmployeeListURL: string = ApiService.HOST_URL + '/admin/UpdateEmployeeList';
  public static getAllCustomerDataListURL: string = ApiService.HOST_URL + '/admin/GetAllCustomerDataList';
  public static getUsedServicesByCustomerURL: string = ApiService.HOST_URL + '/admin/GetUsedServicesByCustomer';
  public static getAllCompletedServicesURL: string = ApiService.HOST_URL + '/admin/GetAllCompletedServices';
  public static saveAdminLoginURL: string = ApiService.HOST_URL + '/admin/login';
  public static ChackForPasswordURL: string = ApiService.HOST_URL + '/admin/ChackForPassword';
  public static saveModeOfPayment: string = ApiService.HOST_URL + '/admin/SaveModeOfPayment';
  public static getAllModeOfPayment: string = ApiService.HOST_URL + '/admin/GetAllModeOfPayment';
  public static getMonthlyPayment: string = ApiService.HOST_URL + '/admin/GetMonthlyPayment';
  public static saveOfferListURL: string = ApiService.HOST_URL + '/admin/SaveOfferList';
  public static getAllOfferDataListURL: string = ApiService.HOST_URL + '/admin/GetAllOfferDataList';
  public static getUsedServicesByOfferURL: string = ApiService.HOST_URL + '/admin/GetUsedServicesByOffer';
  public static getAllOfferURL: string = ApiService.HOST_URL + '/admin/GetAllOffer';
  public static getOfferTotalPointsURL: string = ApiService.HOST_URL + '/admin/GetOfferTotalPoints';
  public static updateOfferListURL: string = ApiService.HOST_URL + '/admin/UpdateOfferList';
  public static removeOfferDetailsURL: string = ApiService.HOST_URL + '/admin/removeOfferDetails/';
  public static saveExpensesListURL: string = ApiService.HOST_URL + '/admin/SaveExpensesList';
  public static getAllExpensesURL : string = ApiService.HOST_URL + '/admin/GetAllExpenses';
  public static removeexpensesDetailsURL: string = ApiService.HOST_URL + '/admin/RemoveExpensesDetails/';
  public static updateExpensesDetailsURL: string = ApiService.HOST_URL + '/admin/UpdateExpensesDetails';
  public static getMonthlyExpensesURL: string = ApiService.HOST_URL + '/admin/getMonthlyExpensesList';
  public static saveStockListURL: string = ApiService.HOST_URL + '/admin/SaveStockList';
  public static getAllStockURL: string = ApiService.HOST_URL + '/admin/GetAllStock';
  public static updateStockListURL: string = ApiService.HOST_URL + '/admin/UpdateStockList/';
  public static removeStockListURL: string = ApiService.HOST_URL + '/admin/RemoveStockList/';
  public static saveProductsListURL: string = ApiService.HOST_URL+'/admin/SaveProductsListURL';
  public static getAllProductsListURL: string = ApiService.HOST_URL+'/admin/GetAllProductsListURL';
  public static removeProductDetailsURL: string = ApiService.HOST_URL + '/admin/RemoveProductDetailsURL/';
  public static getAllSalaryListURL: string = ApiService.HOST_URL + '/admin/GetAllSalaryList';
  public static updateSalaryStatusURL: string = ApiService.HOST_URL + '/admin/UpdateSalaryStatus';
  public static updateSalaryListURL: string = ApiService.HOST_URL + '/admin/UpdateSalaryList';
  public static saveSalaryListURL: string = ApiService.HOST_URL + '/admin/SaveSalaryList';
  public static removeSalaryListURL: string = ApiService.HOST_URL + '/admin/RemoveSalaryList/';
  public static updateProductListURL: string = ApiService.HOST_URL + '/admin/UpdateProductList';
  public static uploadMainImageURL: string = ApiService.HOST_URL + '/admin/UploadProductImage/';
  public static uploadMultiImageURL: string = ApiService.HOST_URL + '/admin/UploadMultiProductImage/';
  public static removeImageURL: string = ApiService.HOST_URL + '/admin/RemoveRecentUoloadImage/';


  showNotification(from, align, msg, color) {
    var color = color;
    $.notify({
      icon: "",
      message: msg
    }, {
      type: color,
      timer: 2000,
      placement: {
        from: from,
        align: align
      },
      template: '<div data-notify="container" class="col-11 col-md-4 alert alert-{0} alert-with-icon" role="alert"><button type="button" aria-hidden="true" class="close" data-notify="dismiss"><i class="nc-icon nc-simple-remove"></i></button> <span data-notify="title">{1}</span> <span data-notify="message">{2}</span><div class="progress" data-notify="progressbar"><div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div></div><a href="{3}" target="{4}" data-notify="url"></a></div>'
    });
  }
}
