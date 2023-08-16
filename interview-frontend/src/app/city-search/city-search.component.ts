import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { City } from '../city.model';

@Component({
  selector: 'app-city-search',
  templateUrl: './city-search.component.html',
  styleUrls: ['./city-search.component.scss'],
})
export class CitySearchComponent {
  // Properties to manage search results and pagination
  searchResults: City[] = [];
  currentPage = 1;
  totalPages = 1;

  // Flags to control UI states
  hasSearched = false; 
  noResultsFound = false;

  // variables to manage search query and state
  currentQuery = ''; // Variable to store the current search query
  emptyQuery = false; // Variable to track if the current query is empty

  constructor(private http: HttpClient) {}
  // Method to handle city search
  searchCities(query: string) {
    const trimmedQuery = query.trim();
    console.log('Searching for:', trimmedQuery);
    
    // Handle empty query
    if (!trimmedQuery) {
      this.searchResults = [];
      this.hasSearched = true; // Mark as searched
      this.noResultsFound = false; // Reset no results found
      this.currentQuery = ''; // Clear the current search query
      this.emptyQuery = true; // Mark as empty query
      return;
    }

    // Perform input validation to avoid unnecessary requests for invalid queries
    if (trimmedQuery === this.currentQuery) {
      // If the query is the same as the previous one, do not make a new request
      return;
    }

    this.currentQuery = trimmedQuery; // Save the current search query
    this.emptyQuery = false; // Reset empty query flag
    this.loadPage(trimmedQuery, 1);
    this.hasSearched = true;
  }
  // Method to fetch search results for a specific page
  loadPage(query: string, page: number) {
    this.http
      .get<{ totalResults: number; totalPages: number; results: City[] }>(
        `http://localhost:3000/cities/search?query=${query}&page=${page}`
      )
      .subscribe(
        (response) => {
          console.log(response);
          this.searchResults = response.results;
          this.currentPage = page;
          this.totalPages = response.totalPages;
        },
        (error) => {
          console.error('Error fetching search results:', error);
          this.noResultsFound = true; // Mark as no results found
        }
      );
  }
  // Method to load next page of search results
  loadNextPage() {
    const nextPage = this.currentPage + 1;
    if (nextPage <= this.totalPages) {
      this.loadPage(this.currentQuery, nextPage); 
    }
  }
  // Method to load previous page of search results
  loadPreviousPage() {
    const previousPage = this.currentPage - 1;
    if (previousPage >= 1) {
      this.loadPage(this.currentQuery, previousPage); 
    }
  }
}



