"use client"

import { useState, useMemo } from "react"
import { ProductCard } from "./product-card"
import { ProductModal } from "./product-modal"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Filter } from "lucide-react"

export interface Product {
  id: string
  name: string
  price: number
  pricePerKg?: number // Precio por kg para pescado por caja
  originalPrice?: number
  originalPricePerKg?: number // Precio original por kg
  image: string
  description: string
  origin: string
  weight: string
  weightInKg?: number // Peso numérico en kg para cálculos
  type: "Pescado por caja" | "Pescado procesado"
  unit: "kg" | "pack"
  packSize?: number
  productionDate?: string
  expirationDate?: string
  isNearExpiration?: boolean
  stock: number // Added stock field for available units
  category: string // Added category field
  freshness: string // Added freshness field
}

const products: Product[] = [
  {
    id: "1",
    name: "Salmón",
    pricePerKg: 2333, // $2333 por kg
    price: 2800, // 2333 * 1.2 = 2800 (calculado automáticamente)
    weightInKg: 1.2,
    image: "/fresh-salmon-fillet-on-ice.jpg",
    description:
      "Salmón fresco del Atlántico Norte, rico en omega-3 y de textura suave. Perfecto para preparaciones a la plancha, al horno o crudo.",
    origin: "Puerto Iguazú, Misiones",
    weight: "1.2 kg",
    type: "Pescado por caja",
    unit: "kg",
    stock: 15,
    category: "Pescado Fresco",
    freshness: "Muy fresco - 1 día",
  },
  {
    id: "2",
    name: "Merluza",
    pricePerKg: 1500, // $1500 por kg
    price: 1200, // 1500 * 0.8 = 1200 (calculado automáticamente)
    weightInKg: 0.8,
    image: "/fresh-hake-fish-on-ice-market-display.jpg",
    description:
      "Merluza fresca del Mar Argentino, de carne blanca y delicada. Ideal para milanesas, al vapor o en guisos.",
    origin: "Posadas, Misiones",
    weight: "800g",
    type: "Pescado por caja",
    unit: "kg",
    stock: 8,
    category: "Pescado Blanco",
    freshness: "Fresco - 2 días",
  },
  {
    id: "3",
    name: "Atún Rojo Procesado",
    price: 3600,
    originalPrice: 4500,
    image: "/fresh-tuna-steak-red-meat-fish-market.jpg",
    description:
      "Atún rojo procesado de primera calidad, perfecto para sashimi y preparaciones gourmet. Pack de 12 unidades.",
    origin: "Oberá, Misiones",
    weight: "12 unidades", // Changed from "porciones" to "unidades"
    type: "Pescado procesado",
    unit: "pack",
    packSize: 12,
    productionDate: "2024-12-15",
    expirationDate: "2024-12-30",
    isNearExpiration: true,
    stock: 5,
    category: "Pescado Premium",
    freshness: "Procesado - 15 días",
  },
  {
    id: "4",
    name: "Pacú",
    pricePerKg: 1200, // $1200 por kg
    price: 1800, // 1200 * 1.5 = 1800 (calculado automáticamente)
    weightInKg: 1.5,
    image: "/pacu.jpeg",
    description:
      "Pacú fresco de río, conocido por su sabor suave y textura firme. Ideal para asados, al horno o en caldos.",
    origin: "Eldorado, Misiones",
    weight: "1.5 kg",
    type: "Pescado por caja",
    unit: "kg",
    stock: 12,
    category: "Pescado de Río",
    freshness: "Muy fresco - 1 día",
  },
  {
    id: "5",
    name: "Medallones Merluza",
    price: 2560,
    originalPrice: 3200,
    image: "/medallonesmerluza.jpeg",
    description:
      "Medallones de merluza de gran tamaño, suaves y jugosos. Perfectas para una buena hamburguesa de domingo.",
    origin: "San Vicente, Misiones",
    weight: "24 unidades", // Changed from "porciones" to "unidades"
    type: "Pescado procesado",
    unit: "pack",
    packSize: 24,
    productionDate: "2024-12-20",
    expirationDate: "2025-01-05",
    isNearExpiration: true,
    stock: 3,
    category: "Mariscos",
    freshness: "Procesado - 16 días",
  },
  {
    id: "6",
    name: "Dorado",
    price: 1800,
    image: "/sabalofileteado.jpeg",
    description: "Sabalo fileteado procesado de aguas profundas, de carne blanca y firme. Pack de 6 filetes listos para cocinar.",
    origin: "Montecarlo, Misiones",
    weight: "6 unidades", // Changed from "filetes" to "unidades"
    type: "Pescado procesado",
    unit: "pack",
    packSize: 6,
    productionDate: "2024-12-22",
    expirationDate: "2025-01-15",
    isNearExpiration: false,
    stock: 10,
    category: "Pescado Procesado",
    freshness: "Procesado - 24 días",
  },
]

interface ProductGridProps {
  searchTerm: string
}

export function ProductGrid({ searchTerm }: ProductGridProps) {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [typeFilter, setTypeFilter] = useState<string>("all")

  const filteredProducts = useMemo(() => {
    let filtered = products

    if (searchTerm) {
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.origin.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    if (typeFilter !== "all") {
      filtered = filtered.filter((product) => product.type === typeFilter)
    }

    return filtered
  }, [searchTerm, typeFilter])

  return (
    <>
      <div className="mb-6 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Filtrar por tipo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos los productos</SelectItem>
              <SelectItem value="Pescado por caja">Pescado por caja</SelectItem>
              <SelectItem value="Pescado procesado">Pescado procesado</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {(searchTerm || typeFilter !== "all") && (
          <p className="text-muted-foreground text-sm">
            {filteredProducts.length} resultado{filteredProducts.length !== 1 ? "s" : ""}
            {searchTerm && ` para "${searchTerm}"`}
            {typeFilter !== "all" && ` en ${typeFilter}`}
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} onClick={() => setSelectedProduct(product)} />
        ))}
      </div>

      {(searchTerm || typeFilter !== "all") && filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground text-lg">No se encontraron productos</p>
          <p className="text-muted-foreground text-sm mt-2">Intenta ajustar los filtros o buscar por nombre u origen</p>
        </div>
      )}

      {selectedProduct && <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />}
    </>
  )
}

