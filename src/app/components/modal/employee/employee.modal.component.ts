import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';

import { Hero } from '@appModels/hero';
import { HeroService } from '@appServices/hero.service';

import * as fromSelectors from '@appStore/selectors';
import * as fromReducers from '@appStore/reducers';

import { Employee } from '@appModels/employee';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as fromStore from '@appStore/index';
import { CreateEmployee, ShowNewEmployeeModal, CreateEmployeeSuccess, CloseNewEmployeeModal } from '@appStore/actions/employee.actions';
import { DashboardService } from '@appServices/dashboard.service';
import { AuthenticationService } from '../../../core';
import { map } from 'rxjs/operators';
import { Franchaisee } from '@appModels/franchaisee';

@Component({
  selector: 'app-employee-modal',
  templateUrl: './employee.modal.component.html',
  styleUrls: ['./employee.modal.component.css']
})
export class EmployeeModal implements OnInit {
  @Input() name;
  teamForm = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(4)
    ]),
    type: new FormControl('', [
      Validators.required,
      Validators.minLength(4)
    ]),
  });
  activeModal: NgbActiveModal;

  constructor(private store: Store<fromStore.State>,
              private dashService: DashboardService,
              private authService: AuthenticationService,              
              activeModal: NgbActiveModal) {
    this.activeModal = activeModal;
  }

  ngOnInit() {
    this.store.dispatch(new ShowNewEmployeeModal(false));
    this.store.dispatch(new CreateEmployeeSuccess(false));
    this.store.dispatch(new CloseNewEmployeeModal(false))
  }

  onCreateEmployee() {
    //this.activeModal.dismiss();    
    this.store.dispatch(new CloseNewEmployeeModal(true))
    let name = this.teamForm.controls.name.value;
    let type = this.teamForm.controls.type.value;

    this.dashService
        .findFranchaiseeByUserID(this.authService.credentials.id)
        .subscribe((f:Franchaisee) => {
          this.store.dispatch(new CreateEmployee(f.id, new Employee(0, name, type)))
    });
  }
}
