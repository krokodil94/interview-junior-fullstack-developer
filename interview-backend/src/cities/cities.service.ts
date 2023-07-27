// src/cities/cities.service.ts

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

  searchCities(query: string, page: number) {
    const pageSize = 5;
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const matchingCities = this.citiesData.filter(city => city.cityName.toLowerCase().includes(query.toLowerCase()));

    return {
      totalResults: matchingCities.length,
      totalPages: Math.ceil(matchingCities.length / pageSize),
      currentPage: page,
      results: matchingCities.slice(startIndex, endIndex),
    };
  }
}
