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
	// keep this bc it initializes the hero object, which consists name and id
	// hero: Hero = {
	// 	id: 1,
	// 	name: "Windstorm"
	// };
	// heroes = HEROES;
	
	// selectedHero: Hero;
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
		this.heroService.addHero({ name } as Hero).subscribe(hero => {
			this.heroes.push(hero);
		});
	}
}
