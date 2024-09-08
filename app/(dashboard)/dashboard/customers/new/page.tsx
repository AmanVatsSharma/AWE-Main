// 'use client'
// import React, { useEffect, useState } from 'react'
// import Image from "next/image"
// import Link from "next/link"
// import {
//     ChevronLeft,
//     Home,
//     LineChart,
//     Package,
//     Package2,
//     PanelLeft,
//     PlusCircle,
//     Search,
//     Settings,
//     ShoppingCart,
//     Upload,
//     Users2,
// } from "lucide-react"

// import { Badge } from "@/components/ui/badge"
// import {
//     Breadcrumb,
//     BreadcrumbItem,
//     BreadcrumbLink,
//     BreadcrumbList,
//     BreadcrumbPage,
//     BreadcrumbSeparator,
// } from "@/components/ui/breadcrumb"
// import { Button } from "@/components/ui/button"
// import {
//     Card,
//     CardContent,
//     CardDescription,
//     CardFooter,
//     CardHeader,
//     CardTitle,
// } from "@/components/ui/card"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import {
//     Select,
//     SelectContent,
//     SelectItem,
//     SelectTrigger,
//     SelectValue,
// } from "@/components/ui/select"
// import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
// import {
//     Table,
//     TableBody,
//     TableCell,
//     TableHead,
//     TableHeader,
//     TableRow,
// } from "@/components/ui/table"
// import { Textarea } from "@/components/ui/textarea"
// import {
//     ToggleGroup,
//     ToggleGroupItem,
// } from "@/components/ui/toggle-group"
// import { Checkbox } from '@/components/ui/checkbox'
// import axios from 'axios'
// import { useMutation } from '@apollo/client'
// import { CREATE_CUSTOMER } from '@/ApolloClient'

// type Props = {}

// interface category {
//     id: string,
//     name: string,
// }

// const CustomerNewPage = (props: Props) => {
//     const [createCustomer, { data, loading, error }] = useMutation(CREATE_CUSTOMER);

//     const [formData, setFormData] = useState({
//         firstName: '',
//         lastName: '',
//         email: '',
//         phoneNumber: '',
//         notes: '',
//         tags: [],
//         address: {
//             address: '',
//             landmark: '',
//             city: '',
//             state: '',
//             pincode: '',
//             phone: '',
//             company: '',
//         },
//     });

//     const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         const { name, value } = e.target;
//         setFormData(prevState => ({
//             ...prevState,
//             [name]: value,
//         }));
//     };


//     const handleSubmit = async (event: React.FormEvent) => {
//         event.preventDefault();
//         try {
//             await createCustomer({ variables: formData });
//         } catch (e) {
//             console.error(e);
//         }
//     };

