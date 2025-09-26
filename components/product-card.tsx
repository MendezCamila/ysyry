"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Scale, Package, Calendar, Percent } from "lucide-react"
import type { Product } from "./product-grid"

interface ProductCardProps {
  product: Product
  onClick: () => void
}

export function ProductCard({ product, onClick }: ProductCardProps) {
  const discountPercentage = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0

  return (
    <Card
      className="cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-[1.02] bg-card border-border relative"
      onClick={onClick}
    >
      <div className="relative overflow-hidden rounded-t-lg">
        <img src={product.image || "/placeholder.svg"} alt={product.name} className="w-full h-48 object-cover" />
        <Badge className="absolute top-3 right-3 bg-primary text-primary-foreground">{product.type}</Badge>

        {product.isNearExpiration && product.originalPrice && (
          <div className="absolute top-3 left-3 bg-gradient-to-r from-red-500 to-red-600 text-white px-3 py-2 rounded-lg text-sm font-bold flex items-center gap-1 shadow-lg animate-pulse">
            <Percent className="h-4 w-4" />
            {discountPercentage}% OFF
          </div>
        )}
      </div>

      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-card-foreground">{product.name}</h3>
          <div className="text-right">
            {product.originalPrice && (
              <span className="text-sm text-muted-foreground line-through block">
                ${product.originalPrice.toLocaleString('en-US')}
              </span>
            )}
            <span className="text-xl font-bold text-primary">${product.price.toLocaleString('en-US')}</span>
            {product.type === "Pescado por caja" ? (
              <div className="text-xs text-muted-foreground">
                <span className="block">caja ({product.weight})</span>
                {product.pricePerKg && (
                  <span className="text-primary font-medium">${product.pricePerKg.toLocaleString('en-US')}/kg</span>
                )}
              </div>
            ) : (
              <span className="text-xs text-muted-foreground block">por pack</span>
            )}
          </div>
        </div>

        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{product.description}</p>

        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <MapPin className="h-3 w-3" />
            <span>{product.origin}</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Scale className="h-3 w-3" />
            {product.type === "Pescado por caja" ? (
              <span>Caja de {product.weight}</span>
            ) : (
              <span>{product.weight}</span>
            )}
          </div>
          <div className="flex items-center gap-2 text-xs">
            <Package className="h-3 w-3 text-blue-600" />
            <span className="text-blue-600 font-medium">{product.type}</span>
          </div>
          {product.type === "Pescado procesado" && product.isNearExpiration && (
            <div className="flex items-center gap-2 text-xs">
              <Calendar className="h-3 w-3 text-red-600" />
              <span className="text-red-600 font-medium">¡Próximo a vencer!</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
