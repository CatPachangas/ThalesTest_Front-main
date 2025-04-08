import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../services/employee.service';
import { Employee } from './models/employee-model';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss'],
})
export class EmployeesComponent implements OnInit {
  employees: Employee[] = [];
  displayedColumns: string[] = ['id', 'name', 'salary', 'age', 'image'];
  dataSource = this.employees;
  form!: FormGroup;
  employee: any;
  showCard: boolean = false;
  showTable:boolean = false;

  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      idEmployee: new FormControl(''),
    });
  }

  getAllEmployees() {
    var obj: any = {};
    this.employeeService.getAllEmployees(obj).subscribe({
      next: (response) => (this.employees = response.employees),
      error: (error) => {
        console.log(error);
      },
      complete: () => {
        console.log(this.employees);
        this.showTable = true;
      },
    });
  }

  getEmployeeById() {
    const data = this.form.value;
    if (data.idEmployee === null || data.idEmployee === '') {
      this.getAllEmployees();
    } else {
      var obj: any = {
        id: data.idEmployee,
      };
      this.employeeService.getEmployeeById(obj).subscribe({
        next: (response) => (this.employee = response.employee),
        error: (error) => {
          console.log(error);
        },
        complete: () => {
          console.log(this.employee);
          this.showCard = true;
        },
      });
    }
  }
}
