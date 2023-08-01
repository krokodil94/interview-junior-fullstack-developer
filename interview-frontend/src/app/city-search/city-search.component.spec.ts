import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule } from '@angular/forms'; 
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { CitySearchComponent } from './city-search.component';
import { SearchFormComponent } from '../search-form/search-form.component'; 

describe('CitySearchComponent', () => {
  let component: CitySearchComponent;
  let fixture: ComponentFixture<CitySearchComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule, FormsModule], 
        declarations: [CitySearchComponent, SearchFormComponent], 
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
