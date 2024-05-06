const { errorResponder, errorTypes } = require('../../../core/errors');
const authenticationServices = require('./authentication-service');
const rateLimit = require("express-rate-limit");

/**
 * Handle login request
 * @param {object} request - Express request object
 * @param {object} response - Express response object
 * @param {object} next - Express route middlewares
 * @returns {object} Response object or pass an error to the next route
 */
async function login(request, response, next) {
  const { email, password } = request.body;

  try {
    // Check login credentials
    const loginSuccess = await authenticationServices.checkLoginCredentials(
      email,
      password
    );

    if (!loginSuccess) {
      throw errorResponder(
        errorTypes.INVALID_CREDENTIALS,
        'Wrong email or password'
      );
    }

    return response.status(200).json(loginSuccess);
  } catch (error) {
    return next(error);
  }
}
// variable to store rateLimit function
const limited = rateLimit({
  windowMs: 30 * 60 * 1000, // 30 minutes
  limit: 5, // Limit each IP to 5 requests per `window` (here, per 30 minutes).
  standardHeaders: true, // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
  message: errorResponder(
    errorTypes.FORBIDDEN,
    'Too many failed login attempts' // message about error
   ), 
  statusCode: 403, // forbidden status code
});

module.exports = {
  login,
  limited
};
