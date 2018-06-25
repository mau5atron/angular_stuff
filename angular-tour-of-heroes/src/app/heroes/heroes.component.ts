import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
// import { HEROES } from '../mock-heroes';
// being replace with hero service
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
	heroes: Hero[];

  // contsructor parameter hero service property is defined and identifies hero service injection site	
  constructor(private heroService: HeroService){}

  ngOnInit() {
  	// calls function after constructing a HeroesComponent instance 
  	this.getHeroes();
  }
  
	getHeroes(): void {
		// getHeroes function retrieves heroes from the service
		this.heroService.getHeroes().subscribe(heroes => this.heroes = heroes);
	}

	add(name: string): void {
		name = name.trim();

		// when the name is not blank
		if (!name) { return; }
		
			// handler creates a hero-like object from the name(still missing id)
		this.heroService.addHero({ name } as Hero).subscribe(hero => {
			// then passes it to the services addHero()
			this.heroes.push(hero);
		});
	}

	delete(hero: Hero): void {
		this.heroes = this.heroes.filter(h => h !== hero);
		this.heroService.deleteHero(hero).subscribe();
	}
}
