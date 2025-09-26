"use client"

import { useState, useMemo } from "react"
import { ProductCard } from "./product-card"
import { ProductModal } from "./product-modal"

export interface Product {
  id: string
  name: string
  price: number
  image: string
  description: string
  origin: string
  weight: string
  freshness: string
  category: string
}

const products: Product[] = [
  {
    id: "1",
    name: "Salmón Atlántico",
    price: 2800,
    image: "/fresh-salmon-fillet-on-ice.jpg",
    description:
      "Salmón fresco del Atlántico Norte, rico en omega-3 y de textura suave. Perfecto para preparaciones a la plancha, al horno o crudo.",
    origin: "Atlántico Norte",
    weight: "1.2 kg",
    freshness: "Capturado hoy",
    category: "Pescado graso",
  },
  {
    id: "2",
    name: "Merluza Argentina",
    price: 1200,
    image: "/fresh-hake-fish-on-ice-market-display.jpg",
    description:
      "Merluza fresca del Mar Argentino, de carne blanca y delicada. Ideal para milanesas, al vapor o en guisos.",
    origin: "Mar Argentino",
    weight: "800g",
    freshness: "Capturado ayer",
    category: "Pescado blanco",
  },
  {
    id: "3",
    name: "Atún Rojo",
    price: 4500,
    image: "/fresh-tuna-steak-red-meat-fish-market.jpg",
    description:
      "Atún rojo de primera calidad, perfecto para sashimi y preparaciones gourmet. Carne roja intensa y sabor excepcional.",
    origin: "Mediterráneo",
    weight: "2 kg",
    freshness: "Capturado hoy",
    category: "Pescado graso",
  },
  {
    id: "4",
    name: "Corvina Rubia",
    price: 1800,
    image: "/fresh-corvina-fish-golden-color-market-display.jpg",
    description:
      "Corvina rubia del Río de la Plata, de carne firme y sabor suave. Excelente para preparar a la parrilla o al horno.",
    origin: "Río de la Plata",
    weight: "1.5 kg",
    freshness: "Capturado hoy",
    category: "Pescado blanco",
  },
  {
    id: "5",
    name: "Langostinos",
    price: 3200,
    image: "/fresh-prawns-shrimp-on-ice-seafood-market.jpg",
    description:
      "Langostinos frescos de gran tamaño, dulces y jugosos. Perfectos para paellas, risottos o simplemente a la plancha.",
    origin: "Golfo San Jorge",
    weight: "500g",
    freshness: "Capturado hoy",
    category: "Mariscos",
  },
  {
    id: "6",
    name: "Besugo",
    price: 2200,
    image: "/fresh-sea-bream-fish-market-display-on-ice.jpg",
    description:
      "Besugo fresco de aguas profundas, de carne blanca y firme. Tradicional para preparar al horno con papas.",
    origin: "Mar del Norte",
    weight: "1 kg",
    freshness: "Capturado ayer",
    category: "Pescado blanco",
  },
]

interface ProductGridProps {
  searchTerm: string
}

export function ProductGrid({ searchTerm }: ProductGridProps) {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)

  const filteredProducts = useMemo(() => {
    if (!searchTerm) return products

    return products.filter(
      (product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.origin.toLowerCase().includes(searchTerm.toLowerCase()),
    )
  }, [searchTerm])

  return (
    <>
      {searchTerm && (
        <div className="mb-6">
          <p className="text-muted-foreground">
            {filteredProducts.length} resultado{filteredProducts.length !== 1 ? "s" : ""} para "{searchTerm}"
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} onClick={() => setSelectedProduct(product)} />
        ))}
      </div>

      {searchTerm && filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground text-lg">No se encontraron productos para "{searchTerm}"</p>
          <p className="text-muted-foreground text-sm mt-2">
            Intenta buscar por nombre, categoría u origen del pescado
          </p>
        </div>
      )}

      {selectedProduct && <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />}
    </>
  )
}
