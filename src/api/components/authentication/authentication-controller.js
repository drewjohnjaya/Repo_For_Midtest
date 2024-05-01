const { errorResponder, errorTypes } = require('../../../core/errors');
const authenticationServices = require('./authentication-service');
const ExpressBrute = require('express-brute');

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
    
    if (!loginSuccess == 5){
      let userBruteForce = new ExpressBrute(store, {
        freeRetries: 5,
        minWait: 30 * 60 * 1000,
        maxWait: 60 * 60 * 1000,
      });
      userBruteForce.prevent, 
      function (request, response, next) {
        request.brute.reset(function () {
          response.redirect('/');
        })
      }
      throw errorResponder(
        errorTypes.FORBIDDEN,
        'Too many failed login attempts'
      );
    }
/*
    if (!loginSuccess > 0) {
    const loginAttemptsLimit = rateLimit({
      windowMs: 30 * 60 * 1000, // 30 minutes
      limit: 5, // limit for each IP per window
    });
      throw errorResponder(
        errorTypes.FORBIDDEN,
        'Too many failed login attempts'
      );
    }

    app.use(loginAttemptsLimit)
  */  
    return response.status(200).json(loginSuccess);
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  login,
};
