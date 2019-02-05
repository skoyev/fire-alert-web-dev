import { Observable, of } from 'rxjs';

import { Credentials, LoginContext } from './authentication.service';

export class MockAuthenticationService {
  credentials: Credentials | null = {
    id: 1,
    username: 'test',
    token: '123',
    firstName: 'First',
    lastName: 'Last'
  };

  login(context: LoginContext): Observable<Credentials> {
    return of({
      id: 1,
      username: context.username,
      firstName: '',
      lastName: '',
      token: '123456'
    });
  }

  logout(): Observable<boolean> {
    this.credentials = null;
    return of(true);
  }

  isAuthenticated(): boolean {
    return !!this.credentials;
  }
}
