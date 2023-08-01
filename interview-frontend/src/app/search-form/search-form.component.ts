import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss']
})
export class SearchFormComponent {
  // Property to store the user's search query
  searchQuery: string = '';

  // Output EventEmitter to emit the search query when submitted
  @Output() searchSubmit: EventEmitter<string> = new EventEmitter<string>();

  // Function to handle the form submission
  onSearchSubmit(event: Event) {
    // Prevent the default form submission behavior
    event.preventDefault();
    // Emit the search query using the searchSubmit EventEmitter
    this.searchSubmit.emit(this.searchQuery);
  }
}

