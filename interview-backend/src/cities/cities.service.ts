import { Injectable } from '@nestjs/common';
import { readFileSync } from 'fs';
import { join } from 'path';

@Injectable()
export class CitiesService {
  private citiesData: any[];

  constructor() {
    const filePath = join(__dirname, '../../../cities.json');
    this.citiesData = JSON.parse(readFileSync(filePath, 'utf-8'));
  }

  // Search for cities that match the given query
  // Returns an object containing the search results and pagination information
  searchCities(query: string, page: number) {
    const pageSize = 5;
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;

    // Filter cities based on the provided query (case-insensitive)
    const matchingCities = this.citiesData.filter(city => city.cityName.toLowerCase().includes(query.toLowerCase()));

    // Calculate pagination information
    const totalResults = matchingCities.length;
    const totalPages = Math.ceil(totalResults / pageSize);

    // Extract the cities for the current page
    const results = matchingCities.slice(startIndex, endIndex);

    // Return the search results and pagination information as an object
    return {
      totalResults,
      totalPages,
      currentPage: page,
      results,
    };
  }
}
