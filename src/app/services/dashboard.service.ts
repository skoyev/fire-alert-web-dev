import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable ,  of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Subscription, Subject } from 'rxjs';
import { AuthenticationService } from '../core';
import { Credentials } from '../core';
import menu from '../../assets/data/menu.json';
import { Profile } from '@appModels/profile';
import { Employee } from '@appModels/employee';
import { Franchaisee } from '@appModels/franchaisee';
import { EMPLOYEE, FRANCHAISOR } from '@appModels/constant';

@Injectable()
export class DashboardService {
  private dashboardUrl:string = '/api/profile';
  private employeeUrl:string = '/api/employee';
  
  private dashboardSubscription = new Subject<boolean>();

  constructor(private http: HttpClient,
              private authenticationService: AuthenticationService) { }

  public setShouldSwowDashboard(showDashboard:boolean){
    this.dashboardSubscription.next(showDashboard);
  }

  getDashboardSubscription() : Observable<boolean> {
    return this.dashboardSubscription.asObservable();
  }

  getMenuItems(type:string): Observable<string[]> {
    let credentials:Credentials = null;
    if(this.authenticationService.isAuthenticated()){
      credentials = this.authenticationService.credentials;
    }  

    return of(credentials ? menu[type] : []);
  }

  getMenuAuthItems(type:string): Observable<string[]> {
    let credentials:Credentials = null;
    if(this.authenticationService.isAuthenticated()){
      credentials = this.authenticationService.credentials;
    }  

    return of(
      credentials.roles
                 .filter(r => r.name == FRANCHAISOR)
                 .length ? menu[type] : []);
  }

  isFranchaisor():boolean {
    let credentials:Credentials = null;
    if(this.authenticationService.isAuthenticated()){
      credentials = this.authenticationService.credentials;
    }  

    return credentials.roles
                 .filter(r => 
                    r.name == FRANCHAISOR).length == 1;
  }

  isEmployee():boolean {
    let credentials:Credentials = null;
    if(this.authenticationService.isAuthenticated()){
      credentials = this.authenticationService.credentials;
    }  
    return credentials.roles
                 .filter(r => 
                    r.name == EMPLOYEE).length == 1;
  }
  
  addEmployee (frID:number, employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(`${this.employeeUrl}/${frID}`, employee).pipe();
  }

  fetchProfile(credential:Credentials) : Observable<Profile> {
    if(!credential) {
      return of(null);
    }
    const url = `${this.dashboardUrl}/${credential.id}`;
    return this.http.get<Profile>(url).pipe(
      tap(p => console.log(`fetched profile id=${p.id}`)),
      catchError(() => of(null)));    
  }

  fetchEmployeesByFranchaisee(frID:number) : Observable<Employee[]> {    
    return this.http.get<Employee[]>(`${this.employeeUrl}/franchaisee/${frID}`);      
  }

  findFranchaiseeByUserID(userID:number):Observable<Franchaisee> {
    return this.http.get<Franchaisee>(`/api/franchaisee/user/${userID}`);
  }
}
