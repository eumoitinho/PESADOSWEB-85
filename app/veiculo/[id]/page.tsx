"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, Phone, Heart, Share2, Eye, Calendar, Gauge, Truck, CheckCircle } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { BannerAd } from "@/components/banner-ad"
import { useAuth } from "@/lib/auth"

interface Vehicle {
  id: string
  model: string
  brand_name: string
  year: number
  price: number
  location: string
  mileage: number
  condition_type: "new" | "used"
  description: string
  category_name: string
  user_name: string
  user_phone: string
  views_count: number
  contacts_count: number
  created_at: string
}

interface VehicleImage {
  id: string
  image_url: string
  is_primary: boolean
}

export default function VehicleDetailPage() {
  const params = useParams()
  const { isAuthenticated } = useAuth()
  const [vehicle, setVehicle] = useState<Vehicle | null>(null)
  const [images, setImages] = useState<VehicleImage[]>([])
  const [selectedImage, setSelectedImage] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [showContact, setShowContact] = useState(false)

  useEffect(() => {
    const fetchVehicle = async () => {
      try {
        const response = await fetch(`/api/vehicles/${params.id}`)
        if (response.ok) {
          const data = await response.json()
          setVehicle(data)

          // Fetch images
          const imagesResponse = await fetch(`/api/vehicles/${params.id}/images`)
          if (imagesResponse.ok) {
            const imagesData = await imagesResponse.json()
            setImages(imagesData)
          }
        }
      } catch (error) {
        console.error("Error fetching vehicle:", error)
      } finally {
        setIsLoading(false)
      }
    }

    if (params.id) {
      fetchVehicle()
    }
  }, [params.id])

  const handleContactClick = () => {
    if (!isAuthenticated) {
      alert("Faça login para ver as informações de contato")
      return
    }
    setShowContact(true)
    // Track contact
    fetch(`/api/vehicles/${params.id}/contact`, { method: "POST" })
  }

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
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="animate-pulse">
            <div className="bg-gray-200 h-96 rounded-lg mb-8"></div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="bg-gray-200 h-8 rounded mb-4"></div>
                <div className="bg-gray-200 h-4 rounded mb-2"></div>
                <div className="bg-gray-200 h-4 rounded w-3/4"></div>
              </div>
              <div className="bg-gray-200 h-64 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!vehicle) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Veículo não encontrado</h1>
          <p className="text-gray-600 mb-4">O veículo que você está procurando não existe ou foi removido.</p>
          <Link href="/comprar">
            <Button className="bg-green-600 hover:bg-green-700">Ver Outros Veículos</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Banner */}
      <div className="container mx-auto px-4 py-4">
        <BannerAd placement="header" />
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Image Gallery */}
            <Card className="mb-8">
              <CardContent className="p-0">
                <div className="relative">
                  <Image
                    src={images[selectedImage]?.image_url || "/placeholder.svg?height=400&width=800"}
                    alt={`${vehicle.brand_name} ${vehicle.model}`}
                    width={800}
                    height={400}
                    className="w-full h-96 object-cover rounded-t-lg"
                  />
                  <div className="absolute top-4 left-4 flex gap-2">
                    {vehicle.condition_type === "new" && <Badge className="bg-green-500 text-white">Novo</Badge>}
                    <Badge className="bg-green-600 text-white">Verificado</Badge>
                  </div>
                  <div className="absolute top-4 right-4 flex gap-2">
                    <Button size="sm" variant="outline" className="bg-white/80">
                      <Heart className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="outline" className="bg-white/80">
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {images.length > 1 && (
                  <div className="p-4">
                    <div className="flex gap-2 overflow-x-auto">
                      {images.map((image, index) => (
                        <button
                          key={image.id}
                          onClick={() => setSelectedImage(index)}
                          className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 ${
                            selectedImage === index ? "border-green-500" : "border-gray-200"
                          }`}
                        >
                          <Image
                            src={image.image_url || "/placeholder.svg"}
                            alt={`Foto ${index + 1}`}
                            width={80}
                            height={80}
                            className="w-full h-full object-cover"
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Vehicle Details */}
            <Card className="mb-8">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                      {vehicle.brand_name} {vehicle.model}
                    </h1>
                    <div className="flex items-center text-gray-600 mb-4">
                      <MapPin className="h-4 w-4 mr-1" />
                      {vehicle.location}
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center">
                        <Eye className="h-4 w-4 mr-1" />
                        {vehicle.views_count} visualizações
                      </div>
                      <div className="flex items-center">
                        <Phone className="h-4 w-4 mr-1" />
                        {vehicle.contacts_count} contatos
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-green-600 mb-2">{formatPrice(vehicle.price)}</div>
                    <div className="text-sm text-gray-600">
                      Anunciado em {new Date(vehicle.created_at).toLocaleDateString("pt-BR")}
                    </div>
                  </div>
                </div>

                {/* Specifications */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="bg-gray-50 p-4 rounded-lg text-center">
                    <Calendar className="h-6 w-6 mx-auto mb-2 text-green-600" />
                    <div className="font-semibold">{vehicle.year}</div>
                    <div className="text-sm text-gray-600">Ano</div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg text-center">
                    <Gauge className="h-6 w-6 mx-auto mb-2 text-green-600" />
                    <div className="font-semibold">{formatMileage(vehicle.mileage)}</div>
                    <div className="text-sm text-gray-600">Quilometragem</div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg text-center">
                    <Truck className="h-6 w-6 mx-auto mb-2 text-green-600" />
                    <div className="font-semibold">{vehicle.category_name}</div>
                    <div className="text-sm text-gray-600">Categoria</div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg text-center">
                    <CheckCircle className="h-6 w-6 mx-auto mb-2 text-green-600" />
                    <div className="font-semibold">{vehicle.condition_type === "new" ? "Novo" : "Usado"}</div>
                    <div className="text-sm text-gray-600">Condição</div>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <h3 className="text-xl font-semibold mb-4">Descrição</h3>
                  <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                    {vehicle.description || "Nenhuma descrição disponível."}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Contact Card */}
            <Card className="mb-6 sticky top-4">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Informações do Vendedor</h3>

                <div className="mb-4">
                  <div className="flex items-center mb-2">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
                      <span className="text-green-600 font-semibold">{vehicle.user_name.charAt(0).toUpperCase()}</span>
                    </div>
                    <div>
                      <div className="font-medium">{vehicle.user_name}</div>
                      <div className="text-sm text-gray-600">Vendedor</div>
                    </div>
                  </div>
                </div>

                {showContact && isAuthenticated ? (
                  <div className="space-y-3">
                    <div className="bg-green-50 p-3 rounded-lg">
                      <div className="flex items-center text-green-700">
                        <Phone className="h-4 w-4 mr-2" />
                        <span className="font-medium">{vehicle.user_phone}</span>
                      </div>
                    </div>
                    <Button className="w-full bg-green-600 hover:bg-green-700" asChild>
                      <a href={`tel:${vehicle.user_phone}`}>
                        <Phone className="h-4 w-4 mr-2" />
                        Ligar Agora
                      </a>
                    </Button>
                    <Button variant="outline" className="w-full" asChild>
                      <a
                        href={`https://wa.me/55${vehicle.user_phone.replace(/\D/g, "")}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        WhatsApp
                      </a>
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <Button className="w-full bg-green-600 hover:bg-green-700" onClick={handleContactClick}>
                      <Phone className="h-4 w-4 mr-2" />
                      {isAuthenticated ? "Ver Telefone" : "Fazer Login para Ver Contato"}
                    </Button>
                    {!isAuthenticated && (
                      <div className="text-center">
                        <Link href="/login" className="text-green-600 hover:text-green-700 text-sm">
                          Já tem conta? Faça login
                        </Link>
                      </div>
                    )}
                  </div>
                )}

                <div className="mt-6 pt-4 border-t border-gray-200">
                  <div className="text-sm text-gray-600 space-y-1">
                    <p>• Sempre negocie pessoalmente</p>
                    <p>• Verifique a documentação</p>
                    <p>• Faça uma inspeção técnica</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Sidebar Banner */}
            <BannerAd placement="sidebar" />
          </div>
        </div>

        {/* Related Vehicles */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Veículos Similares</h2>
          {/* This would fetch and display similar vehicles */}
          <div className="text-center py-8 text-gray-600">Carregando veículos similares...</div>
        </div>
      </div>
    </div>
  )
}
