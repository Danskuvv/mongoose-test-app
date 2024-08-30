declare module 'mongoose-type-url' {
  import { SchemaTypeOptions } from 'mongoose';

  export type URL = string;

  export const URL: SchemaTypeOptions<URL>;
}
