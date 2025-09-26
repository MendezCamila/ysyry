"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, Scale, Clock, ShoppingCart } from "lucide-react"
import type { Product } from "./product-grid"

interface ProductModalProps {
  product: Product
  onClose: () => void
}

export function ProductModal({ product, onClose }: ProductModalProps) {
  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl bg-card text-card-foreground">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-card-foreground">{product.name}</DialogTitle>
        </DialogHeader>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="relative">
            <img
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              className="w-full h-64 md:h-80 object-cover rounded-lg"
            />
            <Badge className="absolute top-3 right-3 bg-primary text-primary-foreground">{product.category}</Badge>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-3xl font-bold text-primary">${product.price.toLocaleString('en-US')}</span>
              <span className="text-sm text-muted-foreground">por unidad</span>
            </div>

            <p className="text-muted-foreground leading-relaxed">{product.description}</p>

            <div className="space-y-3 py-4 border-t border-border">
              <div className="flex items-center gap-3">
                <MapPin className="h-4 w-4 text-primary" />
                <div>
                  <span className="text-sm font-medium">Origen:</span>
                  <span className="text-sm text-muted-foreground ml-2">{product.origin}</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Scale className="h-4 w-4 text-primary" />
                <div>
                  <span className="text-sm font-medium">Peso:</span>
                  <span className="text-sm text-muted-foreground ml-2">{product.weight}</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Clock className="h-4 w-4 text-green-600" />
                <div>
                  <span className="text-sm font-medium">Frescura:</span>
                  <span className="text-sm text-green-600 font-medium ml-2">{product.freshness}</span>
                </div>
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground"
                onClick={() => alert("¡Producto agregado al carrito!")}
              >
                <ShoppingCart className="h-4 w-4 mr-2" />
                Agregar al Carrito
              </Button>
              <Button
                variant="outline"
                onClick={onClose}
                className="border-border text-card-foreground hover:bg-accent bg-transparent"
              >
                Cerrar
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
