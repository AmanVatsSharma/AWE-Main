// import React from 'react'

// type Props = {}

// const ContentPage = (props: Props) => {
//   return (
//     <div>ContentPage</div>
//   )
// }

// export default ContentPage



import Link from "next/link"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter } from "@/components/ui/card"

export default function Component() {
  return (
    <div className="flex min-h-screen w-full bg-background">
      <aside className="hidden h-full border-r bg-muted/40 md:flex md:w-64 md:flex-col">
        <div className="flex h-16 items-center justify-between border-b px-4">
          <Link href="#" className="flex items-center gap-2 font-semibold" prefetch={false}>
            <CloudIcon className="h-6 w-6" />
            <span>Cloud Storage</span>
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder-user.jpg" alt="@shadcn" />
                  <AvatarFallback>JP</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>My Account</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <nav className="flex-1 overflow-auto px-4 py-6">
          <ul className="grid gap-2">
            <li>
              <Link
                href="#"
                className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
                prefetch={false}
              >
                <HomeIcon className="h-4 w-4" />
                Home
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
                prefetch={false}
              >
                <FolderIcon className="h-4 w-4" />
                My Files
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
                prefetch={false}
              >
                <ShareIcon className="h-4 w-4" />
                Shared with me
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
                prefetch={false}
              >
                <TrashIcon className="h-4 w-4" />
                Trash
              </Link>
            </li>
          </ul>
        </nav>
        <div className="border-t px-4 py-6">
          <Button size="sm" variant="outline" className="w-full">
            <UploadIcon className="h-4 w-4 mr-2" />
            Upload
          </Button>
        </div>
      </aside>
      <div className="flex flex-1 flex-col">
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b bg-background px-4 md:px-6">
          <div className="relative flex-1 md:max-w-md">
            <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search files and folders..."
              className="w-full rounded-lg bg-muted pl-8 pr-4"
            />
          </div>
          <div className="flex items-center gap-4">
            <Button size="icon" variant="ghost">
              <LayoutGridIcon className="h-5 w-5" />
              <span className="sr-only">Grid view</span>
            </Button>
            <Button size="icon" variant="ghost">
              <ListIcon className="h-5 w-5" />
              <span className="sr-only">List view</span>
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button size="icon" variant="ghost">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder-user.jpg" alt="@shadcn" />
                    <AvatarFallback>JP</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>My Account</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>
        <main className="flex-1 overflow-auto">
          <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            <Card className="group">
              <CardContent className="flex flex-col items-center justify-center gap-2 p-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted/50 transition-colors group-hover:bg-accent group-hover:text-accent-foreground">
                  <FolderIcon className="h-8 w-8" />
                </div>
                <div className="text-center">
                  <h3 className="text-sm font-medium">Documents</h3>
                  <p className="text-xs text-muted-foreground">12 files</p>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end gap-2 p-2">
                <Button size="icon" variant="ghost">
                  <DownloadIcon className="h-4 w-4" />
                  <span className="sr-only">Download</span>
                </Button>
                <Button size="icon" variant="ghost">
                  <ShareIcon className="h-4 w-4" />
                  <span className="sr-only">Share</span>
                </Button>
                <Button size="icon" variant="ghost">
                  <MoveVerticalIcon className="h-4 w-4" />
                  <span className="sr-only">More</span>
                </Button>
              </CardFooter>
            </Card>
            <Card className="group">
              <CardContent className="flex flex-col items-center justify-center gap-2 p-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted/50 transition-colors group-hover:bg-accent group-hover:text-accent-foreground">
                  <FolderIcon className="h-8 w-8" />
                </div>
                <div className="text-center">
                  <h3 className="text-sm font-medium">Images</h3>
                  <p className="text-xs text-muted-foreground">45 files</p>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end gap-2 p-2">
                <Button size="icon" variant="ghost">
                  <DownloadIcon className="h-4 w-4" />
                  <span className="sr-only">Download</span>
                </Button>
                <Button size="icon" variant="ghost">
                  <ShareIcon className="h-4 w-4" />
                  <span className="sr-only">Share</span>
                </Button>
                <Button size="icon" variant="ghost">
                  <MoveVerticalIcon className="h-4 w-4" />
                  <span className="sr-only">More</span>
                </Button>
              </CardFooter>
            </Card>
            <Card className="group">
              <CardContent className="flex flex-col items-center justify-center gap-2 p-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted/50 transition-colors group-hover:bg-accent group-hover:text-accent-foreground">
                  <FolderIcon className="h-8 w-8" />
                </div>
                <div className="text-center">
                  <h3 className="text-sm font-medium">Music</h3>
                  <p className="text-xs text-muted-foreground">23 files</p>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end gap-2 p-2">
                <Button size="icon" variant="ghost">
                  <DownloadIcon className="h-4 w-4" />
                  <span className="sr-only">Download</span>
                </Button>
                <Button size="icon" variant="ghost">
                  <ShareIcon className="h-4 w-4" />
                  <span className="sr-only">Share</span>
                </Button>
                <Button size="icon" variant="ghost">
                  <MoveVerticalIcon className="h-4 w-4" />
                  <span className="sr-only">More</span>
                </Button>
              </CardFooter>
            </Card>
            <Card className="group">
              <CardContent className="flex flex-col items-center justify-center gap-2 p-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted/50 transition-colors group-hover:bg-accent group-hover:text-accent-foreground">
                  <FolderIcon className="h-8 w-8" />
                </div>
                <div className="text-center">
                  <h3 className="text-sm font-medium">Videos</h3>
                  <p className="text-xs text-muted-foreground">17 files</p>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end gap-2 p-2">
                <Button size="icon" variant="ghost">
                  <DownloadIcon className="h-4 w-4" />
                  <span className="sr-only">Download</span>
                </Button>
                <Button size="icon" variant="ghost">
                  <ShareIcon className="h-4 w-4" />
                  <span className="sr-only">Share</span>
                </Button>
                <Button size="icon" variant="ghost">
                  <MoveVerticalIcon className="h-4 w-4" />
                  <span className="sr-only">More</span>
                </Button>
              </CardFooter>
            </Card>
            <Card className="group">
              <CardContent className="flex flex-col items-center justify-center gap-2 p-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted/50 transition-colors group-hover:bg-accent group-hover:text-accent-foreground">
                  <FileIcon className="h-8 w-8" />
                </div>
                <div className="text-center">
                  <h3 className="text-sm font-medium">Resume.pdf</h3>
                  <p className="text-xs text-muted-foreground">12.3 MB</p>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end gap-2 p-2">
                <Button size="icon" variant="ghost">
                  <DownloadIcon className="h-4 w-4" />
                  <span className="sr-only">Download</span>
                </Button>
                <Button size="icon" variant="ghost">
                  <ShareIcon className="h-4 w-4" />
                  <span className="sr-only">Share</span>
                </Button>
                <Button size="icon" variant="ghost">
                  <MoveVerticalIcon className="h-4 w-4" />
                  <span className="sr-only">More</span>
                </Button>
              </CardFooter>
            </Card>
            <Card className="group">
              <CardContent className="flex flex-col items-center justify-center gap-2 p-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted/50 transition-colors group-hover:bg-accent group-hover:text-accent-foreground">
                  <FileIcon className="h-8 w-8" />
                </div>
                <div className="text-center">
                  <h3 className="text-sm font-medium">Presentation.pptx</h3>
                  <p className="text-xs text-muted-foreground">25.7 MB</p>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end gap-2 p-2">
                <Button size="icon" variant="ghost">
                  <DownloadIcon className="h-4 w-4" />
                  <span className="sr-only">Download</span>
                </Button>
                <Button size="icon" variant="ghost">
                  <ShareIcon className="h-4 w-4" />
                  <span className="sr-only">Share</span>
                </Button>
                <Button size="icon" variant="ghost">
                  <MoveVerticalIcon className="h-4 w-4" />
                  <span className="sr-only">More</span>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}

function CloudIcon(props:any) {
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
      <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
    </svg>
  )
}


