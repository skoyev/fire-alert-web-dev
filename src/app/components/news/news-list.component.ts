import { Component, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { finalize } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { I18nService } from '../../core/i18n.service';
import { TranslateService} from '@ngx-translate/core';
import { DashboardService } from '@appServices/dashboard.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'news-list-fire-alert',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.scss']
})
export class NewsListComponent implements OnDestroy {

  constructor(
    private router: Router,
    private route: ActivatedRoute,    
    private i18nService: I18nService,
    private dashboardService: DashboardService    
  ) {
  }

  ngOnDestroy() {
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