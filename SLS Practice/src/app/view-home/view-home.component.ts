import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { CommonService } from '../shared/common.service';

@Component({
  selector: 'app-view-home',
  templateUrl: './view-home.component.html',
  styleUrls: ['./view-home.component.scss']
})
export class ViewHomeComponent implements OnInit {

  fetch_data: any;
  inputValue    : string;
  displayedColumns = [
      'firstName',
      'lastName',
      'age',
      'phoneNumber',
      'address'
    ];
  
  dataSource = new MatTableDataSource();
  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  
  constructor(
      public commonService: CommonService,
      private router: Router
    ) {}
  
  ngOnInit(): void { 
    this.generateViewData();  
  }
  
  ngAfterViewInit() {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
  }
  
  applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();
      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
  }
  
  generateViewData() {
    let localStorageUserInfo = JSON.parse(localStorage.getItem('userInfo'));
    this.dataSource.data = localStorageUserInfo? localStorageUserInfo : [];
    console.log('local storage ', localStorageUserInfo);    
  }
  
  
  ngOnDestroy() {
      // if (this.subscription) {
      //   this.subscription.unsubscribe();
      // }
  }
}
