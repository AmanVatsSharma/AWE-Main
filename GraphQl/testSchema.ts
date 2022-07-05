import { createSchema } from "graphql-yoga";
import { PrismaClient } from "@prisma/client";
import { GraphQLError } from "graphql";

const prisma = new PrismaClient();

const handleError = (error: any) => {
  console.error("Operation failed:", error);
  throw new GraphQLError(error.message || "An unexpected error occurred", {
    extensions: { code: error.extensions?.code || "INTERNAL_SERVER_ERROR" },
  });
};

const validatePagination = (page: number, perPage: number) => {
  if (page < 1 || perPage < 1) {
    throw new GraphQLError("Invalid pagination parameters", {
      extensions: { code: "BAD_USER_INPUT" },
    });
  }
};

const validateRating = (rating: number) => {
  if (rating < 1 || rating > 5) {
    throw new GraphQLError("Rating must be between 1 and 5", {
      extensions: { code: "BAD_USER_INPUT" },
    });
  }
};



const schema = createSchema({
  typeDefs: `
scalar DateTime

type Query {
  # Existing queries
  products(category: String, search: String, page: Int, perPage: Int): ProductConnection!
  product(id: Int!): Product
  categories: [Category]
  category(id: Int!): Category
  collections: [Collection]
  collection(id: Int!): Collection
  order(id: Int!): Order
  orders(page: Int, perPage: Int): OrderConnection!
  customer(id: Int!): Customer
  customers(page: Int, perPage: Int): CustomerConnection!
  searchProducts(searchTerm: String!, page: Int, perPage: Int): ProductConnection!
  searchCustomers(searchTerm: String!, page: Int, perPage: Int): CustomerConnection!
  customerOrders(customerId: Int!, page: Int, perPage: Int): OrderConnection!
  coupon(id: Int!): Coupon

  # New queries
  featuredProducts(limit: Int): [Product!]!
  productsByCollection(collectionId: Int!, page: Int, perPage: Int): ProductConnection!
  reviews(productId: Int!, page: Int, perPage: Int): ReviewConnection!
  coupons(page: Int, perPage: Int): CouponConnection!
  salesReport(startDate: DateTime!, endDate: DateTime!): SalesReport!
  popularProducts(limit: Int): [Product!]!
  
  
    # New analytics queries
  productAnalytics(id: Int!): ProductAnalytics!
  categoryAnalytics(id: Int!): CategoryAnalytics!
  salesAnalytics(startDate: DateTime!, endDate: DateTime!): SalesAnalytics!
  customerAnalytics: CustomerAnalytics!
  inventoryAnalytics: InventoryAnalytics!
  marketingAnalytics(startDate: DateTime!, endDate: DateTime!): MarketingAnalytics!
  dashboardSummary: DashboardSummary!

}

type Mutation {
  # Existing mutations
  createProduct(input: CreateProductInput!): Product!
  updateProduct(id: Int!, input: UpdateProductInput!): Product!
  deleteProduct(id: Int!): Product!
  createCategory(input: CreateCategoryInput!): Category!
  updateCategory(id: Int!, input: UpdateCategoryInput!): Category!
  deleteCategory(id: Int!): Category!
  createCollection(input: CreateCollectionInput!): Collection!
  updateCollection(id: Int!, input: UpdateCollectionInput!): Collection!
  deleteCollection(id: Int!): Collection!
  createOrder(input: CreateOrderInput!): Order!
  updateOrderStatus(id: Int!, status: OrderStatus!): Order!
  createCustomer(input: CreateCustomerInput!): Customer!
  updateCustomer(id: Int!, input: UpdateCustomerInput!): Customer!
  deleteCustomer(id: Int!): Customer!

  # New mutations
  addProductToCollection(productId: Int!, collectionId: Int!): Product!
  removeProductFromCollection(productId: Int!, collectionId: Int!): Product!
  createReview(input: CreateReviewInput!): Review!
  updateReview(id: Int!, input: UpdateReviewInput!): Review!
  deleteReview(id: Int!): Review!
  updateInventory(productId: Int!, quantity: Int!): Product!
  createCoupon(input: CreateCouponInput!): Coupon!
  updateCoupon(id: Int!, input: UpdateCouponInput!): Coupon!
  deleteCoupon(id: Int!): Coupon!
  applyCouponToOrder(orderId: Int!, couponCode: String!): Order!
  updateProductInventory(id: Int!, quantity: Int!): Product!

    # New analytics-related mutations
  recordProductView(productId: Int!): ProductAnalytics!
  recordAddToCart(productId: Int!): ProductAnalytics!
  updateCustomerAcquisitionCost(customerId: Int!, cost: Float!): Customer!

}

# Existing input types (abbreviated for brevity)
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

input CreateCategoryInput {
  name: String!
  description: String
  imageUrl: String
}

input UpdateCategoryInput { 
      id: Int!
      name: String
      description: String
      imageUrl: String
 }

input CollectionRuleInput {
    key: String!
    value: String!
  }

input CreateCollectionInput { 
      title: String!,
      description: String,
      imageUrl: String,
      type: CollectionType!,
      rules: [CollectionRuleInput]
 }
input UpdateCollectionInput { 
      id: Int!
      title: String
      description: String
      imageUrl: String
      type: CollectionType
      rules: [CollectionRuleInput]
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

input OrderItemInput {
    productId: Int!
    quantity: Int!
  }

input CreateOrderInput { 
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
      collectPaymentLater: Boolean,
 }

input TagInput {
    name: String!
  }

input CreateCustomerInput { 
      firstName: String!
      lastName: String!
      email: String!
      phoneNumber: String!
      notes: String
      tags: [TagInput]
      address: AddressInput
 }
input UpdateCustomerInput {       id: Int!
      firstName: String
      lastName: String
      email: String
      phoneNumber: String
      notes: String
      tags: [TagInput!]
      address: AddressInput
}

# New input types
input CreateReviewInput {
  productId: Int!
  customerId: Int!
  rating: Int!
  comment: String
}

input UpdateReviewInput {
  rating: Int
  comment: String
}

input CreateCouponInput {
  code: String!
  discountType: DiscountType!
  discountValue: Float!
  minPurchaseAmount: Float
  expirationDate: DateTime
  maxUses: Int
}

input UpdateCouponInput {
  code: String
  discountType: DiscountType
  discountValue: Float
  minPurchaseAmount: Float
  expirationDate: DateTime
  maxUses: Int
  isActive: Boolean
}

# Existing types
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
    reviews: [Review!]!
    averageRating: Float
    salesCount: Int!
    revenue: Float!
    conversionRate: Float!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

    type Tag {
        id: Int!
        name: String!
        products: [Product]
        customers: [Customer]
        orders: [Order]
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

  type ProductVariant {
    id: Int!
    sku: String
    size: String
    color: String
    price: Float
    stockQuantity: Int!
    product: Product!
  }

    type Category {
    id: Int!
    name: String!
    description: String
    imageUrl: String
    products: [Product]
    createdAt: DateTime!
    updatedAt: DateTime!
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
    coupon: Coupon
    profitMargin: Float!
  }

  type OrderItem {
    id: Int!
    product: Product
    quantity: Int!
    price: Float!
    order: Order
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
    reviews: [Review]
    lifetimeValue: Float
    acquisitionCost: Float
    createdAt: DateTime!
    updatedAt: DateTime!
  }

# New types

    type ProductAnalytics {
      product: Product!
      viewCount: Int!
      addToCartCount: Int!
      purchaseCount: Int!
      conversionRate: Float!
      averageRating: Float!
    }

    type CategoryAnalytics {
      category: Category!
      productCount: Int!
      totalSales: Float!
      topProducts: [Product!]!
    }

    type SalesAnalytics {
      totalRevenue: Float!
      orderCount: Int!
      averageOrderValue: Float!
      topSellingProducts: [ProductAnalytics!]!
      salesByCategory: [CategoryAnalytics!]!
      salesByDate: [DailySales!]!
    }

    type DailySales {
      date: DateTime!
      revenue: Float!
      orderCount: Int!
    }

    type CustomerAnalytics {
      totalCustomers: Int!
      newCustomers: Int!
      repeatCustomers: Int!
      averageLifetimeValue: Float!
      topCustomers: [Customer!]!
      customerRetentionRate: Float!
    }

    type InventoryAnalytics {
      lowStockProducts: [Product!]!
      outOfStockProducts: [Product!]!
      overStockProducts: [Product!]!
      inventoryTurnoverRate: Float!
    }

    type MarketingAnalytics {
      cartAbandonmentRate: Float!
      conversionRate: Float!
      averageTimeToConversion: Float!
      topReferralSources: [ReferralSource!]!
    }

    type ReferralSource {
      source: String!
      visits: Int!
      conversions: Int!
      conversionRate: Float!
    }

    type DashboardSummary {
      totalRevenue: Float!
      totalOrders: Int!
      totalCustomers: Int!
      averageOrderValue: Float!
      topSellingProducts: [ProductAnalytics!]!
      recentOrders: [Order!]!
      salesTrend: [DailySales!]!
      customerGrowth: [CustomerGrowth!]!
    }

    type CustomerGrowth {
      date: DateTime!
      newCustomers: Int!
      totalCustomers: Int!
    }

    type Review {
        id: Int!
        product: Product!
        customer: Customer!
        rating: Int!
        comment: String
        createdAt: DateTime!
        updatedAt: DateTime!
    }

    type Coupon {
        id: Int!
        code: String!
        discountType: DiscountType!
        discountValue: Float!
        minPurchaseAmount: Float
        expirationDate: DateTime
        maxUses: Int
        currentUses: Int!
        isActive: Boolean!
        usageLimit: Int
        usageCount: Int!
        createdAt: DateTime!
        updatedAt: DateTime!
    }

    type SalesReport {
        totalSales: Float!
        totalOrders: Int!
        averageOrderValue: Float!
        topSellingProducts: [TopSellingProduct!]!
    }

    type TopSellingProduct {
        product: Product!
        totalQuantitySold: Int!
        totalRevenue: Float!
    }

    type ProductPopularity {
        product: Product!
        orderCount: Int!
    }

    type CustomerStats {
        totalCustomers: Int!
        newCustomersLastMonth: Int!
        repeatCustomerRate: Float!
    }


# Pagination types

    type ProductConnection {
        edges: [ProductEdge!]!
        pageInfo: PageInfo!
        totalCount: Int!
    }

type ProductEdge {
  node: Product!
  cursor: String!
}

type OrderConnection {
  edges: [OrderEdge!]!
  pageInfo: PageInfo!
  totalCount: Int!
}

type OrderEdge {
  node: Order!
  cursor: String!
}

type CustomerConnection {
  edges: [CustomerEdge!]!
  pageInfo: PageInfo!
  totalCount: Int!
}

type CustomerEdge {
  node: Customer!
  cursor: String!
}

type ReviewConnection {
  edges: [ReviewEdge!]!
  pageInfo: PageInfo!
  totalCount: Int!
}

type ReviewEdge {
  node: Review!
  cursor: String!
}

type CouponConnection {
  edges: [CouponEdge!]!
  pageInfo: PageInfo!
  totalCount: Int!
}

type CouponEdge {
  node: Coupon!
  cursor: String!
}

type PageInfo {
  hasNextPage: Boolean!
  hasPreviousPage: Boolean!
  startCursor: String
  endCursor: String
}

type Coupon {
  id: Int!
  code: String!
  discountType: DiscountType!
  discountValue: Float!
  minPurchaseAmount: Float
  expirationDate: DateTime
  maxUses: Int
  currentUses: Int!
  isActive: Boolean!
  orders: [Order!]!
  createdAt: DateTime!
  updatedAt: DateTime!
}


# Enums
enum DiscountType {
  PERCENTAGE
  FIXED_AMOUNT
}


# Existing enums
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
      // Existing queries with pagination
      products: async (_parent, { category, search, page = 1, perPage = 10 }) => {
        try {
          validatePagination(page, perPage);
          const where = {
            category: category ? { name: category } : undefined,
            OR: search
              ? [
                { name: { contains: search, mode: "insensitive" } },
                { description: { contains: search, mode: "insensitive" } },
              ]
              : undefined,
          };
          const totalCount = await prisma.product.count({ where });
          const products = await prisma.product.findMany({
            where,
            skip: (page - 1) * perPage,
            take: perPage,
            include: {
              category: true,
              variants: true,
              collections: true,
              tags: true,
            },
          });
          return {
            edges: products.map((product) => ({
              node: product,
              cursor: Buffer.from(product.id.toString()).toString("base64"),
            })),
            pageInfo: {
              hasNextPage: (page - 1) * perPage + products.length < totalCount,
              hasPreviousPage: page > 1,
              startCursor: products.length > 0 ? Buffer.from(products[0].id.toString()).toString("base64") : null,
              endCursor: products.length > 0 ? Buffer.from(products[products.length - 1].id.toString()).toString("base64") : null,
            },
            totalCount,
          };
        } catch (error) {
          return handleError(error);
        }
      },

      product: async (_, { id }) => {
        try {
          const product = await prisma.product.findUnique({
            where: { id },
            include: {
              category: true,
              variants: true,
              collections: true,
              tags: true,
            },
          });

          if (!product) {
            throw new GraphQLError("Product not found", {
              extensions: { code: "NOT_FOUND" },
            });
          }

          return product;
        } catch (error) {
          throw new GraphQLError("Failed to fetch product", {
            extensions: { code: "DATABASE_ERROR", error },
          });
        }
      },

      // New queries
      categories: async () => {
        return prisma.category.findMany();
      },

      category: async (_, { id }) => {
        return prisma.category.findUnique({ where: { id } });
      },

      collections: async () => {
        return prisma.collection.findMany();
      },

      collection: async (_, { id }) => {
        return prisma.collection.findUnique({ where: { id } });
      },

      order: async (_, { id }) => {
        return prisma.order.findUnique({
          where: { id },
          include: {
            customer: true,
            orderItems: { include: { product: true } },
            coupon: true,
          },
        });
      },

      orders: async (_, { page = 1, perPage = 10 }) => {
        try {
          validatePagination(page, perPage);
          const totalCount = await prisma.order.count();
          const orders = await prisma.order.findMany({
            skip: (page - 1) * perPage,
            take: perPage,
            include: {
              customer: true,
              orderItems: { include: { product: true } },
              coupon: true,
            },
            orderBy: { createdAt: 'desc' },
          });
          return {
            edges: orders.map((order) => ({
              node: order,
              cursor: Buffer.from(order.id.toString()).toString("base64"),
            })),
            pageInfo: {
              hasNextPage: (page - 1) * perPage + orders.length < totalCount,
              hasPreviousPage: page > 1,
              startCursor: orders.length > 0 ? Buffer.from(orders[0].id.toString()).toString("base64") : null,
              endCursor: orders.length > 0 ? Buffer.from(orders[orders.length - 1].id.toString()).toString("base64") : null,
            },
            totalCount,
          };
        } catch (error) {
          return handleError(error);
        }
      },

      customer: async (_, { id }) => {
        return prisma.customer.findUnique({
          where: { id },
          include: {
            orders: true,
            address: true,
          },
        });
      },

      customers: async (_, { page = 1, perPage = 10 }) => {
        try {
          validatePagination(page, perPage);
          const totalCount = await prisma.customer.count();
          const customers = await prisma.customer.findMany({
            skip: (page - 1) * perPage,
            take: perPage,
            include: {
              orders: true,
              address: true,
            },
          });
          return {
            edges: customers.map((customer) => ({
              node: customer,
              cursor: Buffer.from(customer.id.toString()).toString("base64"),
            })),
            pageInfo: {
              hasNextPage: (page - 1) * perPage + customers.length < totalCount,
              hasPreviousPage: page > 1,
              startCursor: customers.length > 0 ? Buffer.from(customers[0].id.toString()).toString("base64") : null,
              endCursor: customers.length > 0 ? Buffer.from(customers[customers.length - 1].id.toString()).toString("base64") : null,
            },
            totalCount,
          };
        } catch (error) {
          return handleError(error);
        }
      },

      searchProducts: async (_, { searchTerm, page = 1, perPage = 10 }) => {
        try {
          validatePagination(page, perPage);
          const where = {
            OR: [
              { name: { contains: searchTerm, mode: "insensitive" } },
              { description: { contains: searchTerm, mode: "insensitive" } },
            ],
          };
          const totalCount = await prisma.product.count({ where });
          const products = await prisma.product.findMany({
            where,
            skip: (page - 1) * perPage,
            take: perPage,
            include: {
              category: true,
              variants: true,
              collections: true,
              tags: true,
            },
          });
          return {
            edges: products.map((product) => ({
              node: product,
              cursor: Buffer.from(product.id.toString()).toString("base64"),
            })),
            pageInfo: {
              hasNextPage: (page - 1) * perPage + products.length < totalCount,
              hasPreviousPage: page > 1,
              startCursor: products.length > 0 ? Buffer.from(products[0].id.toString()).toString("base64") : null,
              endCursor: products.length > 0 ? Buffer.from(products[products.length - 1].id.toString()).toString("base64") : null,
            },
            totalCount,
          };
        } catch (error) {
          return handleError(error);
        }
      },

      searchCustomers: async (_, { searchTerm, page = 1, perPage = 10 }) => {
        try {
          validatePagination(page, perPage);
          const where = {
            OR: [
              { firstName: { contains: searchTerm, mode: "insensitive" } },
              { lastName: { contains: searchTerm, mode: "insensitive" } },
              { email: { contains: searchTerm, mode: "insensitive" } },
            ],
          };
          const totalCount = await prisma.customer.count({ where });
          const customers = await prisma.customer.findMany({
            where,
            skip: (page - 1) * perPage,
            take: perPage,
            include: {
              orders: true,
              reviews: true,
              address: true,
            },
          });
          return {
            edges: customers.map((customer) => ({
              node: customer,
              cursor: Buffer.from(customer.id.toString()).toString("base64"),
            })),
            pageInfo: {
              hasNextPage: (page - 1) * perPage + customers.length < totalCount,
              hasPreviousPage: page > 1,
              startCursor: customers.length > 0 ? Buffer.from(customers[0].id.toString()).toString("base64") : null,
              endCursor: customers.length > 0 ? Buffer.from(customers[customers.length - 1].id.toString()).toString("base64") : null,
            },
            totalCount,
          };
        } catch (error) {
          return handleError(error);
        }
      },

      coupon: async (_parent, { id }) => {
        return prisma.coupon.findUnique({ where: { id } });
      },

      featuredProducts: async (_parent, { limit = 10 }) => {
        try {
          return await prisma.product.findMany({
            where: { tags: { some: { name: "featured" } } },
            take: limit,
            include: {
              category: true,
              variants: true,
              collections: true,
              tags: true,
            },
          });
        } catch (error) {
          return handleError(error);
        }
      },

      customerOrders: async (_parent, { customerId, page = 1, perPage = 10 }) => {
        const skip = (page - 1) * perPage;
        const [orders, totalCount] = await Promise.all([
          prisma.order.findMany({
            where: { customerId },
            skip,
            take: perPage,
            include: { orderItems: { include: { product: true } }, coupon: true },
            orderBy: { createdAt: 'desc' },
          }),
          prisma.order.count({ where: { customerId } }),
        ]);

        return {
          edges: orders.map(order => ({
            node: order,
            cursor: Buffer.from(order.id.toString()).toString('base64'),
          })),
          pageInfo: {
            hasNextPage: skip + orders.length < totalCount,
            hasPreviousPage: page > 1,
            startCursor: orders.length > 0 ? Buffer.from(orders[0].id.toString()).toString('base64') : null,
            endCursor: orders.length > 0 ? Buffer.from(orders[orders.length - 1].id.toString()).toString('base64') : null,
          },
          totalCount,
        };
      },

      productsByCollection: async (_parent, { collectionId, page = 1, perPage = 20 }) => {
        try {
          validatePagination(page, perPage);
          const where = { collections: { some: { id: collectionId } } };
          const totalCount = await prisma.product.count({ where });
          const products = await prisma.product.findMany({
            where,
            skip: (page - 1) * perPage,
            take: perPage,
            include: {
              category: true,
              variants: true,
              collections: true,
              tags: true,
            },
          });
          return {
            edges: products.map((product) => ({
              node: product,
              cursor: Buffer.from(product.id.toString()).toString("base64"),
            })),
            pageInfo: {
              hasNextPage: (page - 1) * perPage + products.length < totalCount,
              hasPreviousPage: page > 1,
              startCursor: products.length > 0 ? Buffer.from(products[0].id.toString()).toString("base64") : null,
              endCursor: products.length > 0 ? Buffer.from(products[products.length - 1].id.toString()).toString("base64") : null,
            },
            totalCount,
          };
        } catch (error) {
          return handleError(error);
        }
      },

      reviews: async (_parent, { productId, page = 1, perPage = 10 }) => {
        try {
          validatePagination(page, perPage);
          const where = { productId };
          const totalCount = await prisma.review.count({ where });
          const reviews = await prisma.review.findMany({
            where,
            skip: (page - 1) * perPage,
            take: perPage,
            include: {
              product: true,
              customer: true,
            },
          });
          return {
            edges: reviews.map((review) => ({
              node: review,
              cursor: Buffer.from(review.id.toString()).toString("base64"),
            })),
            pageInfo: {
              hasNextPage: (page - 1) * perPage + reviews.length < totalCount,
              hasPreviousPage: page > 1,
              startCursor: reviews.length > 0 ? Buffer.from(reviews[0].id.toString()).toString("base64") : null,
              endCursor: reviews.length > 0 ? Buffer.from(reviews[reviews.length - 1].id.toString()).toString("base64") : null,
            },
            totalCount,
          };
        } catch (error) {
          return handleError(error);
        }
      },

      coupons: async (_parent, { page = 1, perPage = 10 }) => {
        try {
          validatePagination(page, perPage);
          const totalCount = await prisma.coupon.count();
          const coupons = await prisma.coupon.findMany({
            skip: (page - 1) * perPage,
            take: perPage,
          });
          return {
            edges: coupons.map((coupon) => ({
              node: coupon,
              cursor: Buffer.from(coupon.id.toString()).toString("base64"),
            })),
            pageInfo: {
              hasNextPage: (page - 1) * perPage + coupons.length < totalCount,
              hasPreviousPage: page > 1,
              startCursor: coupons.length > 0 ? Buffer.from(coupons[0].id.toString()).toString("base64") : null,
              endCursor: coupons.length > 0 ? Buffer.from(coupons[coupons.length - 1].id.toString()).toString("base64") : null,
            },
            totalCount,
          };
        } catch (error) {
          return handleError(error);
        }
      },

      salesReport: async (_parent, { startDate, endDate }) => {
        try {
          const orders = await prisma.order.findMany({
            where: {
              createdAt: {
                gte: startDate,
                lte: endDate,
              },
              status: "DELIVERED",
            },
            include: {
              orderItems: {
                include: {
                  product: true,
                },
              },
            },
          });

          const totalSales = orders.reduce((sum, order) => sum + order.total, 0);
          const totalOrders = orders.length;
          const averageOrderValue = totalOrders > 0 ? totalSales / totalOrders : 0;

          const productSales = orders.flatMap((order) =>
            order.orderItems.map((item) => ({
              productId: item.productId,
              quantity: item.quantity,
              revenue: item.price * item.quantity,
            }))
          );

          const topSellingProducts = Object.values(
            productSales.reduce((acc, { productId, quantity, revenue }) => {
              if (!acc[productId]) {
                acc[productId] = { productId, totalQuantitySold: 0, totalRevenue: 0 };
              }
              acc[productId].totalQuantitySold += quantity;
              acc[productId].totalRevenue += revenue;
              return acc;
            }, {})
          )
            .sort((a, b) => b.totalRevenue - a.totalRevenue)
            .slice(0, 5);

          const topSellingProductsWithDetails = await Promise.all(
            topSellingProducts.map(async ({ productId, totalQuantitySold, totalRevenue }) => ({
              product: await prisma.product.findUnique({ where: { id: productId } }),
              totalQuantitySold,
              totalRevenue,
            }))
          );

          return {
            totalSales,
            totalOrders,
            averageOrderValue,
            topSellingProducts: topSellingProductsWithDetails,
          };
        } catch (error) {
          return handleError(error);
        }
      },

      popularProducts: async (_parent, { limit = 10 }) => {
        try {
          const popularProducts = await prisma.orderItem.groupBy({
            by: ["productId"],
            _sum: {
              quantity: true,
            },
            orderBy: {
              _sum: {
                quantity: "desc",
              },
            },
            take: limit,
          });

          return Promise.all(
            popularProducts.map(async (item) =>
              prisma.product.findUnique({
                where: { id: item.productId },
                include: {
                  category: true,
                  variants: true,
                  collections: true,
                  tags: true,
                },
              })
            )
          );
        } catch (error) {
          return handleError(error);
        }
      },

      productAnalytics: async (_, { id }) => {
        const product = await prisma.product.findUnique({ where: { id } });
        const analytics = await prisma.productAnalytics.findUnique({ where: { productId: id } });
        return {
          product,
          ...analytics,
          conversionRate: analytics.viewCount > 0 ? analytics.purchaseCount / analytics.viewCount : 0,
        };
      },

      categoryAnalytics: async (_, { id }) => {
        const category = await prisma.category.findUnique({ where: { id } });
        const products = await prisma.product.findMany({ where: { categoryId: id } });
        const sales = await prisma.order.findMany({
          where: { orderItems: { some: { product: { categoryId: id } } } },
          include: { orderItems: true },
        });

        const totalSales = sales.reduce((sum, order) =>
          sum + order.orderItems.reduce((itemSum, item) => itemSum + item.price * item.quantity, 0), 0);

        const topProducts = products.sort((a, b) => b.salesCount - a.salesCount).slice(0, 5);

        return {
          category,
          productCount: products.length,
          totalSales,
          topProducts,
        };
      },

      salesAnalytics: async (_, { startDate, endDate }) => {
        const orders = await prisma.order.findMany({
          where: { createdAt: { gte: startDate, lte: endDate } },
          include: { orderItems: { include: { product: true } } },
        });

        const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
        const averageOrderValue = totalRevenue / orders.length;

        const productSales = {};
        orders.forEach(order => {
          order.orderItems.forEach(item => {
            if (!productSales[item.productId]) {
              productSales[item.productId] = { product: item.product, salesCount: 0, revenue: 0 };
            }
            productSales[item.productId].salesCount += item.quantity;
            productSales[item.productId].revenue += item.price * item.quantity;
          });
        });

        const topSellingProducts = Object.values(productSales)
          .sort((a, b) => b.salesCount - a.salesCount)
          .slice(0, 10)
          .map(({ product, salesCount, revenue }) => ({
            product,
            salesCount,
            revenue,
            conversionRate: calculateConversionRate(product.id),
          }));

        const salesByCategory = await calculateSalesByCategory(orders);
        const salesByDate = calculateSalesByDate(orders);

        return {
          totalRevenue,
          orderCount: orders.length,
          averageOrderValue,
          topSellingProducts,
          salesByCategory,
          salesByDate,
        };
      },

      customerAnalytics: async () => {
        const customers = await prisma.customer.findMany({
          include: { orders: true },
        });

        const totalCustomers = customers.length;
        const newCustomers = customers.filter(c => c.orders.length === 1).length;
        const repeatCustomers = totalCustomers - newCustomers;

        const averageLifetimeValue = customers.reduce((sum, customer) =>
          sum + customer.orders.reduce((orderSum, order) => orderSum + order.total, 0), 0) / totalCustomers;

        const topCustomers = customers
          .sort((a, b) => calculateLifetimeValue(b) - calculateLifetimeValue(a))
          .slice(0, 10);

        const customerRetentionRate = repeatCustomers / totalCustomers;

        return {
          totalCustomers,
          newCustomers,
          repeatCustomers,
          averageLifetimeValue,
          topCustomers,
          customerRetentionRate,
        };
      },

      inventoryAnalytics: async () => {
        const products = await prisma.product.findMany();

        const lowStockThreshold = 10; // Example threshold
        const overStockThreshold = 100; // Example threshold

        const lowStockProducts = products.filter(p => p.stockQuantity > 0 && p.stockQuantity <= lowStockThreshold);
        const outOfStockProducts = products.filter(p => p.stockQuantity === 0);
        const overStockProducts = products.filter(p => p.stockQuantity > overStockThreshold);

        const inventoryTurnoverRate = await calculateInventoryTurnoverRate();

        return {
          lowStockProducts,
          outOfStockProducts,
          overStockProducts,
          inventoryTurnoverRate,
        };
      },

      marketingAnalytics: async (_, { startDate, endDate }) => {
        const cartAbandonmentRate = await calculateCartAbandonmentRate(startDate, endDate);
        const conversionRate = await calculateConversionRate(startDate, endDate);
        const averageTimeToConversion = await calculateAverageTimeToConversion(startDate, endDate);
        const topReferralSources = await getTopReferralSources(startDate, endDate);

        return {
          cartAbandonmentRate,
          conversionRate,
          averageTimeToConversion,
          topReferralSources,
        };
      },

      dashboardSummary: async () => {
        const totalRevenue = await calculateTotalRevenue();
        const totalOrders = await prisma.order.count();
        const totalCustomers = await prisma.customer.count();
        const averageOrderValue = totalRevenue / totalOrders;
        const topSellingProducts = await getTopSellingProducts();
        const recentOrders = await getRecentOrders();
        const salesTrend = await getSalesTrend();
        const customerGrowth = await getCustomerGrowth();

        return {
          totalRevenue,
          totalOrders,
          totalCustomers,
          averageOrderValue,
          topSellingProducts,
          recentOrders,
          salesTrend,
          customerGrowth,
        };
      },
    },

    Mutation: {
      // New mutations
      createReview: async (_parent, { input }) => {
        const { productId, customerId, rating, comment } = input;

        try {
          validateRating(rating);
          return await prisma.review.create({
            data: {
              product: { connect: { id: productId } },
              customer: { connect: { id: customerId } },
              rating,
              comment,
            },
            include: {
              product: true,
              customer: true,
            },
          });
        } catch (error) {
          return handleError(error);
        }
      },

      updateReview: async (_parent, { id, input }) => {
        try {
          if (input.rating) {
            validateRating(input.rating);
          }
          return await prisma.review.update({
            where: { id },
            data: input,
            include: {
              product: true,
              customer: true,
            },
          });
        } catch (error) {
          return handleError(error);
        }
      },

      deleteReview: async (_parent, { id }) => {
        try {
          return await prisma.review.delete({
            where: { id },
            include: {
              product: true,
              customer: true,
            },
          });
        } catch (error) {
          return handleError(error);
        }
      },

      updateInventory: async (_parent, { productId, quantity }) => {
        try {
          if (quantity < 0) {
            throw new GraphQLError("Quantity cannot be negative", {
              extensions: { code: "BAD_USER_INPUT" },
            });
          }
          return await prisma.product.update({
            where: { id: productId },
            data: { stockQuantity: quantity },
            include: {
              category: true,
              variants: true,
              collections: true,
              tags: true,
            },
          });
        } catch (error) {
          return handleError(error);
        }
      },

      createCoupon: async (_parent, { input }) => {
        try {
          if (input.discountValue <= 0) {
            throw new GraphQLError("Discount value must be greater than 0", {
              extensions: { code: "BAD_USER_INPUT" },
            });
          }
          return await prisma.coupon.create({
            data: {
              ...input,
              currentUses: 0,
              isActive: true,
            },
          });
        } catch (error) {
          return handleError(error);
        }
      },

      updateCoupon: async (_parent, { id, input }) => {
        try {
          if (input.discountValue && input.discountValue <= 0) {
            throw new GraphQLError("Discount value must be greater than 0", {
              extensions: { code: "BAD_USER_INPUT" },
            });
          }
          return await prisma.coupon.update({
            where: { id },
            data: input,
          });
        } catch (error) {
          return handleError(error);
        }
      },

      deleteCoupon: async (_parent, { id }) => {
        try {
          return await prisma.coupon.delete({
            where: { id },
          });
        } catch (error) {
          return handleError(error);
        }
      },

      applyCouponToOrder: async (_parent, { orderId, couponCode }) => {
        try {
          const coupon = await prisma.coupon.findUnique({
            where: { code: couponCode },
          });

          if (!coupon || !coupon.isActive) {
            throw new GraphQLError("Invalid or inactive coupon", {
              extensions: { code: "BAD_USER_INPUT" },
            });
          }

          if (coupon.maxUses && coupon.currentUses >= coupon.maxUses) {
            throw new GraphQLError("Coupon usage limit reached", {
              extensions: { code: "BAD_USER_INPUT" },
            });
          }

          const order = await prisma.order.findUnique({
            where: { id: orderId },
            include: { orderItems: true },
          });

          if (!order) {
            throw new GraphQLError("Order not found", {
              extensions: { code: "NOT_FOUND" },
            });
          }

          const orderTotal = order.orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

          if (coupon.minPurchaseAmount && orderTotal < coupon.minPurchaseAmount) {
            throw new GraphQLError("Order total does not meet minimum purchase amount for this coupon", {
              extensions: { code: "BAD_USER_INPUT" },
            });
          }

          let discountAmount = 0;
          if (coupon.discountType === "PERCENTAGE") {
            discountAmount = orderTotal * (coupon.discountValue / 100);
          } else {
            discountAmount = coupon.discountValue;
          }

          const updatedOrder = await prisma.order.update({
            where: { id: orderId },
            data: {
              discount: discountAmount,
              total: orderTotal - discountAmount,
            },
            include: {
              customer: true,
              orderItems: {
                include: {
                  product: true,
                },
              },
            },
          });

          await prisma.coupon.update({
            where: { id: coupon.id },
            data: {
              currentUses: {
                increment: 1,
              },
            },
          });

          return updatedOrder;
        } catch (error) {
          return handleError(error);
        }
      },

      createProduct: async (_parent, { input }) => {
        const { variantInputs, collectionIds, tagIds, ...productData } = input;

        const product = await prisma.product.create({
          data: {
            ...productData,
            category: productData.categoryId
              ? { connect: { id: productData.categoryId } }
              : undefined,
            variants: {
              create: variantInputs,
            },
            collections: collectionIds
              ? { connect: collectionIds.map(id => ({ id })) }
              : undefined,
            tags: tagIds
              ? { connect: tagIds.map(id => ({ id })) }
              : undefined,
          },
          include: {
            category: true,
            variants: true,
            collections: true,
            tags: true,
          },
        });

        return product;
      },

      updateProduct: async (_parent, { id, input }) => {
        const { variantInputs, collectionIds, tagIds, ...productData } = input;

        const product = await prisma.product.update({
          where: { id },
          data: {
            ...productData,
            category: productData.categoryId
              ? { connect: { id: productData.categoryId } }
              : undefined,
            variants: {
              upsert: variantInputs?.map(variant => ({
                where: { id: variant.id },
                create: variant,
                update: variant,
              })),
            },
            collections: collectionIds
              ? { set: collectionIds.map(id => ({ id })) }
              : undefined,
            tags: tagIds
              ? { set: tagIds.map(id => ({ id })) }
              : undefined,
          },
          include: {
            category: true,
            variants: true,
            collections: true,
            tags: true,
          },
        });

        return product;
      },

      updateProductInventory: async (_parent, { id, quantity }) => {
        if (quantity < 0) {
          throw new GraphQLError("Quantity cannot be negative", {
            extensions: { code: "BAD_USER_INPUT" },
          });
        }

        const product = await prisma.product.update({
          where: { id },
          data: { stockQuantity: quantity },
          include: {
            category: true,
            variants: true,
            collections: true,
            tags: true,
          },
        });

        return product;
      },

      createOrder: async (_parent, { input }) => {
        const { customerId, shippingAddress, billingAddress, orderItems, couponCode, notes } = input;

        let discount = 0;
        let coupon = null;

        if (couponCode) {
          coupon = await prisma.coupon.findUnique({ where: { code: couponCode } });
          if (!coupon || !coupon?.isActive || (coupon?.expirationDate && new Date() > coupon.expirationDate)) {
            throw new GraphQLError("Invalid or expired coupon", {
              extensions: { code: "BAD_USER_INPUT" },
            });
          }
        }

        const orderData = {
          customer: { connect: { id: customerId } },
          shippingAddress: { create: shippingAddress },
          billingAddress: { create: billingAddress },
          notes,
          coupon,
          status: "PENDING",
          orderItems: {
            create: await Promise.all(orderItems.map(async (item) => {
              const product = await prisma.product.findUnique({ where: { id: item.productId } });
              if (!product) {
                throw new GraphQLError(`Product with id ${item.productId} not found`, {
                  extensions: { code: "BAD_USER_INPUT" },
                });
              }
              if (product.stockQuantity < item.quantity) {
                throw new GraphQLError(`Insufficient stock for product ${product.name}`, {
                  extensions: { code: "BAD_USER_INPUT" },
                });
              }
              return {
                product: { connect: { id: item.productId } },
                quantity: item.quantity,
                price: product.price,
              };
            })),
          },
        };

        if (coupon) {
          orderData.coupon = { connect: { id: coupon.id } };
        }

        const order = await prisma.order.create({
          data: orderData,
          include: {
            customer: true,
            shippingAddress: true,
            billingAddress: true,
            orderItems: {
              include: {
                product: true,
              },
            },
            coupon: true,
          },
        });

        // Calculate total and apply discount
        let total = order.orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

        if (coupon) {
          if (coupon.discountType === "PERCENTAGE") {
            discount = total * (coupon.discountValue / 100);
          } else {
            discount = coupon.discountValue;
          }
          total -= discount;
        }

        // Update order with total and discount
        const updatedOrder = await prisma.order.update({
          where: { id: order.id },
          data: {
            total,
            discount,
          },
          include: {
            customer: true,
            shippingAddress: true,
            billingAddress: true,
            orderItems: {
              include: {
                product: true,
              },
            },
            coupon: true,
          },
        });

        // Update product stock quantities
        await Promise.all(order.orderItems.map(item =>
          prisma.product.update({
            where: { id: item.product.id },
            data: { stockQuantity: { decrement: item.quantity } },
          })
        ));

        // Update coupon usage if applicable
        if (coupon) {
          await prisma.coupon.update({
            where: { id: coupon.id },
            data: { usageCount: { increment: 1 } },
          });
        }

        return updatedOrder;
      },

      deleteProduct: async (_, { id }) => {
        return prisma.product.delete({ where: { id } });
      },

      createCategory: async (_, { input }) => {
        return prisma.category.create({ data: input });
      },

      updateCategory: async (_, { id, input }) => {
        return prisma.category.update({ where: { id }, data: input });
      },

      deleteCategory: async (_, { id }) => {
        return prisma.category.delete({ where: { id } });
      },

      createCollection: async (_, { input }) => {
        const { rules, ...collectionData } = input;
        return prisma.collection.create({
          data: {
            ...collectionData,
            rules: { create: rules },
          },
          include: { rules: true },
        });
      },

      updateCollection: async (_, { id, input }) => {
        const { rules, ...collectionData } = input;
        return prisma.collection.update({
          where: { id },
          data: {
            ...collectionData,
            rules: {
              deleteMany: {},
              create: rules,
            },
          },
          include: { rules: true },
        });
      },

      deleteCollection: async (_, { id }) => {
        return prisma.collection.delete({ where: { id } });
      },

      updateOrderStatus: async (_, { id, status }) => {
        return prisma.order.update({
          where: { id },
          data: { status },
          include: {
            customer: true,
            orderItems: { include: { product: true } },
            coupon: true,
          },
        });
      },

      createCustomer: async (_, { input }) => {
        const { address, tags, ...customerData } = input;
        // Prepare tag data for Prisma
        const tagsData = tags?.map(tag => ({
          where: { name: tag.name },
          create: { name: tag.name },
        }));


        return prisma.customer.create({
          data: {
            ...customerData,
            address: { create: address },
            tags: {
              connectOrCreate: tagsData,
            },
          },
          include: { address: true, tags: true },
        });
      },

      updateCustomer: async (_, { id, input }) => {
        const { address, ...customerData } = input;
        return prisma.customer.update({
          where: { id },
          data: {
            ...customerData,
            address: address ? { upsert: { create: address, update: address } } : undefined,
          },
          include: { address: true },
        });
      },

      deleteCustomer: async (_, { id }) => {
        return prisma.customer.delete({ where: { id } });
      },

      addProductToCollection: async (_, { productId, collectionId }) => {
        return prisma.product.update({
          where: { id: productId },
          data: { collections: { connect: { id: collectionId } } },
          include: { collections: true },
        });
      },

      removeProductFromCollection: async (_, { productId, collectionId }) => {
        return prisma.product.update({
          where: { id: productId },
          data: { collections: { disconnect: { id: collectionId } } },
          include: { collections: true },
        });
      },

      recordProductView: async (_, { productId }) => {
        return prisma.productAnalytics.upsert({
          where: { productId },
          update: { viewCount: { increment: 1 } },
          create: { productId, viewCount: 1 },
        });
      },

      recordAddToCart: async (_, { productId }) => {
        return prisma.productAnalytics.upsert({
          where: { productId },
          update: { addToCartCount: { increment: 1 } },
          create: { productId, addToCartCount: 1 },
        });
      },

      updateCustomerAcquisitionCost: async (_, { customerId, cost }) => {
        return prisma.customer.update({
          where: { id: customerId },
          data: { acquisitionCost: cost },
        });
      },
    },
  },
}
);

export default schema;

// # Helper functions (implement these based on your data structure and business logic)
const calculateConversionRate = async (productId) => {
  const analytics = await prisma.productAnalytics.findUnique({ where: { productId } });
  return analytics.viewCount > 0 ? analytics.purchaseCount / analytics.viewCount : 0;
};

const calculateSalesByCategory = async (orders) => {
  const categorySales = {};
  for (const order of orders) {
    for (const item of order.orderItems) {
      const categoryId = item.product.categoryId;
      if (!categorySales[categoryId]) {
        categorySales[categoryId] = { totalSales: 0, category: item.product.category };
      }
      categorySales[categoryId].totalSales += item.price * item.quantity;
    }
  }
  return Object.values(categorySales);
};

const calculateSalesByDate = (orders) => {
  const salesByDate = {};
  orders.forEach(order => {
    const date = order.createdAt.toISOString().split('T')[0];
    if (!salesByDate[date]) {
      salesByDate[date] = { date, revenue: 0, orderCount: 0 };
    }
    salesByDate[date].revenue += order.total;
    salesByDate[date].orderCount++;
  });
  return Object.values(salesByDate);
};

const calculateLifetimeValue = (customer) => {
  return customer.orders.reduce((sum, order) => sum + order.total, 0);
};

const calculateInventoryTurnoverRate = async () => {
  const products = await prisma.product.findMany({ include: { orderItems: true } });
  const totalCostOfGoodsSold = products.reduce((sum, product) =>
    sum + product.orderItems.reduce((itemSum, item) => itemSum + item.quantity * product.price, 0), 0);
  const averageInventoryValue = products.reduce((sum, product) => sum + product.stockQuantity * product.price, 0) / products.length;
  return totalCostOfGoodsSold / averageInventoryValue;
};

const calculateCartAbandonmentRate = async (startDate, endDate) => {
  const totalCarts = await prisma.cart.count({ where: { createdAt: { gte: startDate, lte: endDate } } });
  const completedCarts = await prisma.order.count({ where: { createdAt: { gte: startDate, lte: endDate } } });
  return (totalCarts - completedCarts) / totalCarts;
};

const calculateAverageTimeToConversion = async (startDate, endDate) => {
  const orders = await prisma.order.findMany({
    where: { createdAt: { gte: startDate, lte: endDate } },
    include: { customer: true }
  });
  const totalTime = orders.reduce((sum, order) => sum + (order.createdAt - order.customer.createdAt), 0);
  return totalTime / orders.length;
};

const getTopReferralSources = async (startDate, endDate) => {
  // This would require a separate analytics tracking system
  // Placeholder implementation
  return [
    { source: 'Google', visits: 1000, conversions: 50, conversionRate: 0.05 },
    { source: 'Facebook', visits: 800, conversions: 30, conversionRate: 0.0375 },
    { source: 'Direct', visits: 500, conversions: 25, conversionRate: 0.05 }
  ];
};

const calculateTotalRevenue = async () => {
  const result = await prisma.order.aggregate({
    _sum: { total: true }
  });
  return result._sum.total || 0;
};

const getTopSellingProducts = async () => {
  return prisma.product.findMany({
    orderBy: { salesCount: 'desc' },
    take: 5,
  });
};

const getRecentOrders = async () => {
  return prisma.order.findMany({
    orderBy: { createdAt: 'desc' },
    take: 5,
    include: { customer: true, orderItems: { include: { product: true } } }
  });
};

const getSalesTrend = async () => {
  const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
  const orders = await prisma.order.findMany({
    where: { createdAt: { gte: thirtyDaysAgo } },
    select: { createdAt: true, total: true }
  });
  return calculateSalesByDate(orders);
};

const getCustomerGrowth = async () => {
  const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
  const customers = await prisma.customer.findMany({
    where: { createdAt: { gte: thirtyDaysAgo } },
    select: { createdAt: true }
  });
  const growthByDate = {};
  customers.forEach(customer => {
    const date = customer.createdAt.toISOString().split('T')[0];
    if (!growthByDate[date]) {
      growthByDate[date] = { date, newCustomers: 0, totalCustomers: 0 };
    }
    growthByDate[date].newCustomers++;
  });
  let totalCustomers = await prisma.customer.count({ where: { createdAt: { lt: thirtyDaysAgo } } });
  Object.values(growthByDate).forEach(day => {
    totalCustomers += day.newCustomers;
    day.totalCustomers = totalCustomers;
  });
  return Object.values(growthByDate);
};

