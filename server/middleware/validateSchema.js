import ErrorHandler from "../utils/errorHandler.js";

export const validateSchema = (schema, source = "body") => {
  return (req, res, next) => {
    if (!schema || typeof schema.safeParse !== "function") {
      return next();
    }

    const result = schema.safeParse(req[source] || {});

    if (!result.success) {
      const formattedErrors = result.error.issues
        ? result.error.issues.map((issue) => `${issue.path.join(".") || "payload"}: ${issue.message}`).join("; ")
        : "Invalid request payload";

      return next(new ErrorHandler(`Validation error: ${formattedErrors}`, 400));
    }

    req[source] = result.data;
    next();
  };
};

export default validateSchema;
