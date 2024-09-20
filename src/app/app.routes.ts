import { Routes } from '@angular/router';
import { GraphqlRequestComponent } from './graphql-request/graphql-request.component';

export const routes: Routes = [
  { path: 'graphql', component: GraphqlRequestComponent },
  { path: '', redirectTo: '/graphql', pathMatch: 'full' }
];
