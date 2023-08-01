import { Controller, Get, Query, DefaultValuePipe, ParseIntPipe } from '@nestjs/common';
import { CitiesService } from './cities.service';

@Controller('cities')
export class CitiesController {
  constructor(private readonly citiesService: CitiesService) {}

  // Endpoint for searching cities
  
  @Get('search')
  searchCities(
    @Query('query') query: string, // The search query string provided as a query parameter
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number, // The page number provided as a query parameter, default value is 1, parsed as an integer
  ) {
    return this.citiesService.searchCities(query, page); // Call the CitiesService to perform the search
  }
}

