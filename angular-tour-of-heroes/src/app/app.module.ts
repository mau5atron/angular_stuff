import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // NgModel lives in the forms module
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';

// When the heroes component was generated, it was automatically added to the app module 
import { HeroesComponent } from './heroes/heroes.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { MessagesComponent } from './messages/messages.component';
import { AppRoutingModule } from './/app-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component'; 

import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './in-memory-data.service';
import { HeroSearchComponent } from './hero-search/hero-search.component';


@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,

    // HttpClientInMemoryWebApiModule module intercepts HTTP requests 
      // + returns simulated server responses 
        // Remove the code below when you man up and connect to a real server to receive requests 
    HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService, { dataEncapsulation:false })
  ], 
   
  declarations: [
    AppComponent,
    HeroesComponent,
    HeroDetailComponent,
    MessagesComponent,
    DashboardComponent,
    HeroSearchComponent // added to NgModule when hero component was generated
  ],
  
  bootstrap: [AppComponent]
})
export class AppModule { }
