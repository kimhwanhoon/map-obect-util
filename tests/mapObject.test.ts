import { mapObject } from "../src";

describe("mapObject", () => {
  it("should transform an object into an array of objects", () => {
    const persons = {
      "P-1000001": {
        name: "John Doe",
        age: 30,
      },
      "P-1000002": {
        name: "Jane Smith",
        age: 25,
      },
    };

    const result = mapObject(persons, "personId");

    expect(result).toEqual([
      { personId: "P-1000001", name: "John Doe", age: 30 },
      { personId: "P-1000002", name: "Jane Smith", age: 25 },
    ]);
  });

  it("should use 'key' as the default keyName if not provided", () => {
    const data = {
      item1: { value: 100 },
      item2: { value: 200 },
    };

    const result = mapObject(data);

    expect(result).toEqual([
      { key: "item1", value: 100 },
      { key: "item2", value: 200 },
    ]);
  });

  it("should handle empty objects", () => {
    const emptyObject = {};
    const result = mapObject(emptyObject, "id");

    expect(result).toEqual([]);
  });

  it("should handle objects with nested properties", () => {
    const data = {
      user1: {
        name: "John",
        details: {
          address: "123 Main St",
          phone: "555-1234",
        },
      },
      user2: {
        name: "Jane",
        details: {
          address: "456 Oak Ave",
          phone: "555-5678",
        },
      },
    };

    const result = mapObject(data, "userId");

    expect(result).toEqual([
      {
        userId: "user1",
        name: "John",
        details: {
          address: "123 Main St",
          phone: "555-1234",
        },
      },
      {
        userId: "user2",
        name: "Jane",
        details: {
          address: "456 Oak Ave",
          phone: "555-5678",
        },
      },
    ]);
  });

  it("should handle objects with array values", () => {
    const data = {
      group1: {
        title: "Team A",
        members: ["John", "Jane", "Bob"],
      },
      group2: {
        title: "Team B",
        members: ["Alice", "Charlie"],
      },
    };

    const result = mapObject(data, "groupId");

    expect(result).toEqual([
      {
        groupId: "group1",
        title: "Team A",
        members: ["John", "Jane", "Bob"],
      },
      {
        groupId: "group2",
        title: "Team B",
        members: ["Alice", "Charlie"],
      },
    ]);
  });

  // Generic type test case
  it("should work with complex object types", () => {
    // Define the object type
    type ComplexUserData = {
      name: string;
      isActive: boolean;
      metadata: {
        lastLogin: string;
        preferences: {
          theme: string;
          notifications: boolean;
        };
      };
      tags: string[];
    };

    const users = {
      "user-123": {
        name: "John Doe",
        isActive: true,
        metadata: {
          lastLogin: "2023-03-15",
          preferences: {
            theme: "dark",
            notifications: true,
          },
        },
        tags: ["admin", "developer"],
      },
      "user-456": {
        name: "Jane Smith",
        isActive: false,
        metadata: {
          lastLogin: "2023-03-10",
          preferences: {
            theme: "light",
            notifications: false,
          },
        },
        tags: ["editor", "designer"],
      },
    };

    const result = mapObject(users, "userId");

    // Type checking is performed at compile time and does not affect runtime
    type ExpectedResultType = Array<ComplexUserData & { userId: string }>;

    // Access userId property in a type-safe manner
    console.log(result[0].userId); // "user-123"
    console.log(result[1].userId); // "user-456"

    expect(result).toEqual([
      {
        userId: "user-123",
        name: "John Doe",
        isActive: true,
        metadata: {
          lastLogin: "2023-03-15",
          preferences: {
            theme: "dark",
            notifications: true,
          },
        },
        tags: ["admin", "developer"],
      },
      {
        userId: "user-456",
        name: "Jane Smith",
        isActive: false,
        metadata: {
          lastLogin: "2023-03-10",
          preferences: {
            theme: "light",
            notifications: false,
          },
        },
        tags: ["editor", "designer"],
      },
    ]);
  });

  it("should properly type the key property according to keyName parameter", () => {
    // Define a literal type union
    type ProductStatus = "available" | "discontinued" | "out-of-stock";

    // Product data type with optional variants
    type ProductData = {
      name: string;
      price: number;
      status: ProductStatus;
      variants?: string[];
    };

    const products = {
      "prod-001": {
        name: "Laptop",
        price: 1200,
        status: "available" as ProductStatus,
        variants: ["Silver", "Black"],
      },
      "prod-002": {
        name: "Phone",
        price: 800,
        status: "out-of-stock" as ProductStatus,
      },
    };

    // Use a more general type that makes variants optional
    const result = mapObject<ProductData, "productId">(products, "productId");

    // Now we can access the productId property in a type-safe way
    const productId = result[1].productId; // type is string
    console.log(productId); // "prod-002"

    // We can also access other properties in a type-safe way
    const price = result[0].price; // type is number
    const status = result[0].status; // type is ProductStatus

    expect(result).toEqual([
      {
        productId: "prod-001",
        name: "Laptop",
        price: 1200,
        status: "available",
        variants: ["Silver", "Black"],
      },
      {
        productId: "prod-002",
        name: "Phone",
        price: 800,
        status: "out-of-stock",
      },
    ]);
  });
});
