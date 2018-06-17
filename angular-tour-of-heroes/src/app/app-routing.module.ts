import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HeroesComponent } from './heroes/heroes.component';

const routes: Routes = [
	{ path: 'heroes', component: HeroesComponent }
]; 

@NgModule({
  imports: [
    // CommonModule
    RouterModule.forRoot(routes)
    // forRoot is used for configuring the router at the application root level
    	// method supplies the service providers and directives needed for routing
    		// Performs initial navigation based on the current browser URL
  ],
  // declarations: []
	// no need for this ^ since there is no need to declare components in a routing module
	exports: [ RouterModule ]
}) 

export class AppRoutingModule { 


}