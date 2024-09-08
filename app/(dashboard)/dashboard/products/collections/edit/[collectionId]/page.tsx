"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useMutation, useQuery } from "@apollo/client"
import { gql } from "@apollo/client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useFieldArray, useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { toast } from "@/components/ui/use-toast"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { ArrowLeft, Loader2, Plus, Save, X, Calendar as CalendarIcon, Image as ImageIcon } from "lucide-react"

const GET_CATEGORY = gql`
  query GetCategory($id: Int!) {
    category(id: $id) {
      id
      name
      description
      type
      status
      rules
      tags
      parentCategory {
        id
        name
      }
      progress
      image
      createdAt
      expiresAt
      featuredProduct {
        id
        name
      }
      seoMetadata {
        title
        description
        keywords
      }
    }
  }
`

const CREATE_CATEGORY = gql`
  mutation CreateCategory($input: CreateCategoryInput!) {
    createCategory(input: $input) {
      id
      name
    }
  }
`

const UPDATE_CATEGORY = gql`
  mutation UpdateCategory($id: ID!, $input: UpdateCategoryInput!) {
    updateCategory(id: $id, input: $input) {
      id
      name
    }
  }
`

const GET_PARENT_CATEGORIES = gql`
  query GetParentCategories {
    categories(filter: { isParent: true }) {
      id
      name
    }
  }
`

const GET_PRODUCTS = gql`
  query GetProducts {
    products {
      id
      name
    }
  }
`

const formSchema = z.object({
    name: z.string().min(2, { message: "Name must be at least 2 characters." }),
    description: z.string().min(10, { message: "Description must be at least 10 characters." }),
    type: z.enum(["manual", "automated"]),
    status: z.boolean(),
    rules: z.array(z.object({
        key: z.string().min(1, { message: "Key is required" }),
        input: z.string().min(1, { message: "Input is required" })
    })).optional(),
    tags: z.array(z.string()),
    parentCategoryId: z.string().optional(),
    progress: z.number().min(0).max(100),
    image: z.string().optional(),
    createdAt: z.date(),
    expiresAt: z.date().optional(),
    featuredProductId: z.string().optional(),
    seoMetadata: z.object({
        title: z.string(),
        description: z.string(),
        keywords: z.array(z.string()),
    }),
    manualProducts: z.array(z.string()).optional(),
})

const sampleCategory = {
    id: "sample",
    name: "Sample Category",
    description: "This is a sample category description.",
    type: "manual",
    status: "active",
    rules: [],
    tags: ["sample", "example"],
    parentCategory: null,
    progress: 50,
    image: "/placeholder.svg",
    createdAt: new Date(),
    expiresAt: null,
    featuredProduct: null,
    seoMetadata: {
        title: "Sample Category",
        description: "A sample category for demonstration purposes",
        keywords: ["sample", "category", "demo"],
    },
}

