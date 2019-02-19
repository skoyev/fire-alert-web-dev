import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable ,  of } from 'rxjs';
import { catchError, map, tap, filter } from 'rxjs/operators';
import { Subscription, Subject } from 'rxjs';
import { AuthenticationService } from '../core';
import { Credentials } from '../core';
import menu from '../../assets/data/menu.json';
import { Profile } from '@appModels/profile';
import { Employee } from '@appModels/employee';
import { Franchaisee } from '@appModels/franchaisee';
import { EMPLOYEE, FRANCHAISOR } from '@appModels/constant';
import { Team } from '@appModels/team';

@Injectable()
export class DashboardService {
  private dashboardUrl:string = '/api/profile';
  private employeeUrl:string = '/api/employee';
  private teamUrl:string = '/api/team';
  
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

  addTeam (frID:number, team: Team): Observable<Team> {
    return this.http.post<Team>(`${this.teamUrl}/${frID}`, team).pipe();
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

  fetchTeamWithEmployeesByFranchaisee(frID:number) : Observable<Team> {    
    //return this.http.get<Employee[]>(`${this.employeeUrl}/franchaisee/${frID}`);      
    return this.http.get<Team>(`${this.teamUrl}/franchaisee/${frID}`);      
  }

  findFranchaiseeByUserID(userID:number):Observable<Franchaisee> {
    return this.http.get<Franchaisee>(`/api/franchaisee/user/${userID}`);
  }
}
