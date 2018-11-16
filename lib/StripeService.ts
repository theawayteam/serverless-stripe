const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
import * as winston from 'winston';

interface Response {
  headers: any;
  body: any;
  statusCode: number;
}

export default class StripeService {
  handler(event, context, callback) {
    winston.debug('createCharge');
    winston.debug('event');
  
    const requestBody = JSON.parse(event.body);
    winston.debug(requestBody);

    const token = requestBody.token.id;
    const amount = requestBody.charge.amount;
    const currency = requestBody.charge.currency;
    const response = {
      headers: {
        'Access-Control-Allow-Origin': '*',
      }
    } as Response;

    // create charge
    stripe.charges.create({
      amount,
      currency,
      description: 'The Away Team, LLC',
      source: token
    }).then(charge => {
      // successful charge created
      winston.debug(charge);
      response.statusCode = 200;
      response.body = JSON.stringify({
        message: 'Charge processed successfully',
        charge
      });
      callback(null, response);
    }).catch(err => {
      // error creating charge
      winston.error(err);
      response.statusCode = 500;
      response.body =JSON.stringify({
        error: err.message,
      });
      callback(null, response);
    });
  }
}
