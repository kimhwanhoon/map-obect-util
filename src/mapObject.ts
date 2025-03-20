/**
 * Transforms an object into an array of objects where each item contains
 * a key-value pair from the original object plus its properties.
 *
 * @example
 * const persons = {
 *   "P-1000001": {
 *     name: "John Doe",
 *     age: 30,
 *   },
 *   "P-1000002": {
 *     name: "Jane Smith",
 *     age: 25,
 *   },
 * };
 *
 * const mapped = mapObject(persons, "personId");
 * Returns:
 * [
 *   { personId: "P-1000001", name: "John Doe", age: 30 },
 *   { personId: "P-1000002", name: "Jane Smith", age: 25 }
 * ]
 *
 * @param obj - The source object to transform
 * @param keyName - The name to use for the key in the resulting objects
 * @returns An array of objects containing the key and all properties from the source object
 */
export const mapObject = <T, K extends string = "key">(
  obj: Record<string, T>,
  keyName: K = "key" as K,
): Array<T & { [P in K]: string }> => {
  return Object.entries(obj).map(([key, value]) => ({
    [keyName]: key,
    ...value,
  })) as Array<T & { [P in K]: string }>;
};

/**
 * Type helper for the return type of mapObject function
 */
export type MapObjectResult<T, K extends string = "key"> = Array<T & { [P in K]: string }>;