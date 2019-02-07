import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';

import * as fromSelectors from '@appStore/selectors';
import * as fromReducers from '@appStore/reducers';

import { DashboardService } from '@appServices/dashboard.service';
import { Profile, BusinessProfile } from '@appModels/profile';
import { Employee } from '@appModels/employee';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-team-modal',
  templateUrl: './team.modal.component.html',
  styleUrls: ['./team.modal.component.css']
})
export class TeamModal implements OnInit {
  @Input() name;
  
  teamForm = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(4)
    ])
  });

  constructor(private store: Store<fromReducers.hero.State>,
              public activeModal: NgbActiveModal) {}

  ngOnInit() {}

  onCreateTeam() {
    this.activeModal.dismiss();
    console.log(this.teamForm.controls.name.value);
  }
}
