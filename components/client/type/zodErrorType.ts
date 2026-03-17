type ZodErrorResponse = {
  error: {
    fieldErrors?: Record<string, string[]>;
    formErrors?: string[];
  };
  statusCode?: number;
};