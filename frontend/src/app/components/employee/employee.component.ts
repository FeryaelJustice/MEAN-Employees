import { Employee } from './../../models/employee';
import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
})
export class EmployeeComponent implements OnInit {
  componentDestroyed = new Subject();

  constructor(public employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.getEmployees();
  }

  resetForm(form: NgForm) {
    form.reset();
  }

  getEmployees() {
    this.employeeService
      .getEmployees()
      .pipe(takeUntil(this.componentDestroyed))
      .subscribe(
        (res) => {
          this.employeeService.employees = res;
        },
        (err) => {
          console.log(err);
        }
      );
  }

  addEmployee(form: NgForm) {
    if (form.value._id!='') {
      this.employeeService
        .updateEmployee(form.value)
        .pipe(takeUntil(this.componentDestroyed))
        .subscribe(
          (res) => console.log(res),
          (err) => console.log(err)
        );
    } else {
      this.employeeService
        .createEmployee(form.value)
        .pipe(takeUntil(this.componentDestroyed))
        .subscribe(
          (res) => {
            this.getEmployees();
            form.reset();
          },
          (err) => {
            console.log(err);
          }
        );
    }
  }

  editEmployee(employee: Employee) {
    this.employeeService.selectedEmployee = employee;
  }

  deleteEmployee(id: string) {
    if (confirm('¿Estas seguro de eliminarlo?')) {
      this.employeeService
        .deleteEmployee(id)
        .pipe(takeUntil(this.componentDestroyed))
        .subscribe(
          (res) => this.getEmployees(),
          (err) => console.error(err)
        );
    }
  }
}
