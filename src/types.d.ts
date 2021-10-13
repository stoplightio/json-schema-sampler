import type { JSONSchema7 } from 'json-schema';

export interface Options {
  readonly skipNonRequired?: boolean;
  readonly skipReadOnly?: boolean;
  readonly skipWriteOnly?: boolean;
  readonly quiet?: boolean;
  readonly maxSampleDepth?: number;
  readonly ticks?: number;
}

export function sample(schema: JSONSchema7, options?: Options, document?: object): unknown;
