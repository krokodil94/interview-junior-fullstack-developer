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
  searchCities(query: string, page: number) {
    const pageSize = 5;
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;

    // Normalize the query by removing diacritics and converting to lowercase
    const normalizedQuery = this.normalizeString(query);

    // Filter the citiesData to find cities whose "cityName" contains the normalized query
    const matchingCities = this.citiesData.filter(city =>
      this.normalizeString(city.cityName).includes(normalizedQuery)
    );

    const totalResults = matchingCities.length;
    const totalPages = Math.ceil(totalResults / pageSize);
    const results = matchingCities.slice(startIndex, endIndex);

    return {
      totalResults,
      totalPages,
      currentPage: page,
      results,
    };
  }

  // Helper method to remove diacritics and convert to lowercase
  private normalizeString(input: string): string {
    return input
      .toLowerCase()
      .replace(/ae/g, 'ä')
      .replace(/oe/g, 'ö')
      .replace(/ue/g, 'ü')
      .replace(/ss/g, 'ß');
    // You can add more replacements for other non-diacritic characters if needed
  }
  
}