//     return (
//         <div className="flex min-h-screen w-full flex-col bg-muted/40">
//             <div className="flex flex-col sm:gap-4 sm:py-4">
//                 <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
//                     <Breadcrumb className="hidden md:flex">
//                         <BreadcrumbList>
//                             <BreadcrumbItem>
//                                 <BreadcrumbLink asChild>
//                                     <Link href="/dashboard/home">Dashboard</Link>
//                                 </BreadcrumbLink>
//                             </BreadcrumbItem>
//                             <BreadcrumbSeparator />
//                             <BreadcrumbItem>
//                                 <BreadcrumbLink asChild>
//                                     <Link href="/dashboard/customers">Customers</Link>
//                                 </BreadcrumbLink>
//                             </BreadcrumbItem>
//                             <BreadcrumbSeparator />
//                             <BreadcrumbItem>
//                                 <BreadcrumbPage>New Customer</BreadcrumbPage>
//                             </BreadcrumbItem>
//                         </BreadcrumbList>
//                     </Breadcrumb>
//                 </header>
//                 <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
//                     <form onSubmit={handleSubmit}>
//                         <div className="mx-auto grid max-w-[59rem] flex-1 auto-rows-max gap-4">
//                             <div className="flex items-center gap-4">
//                                 <Button variant="outline" size="icon" className="h-7 w-7">
//                                     <ChevronLeft className="h-4 w-4" />
//                                     <span className="sr-only">Back</span>
//                                 </Button>
//                                 <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
//                                     Add Customer
//                                 </h1>
//                                 <Badge variant="outline" className="ml-auto sm:ml-0">
//                                     New
//                                 </Badge>
//                                 <div className="hidden items-center gap-2 md:ml-auto md:flex">
//                                     <Button variant="outline" size="sm">
//                                         Discard
//                                     </Button>
//                                     <Button type="submit" size="sm">Add Customer</Button>
//                                 </div>
//                             </div>
//                             <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
//                                 <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
//                                     <Card x-chunk="dashboard-07-chunk-0">
//                                         <CardHeader>
//                                             <CardTitle>Customer Details</CardTitle>
//                                             <CardDescription>
//                                                 Start filling our the details of your customer
//                                             </CardDescription>
//                                         </CardHeader>
//                                         <CardContent>
//                                             <div className="grid gap-6">
//                                                 <div className="grid md:grid-cols-2 gap-3">
//                                                     <div>
//                                                         <Label htmlFor="name">First Name</Label>
//                                                         <Input
//                                                             id="name"
//                                                             type="text"
//                                                             className="w-full mt-3"
//                                                             placeholder="Gamer Gear Pro Controller"
//                                                             value={formData.firstName}
//                                                             onChange={handleChange}
//                                                             required
//                                                         />
//                                                     </div>
//                                                     <div>
//                                                         <Label htmlFor="lastName">Last Name</Label>
//                                                         <Input
//                                                             id="lastName"
//                                                             type="text"
//                                                             className="w-full mt-3"
//                                                             placeholder="Gamer Gear Pro Controller"
//                                                             value={formData.lastName}
//                                                             onChange={handleChange}
//                                                             required
//                                                         />
//                                                     </div>
//                                                 </div>
//                                                 <div className="grid gap-3">
//                                                     <Label htmlFor="email">Email</Label>
//                                                     <Input
//                                                         id="email"
//                                                         type="text"
//                                                         className="w-full"
//                                                         placeholder="Gamer Gear Pro Controller"
//                                                         value={formData.email}
//                                                         required
//                                                     />
//                                                     <Label htmlFor="phone">Phone number
//                                                     </Label>
//                                                     <Input
//                                                         id="phone"
//                                                         type="tel"
//                                                         className="w-full"
//                                                         placeholder="99876XXXXX"
//                                                         value={formData.phoneNumber}
//                                                         required
//                                                     />
//                                                 </div>
//                                             </div>
//                                         </CardContent>
//                                     </Card>
//                                     <Card x-chunk="dashboard-07-chunk-1">
//                                         <CardHeader>
//                                             <CardTitle>Default address</CardTitle>
//                                             <CardDescription>
//                                                 The primary address of this customer
//                                             </CardDescription>
//                                         </CardHeader>
//                                         <CardContent>
//                                             <div className="grid">
//                                                 <div className='grid gap-3 w-full px-2'>
//                                                     <label htmlFor="country">Country/region
//                                                     </label>
//                                                     <Select
//                                                         id="country"
//                                                         type="number"
//                                                         className="w-full"
//                                                         placeholder="India"
//                                                     />
//                                                 </div>
//                                                 <div className='grid gap-3 w-full px-2'>
//                                                     <div className='grid md:grid-cols-2 gap-3 w-full px-2 mt-5'>
//                                                         <div>
//                                                             <label htmlFor="company">Company
//                                                             </label>
//                                                             <Input
//                                                                 id="company"
//                                                                 type="text"
//                                                                 className="w-full"
//                                                                 value={formData.address.company}
//                                                             />
//                                                         </div>
//                                                         <div>
//                                                             <label htmlFor="pincode">Pincode
//                                                             </label>
//                                                             <Input
//                                                                 id="pincode"
//                                                                 type="number"
//                                                                 className="w-full"
//                                                                 value={formData.address.pincode}
//                                                             />
//                                                         </div>
//                                                     </div>

