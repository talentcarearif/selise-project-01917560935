import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConfirmationDialog } from '../models/confirmation-dialog.model';


@Component({
  selector: 'confirmation-dialog',
  template: `
    <h2 mat-dialog-title>{{ data.title }}</h2>

    <mat-dialog-content [innerHTML]="data.content"></mat-dialog-content>

    <mat-dialog-actions *ngIf="!data?.disableActionButtons" fxLayoutAlign="end">
      <button
        mat-raised-button
        [mat-dialog-close]="true"
        color="accent"
        class="white-text"
      >
        {{ data.confirmButtonText || 'YES' }}
      </button>
      <button mat-raised-button [mat-dialog-close]="false" class="white-text" color="warn">
        {{ data.cancelButtonText || 'NO' }}
      </button>
    </mat-dialog-actions>
  `
})
export class ConfirmDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ConfirmationDialog
  ) {
  }

  isTemplateRef(content: any): boolean {
    if (typeof content !== 'string') {
      return true;
    }
    return false;
  }
}
