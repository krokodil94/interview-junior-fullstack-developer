import { Test, TestingModule } from '@nestjs/testing';
import { CitiesController } from './cities.controller';
import { CitiesService } from './cities.service';

describe('CitiesController', () => {
  let citiesController: CitiesController;
  let citiesService: CitiesService;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [CitiesController],
      providers: [CitiesService],
    }).compile();

    citiesController = moduleRef.get<CitiesController>(CitiesController);
    citiesService = moduleRef.get<CitiesService>(CitiesService);
  });

  describe('searchCities', () => {
    it('should call citiesService.searchCities with correct parameters', () => {
      const query = 'London';
      const page = 1;

      const searchCitiesResult = {
        totalResults: 1,
        totalPages: 1,
        currentPage: 1,
        results: [{ cityName: 'London', uuid: '1234', count: 10 }],
      };

      jest
        .spyOn(citiesService, 'searchCities')
        .mockReturnValue(searchCitiesResult);

      const result = citiesController.searchCities(query, page);

      expect(citiesService.searchCities).toHaveBeenCalledWith(query, page);
      expect(result).toEqual(searchCitiesResult);
    });
  });
});
