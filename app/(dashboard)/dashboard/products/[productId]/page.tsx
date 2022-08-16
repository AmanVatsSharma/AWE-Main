// import React from 'react'
// import Image from "next/image"
// import Link from "next/link"
// import {
//   ChevronLeft,
//   Home,
//   LineChart,
//   Package,
//   Package2,
//   PanelLeft,
//   PlusCircle,
//   Search,
//   Settings,
//   ShoppingCart,
//   Upload,
//   Users2,
// } from "lucide-react"

// import { Badge } from "@/components/ui/badge"
// import {
//   Breadcrumb,
//   BreadcrumbItem,
//   BreadcrumbLink,
//   BreadcrumbList,
//   BreadcrumbPage,
//   BreadcrumbSeparator,
// } from "@/components/ui/breadcrumb"
// import { Button } from "@/components/ui/button"
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card"
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select"
// import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table"
// import { Textarea } from "@/components/ui/textarea"
// import {
//   ToggleGroup,
//   ToggleGroupItem,
// } from "@/components/ui/toggle-group"

// type Props = {}

// const ProductIdPage = (props: Props) => {
//   return (
//     <div className="flex min-h-screen w-full flex-col bg-muted/40">
//       <div className="flex flex-col sm:gap-4 sm:py-4">
//         <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
//           <Sheet>
//             <SheetTrigger asChild>
//               <Button size="icon" variant="outline" className="sm:hidden">
//                 <PanelLeft className="h-5 w-5" />
//                 <span className="sr-only">Toggle Menu</span>
//               </Button>
//             </SheetTrigger>
//             <SheetContent side="left" className="sm:max-w-xs">
//               <nav className="grid gap-6 text-lg font-medium">
//                 <Link
//                   href="#"
//                   className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
//                 >
//                   <Package2 className="h-5 w-5 transition-all group-hover:scale-110" />
//                   <span className="sr-only">Acme Inc</span>
//                 </Link>
//                 <Link
//                   href="#"
//                   className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
//                 >
//                   <Home className="h-5 w-5" />
//                   Dashboard
//                 </Link>
//                 <Link
//                   href="#"
//                   className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
//                 >
//                   <ShoppingCart className="h-5 w-5" />
//                   Orders
//                 </Link>
//                 <Link
//                   href="#"
//                   className="flex items-center gap-4 px-2.5 text-foreground"
//                 >
//                   <Package className="h-5 w-5" />
//                   Products
//                 </Link>
//                 <Link
//                   href="#"
//                   className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
//                 >
//                   <Users2 className="h-5 w-5" />
//                   Customers
//                 </Link>
//                 <Link
//                   href="#"
//                   className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
//                 >
//                   <LineChart className="h-5 w-5" />
//                   Settings
//                 </Link>
//               </nav>
//             </SheetContent>
//           </Sheet>
//           <Breadcrumb className="hidden md:flex">
//             <BreadcrumbList>
//               <BreadcrumbItem>
//                 <BreadcrumbLink asChild>
//                   <Link href="#">Dashboard</Link>
//                 </BreadcrumbLink>
//               </BreadcrumbItem>
//               <BreadcrumbSeparator />
//               <BreadcrumbItem>
//                 <BreadcrumbLink asChild>
//                   <Link href="#">Products</Link>
//                 </BreadcrumbLink>
//               </BreadcrumbItem>
//               <BreadcrumbSeparator />
//               <BreadcrumbItem>
//                 <BreadcrumbPage>Edit Product</BreadcrumbPage>
//               </BreadcrumbItem>
//             </BreadcrumbList>
//           </Breadcrumb>
//           <div className="relative ml-auto flex-1 md:grow-0">
//             <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
//             <Input
//               type="search"
//               placeholder="Search..."
//               className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[320px]"
//             />
//           </div>
//           <DropdownMenu>
//             <DropdownMenuTrigger asChild>
//               <Button
//                 variant="outline"
//                 size="icon"
//                 className="overflow-hidden rounded-full"
//               >
//                 <Image
//                   src="/placeholder-user.jpg"
//                   width={36}
//                   height={36}
//                   alt="Avatar"
//                   className="overflow-hidden rounded-full"
//                 />
//               </Button>
//             </DropdownMenuTrigger>
//             <DropdownMenuContent align="end">
//               <DropdownMenuLabel>My Account</DropdownMenuLabel>
//               <DropdownMenuSeparator />
//               <DropdownMenuItem>Settings</DropdownMenuItem>
//               <DropdownMenuItem>Support</DropdownMenuItem>
//               <DropdownMenuSeparator />
//               <DropdownMenuItem>Logout</DropdownMenuItem>
//             </DropdownMenuContent>
//           </DropdownMenu>
//         </header>
//         <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
//           <div className="mx-auto grid max-w-[59rem] flex-1 auto-rows-max gap-4">
//             <div className="flex items-center gap-4">
//               <Button variant="outline" size="icon" className="h-7 w-7">
//                 <ChevronLeft className="h-4 w-4" />
//                 <span className="sr-only">Back</span>
//               </Button>
//               <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
//                 Pro Controller
//               </h1>
//               <Badge variant="outline" className="ml-auto sm:ml-0">
//                 In stock
//               </Badge>
//               <div className="hidden items-center gap-2 md:ml-auto md:flex">
//                 <Button variant="outline" size="sm">
//                   Discard
//                 </Button>
//                 <Button size="sm">Save Product</Button>
//               </div>
//             </div>
//             <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
//               <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
//                 <Card x-chunk="dashboard-07-chunk-0">
//                   <CardHeader>
//                     <CardTitle>Product Details</CardTitle>
//                     <CardDescription>
//                       Lipsum dolor sit amet, consectetur adipiscing elit
//                     </CardDescription>
//                   </CardHeader>
//                   <CardContent>
//                     <div className="grid gap-6">
//                       <div className="grid gap-3">
//                         <Label htmlFor="name">Name</Label>
//                         <Input
//                           id="name"
//                           type="text"
//                           className="w-full"
//                           defaultValue="Gamer Gear Pro Controller"
//                         />
//                       </div>
//                       <div className="grid gap-3">
//                         <Label htmlFor="description">Description</Label>
//                         <Textarea
//                           id="description"
//                           defaultValue="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl nec ultricies ultricies, nunc nisl ultricies nunc, nec ultricies nunc nisl nec nunc."
//                           className="min-h-32"
//                         />
//                       </div>
//                     </div>
//                   </CardContent>
//                 </Card>
//                 <Card x-chunk="dashboard-07-chunk-1">
//                   <CardHeader>
//                     <CardTitle>Stock</CardTitle>
//                     <CardDescription>
//                       Lipsum dolor sit amet, consectetur adipiscing elit
//                     </CardDescription>
//                   </CardHeader>
//                   <CardContent>
//                     <Table>
//                       <TableHeader>
//                         <TableRow>
//                           <TableHead className="w-[100px]">SKU</TableHead>
//                           <TableHead>Stock</TableHead>
//                           <TableHead>Price</TableHead>
//                           <TableHead className="w-[100px]">Size</TableHead>
//                         </TableRow>
//                       </TableHeader>
//                       <TableBody>
//                         <TableRow>
//                           <TableCell className="font-semibold">
//                             GGPC-001
//                           </TableCell>
//                           <TableCell>
//                             <Label htmlFor="stock-1" className="sr-only">
//                               Stock
//                             </Label>
//                             <Input
//                               id="stock-1"
//                               type="number"
//                               defaultValue="100"
//                             />
//                           </TableCell>
//                           <TableCell>
//                             <Label htmlFor="price-1" className="sr-only">
//                               Price
//                             </Label>
//                             <Input
//                               id="price-1"
//                               type="number"
//                               defaultValue="99.99"
//                             />
//                           </TableCell>
//                           <TableCell>
//                             <ToggleGroup
//                               type="single"
//                               defaultValue="s"
//                               variant="outline"
//                             >
//                               <ToggleGroupItem value="s">S</ToggleGroupItem>
//                               <ToggleGroupItem value="m">M</ToggleGroupItem>
//                               <ToggleGroupItem value="l">L</ToggleGroupItem>
//                             </ToggleGroup>
//                           </TableCell>
//                         </TableRow>
//                         <TableRow>
//                           <TableCell className="font-semibold">
//                             GGPC-002
//                           </TableCell>
//                           <TableCell>
//                             <Label htmlFor="stock-2" className="sr-only">
//                               Stock
//                             </Label>
//                             <Input
//                               id="stock-2"
//                               type="number"
//                               defaultValue="143"
//                             />
//                           </TableCell>
//                           <TableCell>
//                             <Label htmlFor="price-2" className="sr-only">
//                               Price
//                             </Label>
//                             <Input
//                               id="price-2"
//                               type="number"
//                               defaultValue="99.99"
//                             />
//                           </TableCell>
//                           <TableCell>
//                             <ToggleGroup
//                               type="single"
//                               defaultValue="m"
//                               variant="outline"
//                             >
//                               <ToggleGroupItem value="s">S</ToggleGroupItem>
//                               <ToggleGroupItem value="m">M</ToggleGroupItem>
//                               <ToggleGroupItem value="l">L</ToggleGroupItem>
//                             </ToggleGroup>
//                           </TableCell>
//                         </TableRow>
//                         <TableRow>
//                           <TableCell className="font-semibold">
//                             GGPC-003
//                           </TableCell>
//                           <TableCell>
//                             <Label htmlFor="stock-3" className="sr-only">
//                               Stock
//                             </Label>
//                             <Input
//                               id="stock-3"
//                               type="number"
//                               defaultValue="32"
//                             />
//                           </TableCell>
//                           <TableCell>
//                             <Label htmlFor="price-3" className="sr-only">
//                               Stock
//                             </Label>
//                             <Input
//                               id="price-3"
//                               type="number"
//                               defaultValue="99.99"
//                             />
//                           </TableCell>
//                           <TableCell>
//                             <ToggleGroup
//                               type="single"
//                               defaultValue="s"
//                               variant="outline"
//                             >
//                               <ToggleGroupItem value="s">S</ToggleGroupItem>
//                               <ToggleGroupItem value="m">M</ToggleGroupItem>
//                               <ToggleGroupItem value="l">L</ToggleGroupItem>
//                             </ToggleGroup>
//                           </TableCell>
//                         </TableRow>
//                       </TableBody>
//                     </Table>
//                   </CardContent>
//                   <CardFooter className="justify-center border-t p-4">
//                     <Button size="sm" variant="ghost" className="gap-1">
//                       <PlusCircle className="h-3.5 w-3.5" />
//                       Add Variant
//                     </Button>
//                   </CardFooter>
//                 </Card>
//                 <Card x-chunk="dashboard-07-chunk-2">
//                   <CardHeader>
//                     <CardTitle>Product Category</CardTitle>
//                   </CardHeader>
//                   <CardContent>
//                     <div className="grid gap-6 sm:grid-cols-3">
//                       <div className="grid gap-3">
//                         <Label htmlFor="category">Category</Label>
//                         <Select>
//                           <SelectTrigger
//                             id="category"
//                             aria-label="Select category"
//                           >
//                             <SelectValue placeholder="Select category" />
//                           </SelectTrigger>
//                           <SelectContent>
//                             <SelectItem value="clothing">Clothing</SelectItem>
//                             <SelectItem value="electronics">
//                               Electronics
//                             </SelectItem>
//                             <SelectItem value="accessories">
//                               Accessories
//                             </SelectItem>
//                           </SelectContent>
//                         </Select>
//                       </div>
//                       <div className="grid gap-3">
//                         <Label htmlFor="subcategory">
//                           Subcategory (optional)
//                         </Label>
//                         <Select>
//                           <SelectTrigger
//                             id="subcategory"
//                             aria-label="Select subcategory"
//                           >
//                             <SelectValue placeholder="Select subcategory" />
//                           </SelectTrigger>
//                           <SelectContent>
//                             <SelectItem value="t-shirts">T-Shirts</SelectItem>
//                             <SelectItem value="hoodies">Hoodies</SelectItem>
//                             <SelectItem value="sweatshirts">
//                               Sweatshirts
//                             </SelectItem>
//                           </SelectContent>
//                         </Select>
//                       </div>
//                     </div>
//                   </CardContent>
//                 </Card>
//               </div>
//               <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
//                 <Card x-chunk="dashboard-07-chunk-3">
//                   <CardHeader>
//                     <CardTitle>Product Status</CardTitle>
//                   </CardHeader>
//                   <CardContent>
//                     <div className="grid gap-6">
//                       <div className="grid gap-3">
//                         <Label htmlFor="status">Status</Label>
//                         <Select>
//                           <SelectTrigger id="status" aria-label="Select status">
//                             <SelectValue placeholder="Select status" />
//                           </SelectTrigger>
//                           <SelectContent>
//                             <SelectItem value="draft">Draft</SelectItem>
//                             <SelectItem value="published">Active</SelectItem>
//                             <SelectItem value="archived">Archived</SelectItem>
//                           </SelectContent>
//                         </Select>
//                       </div>
//                     </div>
//                   </CardContent>
//                 </Card>
//                 <Card
//                   className="overflow-hidden" x-chunk="dashboard-07-chunk-4"
//                 >
//                   <CardHeader>
//                     <CardTitle>Product Images</CardTitle>
//                     <CardDescription>
//                       Lipsum dolor sit amet, consectetur adipiscing elit
//                     </CardDescription>
//                   </CardHeader>
//                   <CardContent>
//                     <div className="grid gap-2">
//                       <Image
//                         alt="Product image"
//                         className="aspect-square w-full rounded-md object-cover"
//                         height="300"
//                         src="/placeholder.svg"
//                         width="300"
//                       />
//                       <div className="grid grid-cols-3 gap-2">
//                         <button>
//                           <Image
//                             alt="Product image"
//                             className="aspect-square w-full rounded-md object-cover"
//                             height="84"
//                             src="/placeholder.svg"
//                             width="84"
//                           />
//                         </button>
//                         <button>
//                           <Image
//                             alt="Product image"
//                             className="aspect-square w-full rounded-md object-cover"
//                             height="84"
//                             src="/placeholder.svg"
//                             width="84"
//                           />
//                         </button>
//                         <button className="flex aspect-square w-full items-center justify-center rounded-md border border-dashed">
//                           <Upload className="h-4 w-4 text-muted-foreground" />
//                           <span className="sr-only">Upload</span>
//                         </button>
//                       </div>
//                     </div>
//                   </CardContent>
//                 </Card>
//                 <Card x-chunk="dashboard-07-chunk-5">
//                   <CardHeader>
//                     <CardTitle>Archive Product</CardTitle>
//                     <CardDescription>
//                       Lipsum dolor sit amet, consectetur adipiscing elit.
//                     </CardDescription>
//                   </CardHeader>
//                   <CardContent>
//                     <div></div>
//                     <Button size="sm" variant="secondary">
//                       Archive Product
//                     </Button>
//                   </CardContent>
//                 </Card>
//               </div>
//             </div>
//             <div className="flex items-center justify-center gap-2 md:hidden">
//               <Button variant="outline" size="sm">
//                 Discard
//               </Button>
//               <Button size="sm">Save Product</Button>
//             </div>
//           </div>
//         </main>
//       </div>
//     </div>
//   )
// }

