export class MyError extends Error {
  constructor(message: string) {
    super(message);
  }
}

export const myErrorMessage = (error: MyError): any => {
  return {
    message: error.message
  }
}