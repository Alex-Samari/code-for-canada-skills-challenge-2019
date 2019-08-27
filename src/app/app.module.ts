import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import {
  MatFormFieldModule,
  MatTableModule,
  MatPaginatorModule,
  MatInputModule,
  MatSortModule,
  MatCardModule,
  MatButtonModule,
  MatTabsModule,
  MatListModule,
  MatDividerModule,
  MatIconModule,
} from '@angular/material';

import {} from '@angular/material/paginator';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [AppComponent],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatTableModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatInputModule,
    BrowserAnimationsModule,
    MatSortModule,
    MatCardModule,
    MatButtonModule,
    MatTabsModule,
    MatListModule,
    MatDividerModule,
    MatIconModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
