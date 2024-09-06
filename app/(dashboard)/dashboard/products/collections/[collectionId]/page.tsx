"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"
import { Slider } from "@/components/ui/slider"
import { toast } from "@/components/ui/use-toast"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Loader2, ChevronLeft, Edit, Trash2, Plus, MoreHorizontal, Filter, Download, Upload, RefreshCw, AlertTriangle } from "lucide-react"
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    LineChart,
    Line,
} from "recharts"
import AdvancedLoader from "@/components/common/AdvancedLoader"

// Mock data for a single category
const categoryData = {
    id: 1,
    name: "Electronics",
    description: "All electronic devices and accessories",
    type: "manual",
    status: "active",
    itemCount: 1500,
    lastUpdated: "2023-06-15",
    createdBy: "John Doe",
    tags: ["tech", "gadgets", "appliances"],
    rules: "Products must be electronic devices or related accessories",
    progress: 75,
}

// Mock data for items in the category
const itemsData = [
    { id: 1, name: "Smartphone", sku: "ELEC001", price: 599.99, stock: 100, status: "in-stock" },
    { id: 2, name: "Laptop", sku: "ELEC002", price: 1299.99, stock: 50, status: "in-stock" },
    { id: 3, name: "Tablet", sku: "ELEC003", price: 399.99, stock: 75, status: "low-stock" },
    { id: 4, name: "Smartwatch", sku: "ELEC004", price: 249.99, stock: 200, status: "in-stock" },
    { id: 5, name: "Wireless Earbuds", sku: "ELEC005", price: 159.99, stock: 0, status: "out-of-stock" },
]

