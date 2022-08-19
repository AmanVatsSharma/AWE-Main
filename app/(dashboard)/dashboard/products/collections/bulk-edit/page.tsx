"use client"

import { useState } from "react"
import { useQuery, useMutation } from "@apollo/client"
import { gql } from "@apollo/client"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { toast } from "@/components/ui/use-toast"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Loader2, ChevronDown, Filter, RefreshCw, MoreHorizontal, Trash2, Edit, ArrowUpDown } from "lucide-react"
import AdvancedError from "@/components/common/AdvancedError"

// GraphQL queries and mutations
const GET_CATEGORIES = gql`
  query GetCategories($filter: CategoryFilter, $sort: CategorySort, $page: Int!, $pageSize: Int!) {
    categories(filter: $filter, sort: $sort, page: $page, pageSize: $pageSize) {
      items {
        id
        name
        type
        status
        itemCount
        lastUpdated
      }
      totalCount
      pageInfo {
        hasNextPage
        hasPreviousPage
      }
    }
  }
`

const BULK_UPDATE_CATEGORIES = gql`
  mutation BulkUpdateCategories($input: BulkUpdateCategoriesInput!) {
    bulkUpdateCategories(input: $input) {
      success
      message
      updatedCategories {
        id
        name
        status
      }
    }
  }
`

const BULK_DELETE_CATEGORIES = gql`
  mutation BulkDeleteCategories($ids: [ID!]!) {
    bulkDeleteCategories(ids: $ids) {
      success
      message
      deletedIds
    }
  }
`

// Form schema for filters
const filterSchema = z.object({
    name: z.string().optional(),
    type: z.enum(["manual", "automated", "all"]).optional(),
    status: z.enum(["active", "inactive", "all"]).optional(),
})

