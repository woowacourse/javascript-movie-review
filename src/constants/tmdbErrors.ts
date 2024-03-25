interface TMDBErrors {
  [key: number]: {
    httpStatus: number;
    message: string;
  };
}

const TMDB_ERRORS: TMDBErrors = {
  1: {
    httpStatus: 200,
    message: 'Success.'
  },
  2: {
    httpStatus: 501,
    message: 'Invalid service: this service does not exist.'
  },
  3: {
    httpStatus: 401,
    message: 'Authentication failed: You do not have permissions to access the service.'
  },
  4: {
    httpStatus: 405,
    message: "Invalid format: This service doesn't exist in that format."
  },
  5: {
    httpStatus: 422,
    message: 'Invalid parameters: Your request parameters are incorrect.'
  },
  6: {
    httpStatus: 404,
    message: 'Invalid id: The pre-requisite id is invalid or not found.'
  },
  7: {
    httpStatus: 401,
    message: 'Invalid API key: You must be granted a valid key.'
  },
  8: {
    httpStatus: 403,
    message: 'Duplicate entry: The data you tried to submit already exists.'
  },
  9: {
    httpStatus: 503,
    message: 'Service offline: This service is temporarily offline, try again later.'
  },
  10: {
    httpStatus: 401,
    message: 'Suspended API key: Access to your account has been suspended, contact TMDB.'
  },
  11: {
    httpStatus: 500,
    message: 'Internal error: Something went wrong, contact TMDB.'
  },
  12: {
    httpStatus: 201,
    message: 'The item/record was updated successfully.'
  },
  13: {
    httpStatus: 200,
    message: 'The item/record was deleted successfully.'
  },
  14: {
    httpStatus: 401,
    message: 'Authentication failed.'
  },
  15: {
    httpStatus: 500,
    message: 'Failed.'
  },
  16: {
    httpStatus: 401,
    message: 'Device denied.'
  },
  17: {
    httpStatus: 401,
    message: 'Session denied.'
  },
  18: {
    httpStatus: 400,
    message: 'Validation failed.'
  },
  19: {
    httpStatus: 406,
    message: 'Invalid accept header.'
  },
  20: {
    httpStatus: 422,
    message: 'Invalid date range: Should be a range no longer than 14 days.'
  },
  21: {
    httpStatus: 200,
    message: 'Entry not found: The item you are trying to edit cannot be found.'
  },
  22: {
    httpStatus: 400,
    message: 'Invalid page: Pages start at 1 and max at 500. They are expected to be an integer.'
  },
  23: {
    httpStatus: 400,
    message: 'Invalid date: Format needs to be YYYY-MM-DD.'
  },
  24: {
    httpStatus: 504,
    message: 'Your request to the backend server timed out. Try again.'
  },
  25: {
    httpStatus: 429,
    message: 'Your request count (#) is over the allowed limit of (40).'
  },
  26: {
    httpStatus: 400,
    message: 'You must provide a username and password.'
  },
  27: {
    httpStatus: 400,
    message: 'Too many append to response objects: The maximum number of remote calls is 20.'
  },
  28: {
    httpStatus: 400,
    message: 'Invalid timezone: Please consult the documentation for a valid timezone.'
  },
  29: {
    httpStatus: 400,
    message: 'You must confirm this action: Please provide a confirm=true parameter.'
  },
  30: {
    httpStatus: 401,
    message: 'Invalid username and/or password: You did not provide a valid login.'
  },
  31: {
    httpStatus: 401,
    message: 'Account disabled: Your account is no longer active. Contact TMDB if this is an error.'
  },
  32: {
    httpStatus: 401,
    message: 'Email not verified: Your email address has not been verified.'
  },
  33: {
    httpStatus: 401,
    message: 'Invalid request token: The request token is either expired or invalid.'
  },
  34: {
    httpStatus: 404,
    message: 'The resource you requested could not be found.'
  },
  35: {
    httpStatus: 401,
    message: 'Invalid token.'
  },
  36: {
    httpStatus: 401,
    message: "This token hasn't been granted write permission by the user."
  },
  37: {
    httpStatus: 404,
    message: 'The requested session could not be found.'
  },
  38: {
    httpStatus: 401,
    message: "You don't have permission to edit this resource."
  },
  39: {
    httpStatus: 401,
    message: 'This resource is private.'
  },
  40: {
    httpStatus: 200,
    message: 'Nothing to update.'
  },
  41: {
    httpStatus: 422,
    message: "This request token hasn't been approved by the user."
  },
  42: {
    httpStatus: 405,
    message: 'This request method is not supported for this resource.'
  },
  43: {
    httpStatus: 502,
    message: "Couldn't connect to the backend server."
  },
  44: {
    httpStatus: 500,
    message: 'The ID is invalid.'
  },
  45: {
    httpStatus: 403,
    message: 'This user has been suspended.'
  },
  46: {
    httpStatus: 503,
    message: 'The API is undergoing maintenance. Try again later.'
  },
  47: {
    httpStatus: 400,
    message: 'The input is not valid.'
  }
};

export default TMDB_ERRORS;
