import { createSchema } from "graphql-yoga";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const schema = createSchema({
  typeDefs: `
  scalar DateTime

  type Query {
    products(category: String, search: String): [Product]
    product(id: Int!): Product
    categories: [Category]
    category(id: Int!): Category
    collections: [Collection]
    collection(id: Int!): Collection
    order(id: Int!): Order
    orders: [Order]
    customer(id: Int!): Customer
    customers: [Customer]
    searchProducts(searchTerm: String!): [Product!]!
    searchCustomers(searchTerm: String!): [Customer!]!
  }

  type Mutation {
    createProduct(
    name: String!
    description: String
    price: Float!
    imageUrl: [String]
    stockQuantity: Int
    categoryId: Int
    variantInputs: [CreateProductVariantInput]
    collectionIds: [Int]
    tagIds: [Int]
): Product
    updateProduct(id: Int!, data: UpdateProductInput): Product
    deleteProduct(id: Int!): Product
    createCategory(name: String!, description: String, imageUrl: String): Category
    updateCategory(
      id: Int!
      name: String
      description: String
      imageUrl: String
    ): Category
    deleteCategory(id: Int!): Category
    createCollection(
      title: String!,
      description: String,
      imageUrl: String,
      type: CollectionType!,
      rules: [CollectionRuleInput]
    ): Collection
    updateCollection(
      id: Int!
      title: String
      description: String
      imageUrl: String
      type: CollectionType
      rules: [CollectionRuleInput]
    ): Collection
    deleteCollection(id: Int!): Collection
    createOrder(
      customerId: Int!,
      shippingAddress: AddressInput!,
      billingAddress: AddressInput!,
      orderItems: [OrderItemInput]!,
      tags: [String],
      notes: String,
      discount: Float,
      shippingFees: Float,
      otherFees: Float,
      taxRate: Float,
      collectPaymentLater: Boolean
    ): Order
    updateOrderStatus(id: Int!, status: OrderStatus!): Order
    createCustomer(
      firstName: String!
      lastName: String!
      email: String!
      phoneNumber: String!
      notes: String
      tags: [TagInput]
      address: AddressInput
    ): Customer
    updateCustomer(
      id: Int!
      firstName: String
      lastName: String
      email: String
      phoneNumber: String
      notes: String
      tags: [TagInput!]
      address: AddressInput
    ): Customer
    deleteCustomer(id: Int!): Customer
  }

  input TagInput {
    name: String!
  }

  input OrderItemInput {
    productId: Int!
    quantity: Int!
  }

  input AddressInput {
    address: String
    landmark: String
    city: String!
    state: String!
    pincode: String!
    phone: String
    company: String
  }

  input CollectionRuleInput {
    key: String!
    value: String!
  }

  input CreateProductInput {
    name: String!
    description: String
    price: Float!
    imageUrl: [String]
    stockQuantity: Int
    categoryId: Int
    variantInputs: [CreateProductVariantInput]
    collectionIds: [Int]
    tagIds: [Int]
  }

  input UpdateProductInput {
    name: String
    description: String
    price: Float
    imageUrl: [String]
    stockQuantity: Int
    categoryId: Int
    variantInputs: [UpdateProductVariantInput]
    collectionIds: [Int]
    tagIds: [Int]
  }


  input CreateProductVariantInput {
  sku: String!
  size: String!
  color: String!
  price: Float!
  stockQuantity: Int!
}

input UpdateProductVariantInput {
  id: Int!
  sku: String
  size: String
  color: String
  price: Float
  stockQuantity: Int
}


  type Product {
    id: Int!
    name: String!
    description: String
    price: Float!
    imageUrl: [String!]!
    stockQuantity: Int!
    variants: [ProductVariant]
    category: Category
    collections: [Collection]
    tags: [Tag]
  }

  type ProductVariant {
    id: Int!
    sku: String
    size: String
    color: String
    price: Float
    stockQuantity: Int!
    product: Product
  }

  type Category {
    id: Int!
    name: String!
    description: String
    imageUrl: String
    products: [Product]
  }

  type Collection {
    id: Int!
    title: String!
    description: String
    imageUrl: String
    type: CollectionType!
    rules: [CollectionRule]
    products: [Product]
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type CollectionRule {
    id: Int!
    key: String!
    value: String!
    collection: Collection!
  }

  type Order {
    id: Int!
    status: OrderStatus!
    createdAt: DateTime!
    updatedAt: DateTime!
    customer: Customer
    shippingAddress: Address
    billingAddress: Address
    orderItems: [OrderItem]
    total: Float
    notes: String
    discount: Float
    shippingFees: Float
    otherFees: Float
    taxRate: Float
    collectPaymentLater: Boolean
    tags: [Tag]
  }

  type OrderItem {
    id: Int!
    product: Product
    quantity: Int!
    price: Float!
    order: Order
  }

  type Address {
    id: Int!
    address: String
    landmark: String
    city: String
    state: String
    pincode: String
    phone: String
    company: String
    customer: Customer
  }

  type Customer {
    id: Int!
    firstName: String!
    lastName: String!
    email: String!
    phoneNumber: String!
    orders: [Order]
    notes: String
    tags: [Tag]
    address: Address
  }

  type Tag {
    id: Int!
    name: String!
  }

  enum OrderStatus {
    PENDING
    PROCESSING
    SHIPPED
    DELIVERED
    CANCELED
  }

  enum CollectionType {
    MANUAL
    AUTOMATED
  }
  `,
  resolvers: {
    Query: {
      products: async (_parent, args) => {
        const filters = {
          where: {
            category: args.category ? { name: args.category } : undefined,
            OR: args.search
              ? [
                { name: { contains: args.search } },
                { description: { contains: args.search } },
              ]
              : undefined,
          },
        };
        return await prisma.product.findMany(filters);
      },
      searchProducts: async (_, { searchTerm }) => {
        return await prisma.product.findMany({
          where: {
            OR: [
              { name: { contains: searchTerm, mode: 'insensitive' } },
              { description: { contains: searchTerm, mode: 'insensitive' } }
            ]
          }
        });
      },
      searchCustomers: async (_, { searchTerm }) => {
        return await prisma.customer.findMany({
          where: {
            OR: [
              { firstName: { contains: searchTerm, mode: 'insensitive' } },
              { lastName: { contains: searchTerm, mode: 'insensitive' } },
              { email: { contains: searchTerm, mode: 'insensitive' } },
              { phoneNumber: { contains: searchTerm, mode: 'insensitive' } },
            ]
          }
        });
      },
      product: async (_parent, args) =>
        await prisma.product.findUnique({ where: { id: args.id } }),
      categories: async () => await prisma.category.findMany(),
      category: async (_parent, args) =>
        await prisma.category.findUnique({ where: { id: args.id } }),
      collections: async () => await prisma.collection.findMany(),
      collection: async (_parent, args) =>
        await prisma.collection.findUnique({ where: { id: args.id } }),
      order: async (_parent, args) =>
        await prisma.order.findUnique({ where: { id: args.id } }),
      orders: async () => await prisma.order.findMany(),
      customer: async (_parent, args) =>
        await prisma.customer.findUnique({ where: { id: args.id } }),
      customers: async () => await prisma.customer.findMany(),
    },
    Mutation: {

      createProduct: async (_parent, args) => {
        const {
          name,
          description,
          price,
          imageUrl,
          stockQuantity,
          categoryId,
          variantInputs,
          collectionIds,
          tagIds,
        } = args;

        if (!name || !price) {
          throw new Error("Name and price are required fields.");
        }

        const product = await prisma.product.create({
          data: {
            name,
            description,
            price,
            imageUrl,
            stockQuantity,
            category: categoryId ? { connect: { id: categoryId } } : undefined,
            variants: {
              create: variantInputs || [],
            },
            collections: collectionIds
              ? { connect: collectionIds.map((id: any) => ({ id })) }
              : undefined,
            tags: tagIds ? { connect: tagIds.map((id: any) => ({ id })) } : undefined,
          },
        });

        return product;
      },
      updateProduct: async (_parent, args) => {
        const {
          name,
          description,
          price,
          imageUrl,
          stockQuantity,
          categoryId,
          variantInputs,
          collectionIds,
          tagIds,
        } = args.data;

        const product = await prisma.product.update({
          where: { id: args.id },
          data: {
            name,
            description,
            price,
            imageUrl,
            stockQuantity,
            category: categoryId ? { connect: { id: categoryId } } : undefined,
            variants: {
              upsert: variantInputs.map((variant: any) => ({
                where: { id: variant.id },
                update: variant,
                create: variant,
              })),
            },
            collections: collectionIds
              ? { set: collectionIds.map((id: any) => ({ id })) }
              : undefined,
            tags: tagIds ? { set: tagIds.map((id: any) => ({ id })) } : undefined,
          },
        });
        return product;
      },
      deleteProduct: async (_parent, args) => {
        return await prisma.product.delete({
          where: { id: args.id },
        });
      },
      createCategory: async (_parent, args) => {
        return await prisma.category.create({
          data: {
            name: args.name,
            description: args.description,
            imageUrl: args.imageUrl,
          },
        });
      },
      updateCategory: async (_parent, args) => {
        return await prisma.category.update({
          where: { id: args.id },
          data: {
            name: args.name,
            description: args.description,
            imageUrl: args.imageUrl,
          },
        });
      },
      deleteCategory: async (_parent, args) => {
        return await prisma.category.delete({
          where: { id: args.id },
        });
      },
      createCollection: async (_parent, args) => {
        return await prisma.collection.create({
          data: {
            title: args.title,
            description: args.description,
            imageUrl: args.imageUrl,
            type: args.type,
            rules: {
              create: args.rules || [],
            },
          },
        });
      },
      updateCollection: async (_parent, args) => {
        return await prisma.collection.update({
          where: { id: args.id },
          data: {
            title: args.title,
            description: args.description,
            imageUrl: args.imageUrl,
            type: args.type,
            rules: {
              upsert: args.rules.map((rule: any) => ({
                where: { id: rule.id },
                create: rule,
                update: rule,
              })),
            },
          },
        });
      },
      deleteCollection: async (_parent, args) => {
        return await prisma.collection.delete({
          where: { id: args.id },
        });
      },
      createOrder: async (_parent, args) => {
        const { customerId, shippingAddress, billingAddress, orderItems, tags, notes, discount, shippingFees, otherFees, taxRate, collectPaymentLater } = args;

        let totalPrice = 0;

        for (const item of orderItems) {
          const product = await prisma.product.findUnique({ where: { id: item.productId } });
          if (product) {
            totalPrice += (product.price || 0) * item.quantity;
          }
        }

        const totalWithFees = totalPrice + shippingFees + otherFees - discount;
        const totalWithTax = totalWithFees + (totalWithFees * taxRate) / 100;

        try {
          return await prisma.order.create({
            data: {
              customer: {
                connect: { id: customerId }
              },
              shippingAddress: {
                create: shippingAddress,
              },
              billingAddress: {
                create: billingAddress,
              },
              orderItems: {
                create: orderItems.map((item: any) => ({
                  quantity: item.quantity,
                  productId: item.productId,
                  price: item.price || 0,
                })),
              },
              tags,
              notes,
              discount,
              shippingFees,
              otherFees,
              taxRate,
              collectPaymentLater,
              total: totalWithTax,
              status: 'PENDING',
            },
          });
        } catch (error) {
          console.error('Error creating order:', error);
          throw new Error('Failed to create order: ' + error.message + error.cause);
        }
      },
      updateOrderStatus: async (_parent, args) => {
        return await prisma.order.update({
          where: {
            id: args.id,
          },
          data: {
            status: args.status,
          },
        });
      },
      createCustomer: async (_parent, args) => {
        const { firstName, lastName, email, phoneNumber, notes, tags, address } = args;
        return await prisma.customer.create({
          data: {
            firstName,
            lastName,
            email,
            phoneNumber,
            notes,
            tags: {
              create: tags || [],
            },
            address: { create: address || undefined },
          },
        });
      },
      updateCustomer: async (_parent, args) => {
        const { id, tags, address, ...customerData } = args;
        return await prisma.customer.update({
          where: { id },
          data: {
            ...customerData,
            tags: {
              upsert: tags.map((tag: any) => ({
                where: { name: tag.name },
                create: tag,
                update: tag,
              })),
            },
            address: {
              upsert: {
                create: address || {},
                update: address || {},
              },
            },
          },
        });
      },
      deleteCustomer: async (_parent, args) => {
        return await prisma.customer.delete({
          where: { id: args.id },
        });
      },
    },
  },
}
);

export default schema;
