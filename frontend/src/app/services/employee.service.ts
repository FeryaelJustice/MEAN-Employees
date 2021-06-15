import { takeUntil } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Employee } from '../models/employee';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  baseUrl = environment.API_ROOT;

  selectedEmployee: Employee = {
    _id: '',
    name: '',
    office: '',
    position: '',
    salary: 0,
  };
  employees: Employee[] = [];

  constructor(private http: HttpClient) {}

  getEmployees() {
    return this.http.get<Employee[]>(this.baseUrl);
  }

  createEmployee(employee: Employee) {
    return this.http.post(this.baseUrl, employee);
  }

  updateEmployee(employee: Employee){
    return this.http.put(`${this.baseUrl}/${employee._id}`,employee);
  }

  deleteEmployee(_id: string) {
    return this.http.delete(`${this.baseUrl}/${_id}`);
  }
}
