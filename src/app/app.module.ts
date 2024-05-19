import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

import { AppComponent } from './app.component';

@NgModule({
	imports: [
		BrowserModule,
		HttpClientModule,
		CommonModule,
	],
	declarations: [
		AppComponent,
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
