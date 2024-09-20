import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { GraphqlRequestComponent } from './app/graphql-request/graphql-request.component';

bootstrapApplication(GraphqlRequestComponent, {
  providers: [provideHttpClient(), provideRouter(routes)]
}).catch((err) => console.error(err));
