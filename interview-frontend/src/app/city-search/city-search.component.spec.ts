import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { CitySearchComponent } from './city-search.component';
import { SearchFormComponent } from '../search-form/search-form.component'; // Import the SearchFormComponent

describe('CitySearchComponent', () => {
  let component: CitySearchComponent;
  let fixture: ComponentFixture<CitySearchComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule, FormsModule], // Add FormsModule here
        declarations: [CitySearchComponent, SearchFormComponent], // Include SearchFormComponent here
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(CitySearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
