"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, MapPin, Phone, Heart, Eye, SlidersHorizontal } from "lucide-react"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { BannerAd } from "@/components/banner-ad"

interface Vehicle {
  id: string
  model: string
  brand_name: string
  year: number
  price: number
  location: string
  mileage: number
  condition_type: "new" | "used"
  primary_image: string
  category_name: string
}

export default function ComprarPage() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedBrand, setSelectedBrand] = useState("")
  const [selectedCondition, setSelectedCondition] = useState("")
  const [selectedLocation, setSelectedLocation] = useState("")
  const [priceRange, setPriceRange] = useState({ min: "", max: "" })
  const [sortBy, setSortBy] = useState("newest")
  const [userLocation] = useState("Curitiba")
  const [showFilters, setShowFilters] = useState(false)

  const fetchVehicles = async () => {
    setIsLoading(true)
    try {
      const params = new URLSearchParams()
      if (searchTerm) params.append("search", searchTerm)
      if (selectedBrand) params.append("brand", selectedBrand)
      if (selectedCondition) params.append("condition", selectedCondition)
      if (selectedLocation) params.append("location", selectedLocation)
      if (priceRange.min) params.append("minPrice", priceRange.min)
      if (priceRange.max) params.append("maxPrice", priceRange.max)

      const response = await fetch(`/api/vehicles?${params.toString()}`)
      if (response.ok) {
        const data = await response.json()
        setVehicles(data)
      }
    } catch (error) {
      console.error("Error fetching vehicles:", error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchVehicles()
  }, [searchTerm, selectedBrand, selectedCondition, selectedLocation, priceRange, sortBy])

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: 0,
    }).format(price)
  }

  const formatMileage = (mileage: number) => {
    return new Intl.NumberFormat("pt-BR").format(mileage) + " km"
  }

  const brands = Array.from(new Set(vehicles.map((v) => v.brand_name))).sort()
  const locations = Array.from(new Set(vehicles.map((v) => v.location.split(",")[1]?.trim() || v.location))).sort()

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Banner */}
      <div className="container mx-auto px-4 py-4">
        <BannerAd placement="header" userLocation={userLocation} />
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-80">
            <BannerAd placement="sidebar" userLocation={userLocation} />

            <Card className="mt-6">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold">Filtros</h2>
                  <Button variant="ghost" size="sm" onClick={() => setShowFilters(!showFilters)} className="lg:hidden">
                    <SlidersHorizontal className="h-4 w-4" />
                  </Button>
                </div>

                <div className={`space-y-4 ${showFilters ? "block" : "hidden lg:block"}`}>
                  {/* Location Info */}
                  <div className="bg-green-50 p-3 rounded-lg">
                    <div className="flex items-center text-sm text-green-800">
                      <MapPin className="h-4 w-4 mr-1" />
                      Priorizando: {userLocation}
                    </div>
                  </div>

                  {/* Search */}
                  <div>
                    <label className="block text-sm font-medium mb-2">Buscar</label>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        placeholder="Buscar marca, modelo..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>

                  {/* Brand Filter */}
                  <div>
                    <label className="block text-sm font-medium mb-2">Marca</label>
                    <Select value={selectedBrand} onValueChange={setSelectedBrand}>
                      <SelectTrigger>
                        <SelectValue placeholder="Todas as marcas" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Todas as marcas</SelectItem>
                        {brands.map((brand) => (
                          <SelectItem key={brand} value={brand}>
                            {brand}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Condition Filter */}
                  <div>
                    <label className="block text-sm font-medium mb-2">Condição</label>
                    <Select value={selectedCondition} onValueChange={setSelectedCondition}>
                      <SelectTrigger>
                        <SelectValue placeholder="Todas as condições" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Todas as condições</SelectItem>
                        <SelectItem value="new">Novo</SelectItem>
                        <SelectItem value="used">Usado</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Location Filter */}
                  <div>
                    <label className="block text-sm font-medium mb-2">Estado</label>
                    <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                      <SelectTrigger>
                        <SelectValue placeholder="Todos os estados" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Todos os estados</SelectItem>
                        {locations.map((location) => (
                          <SelectItem key={location} value={location}>
                            {location}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Price Range */}
                  <div>
                    <label className="block text-sm font-medium mb-2">Faixa de Preço</label>
                    <div className="grid grid-cols-2 gap-2">
                      <Input
                        placeholder="Mín"
                        value={priceRange.min}
                        onChange={(e) => setPriceRange((prev) => ({ ...prev, min: e.target.value }))}
                        type="number"
                      />
                      <Input
                        placeholder="Máx"
                        value={priceRange.max}
                        onChange={(e) => setPriceRange((prev) => ({ ...prev, max: e.target.value }))}
                        type="number"
                      />
                    </div>
                  </div>

                  {/* Clear Filters */}
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => {
                      setSearchTerm("")
                      setSelectedBrand("")
                      setSelectedCondition("")
                      setSelectedLocation("")
                      setPriceRange({ min: "", max: "" })
                    }}
                  >
                    Limpar Filtros
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Results Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">Veículos Disponíveis</h1>
                <p className="text-gray-600">
                  {vehicles.length} veículos encontrados
                  {userLocation && <span className="ml-2 text-sm">• Priorizando {userLocation}</span>}
                </p>
              </div>

              <div className="flex items-center space-x-2 mt-4 sm:mt-0">
                <span className="text-sm text-gray-600">Ordenar por:</span>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Mais Recentes</SelectItem>
                    <SelectItem value="price-low">Menor Preço</SelectItem>
                    <SelectItem value="price-high">Maior Preço</SelectItem>
                    <SelectItem value="year">Ano</SelectItem>
                    <SelectItem value="mileage">Quilometragem</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Vehicle Grid */}
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="bg-white rounded-xl p-4 animate-pulse">
                    <div className="bg-gray-200 h-48 rounded-lg mb-4"></div>
                    <div className="bg-gray-200 h-4 rounded mb-2"></div>
                    <div className="bg-gray-200 h-4 rounded w-3/4 mb-2"></div>
                    <div className="bg-gray-200 h-6 rounded w-1/2"></div>
                  </div>
                ))}
              </div>
            ) : vehicles.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <Search className="h-16 w-16 mx-auto" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Nenhum veículo encontrado</h3>
                <p className="text-gray-600 mb-4">Tente ajustar os filtros ou buscar por outros termos.</p>
                <Button
                  onClick={() => {
                    setSearchTerm("")
                    setSelectedBrand("")
                    setSelectedCondition("")
                    setSelectedLocation("")
                    setPriceRange({ min: "", max: "" })
                  }}
                  className="bg-green-600 hover:bg-green-700 text-white"
                >
                  Limpar Filtros
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {vehicles.map((vehicle, index) => (
                  <motion.div
                    key={vehicle.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 rounded-xl overflow-hidden">
                      <div className="relative">
                        <Image
                          src={vehicle.primary_image || "/placeholder.svg?height=300&width=400"}
                          alt={`${vehicle.brand_name} ${vehicle.model}`}
                          width={400}
                          height={300}
                          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute top-3 left-3 flex gap-2">
                          {vehicle.condition_type === "new" && <Badge className="bg-green-500 text-white">Novo</Badge>}
                          <Badge className="bg-green-600 text-white">Verificado</Badge>
                          {vehicle.location.includes(userLocation) && (
                            <Badge className="bg-orange-500 text-white">Próximo</Badge>
                          )}
                        </div>
                        <button className="absolute top-3 right-3 p-2 bg-white/80 rounded-full hover:bg-white transition-colors">
                          <Heart className="h-4 w-4 text-gray-600" />
                        </button>
                      </div>

                      <CardContent className="p-4">
                        <h3 className="font-bold text-lg mb-2 text-gray-900 group-hover:text-green-700 transition-colors">
                          {vehicle.brand_name} {vehicle.model}
                        </h3>

                        <div className="space-y-2 mb-4">
                          <div className="flex justify-between text-sm text-gray-600">
                            <span>Ano: {vehicle.year}</span>
                            <span>{formatMileage(vehicle.mileage)}</span>
                          </div>
                          <div className="flex items-center text-sm text-gray-600">
                            <MapPin className="h-4 w-4 mr-1" />
                            {vehicle.location}
                          </div>
                        </div>

                        <div className="flex items-center justify-between mb-4">
                          <span className="text-2xl font-bold text-green-600">{formatPrice(vehicle.price)}</span>
                        </div>

                        <div className="flex gap-2">
                          <Link href={`/veiculo/${vehicle.id}`} className="flex-1">
                            <Button size="sm" className="w-full bg-green-600 hover:bg-green-700 text-white rounded-lg">
                              <Eye className="h-4 w-4 mr-1" />
                              Ver Detalhes
                            </Button>
                          </Link>
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-green-500 text-green-600 hover:bg-green-50 rounded-lg"
                            title="Faça login para ver contato"
                          >
                            <Phone className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>

                    {/* In-feed Ad every 4 vehicles */}
                    {(index + 1) % 4 === 0 && (
                      <div className="col-span-full my-6">
                        <BannerAd placement="in-feed" userLocation={userLocation} />
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            )}

            {/* Load More */}
            {vehicles.length > 0 && (
              <div className="text-center mt-12">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-green-600 text-green-600 hover:bg-green-50 rounded-xl px-8"
                >
                  Carregar Mais Veículos
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
