import { Component, OnInit } from '@angular/core';
import { environment } from '../environments/environment';
import { TranslateService } from '@ngx-translate/core';
import { Logger, I18nService } from './core';

const log = new Logger('App');

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Fire Alert';

  constructor( private translateService: TranslateService,
               private i18nService: I18nService) { }

  ngOnInit() {
      // Setup logger
      if (environment.production) {
        Logger.enableProductionMode();
      }

      log.debug('init');

      // Setup translations
      this.i18nService.init(environment.defaultLanguage, environment.supportedLanguages);
    }
}
