"use client"

import { Fish, Search } from "lucide-react"
import { Input } from "@/components/ui/input"

interface HeaderProps {
  searchTerm: string
  onSearchChange: (value: string) => void
}

export function Header({ searchTerm, onSearchChange }: HeaderProps) {
  return (
    <header className="bg-primary text-primary-foreground shadow-lg">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="bg-primary-foreground/10 p-2 rounded-lg">
              <Fish className="h-8 w-8" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Ysyry</h1>
              <p className="text-primary-foreground/80 text-sm">Pescados frescos del día</p>
            </div>
          </div>

          <div className="relative max-w-md w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Buscar pescados..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10 bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/60 focus:bg-primary-foreground/20"
            />
          </div>
        </div>
      </div>
    </header>
  )
}
