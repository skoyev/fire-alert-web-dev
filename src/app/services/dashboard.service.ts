import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable ,  of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Subscription, Subject } from 'rxjs';

@Injectable()
export class DashboardService {
  private dashboardSubscription = new Subject<boolean>();

  constructor(private http: HttpClient) { }

  public setShouldSwowDashboard(showDashboard:boolean){
    this.dashboardSubscription.next(showDashboard);
  }

  getDashboardSubscription() : Observable<boolean> {
    return this.dashboardSubscription.asObservable();
  }
}
