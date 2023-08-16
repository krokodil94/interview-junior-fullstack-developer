import { Injectable } from '@nestjs/common';
import { readFileSync } from 'fs';
import { join } from 'path';
// marks the class as a service, alowing it to be injected into other components, such as controllers
@Injectable()
export class CitiesService {
  private citiesData: any[];
  // this method is called when an instance of the CitiesService is created.
  // initialize the service by reading the cities.json file using the readFileSync function.
  // data is storet in the citiesData property.
  constructor() {
    const filePath = join(__dirname, '../../../cities.json');
    this.citiesData = JSON.parse(readFileSync(filePath, 'utf-8'));
  }

  // Search for cities that match the given query
  // Returns an object containing the search results and pagination information
  searchCities(query: string, page: number) {
    // Define the pagination constants
    const pageSize = 5;
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;

    // Filters the data in citiesData to find cities whose "cityName" contains the search "query"
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
