import { Component, OnInit } from '@angular/core';
import { Employee } from './employee.model';
import { EmployeeService } from './employee.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  public employeeModel: Employee = new Employee;
  public employeeReg: Employee[];
  constructor(
    private employeeService: EmployeeService
  ) { }

  ngOnInit(): void {
  }
  saveEmployeeDetail() {
    this.employeeService.saveEmployeeList(this.employeeModel).subscribe((data: any) => {
      this.employeeReg = data;
    })
  }
}
