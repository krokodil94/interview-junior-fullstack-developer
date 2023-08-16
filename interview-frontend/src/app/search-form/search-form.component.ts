import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss']
})
export class SearchFormComponent {
  // Property to store the user's search query entered into the search input field. 
  searchQuery: string = '';

  // Output EventEmitter to emit the search query when submitted
  // @Output decorator allows to emit an event from the child component(SearchFormComponent) 
  // to the parent component
  // its used to emit the search query entered by the user when the form is submitted
  @Output() searchSubmit: EventEmitter<string> = new EventEmitter<string>();

  // Function to handle the form submission when the user clicks the search button
  // The event parameter is an instance of "Event" class representing the form submission event
  onSearchSubmit(event: Event) {
    // Prevent the default form submission behavior, which would cause the page to reload
    event.preventDefault();
    // Emit the search query using the searchSubmit EventEmitter. It sends the value of
    // the searchQuery property to the parent component. This allows the parent component
    // to access the search query entered by the user
    this.searchSubmit.emit(this.searchQuery);
  }
}

