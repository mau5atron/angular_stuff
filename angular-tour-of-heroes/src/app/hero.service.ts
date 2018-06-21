import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';

import { HttpClient, HttpHeaders } from '@angular/common/http'
import { catchError, map, tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class HeroService {
	
  constructor(
  	private http: HttpClient, 
  	private messageService: MessageService
  ) { }
  // injected MessageService into HeroService in order to inject into the HeroesComponent

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

	// Requests hero by id - 404 if not found
	getHero(id: number): Observable<Hero> {
		const url = `${this.heroesUrl}/${id}`;
		this.messageService.add(`HeroService: fetched hero id=${id}`);
		return this.http.get<Hero>(url).pipe(
			tap(_ => this.log(`fetched hero id=${id}`)),
			catchError(this.handleError<Hero>(`getHero id=${id}`))
		)
	}

	private log(message: string){
		this.messageService.add('HeroService: ' + message);
	}

	private heroesURL = 'api/heroes'; // URL to web api



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
}