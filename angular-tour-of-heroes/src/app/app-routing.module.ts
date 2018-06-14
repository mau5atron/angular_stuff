import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

@NgModule({
  // imports: [
  //   CommonModule
  // ],
  // declarations: []
	// no need for this ^ since there is no need to declare components in a routing module
	exports: [ RouterModule ]
}) 

export class AppRoutingModule { }
