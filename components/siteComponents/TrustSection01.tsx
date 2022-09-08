

export function TrustSection01() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
      <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6 lg:gap-10">
        <div className="space-y-3">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Why Farmers Trust Us</h2>
          <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Our commitment to quality, innovation, and customer service has made us the trusted partner for farmers
            across the country.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col items-center justify-center gap-4 rounded-lg border bg-card p-6 text-center shadow-sm transition-colors hover:bg-card-hover">
            <BadgeCheckIcon className="h-12 w-12 text-primary" />
            <h3 className="text-lg font-semibold">Quality Assured</h3>
            <p className="text-muted-foreground">
              Our products undergo rigorous testing to ensure the highest standards of quality and safety.
            </p>
          </div>
          <div className="flex flex-col items-center justify-center gap-4 rounded-lg border bg-card p-6 text-center shadow-sm transition-colors hover:bg-card-hover">
            <GaugeIcon className="h-12 w-12 text-primary" />
            <h3 className="text-lg font-semibold">Fast Delivery</h3>
            <p className="text-muted-foreground">
              We prioritize prompt delivery to ensure your tools and equipment arrive when you need them.
            </p>
          </div>
          <div className="flex flex-col items-center justify-center gap-4 rounded-lg border bg-card p-6 text-center shadow-sm transition-colors hover:bg-card-hover">
            <HeadphonesIcon className="h-12 w-12 text-primary" />
            <h3 className="text-lg font-semibold">Expert Support</h3>
            <p className="text-muted-foreground">
              Our knowledgeable team is always available to provide personalized assistance and answer your questions.
            </p>
          </div>
          <div className="flex flex-col items-center justify-center gap-4 rounded-lg border bg-card p-6 text-center shadow-sm transition-colors hover:bg-card-hover">
            <TruckIcon className="h-12 w-12 text-primary" />
            <h3 className="text-lg font-semibold">Reliable Logistics</h3>
            <p className="text-muted-foreground">
              Our robust logistics network ensures your orders are delivered safely and on time, every time.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

function BadgeCheckIcon(props: PageProps) {
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
      <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  )
}


function GaugeIcon(props: PageProps) {
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
      <path d="m12 14 4-4" />
      <path d="M3.34 19a10 10 0 1 1 17.32 0" />
    </svg>
  )
}


function HeadphonesIcon(props: PageProps) {
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
      <path d="M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a9 9 0 0 1 18 0v7a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3" />
    </svg>
  )
}


function TruckIcon(props: PageProps) {
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
      <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2" />
      <path d="M15 18H9" />
      <path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14" />
      <circle cx="17" cy="18" r="2" />
      <circle cx="7" cy="18" r="2" />
    </svg>
  )
}

type PageProps = any


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
