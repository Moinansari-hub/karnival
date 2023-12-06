import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private apiUrl = 'https://pokeapi.co/api/v2/pokemon';

  constructor(private http: HttpClient) {}
// Fetch a list of all Pokémon
  getAllPokemon(): Observable<any> {
    return this.http.get(`${this.apiUrl}?limit=20`);// Adjust the limit as needed
  }
 // Fetch details for a specific Pokémon by name
  getPokemonDetails(pokemonId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${pokemonId}`);
  }
 // Fetch species details for a specific Pokémon by name
  getPokemonSpeciesDetails(pokemonName: string): Observable<any> {
    return this.http.get(`${this.apiUrl}-species/${pokemonName}`);
  }
 // Fetch evolution chain details for a specific Pokémon by URL
  getEvolutionChainDetails(evolutionChainUrl: string): Observable<any> {
    return this.http.get(evolutionChainUrl);
  }
}
