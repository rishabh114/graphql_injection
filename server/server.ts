import express, { Request, Response } from 'express';
import { graphql, GraphQLSchema } from 'graphql';
import {
  InvalidRequestError,
  ModerationNudgeError,
  CustomErrorType, // Import custom error types
} from './errorTypes'; // Custom error types

const app = express();
app.use(express.json());

const schema: GraphQLSchema = {} as GraphQLSchema; // Define your GraphQL schema here

interface GraphQLRequest {
  text: string;
}

interface GraphQLResponse {
  data?: any;
  errors: CustomErrorType[];
}

// Vulnerable GraphQL Query Execution (Sink)
async function executeGraphQLQuery(
  schema: GraphQLSchema,
  request: GraphQLRequest,
  rootValue: any,
  contextValue: any,
  variables: any
): Promise<GraphQLResponse> {
  return graphql({
    schema: schema,
    source: request.text, // Source of the GraphQL query (Source)
    rootValue: rootValue,
    contextValue: contextValue,
    variableValues: variables
  }).then((payload) => { // Here payload will be generic ExecutionResult type
    if (payload.errors) {
      payload.errors.forEach((e) => {
        if (
          e.originalError instanceof InvalidRequestError ||
          e.originalError instanceof ModerationNudgeError
        ) {
          throw e.originalError; // Vulnerability trigger (Sink)
        }
      });
      throw new Error(payload.errors.toString());
    }
    return {
      data: payload.data || undefined,
      errors: payload.errors || [],
    };
  });
}

// API route to handle GraphQL requests
app.post('/api/graphql', async (req: Request, res: Response) => {
  const request: GraphQLRequest = { text: req.body.query };

  try {
    // Executing the GraphQL query (Source and Sink)
    const response = await executeGraphQLQuery(schema, request, {}, {}, {});
    res.json(response);
  } catch (error) {
    if (error instanceof Error) {
      // Now error is of type Error, so you can safely access its message
      res.status(500).json({ error: error.message });
    } else {
      // Handle other cases where the error might not be an instance of Error
      res.status(500).json({ error: 'Unknown error occurred' });
    }
  }
});

// Start the server
app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
