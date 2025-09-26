"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Scale, Clock } from "lucide-react"
import type { Product } from "./product-grid"

interface ProductCardProps {
  product: Product
  onClick: () => void
}

export function ProductCard({ product, onClick }: ProductCardProps) {
  return (
    <Card
      className="cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-[1.02] bg-card border-border"
      onClick={onClick}
    >
      <div className="relative overflow-hidden rounded-t-lg">
        <img src={product.image || "/placeholder.svg"} alt={product.name} className="w-full h-48 object-cover" />
        <Badge className="absolute top-3 right-3 bg-primary text-primary-foreground">{product.category}</Badge>
      </div>

      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-card-foreground">{product.name}</h3>
          <span className="text-xl font-bold text-primary">${product.price.toLocaleString('en-US')}</span>
        </div>

        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{product.description}</p>

        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <MapPin className="h-3 w-3" />
            <span>{product.origin}</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Scale className="h-3 w-3" />
            <span>{product.weight}</span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <Clock className="h-3 w-3 text-green-600" />
            <span className="text-green-600 font-medium">{product.freshness}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
