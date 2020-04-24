// import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { FormsModule } from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NgxSelectModule } from 'ngx-select-ex';


import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    // BrowserModule,
    HttpClientModule,
    FormsModule,
    Ng2SearchPipeModule,
    MatSelectModule,
    MatInputModule,
    NoopAnimationsModule,
    NgxSelectModule
  ],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