// Mock data for category analytics
const categoryAnalytics = {
    monthlySales: [
        { month: "Jan", sales: 1200 },
        { month: "Feb", sales: 1900 },
        { month: "Mar", sales: 1500 },
        { month: "Apr", sales: 1700 },
        { month: "May", sales: 2100 },
        { month: "Jun", sales: 2500 },
    ],
    topSellingItems: [
        { name: "Smartphone", sales: 500 },
        { name: "Laptop", sales: 300 },
        { name: "Tablet", sales: 200 },
        { name: "Smartwatch", sales: 150 },
        { name: "Wireless Earbuds", sales: 100 },
    ],
    stockDistribution: [
        { name: "In Stock", value: 3 },
        { name: "Low Stock", value: 1 },
        { name: "Out of Stock", value: 1 },
    ],
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8']

export default function CategoryDetails() {
    const [category, setCategory] = useState(categoryData)
    const [items, setItems] = useState(itemsData)
    const [isLoading, setIsLoading] = useState(true)
    const [editMode, setEditMode] = useState(false)
    const [newItemDialogOpen, setNewItemDialogOpen] = useState(false)
    const [newItem, setNewItem] = useState({ name: "", sku: "", price: 0, stock: 0 })
    const [selectedItems, setSelectedItems] = useState<number[]>([])
    const [searchTerm, setSearchTerm] = useState("")
    const [sortColumn, setSortColumn] = useState<string | null>(null)
    const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")
    const router = useRouter()

    useEffect(() => {
        // Simulating data fetching
        const timer = setTimeout(() => {
            setIsLoading(false)
        }, 1500)

        return () => clearTimeout(timer)
    }, [])

    const handleCategoryUpdate = () => {
        // In a real application, you would send an API request here
        setEditMode(false)
        toast({
            title: "Category Updated",
            description: "The category details have been successfully updated.",
        })
    }

    const handleAddItem = () => {
        // In a real application, you would send an API request here
        setItems([...items, { ...newItem, id: items.length + 1, status: "in-stock" }])
        setNewItem({ name: "", sku: "", price: 0, stock: 0 })
        setNewItemDialogOpen(false)
        toast({
            title: "Item Added",
            description: "The new item has been successfully added to the category.",
        })
    }

    const handleDeleteItems = () => {
        // In a real application, you would send an API request here
        setItems(items.filter(item => !selectedItems.includes(item.id)))
        setSelectedItems([])
        toast({
            title: "Items Deleted",
            description: `${selectedItems.length} items have been deleted from the category.`,
            variant: "destructive",
        })
    }

    const handleSort = (column: string) => {
        if (sortColumn === column) {
            setSortDirection(sortDirection === "asc" ? "desc" : "asc")
        } else {
            setSortColumn(column)
            setSortDirection("asc")
        }
    }

    const sortedItems = [...items].sort((a, b) => {
        if (!sortColumn) return 0
        const aValue = a[sortColumn as keyof typeof a]
        const bValue = b[sortColumn as keyof typeof b]
        if (aValue < bValue) return sortDirection === "asc" ? -1 : 1
        if (aValue > bValue) return sortDirection === "asc" ? 1 : -1
        return 0
    })

    const filteredItems = sortedItems.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.sku.toLowerCase().includes(searchTerm.toLowerCase())
    )

    if (isLoading) {
            return <AdvancedLoader/>
    }

    return (
        <div className="container mx-auto py-10">
            <div className="flex justify-between items-center mb-6">
                <div className="flex items-center space-x-4">
                    <Button variant="outline" size="icon" onClick={() => router.back()}>
                        <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <h1 className="text-3xl font-bold">Category Details: {category.name}</h1>
                </div>
                <div className="flex items-center space-x-2">
                    {!editMode && (
                        <Button variant="outline" onClick={() => setEditMode(true)}>
                            <Edit className="mr-2 h-4 w-4" /> Edit Category
                        </Button>
                    )}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline">
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem>
                                <Download className="mr-2 h-4 w-4" /> Export Category Data
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <AlertTriangle className="mr-2 h-4 w-4" /> Report Issue
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600">
                                <Trash2 className="mr-2 h-4 w-4" /> Delete Category
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>

            <Tabs defaultValue="details" className="space-y-4">
                <TabsList>
                    <TabsTrigger value="details">Details</TabsTrigger>
                    <TabsTrigger value="items">Items</TabsTrigger>
                    <TabsTrigger value="analytics">Analytics</TabsTrigger>
                </TabsList>

                <TabsContent value="details">
                    <Card>
                        <CardHeader>
                            <CardTitle>Category Information</CardTitle>
                            <CardDescription>View and edit category details</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Name</Label>
                                    <Input
                                        id="name"
                                        value={category.name}
                                        onChange={(e) => setCategory({ ...category, name: e.target.value })}
                                        disabled={!editMode}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="type">Type</Label>
                                    <Select
                                        value={category.type}
                                        onValueChange={(value) => setCategory({ ...category, type: value })}
                                        disabled={!editMode}
                                    >
                                        <SelectTrigger id="type">
                                            <SelectValue placeholder="Select type" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="manual">Manual</SelectItem>
                                            <SelectItem value="automation">Automation</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="status">Status</Label>
                                    <div className="flex items-center space-x-2">
                                        <Switch
                                            id="status"
                                            checked={category.status === "active"}
                                            onCheckedChange={(checked) => setCategory({ ...category, status: checked ? "active" : "inactive" })}
                                            disabled={!editMode}
                                        />
                                        <Label htmlFor="status">{category.status === "active" ? "Active" : "Inactive"}</Label>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="itemCount">Item Count</Label>
                                    <Input id="itemCount" value={category.itemCount} disabled />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="lastUpdated">Last Updated</Label>
                                    <Input id="lastUpdated" value={category.lastUpdated} disabled />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="createdBy">Created By</Label>
                                    <Input id="createdBy" value={category.createdBy} disabled />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="description">Description</Label>
                                <Textarea
                                    id="description"
                                    value={category.description}
                                    onChange={(e) => setCategory({ ...category, description: e.target.value })}
                                    disabled={!editMode}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="rules">Rules</Label>
                                <Textarea
                                    id="rules"
                                    value={category.rules}
                                    onChange={(e) => setCategory({ ...category, rules: e.target.value })}
                                    disabled={!editMode}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Tags</Label>
                                <div className="flex flex-wrap gap-2">
                                    {category.tags.map((tag, index) => (
                                        <Badge key={index} variant="secondary">
                                            {tag}
                                            {editMode && (
                                                <button
                                                    className="ml-1 text-xs"
                                                    onClick={() => setCategory({ ...category, tags: category.tags.filter((_, i) => i !== index) })}
                                                >
                                                    ×
                                                </button>
                                            )}
                                        </Badge>
                                    ))}
                                    {editMode && (
                                        <Input
                                            className="w-32"
                                            placeholder="Add tag"
                                            onKeyPress={(e) => {
                                                if (e.key === "Enter") {
                                                    const target = e.target as HTMLInputElement
                                                    setCategory({ ...category, tags: [...category.tags, target.value] })
                                                    target.value = ""
                                                }
                                            }}
                                        />
                                    )}
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label>Progress</Label>
                                <div className="flex items-center space-x-4">
                                    <Progress value={category.progress} className="w-full" />
                                    <span>{category.progress}%</span>
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter>
                            {editMode ? (
                                <div className="flex justify-end space-x-2 w-full">
                                    <Button variant="outline" onClick={() => setEditMode(false)}>Cancel</Button>
                                    <Button onClick={handleCategoryUpdate}>Save Changes</Button>
                                </div>
                            ) : null}
                        </CardFooter>
                    </Card>
                </TabsContent>

                <TabsContent value="items">
                    <Card>
                        <CardHeader>
                            <CardTitle>Category Items</CardTitle>
                            <CardDescription>Manage items in this category</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="flex justify-between items-center mb-4">
                                <div className="flex items-center space-x-2">
                                    <Input
                                        placeholder="Search items..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="w-64"
                                    />
                                    <Button variant="outline">
                                        <Filter className="mr-2 h-4 w-4" /> Filter
                                    </Button>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Button variant="outline" onClick={handleDeleteItems} disabled={selectedItems.length === 0}>
                                        <Trash2 className="mr-2 h-4 w-4" /> Delete Selected
                                    </Button>
                                    <Dialog open={newItemDialogOpen} onOpenChange={setNewItemDialogOpen}>
                                        <DialogTrigger asChild>
                                            <Button>
                                                <Plus className="mr-2 h-4 w-4" /> Add Item
                                            </Button>
                                        </DialogTrigger>
                                        <DialogContent>
                                            <DialogHeader>
                                                <DialogTitle>Add New Item</DialogTitle>
                                                <DialogDescription>
                                                    Enter the details of the new item to add to this category.
                                                </DialogDescription>
                                            </DialogHeader>
                                            <div className="grid gap-4 py-4">
                                                <div className="grid grid-cols-4 items-center gap-4">
                                                    <Label htmlFor="item-name" className="text-right">
                                                        Name
                                                    </Label>
                                                    <Input
                                                        id="item-name"
                                                        value={newItem.name}
                                                        onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                                                        className="col-span-3"
                                                    />
                                                </div>
                                                <div className="grid grid-cols-4 items-center gap-4">
                                                    <Label htmlFor="item-sku" className="text-right">
                                                        SKU
                                                    </Label>
                                                    <Input
                                                        id="item-sku"
                                                        value={newItem.sku}
                                                        onChange={(e) => setNewItem({ ...newItem, sku: e.target.value })}
                                                        className="col-span-3"
                                                    />
                                                </div>
                                                <div className="grid grid-cols-4 items-center gap-4">
                                                    <Label htmlFor="item-price" className="text-right">
                                                        Price
                                                    </Label>
                                                    <Input
                                                        id="item-price"
                                                        type="number"
                                                        value={newItem.price}
                                                        onChange={(e) => setNewItem({ ...newItem, price: parseFloat(e.target.value) })}
                                                        className="col-span-3"
                                                    />
                                                </div>
                                                <div className="grid grid-cols-4 items-center gap-4">
                                                    <Label htmlFor="item-stock" className="text-right">
                                                        Stock
                                                    </Label>
                                                    <Input
                                                        id="item-stock"
                                                        type="number"
                                                        value={newItem.stock}
                                                        onChange={(e) => setNewItem({ ...newItem, stock: parseInt(e.target.value) })}
                                                        className="col-span-3"
                                                    />
                                                </div>
                                            </div>
                                            <DialogFooter>
                                                <Button onClick={handleAddItem}>Add Item</Button>
                                            </DialogFooter>
                                        </DialogContent>
                                    </Dialog>
                                </div>
                            </div>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="w-[50px]">
                                            <Checkbox
                                                checked={selectedItems.length === filteredItems.length}
                                                onCheckedChange={(checked) => {
                                                    setSelectedItems(checked ? filteredItems.map(item => item.id) : [])
                                                }}
                                                aria-label="Select all items"
                                            />
                                        </TableHead>
                                        <TableHead className="cursor-pointer" onClick={() => handleSort("name")}>
                                            Name {sortColumn === "name" && (sortDirection === "asc" ? "▲" : "▼")}
                                        </TableHead>
                                        <TableHead className="cursor-pointer" onClick={() => handleSort("sku")}>
                                            SKU {sortColumn === "sku" && (sortDirection === "asc" ? "▲" : "▼")}
                                        </TableHead>
                                        <TableHead className="cursor-pointer text-right" onClick={() => handleSort("price")}>
                                            Price {sortColumn === "price" && (sortDirection === "asc" ? "▲" : "▼")}
                                        </TableHead>
                                        <TableHead className="cursor-pointer text-right" onClick={() => handleSort("stock")}>
                                            Stock {sortColumn === "stock" && (sortDirection === "asc" ? "▲" : "▼")}
                                        </TableHead>
                                        <TableHead className="cursor-pointer" onClick={() => handleSort("status")}>
                                            Status {sortColumn === "status" && (sortDirection === "asc" ? "▲" : "▼")}
                                        </TableHead>
                                        <TableHead className="text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {filteredItems.map((item) => (
                                        <TableRow key={item.id}>
                                            <TableCell>
                                                <Checkbox
                                                    checked={selectedItems.includes(item.id)}
                                                    onCheckedChange={(checked) => {
                                                        setSelectedItems(
                                                            checked
                                                                ? [...selectedItems, item.id]
                                                                : selectedItems.filter((id) => id !== item.id)
                                                        )
                                                    }}
                                                    aria-label={`Select ${item.name}`}
                                                />
                                            </TableCell>
                                            <TableCell className="font-medium">{item.name}</TableCell>
                                            <TableCell>{item.sku}</TableCell>
                                            <TableCell className="text-right">${item.price.toFixed(2)}</TableCell>
                                            <TableCell className="text-right">{item.stock}</TableCell>
                                            <TableCell>
                                                <Badge variant={item.status === "in-stock" ? "default" : item.status === "low-stock" ? "warning" : "destructive"}>
                                                    {item.status}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button variant="ghost" className="h-8 w-8 p-0">
                                                            <span className="sr-only">Open menu</span>
                                                            <MoreHorizontal className="h-4 w-4" />
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end">
                                                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                        <DropdownMenuItem>Edit Item</DropdownMenuItem>
                                                        <DropdownMenuItem>View Details</DropdownMenuItem>
                                                        <DropdownMenuSeparator />
                                                        <DropdownMenuItem className="text-red-600">Delete Item</DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="analytics">
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                        <Card className="col-span-4">
                            <CardHeader>
                                <CardTitle>Monthly Sales</CardTitle>
                            </CardHeader>
                            <CardContent className="pl-2">
                                <ResponsiveContainer width="100%" height={350}>
                                    <BarChart data={categoryAnalytics.monthlySales}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="month" />
                                        <YAxis />
                                        <Tooltip />
                                        <Bar dataKey="sales" fill="#8884d8" />
                                    </BarChart>
                                </ResponsiveContainer>
                            </CardContent>
                        </Card>
                        <Card className="col-span-3">
                            <CardHeader>
                                <CardTitle>Top Selling Items</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ResponsiveContainer width="100%" height={350}>
                                    <PieChart>
                                        <Pie
                                            data={categoryAnalytics.topSellingItems}
                                            cx="50%"
                                            cy="50%"
                                            labelLine={false}
                                            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                            outerRadius={80}
                                            fill="#8884d8"
                                            dataKey="sales"
                                        >
                                            {categoryAnalytics.topSellingItems.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                            ))}
                                        </Pie>
                                        <Tooltip />
                                    </PieChart>
                                </ResponsiveContainer>
                            </CardContent>
                        </Card>
                        <Card className="col-span-4">
                            <CardHeader>
                                <CardTitle>Stock Distribution</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ResponsiveContainer width="100%" height={350}>
                                    <PieChart>
                                        <Pie
                                            data={categoryAnalytics.stockDistribution}
                                            cx="50%"
                                            cy="50%"
                                            labelLine={false}
                                            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                            outerRadius={80}
                                            fill="#8884d8"
                                            dataKey="value"
                                        >
                                            {categoryAnalytics.stockDistribution.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                            ))}
                                        </Pie>
                                        <Tooltip />
                                    </PieChart>
                                </ResponsiveContainer>
                            </CardContent>
                        </Card>
                        <Card className="col-span-3">
                            <CardHeader>
                                <CardTitle>Quick Stats</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm font-medium">Total Revenue</span>
                                        <span className="text-2xl font-bold">$45,231</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm font-medium">Avg. Order Value</span>
                                        <span className="text-2xl font-bold">$275</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm font-medium">Items Sold</span>
                                        <span className="text-2xl font-bold">1,234</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm font-medium">Conversion Rate</span>
                                        <span className="text-2xl font-bold">3.2%</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    )
}