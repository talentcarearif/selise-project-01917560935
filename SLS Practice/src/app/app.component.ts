import { Component, OnInit } from '@angular/core';
import { CommonService } from './shared/common.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Movie Ticket Online';
  
  constructor(private commonService: CommonService) {

  }
  ngOnInit() {
  }

  clearStorage() {
    localStorage.removeItem('bookmark');
    this.commonService.showSuccessMsg('Bookmark storage clear successfully')
  }

  onClickExit() {
    this.commonService.showDialog(
      {
        title: 'Confirmation - Clear Storage',
        content: 'Are you want to clear bookmark local storage records?'
      },
      () => this.clearStorage()
    )  
  }

}

