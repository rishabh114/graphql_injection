export class InvalidRequestError extends Error {
    constructor(message: string) {
      super(message);
      this.name = 'InvalidRequestError';
    }
  }
  
  export class ModerationNudgeError extends Error {
    constructor(message: string) {
      super(message);
      this.name = 'ModerationNudgeError';
    }
  }
  
  export interface CustomErrorType {
    message: string;
    path?: string[];
  }
  