function DownloadIcon(props:any) {
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
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" x2="12" y1="15" y2="3" />
    </svg>
  )
}


function FileIcon(props:any) {
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
      <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
      <path d="M14 2v4a2 2 0 0 0 2 2h4" />
    </svg>
  )
}


function FolderIcon(props:any) {
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
      <path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z" />
    </svg>
  )
}


function HomeIcon(props:any) {
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
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  )
}


function LayoutGridIcon(props:any) {
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
      <rect width="7" height="7" x="3" y="3" rx="1" />
      <rect width="7" height="7" x="14" y="3" rx="1" />
      <rect width="7" height="7" x="14" y="14" rx="1" />
      <rect width="7" height="7" x="3" y="14" rx="1" />
    </svg>
  )
}


function ListIcon(props:any) {
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
      <line x1="8" x2="21" y1="6" y2="6" />
      <line x1="8" x2="21" y1="12" y2="12" />
      <line x1="8" x2="21" y1="18" y2="18" />
      <line x1="3" x2="3.01" y1="6" y2="6" />
      <line x1="3" x2="3.01" y1="12" y2="12" />
      <line x1="3" x2="3.01" y1="18" y2="18" />
    </svg>
  )
}


function MoveVerticalIcon(props:any) {
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
      <polyline points="8 18 12 22 16 18" />
      <polyline points="8 6 12 2 16 6" />
      <line x1="12" x2="12" y1="2" y2="22" />
    </svg>
  )
}


