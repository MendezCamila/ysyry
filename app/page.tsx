"use client"

import { useState } from "react"
import { ProductGrid } from "@/components/product-grid"
import { Header } from "@/components/header"

export default function HomePage() {
  const [searchTerm, setSearchTerm] = useState("")

  return (
    <div className="min-h-screen bg-background">
      <Header searchTerm={searchTerm} onSearchChange={setSearchTerm} />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2 text-balance">Ysyry</h1>
          <p className="text-lg text-muted-foreground text-pretty">
            Los pescados más frescos directo del océano a tu mesa
          </p>
        </div>
        <ProductGrid searchTerm={searchTerm} />
      </main>
    </div>
  )
}
