import { NestFactory } from '@nestjs/core'; // used to create instance of NestJS app
import { AppModule } from './app.module';
// asynchronous function that will be executed when the application starts
// async cause some of the methods used inside it are asynchronous
async function bootstrap() { 
  // create instance of NestJS app, taking AppModule as a parameter, since
  // it is the root of my app
  const app = await NestFactory.create(AppModule);
  // Enable CORS for the frontend
  // Cross-Origin Resource Sharing to allow requests from different origins
  app.enableCors({
    origin: 'http://localhost:4200', // Allow requests from this origin
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Allow sending cookies and other credentials
  });
  await app.listen(3000); // this line starts the server and listens on port 3000
  // the await is used because the listen method is async
}
bootstrap(); // initiate the application startup process
