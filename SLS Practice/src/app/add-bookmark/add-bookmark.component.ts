import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonService } from '../shared/common.service';

@Component({
  selector: 'app-add-bookmark',
  templateUrl: './add-bookmark.component.html',
  styleUrls: ['./add-bookmark.component.scss']
})
export class AddBookmarkComponent implements OnInit {
  formId        : any = 'add-bookmark-form';
  form          : FormGroup;
  paramId       : number;
  generatedId   : number;
  selectedItem  : any;
  categoryList  : any = [];
  bookMarkArray : any = [];
  type          : any;
  isShowCategory: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<AddBookmarkComponent>,
    public fb: FormBuilder,
    public commonService: CommonService,
    @Inject(MAT_DIALOG_DATA) public data
  ) { }

  ngOnInit(): void {
    this.generatedId = Math.round(Math.random()*1000000);
    this.type = this.data['type'];
    this.selectedItem = this.data['selectedItem'];
    this.formInfo();   
    this.getBookmarkData(); 
  }

  get f() {
    return this.form.controls;
  }

  getCategoryList() {
    this.categoryList = [];
    this.bookMarkArray.forEach((element:any) => {
      let duplicateCheck = this.categoryList.find((x:any)=> x.value == element.category);
      if (duplicateCheck == null) {
        this.categoryList.push({value: element.category, viewValue: element.category});
      }
    });

    if(this.type == 'update') {
      this.form.patchValue(this.selectedItem); 
      this.form.get('viewCategory').setValue(this.form?.value?.category);  
    }
  }

  getBookmarkData() {
    this.bookMarkArray = this.data['bookMarkArray'];
    this.getCategoryList();
  }

  formInfo() {
    this.form = this.fb.group({
      id           : [this.generatedId],
      title        : ['', Validators.required],
      url          : ['', [Validators.required,Validators.pattern('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?')]],
      category     : ['', Validators.required],
      viewCategory : [''],
    })
  };

  onAddCategoryButtonClick() {
    this.isShowCategory = true;
  }

  onClickCancleButton() {
    this.isShowCategory = false;
  }

  onClickURL() {
    if (this.form.value.title == null || this.form.value.title == '' && this.form.controls.url.valid) {
      this.form.get('title').setValue('URL Title');
    }
  }

  saveOrUpdateData() {
    if (this.type == 'add') {
      this.bookMarkArray.push({
        id: this.form.value.id,
        title: this.form.value.title,
        url: this.form.value.url,
        category: this.form.value.category
      })
      localStorage.setItem('bookmark', JSON.stringify(this.bookMarkArray));
      this.commonService.showSuccessMsg('Record save successfully');
      this.dialogRef.close(true);
    }
    else {
      // let updateData = this.bookMarkArray.find((x:any)=> x.id == this.form.value.id);
      this.bookMarkArray.map((x:any)=>{
        if (x.id == this.form.value.id) {
          x.title = this.form.value.title,
          x.url = this.form.value.url,
          x.category = this.form.value.category
        }
      })
      localStorage.setItem('bookmark', JSON.stringify(this.bookMarkArray));
      this.commonService.showSuccessMsg('Record updated successfully');
      this.dialogRef.close(true);
    }
  }

  onChangeCategory(eventValue: string) {
    this.form.get('category').setValue(eventValue);
  }

  onSaveConfirmation = (): void => {
    if (this.form.valid) {
      this.commonService.showDialog(
        {
          title: this.type == 'update'? 'Confirmation - Update Record' : 'Confirmation - Save Record',
          content: this.type == 'update'? 'Are you want to update record?' : 'Are you want to save record?'
        },
        () => this.saveOrUpdateData()
      )  
    }
    else {
      this.commonService.showErrorMsg('Please fill up all required fields');
    }
     
  };

   ngOnDestroy() {

   }

}
