import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { MaterialModule } from './shared/material.module';
import { MyHomeComponent } from './my-home/my-home.component';
import { CommonService } from './shared/common.service';
import { HttpClientModule } from '@angular/common/http';
import { ViewHomeComponent } from './view-home/view-home.component';
import { AddBookmarkComponent } from './add-bookmark/add-bookmark.component';
import { GroupByPipe } from './services/group-by.pipe';

@NgModule({
  declarations: [
    AppComponent,
    MyHomeComponent,
    ViewHomeComponent,
    AddBookmarkComponent,
    GroupByPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    MaterialModule,
    HttpClientModule
  ],
  providers: [CommonService],
  bootstrap: [AppComponent]
})
export class AppModule { }
