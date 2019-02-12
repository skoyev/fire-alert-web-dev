import { Action } from '@ngrx/store';
import { Franchaisee } from '@appModels/franchaisee';

export enum FranchaiseeActionTypes {
    ShowNewFranchaisee = '[ShowNewFranchaisee] New Franchisee',
    CreateFranchaisee = '[FranchaiseeAction] Create Franchaisee',
    CreateFranchaiseeSuccess = '[CreateFranchaiseeSuccess] CreateFranchaisee Success',
    FranchaiseeError = '[FranchaiseeError] Error',
    FranchaiseeDetectChanges = '[FranchaiseeDetectChanges] Changes',
    CloseNewFranchaiseeModal = '[CloseNewFranchaiseeModal] Close Franchaisee Modal',
    SearchFranchaisee = '[SearchFranchaisee] Search',
    SearchFranchaiseeSuccess = '[SearchFranchaiseeSuccess] Search Result'
}

export class CloseNewFranchaiseeModal implements Action {
  readonly type = FranchaiseeActionTypes.CloseNewFranchaiseeModal;
  constructor(public payload: boolean) {}
}

export class FranchaiseeDetectChanges implements Action {
  readonly type = FranchaiseeActionTypes.FranchaiseeDetectChanges;
  constructor(public payload: boolean) {}
}

export class CreateFranchaiseeSuccess implements Action {
  readonly type = FranchaiseeActionTypes.CreateFranchaiseeSuccess;
  constructor(public payload: boolean) {}
}

export class ShowNewFranchaiseeModal implements Action {
  readonly type = FranchaiseeActionTypes.ShowNewFranchaisee;
  constructor(public payload: boolean) {}
}

export class CreateFranchaisee implements Action {
  readonly type = FranchaiseeActionTypes.CreateFranchaisee;
  constructor(public payload: Franchaisee) {}
}

export class FranchaiseeError implements Action {
  readonly type = FranchaiseeActionTypes.FranchaiseeError;
  constructor(public payload: any) {}
}

export class SearchFranchaisee implements Action {
  readonly type = FranchaiseeActionTypes.SearchFranchaisee;
  constructor(public payload: string) {}
}

export class SearchFranchaiseeSuccess implements Action {
  readonly type = FranchaiseeActionTypes.SearchFranchaiseeSuccess;
  constructor(public payload: Franchaisee[]) {}
}

export type FranchaiseeAction = 
  CreateFranchaisee | 
  ShowNewFranchaiseeModal |
  CreateFranchaiseeSuccess |
  FranchaiseeDetectChanges |
  CloseNewFranchaiseeModal |
  FranchaiseeError |
  SearchFranchaisee |
  SearchFranchaiseeSuccess;