function SearchIcon(props:any) {
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
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  )
}


function ShareIcon(props:any) {
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
      <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
      <polyline points="16 6 12 2 8 6" />
      <line x1="12" x2="12" y1="2" y2="15" />
    </svg>
  )
}


function TrashIcon(props:any) {
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
      <path d="M3 6h18" />
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
    </svg>
  )
}


function UploadIcon(props:any) {
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
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="17 8 12 3 7 8" />
      <line x1="12" x2="12" y1="3" y2="15" />
    </svg>
  )
}




// import Link from "next/link"
// import { NavigationMenu, NavigationMenuList, NavigationMenuLink } from "@/components/ui/navigation-menu"
// import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet"
// import { Button } from "@/components/ui/button"
// import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu"
// import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
// import { Progress } from "@/components/ui/progress"
// import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"

// export default function Component() {
//   return (
//     <div className="flex min-h-screen w-full flex-col bg-muted/40">
//       <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
//         <Link href="#" className="flex items-center gap-2 font-semibold" prefetch={false}>
//           <CloudIcon className="h-6 w-6" />
//           <span className="text-lg">Cloud Storage</span>
//         </Link>
//         <NavigationMenu className="ml-auto hidden lg:flex">
//           <NavigationMenuList>
//             <NavigationMenuLink asChild>
//               <Link href="#" className="px-4 py-2 text-sm font-medium" prefetch={false}>
//                 Files
//               </Link>
//             </NavigationMenuLink>
//             <NavigationMenuLink asChild>
//               <Link href="#" className="px-4 py-2 text-sm font-medium" prefetch={false}>
//                 Folders
//               </Link>
//             </NavigationMenuLink>
//             <NavigationMenuLink asChild>
//               <Link href="#" className="px-4 py-2 text-sm font-medium" prefetch={false}>
//                 Shared
//               </Link>
//             </NavigationMenuLink>
//             <NavigationMenuLink asChild>
//               <Link href="#" className="px-4 py-2 text-sm font-medium" prefetch={false}>
//                 Trash
//               </Link>
//             </NavigationMenuLink>
//           </NavigationMenuList>
//         </NavigationMenu>
//         <Sheet>
//           <SheetTrigger asChild>
//             <Button variant="outline" size="icon" className="lg:hidden">
//               <MenuIcon className="h-6 w-6" />
//               <span className="sr-only">Toggle navigation menu</span>
//             </Button>
//           </SheetTrigger>
//           <SheetContent side="left" className="sm:max-w-xs">
//             <nav className="grid gap-6 text-lg font-medium">
//               <Link href="#" className="flex items-center gap-4 px-2.5" prefetch={false}>
//                 <CloudIcon className="h-5 w-5" />
//                 Files
//               </Link>
//               <Link href="#" className="flex items-center gap-4 px-2.5" prefetch={false}>
//                 <FolderIcon className="h-5 w-5" />
//                 Folders
//               </Link>
//               <Link href="#" className="flex items-center gap-4 px-2.5" prefetch={false}>
//                 <ShareIcon className="h-5 w-5" />
//                 Shared
//               </Link>
//               <Link href="#" className="flex items-center gap-4 px-2.5" prefetch={false}>
//                 <TrashIcon className="h-5 w-5" />
//                 Trash
//               </Link>
//             </nav>
//           </SheetContent>
//         </Sheet>
//         <div className="ml-auto flex items-center gap-2">
//           <Button variant="outline" size="icon">
//             <UploadIcon className="h-4 w-4" />
//             <span className="sr-only">Upload</span>
//           </Button>
//           <DropdownMenu>
//             <DropdownMenuTrigger asChild>
//               <Button variant="outline" size="icon">
//                 <MoveHorizontalIcon className="h-4 w-4" />
//                 <span className="sr-only">More options</span>
//               </Button>
//             </DropdownMenuTrigger>
//             <DropdownMenuContent align="end">
//               <DropdownMenuItem>
//                 <DownloadIcon className="mr-2 h-4 w-4" />
//                 Download
//               </DropdownMenuItem>
//               <DropdownMenuItem>
//                 <ShareIcon className="mr-2 h-4 w-4" />
//                 Share
//               </DropdownMenuItem>
//               <DropdownMenuItem>
//                 <TrashIcon className="mr-2 h-4 w-4" />
//                 Delete
//               </DropdownMenuItem>
//             </DropdownMenuContent>
//           </DropdownMenu>
//         </div>
//       </header>
//       <div className="flex flex-1 gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
//         <div className="hidden w-64 flex-col gap-4 lg:flex">
//           <Card className="p-4">
//             <CardHeader>
//               <CardTitle>Recent Activity</CardTitle>
//             </CardHeader>
//             <CardContent>
//               <div className="grid gap-2">
//                 <div className="flex items-center gap-2">
//                   <FileIcon className="h-4 w-4 text-muted-foreground" />
//                   <div>
//                     <p className="font-medium">New file uploaded</p>
//                     <p className="text-sm text-muted-foreground">2 hours ago</p>
//                   </div>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <FolderIcon className="h-4 w-4 text-muted-foreground" />
//                   <div>
//                     <p className="font-medium">New folder created</p>
//                     <p className="text-sm text-muted-foreground">4 hours ago</p>
//                   </div>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <ShareIcon className="h-4 w-4 text-muted-foreground" />
//                   <div>
//                     <p className="font-medium">File shared</p>
//                     <p className="text-sm text-muted-foreground">1 day ago</p>
//                   </div>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
//           <Card className="p-4">
//             <CardHeader>
//               <CardTitle>Storage Usage</CardTitle>
//             </CardHeader>
//             <CardContent>
//               <div className="grid gap-2">
//                 <div className="flex items-center justify-between">
//                   <span>Used</span>
//                   <span>12.5 GB</span>
//                 </div>
//                 <Progress value={50} aria-label="50% used" />
//                 <div className="flex items-center justify-between">
//                   <span>Available</span>
//                   <span>25 GB</span>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
//           <Card className="p-4">
//             <CardHeader>
//               <CardTitle>Settings</CardTitle>
//             </CardHeader>
//             <CardContent>
//               <div className="grid gap-2">
//                 <Link href="#" className="flex items-center gap-2" prefetch={false}>
//                   <SettingsIcon className="h-4 w-4 text-muted-foreground" />
//                   <span>Account Settings</span>
//                 </Link>
//                 <Link href="#" className="flex items-center gap-2" prefetch={false}>
//                   <LockIcon className="h-4 w-4 text-muted-foreground" />
//                   <span>Security</span>
//                 </Link>
//                 <Link href="#" className="flex items-center gap-2" prefetch={false}>
//                   <MailsIcon className="h-4 w-4 text-muted-foreground" />
//                   <span>Notifications</span>
//                 </Link>
//               </div>
//             </CardContent>
//           </Card>
//         </div>
//         <div className="flex-1">
//           <Card className="border-0 shadow-none">
//             <CardHeader className="pb-4">
//               <CardTitle>All Files</CardTitle>
//               <div className="ml-auto flex items-center gap-2">
//                 <Button variant="outline" size="sm" className="h-8 gap-1">
//                   <FilterIcon className="h-3.5 w-3.5" />
//                   <span className="sr-only sm:not-sr-only">Filter</span>
//                 </Button>
//                 <Button variant="outline" size="sm" className="h-8 gap-1">
//                   <ListOrderedIcon className="h-3.5 w-3.5" />
//                   <span className="sr-only sm:not-sr-only">Sort</span>
//                 </Button>
//                 <Button size="sm" className="h-8 gap-1">
//                   <UploadIcon className="h-3.5 w-3.5" />
//                   <span className="sr-only sm:not-sr-only">Upload</span>
//                 </Button>
//               </div>
//             </CardHeader>
//             <CardContent>
//               <Table>
//                 <TableHeader>
//                   <TableRow>
//                     <TableHead>Name</TableHead>
//                     <TableHead className="hidden sm:table-cell">Size</TableHead>
//                     <TableHead className="hidden sm:table-cell">Modified</TableHead>
//                     <TableHead>Actions</TableHead>
//                   </TableRow>
//                 </TableHeader>
//                 <TableBody>
//                   <TableRow>
//                     <TableCell>
//                       <div className="flex items-center gap-2">
//                         <FileIcon className="h-4 w-4 text-muted-foreground" />
//                         <span className="font-medium">Document.docx</span>
//                       </div>
//                     </TableCell>
//                     <TableCell className="hidden sm:table-cell">12.5 MB</TableCell>
//                     <TableCell className="hidden sm:table-cell">2 hours ago</TableCell>
//                     <TableCell>
//                       <DropdownMenu>
//                         <DropdownMenuTrigger asChild>
//                           <Button variant="ghost" size="icon">
//                             <MoveHorizontalIcon className="h-4 w-4" />
//                             <span className="sr-only">More options</span>
//                           </Button>
//                         </DropdownMenuTrigger>
//                         <DropdownMenuContent align="end">
//                           <DropdownMenuItem>
//                             <DownloadIcon className="mr-2 h-4 w-4" />
//                             Download
//                           </DropdownMenuItem>
//                           <DropdownMenuItem>
//                             <ShareIcon className="mr-2 h-4 w-4" />
//                             Share
//                           </DropdownMenuItem>
//                           <DropdownMenuItem>
//                             <TrashIcon className="mr-2 h-4 w-4" />
//                             Delete
//                           </DropdownMenuItem>
//                         </DropdownMenuContent>
//                       </DropdownMenu>
//                     </TableCell>
//                   </TableRow>
//                   <TableRow>
//                     <TableCell>
//                       <div className="flex items-center gap-2">
//                         <FolderIcon className="h-4 w-4 text-muted-foreground" />
//                         <span className="font-medium">Project Files</span>
//                       </div>
//                     </TableCell>
//                     <TableCell className="hidden sm:table-cell">125 MB</TableCell>
//                     <TableCell className="hidden sm:table-cell">4 hours ago</TableCell>
//                     <TableCell>
//                       <DropdownMenu>
//                         <DropdownMenuTrigger asChild>
//                           <Button variant="ghost" size="icon">
//                             <MoveHorizontalIcon className="h-4 w-4" />
//                             <span className="sr-only">More options</span>
//                           </Button>
//                         </DropdownMenuTrigger>
//                         <DropdownMenuContent align="end">
//                           <DropdownMenuItem>
//                             <DownloadIcon className="mr-2 h-4 w-4" />
//                             Download
//                           </DropdownMenuItem>
//                           <DropdownMenuItem>
//                             <ShareIcon className="mr-2 h-4 w-4" />
//                             Share
//                           </DropdownMenuItem>
//                           <DropdownMenuItem>
//                             <TrashIcon className="mr-2 h-4 w-4" />
//                             Delete
//                           </DropdownMenuItem>
//                         </DropdownMenuContent>
//                       </DropdownMenu>
//                     </TableCell>
//                   </TableRow>
//                   <TableRow>
//                     <TableCell>
//                       <div className="flex items-center gap-2">
//                         <FileIcon className="h-4 w-4 text-muted-foreground" />
//                         <span className="font-medium">Presentation.pptx</span>
//                       </div>
//                     </TableCell>
//                     <TableCell className="hidden sm:table-cell">25 MB</TableCell>
//                     <TableCell className="hidden sm:table-cell">1 day ago</TableCell>
//                     <TableCell>
//                       <DropdownMenu>
//                         <DropdownMenuTrigger asChild>
//                           <Button variant="ghost" size="icon">
//                             <MoveHorizontalIcon className="h-4 w-4" />
//                             <span className="sr-only">More options</span>
//                           </Button>
//                         </DropdownMenuTrigger>
//                         <DropdownMenuContent align="end">
//                           <DropdownMenuItem>
//                             <DownloadIcon className="mr-2 h-4 w-4" />
//                             Download
//                           </DropdownMenuItem>
//                           <DropdownMenuItem>
//                             <ShareIcon className="mr-2 h-4 w-4" />
//                             Share
//                           </DropdownMenuItem>
//                           <DropdownMenuItem>
//                             <TrashIcon className="mr-2 h-4 w-4" />
//                             Delete
//                           </DropdownMenuItem>
//                         </DropdownMenuContent>
//                       </DropdownMenu>
//                     </TableCell>
//                   </TableRow>
//                   <TableRow>
//                     <TableCell>
//                       <div className="flex items-center gap-2">
//                         <FileIcon className="h-4 w-4 text-muted-foreground" />
//                         <span className="font-medium">Image.jpg</span>
//                       </div>
//                     </TableCell>
//                     <TableCell className="hidden sm:table-cell">5 MB</TableCell>
//                     <TableCell className="hidden sm:table-cell">2 days ago</TableCell>
//                     <TableCell>
//                       <DropdownMenu>
//                         <DropdownMenuTrigger asChild>
//                           <Button variant="ghost" size="icon">
//                             <MoveHorizontalIcon className="h-4 w-4" />
//                             <span className="sr-only">More options</span>
//                           </Button>
//                         </DropdownMenuTrigger>
//                         <DropdownMenuContent align="end">
//                           <DropdownMenuItem>
//                             <DownloadIcon className="mr-2 h-4 w-4" />
//                             Download
//                           </DropdownMenuItem>
//                           <DropdownMenuItem>
//                             <ShareIcon className="mr-2 h-4 w-4" />
//                             Share
//                           </DropdownMenuItem>
//                           <DropdownMenuItem>
//                             <TrashIcon className="mr-2 h-4 w-4" />
//                             Delete
//                           </DropdownMenuItem>
//                         </DropdownMenuContent>
//                       </DropdownMenu>
//                     </TableCell>
//                   </TableRow>
//                 </TableBody>
//               </Table>
//             </CardContent>
//           </Card>
//         </div>
//       </div>
//     </div>
//   )
// }

