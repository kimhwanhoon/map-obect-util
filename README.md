# map-object-util

A TypeScript utility function that transforms objects into arrays with type safety.

## Installation

```bash
npm install map-object-util
```

## Usage

```typescript
import { mapObject } from 'map-object-util';

// Define your data types
interface Person {
  name: string;
  age: number;
}

// Create an object with typed data
const persons: Record<string, Person> = {
  "P-1000001": {
    name: "John Doe",
    age: 30,
  },
  "P-1000002": {
    name: "Jane Smith",
    age: 25,
  },
};

// Transform with explicit type parameters
const result = mapObject<Person, "personId">(persons, "personId");
// TypeScript properly infers: Array<Person & { personId: string }>

// Type-safe access to properties
console.log(result[0].personId); // "P-1000001"
console.log(result[0].name);     // "John Doe"
console.log(result[0].age);      // 30
```

## API

### `mapObject<T, K>(obj, keyName)`

Transforms an object into an array of objects where each item contains a key-value pair from the original object plus its properties.

**Type Parameters:**

- `T` - The type of values in the source object
- `K extends string = "key"` - The type of the key name to use in result objects

**Parameters:**

- `obj: Record<string, T>` - The source object to transform
- `keyName: K = "key"` - The name to use for the key in the resulting objects

**Returns:**

- `Array<T & { [P in K]: string }>` - An array of objects containing the key and all properties from the source object

### Type Helper

```typescript
import { MapObjectResult } from 'map-object-util';

// Define a typed result
type PersonWithId = MapObjectResult<Person, "personId">;
```

## License

MIT# map-obect-util
