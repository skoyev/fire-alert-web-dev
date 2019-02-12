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
import { Team } from '@appModels/team';
import { Franchaisee } from '@appModels/franchaisee';
import { CloseNewTeamModal, CreateTeam, CreateTeamSuccess, ShowNewTeamModal } from '@appStore/actions/team.actions';
import { AuthenticationService } from '../../../core';
import * as fromStore from '@appStore/index';

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

  constructor(private store: Store<fromStore.State>,
              private dashService: DashboardService,
              private authService: AuthenticationService,              
              public activeModal: NgbActiveModal) {}

  ngOnInit() {
    this.store.dispatch(new ShowNewTeamModal(false));
    this.store.dispatch(new CreateTeamSuccess(false));
    this.store.dispatch(new CloseNewTeamModal(false))
  }

  onCreateTeam() {
    //this.activeModal.dismiss();
    //console.log(this.teamForm.controls.name.value);

    this.store.dispatch(new CloseNewTeamModal(true))
    let name = this.teamForm.controls.name.value;

    this.dashService
        .findFranchaiseeByUserID(this.authService.credentials.id)
        .subscribe((f:Franchaisee) => {
          this.store.dispatch(new CreateTeam(f.id, new Team(0, name)))
    });

  }
}
