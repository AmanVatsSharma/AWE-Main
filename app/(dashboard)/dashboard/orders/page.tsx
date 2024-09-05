"use client"

import { useState, useEffect } from "react"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

export default function Component() {
  const [orders, setOrders] = useState([
    {
      id: "ORD001",
      customerName: "John Doe",
      orderDate: "2023-05-01",
      totalAmount: 250.99,
      status: "Fulfilled",
    },
    {
      id: "ORD002",
      customerName: "Jane Smith",
      orderDate: "2023-06-15",
      totalAmount: 149.99,
      status: "Pending",
    },
    {
      id: "ORD003",
      customerName: "Michael Johnson",
      orderDate: "2023-07-20",
      totalAmount: 399.99,
      status: "Fulfilled",
    },
    {
      id: "ORD004",
      customerName: "Emily Davis",
      orderDate: "2023-08-05",
      totalAmount: 79.99,
      status: "Cancelled",
    },
    {
      id: "ORD005",
      customerName: "David Wilson",
      orderDate: "2023-09-10",
      totalAmount: 199.99,
      status: "Fulfilled",
    },
  ])
  const [filteredOrders, setFilteredOrders] = useState(orders)
  const [searchTerm, setSearchTerm] = useState("")
  const [sortColumn, setSortColumn] = useState("orderDate")
  const [sortDirection, setSortDirection] = useState("desc")
  const [filterStatus, setFilterStatus] = useState("")
  const [filterCustomerName, setFilterCustomerName] = useState("")
  const [filterDateRange, setFilterDateRange] = useState({
    startDate: null,
    endDate: null,
  })
  const [filterTotalAmount, setFilterTotalAmount] = useState({
    min: null,
    max: null,
  })
  const [dateRange, setDateRange] = useState("today")
  const totalOrders = orders.length
  const totalReturns = orders.filter((order) => order.status === "Cancelled").length
  const totalFulfilled = orders.filter((order) => order.status === "Fulfilled").length
  // useEffect(() => {
  //   let filtered = orders
  //   if (searchTerm) {
  //     filtered = filtered.filter(
  //       (order) =>
  //         order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //         order.customerName.toLowerCase().includes(searchTerm.toLowerCase()),
  //     )
  //   }
  //   if (filterStatus) {
  //     filtered = filtered.filter((order) => order.status === filterStatus)
  //   }
  //   if (filterCustomerName) {
  //     filtered = filtered.filter((order) => order.customerName.toLowerCase().includes(filterCustomerName.toLowerCase()))
  //   }
  //   if (filterDateRange.startDate && filterDateRange.endDate) {
  //     filtered = filtered.filter((order) => {
  //       const orderDate = new Date(order.orderDate)
  //       return orderDate >= filterDateRange.startDate && orderDate <= filterDateRange.endDate
  //     })
  //   }
  //   if (filterTotalAmount.min !== null && filterTotalAmount.max !== null) {
  //     filtered = filtered.filter(
  //       (order) => order.totalAmount >= filterTotalAmount.min && order.totalAmount <= filterTotalAmount.max,
  //     )
  //   }
  //   filtered = filtered.sort((a, b) => {
  //     if (a[sortColumn] < b[sortColumn]) return sortDirection === "asc" ? -1 : 1
  //     if (a[sortColumn] > b[sortColumn]) return sortDirection === "asc" ? 1 : -1
  //     return 0
  //   })
  //   setFilteredOrders(filtered)
  // }, [
  //   orders,
  //   searchTerm,
  //   sortColumn,
  //   sortDirection,
  //   filterStatus,
  //   filterCustomerName,
  //   filterDateRange,
  //   filterTotalAmount,
  // ])
  const handleSort = (column:any) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortColumn(column)
      setSortDirection("asc")
    }
  }
  const handleFilterStatus = (status:any) => {
    setFilterStatus(status)
  }
  const handleFilterCustomerName = (name:any) => {
    setFilterCustomerName(name)
  }
  const handleFilterDateRange = (range:any) => {
    setFilterDateRange(range)
  }
  const handleFilterTotalAmount = (range:any) => {
    setFilterTotalAmount(range)
  }
  const handleSearch = (term:any) => {
    setSearchTerm(term)
  }

  const handleDateRangeChange = (range:any) => {
  //   setDateRange(range)
  //   if (range === "today") {
  //     const today = new Date()
  //     setFilterDateRange({
  //       p
  //       startDate: new Date(today.getFullYear(), today.getMonth(), today.getDate()),
  //       endDate: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 23, 59, 59),
  //     })
  //   } else if (range === "yesterday") {
  //     const yesterday = new Date(new Date().getTime() - 24 * 60 * 60 * 1000)
  //     setFilterDateRange({
  //       startDate: new Date(yesterday.getFullYear(), yesterday.getMonth(), yesterday.getDate()),
  //       endDate: new Date(yesterday.getFullYear(), yesterday.getMonth(), yesterday.getDate(), 23, 59, 59),
  //     })
  //   } else {
  //     setFilterDateRange({
  //       startDate: null,
  //       endDate: null,
  //     })
  //   }
  }
  return (
    <div className="container mx-auto py-8">
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-primary text-primary-foreground rounded-lg p-4">
            <h3 className="text-lg font-bold mb-2">Total Orders</h3>
            <p className="text-4xl font-bold">{totalOrders}</p>
          </div>
          <div className="bg-accent text-accent-foreground rounded-lg p-4">
            <h3 className="text-lg font-bold mb-2">Total Returns</h3>
            <p className="text-4xl font-bold">{totalReturns}</p>
          </div>
          <div className="bg-success text-success-foreground rounded-lg p-4">
            <h3 className="text-lg font-bold mb-2">Total Fulfilled</h3>
            <p className="text-4xl font-bold">{totalFulfilled}</p>
          </div>
        </div>
        <div className="flex items-center justify-end mt-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="ml-auto shrink-0">
                <CalendarIcon className="w-4 h-4 mr-2" />
                {dateRange === "today" ? "Today" : dateRange === "yesterday" ? "Yesterday" : "Custom"}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[200px]" align="end">
              <DropdownMenuItem onSelect={() => handleDateRangeChange("today")}>Today</DropdownMenuItem>
              <DropdownMenuItem onSelect={() => handleDateRangeChange("yesterday")}>Yesterday</DropdownMenuItem>
              <DropdownMenuItem onSelect={() => handleDateRangeChange("custom")}>Custom</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="relative w-full max-w-md">
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search orders..."
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              className="pl-10 w-full"
            />
          </div>
          <Link href={'/dashboard/orders/new'}>
            <Button size="sm">Create Order</Button>
          </Link>
        </div>
        <div className="overflow-x-auto">
          <Table className="w-full">
            <TableHeader>
              <TableRow>
                <TableHead
                  onClick={() => handleSort("id")}
                  className="cursor-pointer bg-muted px-4 py-3 text-muted-foreground"
                >
                  Order ID{" "}
                  {sortColumn === "id" && <span className="ml-2">{sortDirection === "asc" ? "\u2191" : "\u2193"}</span>}
                </TableHead>
                <TableHead
                  onClick={() => handleSort("customerName")}
                  className="cursor-pointer bg-muted px-4 py-3 text-muted-foreground"
                >
                  Customer Name{" "}
                  {sortColumn === "customerName" && (
                    <span className="ml-2">{sortDirection === "asc" ? "\u2191" : "\u2193"}</span>
                  )}
                </TableHead>
                <TableHead
                  onClick={() => handleSort("orderDate")}
                  className="cursor-pointer bg-muted px-4 py-3 text-muted-foreground"
                >
                  Order Date{" "}
                  {sortColumn === "orderDate" && (
                    <span className="ml-2">{sortDirection === "asc" ? "\u2191" : "\u2193"}</span>
                  )}
                </TableHead>
                <TableHead
                  onClick={() => handleSort("totalAmount")}
                  className="cursor-pointer bg-muted px-4 py-3 text-muted-foreground"
                >
                  Total Amount{" "}
                  {sortColumn === "totalAmount" && (
                    <span className="ml-2">{sortDirection === "asc" ? "\u2191" : "\u2193"}</span>
                  )}
                </TableHead>
                <TableHead className="bg-muted px-4 py-3 text-muted-foreground">Status</TableHead>
                <TableHead className="bg-muted px-4 py-3 text-muted-foreground">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="px-4 py-3">{order.id}</TableCell>
                  <TableCell className="px-4 py-3">{order.customerName}</TableCell>
                  <TableCell className="px-4 py-3">{order.orderDate}</TableCell>
                  <TableCell className="px-4 py-3">${order.totalAmount.toFixed(2)}</TableCell>
                  <TableCell className="px-4 py-3">
                    <Badge
                      variant={
                        order.status === "Fulfilled" ? "default" : order.status === "Pending" ? "destructive" : "destructive"
                      }
                    >
                      {order.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        View
                      </Button>
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                      <Button variant="outline" size="sm">
                        Cancel
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}

function CalendarIcon(props:any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M8 2v4" />
      <path d="M16 2v4" />
      <rect width="18" height="18" x="3" y="4" rx="2" />
      <path d="M3 10h18" />
    </svg>
  )
}