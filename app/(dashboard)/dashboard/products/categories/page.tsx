"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { Slider } from "@/components/ui/slider"
import { Progress } from "@/components/ui/progress"
import { toast } from "@/components/ui/use-toast"
import { AlertCircle, ChevronDown, Edit, MoreHorizontal, Plus, Trash2, Upload, Download, RefreshCw, Filter } from "lucide-react"

// Mock data for categories
const initialCategories = [
    { id: 1, name: "Electronics", type: "manual", itemCount: 150, status: "active", lastUpdated: "2023-04-01", progress: 75 },
    { id: 2, name: "Clothing", type: "manual", itemCount: 300, status: "active", lastUpdated: "2023-04-05", progress: 90 },
    { id: 3, name: "Books", type: "automation", itemCount: 500, status: "active", lastUpdated: "2023-04-10", progress: 60 },
    { id: 4, name: "Home & Garden", type: "manual", itemCount: 200, status: "inactive", lastUpdated: "2023-04-15", progress: 40 },
    { id: 5, name: "Toys", type: "automation", itemCount: 100, status: "active", lastUpdated: "2023-04-20", progress: 80 },
]

export default function CategoryManagement() {
    const [categories, setCategories] = useState(initialCategories)
    const [newCategory, setNewCategory] = useState({ name: "", type: "manual", rules: "" })
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [searchTerm, setSearchTerm] = useState("")
    const [selectedCategories, setSelectedCategories] = useState<number[]>([])
    const [sortColumn, setSortColumn] = useState<string | null>(null)
    const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")
    const [currentPage, setCurrentPage] = useState(1)
    const [itemsPerPage, setItemsPerPage] = useState(5)
    const [filterType, setFilterType] = useState<string | null>(null)
    const [filterStatus, setFilterStatus] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        // Simulating data fetching
        setIsLoading(true)
        setTimeout(() => {
            setIsLoading(false)
        }, 1000)
    }, [currentPage, itemsPerPage, filterType, filterStatus])

    const handleCreateCategory = () => {
        if (newCategory.name.trim() === "") return
        const id = Math.max(...categories.map(c => c.id)) + 1
        setCategories([...categories, { ...newCategory, id, itemCount: 0, status: "active", lastUpdated: new Date().toISOString().split('T')[0], progress: 0 }])
        setNewCategory({ name: "", type: "manual", rules: "" })
        setIsDialogOpen(false)
        toast({
            title: "Category Created",
            description: `${newCategory.name} has been successfully created.`,
        })
    }

    const handleDeleteCategory = (id: number) => {
        setCategories(categories.filter(c => c.id !== id))
        toast({
            title: "Category Deleted",
            description: "The category has been successfully deleted.",
            variant: "destructive",
        })
    }

    const handleToggleStatus = (id: number) => {
        setCategories(categories.map(c =>
            c.id === id ? { ...c, status: c.status === "active" ? "inactive" : "active" } : c
        ))
    }

    const handleSort = (column: string) => {
        if (sortColumn === column) {
            setSortDirection(sortDirection === "asc" ? "desc" : "asc")
        } else {
            setSortColumn(column)
            setSortDirection("asc")
        }
    }

    const handleBulkAction = (action: string) => {
        if (action === "delete") {
            setCategories(categories.filter(c => !selectedCategories.includes(c.id)))
            setSelectedCategories([])
            toast({
                title: "Bulk Delete",
                description: `${selectedCategories.length} categories have been deleted.`,
                variant: "destructive",
            })
        } else if (action === "activate" || action === "deactivate") {
            setCategories(categories.map(c =>
                selectedCategories.includes(c.id) ? { ...c, status: action === "activate" ? "active" : "inactive" } : c
            ))
            toast({
                title: `Bulk ${action === "activate" ? "Activation" : "Deactivation"}`,
                description: `${selectedCategories.length} categories have been ${action === "activate" ? "activated" : "deactivated"}.`,
            })
        }
    }

    const sortedCategories = [...categories].sort((a, b) => {
        if (!sortColumn) return 0
        const aValue = a[sortColumn as keyof typeof a]
        const bValue = b[sortColumn as keyof typeof b]
        if (aValue < bValue) return sortDirection === "asc" ? -1 : 1
        if (aValue > bValue) return sortDirection === "asc" ? 1 : -1
        return 0
    })

    const filteredCategories = sortedCategories.filter(category =>
        category.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (!filterType || category.type === filterType) &&
        (!filterStatus || category.status === filterStatus)
    )

    const pageCount = Math.ceil(filteredCategories.length / itemsPerPage)
    const paginatedCategories = filteredCategories.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    )

    return (
        <div className="container mx-auto py-10">
            <h1 className="text-3xl font-bold mb-6">Category Management</h1>
            <Tabs defaultValue="list" className="mb-6">
                <TabsList>
                    <TabsTrigger value="list">List View</TabsTrigger>
                    <TabsTrigger value="grid">Grid View</TabsTrigger>
                    <TabsTrigger value="analytics">Analytics</TabsTrigger>
                </TabsList>
                <TabsContent value="list">
                    <Card>
                        <CardHeader>
                            <CardTitle>Categories</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex justify-between items-center mb-6">
                                <div className="flex items-center space-x-2">
                                    <Input
                                        placeholder="Search categories..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="w-64"
                                    />
                                    <Select onValueChange={(value) => setFilterType(value || null)}>
                                        <SelectTrigger className="w-[180px]">
                                            <SelectValue placeholder="Filter by type" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value={null}>All Types</SelectItem>
                                            <SelectItem value="manual">Manual</SelectItem>
                                            <SelectItem value="automation">Automation</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <Select onValueChange={(value) => setFilterStatus(value || null)}>
                                        <SelectTrigger className="w-[180px]">
                                            <SelectValue placeholder="Filter by status" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value={null}>All Statuses</SelectItem>
                                            <SelectItem value="active">Active</SelectItem>
                                            <SelectItem value="inactive">Inactive</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="outline">
                                                <Filter className="mr-2 h-4 w-4" /> Bulk Actions
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent>
                                            <DropdownMenuItem onSelect={() => handleBulkAction("activate")}>Activate Selected</DropdownMenuItem>
                                            <DropdownMenuItem onSelect={() => handleBulkAction("deactivate")}>Deactivate Selected</DropdownMenuItem>
                                            <DropdownMenuItem onSelect={() => handleBulkAction("delete")}>Delete Selected</DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                    <Button variant="outline">
                                        <Upload className="mr-2 h-4 w-4" /> Import
                                    </Button>
                                    <Button variant="outline">
                                        <Download className="mr-2 h-4 w-4" /> Export
                                    </Button>
                                    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                                        <DialogTrigger asChild>
                                            <Button>
                                                <Plus className="mr-2 h-4 w-4" /> Create Category
                                            </Button>
                                        </DialogTrigger>
                                        <DialogContent className="sm:max-w-[425px]">
                                            <DialogHeader>
                                                <DialogTitle>Create New Category</DialogTitle>
                                                <DialogDescription>
                                                    Add a new category to organize your items. Choose between manual and automation types.
                                                </DialogDescription>
                                            </DialogHeader>
                                            <div className="grid gap-4 py-4">
                                                <div className="grid grid-cols-4 items-center gap-4">
                                                    <Label htmlFor="name" className="text-right">
                                                        Name
                                                    </Label>
                                                    <Input
                                                        id="name"
                                                        value={newCategory.name}
                                                        onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                                                        className="col-span-3"
                                                    />
                                                </div>
                                                <div className="grid grid-cols-4 items-center gap-4">
                                                    <Label htmlFor="type" className="text-right">
                                                        Type
                                                    </Label>
                                                    <Select
                                                        value={newCategory.type}
                                                        onValueChange={(value) => setNewCategory({ ...newCategory, type: value })}
                                                    >
                                                        <SelectTrigger className="w-[180px] col-span-3">
                                                            <SelectValue placeholder="Select type" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value="manual">Manual</SelectItem>
                                                            <SelectItem value="automation">Automation</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                </div>
                                                {newCategory.type === "automation" && (
                                                    <div className="grid grid-cols-4 items-center gap-4">
                                                        <Label htmlFor="rules" className="text-right">
                                                            Rules
                                                        </Label>
                                                        <Textarea
                                                            id="rules"
                                                            value={newCategory.rules}
                                                            onChange={(e) => setNewCategory({ ...newCategory, rules: e.target.value })}
                                                            placeholder="Enter automation rules..."
                                                            className="col-span-3"
                                                        />
                                                    </div>
                                                )}
                                            </div>
                                            <DialogFooter>
                                                <Button type="submit" onClick={handleCreateCategory}>Create Category</Button>
                                            </DialogFooter>
                                        </DialogContent>
                                    </Dialog>
                                </div>
                            </div>
                            {isLoading ? (
                                <div className="flex justify-center items-center h-64">
                                    <RefreshCw className="h-8 w-8 animate-spin" />
                                </div>
                            ) : (
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead className="w-[50px]">
                                                <Checkbox
                                                    checked={selectedCategories.length === paginatedCategories.length}
                                                    onCheckedChange={(checked) => {
                                                        setSelectedCategories(checked ? paginatedCategories.map(c => c.id) : [])
                                                    }}
                                                    aria-label="Select all categories"
                                                />
                                            </TableHead>
                                            <TableHead className="cursor-pointer" onClick={() => handleSort("name")}>
                                                Name {sortColumn === "name" && (sortDirection === "asc" ? "▲" : "▼")}
                                            </TableHead>
                                            <TableHead className="cursor-pointer" onClick={() => handleSort("type")}>
                                                Type {sortColumn === "type" && (sortDirection === "asc" ? "▲" : "▼")}
                                            </TableHead>
                                            <TableHead className="cursor-pointer text-right" onClick={() => handleSort("itemCount")}>
                                                Items {sortColumn === "itemCount" && (sortDirection === "asc" ? "▲" : "▼")}
                                            </TableHead>
                                            <TableHead className="cursor-pointer" onClick={() => handleSort("status")}>
                                                Status {sortColumn === "status" && (sortDirection === "asc" ? "▲" : "▼")}
                                            </TableHead>
                                            <TableHead className="cursor-pointer" onClick={() => handleSort("lastUpdated")}>
                                                Last Updated {sortColumn === "lastUpdated" && (sortDirection === "asc" ? "▲" : "▼")}
                                            </TableHead>
                                            <TableHead className="cursor-pointer" onClick={() => handleSort("progress")}>
                                                Progress {sortColumn === "progress" && (sortDirection === "asc" ? "▲" : "▼")}
                                            </TableHead>
                                            <TableHead className="text-right">Actions</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {paginatedCategories.map((category) => (
                                            <TableRow key={category.id}>
                                                <TableCell>
                                                    <Checkbox
                                                        checked={selectedCategories.includes(category.id)}
                                                        onCheckedChange={(checked) => {
                                                            setSelectedCategories(
                                                                checked
                                                                    ? [...selectedCategories, category.id]
                                                                    : selectedCategories.filter((id) => id !== category.id)
                                                            )
                                                        }}
                                                        aria-label={`Select ${category.name}`}
                                                    />
                                                </TableCell>
                                                <TableCell className="font-medium">{category.name}</TableCell>
                                                <TableCell>
                                                    <Badge variant={category.type === "manual" ? "outline" : "secondary"}>
                                                        {category.type}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell className="text-right">{category.itemCount}</TableCell>
                                                <TableCell>
                                                    <Switch
                                                        checked={category.status === "active"}
                                                        onCheckedChange={() => handleToggleStatus(category.id)}
                                                        aria-label={`Toggle ${category.name} status`}
                                                    />
                                                </TableCell>
                                                <TableCell>{category.lastUpdated}</TableCell>
                                                <TableCell>
                                                    <Progress value={category.progress} className="w-[60px]" />
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
                                                            <DropdownMenuItem>
                                                                <Edit className="mr-2 h-4 w-4" /> Edit
                                                            </DropdownMenuItem>
                                                            <DropdownMenuItem onClick={() => handleDeleteCategory(category.id)}>
                                                                <Trash2 className="mr-2 h-4 w-4" /> Delete
                                                            </DropdownMenuItem>
                                                            <DropdownMenuSeparator />
                                                            <DropdownMenuItem>
                                                                <AlertCircle className="mr-2 h-4 w-4" /> View Details
                                                            </DropdownMenuItem>
                                                        </DropdownMenuContent>
                                                    </DropdownMenu>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            )}
                            <div className="mt-4 flex justify-between items-center">
                                <div className="flex items-center space-x-2">
                                    <p className="text-sm text-muted-foreground">
                                        Showing {paginatedCategories.length} of {filteredCategories.length} categories
                                    </p>
                                    <Select
                                        value={itemsPerPage.toString()}
                                        onValueChange={(value) => setItemsPerPage(parseInt(value))}
                                    >
                                        <SelectTrigger className="w-[70px]">
                                            <SelectValue placeholder="10" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="5">5</SelectItem>
                                            <SelectItem value="10">10</SelectItem>
                                            <SelectItem value="20">20</SelectItem>
                                            <SelectItem value="50">50</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-x-2">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                        disabled={currentPage === 1}
                                    >
                                        Previous
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, pageCount))}
                                        disabled={currentPage === pageCount}
                                    >
                                        Next
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="grid">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {paginatedCategories.map((category) => (
                            <Card key={category.id}>
                                <CardHeader>
                                    <CardTitle>{category.name}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex justify-between items-center mb-2">
                                        <Badge variant={category.type === "manual" ? "outline" : "secondary"}>
                                            {category.type}
                                        </Badge>
                                        <Switch
                                            checked={category.status === "active"}
                                            onCheckedChange={() => handleToggleStatus(category.id)}
                                            aria-label={`Toggle ${category.name} status`}
                                        />
                                    </div>
                                    <p className="text-sm text-muted-foreground mb-2">Items: {category.itemCount}</p>
                                    <p className="text-sm text-muted-foreground mb-2">Last Updated: {category.lastUpdated}</p>
                                    <Progress value={category.progress} className="mb-2" />
                                    <div className="flex justify-end">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" className="h-8 w-8 p-0">
                                                    <span className="sr-only">Open menu</span>
                                                    <MoreHorizontal className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                <DropdownMenuItem>
                                                    <Edit className="mr-2 h-4 w-4" /> Edit
                                                </DropdownMenuItem>
                                                <DropdownMenuItem onClick={() => handleDeleteCategory(category.id)}>
                                                    <Trash2 className="mr-2 h-4 w-4" /> Delete
                                                </DropdownMenuItem>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuItem>
                                                    <AlertCircle className="mr-2 h-4 w-4" /> View Details
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </TabsContent>
                <TabsContent value="analytics">
                    <Card>
                        <CardHeader>
                            <CardTitle>Category Analytics</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div>
                                    <h3 className="text-lg font-semibold mb-2">Category Distribution</h3>
                                    <div className="flex items-center space-x-4">
                                        <Progress value={60} className="w-1/2" />
                                        <span className="text-sm text-muted-foreground">60% Manual</span>
                                    </div>
                                    <div className="flex items-center space-x-4 mt-2">
                                        <Progress value={40} className="w-1/2" />
                                        <span className="text-sm text-muted-foreground">40% Automation</span>
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold mb-2">Item Count by Category</h3>
                                    <ScrollArea className="h-72">
                                        <div className="space-y-2">
                                            {categories.map((category) => (
                                                <div key={category.id} className="flex items-center justify-between">
                                                    <span>{category.name}</span>
                                                    <Progress value={(category.itemCount / Math.max(...categories.map(c => c.itemCount))) * 100} className="w-1/2" />
                                                    <span>{category.itemCount}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </ScrollArea>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}