// export default ProductIdPage



'use client'

import { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { ChevronLeft, ChevronRight, Copy, MoreHorizontal, PenSquare, Plus, Send, TrendingUp, DollarSign, Package, ShoppingCart, BarChart2, Tag } from "lucide-react"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb'
import Link from 'next/link'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useQuery } from '@apollo/client'
import { GET_PRODUCT } from '@/ApolloClient/productQueries'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import AdvancedLoader from '@/components/common/AdvancedLoader'

// Sample product data
const sampleProductData = {
  id: "prod-123",
  name: "Premium Wireless Headphones",
  sku: "WH-PRO-001",
  description: "High-quality wireless headphones with noise cancellation and long battery life.",
  price: 199.99,
  cost: 89.99,
  category: {
    name: "Electronics",
  },
  tags: [
    { name: "wireless", },
    { name: "audio", },
    { name: "premium" }
  ],
  inventory: {
    inStock: 250,
    reserved: 10,
    reorderPoint: 50
  },
  supplier: {
    name: "TechAudio Inc.",
    leadTime: "2 weeks"
  },
  variants: [
    { id: "var-1", name: "Black", sku: "WH-PRO-001-BLK", stock: 100 },
    { id: "var-2", name: "White", sku: "WH-PRO-001-WHT", stock: 75 },
    { id: "var-3", name: "Rose Gold", sku: "WH-PRO-001-RSG", stock: 75 }
  ],
  salesData: [
    { month: 'Jan', sales: 45, revenue: 8999.55 },
    { month: 'Feb', sales: 52, revenue: 10399.48 },
    { month: 'Mar', sales: 61, revenue: 12199.39 },
    { month: 'Apr', sales: 58, revenue: 11599.42 },
    { month: 'May', sales: 63, revenue: 12599.37 },
    { month: 'Jun', sales: 72, revenue: 14399.28 },
  ],
  reviews: [
    { id: 1, rating: 5, comment: "Excellent sound quality and comfort!", date: "2023-06-15" },
    { id: 2, rating: 4, comment: "Great headphones, but battery life could be better.", date: "2023-06-10" },
    { id: 3, rating: 5, comment: "Best headphones I've ever owned!", date: "2023-06-05" },
  ]
}

