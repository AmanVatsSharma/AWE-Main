import { redirect } from 'next/navigation'
import React from 'react'

type Props = {}

const DashboardPage = (props: Props) => {
  return redirect('/dashboard/home')
}

export default DashboardPage