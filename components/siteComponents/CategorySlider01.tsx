
import { Button } from "@/components/ui/button"
import Image from "next/image";

export function CategorySlider01() {
  return (
    <div className="w-full py-6">
      <div className="container px-4 md:px-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Shop by Category</h2>
          <div className="flex items-center gap-4 md:gap-6 lg:gap-8">
            <Button variant="ghost" size="icon">
              <ChevronLeftIcon className="h-5 w-5 md:h-10 md:w-10 lg:h-16 lg:w-16" />
              <span className="sr-only">Previous</span>
            </Button>
            <Button variant="ghost" size="icon">
              <ChevronRightIcon className="h-5 w-5 md:h-10 md:w-10 lg:h-16 lg:w-16" />
              <span className="sr-only">Next</span>
            </Button>
          </div>
        </div>
        <div className="mt-6 overflow-x-auto scrollbar-hide">
          <div className="flex gap-4">
            <div className="flex flex-col items-center gap-2">
              <div className="relative h-16 w-16">
                <Image
                  src="/placeholder.svg"
                  alt="Category Icon"
                  width={64}
                  height={64}
                  className="rounded-full object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center rounded-full bg-primary/80 text-primary-foreground opacity-0 transition-opacity group-hover:opacity-100">
                  <ShirtIcon className="h-6 w-6" />
                </div>
              </div>
              <span className="text-sm font-medium">Clothing</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="relative h-16 w-16">
                <Image
                  src="/placeholder.svg"
                  alt="Category Icon"
                  width={64}
                  height={64}
                  className="rounded-full object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center rounded-full bg-primary/80 text-primary-foreground opacity-0 transition-opacity group-hover:opacity-100">
                  <FootprintsIcon className="h-6 w-6" />
                </div>
              </div>
              <span className="text-sm font-medium">Shoes</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="relative h-16 w-16">
                <Image
                  src="/placeholder.svg"
                  alt="Category Icon"
                  width={64}
                  height={64}
                  className="rounded-full object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center rounded-full bg-primary/80 text-primary-foreground opacity-0 transition-opacity group-hover:opacity-100">
                  <ShoppingBagIcon className="h-6 w-6" />
                </div>
              </div>
              <span className="text-sm font-medium">Bags</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="relative h-16 w-16">
                <Image
                  src="/placeholder.svg"
                  alt="Category Icon"
                  width={64}
                  height={64}
                  className="rounded-full object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center rounded-full bg-primary/80 text-primary-foreground opacity-0 transition-opacity group-hover:opacity-100">
                  <WatchIcon className="h-6 w-6" />
                </div>
              </div>
              <span className="text-sm font-medium">Accessories</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="relative h-16 w-16">
                <Image
                  src="/placeholder.svg"
                  alt="Category Icon"
                  width={64}
                  height={64}
                  className="rounded-full object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center rounded-full bg-primary/80 text-primary-foreground opacity-0 transition-opacity group-hover:opacity-100">
                  <SofaIcon className="h-6 w-6" />
                </div>
              </div>
              <span className="text-sm font-medium">Home</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="relative h-16 w-16">
                <Image
                  src="/placeholder.svg"
                  alt="Category Icon"
                  width={64}
                  height={64}
                  className="rounded-full object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center rounded-full bg-primary/80 text-primary-foreground opacity-0 transition-opacity group-hover:opacity-100">
                  <GamepadIcon className="h-6 w-6" />
                </div>
              </div>
              <span className="text-sm font-medium">Electronics</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function ChevronLeftIcon(props: PageProps) {
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
      <path d="m15 18-6-6 6-6" />
    </svg>
  )
}

type PageProps = any

function ChevronRightIcon(props: PageProps) {
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
      <path d="m9 18 6-6-6-6" />
    </svg>
  )
}


function FootprintsIcon(props: PageProps) {
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
      <path d="M4 16v-2.38C4 11.5 2.97 10.5 3 8c.03-2.72 1.49-6 4.5-6C9.37 2 10 3.8 10 5.5c0 3.11-2 5.66-2 8.68V16a2 2 0 1 1-4 0Z" />
      <path d="M20 20v-2.38c0-2.12 1.03-3.12 1-5.62-.03-2.72-1.49-6-4.5-6C14.63 6 14 7.8 14 9.5c0 3.11 2 5.66 2 8.68V20a2 2 0 1 0 4 0Z" />
      <path d="M16 17h4" />
      <path d="M4 13h4" />
    </svg>
  )
}



function GamepadIcon(props: PageProps) {
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
      <line x1="6" x2="10" y1="12" y2="12" />
      <line x1="8" x2="8" y1="10" y2="14" />
      <line x1="15" x2="15.01" y1="13" y2="13" />
      <line x1="18" x2="18.01" y1="11" y2="11" />
      <rect width="20" height="12" x="2" y="6" rx="2" />
    </svg>
  )
}


function ShirtIcon(props: PageProps) {
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
      <path d="M20.38 3.46 16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z" />
    </svg>
  )
}


function ShoppingBagIcon(props: PageProps) {
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
      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
      <path d="M3 6h18" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
  )
}


function SofaIcon(props: PageProps) {
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
      <path d="M20 9V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v3" />
      <path d="M2 11v5a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-5a2 2 0 0 0-4 0v2H6v-2a2 2 0 0 0-4 0Z" />
      <path d="M4 18v2" />
      <path d="M20 18v2" />
      <path d="M12 4v9" />
    </svg>
  )
}


function WatchIcon(props: PageProps) {
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
      <circle cx="12" cy="12" r="6" />
      <polyline points="12 10 12 12 13 13" />
      <path d="m16.13 7.66-.81-4.05a2 2 0 0 0-2-1.61h-2.68a2 2 0 0 0-2 1.61l-.78 4.05" />
      <path d="m7.88 16.36.8 4a2 2 0 0 0 2 1.61h2.72a2 2 0 0 0 2-1.61l.81-4.05" />
    </svg>
  )
}


function XIcon(props: PageProps) {
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
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  )
}
