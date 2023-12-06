import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../../pokemon.service';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss']
})
export class PokemonListComponent implements OnInit {
  pokemonList: any[] = [];
  searchQuery: string = '';


  constructor(private pokemonService: PokemonService) {}

  ngOnInit(): void {
    this.loadPokemon();
  }

  get filteredPokemonList(): any[] {
    const filteredList = this.pokemonList.filter(pokemon =>
      pokemon.name.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
    console.log(filteredList); // Log the filtered list
    return filteredList;
  }
  
  loadPokemon(): void {
    this.pokemonService.getAllPokemon().subscribe((data: any) => {
      this.pokemonList = data.results;

      // Fetch detailed information for each Pokémon
      this.pokemonList.forEach((pokemon: any) => {
        this.pokemonService.getPokemonDetails(pokemon.name).subscribe((details: any) => {
          Object.assign(pokemon, details);
          // Fetch additional species details
          this.loadSpeciesDetails(pokemon);
        });
      });
    });
  }
  loadSpeciesDetails(pokemon: any): void {
    this.pokemonService.getPokemonSpeciesDetails(pokemon.name).subscribe((speciesDetails: any) => {
      // Merge species details into the existing pokemon object
      Object.assign(pokemon, speciesDetails);
      // Fetch additional information like evolutionary chain
      this.loadEvolutionChainDetails(pokemon);
    });
  }
  loadEvolutionChainDetails(pokemon: any): void {
    if (pokemon?.evolution_chain?.url) {
      this.pokemonService.getEvolutionChainDetails(pokemon.evolution_chain.url).subscribe((evolutionChainDetails: any) => {
        // Merge evolution chain details into the existing pokemon object
        Object.assign(pokemon, { evolutionChain: evolutionChainDetails });
      });
    }
  }
  

}
