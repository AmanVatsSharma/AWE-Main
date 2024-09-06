import { gql } from '@apollo/client';

export const GET_DASHBOARD_SUMMARY = gql`
  query {
    dashboardSummary {
      totalRevenue
      totalOrders
      totalCustomers
      averageOrderValue
      recentOrders {
        id
        status
        total
      }
      salesTrend {
        date
        revenue
        orderCount
      }
      customerGrowth {
        date
        newCustomers
        totalCustomers
      }
    }
  }
`;
