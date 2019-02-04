import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable ,  of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Subscription, Subject } from 'rxjs';
import { AuthenticationService } from '../core';
import { Credentials } from '../core';
import menu from '../../assets/data/menu.json';

@Injectable()
export class DashboardService {
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
                 .filter(r => r.name == 'franchaisee').length == 1 
                 ? menu[type] : []);
  }

  isFranchaisee():boolean {
    let credentials:Credentials = null;
    if(this.authenticationService.isAuthenticated()){
      credentials = this.authenticationService.credentials;
    }  

    return credentials.roles
                 .filter(r => r.name == 'franchaisee').length == 1;
  }
}
