import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { HEROES } from './mock-heroes';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';


@Injectable({
  providedIn: 'root'
})
export class HeroService {
	getHeroes(): Observable<Hero[]>{
		return of(HEROES);
		// returns mock heroes
	}
  constructor(private messageService: MessageService) { }
  // injected MessageService into HeroService in order to inject into the HeroesComponent
}
