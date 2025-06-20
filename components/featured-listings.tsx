"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPin, Phone, Heart, Eye, AlertCircle } from "lucide-react"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"

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

export function FeaturedListings() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const [userLocation] = useState("Curitiba")

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        setHasError(false)
        setErrorMessage("")

        console.log("Fetching vehicles from API...")

        const response = await fetch("/api/vehicles?limit=4")
        console.log("API response status:", response.status)

        if (response.ok) {
          const data = await response.json()
          console.log("API response data:", data)

          // Ensure data is an array
          if (Array.isArray(data)) {
            setVehicles(data)
            console.log("Successfully set vehicles:", data.length)
          } else {
            console.error("API returned non-array data:", data)
            setVehicles([])
            setHasError(true)
            setErrorMessage("Dados inválidos recebidos da API")
          }
        } else {
          const errorText = await response.text()
          console.error("Failed to fetch vehicles:", response.status, response.statusText, errorText)
          setVehicles([])
          setHasError(true)
          setErrorMessage(`Erro na API: ${response.status} ${response.statusText}`)
        }
      } catch (error) {
        console.error("Error fetching vehicles:", error)
        setVehicles([])
        setHasError(true)
        setErrorMessage(error instanceof Error ? error.message : "Erro desconhecido")
      } finally {
        setIsLoading(false)
      }
    }

    fetchVehicles()
  }, [])

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

  if (isLoading) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Veículos em Destaque</h2>
            <p className="text-lg text-gray-600">Carregando veículos...</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-white rounded-xl p-4 animate-pulse">
                <div className="bg-gray-200 h-48 rounded-lg mb-4"></div>
                <div className="bg-gray-200 h-4 rounded mb-2"></div>
                <div className="bg-gray-200 h-4 rounded w-3/4"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  if (hasError) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Veículos em Destaque</h2>
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
              <div className="flex items-center justify-center mb-4">
                <AlertCircle className="h-8 w-8 text-red-500" />
              </div>
              <p className="text-red-700 mb-2">Erro ao carregar veículos</p>
              <p className="text-sm text-red-600">{errorMessage}</p>
              <Button onClick={() => window.location.reload()} className="mt-4 bg-red-600 hover:bg-red-700 text-white">
                Tentar Novamente
              </Button>
            </div>
          </div>
        </div>
      </section>
    )
  }

  if (vehicles.length === 0) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Veículos em Destaque</h2>
            <p className="text-lg text-gray-600">Nenhum veículo disponível no momento.</p>
            <p className="text-sm text-gray-500 mt-2">Verifique se o banco de dados foi configurado corretamente.</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
          >
            Veículos em Destaque
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-gray-600 max-w-2xl mx-auto"
          >
            Encontre os melhores veículos pesados próximos a você. Priorizamos anúncios da sua região.
          </motion.p>
          <div className="flex items-center justify-center mt-4 text-sm text-gray-500">
            <MapPin className="h-4 w-4 mr-1" />
            Mostrando resultados para: <span className="font-medium ml-1">{userLocation}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {vehicles.map((vehicle, index) => (
            <motion.div
              key={vehicle.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
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
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/comprar">
            <Button
              size="lg"
              variant="outline"
              className="border-green-600 text-green-600 hover:bg-green-50 rounded-xl px-8"
            >
              Ver Todos os Veículos
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
