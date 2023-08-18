import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { City } from '../city.model';
import { DataService } from '../services/data.service'; // Import the DataService

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

  // Variables to manage search query and state
  currentQuery = '';
  emptyQuery = false;

  // Constructor: Dependency injection of HttpClient and DataService
  constructor(private http: HttpClient, private dataService: DataService) {}

  // Method to handle city search
  searchCities(query: string) {
    let trimmedQuery = query.trim();
    console.log('Searching for:', trimmedQuery);

    // Handle empty query
    if (!trimmedQuery) {
      this.searchResults = [];
      this.hasSearched = true;
      this.noResultsFound = false;
      this.currentQuery = '';
      this.emptyQuery = true;
      return;
    }

    


    

    // Perform input validation to avoid unnecessary requests for duplicate queries
    if (trimmedQuery === this.currentQuery) {
      // If the query is the same as the previous one, do not make a new request
      return;
    }

    this.currentQuery = trimmedQuery; // Save the current search query
    this.emptyQuery = false; // Reset empty query flag

    // Fetch search results for the first page using DataService
    this.dataService.searchCities(trimmedQuery, 1).subscribe(
      (response) => {
        this.searchResults = response.results;
        this.currentPage = 1;
        this.totalPages = response.totalPages;
      },
      (error) => {
        console.error('Error fetching search results:', error);
        this.noResultsFound = true;
      }
    );

    this.hasSearched = true; // Mark that a search has been performed
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

  // Method to fetch search results for a specific page using DataService
  loadPage(query: string, page: number) {
    this.dataService.searchCities(query, page).subscribe(
      (response) => {
        this.searchResults = response.results;
        this.currentPage = page;
        this.totalPages = response.totalPages;
      },
      (error) => {
        console.error('Error fetching search results:', error);
        this.noResultsFound = true;
      }
    );
  }
}