//                                                     <label htmlFor="address">Address
//                                                     </label>
//                                                     <Input
//                                                         id="address"
//                                                         type="text"
//                                                         className="w-full"
//                                                         value={formData.address.address}
//                                                     />

//                                                     <div className='grid md:grid-cols-2 gap-3 w-full px-2 mt-5'>
//                                                         <div>
//                                                             <label htmlFor="landmark">Landmark
//                                                             </label>
//                                                             <Input
//                                                                 id="landmark"
//                                                                 type="text"
//                                                                 className="w-full"
//                                                                 value={formData.address.landmark}
//                                                             />
//                                                         </div>
//                                                         <div>
//                                                             <label htmlFor="phone">Phone
//                                                             </label>
//                                                             <Input
//                                                                 id="phone"
//                                                                 type="number"
//                                                                 className="w-full"
//                                                                 value={formData.address.phone}
//                                                             />
//                                                         </div>
//                                                     </div>




//                                                 </div>

//                                                 <div className='grid md:grid-cols-2 gap-3 w-full px-2 mt-5'>
//                                                     <div>
//                                                         <label htmlFor="city">City
//                                                         </label>
//                                                         <Input
//                                                             id="city"
//                                                             type="text"
//                                                             className="w-full"
//                                                             value={formData.address.city}
//                                                         />
//                                                     </div>
//                                                     <div>
//                                                         <label htmlFor="state">State
//                                                         </label>
//                                                         <Input
//                                                             id="state"
//                                                             type="text"
//                                                             className="w-full"
//                                                             value={formData.address.state}
//                                                         />
//                                                     </div>
//                                                 </div>
//                                             </div>
//                                             <div className="flex items-center space-x-2 p-3">
//                                                 <Checkbox id="Baddress" />
//                                                 <label
//                                                     htmlFor="Baddress"
//                                                     className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
//                                                 >
//                                                     same as billing address
//                                                 </label>
//                                             </div>
//                                             {/* <Link href={'#'}>
//                                                 Manage international pricing
//                                             </Link> */}

//                                         </CardContent>
//                                     </Card>

//                                     <Card x-chunk="dashboard-07-chunk-2">
//                                         <CardHeader>
//                                             <CardTitle>Customer Category</CardTitle>
//                                         </CardHeader>
//                                         <CardContent>
//                                         </CardContent>
//                                     </Card>
//                                 </div>
//                                 <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
//                                     <Card x-chunk="dashboard-07-chunk-3">
//                                         <CardHeader>
//                                             <CardTitle>Customer Status</CardTitle>
//                                         </CardHeader>
//                                         <CardContent>
//                                             <div className="grid gap-6">
//                                                 <div className="grid gap-3">
//                                                     <Label htmlFor="status">Status</Label>
//                                                     <Select>
//                                                         <SelectTrigger id="status" aria-label="Select status">
//                                                             <SelectValue placeholder="Select status" />
//                                                         </SelectTrigger>
//                                                         <SelectContent>
//                                                             <SelectItem value="draft">Draft</SelectItem>
//                                                             <SelectItem value="published">Active</SelectItem>
//                                                             <SelectItem value="archived">Archived</SelectItem>
//                                                         </SelectContent>
//                                                     </Select>
//                                                 </div>
//                                             </div>
//                                         </CardContent>
//                                     </Card>
//                                     <Card
//                                         className="overflow-hidden" x-chunk="dashboard-07-chunk-4"
//                                     >
//                                         <CardHeader>
//                                             <CardTitle>Notes</CardTitle>
//                                             <CardDescription>
//                                                 Notes are private and won&apos;t be shared with the customer.
//                                             </CardDescription>
//                                         </CardHeader>
//                                         <CardContent>
//                                             <div>
//                                                 <label htmlFor="notes"></label>
//                                                 <Input
//                                                     id="notes"
//                                                     type="text"
//                                                     className="w-full"
//                                                     value={formData.notes}
//                                                 />