export default function CategoryForm({ categoryId }: { categoryId?: string }) {
    const router = useRouter()
    const [tags, setTags] = useState<string[]>([])
    const isEditMode = !!categoryId

    const { loading, error, data } = useQuery(GET_CATEGORY, {
        variables: { id: categoryId },
        skip: !isEditMode,
    })

    const { data: parentCategoriesData } = useQuery(GET_PARENT_CATEGORIES)
    const { data: productsData } = useQuery(GET_PRODUCTS)

    const [createCategory, { loading: createLoading }] = useMutation(CREATE_CATEGORY)
    const [updateCategory, { loading: updateLoading }] = useMutation(UPDATE_CATEGORY)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            description: "",
            type: "manual",
            status: true,
            rules: [],
            tags: [],
            parentCategoryId: undefined,
            progress: 0,
            image: "/placeholder.svg",
            createdAt: new Date(),
            seoMetadata: {
                title: "",
                description: "",
                keywords: [],
            },
            manualProducts: [],
        },
    })

    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "rules",
    })

    useEffect(() => {
        const categoryData = data?.category || sampleCategory
        form.reset({
            name: categoryData.name,
            description: categoryData.description,
            type: categoryData.type,
            status: categoryData.status === "active",
            rules: categoryData.rules || [],
            tags: categoryData.tags,
            parentCategoryId: categoryData.parentCategory?.id,
            progress: categoryData.progress,
            image: categoryData.image,
            createdAt: new Date(categoryData.createdAt),
            expiresAt: categoryData.expiresAt ? new Date(categoryData.expiresAt) : undefined,
            featuredProductId: categoryData.featuredProduct?.id,
            seoMetadata: categoryData.seoMetadata,
            manualProducts: [],
        })
        setTags(categoryData.tags)
    }, [data, form])

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            const input = {
                ...values,
                status: values.status ? "active" : "inactive",
            }
            if (isEditMode) {
                await updateCategory({
                    variables: { id: categoryId, input },
                })
                toast({ title: "Category Updated", description: "The category has been successfully updated." })
            } else {
                const { data } = await createCategory({
                    variables: { input },
                })
                toast({ title: "Category Created", description: "The new category has been successfully created." })
                router.push(`/categories/${data.createCategory.id}`)
            }
        } catch (error) {
            toast({
                title: "Error",
                description: "An error occurred while saving the category.",
                variant: "destructive",
            })
        }
    }

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Loader2 className="h-16 w-16 animate-spin text-primary" />
            </div>
        )
    }

    if (error) {
        toast({
            title: "Error",
            description: "An error occurred while fetching category data. Using sample data.",
            variant: "destructive",
        })
    }

    const parentCategories = parentCategoriesData?.categories || []
    const products = productsData?.products || []

    return (
        <div className="container max-w-5xl mx-auto py-10">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                    <Button variant="outline" size="icon" onClick={() => router.back()}>
                        <ArrowLeft className="h-4 w-4" />
                    </Button>
                    <h1 className="text-3xl font-bold">
                        {isEditMode ? "Edit Category" : "Create New Category"}
                    </h1>
                </div>
            </div>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <Tabs defaultValue="basic" className="space-y-4">
                        <TabsList className="grid w-full grid-cols-4">
                            <TabsTrigger value="basic">Basic Info</TabsTrigger>
                            <TabsTrigger value="advanced">Advanced</TabsTrigger>
                            <TabsTrigger value="products">Products</TabsTrigger>
                            <TabsTrigger value="seo">SEO</TabsTrigger>
                        </TabsList>
                        <TabsContent value="basic">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Basic Information</CardTitle>
                                    <CardDescription>Enter the main details of the category.</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <div className="grid grid-cols-2 gap-4">
                                        <FormField
                                            control={form.control}
                                            name="name"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Name</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="Enter category name" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="type"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Type</FormLabel>
                                                    <FormControl>
                                                        <RadioGroup
                                                            onValueChange={field.onChange}
                                                            defaultValue={field.value}
                                                            className="flex flex-col space-y-1"
                                                        >
                                                            <FormItem className="flex items-center space-x-3 space-y-0">
                                                                <FormControl>
                                                                    <RadioGroupItem value="manual" />
                                                                </FormControl>
                                                                <FormLabel className="font-normal">
                                                                    Manual
                                                                </FormLabel>
                                                            </FormItem>
                                                            <FormItem className="flex items-center space-x-3 space-y-0">
                                                                <FormControl>
                                                                    <RadioGroupItem value="automated" />
                                                                </FormControl>
                                                                <FormLabel className="font-normal">
                                                                    Automated
                                                                </FormLabel>
                                                            </FormItem>
                                                        </RadioGroup>
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <FormField
                                        control={form.control}
                                        name="description"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Description</FormLabel>
                                                <FormControl>
                                                    <Textarea
                                                        placeholder="Enter category description"
                                                        className="resize-none"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <div className="grid grid-cols-2 gap-4">
                                        <FormField
                                            control={form.control}
                                            name="parentCategoryId"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Parent Category</FormLabel>
                                                    <Select onValueChange={field.onChange} value={field.value}>
                                                        <FormControl>
                                                            <SelectTrigger>
                                                                <SelectValue placeholder="Select parent category" />
                                                            </SelectTrigger>
                                                        </FormControl>
                                                        <SelectContent>
                                                            <SelectItem value={null}>None</SelectItem>
                                                            {parentCategories.map((category: { id: string, name: string }) => (
                                                                <SelectItem key={category.id} value={category.id}>
                                                                    {category.name}
                                                                </SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="status"
                                            render={({ field }) => (
                                                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                                    <div className="space-y-0.5">
                                                        <FormLabel className="text-base">Active Status</FormLabel>
                                                        <FormDescription>
                                                            Set whether this category is active or inactive.
                                                        </FormDescription>
                                                    </div>
                                                    <FormControl>
                                                        <Switch
                                                            checked={field.value}
                                                            onCheckedChange={field.onChange}
                                                        />
                                                    </FormControl>
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <FormField
                                        control={form.control}
                                        name="tags"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Tags</FormLabel>
                                                <FormControl>
                                                    <div className="flex flex-wrap gap-2">
                                                        {tags.map((tag, index) => (
                                                            <Badge key={index} variant="secondary">
                                                                {tag}
                                                                <button
                                                                    type="button"
                                                                    onClick={() => {
                                                                        const newTags = tags.filter((_, i) => i !== index)
                                                                        setTags(newTags)
                                                                        field.onChange(newTags)
                                                                    }}
                                                                    className="ml-1 text-xs"
                                                                >
                                                                    <X className="h-3 w-3" />
                                                                </button>
                                                            </Badge>
                                                        ))}
                                                        <Input
                                                            placeholder="Add tag"
                                                            className="w-24 flex-grow"
                                                            onKeyPress={(e) => {
                                                                if (e.key === "Enter") {
                                                                    e.preventDefault()
                                                                    const target = e.target as HTMLInputElement
                                                                    if (target.value) {
                                                                        const new_tags = [...tags, target.value]
                                                                        setTags(new_tags)
                                                                        field.onChange(new_tags)
                                                                        target.value = ""
                                                                    }
                                                                }
                                                            }}
                                                        />
                                                    </div>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </CardContent>
                            </Card>
                        </TabsContent>
                        <TabsContent value="advanced">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Advanced Settings</CardTitle>
                                    <CardDescription>Configure additional category settings.</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <FormField
                                        control={form.control}
                                        name="progress"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Progress</FormLabel>
                                                <FormControl>
                                                    <div className="space-y-2">
                                                        <Slider
                                                            min={0}
                                                            max={100}
                                                            step={1}
                                                            value={[field.value]}
                                                            onValueChange={(value) => field.onChange(value[0])}
                                                        />
                                                        <div className="flex justify-between text-xs text-muted-foreground">
                                                            <span>0%</span>
                                                            <span>50%</span>
                                                            <span>100%</span>
                                                        </div>
                                                    </div>
                                                </FormControl>
                                                <FormDescription>
                                                    Set the current progress of this category (e.g., setup completion).
                                                </FormDescription>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="image"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Category Image</FormLabel>
                                                <FormControl>
                                                    <div className="flex items-center space-x-4">
                                                        <img
                                                            src={field.value || "/placeholder.svg"}
                                                            alt="Category"
                                                            className="w-20 h-20 object-cover rounded-md"
                                                        />
                                                        <Input
                                                            type="file"
                                                            accept="image/*"
                                                            onChange={(e) => {
                                                                const file = e.target.files?.[0]
                                                                if (file) {
                                                                    const reader = new FileReader()
                                                                    reader.onloadend = () => {
                                                                        field.onChange(reader.result as string)
                                                                    }
                                                                    reader.readAsDataURL(file)
                                                                }
                                                            }}
                                                        />
                                                    </div>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <div className="grid grid-cols-2 gap-4">
                                        <FormField
                                            control={form.control}
                                            name="createdAt"
                                            render={({ field }) => (
                                                <FormItem className="flex flex-col">
                                                    <FormLabel>Created Date</FormLabel>
                                                    <Popover>
                                                        <PopoverTrigger asChild>
                                                            <FormControl>
                                                                <Button
                                                                    variant={"outline"}
                                                                    className={cn(
                                                                        "w-full pl-3 text-left font-normal",
                                                                        !field.value && "text-muted-foreground"
                                                                    )}
                                                                >
                                                                    {field.value ? (
                                                                        format(field.value, "PPP")
                                                                    ) : (
                                                                        <span>Pick a date</span>
                                                                    )}
                                                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                                </Button>
                                                            </FormControl>
                                                        </PopoverTrigger>
                                                        <PopoverContent className="w-auto p-0" align="start">
                                                            <Calendar
                                                                mode="single"
                                                                selected={field.value}
                                                                onSelect={field.onChange}
                                                                disabled={(date) =>
                                                                    date > new Date() || date < new Date("1900-01-01")
                                                                }
                                                                initialFocus
                                                            />
                                                        </PopoverContent>
                                                    </Popover>
                                                    <FormDescription>
                                                        The date when this category was created.
                                                    </FormDescription>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="expiresAt"
                                            render={({ field }) => (
                                                <FormItem className="flex flex-col">
                                                    <FormLabel>Expiry Date (Optional)</FormLabel>
                                                    <Popover>
                                                        <PopoverTrigger asChild>
                                                            <FormControl>
                                                                <Button
                                                                    variant={"outline"}
                                                                    className={cn(
                                                                        "w-full pl-3 text-left font-normal",
                                                                        !field.value && "text-muted-foreground"
                                                                    )}
                                                                >
                                                                    {field.value ? (
                                                                        format(field.value, "PPP")
                                                                    ) : (
                                                                        <span>Pick a date</span>
                                                                    )}
                                                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                                </Button>
                                                            </FormControl>
                                                        </PopoverTrigger>
                                                        <PopoverContent className="w-auto p-0" align="start">
                                                            <Calendar
                                                                mode="single"
                                                                selected={field.value}
                                                                onSelect={field.onChange}
                                                                disabled={(date) =>
                                                                    date < new Date()
                                                                }
                                                                initialFocus
                                                            />
                                                        </PopoverContent>
                                                    </Popover>
                                                    <FormDescription>
                                                        Set an optional expiry date for this category.
                                                    </FormDescription>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <FormField
                                        control={form.control}
                                        name="featuredProductId"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Featured Product</FormLabel>
                                                <Select onValueChange={field.onChange} value={field.value}>
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Select featured product" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        <SelectItem value={null}>None</SelectItem>
                                                        {products.map((product: { id: string, name: string }) => (
                                                            <SelectItem key={product.id} value={product.id}>
                                                                {product.name}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                                <FormDescription>
                                                    Choose a featured product for this category.
                                                </FormDescription>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </CardContent>
                            </Card>
                            {form.watch("type") === "automated" && (
                                <Card className="mt-6">
                                    <CardHeader>
                                        <CardTitle>Automation Rules</CardTitle>
                                        <CardDescription>Define rules for automated categorization.</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <ScrollArea className="h-[300px] pr-4">
                                            {fields.map((field, index) => (
                                                <div key={field.id} className="flex items-end space-x-2 mb-4">
                                                    <FormField
                                                        control={form.control}
                                                        name={`rules.${index}.key`}
                                                        render={({ field }) => (
                                                            <FormItem className="flex-1">
                                                                <FormLabel>Key</FormLabel>
                                                                <FormControl>
                                                                    <Input {...field} placeholder="Enter rule key" />
                                                                </FormControl>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />
                                                    <FormField
                                                        control={form.control}
                                                        name={`rules.${index}.input`}
                                                        render={({ field }) => (
                                                            <FormItem className="flex-1">
                                                                <FormLabel>Input</FormLabel>
                                                                <FormControl>
                                                                    <Input {...field} placeholder="Enter rule input" />
                                                                </FormControl>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />
                                                    <Button
                                                        type="button"
                                                        variant="outline"
                                                        size="icon"
                                                        onClick={() => remove(index)}
                                                    >
                                                        <X className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            ))}
                                        </ScrollArea>
                                        <Button
                                            type="button"
                                            variant="outline"
                                            size="sm"
                                            className="mt-2"
                                            onClick={() => append({ key: "", input: "" })}
                                        >
                                            <Plus className="mr-2 h-4 w-4" /> Add Rule
                                        </Button>
                                    </CardContent>
                                </Card>
                            )}
                        </TabsContent>
                        <TabsContent value="products">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Products Management</CardTitle>
                                    <CardDescription>Manage products for this category.</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    {form.watch("type") === "manual" && (
                                        <FormField
                                            control={form.control}
                                            name="manualProducts"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Manual Products</FormLabel>
                                                    <FormControl>
                                                        <Select onValueChange={(value) => field.onChange([...field.value, value])} value="">
                                                            <SelectTrigger>
                                                                <SelectValue placeholder="Add products to this category" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                {products.map((product: { id: string, name: string }) => (
                                                                    <SelectItem key={product.id} value={product.id}>
                                                                        {product.name}
                                                                    </SelectItem>
                                                                ))}
                                                            </SelectContent>
                                                        </Select>
                                                    </FormControl>
                                                    <FormDescription>
                                                        Select products to add to this category manually.
                                                    </FormDescription>
                                                    <div className="mt-2">
                                                        {field.value.map((productId: string) => {
                                                            const product = products.find((p: { id: string }) => p.id === productId)
                                                            return (
                                                                <Badge key={productId} variant="secondary" className="mr-2 mb-2">
                                                                    {product?.name}
                                                                    <button
                                                                        type="button"
                                                                        onClick={() => field.onChange(field.value.filter((id: string) => id !== productId))}
                                                                        className="ml-1 text-xs"
                                                                    >
                                                                        <X className="h-3 w-3" />
                                                                    </button>
                                                                </Badge>
                                                            )
                                                        })}
                                                    </div>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    )}
                                    {form.watch("type") === "automated" && (
                                        <div className="text-sm text-muted-foreground">
                                            Products will be automatically added based on the automation rules defined in the Advanced tab.
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        </TabsContent>
                        <TabsContent value="seo">
                            <Card>
                                <CardHeader>
                                    <CardTitle>SEO Settings</CardTitle>
                                    <CardDescription>Optimize your category for search engines.</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <FormField
                                        control={form.control}
                                        name="seoMetadata.title"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>SEO Title</FormLabel>
                                                <FormControl>
                                                    <Input {...field} placeholder="Enter SEO title" />
                                                </FormControl>
                                                <FormDescription>
                                                    The title that will appear in search engine results.
                                                </FormDescription>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="seoMetadata.description"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>SEO Description</FormLabel>
                                                <FormControl>
                                                    <Textarea {...field} placeholder="Enter SEO description" />
                                                </FormControl>
                                                <FormDescription>
                                                    A brief description of the category for search engine results.
                                                </FormDescription>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="seoMetadata.keywords"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>SEO Keywords</FormLabel>
                                                <FormControl>
                                                    <div className="flex flex-wrap gap-2">
                                                        {field.value.map((keyword, index) => (
                                                            <Badge key={index} variant="secondary">
                                                                {keyword}
                                                                <button
                                                                    type="button"
                                                                    onClick={() => {
                                                                        const newKeywords = field.value.filter((_, i) => i !== index)
                                                                        field.onChange(newKeywords)
                                                                    }}
                                                                    className="ml-1 text-xs"
                                                                >
                                                                    <X className="h-3 w-3" />
                                                                </button>
                                                            </Badge>
                                                        ))}
                                                        <Input
                                                            placeholder="Add keyword"
                                                            className="w-24 flex-grow"
                                                            onKeyPress={(e) => {
                                                                if (e.key === "Enter") {
                                                                    e.preventDefault()
                                                                    const target = e.target as HTMLInputElement
                                                                    if (target.value) {
                                                                        const newKeywords = [...field.value, target.value]
                                                                        field.onChange(newKeywords)
                                                                        target.value = ""
                                                                    }
                                                                }
                                                            }}
                                                        />
                                                    </div>
                                                </FormControl>
                                                <FormDescription>
                                                    Add keywords to help improve search engine visibility.
                                                </FormDescription>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </CardContent>
                            </Card>
                        </TabsContent>
                    </Tabs>

                    <div className="flex justify-end space-x-4">
                        <Button type="button" variant="outline" onClick={() => router.back()}>
                            Cancel
                        </Button>
                        <Button type="submit" disabled={createLoading || updateLoading}>
                            {createLoading || updateLoading ? (
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            ) : (
                                <Save className="mr-2 h-4 w-4" />
                            )}
                            {isEditMode ? "Update Category" : "Create Category"}
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    )
}