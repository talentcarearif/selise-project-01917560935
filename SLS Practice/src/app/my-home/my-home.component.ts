import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { Subject, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { AddBookmarkComponent } from '../add-bookmark/add-bookmark.component';
import { CommonService } from '../shared/common.service';

@Component({
  selector: 'app-my-home',
  templateUrl: './my-home.component.html',
  styleUrls: ['./my-home.component.scss']
})
export class MyHomeComponent implements OnInit {
  private readonly searchSubject = new Subject<string | undefined>();
  searchSubscription: Subscription;
  searchResults : any;
  formId        : any = 'add-form';
  form          : FormGroup;
  paramId	      : number;
  currentDate   : any = moment().format('YYYY-MM-DDThh:mm:ssZ');
  loginUser     : string;
  itemArray     : any = [];
  zoneList      : any = [];
  bookMarkArray : any = [];
  viewData      : any = [];
  selectedItem  : any;
  today         : any = moment().format('YYYY-MM-DD');
  generatedId   : number;

  constructor(
      public fb: FormBuilder,
      public commonService: CommonService,
      private dialog: MatDialog,
      private router: Router,
      private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.paramId = this.route.snapshot.params.id;
    this.generatedId = Math.round(Math.random()*1000000);
    this.formInfo();
    this.getBookmarkData();
    this.mouseHoverEvent();
  }

  mouseHoverEvent() {
    this.searchSubscription = this.searchSubject
    .pipe(
      debounceTime(3000),
    )
    .subscribe((results) => {
      this.selectedItem = results;
     }
    );
  }

  getBookmarkData() {
    let getData = JSON.parse(localStorage.getItem('bookmark'));
    if (getData?.length > 0) {
      this.bookMarkArray = getData;
    } else {
      this.bookMarkArray = [];
    }
    if (this.paramId) {
      this.setSelectedItem();
    }
  }

  setSelectedItem() {
    let findItem = this.bookMarkArray.find((x:any)=> x.id == this.paramId);
    if (findItem != null) {
      this.selectedItem = findItem;
    }
  }

 formInfo() {
  this.form = this.fb.group({
    id           : [this.generatedId],
    firstname    : [null,Validators.required],
    lastname     : [null, Validators.required],
    age          : [null,Validators.required],
    address      : [null,Validators.required],
    phonenumber  : [null,[Validators.required, Validators.pattern('[- +()0-9]{11}')]],
    bookdate     : [null,Validators.required],
  })
};

openAddBookmarkModal(type?: any){
  const dialogRef = this.dialog.open(AddBookmarkComponent, {
   disableClose: true,
   maxWidth: '560px',
   minWidth: '560px',
   data: {
    bookMarkArray : this.bookMarkArray, 
    type: type,
    selectedItem: this.selectedItem
   }
  });

  dialogRef.afterClosed().subscribe((isConfirmed: boolean) => {
    if(isConfirmed) {
      this.ngOnInit();
    }
  })
 };

onClickDetailsButton(item:any) {
    this.selectedItem = item;
    this.paramId = item?.id;
    this.router.navigate(["bookmark",{id:this.selectedItem['id']}]);
}

onMouseOverDetailsButton(item:any) {
  this.searchSubject.next(item);
}

onClickDiv() {
  this.openAddBookmarkModal('update');
  this.router.navigate(["bookmark",{id:this.selectedItem['id']}]);
}

ngOnDestroy() {
  if (this.searchSubscription) {
    this.searchSubscription.unsubscribe();
  }
}

}
