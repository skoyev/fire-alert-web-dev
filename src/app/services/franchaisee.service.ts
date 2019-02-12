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
import { Team } from '@appModels/team';

@Injectable()
export class FranchaiseeService {
  private franchaiseedUrl:string = '/api/franchaisee';
  
  constructor(private http: HttpClient,
              private authenticationService: AuthenticationService) { }

  addFranchaisee (fr: Franchaisee): Observable<Franchaisee> {
    return this.http.post<Employee>(`${this.franchaiseedUrl}`, fr).pipe();
  }

  findFranchaisee(criteria:string):Observable<Franchaisee[]> {
    return this.http.get<Franchaisee[]>(`/api/franchaisee/?criteria=${criteria}`);
  }
}
