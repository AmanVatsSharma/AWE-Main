"use client"

import React, { useState, useEffect } from "react"
import {
    Search, Filter, Plus, MoreHorizontal, ChevronDown, ChevronsUpDown,
    SunMedium, Moon, Download, Upload, BarChart2, AlertTriangle,
    Package2, AlertOctagon, DollarSign
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
    DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { Progress } from "@/components/ui/progress"

// Mock data for inventory items
const inventoryItems = [
    { id: 1, name: "BioJoints Pack of 1 - 60 Tabs", sku: "BJ-001", category: "Health", quantity: 5, available: 5, committed: 0, price: 29.99, status: "In Stock", lastUpdated: "2024-08-30" },
    { id: 2, name: "BioJoints Pack of 2 - 120 Tabs", sku: "BJ-002", category: "Health", quantity: 3, available: 3, committed: 0, price: 54.99, status: "Low Stock", lastUpdated: "2024-08-29" },
    { id: 3, name: "Selling Plans Ski Wax", sku: "SP-001", category: "Sports", quantity: 10, available: 10, committed: 0, price: 15.99, status: "In Stock", lastUpdated: "2024-08-28" },
    { id: 4, name: "Special Selling Plans Ski Wax", sku: "SP-002", category: "Sports", quantity: 8, available: 8, committed: 0, price: 19.99, status: "In Stock", lastUpdated: "2024-08-27" },
    { id: 5, name: "Sample Selling Plans Ski Wax", sku: "SP-003", category: "Sports", quantity: 15, available: 10, committed: 5, price: 9.99, status: "In Stock", lastUpdated: "2024-08-26" },
    { id: 6, name: "The Archived Snowboard", sku: "SB-001", category: "Sports", quantity: 2, available: 2, committed: 0, price: 299.99, status: "Low Stock", lastUpdated: "2024-08-25" },
    { id: 7, name: "The Collection Snowboard: Hydrogen", sku: "SB-002", category: "Sports", quantity: 0, available: 0, committed: 0, price: 349.99, status: "Out of Stock", lastUpdated: "2024-08-24" },
]

export default function AdvancedInventoryManagement() {
    const [searchTerm, setSearchTerm] = useState("")
    const [sortColumn, setSortColumn] = useState("name")
    const [sortDirection, setSortDirection] = useState("asc")
    const [currentPage, setCurrentPage] = useState(1)
    const [selectedItems, setSelectedItems] = useState([])
    const [filterCategory, setFilterCategory] = useState("all")
    const [filterStatus, setFilterStatus] = useState("all")
    const [isDarkMode, setIsDarkMode] = useState(false)
    const itemsPerPage = 10

    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add('dark')
        } else {
            document.documentElement.classList.remove('dark')
        }
    }, [isDarkMode])

    const filteredItems = inventoryItems.filter(
        (item) =>
            (item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.sku.toLowerCase().includes(searchTerm.toLowerCase())) &&
            (filterCategory === "all" || item.category === filterCategory) &&
            (filterStatus === "all" || item.status === filterStatus)
    )

    const sortedItems = [...filteredItems].sort((a, b) => {
        if (a[sortColumn] < b[sortColumn]) return sortDirection === "asc" ? -1 : 1
        if (a[sortColumn] > b[sortColumn]) return sortDirection === "asc" ? 1 : -1
        return 0
    })

    const totalPages = Math.ceil(sortedItems.length / itemsPerPage)
    const paginatedItems = sortedItems.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    )

    const handleSort = (column) => {
        if (column === sortColumn) {
            setSortDirection(sortDirection === "asc" ? "desc" : "asc")
        } else {
            setSortColumn(column)
            setSortDirection("asc")
        }
    }

    const handleSelectAll = (checked) => {
        if (checked) {
            setSelectedItems(paginatedItems.map(item => item.id))
        } else {
            setSelectedItems([])
        }
    }

    const handleSelectItem = (checked, itemId) => {
        if (checked) {
            setSelectedItems([...selectedItems, itemId])
        } else {
            setSelectedItems(selectedItems.filter(id => id !== itemId))
        }
    }

    const handleBulkAction = (action) => {
        console.log(`Bulk ${action} for items:`, selectedItems)
        // Implement bulk action logic here
    }

    return (
        <div className={`container mx-auto py-10 ${isDarkMode ? 'dark' : ''}`}>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Advanced Inventory Management</h1>
                <div className="flex items-center space-x-4">
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button variant="outline" size="icon" onClick={() => setIsDarkMode(!isDarkMode)}>
                                    {isDarkMode ? <SunMedium className="h-[1.2rem] w-[1.2rem]" /> : <Moon className="h-[1.2rem] w-[1.2rem]" />}
                                    <span className="sr-only">Toggle theme</span>
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Toggle dark mode</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                    <Button>
                        <Upload className="mr-2 h-4 w-4" /> Import
                    </Button>
                    <Button>
                        <Download className="mr-2 h-4 w-4" /> Export
                    </Button>
                </div>
            </div>

            <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                <div className="flex w-full md:w-auto items-center space-x-2">
                    <Input
                        placeholder="Search by name or SKU"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full md:w-[300px]"
                    />
                    <Button variant="outline" size="icon">
                        <Search className="h-4 w-4" />
                    </Button>
                </div>
                <div className="flex items-center space-x-2 w-full md:w-auto">
                    <Select value={filterCategory} onValueChange={setFilterCategory}>
                        <SelectTrigger className="w-full md:w-[180px]">
                            <SelectValue placeholder="Filter by category" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Categories</SelectItem>
                            <SelectItem value="Health">Health</SelectItem>
                            <SelectItem value="Sports">Sports</SelectItem>
                        </SelectContent>
                    </Select>
                    <Select value={filterStatus} onValueChange={setFilterStatus}>
                        <SelectTrigger className="w-full md:w-[180px]">
                            <SelectValue placeholder="Filter by status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Statuses</SelectItem>
                            <SelectItem value="In Stock">In Stock</SelectItem>
                            <SelectItem value="Low Stock">Low Stock</SelectItem>
                            <SelectItem value="Out of Stock">Out of Stock</SelectItem>
                        </SelectContent>
                    </Select>
                    <Button>
                        <Plus className="mr-2 h-4 w-4" /> Add Item
                    </Button>
                </div>
            </div>

            {selectedItems.length > 0 && (
                <div className="bg-muted p-2 rounded-md mb-4 flex justify-between items-center">
                    <span>{selectedItems.length} items selected</span>
                    <div className="space-x-2">
                        <Button variant="outline" size="sm" onClick={() => handleBulkAction('update')}>Update</Button>
                        <Button variant="outline" size="sm" onClick={() => handleBulkAction('delete')}>Delete</Button>
                    </div>
                </div>
            )}

            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[50px]">
                                <Checkbox
                                    checked={selectedItems.length === paginatedItems.length}
                                    onCheckedChange={handleSelectAll}
                                />
                            </TableHead>
                            <TableHead className="w-[100px]">SKU</TableHead>
                            <TableHead onClick={() => handleSort("name")} className="cursor-pointer">
                                Name {sortColumn === "name" && (sortDirection === "asc" ? <ChevronDown className="inline-block w-4 h-4" /> : <ChevronsUpDown className="inline-block w-4 h-4" />)}
                            </TableHead>
                            <TableHead>Category</TableHead>
                            <TableHead onClick={() => handleSort("quantity")} className="cursor-pointer text-right">
                                Quantity {sortColumn === "quantity" && (sortDirection === "asc" ? <ChevronDown className="inline-block w-4 h-4" /> : <ChevronsUpDown className="inline-block w-4 h-4" />)}
                            </TableHead>
                            <TableHead className="text-right">Available</TableHead>
                            <TableHead className="text-right">Committed</TableHead>
                            <TableHead onClick={() => handleSort("price")} className="cursor-pointer text-right">
                                Price {sortColumn === "price" && (sortDirection === "asc" ? <ChevronDown className="inline-block w-4 h-4" /> : <ChevronsUpDown className="inline-block w-4 h-4" />)}
                            </TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {paginatedItems.map((item) => (
                            <TableRow key={item.id}>
                                <TableCell>
                                    <Checkbox
                                        checked={selectedItems.includes(item.id)}
                                        onCheckedChange={(checked) => handleSelectItem(checked, item.id)}
                                    />
                                </TableCell>
                                <TableCell className="font-medium">{item.sku}</TableCell>
                                <TableCell>{item.name}</TableCell>
                                <TableCell>{item.category}</TableCell>
                                <TableCell className="text-right">{item.quantity}</TableCell>
                                <TableCell className="text-right">{item.available}</TableCell>
                                <TableCell className="text-right">{item.committed}</TableCell>
                                <TableCell className="text-right">${item.price.toFixed(2)}</TableCell>
                                <TableCell>
                                    <Badge variant={
                                        item.status === "In Stock" ? "default" :
                                            item.status === "Low Stock" ? "warning" : "destructive"
                                    }>
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
                                            <DropdownMenuItem>Edit</DropdownMenuItem>
                                            <DropdownMenuItem>View Details</DropdownMenuItem>
                                            <DropdownMenuItem>Update Stock</DropdownMenuItem>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            <div className="flex items-center justify-between space-x-2 py-4">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                >
                    Previous
                </Button>
                <div className="text-sm text-muted-foreground">
                    Page {currentPage} of {totalPages}
                </div>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                >
                    Next
                </Button>
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card title="Total Items" value={inventoryItems.length} icon={<Package2 className="h-4 w-4" />} />
                <Card title="Low Stock Items" value={inventoryItems.filter(item => item.status === "Low Stock").length} icon={<AlertTriangle className="h-4 w-4" />} />
                <Card title="Out of Stock Items" value={inventoryItems.filter(item => item.status === "Out of Stock").length} icon={<AlertOctagon className="h-4 w-4" />} />
                <Card title="Total Value" value={`$${inventoryItems.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2)}`} icon={<DollarSign className="h-4 w-4" />} />
            </div>

            <div className="mt-8">
                <h2 className="text-xl font-semibold mb-4">Inventory Trends</h2>
                <div className="h-[200px] bg-muted rounded-lg flex items-center justify-center">
                    <BarChart2 className="h-16 w-16 text-muted-foreground" />
                    <span className="ml-2 text-muted-foreground">Chart placeholder</span>
                </div>
            </div>
        </div>
    )
}

function Card({ title, value, icon }) {
    return (
        <div className="bg-card text-card-foreground rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium">{title}</h3>
                {icon}
            </div>
            <p className="text-2xl font-bold mt-2">{value}</p>
        </div>
    )
}