//                                             </div>
//                                         </CardContent>
//                                     </Card>

//                                     <Card
//                                         className="overflow-hidden" x-chunk="dashboard-07-chunk-4"
//                                     >
//                                         <CardHeader>
//                                             <CardTitle>Tags</CardTitle>
//                                         </CardHeader>
//                                         <CardContent>
//                                             <div>
//                                                 <label htmlFor="tags"></label>
//                                                 <Input
//                                                     id="tags"
//                                                     type="text"
//                                                     className="w-full"
//                                                     value={formData.tags}
//                                                 />

//                                             </div>
//                                         </CardContent>
//                                     </Card>

//                                 </div>
//                             </div>
//                             <div className="flex items-center justify-center gap-2 md:hidden">
//                                 <Button variant="outline" size="sm">
//                                     Discard
//                                 </Button>
//                                 <Button  size="sm">Save Customer</Button>
//                             </div>
//                         </div>
//                     </form>
//                 </main>
//             </div>
//         </div>
//     )
// }

// export default CustomerNewPage


'use client'
import React, { useEffect, useState } from 'react'
import Image from "next/image"
import Link from "next/link"

import { useMutation } from '@apollo/client'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb'
import { Button } from '@/components/ui/button'
import { ChevronLeft } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import TagsInput from '@/components/backend/TagsInput'
import { Textarea } from '@/components/ui/textarea'
import { useToast } from '@/components/ui/use-toast'
import { CREATE_CUSTOMER } from '@/ApolloClient'
import { redirect } from 'next/navigation'

type Props = {}

interface Address {
    address: string;
    landmark: string;
    city: string;
    state: string;
    pincode: string;
    phone: string;
    company: string;
}

interface FormData {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    notes: string;
    tags: TagInput[],
    address: Address;
    country: string;
}

interface TagInput {
    name: String
}

const countries = [
    { code: 'IN', name: 'India' },
    { code: 'US', name: 'United States' },
    { code: 'CA', name: 'Canada' },
    // Add more countries as needed
];


