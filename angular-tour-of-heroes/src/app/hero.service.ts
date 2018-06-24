import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

const httpOptions = {
	headers: new HttpHeaders({
		'Content-Type': 'application/json'
	})
};

@Injectable({
  providedIn: 'root'
})
export class HeroService {
	
	// provides url to web api
	private heroesUrl = 'api/heroes';


  constructor(
  	private http: HttpClient, 
  	private messageService: MessageService
  ) { }

  // injected MessageService into HeroService in order to inject into the HeroesComponent
  // retrieves heroes from the server 
	getHeroes(): Observable<Hero[]>{
			// todo: send the message _after_ fetching the heroes
			this.messageService.add('HeroService: fetched heroes');
			return this.http.get<Hero[]>(this.heroesUrl)
				.pipe(
					tap(heroes => this.log(`fetched heroes`)),
					catchError(this.handleError('getHeroes', []))
				);
			// no longer returns mock heroes - heroes a retrieved from a server 
	}

	// get hero by id - returns 'undefined' when id not found 
	getHeroNo404<Data>(id: number): Observable<Hero> {
		const url = `${this.heroesUrl}/?id=${id}`;
		
		return this.http.get<Hero[]>(url).pipe(
			// returns a {0|1} element array 
			map(heroes => heroes[0]),

			tap(h => {
				const outcome = h ? `fetched` : `did not find`;
				this.log(`${outcome} hero id=${id}`);
			}),

			catchError(this.handleError<Hero>(`getHero id=${id}`))
		);
	}

	// Requests hero by id - 404 if not found
	getHero(id: number): Observable<Hero> {
		const url = `${this.heroesUrl}/${id}`;
		this.messageService.add(`HeroService: fetched hero id=${id}`);
		return this.http.get<Hero>(url).pipe(
			tap(_ => this.log(`fetched hero id=${id}`)),
			catchError(this.handleError<Hero>(`getHero id=${id}`))
		)
	}

	// retrieve the hero names that contain the search term
	searchHeroes(term: string): Observable<Hero[]> {
		if (!term.trim()) {
			// if the term is not available, return an empty array
			return of([]);
		}
		return this.http.get<Hero[]>(`${this.heroesUrl}/?name=${term}`).pipe(
			tap(_ => this.log(`found heroes matching "${term}"`)),
			catchError(this.handleError<Hero[]>('searchHeroes', []))
		);
	}


	// All save methods //

	// HeroService.addHero differs from updateHero bc it calls HttpClient.post() instead of put()
	// expects the server to generate an id for the new hero, which it returns in the Observable<Hero> to the caller
	addHero (hero: Hero): Observable<Hero> {
		return this.http.post<Hero>(this.heroesUrl, hero, httpOptions).pipe(
			tap((hero: Hero) => this.log(`add hero w/ id=${hero.id}`)),
			catchError(this.handleError<Hero>('addHero'))
		);
	}

	deletehero (hero: Hero | number): Observable<Hero> {
		const id = typeof hero === 'number' ? hero : hero.id;
		const url = `${this.heroesUrl}/${id}`;

		return this.http.delete<Hero>(url, httpOptions).pipe(
			tap(_ => this.log(`deleted hero id=${id}`)),
			catchError(this.handleError<Hero>('deleteHero'))
		);
	}

	updateHero (hero: Hero): Observable<any> {
		return this.http.put(this.heroesUrl, hero, httpOptions).pipe(
			tap(_ => this.log(`updated hero id=${hero.id}`)),
			catchError(this.handleError<any>('updateHero'))
		);
	}

	/** 
		The private method below: 
		- handles http operations that failed 
		- Lets the app continue 
		- @.param operation - name of the operation that failed
		- @.param result - optional value to retunr as the observable result

	**/
	private handleError<T> (operation = 'operation', result?: T){
		return (error: any): Observable<T> => {
			// Sends the error to the remote logging infrastructure
			console.error(error);

			// Outputs the error in with greater visibility
			this.log(`${operation} failed: ${error.message}`);

			// Let the app keep running by returning an empty result
			return of(result as T);
		};
	}
	
	private log(message: string){
		this.messageService.add('HeroService: ' + message);
	}
}