export default function BulkOperations() {
    const [selectedCategories, setSelectedCategories] = useState<string[]>([])
    const [page, setPage] = useState(1)
    const [pageSize, setPageSize] = useState(10)
    const [sortField, setSortField] = useState<string | null>(null)
    const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")

    const { register, handleSubmit, watch } = useForm({
        resolver: zodResolver(filterSchema),
        defaultValues: {
            name: "",
            type: "all",
            status: "all",
        },
    })

    const filters = watch()

    const { loading, error, data, refetch } = useQuery(GET_CATEGORIES, {
        variables: {
            filter: {
                name: filters.name || undefined,
                type: filters.type !== "all" ? filters.type : undefined,
                status: filters.status !== "all" ? filters.status : undefined,
            },
            sort: sortField ? { [sortField]: sortDirection } : undefined,
            page,
            pageSize,
        },
        fetchPolicy: "network-only",
    })

    const [bulkUpdateCategories, { loading: updateLoading }] = useMutation(BULK_UPDATE_CATEGORIES)
    const [bulkDeleteCategories, { loading: deleteLoading }] = useMutation(BULK_DELETE_CATEGORIES)

    const handleSort = (field: string) => {
        if (sortField === field) {
            setSortDirection(sortDirection === "asc" ? "desc" : "asc")
        } else {
            setSortField(field)
            setSortDirection("asc")
        }
    }

    const handleFilter = (filterData: z.infer<typeof filterSchema>) => {
        setPage(1)
        refetch()
    }

    const handleBulkUpdate = async (action: "activate" | "deactivate") => {
        try {
            const { data } = await bulkUpdateCategories({
                variables: {
                    input: {
                        ids: selectedCategories,
                        status: action === "activate" ? "active" : "inactive",
                    },
                },
            })
            toast({
                title: "Bulk Update Successful",
                description: `${data.bulkUpdateCategories.updatedCategories.length} categories have been ${action}d.`,
            })
            refetch()
            setSelectedCategories([])
        } catch (error) {
            toast({
                title: "Bulk Update Failed",
                description: "An error occurred while updating categories.",
                variant: "destructive",
            })
        }
    }

    const handleBulkDelete = async () => {
        try {
            const { data } = await bulkDeleteCategories({
                variables: {
                    ids: selectedCategories,
                },
            })
            toast({
                title: "Bulk Delete Successful",
                description: `${data.bulkDeleteCategories.deletedIds.length} categories have been deleted.`,
            })
            refetch()
            setSelectedCategories([])
        } catch (error) {
            toast({
                title: "Bulk Delete Failed",
                description: "An error occurred while deleting categories.",
                variant: "destructive",
            })
        }
    }

    if (error) {
        return <AdvancedError message={error.message}/>
    }

    return (
        <div className="container mx-auto py-10">
            <h1 className="text-3xl font-bold mb-6">Bulk Category Operations</h1>

            <Card className="mb-6">
                <CardHeader>
                    <CardTitle>Filters</CardTitle>
                    <CardDescription>Filter categories for bulk operations</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit(handleFilter)} className="space-y-4">
                        <div className="flex space-x-4">
                            <div className="flex-1">
                                <Label htmlFor="name">Name</Label>
                                <Input id="name" placeholder="Search by name" {...register("name")} />
                            </div>
                            <div className="w-40">
                                <Label htmlFor="type">Type</Label>
                                <Select {...register("type")}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">All</SelectItem>
                                        <SelectItem value="manual">Manual</SelectItem>
                                        <SelectItem value="automated">Automated</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="w-40">
                                <Label htmlFor="status">Status</Label>
                                <Select {...register("status")}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">All</SelectItem>
                                        <SelectItem value="active">Active</SelectItem>
                                        <SelectItem value="inactive">Inactive</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <Button type="submit">
                            <Filter className="mr-2 h-4 w-4" />
                            Apply Filters
                        </Button>
                    </form>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Categories</CardTitle>
                    <CardDescription>Manage multiple categories at once</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex justify-between items-center mb-4">
                        <div className="space-x-2">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleBulkUpdate("activate")}
                                disabled={selectedCategories.length === 0 || updateLoading}
                            >
                                Activate Selected
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleBulkUpdate("deactivate")}
                                disabled={selectedCategories.length === 0 || updateLoading}
                            >
                                Deactivate Selected
                            </Button>
                            <Dialog>
                                <DialogTrigger asChild>
                                    <Button
                                        variant="destructive"
                                        size="sm"
                                        disabled={selectedCategories.length === 0 || deleteLoading}
                                    >
                                        Delete Selected
                                    </Button>
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>Are you sure you want to delete these categories?</DialogTitle>
                                        <DialogDescription>
                                            This action cannot be undone. This will permanently delete the selected categories
                                            and remove all associated data.
                                        </DialogDescription>
                                    </DialogHeader>
                                    <DialogFooter>
                                        <Button variant="outline" onClick={() => { }}>Cancel</Button>
                                        <Button variant="destructive" onClick={handleBulkDelete}>Delete</Button>
                                    </DialogFooter>
                                </DialogContent>
                            </Dialog>
                        </div>
                        <Button variant="outline" size="sm" onClick={() => refetch()}>
                            <RefreshCw className="mr-2 h-4 w-4" />
                            Refresh
                        </Button>
                    </div>
                    <div className="rounded-md border">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[50px]">
                                        <Checkbox
                                            checked={selectedCategories.length === data?.categories.items.length}
                                            onCheckedChange={(checked) => {
                                                setSelectedCategories(
                                                    checked
                                                        ? data?.categories.items.map((cat: any) => cat.id)
                                                        : []
                                                )
                                            }}
                                        />
                                    </TableHead>
                                    <TableHead className="cursor-pointer" onClick={() => handleSort("name")}>
                                        Name {sortField === "name" && (sortDirection === "asc" ? "▲" : "▼")}
                                    </TableHead>
                                    <TableHead className="cursor-pointer" onClick={() => handleSort("type")}>
                                        Type {sortField === "type" && (sortDirection === "asc" ? "▲" : "▼")}
                                    </TableHead>
                                    <TableHead className="cursor-pointer" onClick={() => handleSort("status")}>
                                        Status {sortField === "status" && (sortDirection === "asc" ? "▲" : "▼")}
                                    </TableHead>
                                    <TableHead className="cursor-pointer text-right" onClick={() => handleSort("itemCount")}>
                                        Items {sortField === "itemCount" && (sortDirection === "asc" ? "▲" : "▼")}
                                    </TableHead>
                                    <TableHead className="cursor-pointer" onClick={() => handleSort("lastUpdated")}>
                                        Last Updated {sortField === "lastUpdated" && (sortDirection === "asc" ? "▲" : "▼")}
                                    </TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {loading ? (
                                    <TableRow>
                                        <TableCell colSpan={7} className="h-24 text-center">
                                            <Loader2 className="h-6 w-6 animate-spin mx-auto" />
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    data?.categories.items.map((category: any) => (
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
                                                />
                                            </TableCell>
                                            <TableCell className="font-medium">{category.name}</TableCell>
                                            <TableCell>{category.type}</TableCell>
                                            <TableCell>
                                                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${category.status === "active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                                                    }`}>
                                                    {category.status}
                                                </span>
                                            </TableCell>
                                            <TableCell className="text-right">{category.itemCount}</TableCell>
                                            <TableCell>{new Date(category.lastUpdated).toLocaleDateString()}</TableCell>
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
                                                        <DropdownMenuItem onClick={() => { }}>
                                                            <Edit className="mr-2 h-4 w-4" /> Edit
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem onClick={() => { }}>
                                                            <Trash2 className="mr-2 h-4 w-4" /> Delete
                                                        </DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
                <CardFooter className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <p className="text-sm text-muted-foreground">
                            Showing {data?.categories.items.length} of {data?.categories.totalCount} categories
                        </p>
                        <Select
                            value={pageSize.toString()}
                            onValueChange={(value) => {
                                setPageSize(parseInt(value))
                                setPage(1)
                            }}
                        >
                            <SelectTrigger className="h-8 w-[70px]">
                                <SelectValue placeholder={pageSize} />
                            </SelectTrigger>
                            <SelectContent side="top">
                                {[10, 20, 30,
                                    50, 100].map((size) => (
                                        <SelectItem key={size} value={size.toString()}>
                                            {size}
                                        </SelectItem>
                                    ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                            disabled={page === 1 || loading}
                        >
                            Previous
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setPage((prev) => prev + 1)}
                            disabled={!data?.categories.pageInfo.hasNextPage || loading}
                        >
                            Next
                        </Button>
                    </div>
                </CardFooter>
            </Card>
        </div>
    )
}