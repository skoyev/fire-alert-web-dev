import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { finalize } from 'rxjs/operators';
import * as fromReducers from '@appStore/reducers';

import { environment } from '../../../../environments/environment';
import { AuthenticationService, Credentials } from '@appCore/authentication/authentication.service';
import { Logger } from '../../../core/logger.service';
import { I18nService } from '../../../core/i18n.service';
import {TranslateService} from '@ngx-translate/core';
import { Store } from '@ngrx/store';
import { SearchReset } from '@appStore/actions/search.actions';
import { ShowProfile } from '@appStore/actions/user.actions';

@Component({
  selector: 'header-fire-alert',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  version: string = environment.version;
  credentials:Credentials;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private i18nService: I18nService,
    private store: Store<fromReducers.hero.State>,
    private authenticationService: AuthenticationService
  ) {
  }

  ngOnInit() {
    if(this.authenticationService.isAuthenticated()){
      this.credentials = this.authenticationService.credentials;
    }
  }

  showProfile(event:any, shouldShowProfile:boolean) {
    event.preventDefault();
    event.stopPropagation();    
    this.store.dispatch(new ShowProfile(shouldShowProfile))
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
}