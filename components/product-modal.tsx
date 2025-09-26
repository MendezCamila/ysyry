"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { MapPin, Scale, Package, Calendar, ShoppingCart, Percent, Minus, Plus, Warehouse, User } from "lucide-react"
import type { Product } from "./product-grid"

interface ProductModalProps {
  product: Product
  onClose: () => void
}

export function ProductModal({ product, onClose }: ProductModalProps) {
  const [quantity, setQuantity] = useState(1)
  const discountPercentage = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("es-AR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })
  }

  const increaseQuantity = () => {
    const maxQuantity = product.type === "Pescado por caja" ? 1 : product.stock
    if (quantity < maxQuantity) {
      setQuantity(quantity + 1)
    }
  }

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }

  const totalPrice = product.price * quantity

  const getProducerInfo = (origin: string) => {
    const producers = {
      "Puerto Iguazú, Misiones": {
        name: "Cooperativa Pesquera Iguazú",
        location: "Puerto Iguazú",
        phone: "(03757) 421-234",
        description: "Especialistas en pesca de río con más de 20 años de experiencia en la región de las Cataratas.",
      },
      "Posadas, Misiones": {
        name: "Pescados del Paraná",
        location: "Posadas",
        phone: "(0376) 443-567",
        description: "Empresa familiar dedicada a la pesca artesanal en el río Paraná desde 1995.",
      },
      "Oberá, Misiones": {
        name: "Procesadora Oberá S.A.",
        location: "Oberá",
        phone: "(03755) 421-890",
        description: "Planta procesadora moderna con certificación HACCP, líder en productos del mar en Misiones.",
      },
      "Eldorado, Misiones": {
        name: "Pesca Eldorado",
        location: "Eldorado",
        phone: "(03751) 421-123",
        description: "Cooperativa de pescadores locales comprometida con la pesca sustentable del río Uruguay.",
      },
      "San Vicente, Misiones": {
        name: "Mariscos San Vicente",
        location: "San Vicente",
        phone: "(03756) 421-456",
        description: "Especialistas en mariscos y crustáceos, con tecnología de conservación de última generación.",
      },
      "Montecarlo, Misiones": {
        name: "Frigorífico Montecarlo",
        location: "Montecarlo",
        phone: "(03751) 421-789",
        description: "Procesamiento y conservación de pescados con estándares internacionales de calidad.",
      },
    }
    return (
      producers[origin as keyof typeof producers] || {
        name: "Productor Local",
        location: "Misiones",
        phone: "(0376) 400-000",
        description: "Productor comprometido con la calidad y frescura de los productos.",
      }
    )
  }

  const producer = getProducerInfo(product.origin)

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl bg-card text-card-foreground max-h-[90vh] overflow-y-auto">
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

            {product.isNearExpiration && (
              <div className="absolute top-3 left-3 bg-red-500 text-white px-3 py-2 rounded-md text-sm font-bold flex items-center gap-2">
                <Percent className="h-4 w-4" />
                {discountPercentage}% DESCUENTO
              </div>
            )}

            {/* Información del Productor */}
            <div className="mt-4 bg-muted/50 rounded-lg p-4 border">
              <div className="flex items-center gap-2 mb-2">
                <User className="h-4 w-4 text-primary" />
                <h4 className="font-semibold text-sm">Información del Productor</h4>
              </div>
              <div className="space-y-1 text-xs text-muted-foreground">
                <p><span className="font-medium">Nombre:</span> {producer.name}</p>
                <p><span className="font-medium">Teléfono:</span> {producer.phone}</p>
                <p><span className="font-medium">Ubicación:</span> {producer.location}</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                {product.originalPrice && (
                  <span className="text-lg text-muted-foreground line-through block">
                    ${product.originalPrice.toLocaleString('en-US')}
                  </span>
                )}
                <span className="text-3xl font-bold text-primary">${product.price.toLocaleString('en-US')}</span>
                {product.type === "Pescado por caja" ? (
                  <div className="text-sm text-muted-foreground ml-2">
                    <span className="block">caja completa ({product.weight})</span>
                    {product.pricePerKg && (
                      <span className="text-primary font-medium">${product.pricePerKg.toLocaleString('en-US')} por kg</span>
                    )}
                  </div>
                ) : (
                  <span className="text-sm text-muted-foreground ml-2">por pack</span>
                )}
              </div>
            </div>

            {product.isNearExpiration && product.originalPrice && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <p className="text-red-700 font-medium text-sm">
                  ¡Ahorrás ${(product.originalPrice - product.price).toLocaleString('en-US')}!
                </p>
                <p className="text-red-600 text-xs">Producto próximo a vencer con descuento especial</p>
              </div>
            )}

            <p className="text-muted-foreground leading-relaxed">{product.description}</p>

            <div className="space-y-3 py-4 border-t border-border">
              <div className="flex items-center gap-3">
                <MapPin className="h-4 w-4 text-primary" />
                <div>
                  <span className="text-sm font-medium">Origen:</span>
                  <span className="text-sm text-muted-foreground ml-2">{product.origin}</span>
                </div>
              </div>

              {product.type === "Pescado por caja" && (
                <div className="flex items-center gap-3">
                  <Scale className="h-4 w-4 text-primary" />
                  <div>
                    <span className="text-sm font-medium">Peso total de la caja:</span>
                    <span className="text-sm text-muted-foreground ml-2">{product.weight}</span>
                  </div>
                </div>
              )}

              <div className="flex items-center gap-3">
                <Package className="h-4 w-4 text-blue-600" />
                <div>
                  <span className="text-sm font-medium">Tipo:</span>
                  <span className="text-sm text-blue-600 font-medium ml-2">{product.type}</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Warehouse className="h-4 w-4 text-green-600" />
                <div>
                  <span className="text-sm font-medium">Disponible:</span>
                  <span className="text-sm text-green-600 font-medium ml-2">
                    {product.stock} {product.unit === "pack" ? "packs" : "unidades"}
                  </span>
                </div>
              </div>

              {product.type === "Pescado procesado" && product.packSize && (
                <div className="flex items-center gap-3">
                  <Package className="h-4 w-4 text-primary" />
                  <div>
                    <span className="text-sm font-medium">Unidades por pack:</span>
                    <span className="text-sm text-muted-foreground ml-2">{product.packSize} unidades</span>
                  </div>
                </div>
              )}

              {product.type === "Pescado procesado" && product.productionDate && (
                <>
                  <div className="flex items-center gap-3">
                    <Calendar className="h-4 w-4 text-green-600" />
                    <div>
                      <span className="text-sm font-medium">Fecha de elaboración:</span>
                      <span className="text-sm text-green-600 ml-2">{formatDate(product.productionDate)}</span>
                    </div>
                  </div>

                  {product.expirationDate && (
                    <div className="flex items-center gap-3">
                      <Calendar
                        className={`h-4 w-4 ${product.isNearExpiration ? "text-red-600" : "text-orange-600"}`}
                      />
                      <div>
                        <span className="text-sm font-medium">Fecha de vencimiento:</span>
                        <span
                          className={`text-sm ml-2 ${product.isNearExpiration ? "text-red-600 font-medium" : "text-orange-600"}`}
                        >
                          {formatDate(product.expirationDate)}
                        </span>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>

            <div className="border-t border-border pt-4">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-medium">Cantidad:</span>
                <div className="flex items-center gap-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={decreaseQuantity}
                    disabled={quantity <= 1}
                    className="h-8 w-8 p-0 bg-transparent"
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="text-lg font-medium min-w-[2rem] text-center">{quantity}</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={increaseQuantity}
                    disabled={quantity >= (product.type === "Pescado por caja" ? 1 : product.stock)}
                    className="h-8 w-8 p-0"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {product.type === "Pescado por caja" && (
                <p className="text-xs text-muted-foreground mb-4 text-center">
                  Los productos por caja se venden por unidad completa
                </p>
              )}

              {quantity > 1 && (
                <div className="text-right mb-4">
                  <span className="text-lg font-bold text-primary">Total: ${totalPrice.toLocaleString('en-US')}</span>
                </div>
              )}
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground"
                onClick={() =>
                  alert(
                    `¡${quantity} ${product.unit === "pack" ? "packs" : "kg"} de ${product.name} agregado al carrito!`,
                  )
                }
                disabled={product.stock === 0}
              >
                <ShoppingCart className="h-4 w-4 mr-2" />
                {product.stock === 0 ? "Sin Stock" : "Agregar al Carrito"}
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

