import { Module } from '@nestjs/common';
import { CitiesController } from './cities.controller';
import { CitiesService } from './cities.service';

@Module({
  controllers: [CitiesController], // Controllers used in this module
  providers: [CitiesService], // Services used in this module
})
export class CitiesModule {}
