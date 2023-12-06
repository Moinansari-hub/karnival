import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PokemonService } from '../../pokemon.service';

@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.scss']
})
export class PokemonDetailComponent implements OnInit {
  pokemonName: string;
  pokemonDetails: any;

  // Injecting ActivatedRoute and PokemonService in the constructor
  constructor(
    private route: ActivatedRoute,
    private router: Router, 
    private pokemonService: PokemonService
  ) {}

  ngOnInit(): void {
       // Subscribe to route parameter changes when the component initializes
    this.route.params.subscribe((params) => {
      this.pokemonName = params['name'];
      this.loadPokemonDetails(); // Load Pokéemon details when the route parameters change
   
    });
  }
// Function to load details of the selected Pokémon
  loadPokemonDetails(): void {
    // Subscribe to the PokemonService to get details for the specified Pokémon
    this.pokemonService.getPokemonDetails(this.pokemonName).subscribe(
      (details: any) => {
        console.log('Details:', details); // For debugging
        this.pokemonDetails = details;

        // Fetch additional species details
        this.pokemonService.getPokemonSpeciesDetails(this.pokemonName).subscribe(
          (speciesDetails: any) => {
            console.log('Species Details:', speciesDetails); // For debugging
            // Merge species details into the existing pokemon object
            this.pokemonDetails.speciesDetails = speciesDetails;

            // Fetch additional information like evolutionary chain
            this.loadEvolutionChainDetails();
          },
          (error:any) => {
            console.error('Error fetching species details:', error);
          }
        );
      },
      (error) => {
        console.error('Error fetching Pokemon details:', error);
      }
    );
  }
// Function to load details of the Pokémon's evolution chain
  loadEvolutionChainDetails(): void {
    // Check if the evolution chain URL is available in the species details
    if (this.pokemonDetails?.speciesDetails?.evolution_chain?.url) {
       // Subscribe to the PokemonService to get details for the evolution chain
      this.pokemonService.getEvolutionChainDetails(this.pokemonDetails.speciesDetails.evolution_chain.url)
        .subscribe(
          (evolutionChainDetails: any) => {
            console.log('Evolution Chain Details:', evolutionChainDetails); // For debugging
            // Merge evolution chain details into the existing pokemon object
            this.pokemonDetails.evolutionChainDetails = evolutionChainDetails;
          },
          (error:any) => {
            console.error('Error fetching evolution chain details:', error);
          }
        );
    }
  }
  goBack(): void {
    this.router.navigate(['/']); // Navigate to the root route (list page)
  }
}
