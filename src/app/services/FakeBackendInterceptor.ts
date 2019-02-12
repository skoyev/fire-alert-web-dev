import { Injectable, OnInit } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';
import users from '../../assets/data/user.json'
import profile from '../../assets/data/profile.json'
import profileUser from '../../assets/data/profile-user.json'
import franchaiseeUser from '../../assets/data/franchaisee-user.json'
import franchaisee from '../../assets/data/franchaisee.json'
import employee from '../../assets/data/employee.json'
import team from '../../assets/data/team.json'
import { Team } from '@appModels/team.js';
 
@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
 
    constructor() {         
        localStorage.setItem('users', JSON.stringify(users));
    }

    getProfileByUserID(request: HttpRequest<any>) : Observable<HttpEvent<any>> {
        let urlParts = request.url.split('/');
        let id = parseInt(urlParts[urlParts.length - 1]);
        let matchedProfileUser = profileUser.filter(r => r.user_id == id);
        let matchedProfile = matchedProfileUser.length ?
                profile.filter(p => p.id == matchedProfileUser[0].profile_id) : null;

        return of(new HttpResponse({ 
            status: 200, body: matchedProfile.length ? matchedProfile[0] : '' }));
    }

    getFranchaiseeByCriteria(request: HttpRequest<any>) : Observable<HttpEvent<any>> {
        let urlParts = request.url.split('/');
        let criteria = urlParts[urlParts.length - 1];
        let criteriaRes = criteria ? criteria.split('=') : '';
        let matchedFranchaisee = franchaisee.filter(
            r => criteriaRes.length > 1 && criteriaRes[1].length > 0 ? 
                    r.name.startsWith(criteriaRes[1]) : r );

        return of(new HttpResponse({status: 200, body: matchedFranchaisee }));
    }

    getFranchaiseeByUserID(request: HttpRequest<any>) : Observable<HttpEvent<any>> {
        let urlParts = request.url.split('/');
        let id = parseInt(urlParts[urlParts.length - 1]);
        let matchedFranchaiseeUser = franchaiseeUser.filter(r => r.user_id == id);
        let matchedFranchaisee = matchedFranchaiseeUser.length ?
                franchaisee.filter(f => f.id == matchedFranchaiseeUser[0].franchaisee_id) : null;

        return of(new HttpResponse({ 
            status: 200, body: matchedFranchaisee.length ? matchedFranchaisee[0] : '' }));
    }

    /*
    getEmployeeByFranchaiseeID(request: HttpRequest<any>) : Observable<HttpEvent<any>> {
        let urlParts = request.url.split('/');
        let id = parseInt(urlParts[urlParts.length - 1]);        
        let matchedEmployeeFranchaisee = team.filter(ef => ef.franchaisee_id == id)
                                                            .map(ef => ef.employee_id);
        let matchedEmployees = matchedEmployeeFranchaisee.length ?
                employee.filter(e => matchedEmployeeFranchaisee.includes(e.id)) : [];
        return of(new HttpResponse({ 
                    status: 200, body: matchedEmployees.length ? matchedEmployees : [] }));
    }
    */

    getTeamByFranchaiseeID(request: HttpRequest<any>) : Observable<HttpEvent<any>> {
        let urlParts = request.url.split('/');
        let id = parseInt(urlParts[urlParts.length - 1]); 
        let matchedTeamFranchaiseeIds = team.filter(t => t.franchaisee_id == id)
                                            .map(t => t.id);
        let matchedEmployee = matchedTeamFranchaiseeIds.length ?
                employee.filter(e => 
                    matchedTeamFranchaiseeIds.includes(e.team_id)) : [];

        let body: any = null;

        if(matchedTeamFranchaiseeIds.length > 0){
            let teamName = team.filter(t => t.id == matchedTeamFranchaiseeIds[0])
                               .map(t => t.name)[0]
            body = matchedEmployee.length ? 
                    {"id": matchedTeamFranchaiseeIds[0], "name":teamName, "employees" : matchedEmployee} : 
                    {"id": matchedTeamFranchaiseeIds[0], "name":teamName, "employees" : []}
        }

        return of(new HttpResponse({status: 200, body: body}));
    }

    createEmployee(request: HttpRequest<any>) : Observable<HttpEvent<any>> {        
        let urlParts = request.url.split('/');
        let franchID = parseInt(urlParts[urlParts.length - 1]);        
        let newEmplID = Math.max(... employee.map(e => e.id)) + 1;
        // find team id by franchaisee id
        let matchedTeamFranchaiseeIds = 
                        team.filter(t => t.franchaisee_id == franchID)
                            .map(t => t.id);
        let teamID = matchedTeamFranchaiseeIds.length ? matchedTeamFranchaiseeIds[0] : 1;
        let newEmployee = {"id": newEmplID, "name" : request.body.name, "type" : request.body.type, "team_id" : teamID};

        if(franchID){
            employee.push(newEmployee);
            //employeeFranchaisee.push({"employee_id":newEmplID, "franchaisee_id":franchID})
            console.log(`Added a new employee with ID ${newEmployee.id} into Franchaisee - ${franchID}`)
        }

        return of(new HttpResponse({status: 200, body:{}}));
    }

    createTeam(request: HttpRequest<any>) : Observable<HttpEvent<any>> {        
        let urlParts = request.url.split('/');
        let franchID = parseInt(urlParts[urlParts.length - 1]);        
        let newTeamID = Math.max(... team.map(e => e.id)) + 1;
        let newTeam = {"id": newTeamID, "name" : request.body.name, "franchaisee_id" : franchID};

        if(franchID){
            team.push(newTeam);
            console.log(`Added a new team with ID ${newTeamID} into Franchaisee - ${franchID}`)
        }

        return of(new HttpResponse({status: 200, body:{}}));
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // array in local storage for registered users
        let users: any[] = JSON.parse(localStorage.getItem('users')) || [];
 
        // wrap in delayed observable to simulate server api call
        return of(null).pipe(mergeMap(() => {
 
            // authenticate
            if (request.url.endsWith('/users/authenticate') && request.method === 'POST') {
                // find if any user matches login credentials
                let filteredUsers = users.filter(user => {
                    return user.username === request.body.username && user.password === request.body.password;
                });
 
                if (filteredUsers.length) {
                    // if login details are valid return 200 OK with user details and fake jwt token
                    let user = filteredUsers[0];
                    let body = {
                        id: user.id,
                        username: user.username,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        token: 'fake-jwt-token',
                        roles: user.roles
                    };
 
                    return of(new HttpResponse({ status: 200, body: body }));
                } else {
                    // else return 400 bad request
                    return throwError({ error: { message: 'Username or password is incorrect' } });
                }
            }

            // get profile
            if (request.url.match(/\/profile\/\d+$/) && request.method === 'GET') {
                return this.getProfileByUserID(request);
            }

            // get franchaisee by user id
            if (request.url.startsWith('/api/franchaisee/user/') 
                    && request.method === 'GET') {
                return this.getFranchaiseeByUserID(request);
            }   
            
            // get franchaisee by user id
            if (request.url.startsWith('/api/franchaisee/') 
                    && request.method === 'GET') {
                return this.getFranchaiseeByCriteria(request);
            }   
            
            // get employees by franchaisee id
            /*
            if (request.url.startsWith('/api/employee/franchaisee/') 
                    && request.method === 'GET') {
                return this.getEmployeeByFranchaiseeID(request);
            } 
            */           
 
            // get team by franchaisee id
            if (request.url.startsWith('/api/team/franchaisee/') 
                    && request.method === 'GET') {
                return this.getTeamByFranchaiseeID(request);
            }            

            // create employee
            if (request.url.startsWith('/api/employee') 
                    && request.method === 'POST') {
                return this.createEmployee(request);
            }            

            // create team
            if (request.url.startsWith('/api/team') 
                    && request.method === 'POST') {
                return this.createTeam(request);
            }            

            // get users
            if (request.url.endsWith('/users') && request.method === 'GET') {
                // check for fake auth token in header and return users if valid, this security is implemented server side in a real application
                if (request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                    return of(new HttpResponse({ status: 200, body: users }));
                } else {
                    // return 401 not authorised if token is null or invalid
                    return throwError({ error: { message: 'Unauthorised' } });
                }
            }
 
            // get user by id
            if (request.url.match(/\/users\/\d+$/) && request.method === 'GET') {
                // check for fake auth token in header and return user if valid, this security is implemented server side in a real application
                if (request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                    // find user by id in users array
                    let urlParts = request.url.split('/');
                    let id = parseInt(urlParts[urlParts.length - 1]);
                    let matchedUsers = users.filter(user => { return user.id === id; });
                    let user = matchedUsers.length ? matchedUsers[0] : null;
 
                    return of(new HttpResponse({ status: 200, body: user }));
                } else {
                    // return 401 not authorised if token is null or invalid
                    return throwError({ error: { message: 'Unauthorised' } });
                }
            }
 
            // register user
            if (request.url.endsWith('/users/register') && request.method === 'POST') {
                // get new user object from post body
                let newUser = request.body;
 
                // validation
                let duplicateUser = users.filter(user => { return user.username === newUser.username; }).length;
                if (duplicateUser) {
                    return throwError({ error: { message: 'Username "' + newUser.username + '" is already taken' } });
                }
 
                // save new user
                newUser.id = users.length + 1;
                users.push(newUser);
                localStorage.setItem('users', JSON.stringify(users));
 
                // respond 200 OK
                return of(new HttpResponse({ status: 200 }));
            }
 
            // delete user
            if (request.url.match(/\/users\/\d+$/) && request.method === 'DELETE') {
                // check for fake auth token in header and return user if valid, this security is implemented server side in a real application
                if (request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                    // find user by id in users array
                    let urlParts = request.url.split('/');
                    let id = parseInt(urlParts[urlParts.length - 1]);
                    for (let i = 0; i < users.length; i++) {
                        let user = users[i];
                        if (user.id === id) {
                            // delete user
                            users.splice(i, 1);
                            localStorage.setItem('users', JSON.stringify(users));
                            break;
                        }
                    }
 
                    // respond 200 OK
                    return of(new HttpResponse({ status: 200 }));
                } else {
                    // return 401 not authorised if token is null or invalid
                    return throwError({ error: { message: 'Unauthorised' } });
                }
            }
 
            // pass through any requests not handled above
            return next.handle(request);
             
        }))
 
        // call materialize and dematerialize to ensure delay even if an error is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648)
        .pipe(materialize())
        .pipe(delay(500))
        .pipe(dematerialize());
    }
}
 
export let fakeBackendProvider = {
    // use fake backend in place of Http service for backend-less development
    provide: HTTP_INTERCEPTORS,
    useClass: FakeBackendInterceptor,
    multi: true
};