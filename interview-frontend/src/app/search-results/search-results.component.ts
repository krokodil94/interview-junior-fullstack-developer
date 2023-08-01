import { Component, Input, Output, EventEmitter } from '@angular/core';
import { City } from '../city.model';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent {
  // Input properties to receive data from the parent component
  @Input() searchResults: City[] = []; // Array of City objects representing the search results
  @Input() currentPage = 1; // Current page number in the pagination
  @Input() totalPages = 1; // Total number of pages in the pagination
  @Input() hasSearched = false; // Flag to indicate if a search has been performed

  // Output properties to emit events to the parent component
  @Output() nextPage = new EventEmitter<void>(); // Event emitted when the user clicks on the 'Next Page' button
  @Output() previousPage = new EventEmitter<void>(); // Event emitted when the user clicks on the 'Previous Page' button

  // Method to load the next page of search results
  loadNextPage() {
    this.nextPage.emit();
  }

  // Method to load the previous page of search results
  loadPreviousPage() {
    this.previousPage.emit();
  }
}







