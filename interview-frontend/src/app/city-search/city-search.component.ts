import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { City } from '../city.model';

@Component({
  selector: 'app-city-search',
  templateUrl: './city-search.component.html',
  styleUrls: ['./city-search.component.scss'],
})
export class CitySearchComponent {
  searchResults: City[] = [];
  currentPage = 1;
  totalPages = 1;
  hasSearched = false;
  noResultsFound = false;
  currentQuery = ''; // Variable to store the current search query
  emptyQuery = false; // Variable to track if the current query is empty

  constructor(private http: HttpClient) {}

  searchCities(query: string) {
    const trimmedQuery = query.trim();
    console.log('Searching for:', trimmedQuery);

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

  loadNextPage() {
    const nextPage = this.currentPage + 1;
    if (nextPage <= this.totalPages) {
      this.loadPage(this.currentQuery, nextPage); // Use the stored search query
    }
  }

  loadPreviousPage() {
    const previousPage = this.currentPage - 1;
    if (previousPage >= 1) {
      this.loadPage(this.currentQuery, previousPage); // Use the stored search query
    }
  }
}