// function CloudIcon(props) {
//   return (
//     <svg
//       {...props}
//       xmlns="http://www.w3.org/2000/svg"
//       width="24"
//       height="24"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     >
//       <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
//     </svg>
//   )
// }


// function DownloadIcon(props) {
//   return (
//     <svg
//       {...props}
//       xmlns="http://www.w3.org/2000/svg"
//       width="24"
//       height="24"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     >
//       <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
//       <polyline points="7 10 12 15 17 10" />
//       <line x1="12" x2="12" y1="15" y2="3" />
//     </svg>
//   )
// }


// function FileIcon(props) {
//   return (
//     <svg
//       {...props}
//       xmlns="http://www.w3.org/2000/svg"
//       width="24"
//       height="24"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     >
//       <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
//       <path d="M14 2v4a2 2 0 0 0 2 2h4" />
//     </svg>
//   )
// }


// function FilterIcon(props) {
//   return (
//     <svg
//       {...props}
//       xmlns="http://www.w3.org/2000/svg"
//       width="24"
//       height="24"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     >
//       <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
//     </svg>
//   )
// }


// function FolderIcon(props) {
//   return (
//     <svg
//       {...props}
//       xmlns="http://www.w3.org/2000/svg"
//       width="24"
//       height="24"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     >
//       <path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z" />
//     </svg>
//   )
// }


