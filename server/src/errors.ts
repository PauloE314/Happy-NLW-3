import { ErrorRequestHandler } from "express";
import { ValidationError } from "yup";

interface IFieldErrors {
  [field: string]: string[];
}

/**
 * Handles all uncached errors
 */
const handler: ErrorRequestHandler = (error, request, response, next) => {
  console.error(error);

  if (error instanceof ValidationError) {
    const errors: IFieldErrors = {};

    error.inner.forEach((err) => (errors[err.path] = err.errors));

    console.log(errors);
    return response.status(400).send(errors);
  }

  return response.status(500).send({
    message: "Internal server error",
  });
};

export default handler;
