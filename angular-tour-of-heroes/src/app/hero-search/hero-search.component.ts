import { Component, OnInit } from '@angular/core';

import { Observable, Subject } from 'rxjs';
import {
	debounceTime, 
	distinctUntilChanged,
	switchMap
} from 'rxjs/operators';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: ['./hero-search.component.css']
})
export class HeroSearchComponent implements OnInit {
	heroes$: Observable<Hero[]>;

	private searchTerms = new Subject<string>();

  constructor(private heroService: HeroService) {}

  search(term: string): void {
  	this.searchTerms.next(term);
  }

  // ngOnInit method pipes the searchTerms observable through a sequence of RxJS operators
  	//  reduces the number of calls to the searchHeroes()
  ngOnInit(): void {
  	this.heroes$ = this.searchTerms.pipe(
  		// wait 300ms after each keystroke before considering the term
  		debounceTime(300),

  		// ignore new term if it is the same as the previous term
  		distinctUntilChanged(),

  		// switch to new search observable each time the term changes
  			// only initiates after debounceTime and distinctUntilChanged make it through
  		switchMap((term: string) => this.heroService.searchHeroes(term)),
  	);
  }
}
