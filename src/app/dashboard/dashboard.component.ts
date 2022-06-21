import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from 'app/api.service';
import { Appointment } from 'app/customer/appointment.model';
import { Customer } from 'app/customer/customer.model';
import { CustomerService } from 'app/customer/customer.service';
import { Offer } from 'app/offer/offer.model';
import { OfferService } from 'app/offer/offer.service';
import { Payment } from 'app/customer/payment.model';
import { Employee } from 'app/employee/employee.model';
import { EmployeeService } from 'app/employee/employee.service';
import { Enquiry } from 'app/enquiry/enquiry.model';
import { EnquiryService } from 'app/enquiry/enquiry.service';
import { Services } from 'app/services/services.model';
import { ServicesService } from 'app/services/services.service';
import { Salary } from 'app/salary/salary.model';
import { SalaryService } from 'app/salary/salary.service';

import Chart from 'chart.js';
import { Router } from '@angular/router';
import { ExpensesService } from 'app/expenses/expenses.service';
import { Membership } from 'app/membership/membership.model';
import { MembershipService } from 'app/membership/membership.service';

declare const $: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;


  public gradientStroke;
  public chartColor;
  public canvas: any;
  public myChart: any;
  public ctx;
  public gradientFill;
  // constructor(private navbarTitleService: NavbarTitleService) { }
  public gradientChartOptionsConfiguration: any;
  public gradientChartOptionsConfigurationWithNumbersAndGrid: any;

  public activeUsersChartType;
  public activeUsersChartData: Array<any>;
  public activeUsersChartOptions: any;
  public activeUsersChartLabels: Array<any>;
  public activeUsersChartColors: Array<any>
  activePageDataChunk: any = [];
  pageSize = 10;
  pageSizeOptions: number[] = [10, 15, 20];


  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }
  public hexToRGB(hex, alpha) {
    var r = parseInt(hex.slice(1, 3), 16),
      g = parseInt(hex.slice(3, 5), 16),
      b = parseInt(hex.slice(5, 7), 16);

    if (alpha) {
      return "rgba(" + r + ", " + g + ", " + b + ", " + alpha + ")";
    } else {
      return "rgb(" + r + ", " + g + ", " + b + ")";
    }
  }
  public ngOnInit() {
    this.chartColor = "#FFFFFF";

    var cardStatsMiniLineColor = "#fff",
      cardStatsMiniDotColor = "#fff";

    // this.canvas = document.getElementById("chartActivity");
    // this.ctx = this.canvas.getContext("2d");

    // this.gradientStroke = this.ctx.createLinearGradient(500, 0, 100, 0);
    // this.gradientStroke.addColorStop(0, '#80b6f4');
    // this.gradientStroke.addColorStop(1, this.chartColor);

    // this.gradientFill = this.ctx.createLinearGradient(0, 170, 0, 50);
    // this.gradientFill.addColorStop(0, "rgba(128, 182, 244, 0)");
    // this.gradientFill.addColorStop(1, "rgba(249, 99, 59, 0.40)");

    // this.myChart = new Chart(this.ctx, {
    //   type: 'bar',
    //   data: {
    //     labels: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
    //     datasets: [

    //       {
    //         label: "Data",
    //         borderColor: '#fcc468',
    //         fill: true,
    //         backgroundColor: '#fcc468',
    //         hoverBorderColor: '#fcc468',
    //         borderWidth: 8,
    //         data: [100, 120, 80, 100, 90, 130, 110, 100, 80, 110, 130, 140, 130, 120, 130, 80, 100, 90, 120, 130],
    //       },
    //       {
    //         label: "Data",
    //         borderColor: '#4cbdd7',
    //         fill: true,
    //         backgroundColor: '#4cbdd7',
    //         hoverBorderColor: '#4cbdd7',
    //         borderWidth: 8,
    //         data: [80, 140, 50, 120, 50, 150, 60, 130, 50, 130, 150, 100, 110, 80, 140, 50, 140, 50, 110, 150],
    //       }
    //     ]
    //   },
    //   options: {

    //     tooltips: {
    //       tooltipFillColor: "rgba(0,0,0,0.5)",
    //       tooltipFontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
    //       tooltipFontSize: 14,
    //       tooltipFontStyle: "normal",
    //       tooltipFontColor: "#fff",
    //       tooltipTitleFontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
    //       tooltipTitleFontSize: 14,
    //       tooltipTitleFontStyle: "bold",
    //       tooltipTitleFontColor: "#fff",
    //       tooltipYPadding: 6,
    //       tooltipXPadding: 6,
    //       tooltipCaretSize: 8,
    //       tooltipCornerRadius: 6,
    //       tooltipXOffset: 10,
    //     },


    //     legend: {

    //       display: false
    //     },
    //     scales: {

    //       yAxes: [{
    //         ticks: {
    //           fontColor: "#9f9f9f",
    //           fontStyle: "bold",
    //           beginAtZero: true,
    //           maxTicksLimit: 5,
    //           padding: 20
    //         },
    //         gridLines: {
    //           zeroLineColor: "transparent",
    //           display: true,
    //           drawBorder: false,
    //           color: '#9f9f9f',
    //         }

    //       }],
    //       xAxes: [{
    //         barPercentage: 0.4,
    //         gridLines: {
    //           zeroLineColor: "white",
    //           display: false,

    //           drawBorder: false,
    //           color: 'transparent',
    //         },
    //         ticks: {
    //           padding: 20,
    //           fontColor: "#9f9f9f",
    //           fontStyle: "bold"
    //         }
    //       }]
    //     }
    //   }
    // });

    //     Chart.pluginService.register({
    //       beforeDraw: function (chart) {
    //         if (chart.config.options.elements.center) {
    //           //Get ctx from string
    //           var ctx = chart.chart.ctx;

    //           //Get options from the center object in options
    //           var centerConfig = chart.config.options.elements.center;
    //           var fontStyle = centerConfig.fontStyle || 'Arial';
    //           var txt = centerConfig.text;
    //           var color = centerConfig.color || '#000';
    //           var sidePadding = centerConfig.sidePadding || 20;
    //           var sidePaddingCalculated = (sidePadding / 100) * (chart.innerRadius * 2)
    //           //Start with a base font of 30px
    //           ctx.font = "30px " + fontStyle;

    //           //Get the width of the string and also the width of the element minus 10 to give it 5px side padding
    //           var stringWidth = ctx.measureText(txt).width;
    //           var elementWidth = (chart.innerRadius * 2) - sidePaddingCalculated;

    //           // Find out how much the font can grow in width.
    //           var widthRatio = elementWidth / stringWidth;
    //           var newFontSize = Math.floor(30 * widthRatio);
    //           var elementHeight = (chart.innerRadius * 2);

    //           // Pick a new font size so it will not be larger than the height of label.
    //           var fontSizeToUse = Math.min(newFontSize, elementHeight);

    //           //Set font settings to draw it correctly.
    //           ctx.textAlign = 'center';
    //           ctx.textBaseline = 'middle';
    //           var centerX = ((chart.chartArea.left + chart.chartArea.right) / 2);
    //           var centerY = ((chart.chartArea.top + chart.chartArea.bottom) / 2);
    //           ctx.font = fontSizeToUse + "px " + fontStyle;
    //           ctx.fillStyle = color;

    //           //Draw text in center
    //           ctx.fillText(txt, centerX, centerY);
    //         }
    //       }
    //     });

    //     this.canvas = document.getElementById("chartDonut1");
    //     this.ctx = this.canvas.getContext("2d");

    //     myChart = new Chart(this.ctx, {
    //       type: 'pie',
    //       data: {
    //         labels: [1, 2],
    //         datasets: [{
    //           label: "Emails",
    //           pointRadius: 0,
    //           pointHoverRadius: 0,
    //           backgroundColor: ['#4acccd', '#f4f3ef'],
    //           borderWidth: 0,
    //           data: [60, 40]
    //         }]
    //       },
    //       options: {
    //         elements: {
    //           center: {
    //             text: '60%',
    //             color: '#66615c', // Default is #000000
    //             fontStyle: 'Arial', // Default is Arial
    //             sidePadding: 60 // Defualt is 20 (as a percentage)
    //           }
    //         },
    //         cutoutPercentage: 90,
    //         legend: {

    //           display: false
    //         },

    //         tooltips: {
    //           enabled: false
    //         },

    //         scales: {
    //           yAxes: [{

    //             ticks: {
    //               display: false
    //             },
    //             gridLines: {
    //               drawBorder: false,
    //               zeroLineColor: "transparent",
    //               color: 'rgba(255,255,255,0.05)'
    //             }

    //           }],

    //           xAxes: [{
    //             barPercentage: 1.6,
    //             gridLines: {
    //               drawBorder: false,
    //               color: 'rgba(255,255,255,0.1)',
    //               zeroLineColor: "transparent"
    //             },
    //             ticks: {
    //               display: false,
    //             }
    //           }]
    //         },
    //       }
    //     });

    //     this.canvas = document.getElementById("chartDonut2");
    //     this.ctx = this.canvas.getContext("2d");

    //     myChart = new Chart(this.ctx, {
    //       type: 'pie',
    //       data: {
    //         labels: [1, 2],
    //         datasets: [{
    //           label: "Emails",
    //           pointRadius: 0,
    //           pointHoverRadius: 0,
    //           backgroundColor: ['#fcc468', '#f4f3ef'],
    //           borderWidth: 0,
    //           data: [34, 66]
    //         }]
    //       },
    //       options: {
    //         elements: {
    //           center: {
    //             text: '34%',
    //             color: '#66615c', // Default is #000000
    //             fontStyle: 'Arial', // Default is Arial
    //             sidePadding: 60 // Defualt is 20 (as a percentage)
    //           }
    //         },
    //         cutoutPercentage: 90,
    //         legend: {

    //           display: false
    //         },

    //         tooltips: {
    //           enabled: false
    //         },

    //         scales: {
    //           yAxes: [{

    //             ticks: {
    //               display: false
    //             },
    //             gridLines: {
    //               drawBorder: false,
    //               zeroLineColor: "transparent",
    //               color: 'rgba(255,255,255,0.05)'
    //             }

    //           }],

    //           xAxes: [{
    //             barPercentage: 1.6,
    //             gridLines: {
    //               drawBorder: false,
    //               color: 'rgba(255,255,255,0.1)',
    //               zeroLineColor: "transparent"
    //             },
    //             ticks: {
    //               display: false,
    //             }
    //           }]
    //         },
    //       }
    //     });

    //     this.canvas = document.getElementById("chartDonut3");
    //     this.ctx = this.canvas.getContext("2d");

    //     myChart = new Chart(this.ctx, {
    //       type: 'pie',
    //       data: {
    //         labels: [1, 2],
    //         datasets: [{
    //           label: "Emails",
    //           pointRadius: 0,
    //           pointHoverRadius: 0,
    //           backgroundColor: ['#f17e5d', '#f4f3ef'],
    //           borderWidth: 0,
    //           data: [80, 20]
    //         }]
    //       },
    //       options: {
    //         elements: {
    //           center: {
    //             text: '80%',
    //             color: '#66615c', // Default is #000000
    //             fontStyle: 'Arial', // Default is Arial
    //             sidePadding: 60 // Defualt is 20 (as a percentage)
    //           }
    //         },
    //         cutoutPercentage: 90,
    //         legend: {

    //           display: false
    //         },

    //         tooltips: {
    //           enabled: false
    //         },

    //         scales: {
    //           yAxes: [{

    //             ticks: {
    //               display: false
    //             },
    //             gridLines: {
    //               drawBorder: false,
    //               zeroLineColor: "transparent",
    //               color: 'rgba(255,255,255,0.05)'
    //             }

    //           }],

    //           xAxes: [{
    //             barPercentage: 1.6,
    //             gridLines: {
    //               drawBorder: false,
    //               color: 'rgba(255,255,255,0.1)',
    //               zeroLineColor: "transparent"
    //             },
    //             ticks: {
    //               display: false,
    //             }
    //           }]
    //         },
    //       }
    //     });


    //     this.canvas = document.getElementById("chartDonut4");
    //     this.ctx = this.canvas.getContext("2d");

    //     myChart = new Chart(this.ctx, {
    //       type: 'pie',
    //       data: {
    //         labels: [1, 2],
    //         datasets: [{
    //           label: "Emails",
    //           pointRadius: 0,
    //           pointHoverRadius: 0,
    //           backgroundColor: ['#66615b', '#f4f3ef'],
    //           borderWidth: 0,
    //           data: [11, 89]
    //         }]
    //       },
    //       options: {
    //         elements: {
    //           center: {
    //             text: '11%',
    //             color: '#66615c', // Default is #000000
    //             fontStyle: 'Arial', // Default is Arial
    //             sidePadding: 60 // Defualt is 20 (as a percentage)
    //           }
    //         },
    //         cutoutPercentage: 90,
    //         legend: {

    //           display: false
    //         },

    //         tooltips: {
    //           enabled: false
    //         },

    //         scales: {
    //           yAxes: [{

    //             ticks: {
    //               display: false
    //             },
    //             gridLines: {
    //               drawBorder: false,
    //               zeroLineColor: "transparent",
    //               color: 'rgba(255,255,255,0.05)'
    //             }

    //           }],

    //           xAxes: [{
    //             barPercentage: 1.6,
    //             gridLines: {
    //               drawBorder: false,
    //               color: 'rgba(255,255,255,0.1)',
    //               zeroLineColor: "transparent"
    //             },
    //             ticks: {
    //               display: false,
    //             }
    //           }]
    //         },
    //       }
    //     });




    //     this.canvas = document.getElementById("activeUsers");
    //     this.ctx = this.canvas.getContext("2d");

    //     this.gradientStroke = this.ctx.createLinearGradient(500, 0, 100, 0);
    //     this.gradientStroke.addColorStop(0, '#80b6f4');
    //     this.gradientStroke.addColorStop(1, this.chartColor);

    //     this.gradientFill = this.ctx.createLinearGradient(0, 170, 0, 50);
    //     this.gradientFill.addColorStop(0, "rgba(128, 182, 244, 0)");
    //     this.gradientFill.addColorStop(1, "rgba(249, 99, 59, 0.40)");

    //     myChart = new Chart(this.ctx, {
    //       type: 'line',
    //       data: {
    //         labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct"],
    //         datasets: [{
    //           label: "Active Users",
    //           borderColor: "#6bd098",
    //           pointRadius: 0,
    //           pointHoverRadius: 0,
    //           fill: false,
    //           borderWidth: 3,
    //           data: [542, 480, 430, 550, 530, 453, 380, 434, 568, 610]
    //         }]
    //       },
    //       options: {

    //         legend: {

    //           display: false
    //         },

    //         tooltips: {
    //           enabled: false
    //         },

    //         scales: {
    //           yAxes: [{

    //             ticks: {
    //               fontColor: "#9f9f9f",
    //               beginAtZero: false,
    //               maxTicksLimit: 5,
    //               //padding: 20
    //             },
    //             gridLines: {
    //               drawBorder: false,
    //               zeroLineColor: "transparent",
    //               color: 'rgba(255,255,255,0.05)'
    //             }

    //           }],

    //           xAxes: [{
    //             barPercentage: 1.6,
    //             gridLines: {
    //               drawBorder: false,
    //               color: 'rgba(255,255,255,0.1)',
    //               zeroLineColor: "transparent",
    //               display: false,
    //             },
    //             ticks: {
    //               padding: 20,
    //               fontColor: "#9f9f9f"
    //             }
    //           }]
    //         },
    //       }
    //     });


    //     this.canvas = document.getElementById("emailsCampaignChart");
    //     this.ctx = this.canvas.getContext("2d");

    //     this.gradientStroke = this.ctx.createLinearGradient(500, 0, 100, 0);
    //     this.gradientStroke.addColorStop(0, '#18ce0f');
    //     this.gradientStroke.addColorStop(1, this.chartColor);

    //     this.gradientFill = this.ctx.createLinearGradient(0, 170, 0, 50);
    //     this.gradientFill.addColorStop(0, "rgba(128, 182, 244, 0)");
    //     this.gradientFill.addColorStop(1, this.hexToRGB('#18ce0f', 0.4));

    //     var myChart = new Chart(this.ctx, {
    //       type: 'line',
    //       data: {
    //         labels: ["12pm", "3pm", "6pm", "9pm", "12am", "3am", "6am", "9am"],
    //         datasets: [{
    //           label: "Email Stats",
    //           borderColor: "#ef8156",
    //           pointHoverRadius: 0,
    //           pointRadius: 0,
    //           fill: false,
    //           backgroundColor: this.gradientFill,
    //           borderWidth: 3,
    //           data: [40, 500, 650, 700, 1200, 1250, 1300, 1900]
    //         }]
    //       },
    //       options: {

    //         legend: {

    //           display: false
    //         },

    //         tooltips: {
    //           enabled: false
    //         },

    //         scales: {
    //           yAxes: [{

    //             ticks: {
    //               fontColor: "#9f9f9f",
    //               beginAtZero: false,
    //               maxTicksLimit: 5,
    //               //padding: 20
    //             },
    //             gridLines: {
    //               drawBorder: false,
    //               zeroLineColor: "transparent",
    //               color: 'rgba(255,255,255,0.05)'
    //             }

    //           }],

    //           xAxes: [{
    //             barPercentage: 1.6,
    //             gridLines: {
    //               drawBorder: false,
    //               color: 'rgba(255,255,255,0.1)',
    //               zeroLineColor: "transparent",
    //               display: false,
    //             },
    //             ticks: {
    //               padding: 20,
    //               fontColor: "#9f9f9f"
    //             }
    //           }]
    //         },
    //       }
    //     });

    //     this.canvas = document.getElementById("activeCountries");
    //     this.ctx = this.canvas.getContext("2d");

    //     this.gradientStroke = this.ctx.createLinearGradient(500, 0, 100, 0);
    //     this.gradientStroke.addColorStop(0, '#2CA8FF');
    //     this.gradientStroke.addColorStop(1, this.chartColor);

    //     this.gradientFill = this.ctx.createLinearGradient(0, 170, 0, 50);
    //     this.gradientFill.addColorStop(0, "rgba(128, 182, 244, 0)");
    //     this.gradientFill.addColorStop(1, this.hexToRGB('#2CA8FF', 0.4));

    //     var a = {
    //       type: "line",
    //       data: {
    //         labels: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October"],
    //         datasets: [{
    //           label: "Active Countries",
    //           backgroundColor: this.gradientFill,
    //           borderColor: "#fbc658",
    //           pointHoverRadius: 0,
    //           pointRadius: 0,
    //           fill: false,
    //           borderWidth: 3,
    //           data: [80, 78, 86, 96, 83, 85, 76, 75, 88, 90]
    //         }]
    //       },
    //       options: {

    //         legend: {

    //           display: false
    //         },

    //         tooltips: {
    //           enabled: false
    //         },

    //         scales: {
    //           yAxes: [{

    //             ticks: {
    //               fontColor: "#9f9f9f",
    //               beginAtZero: false,
    //               maxTicksLimit: 5,
    //               //padding: 20
    //             },
    //             gridLines: {
    //               drawBorder: false,
    //               zeroLineColor: "transparent",
    //               color: 'rgba(255,255,255,0.05)'
    //             }

    //           }],

    //           xAxes: [{
    //             barPercentage: 1.6,
    //             gridLines: {
    //               drawBorder: false,
    //               color: 'rgba(255,255,255,0.1)',
    //               zeroLineColor: "transparent",
    //               display: false,
    //             },
    //             ticks: {
    //               padding: 20,
    //               fontColor: "#9f9f9f"
    //             }
    //           }]
    //         },
    //       }
    //     };

    //     var viewsChart = new Chart(this.ctx, a);



    //     var mapData = {
    //       "AU": 760,
    //       "BR": 550,
    //       "CA": 120,
    //       "DE": 1300,
    //       "FR": 540,
    //       "GB": 690,
    //       "GE": 200,
    //       "IN": 200,
    //       "RO": 600,
    //       "RU": 300,
    //       "US": 2920,
    //     };

    //     $('#worldMap').vectorMap({
    //       map: 'world_mill_en',
    //       backgroundColor: "transparent",
    //       zoomOnScroll: false,
    //       regionStyle: {
    //         initial: {
    //           fill: '#e4e4e4',
    //           "fill-opacity": 0.9,
    //           stroke: 'none',
    //           "stroke-width": 0,
    //           "stroke-opacity": 0
    //         }
    //       },

    //       series: {
    //         regions: [{
    //           values: mapData,
    //           scale: ["#AAAAAA", "#444444"],
    //           normalizeFunction: 'polynomial'
    //         }]
    //       },
    //     });

    // // chart
    // var dt = new Date();
    // var month = dt.getMonth();
    // var year = dt.getFullYear();
    // daysInMonth = new Date(year, month, 0).getDate();


    this.canvas = document.getElementById("chartViews");
    this.ctx = this.canvas.getContext("2d");

    this.gradientStroke = this.ctx.createLinearGradient(500, 0, 100, 0);
    this.gradientStroke.addColorStop(0, '#80b6f4');
    this.gradientStroke.addColorStop(1, this.chartColor);

    this.gradientFill = this.ctx.createLinearGradient(0, 170, 0, 50);
    this.gradientFill.addColorStop(0, "rgba(128, 182, 244, 0)");
    this.gradientFill.addColorStop(1, "rgba(249, 99, 59, 0.40)");

    this.myChart = new Chart(this.ctx, {
      type: 'bar',
      data: {
        labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31],
        datasets: [
          {
            label: "Data",
            borderColor: '#fcc468',
            fill: true,
            backgroundColor: '#fcc468',
            hoverBorderColor: '#fcc468',
            borderWidth: 5,
            data: [100, 120, 80, 100, 90, 130, 110, 100, 80, 110, 130, 140, 130, 120, 130, 80, 100, 90, 120, 130, 24, 15, 45, 95, 86, 76, 85, 95, 75, 74, 95],
          }
        ]
      },
      options: {
        tooltips: {
          tooltipFillColor: "rgba(0,0,0,0.5)",
          tooltipFontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
          tooltipFontSize: 14,
          tooltipFontStyle: "normal",
          tooltipFontColor: "#fff",
          tooltipTitleFontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
          tooltipTitleFontSize: 14,
          tooltipTitleFontStyle: "bold",
          tooltipTitleFontColor: "#fff",
          tooltipYPadding: 6,
          tooltipXPadding: 6,
          tooltipCaretSize: 8,
          tooltipCornerRadius: 6,
          tooltipXOffset: 10,
        },
        legend: {
          display: false
        },
        scales: {
          yAxes: [{
            ticks: {
              fontColor: "#9f9f9f",
              fontStyle: "bold",
              beginAtZero: true,
              maxTicksLimit: 5,
              padding: 20
            },
            gridLines: {
              zeroLineColor: "transparent",
              display: true,
              drawBorder: false,
              color: '#9f9f9f',
            }
          }],
          xAxes: [{
            barPercentage: 0.4,
            gridLines: {
              zeroLineColor: "white",
              display: false,

              drawBorder: false,
              color: 'transparent',
            },
            ticks: {
              padding: 20,
              fontColor: "#9f9f9f",
              fontStyle: "bold"
            }
          }]
        }
      }
    });

    this.canvas = document.getElementById("activeUsers");
    this.ctx = this.canvas.getContext("2d");

    this.gradientStroke = this.ctx.createLinearGradient(500, 0, 100, 0);
    this.gradientStroke.addColorStop(0, '#80b6f4');
    this.gradientStroke.addColorStop(1, this.chartColor);

    this.gradientFill = this.ctx.createLinearGradient(0, 170, 0, 50);
    this.gradientFill.addColorStop(0, "rgba(128, 182, 244, 0)");
    this.gradientFill.addColorStop(1, "rgba(249, 99, 59, 0.40)");

    this.myChart = new Chart(this.ctx, {
      type: 'line',
      data: {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct"],
        datasets: [{
          label: "Active Users",
          borderColor: "#6bd098",
          pointRadius: 0,
          pointHoverRadius: 0,
          fill: false,
          borderWidth: 3,
          data: [542, 480, 430, 550, 530, 453, 380, 434, 568, 610]
        }]
      },
      options: {

        legend: {

          display: false
        },

        tooltips: {
          enabled: false
        },

        scales: {
          yAxes: [{

            ticks: {
              fontColor: "#9f9f9f",
              beginAtZero: false,
              maxTicksLimit: 5,
              //padding: 20
            },
            gridLines: {
              drawBorder: false,
              zeroLineColor: "transparent",
              color: 'rgba(255,255,255,0.05)'
            }

          }],

          xAxes: [{
            barPercentage: 1.6,
            gridLines: {
              drawBorder: false,
              color: 'rgba(255,255,255,0.1)',
              zeroLineColor: "transparent",
              display: false,
            },
            ticks: {
              padding: 20,
              fontColor: "#9f9f9f"
            }
          }]
        },
      }
    });




  }
  public appointmentModel: Appointment = new Appointment;
  public paymentModel: Payment = new Payment;
  public paymentList: Payment[];
  public employeeReg: Employee[];
  public servicesList: Services[];
  public customerList: Customer[];
  public membershipList: Membership[];
  public offerList: Customer[];
  public dailyTotal: Customer[];
  public monthlyTotal: Customer[];
  public enquiryList: Enquiry[];
  public appointmentList: Appointment[];
  public completedAppointment: any = [];
  activePageDataChunkComApp: any = [];
  activePageDataChunkAppo: any = [];

  dailytotal: number = 0;
  monthlytotal: number = 0;
  adminRole: any;
  usedServices: any[];
  totalPriceForDetails: any;
  totalPointForDetails: any;
  cContact: any;
  cEmail: any;
  cName: any;
  cPoint: any;
  cPrice: any;
  cId: any;
  appId: any;;
  monthlyexpensestotal: number = 0;
  expenseTotal: number = 0;
  constructor(
    private servicesService: ServicesService,
    private employeeService: EmployeeService,
    private customerService: CustomerService,
    public membershipService: MembershipService,
    private offerService: OfferService,
    private enquiryService: EnquiryService,
    private expensesService: ExpensesService,
    private apiService: ApiService,
    private router: Router
  ) {
    this.adminRole = localStorage.getItem('role');

    this.getAllServices();
    this.getAllEmployee();
    this.getCustomerDetails();
    this.getMembershipDetails();
    this.getOfferDetails();
    this.getAllEnquiry();
    this.GetDailyTotal();
    this.GetMonthlyTotal();
    this.getAllAppointment();
    this.getAllCompletedAppointment();
    this.getExpensesDetails();
    this.GetMonthlyExpensesTotal();
  }
  getAllEmployee() {
    this.employeeService.getAllEmployeeList().subscribe((data: any) => {
      this.employeeReg = data;
    });
  }
  openEmployee() {
    this.router.navigate(['employee']);
  }
  getAllServices() {
    this.servicesService.getAllServicesList().subscribe((data: any) => {
      this.servicesList = data;
    });
  }
  openServices() {
    this.router.navigate(['services']);
  }
  openServCustom() {
    this.router.navigate(['servicescustm']);
  }
  openCustomerService() {
    this.router.navigate(['customerservice']);
  }
  getCustomerDetails() {
    this.customerService.getAllCustomerList().subscribe((data: any) => {
      this.customerList = data;
    });
  }
  openCustomer() {
    this.router.navigate(['customer']);
  }
  getMembershipDetails() {
    this.membershipService.getAllMembershipList().subscribe((data: any) => {
      this.membershipList = data;
    });
  }
  openMembership() {
    this.router.navigate(['membership']);
  }
  getAllEnquiry() {
    this.enquiryService.getAllEnquiryList().subscribe((data: any) => {
      this.enquiryList = data;
      this.activePageDataChunk = this.enquiryList.slice(0, this.pageSize);
      for (let i = 0; i < this.enquiryList.length; i++) {
        this.enquiryList[i].index = i + 1;
      }
    })
  }
  setPageSizeOptions(setPageSizeOptionsInput: string) {

    this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
  }
  onPageChangedEnquiry(e) {
    let firstCut = e.pageIndex * e.pageSize;
    let secondCut = firstCut + e.pageSize;
    this.activePageDataChunk = this.enquiryList.slice(firstCut, secondCut);
  }

  openExpenses() {
    this.router.navigate(['expenses']);
  }
  getExpensesDetails() {
    this.expensesService.getAllExpensesList().subscribe((data: any) => {
      const curDate = new Date(); data.forEach(element => {
        var searchdate = new Date(curDate).getDate()
        var newdate = new Date(element.expensesdate).getDate()
        var searchmonth = new Date(curDate).getMonth()
        var newmonth = new Date(element.expensesdate).getMonth()
        var searchyear = new Date(curDate).getFullYear()
        var newyear = new Date(element.expensesdate).getFullYear()
        if (searchdate === newdate && searchmonth === newmonth && searchyear === newyear) {
          this.expenseTotal = this.expenseTotal + element.expensesprices;
        }
      })
    })
  }
  GetMonthlyExpensesTotal() {
    this.monthlyexpensestotal = 0;
    this.expensesService.getMonthlyExpensesList().subscribe((data: any) => {
      data.forEach(element => {
        if ((element.expensesdate != undefined)) {
          this.monthlyexpensestotal = this.monthlyexpensestotal + element.expensesprices;
        }
      })
    })
  }


  openEniquiry() {
    this.router.navigate(['enquiry']);
  }
  openOffer() {
    this.router.navigate(['offer']);
  }
  getOfferDetails() {
    this.offerService.getAllOfferList().subscribe((data: any) => {
      this.offerList = data;
    });
  }
  openDaily() {
    this.router.navigate(['reports'], {
      queryParams: {
        id: 'daily'
      }
    });
  }
  openMonthly() {
    this.router.navigate(['reports'], {
      queryParams: {
        id: 'month'
      }
    });

  }
  GetDailyTotal() {
    this.dailytotal = 0;
    this.customerService.getDailyTotalList().subscribe((data: any) => {
      this.dailyTotal = data;

      this.dailyTotal.forEach(element => {
        if ((element.totalprice != undefined)) {
          this.dailytotal = this.dailytotal + element.totalprice;
        }
      })
    })
  }
  GetMonthlyTotal() {
    this.monthlytotal = 0;
    this.customerService.getMonthlyTotalList().subscribe((data: any) => {
      this.monthlyTotal = data;
      this.monthlyTotal.forEach(element => {
        if ((element.totalprice != undefined)) {
          this.monthlytotal = this.monthlytotal + element.totalprice;
        }
      })
    })
  }
  getAllAppointment() {
    this.customerService.getAllAppointmentList().subscribe((data: any) => {
      this.appointmentList = data;
      debugger
      this.activePageDataChunkAppo = this.appointmentList.slice(0, this.pageSize);

      for (let i = 0; i < this.appointmentList.length; i++) {
        this.appointmentList[i].index = i + 1;
      }
    });
  }
  onPageChangedAppoi(e) {
    debugger
    let firstCut = e.pageIndex * e.pageSize;
    let secondCut = firstCut + e.pageSize;
    this.activePageDataChunkAppo = this.enquiryList.slice(firstCut, secondCut);
  }
  getAllCompletedAppointment() {
    this.customerService.getCompletedServices().subscribe((data: any) => {


      this.completedAppointment = data;
      this.activePageDataChunkComApp = this.completedAppointment.slice(0, this.pageSize);
      for (let i = 0; i < this.completedAppointment.length; i++) {
        this.completedAppointment[i].index = i + 1;
      }
    });
  }
  onPageChangedComAp(e) {
    let firstCut = e.pageIndex * e.pageSize;
    let secondCut = firstCut + e.pageSize;
    this.activePageDataChunkComApp = this.enquiryList.slice(firstCut, secondCut);
  }
  modeOfPayment(obj) {

    this.cContact = obj.contact;
    this.cEmail = obj.email;
    this.cName = obj.fname + ' ' + obj.lname;
    this.cPoint = obj.totalpoint;
    this.cPrice = obj.totalprice;
    this.cId = obj.custid;
    this.appId = obj.id;
  }
  saveModeOfPaymentDetails(val) {

    if (val == 'Cash') {
      this.paymentModel.modeofpayment = 'Cash';
    }
    else if (val == 'GPay') {
      this.paymentModel.modeofpayment = 'GPay';
    }
    else {
      this.paymentModel.modeofpayment = 'Account';
    }
    this.paymentModel.cname = this.cName;
    this.paymentModel.tpoint = this.cPoint;
    this.paymentModel.tprice = this.cPrice;
    this.paymentModel.cid = this.cId;
    this.paymentModel.appointmentid = this.appId;
    this.customerService.savePaymentDetails(this.paymentModel).subscribe((data: any) => {

      this.paymentList = data;
      if (data == 'success') {
        this.paymentCompleted(this.appId);
        this.apiService.showNotification('top', 'right', 'Payment accepted Successfully.', 'success');
      }
      else {
        this.apiService.showNotification('top', 'right', 'Payment Failed Please Resubmit.', 'danger');
      }

    });
  }

  paymentCompleted(id) {
    this.appointmentModel.id = id;
    this.appointmentModel.isactive = false;
    this.customerService.updateActiveStatusList(this.appointmentModel).subscribe((req) => {
      this.getAllAppointment();
      this.getAllCompletedAppointment();
      this.GetDailyTotal();
      this.GetMonthlyTotal();

    })
  }
  openUsedServiceList(obj) {

    this.totalPriceForDetails = obj.totalprice
    this.totalPointForDetails = obj.totalpoint
    this.customerService.getServicesListUsingId(obj.id).subscribe((data: any) => {
      this.usedServices = data;
      for (let i = 0; i < this.usedServices.length; i++) {
        this.usedServices[i].index = i + 1;
      }
    });
  }

}
