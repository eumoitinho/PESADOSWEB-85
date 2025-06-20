"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth"
import { ProtectedRoute } from "@/components/protected-route"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Truck, Upload, X, CreditCard, Calendar, MapPin } from "lucide-react"

interface VehicleData {
  category: string
  brand: string
  model: string
  year: string
  condition: string
  price: string
  mileage: string
  description: string
  location: string
  images: File[]
  duration: string
}

const vehicleCategories = [
  { value: "caminhao", label: "Caminhão" },
  { value: "trator", label: "Trator" },
  { value: "implemento", label: "Implemento Agrícola" },
]

const vehicleBrands = {
  caminhao: ["Volvo", "Scania", "Mercedes-Benz", "DAF", "Iveco", "Ford", "Volkswagen"],
  trator: ["John Deere", "Case IH", "New Holland", "Massey Ferguson", "Valtra", "Fendt"],
  implemento: ["Jumil", "Semeato", "Marchesan", "Baldan", "Tatu", "Piccin"],
}

const adDurations = [
  { value: "7", label: "7 dias - R$ 50,00", price: 50 },
  { value: "30", label: "30 dias - R$ 50,00", price: 50 },
  { value: "60", label: "60 dias - R$ 50,00", price: 50 },
]

export default function AnunciePage() {
  const { user } = useAuth()
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [vehicleData, setVehicleData] = useState<VehicleData>({
    category: "",
    brand: "",
    model: "",
    year: "",
    condition: "",
    price: "",
    mileage: "",
    description: "",
    location: user?.location || "",
    images: [],
    duration: "",
  })
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleInputChange = (field: keyof VehicleData, value: string) => {
    setVehicleData((prev) => ({ ...prev, [field]: value }))
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    if (vehicleData.images.length + files.length > 10) {
      setError("Máximo de 10 imagens permitidas")
      return
    }
    setVehicleData((prev) => ({ ...prev, images: [...prev.images, ...files] }))
  }

  const removeImage = (index: number) => {
    setVehicleData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }))
  }

  const formatPrice = (value: string) => {
    const numbers = value.replace(/\D/g, "")
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: 0,
    }).format(Number(numbers))
  }

  const validateStep = (step: number) => {
    switch (step) {
      case 1:
        return vehicleData.category && vehicleData.brand && vehicleData.model && vehicleData.year
      case 2:
        return vehicleData.condition && vehicleData.price && vehicleData.mileage && vehicleData.location
      case 3:
        return vehicleData.description && vehicleData.images.length > 0
      case 4:
        return vehicleData.duration
      default:
        return false
    }
  }

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => prev + 1)
      setError("")
    } else {
      setError("Preencha todos os campos obrigatórios")
    }
  }

  const prevStep = () => {
    setCurrentStep((prev) => prev - 1)
    setError("")
  }

  const handleSubmit = async () => {
    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // In real app, this would upload images and create the ad
      console.log("Creating ad:", vehicleData)

      router.push("/anuncie/sucesso")
    } catch (err) {
      setError("Erro ao criar anúncio. Tente novamente.")
    } finally {
      setIsLoading(false)
    }
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Categoria do Veículo *</label>
              <Select value={vehicleData.category} onValueChange={(value) => handleInputChange("category", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione a categoria" />
                </SelectTrigger>
                <SelectContent>
                  {vehicleCategories.map((category) => (
                    <SelectItem key={category.value} value={category.value}>
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {vehicleData.category && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Marca *</label>
                <Select value={vehicleData.brand} onValueChange={(value) => handleInputChange("brand", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione a marca" />
                  </SelectTrigger>
                  <SelectContent>
                    {vehicleBrands[vehicleData.category as keyof typeof vehicleBrands]?.map((brand) => (
                      <SelectItem key={brand} value={brand}>
                        {brand}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Modelo *</label>
              <Input
                value={vehicleData.model}
                onChange={(e) => handleInputChange("model", e.target.value)}
                placeholder="Ex: FH 540, 6110J, 2650"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Ano *</label>
              <Input
                type="number"
                value={vehicleData.year}
                onChange={(e) => handleInputChange("year", e.target.value)}
                placeholder="Ex: 2020"
                min="1990"
                max={new Date().getFullYear() + 1}
              />
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Condição *</label>
              <Select value={vehicleData.condition} onValueChange={(value) => handleInputChange("condition", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione a condição" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="new">Novo</SelectItem>
                  <SelectItem value="used">Usado</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Preço *</label>
              <Input
                value={vehicleData.price}
                onChange={(e) => handleInputChange("price", e.target.value)}
                placeholder="R$ 450.000"
                onBlur={(e) => handleInputChange("price", formatPrice(e.target.value))}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Quilometragem *</label>
              <Input
                type="number"
                value={vehicleData.mileage}
                onChange={(e) => handleInputChange("mileage", e.target.value)}
                placeholder="120000"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Localização *</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  value={vehicleData.location}
                  onChange={(e) => handleInputChange("location", e.target.value)}
                  placeholder="Cidade, Estado"
                  className="pl-10"
                />
              </div>
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Descrição *</label>
              <Textarea
                value={vehicleData.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                placeholder="Descreva o veículo, suas características, histórico de manutenção, etc."
                rows={6}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Fotos * (máximo 10)</label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <Upload className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                <p className="text-gray-600 mb-4">Clique para adicionar fotos ou arraste aqui</p>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="image-upload"
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => document.getElementById("image-upload")?.click()}
                >
                  Selecionar Fotos
                </Button>
              </div>

              {vehicleData.images.length > 0 && (
                <div className="grid grid-cols-3 gap-4 mt-4">
                  {vehicleData.images.map((image, index) => (
                    <div key={index} className="relative">
                      <img
                        src={URL.createObjectURL(image) || "/placeholder.svg"}
                        alt={`Preview ${index + 1}`}
                        className="w-full h-24 object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )

      case 4:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Duração do Anúncio *</label>
              <div className="space-y-3">
                {adDurations.map((duration) => (
                  <div
                    key={duration.value}
                    className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                      vehicleData.duration === duration.value
                        ? "border-green-500 bg-green-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                    onClick={() => handleInputChange("duration", duration.value)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <input
                          type="radio"
                          checked={vehicleData.duration === duration.value}
                          onChange={() => handleInputChange("duration", duration.value)}
                          className="mr-3"
                        />
                        <div>
                          <div className="font-medium">{duration.label}</div>
                          <div className="text-sm text-gray-600">
                            <Calendar className="inline h-4 w-4 mr-1" />
                            Válido por {duration.value} dias
                          </div>
                        </div>
                      </div>
                      <Badge variant="secondary">R$ {duration.price}</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-medium text-blue-900 mb-2">Resumo do Anúncio</h4>
              <div className="space-y-2 text-sm text-blue-800">
                <p>
                  <strong>Veículo:</strong> {vehicleData.brand} {vehicleData.model} {vehicleData.year}
                </p>
                <p>
                  <strong>Preço:</strong> {vehicleData.price}
                </p>
                <p>
                  <strong>Localização:</strong> {vehicleData.location}
                </p>
                <p>
                  <strong>Fotos:</strong> {vehicleData.images.length} imagem(ns)
                </p>
                <p>
                  <strong>Duração:</strong> {vehicleData.duration} dias
                </p>
              </div>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4 max-w-2xl">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="bg-green-600 p-3 rounded-xl">
                <Truck className="h-8 w-8 text-white" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Anunciar Veículo</h1>
            <p className="text-gray-600">Preencha as informações do seu veículo para criar o anúncio</p>
          </div>

          {/* Progress Steps */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              {[1, 2, 3, 4].map((step) => (
                <div key={step} className="flex items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${
                      step <= currentStep ? "bg-green-600 text-white" : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    {step}
                  </div>
                  {step < 4 && (
                    <div className={`w-full h-1 mx-4 ${step < currentStep ? "bg-green-600" : "bg-gray-200"}`} />
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-2 text-sm text-gray-600">
              <span>Dados Básicos</span>
              <span>Detalhes</span>
              <span>Fotos</span>
              <span>Pagamento</span>
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>
                {currentStep === 1 && "Dados Básicos do Veículo"}
                {currentStep === 2 && "Detalhes e Localização"}
                {currentStep === 3 && "Descrição e Fotos"}
                {currentStep === 4 && "Plano e Pagamento"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {error && (
                <Alert variant="destructive" className="mb-6">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {renderStep()}

              <div className="flex justify-between mt-8">
                <Button type="button" variant="outline" onClick={prevStep} disabled={currentStep === 1}>
                  Voltar
                </Button>

                {currentStep < 4 ? (
                  <Button type="button" onClick={nextStep} className="bg-green-600 hover:bg-green-700">
                    Próximo
                  </Button>
                ) : (
                  <Button
                    type="button"
                    onClick={handleSubmit}
                    disabled={isLoading || !validateStep(4)}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    <CreditCard className="h-4 w-4 mr-2" />
                    {isLoading ? "Processando..." : "Finalizar e Pagar"}
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </ProtectedRoute>
  )
}
