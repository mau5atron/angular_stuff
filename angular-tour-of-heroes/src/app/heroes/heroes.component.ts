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

  constructor(private heroService: HeroService){}
  // contsructor parameter hero service property is defined and identifies hero service injection site

  ngOnInit() {
  	this.getHeroes();
  	// calls function after constructing a HeroesComponent instance 
  }
  
	getHeroes(): void {
		this.heroService.getHeroes().subscribe(heroes => this.heroes = heroes);
		// getHeroes function retrieves heroes from the service
	}

	add(name: string): void {
		name = name.trim();

		if (!name) { return; }
		// when the name is not blank
		this.heroService.addHero({ name } as Hero).subscribe(hero => {
			// handler creates a hero-like object from the name(still missing id)
			this.heroes.push(hero);
			// then passes it to the services addHero()
		});
	}

	delete(hero: Hero): void {
		this.heroes = this.heroes.filter(h => h !== hero);
		this.heroService.deleteHero(hero).subscribe();
	}
}
