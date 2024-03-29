import { traverse, clearCache } from './traverse';
import { sampleArray, sampleBoolean, sampleNumber, sampleObject, sampleString } from './samplers/index';

export { SchemaSizeExceededError } from './traverse';

export var _samplers = {};

const defaults = {
  skipReadOnly: false,
  maxSampleDepth: 15,
  ticks: 1000,
};

export function sample(schema, options, doc = schema) {
  defaults.startingTicks = defaults.ticks;
  let opts = Object.assign({}, defaults, options);
  clearCache();
  return traverse(schema, opts, doc).value;
};

export function _registerSampler(type, sampler) {
  _samplers[type] = sampler;
};

export { inferType } from './infer';

_registerSampler('array', sampleArray);
_registerSampler('boolean', sampleBoolean);
_registerSampler('integer', sampleNumber);
_registerSampler('number', sampleNumber);
_registerSampler('object', sampleObject);
_registerSampler('string', sampleString);
