import { Controller, Get, Query, DefaultValuePipe, ParseIntPipe } from '@nestjs/common';
// importing the CitiesService class. It allows to use methods defined in the service.
import { CitiesService } from './cities.service';
//This decorator marks the class as a controller and specifies the base route for this controller
//, which is 'cities'. This means that all the routes defined within this controller 
//will be relative to /cities.
@Controller('cities')

// This constructor initializes the controller by injecting an instance of the CitiesService.
// This is known as dependency injection and allows you to access the methods and properties
// of the CitiesService within your controller.
export class CitiesController {
  constructor(private readonly citiesService: CitiesService) {}

  // Endpoint for searching cities
  
  @Get('search') // This decorator marks the method as a GET endpoint and
  // specifies the route for this endpoint, which is /cities/search.
  searchCities(
    @Query('query') query: string, // Decorator used to extract query parameters from the request URL.
    // Extracts the page query parameter from the request URL and converts it to a number.
    // Uses two pipes: DefaultValuePipe and ParseIntPipe.
    // DefaultValuePipe sets a default value of 1 to the page parameter if its not provided
    // ParseIntPipe converts the page parameter to a number
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number, 
  ) {
    // Calls the searchCities method of the CitiesService and returns the result.
    return this.citiesService.searchCities(query, page); 
  }
}

