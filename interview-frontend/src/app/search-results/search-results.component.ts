import { Component, Input, Output, EventEmitter } from '@angular/core';
import { City } from '../city.model';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent {
  @Input() searchResults: City[] = [];
  @Input() currentPage = 1;
  @Input() totalPages = 1;
  @Input() hasSearched = false;

  

  @Output() nextPage = new EventEmitter<void>();
  @Output() previousPage = new EventEmitter<void>();

  loadNextPage() {
    this.nextPage.emit();
  }

  loadPreviousPage() {
    this.previousPage.emit();
  }
}