// function ListOrderedIcon(props) {
//   return (
//     <svg
//       {...props}
//       xmlns="http://www.w3.org/2000/svg"
//       width="24"
//       height="24"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     >
//       <line x1="10" x2="21" y1="6" y2="6" />
//       <line x1="10" x2="21" y1="12" y2="12" />
//       <line x1="10" x2="21" y1="18" y2="18" />
//       <path d="M4 6h1v4" />
//       <path d="M4 10h2" />
//       <path d="M6 18H4c0-1 2-2 2-3s-1-1.5-2-1" />
//     </svg>
//   )
// }


// function LockIcon(props) {
//   return (
//     <svg
//       {...props}
//       xmlns="http://www.w3.org/2000/svg"
//       width="24"
//       height="24"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     >
//       <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
//       <path d="M7 11V7a5 5 0 0 1 10 0v4" />
//     </svg>
//   )
// }


// function MailsIcon(props) {
//   return (
//     <svg
//       {...props}
//       xmlns="http://www.w3.org/2000/svg"
//       width="24"
//       height="24"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     >
//       <rect width="16" height="13" x="6" y="4" rx="2" />
//       <path d="m22 7-7.1 3.78c-.57.3-1.23.3-1.8 0L6 7" />
//       <path d="M2 8v11c0 1.1.9 2 2 2h14" />
//     </svg>
//   )
// }


