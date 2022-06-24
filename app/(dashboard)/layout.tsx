// 'use client'
// import DashboardHeader from "@/components/backend/DashboardHeader"
// import DashboardSidebar from "@/components/backend/DashboardSidebar"
// import { ApolloProvider } from "@apollo/client";
// import client from "@/ApolloClient/apolloClient";

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode
// }) {
//   return (
//     <html lang="en" suppressHydrationWarning>
//       <ApolloProvider client={client}>
//       <body >
//         <DashboardHeader />
//         <div className='mt-[50px] flex scrollbar'>
//           <DashboardSidebar />
//           {children}
//         </div>
//       </body>
//       </ApolloProvider>
//     </html>
//   )
// }



'use client'
import { ApolloProvider } from "@apollo/client";
import client from "@/ApolloClient/apolloClient";
import DashboardHeader from "@/components/backend/DashboardHeader"
import DashboardSidebar from "@/components/backend/DashboardSidebar"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <ApolloProvider client={client}>
        <body>
          <DashboardHeader />
          <div className='mt-[50px] flex h-[calc(100vh-50px)]'>
            <DashboardSidebar />
            <main className="flex-1 overflow-y-auto ">
              {children}
            </main>
          </div>
        </body>
      </ApolloProvider>
    </html>
  )
}