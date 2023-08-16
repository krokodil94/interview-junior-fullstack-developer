import { Test, TestingModule } from '@nestjs/testing';
import { CitiesService } from './cities.service';
import { readFileSync } from 'fs';
import { join } from 'path';

describe('CitiesService', () => {
  let citiesService: CitiesService;

  beforeEach(async () => {
    // Create a testing module for CitiesService
    const module: TestingModule = await Test.createTestingModule({
      providers: [CitiesService],
    }).compile();
    // Get an instance of the CitiesService from the testing module
    citiesService = module.get<CitiesService>(CitiesService);
  });

  describe('searchCities', () => {
    it('should return matching cities and pagination info', () => {
        // Mock cities data with custom city names
      const mockCitiesData = [
        { cityName: 'Trbovlje' },
        { cityName: 'Maribor' },
        { cityName: 'Ljubljana' },
      ];
      // Mock the citiesData property with our custom data
      citiesService['citiesData'] = mockCitiesData;
      // Define search query and page number
      const query = 'Lju';
      const page = 1;
      // Call searchCities method
      const result = citiesService.searchCities(query, page);
      // Assert the expected results
      expect(result.totalResults).toBe(1);
      expect(result.totalPages).toBe(1);
      expect(result.currentPage).toBe(page);
      expect(result.results.length).toBe(1);
      expect(result.results[0].cityName).toBe('Ljubljana');
    });

    it('should handle empty results', () => {
      // Mock the citiesData property with an empty array
      citiesService['citiesData'] = [];
      // Define search query and page number
      const query = 'Berlin';
      const page = 1;
      const result = citiesService.searchCities(query, page);

      expect(result.totalResults).toBe(0);
      expect(result.totalPages).toBe(0);
      expect(result.currentPage).toBe(page);
      expect(result.results.length).toBe(0);
    });
  });
});
