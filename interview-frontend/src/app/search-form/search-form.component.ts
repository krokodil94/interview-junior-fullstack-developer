import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss']
})
export class SearchFormComponent {
  searchQuery: string = '';

  @Output() searchSubmit: EventEmitter<string> = new EventEmitter<string>();

  onSearchSubmit(event: Event) {
    event.preventDefault();
    this.searchSubmit.emit(this.searchQuery);
  }
}
