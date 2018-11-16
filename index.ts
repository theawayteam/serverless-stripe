import 'reflect-metadata';
import StripeService from './lib/StripeService';
import * as winston from 'winston';

winston.remove(winston.transports.Console);
winston.add(new winston.transports.Console({
  level: 'debug',
  format: winston.format.prettyPrint()
}));

exports.handler = new StripeService().handler;
