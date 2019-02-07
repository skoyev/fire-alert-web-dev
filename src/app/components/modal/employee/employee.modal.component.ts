import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';

import { Hero } from '@appModels/hero';
import { HeroService } from '@appServices/hero.service';

import * as fromSelectors from '@appStore/selectors';
import * as fromReducers from '@appStore/reducers';

import { Employee } from '@appModels/employee';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as fromStore from '@appStore/index';
import { CreateEmployee, ShowNewEmployeeModal, CreateEmployeeSuccess } from '@appStore/actions/employee.actions';

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

  constructor(private store: Store<fromStore.State>,
              public activeModal: NgbActiveModal) {}

  ngOnInit() {
    this.store.dispatch(new ShowNewEmployeeModal(false));
    this.store.dispatch(new CreateEmployeeSuccess(false));
  }

  onCreateEmployee() {
    this.activeModal.dismiss();
    //console.log(this.teamForm.controls.name.value);
    let name = this.teamForm.controls.name.value;
    let type = this.teamForm.controls.type.value;
    this.store.dispatch(new CreateEmployee(new Employee(name, type)));    
  }
}
