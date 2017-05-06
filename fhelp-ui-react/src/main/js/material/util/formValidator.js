'use strict';

export const required = value => (value == null ? 'Required' : undefined);
export const isNumber = value =>
  (value && !isNaN(parseFloat(value)) && isFinite(value)
    ? undefined
    : 'Invalid number');
