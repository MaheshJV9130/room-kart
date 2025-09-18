import { Analytics } from "@vercel/analytics/next"

import React from 'react'

const Analytics = ({children}) => {
  return (
    <Analytics>
      {children}
    </Analytics>
  )
}

export default Analytics
