import { Component, OnDestroy, Input, Output } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { finalize } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { I18nService } from '../../core/i18n.service';
import { TranslateService} from '@ngx-translate/core';
import { DashboardService } from '@appServices/dashboard.service';
import { Subscription } from 'rxjs';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'dashboard-menu-fire-alert',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnDestroy {
  shouldShowDashboard: boolean = false;
  dashBoardSubscription: Subscription;
  private activeEl: string;
  @Input() menuItems1: string[];
  @Input() menuItems2: string[];
  @Input() menuItems3: string[];
  @Output() menu = new EventEmitter<any>();

  constructor(
    private router: Router,
    private route: ActivatedRoute,    
    private i18nService: I18nService,
    private dashboardService: DashboardService    
  ) {
     // subscribe to home component messages
     this.dashBoardSubscription = this.dashboardService
                                      .getDashboardSubscription()
                                      .subscribe(shouldShowDashboard => 
                                        { this.shouldShowDashboard = shouldShowDashboard; });
      this.activeEl = this.router.url.replace('/','').toLowerCase();
  }

  ngOnDestroy() {
    this.dashBoardSubscription.unsubscribe();
  }  

  setLanguage(language: string) {
    this.i18nService.language = language;
  }

  setActive(event:any, elem:string){
    event.preventDefault();
    event.stopPropagation(); 
    this.activeEl = elem.toLowerCase();
    this.menu.emit(this.activeEl);
  }

  isActive(elem: string): boolean{
    return this.activeEl == elem.toLowerCase();
  }

  get currentLanguage(): string {
    return this.i18nService.language;
  }

  get languages(): string[] {
    return this.i18nService.supportedLanguages;
  }
}