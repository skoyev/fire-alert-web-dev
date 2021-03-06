import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { finalize } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
//import { Logger, I18nService, AuthenticationService } from '@app/core';
import { AuthenticationService } from '@appCore/authentication/authentication.service';
import { Logger } from '@appCore/logger.service';
import { I18nService } from '@appCore/i18n.service';
import {TranslateService} from '@ngx-translate/core';

const log = new Logger('Login');

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  version: string = environment.version;
  error: string;
  loginForm: FormGroup;
  isLoading = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private i18nService: I18nService,
    private authenticationService: AuthenticationService
  ) {
    //this.translate = this.i18nService.getTranslateService();
    this.createForm();
  }

  ngOnInit() {
    //this.i18nService.init('en', []);
  }

  login() {
    this.isLoading = true;
    
    this.authenticationService
      .login(this.loginForm.value)
      .pipe(
        finalize(() => {
          this.loginForm.markAsPristine();
          this.isLoading = false;
        })
      )
      .subscribe(
        credentials => { 
          this.error = '';         
          if(this.authenticationService.credentials &&
              this.authenticationService.credentials.roles) {
            this.route.queryParams.subscribe(params =>
              this.router.navigate([params.redirect || '/dashboard'], { replaceUrl: true })
            );
          } else {
            console.log('Login Error');
            this.loginForm.markAsPristine();
            this.error = 'Login Error'
          }
          this.isLoading = false;
        },
        error => {
          log.debug(`Login error: ${error}`);
          this.error = error;
        }
      );      
  }

setLanguage(language: string) {
  this.i18nService.language = language;
}

get currentLanguage(): string {
  return this.i18nService.language;
}

get languages(): string[] {
  return this.i18nService.supportedLanguages;
}

  private createForm() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      remember: true
    });
  }
}