"use client"

import { type ReactNode } from "react"
import QueryProvider from "./query-provider"
import { Toaster } from "react-hot-toast"
import { ThemeProvider } from "./theme-provider"

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <QueryProvider>
        {children}
        <Toaster />
      </QueryProvider>
    </ThemeProvider>
  )
}
