import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { FormGroup } from '@angular/forms';
import { ConfirmationDialog } from './models/confirmation-dialog.model';
import { ConfirmDialogComponent } from './components/confirmation-dialog.component';

@Injectable()
export class CommonService {

  userInformation : any;
  movieSchedule : any;
  localStorageUserData : any = [];
  localStorageUserMovieScheduleData : any = [];
  bookedSchedule : any = [];

  constructor(
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private router: Router
  ) {}


  showSuccessMsg(msg: string, duration = 3000): void {
    this.snackBar.open(msg, '', {
      duration: duration,
      verticalPosition: 'top',
      horizontalPosition: 'right',
      panelClass: ['snackbar-container', 'success'],
    });
  }

  showErrorMsg(msg: string, duration = 3000): void {
    this.snackBar.open(msg, '', {
      duration: duration,
      verticalPosition: 'top',
      horizontalPosition: 'right',
      panelClass: ['snackbar-container', 'danger'],
    });
  }

  showDialog(data: ConfirmationDialog, callback: Function): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      disableClose: true,
      minWidth: '550px',
      data,
    });
    dialogRef.afterClosed().subscribe((isConfirmed: boolean) => {
      if (isConfirmed) {
        if (callback) {
          callback();
        }
      }
    });
  }

  refreshViaHome(path:any) {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([path]);
    });
  }

  resetForm(form: FormGroup) {
    form.reset();
    Object.keys(form.controls).forEach((key) => {
      form.get(key).setErrors(null);
    });
  }

  numberOnly(event:any): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }
}
