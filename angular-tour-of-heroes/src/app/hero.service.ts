import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { HEROES } from './mock-heroes';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';


@Injectable({
  providedIn: 'root'
})
export class HeroService {
	
  constructor(private messageService: MessageService) { }
  // injected MessageService into HeroService in order to inject into the HeroesComponent

	getHeroes(): Observable<Hero[]>{
			// todo: send the message _after_ fetching the heroes
			this.messageService.add('HeroService: fetched heroes');
			return of(HEROES);
			// returns mock heroes
	}

	getHero(id: number): Observable<Hero> {
		this.messageService .add(`HeroService: fetched hero id=${id}`);
		return of(HEROES.find(hero => hero.id === id));
	}
}