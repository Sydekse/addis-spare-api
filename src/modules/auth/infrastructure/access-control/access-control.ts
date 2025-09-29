// access-control.roles.ts

import { RolesBuilder } from 'nest-access-control';

// TODO: should we split it?
export const roles: RolesBuilder = new RolesBuilder();

// Customer role
roles
  .grant('customer')
  .createOwn('account')
  .readAny('product')
  .readAny('review')
  .createOwn('inquiry')
  .createOwn('checkout')
  .readOwn('order')
  .createOwn('review');

// Supplier / Retailer role
roles
  .grant('supplier')
  .createOwn('account')
  .readAny('product')
  .readAny('review')
  .readOwn('order')
  .createAny('inventory')
  .updateAny('inventory')
  .deleteAny('inventory');

// Admin role
roles
  .grant('admin')
  .readAny('product')
  .readAny('review')
  .updateAny('review')
  .readAny('order')
  .readAny('inventory')
  .createAny('inventory')
  .updateAny('inventory')
  .deleteAny('inventory')
  .updateAny('user')
  .deleteAny('user')
  .readAny('report')
  .updateAny('review')
  .updateAny('message')
  .readAny('message')
  .readOwn('message');

// Payment Gateway role
roles.grant('payment-gateway').createAny('payment');

export default roles;
