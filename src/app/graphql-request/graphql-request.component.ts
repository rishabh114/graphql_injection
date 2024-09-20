import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-graphql-request',
  standalone: true,
  templateUrl: './graphql-request.component.html',
  styleUrls: ['./graphql-request.component.css'],
  imports: [FormsModule,CommonModule]
})
export class GraphqlRequestComponent {
  query: string = '';
  result: any;

  constructor(private http: HttpClient) {}

  executeQuery() {
    // Send the input GraphQL query (Source) to the backend
    this.http.post('/api/graphql', { query: this.query }).subscribe(
      (response) => {
        this.result = response; // Display the result from the server
      },
      (error) => {
        this.result = error;
      }
    );
  }
}