const CustomerNewPage = (props: Props) => {
    const { toast } = useToast()
    const [createCustomer, { data, loading, error }] = useMutation(CREATE_CUSTOMER);


    const [formData, setFormData] = useState<FormData>({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        notes: '',
        tags: [],
        country: '',
        address: {
            address: '',
            landmark: '',
            city: '',
            state: '',
            pincode: '',
            phone: '',
            company: '',
        },
    });

    const [tags, setTags] = useState<TagInput[]>([]);

    useEffect(() => {
        setFormData(prevState => ({
            ...prevState,
            tags,
        }));
    }, [tags]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            address: {
                ...prevState.address,
                [name]: value,
            }
        }));
    };

    const handleCountryChange = (value: string) => {
        setFormData(prevState => ({
            ...prevState,
            country: value,
        }));
    };

    const handleTagsChange = (newTags: string[]) => {

        const formattedTags = newTags
            .filter(tag => tag && typeof tag === 'string' && tag.trim() !== '')
            .map(tag => ({ name: tag.trim() }));

        setTags(prevTags => {
            const combinedTags = [...prevTags, ...formattedTags];
            // Filter out any objects with undefined or empty name
            const filteredTags = combinedTags.filter(tag => tag.name && tag.name !== '');
            const uniqueTags = Array.from(new Set(filteredTags.map(tag => tag.name)))
                .map(name => ({ name }));

            return uniqueTags;
        });
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        try {
            await createCustomer({
                variables: formData,
            });
        } catch (e) {
            console.error(e);
        }
    };

    useEffect(() => {
        if (loading) {
            toast({
                title: "Loading!",
                description: "Please wait while loading",
            });
        } else if (error) {
            toast({
                variant: "destructive",
                title: "Error!",
                description: error.message,
            });
        } else if (data) {
            toast({
                title: "Customer created successfully!",
                description: `Added new customer ${data.createCustomer.firstName}`,
            });
            return redirect('/dashboard/customers')
        }
    }, [loading, error, data, toast]);

    return (
        <div className="flex min-h-screen w-full flex-col bg-muted/40">
            <div className="flex flex-col sm:gap-4 sm:py-4">
                <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
                    <Breadcrumb className="hidden md:flex">
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <BreadcrumbLink asChild>
                                    <Link href="/dashboard/home">Dashboard</Link>
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbLink asChild>
                                    <Link href="/dashboard/customers">Customers</Link>
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbPage>New Customer</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </header>
                <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
                    <form onSubmit={handleSubmit}>
                        <div className="mx-auto grid max-w-[59rem] flex-1 auto-rows-max gap-4">
                            <div className="flex items-center gap-4">
                                <Button variant="outline" size="icon" className="h-7 w-7">
                                    <ChevronLeft className="h-4 w-4" />
                                    <span className="sr-only">Back</span>
                                </Button>
                                <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
                                    Add Customer
                                </h1>
                                <Badge variant="outline" className="ml-auto sm:ml-0">
                                    New
                                </Badge>
                                <div className="hidden items-center gap-2 md:ml-auto md:flex">
                                    <Button variant="outline" size="sm">
                                        Discard
                                    </Button>
                                    <Button type="submit" size="sm">Add Customer</Button>
                                </div>
                            </div>
                            <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
                                <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
                                    <Card x-chunk="dashboard-07-chunk-0">
                                        <CardHeader>
                                            <CardTitle>Customer Details</CardTitle>
                                            <CardDescription>
                                                Start filling out the details of your customer
                                            </CardDescription>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="grid gap-6">
                                                <div className="grid md:grid-cols-2 gap-3">
                                                    <div>
                                                        <Label htmlFor="firstName">First Name</Label>
                                                        <Input
                                                            id="firstName"
                                                            name="firstName"
                                                            type="text"
                                                            className="w-full mt-3"
                                                            placeholder="John"
                                                            value={formData.firstName}
                                                            onChange={handleChange}
                                                            required
                                                        />
                                                    </div>
                                                    <div>
                                                        <Label htmlFor="lastName">Last Name</Label>
                                                        <Input
                                                            id="lastName"
                                                            name="lastName"
                                                            type="text"
                                                            className="w-full mt-3"
                                                            placeholder="Doe"
                                                            value={formData.lastName}
                                                            onChange={handleChange}
                                                            required
                                                        />
                                                    </div>
                                                </div>
                                                <div className="grid gap-3">
                                                    <Label htmlFor="email">Email</Label>
                                                    <Input
                                                        id="email"
                                                        name="email"
                                                        type="email"
                                                        className="w-full"
                                                        placeholder="example@example.com"
                                                        value={formData.email}
                                                        onChange={handleChange}
                                                        required
                                                    />
                                                    <Label htmlFor="phoneNumber">Phone number</Label>
                                                    <Input
                                                        id="phoneNumber"
                                                        name="phoneNumber"
                                                        type="tel"
                                                        className="w-full"
                                                        placeholder="99876XXXXX"
                                                        value={formData.phoneNumber}
                                                        onChange={handleChange}
                                                        required
                                                    />
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                    <Card x-chunk="dashboard-07-chunk-1">
                                        <CardHeader>
                                            <CardTitle>Default address</CardTitle>
                                            <CardDescription>
                                                The primary address of this customer
                                            </CardDescription>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="grid">
                                                <div className='grid gap-3 w-full px-2'>
                                                    <label htmlFor="country">Country/region</label>
                                                    <Select
                                                        value={formData.country}
                                                        onValueChange={handleCountryChange}
                                                    >
                                                        <SelectTrigger
                                                            className="w-full"
                                                        >
                                                            <SelectValue placeholder="Select a country" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            {countries.map((country) => (
                                                                <SelectItem key={country.code} value={country.code}>
                                                                    {country.name}
                                                                </SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>
                                                </div>
                                                <div className='grid gap-3 w-full px-2'>
                                                    <div className='grid md:grid-cols-2 gap-3 w-full px-2 mt-5'>
                                                        <div>
                                                            <label htmlFor="company">Company</label>
                                                            <Input
                                                                id="company"
                                                                name="company"
                                                                type="text"
                                                                className="w-full"
                                                                value={formData.address.company}
                                                                onChange={handleAddressChange}
                                                            />
                                                        </div>
                                                        <div>
                                                            <label htmlFor="pincode">Pincode</label>
                                                            <Input
                                                                id="pincode"
                                                                name="pincode"
                                                                type="number"
                                                                className="w-full"
                                                                value={formData.address.pincode}
                                                                onChange={handleAddressChange}
                                                            />
                                                        </div>
                                                    </div>
                                                    <label htmlFor="address">Address</label>
                                                    <Input
                                                        id="address"
                                                        name="address"
                                                        type="text"
                                                        className="w-full"
                                                        value={formData.address.address}
                                                        onChange={handleAddressChange}
                                                    />
                                                    <div className='grid md:grid-cols-2 gap-3 w-full px-2 mt-5'>
                                                        <div>
                                                            <label htmlFor="landmark">Landmark</label>
                                                            <Input
                                                                id="landmark"
                                                                name="landmark"
                                                                type="text"
                                                                className="w-full"
                                                                value={formData.address.landmark}
                                                                onChange={handleAddressChange}
                                                            />
                                                        </div>
                                                        <div>
                                                            <label htmlFor="phone">Phone</label>
                                                            <Input
                                                                id="phone"
                                                                name="phone"
                                                                type="number"
                                                                className="w-full"
                                                                value={formData.address.phone}
                                                                onChange={handleAddressChange}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='grid md:grid-cols-2 gap-3 w-full px-2 mt-5'>
                                                    <div>
                                                        <label htmlFor="city">City</label>
                                                        <Input
                                                            id="city"
                                                            name="city"
                                                            type="text"
                                                            className="w-full"
                                                            value={formData.address.city}
                                                            onChange={handleAddressChange}
                                                        />
                                                    </div>
                                                    <div>
                                                        <label htmlFor="state">State</label>
                                                        <Input
                                                            id="state"
                                                            name="state"
                                                            type="text"
                                                            className="w-full"
                                                            value={formData.address.state}
                                                            onChange={handleAddressChange}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </div>

                                <Card className='h-50'>
                                    <CardHeader>
                                        <CardTitle>Notes</CardTitle>
                                        <CardDescription>
                                            Notes are private and won&apos;t be shared with the customer.
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <Textarea
                                            id="notes"
                                            name="notes"
                                            className="w-full h-40 p-2 border rounded"
                                            placeholder="Additional notes..."
                                            value={formData.notes}
                                            onChange={handleChange}
                                        />
                                    </CardContent>
                                </Card>
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Tags</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="flex flex-wrap gap-2">

                                            <TagsInput
                                                tags={tags} // Use the tags state
                                                setTags={setTags} // Pass the setTags function
                                                onTagsChange={handleTagsChange} // Callback to update formData
                                            />

                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                        <div className="flex justify-end gap-4 mt-4">
                            <Button type="button" variant="outline">
                                Discard
                            </Button>
                            <Button type="submit">Add Customer</Button>
                        </div>
                    </form>
                </main>
            </div>
        </div>
    );
};

export default CustomerNewPage;
