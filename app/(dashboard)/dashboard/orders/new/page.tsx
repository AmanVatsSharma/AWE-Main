'use client'

import { useState, useEffect } from "react"
import { useQuery, useMutation, gql } from "@apollo/client"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { toast } from "@/components/ui/use-toast"
import Link from "next/link"
import { Search, Plus, X, Trash, Mail, Phone, MessageSquare } from "lucide-react"
import { SEARCH_PRODUCTS } from '@/ApolloClient/productQueries'
import { SEARCH_CUSTOMERS, CREATE_CUSTOMER } from '@/ApolloClient/customerQueries'
import { CREATE_ORDER } from '@/ApolloClient/orderQueries'
import { Product } from "@prisma/client"
import { redirect, useRouter } from "next/navigation"
import CustomerDetailCard from "@/components/backend/CustomerDetailCard"

interface Customer {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  address?: {
    city: string;
    state: string;
    pincode: string;
  };
}

export default function EnhancedOrdersPage() {
  const router = useRouter();
  const [productSearchTerm, setProductSearchTerm] = useState("")
  const [customerSearchTerm, setCustomerSearchTerm] = useState("")
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null)
  const [orderItems, setOrderItems] = useState<Product[]>([])
  const [customItem, setCustomItem] = useState({ name: "", description: "", price: "", quantity: "" })
  const [shippingAddress, setShippingAddress] = useState()
  const [billingAddress, setBillingAddress] = useState()
  const [orderTags, setOrderTags] = useState([])
  const [orderNotes, setOrderNotes] = useState("")
  const [discount, setDiscount] = useState(0)
  const [shippingFees, setShippingFees] = useState(0)
  const [otherFees, setOtherFees] = useState(0)
  const [collectPaymentLater, setCollectPaymentLater] = useState(false)
  const [taxRate, setTaxRate] = useState(18)
  const [isEditingTax, setIsEditingTax] = useState(false)

  const { data: productData, loading: productLoading } = useQuery(SEARCH_PRODUCTS, {
    variables: { searchTerm: productSearchTerm },
    skip: !productSearchTerm,
  })

  const { data: customerData, loading: customerLoading, refetch: refetchCustomers } = useQuery(SEARCH_CUSTOMERS, {
    variables: { searchTerm: customerSearchTerm },
    skip: !customerSearchTerm,
  })

  // const { data: storeSettingsData } = useQuery(GET_STORE_SETTINGS)
  const { storeSettingsData } = true


  const [createCustomer] = useMutation(CREATE_CUSTOMER)
  const [createOrder] = useMutation(CREATE_ORDER)

  const taxIncludedInPrice = storeSettingsData?.storeSettings?.taxIncludedInPrice ?? true

  useEffect(() => {
    if (customerSearchTerm) {
      refetchCustomers({ searchTerm: customerSearchTerm })
    }
  }, [customerSearchTerm, refetchCustomers])

  const handleAddProduct = (product: Product) => {
    setOrderItems(prevItems => [...prevItems, { ...product, quantity: 1 }])
  }

  const handleAddCustomItem = () => {
    if (customItem.name && customItem.price && customItem.quantity) {
      setOrderItems(prevItems => [...prevItems, { ...customItem, id: `custom-${Date.now()}` } as Product])
      setCustomItem({ name: "", description: "", price: "", quantity: "" })
    }
  }

  const handleRemoveItem = (itemId: any) => {
    setOrderItems(orderItems.filter(item => item.id !== itemId))
  }

  const handleQuantityChange = (itemId: any, newQuantity: any) => {
    setOrderItems(orderItems.map((item: any) =>
      item.id === itemId ? { ...item, quantity: parseInt(newQuantity) } : item
    ))
  }

  const handleAddTag = (tag: any) => {
    if (tag && !orderTags.includes(tag)) {
      setOrderTags([...orderTags, tag])
    }
  }

  const handleRemoveTag = (tag: any) => {
    setOrderTags(orderTags.filter(t => t !== tag))
  }

  const handleCreateCustomer = async (newCustomer) => {
    try {
      const { data } = await createCustomer({ variables: { input: newCustomer } })
      setSelectedCustomer(data.createCustomer)
      toast({
        title: "Customer created",
        description: "New customer has been added successfully.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create new customer.",
        variant: "destructive",
      })
    }
  }

  const handleCreateOrder = async () => {
    if (!selectedCustomer || orderItems.length === 0) {
      toast({
        title: "Invalid Order",
        description: "Please select a customer and add items to the order.",
        variant: "destructive",
      })
      return
    }

    const orderInput = {
      customerId: parseInt(selectedCustomer.id),
      orderItems: orderItems.map(item => ({ productId: item.id, quantity: item.quantity })),
      tags: orderTags,
      notes: orderNotes,
      discount,
      shippingFees,
      otherFees,
      taxRate,
      collectPaymentLater,
      shippingAddress: {
        city: selectedCustomer?.address?.city,
        state: selectedCustomer?.address?.state,
        pincode: selectedCustomer?.address?.pincode
      },
      billingAddress: {
        city: selectedCustomer?.address?.city,
        state: selectedCustomer?.address?.state,
        pincode: selectedCustomer?.address?.pincode
      },
    }

    try {
      const { data } = await createOrder({ variables: orderInput });
      if (data && data.createOrder) {
        toast({
          title: "Order Created",
          description: `Order ID ${data.createOrder.id} has been created successfully.`,
        });
        router.push('/dashboard/orders/recent-orders')
      } else {
        throw new Error("Unexpected response format");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: `Failed to create the order: ${error.message}`,
        variant: "destructive",
      })
    }
  }

  const calculateSubtotal = () => {
    return orderItems.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  const calculateTax = () => {
    return (calculateSubtotal() - discount) * (taxRate / 100)
  }

  const calculateTotal = () => {
    const subtotal = calculateSubtotal()
    const tax = calculateTax()
    return subtotal - discount + shippingFees + otherFees + (taxIncludedInPrice ? 0 : tax)
  }

  const sendInvoice = (method: any) => {
    // Implement the logic to send invoice via the specified method
    toast({
      title: "Invoice Sent",
      description: `Invoice has been sent via ${method}.`,
    })
  }


  const handleCustomerSelect = (customer: any) => {
    setSelectedCustomer(customer);
    setCustomerSearchTerm(`${customer.firstName} ${customer.lastName}`);
  };

  const handleProductSelect = (product: any) => {
    handleAddProduct(product);
    setProductSearchTerm('');
  };

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <div className="flex flex-col gap-4 p-4 md:p-6">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/dashboard/orders">Orders</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>New Order</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Customer Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="relative">
                  <div className="flex items-center space-x-2 relative">
                    <Search className="text-muted-foreground absolute right-2" />
                    <Input
                      placeholder="Search customers..."
                      value={customerSearchTerm}
                      onChange={(e) => setCustomerSearchTerm(e.target.value)}
                      className="relative"
                    />
                  </div>
                  {customerLoading && <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg px-4 py-2" >
                    Loading customers...</div>}
                  {customerData?.searchCustomers && (
                    <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg">
                      {customerData.searchCustomers.edges.map(({ node }: any) => (
                        <div
                          key={node.id}
                          onClick={() => handleCustomerSelect(node)}
                          className="cursor-pointer px-4 py-2 hover:bg-gray-100 capitalize"
                        >
                          {node.firstName} {node.lastName}
                          <span className="text-muted-foreground text-sm pl-3 lowercase">{node.email}</span>
                        </div>

                      ))}

                    </div>
                  )}
                  {selectedCustomer &&
                    <CustomerDetailCard customer={selectedCustomer} />
                  }
                  {/* {selectedCustomer && (
                    <div className="mt-5 space-y-2 capitalize border rounded-lg p-5 border-gray-200">
                      <div className="text-blue-500 hover:underline cursor-pointer hover:text-blue-600">{selectedCustomer?.firstName} {selectedCustomer?.lastName}</div>
                      <div className="font-bold ">Contact information</div>
                      <div className="text-blue-500 hover:underline cursor-pointer hover:text-blue-600 text-sm lowercase">{selectedCustomer?.email}</div>
                      <div className="text-blue-500 hover:underline text-sm cursor-pointer hover:text-blue-600">{selectedCustomer?.phoneNumber}</div>
                      {selectedCustomer.address && (
                        (selectedCustomer.address.city === "" &&
                          selectedCustomer.address.state === "" &&
                          selectedCustomer.address.pincode === "") ? (
                          <div className="font-bold text-sm">No address found!</div>
                        ) : (
                          <div>
                            <strong>Address:</strong>
                            {selectedCustomer.address.city || "No city"},
                            {selectedCustomer.address.state || "No state"} -
                            {selectedCustomer.address.pincode || "No pincode"}
                          </div>
                        )
                      )}
                    </div>
                  )} */}
                </div>
                {/* {!selectedCustomer &&
                 } */}
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline">Add New Customer</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add New Customer</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={(e) => {
                      e.preventDefault()
                      const formData = new FormData(e.target)
                      const newCustomer = Object.fromEntries(formData)
                      handleCreateCustomer(newCustomer)
                    }}>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="name">Name</Label>
                          <Input id="name" name="name" required />
                        </div>
                        <div>
                          <Label htmlFor="email">Email</Label>
                          <Input id="email" name="email" type="email" required />
                        </div>
                        <div>
                          <Label htmlFor="phone">Phone</Label>
                          <Input id="phone" name="phone" required />
                        </div>
                        <div>
                          <Label htmlFor="address">Address</Label>
                          <Textarea id="address" name="address" required />
                        </div>
                        <Button type="submit">Create Customer</Button>
                      </div>
                    </form>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Product Selection</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 relative">
                <div className="flex items-center space-x-2 relative">
                  <Search className="text-muted-foreground absolute right-2" />
                  <Input
                    placeholder="Search products..."
                    value={productSearchTerm}
                    onChange={(e) => setProductSearchTerm(e.target.value)}
                  />
                </div>
                {productLoading && <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg px-4 py-2" >
                  Loading products...</div>}
                {productData?.searchProducts && (
                  <div className="space-y-2 relative">
                    {productData?.searchProducts && (
                      <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg">
                        {productData.searchProducts.edges.map(({ node }: any) => (

                          <div
                            key={node.id}
                            onClick={() => handleProductSelect(node)}
                            className="flex items-center gap-2 cursor-pointer px-4 py-2 hover:bg-gray-100"
                          >
                            <img src={node.imageUrl[0] ?? '/placeholder.svg'} alt={node.name} className="rounded-md w-16 mr-3" />
                            <div className="font-medium text-lg capitalize">{node.name}</div>
                            <div className="text-xs text-muted-foreground">${node.price}</div>
                          </div>

                        ))}

                      </div>
                    )}


                  </div>
                )}
                <div className="space-y-2">
                  <Label>Custom Item</Label>
                  <div className="flex space-x-2">
                    <Input
                      placeholder="Name"
                      value={customItem.name}
                      onChange={(e) => setCustomItem({ ...customItem, name: e.target.value })}
                    />
                    <Input
                      placeholder="Price"
                      type="number"
                      value={customItem.price}
                      onChange={(e) => setCustomItem({ ...customItem, price: e.target.value })}
                    />
                    <Input
                      placeholder="Quantity"
                      type="number"
                      value={customItem.quantity}
                      onChange={(e) => setCustomItem({ ...customItem, quantity: e.target.value })}
                    />
                    <Button onClick={handleAddCustomItem}><Plus className="mr-2 h-4 w-4" /> Add</Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Order Tags</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {orderTags.map((tag) => (
                    <div key={tag} className="flex items-center bg-muted rounded-full px-3 py-1">
                      <span>{tag}</span>
                      <Button variant="ghost" size="icon" onClick={() => handleRemoveTag(tag)}>
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  <Input
                    placeholder="Add a tag"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        handleAddTag(e.target.value)
                        e.target.value = ''
                      }
                    }}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Order Notes</CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="Add any additional notes here..."
                  value={orderNotes}
                  onChange={(e) => setOrderNotes(e.target.value)}
                />
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Order Details</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Product</TableHead>
                      <TableHead>Quantity</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Total</TableHead>
                      <TableHead></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {orderItems.map((item: any) => (
                      <TableRow key={item.id}>
                        <TableCell className="md:flex items-center capitalize gap-3">
                          {item.imageUrl &&
                            <img src={item.imageUrl[0] ?? '/placeholder.svg'} alt={item.name} className="rounded-md w-16" />
                          }
                          {item.name}
                        </TableCell>
                        <TableCell>
                          <Input
                            type="number"
                            value={item.quantity}
                            onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                            className="w-20"
                          />
                        </TableCell>
                        <TableCell>${item.price}</TableCell>
                        <TableCell>${(item.price * item.quantity).toFixed(2)}</TableCell>
                        <TableCell>
                          <Button variant="ghost" size="icon" onClick={() => handleRemoveItem(item.id)}>
                            <Trash className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Payment Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${calculateSubtotal().toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Discount</span>
                  <Input
                    type="number"
                    value={discount}
                    onChange={(e) => setDiscount(parseFloat(e.target.value) || 0)}
                    className="w-24 text-right"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <span>Shipping Fees</span>
                  <Input
                    type="number"
                    value={shippingFees}
                    onChange={(e) => setShippingFees(parseFloat(e.target.value) || 0)}
                    className="w-24 text-right"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <span>Other Fees</span>
                  <Input
                    type="number"
                    value={otherFees}
                    onChange={(e) => setOtherFees(parseFloat(e.target.value) || 0)}
                    className="w-24 text-right"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <span onClick={() => setIsEditingTax(true)} className="cursor-pointer">
                    Tax ({taxRate}%) {taxIncludedInPrice ? "(included)" : "(excluded)"}
                  </span>
                  {isEditingTax ? (
                    <Input
                      type="number"
                      value={taxRate}
                      onChange={(e) => setTaxRate(parseFloat(e.target.value) || 0)}
                      onBlur={() => setIsEditingTax(false)}
                      className="w-24 text-right"
                      autoFocus
                    />
                  ) : (
                    <span>${calculateTax().toFixed(2)}</span>
                  )}
                </div>
                <Separator />
                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span>${calculateTotal().toFixed(2)}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="collect-payment-later"
                    checked={collectPaymentLater}
                    onCheckedChange={(checked: boolean) => setCollectPaymentLater(checked)}
                  />
                  <Label htmlFor="collect-payment-later">Collect payment later</Label>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col space-y-2">
                <Button className="w-full" onClick={handleCreateOrder}>Create Order</Button>
                <div className="flex justify-between w-full">
                  <Button variant="outline" onClick={() => sendInvoice('email')}>
                    <Mail className="mr-2 h-4 w-4" />
                    Email Invoice
                  </Button>
                  <Button variant="outline" onClick={() => sendInvoice('sms')}>
                    <Phone className="mr-2 h-4 w-4" />
                    SMS Invoice
                  </Button>
                  <Button variant="outline" onClick={() => sendInvoice('whatsapp')}>
                    <MessageSquare className="mr-2 h-4 w-4" />
                    WhatsApp Invoice
                  </Button>
                </div>
              </CardFooter>
            </Card>

          </div>
        </div>
      </div>
    </div>
  )
}