export default function Component() {
  const [product, setProduct] = useState(sampleProductData)
  const [newTag, setNewTag] = useState("")
  const params = useParams()
  const productId = Array.isArray(params?.productId) ? parseInt(params.productId[0]) : parseInt(params?.productId);

  const { loading, error, data } = useQuery(GET_PRODUCT, {
    variables: { id: productId },
  });

  const addTag = () => {
    if (newTag.trim() && !product.tags.includes(newTag.trim())) {
      setProduct({
        ...product,
        tags: [...product.tags, newTag.trim()]
      })
      setNewTag("")
    }
  }

  useEffect(() => {
    if (data) { setProduct(data.product) }
  }, [data])

  if (loading)
    return <AdvancedLoader/>

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <div className="flex flex-col gap-4 p-4 sm:p-8 md:p-12">
        <header className="sticky top-0 z-30 flex justify-between h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-0">
          <Breadcrumb className="hidden md:flex">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="#">Dashboard</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="#">Products</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Product Details</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
          <div>
            <h1 className="text-2xl font-bold capitalize">{product.name}</h1>
            <p className="text-sm text-muted-foreground">SKU: {product.sku ?? "no sku found"} • Category: {product?.category?.name ?? "no category found"}</p>
          </div>
          <div className="flex items-center space-x-2">
            <Button>
              <PenSquare className="h-4 w-4 mr-2" />
              Edit Product
            </Button>
            <Button variant="outline" size="icon">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-2 md:grid-cols-5">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="inventory">Inventory</TabsTrigger>
                <TabsTrigger value="sales">Sales</TabsTrigger>
                <TabsTrigger value="variants">Variants</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
              </TabsList>
              <TabsContent value="overview">
                <Card>
                  <CardHeader>
                    <CardTitle>Product Overview</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <h3 className="font-semibold mb-2">Description</h3>
                        <p>{product.description}</p>
                      </div>
                      <div>
                        <h3 className="font-semibold mb-2">Pricing</h3>
                        <p>Retail Price: ${product.price.toFixed(2)}</p>
                        <p>Cost: ${product?.cost ? product.cost.toFixed(2) : ""}</p>
                        <p>Profit Margin: {((product.price - product.cost) / product.price * 100).toFixed(2)}%</p>
                      </div>
                    </div>
                    <div>
                      {product.imageUrl && (
                        <>
                          <h3 className="font-semibold my-5">Images</h3>
                          <div className="flex gap-5">

                          {product.imageUrl.map((url, index) => (
                            <Image
                              key={index}
                              src={url}
                              width={100}
                              height={100}
                              alt={`Product image ${index + 1}`}
                            />
                          ))}
                          </div>

                        </>
                      )}
                    </div>

                  </CardContent>
                </Card>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Total Stock</CardTitle>
                      <Package className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{product?.stockQuantity ?? "no Inventory"}</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Total Sales</CardTitle>
                      <ShoppingCart className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{product.salesData && product.salesData.reduce((sum, data) => sum + data.sales, 0)}</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Revenue</CardTitle>
                      <DollarSign className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">
                        ${product.salesData && product.salesData.reduce((sum, data) => sum + data.revenue, 0).toFixed(2)}
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Avg. Rating</CardTitle>
                      <TrendingUp className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">
                        {product.reviews && (product.reviews.reduce((sum, review) => sum + review.rating, 0) / product.reviews.length).toFixed(1)}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              <TabsContent value="inventory">
                <Card>
                  <CardHeader>
                    <CardTitle>Inventory Management</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-semibold mb-2">Current Stock</h3>
                        <p>In Stock: {product?.inventory?.inStock}</p>
                        <p>Reserved: {product?.inventory?.reserved}</p>
                        <p>Available: {product?.inventory && (product.inventory.inStock - product.inventory.reserved)}</p>
                      </div>
                      <div>
                        <h3 className="font-semibold mb-2">Reorder Information</h3>
                        <p>Reorder Point: {product?.inventory?.reorderPoint}</p>
                        <p>Supplier: {product?.supplier?.name}</p>
                        <p>Lead Time: {product?.supplier?.leadTime}</p>
                      </div>
                      <Button>Update Inventory</Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="sales">
                <Card>
                  <CardHeader>
                    <CardTitle>Sales Analytics</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={product?.salesData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis yAxisId="left" />
                        <YAxis yAxisId="right" orientation="right" />
                        <Tooltip />
                        <Line yAxisId="left" type="monotone" dataKey="sales" stroke="#8884d8" />
                        <Line yAxisId="right" type="monotone" dataKey="revenue" stroke="#82ca9d" />
                      </LineChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="variants">
                <Card>
                  <CardHeader>
                    <CardTitle>Product Variants</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Variant</TableHead>
                          <TableHead>SKU</TableHead>
                          <TableHead>Stock</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {product.variants ? product.variants.map((variant) => (
                          <TableRow key={variant.id}>
                            <TableCell>{variant.name ?? ""}</TableCell>
                            <TableCell>{variant.sku ?? ""}</TableCell>
                            <TableCell>{variant.stock ?? ""}</TableCell>
                          </TableRow>
                        )) : "No varients for this product"}
                      </TableBody>
                    </Table>
                    <Button className="mt-4">Add Variant</Button>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="reviews">
                <Card>
                  <CardHeader>
                    <CardTitle>Customer Reviews</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {product.reviews ? product.reviews.map((review) => (
                        <div key={review.id} className="bg-muted p-3 rounded-md">
                          <div className="flex justify-between items-center mb-2">
                            <div className="font-semibold">Rating: {review.rating}/5</div>
                            <div className="text-sm text-muted-foreground">{review.date}</div>
                          </div>
                          <p>{review.comment}</p>
                        </div>
                      )) : "no reveiws found"}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Button className="w-full justify-start">
                    <Package className="h-4 w-4 mr-2" />
                    Update Inventory
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <BarChart2 className="h-4 w-4 mr-2" />
                    View Full Analytics
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <Copy className="h-4 w-4 mr-2" />
                    Duplicate Product
                  </Button>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Tags</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 mb-4">
                  {product.tags && product.tags.map(({ name }, index) => (
                    <Badge key={index} variant="secondary">{name}</Badge>
                  ))}
                </div>
                <div className="flex space-x-2">
                  <Input
                    placeholder="Add a tag..."
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                  />
                  <Button onClick={addTag}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add
                  </Button>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Related Products</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex justify-between items-center">
                    <span>Wireless Earbuds</span>
                    <span>$89.99</span>
                  </li>
                  <li className="flex justify-between items-center">
                    <span>Bluetooth Speaker</span>
                    <span>$129.99</span>
                  </li>
                  <li className="flex justify-between items-center">
                    <span>Noise-Canceling Headphones</span>
                    <span>$249.99</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}