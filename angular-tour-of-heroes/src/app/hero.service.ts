import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';

import { HttpClient, HttpHeaders } from '@angular/common/http'


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

			return this.http.get<Hero[]>(this.heroesUrl);
			// no longer returns mock heroes - heroes a retrieved from a server 
	}

	getHero(id: number): Observable<Hero> {
		this.messageService .add(`HeroService: fetched hero id=${id}`);
		return of(HEROES.find(hero => hero.id === id));
	}

	private log(message: string){
		this.messageService.add('HeroService: ' + message);
	}

	private heroesURL = 'api/heroes'; // URL to web api
}