// function MenuIcon(props) {
//   return (
//     <svg
//       {...props}
//       xmlns="http://www.w3.org/2000/svg"
//       width="24"
//       height="24"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     >
//       <line x1="4" x2="20" y1="12" y2="12" />
//       <line x1="4" x2="20" y1="6" y2="6" />
//       <line x1="4" x2="20" y1="18" y2="18" />
//     </svg>
//   )
// }


// function MoveHorizontalIcon(props) {
//   return (
//     <svg
//       {...props}
//       xmlns="http://www.w3.org/2000/svg"
//       width="24"
//       height="24"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     >
//       <polyline points="18 8 22 12 18 16" />
//       <polyline points="6 8 2 12 6 16" />
//       <line x1="2" x2="22" y1="12" y2="12" />
//     </svg>
//   )
// }


// function SettingsIcon(props) {
//   return (
//     <svg
//       {...props}
//       xmlns="http://www.w3.org/2000/svg"
//       width="24"
//       height="24"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     >
//       <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
//       <circle cx="12" cy="12" r="3" />
//     </svg>
//   )
// }


// function ShareIcon(props) {
//   return (
//     <svg
//       {...props}
//       xmlns="http://www.w3.org/2000/svg"
//       width="24"
//       height="24"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     >
//       <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
//       <polyline points="16 6 12 2 8 6" />
//       <line x1="12" x2="12" y1="2" y2="15" />
//     </svg>
//   )
// }


// function TrashIcon(props) {
//   return (
//     <svg
//       {...props}
//       xmlns="http://www.w3.org/2000/svg"
//       width="24"
//       height="24"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     >
//       <path d="M3 6h18" />
//       <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
//       <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
//     </svg>
//   )
// }


// function UploadIcon(props) {
//   return (
//     <svg
//       {...props}
//       xmlns="http://www.w3.org/2000/svg"
//       width="24"
//       height="24"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     >
//       <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
//       <polyline points="17 8 12 3 7 8" />
//       <line x1="12" x2="12" y1="3" y2="15" />
//     </svg>
//   )
// }