"use client"

import { useState } from "react"
import { ProtectedRoute } from "@/components/protected-route"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Truck, Plus, Eye, Edit, Trash2, Clock, CheckCircle, XCircle } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

interface UserAd {
  id: string
  title: string
  price: number
  status: "pending" | "approved" | "rejected" | "expired"
  views: number
  contacts: number
  createdAt: string
  expiresAt: string
  image: string
}

export default function MeusAnunciosPage() {
  const [ads] = useState<UserAd[]>([
    {
      id: "1",
      title: "Volvo FH 540 6x4",
      price: 450000,
      status: "approved",
      views: 234,
      contacts: 12,
      createdAt: "2024-01-10",
      expiresAt: "2024-02-09",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: "2",
      title: "Scania R 450 A6x2",
      price: 520000,
      status: "pending",
      views: 0,
      contacts: 0,
      createdAt: "2024-01-15",
      expiresAt: "2024-02-14",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: "3",
      title: "Mercedes-Benz Actros 2651",
      price: 680000,
      status: "expired",
      views: 156,
      contacts: 8,
      createdAt: "2023-12-15",
      expiresAt: "2024-01-14",
      image: "/placeholder.svg?height=200&width=300",
    },
  ])

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: 0,
    }).format(value)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return <Badge className="bg-green-500 text-white">Ativo</Badge>
      case "pending":
        return <Badge variant="secondary">Aguardando Aprovação</Badge>
      case "rejected":
        return <Badge variant="destructive">Rejeitado</Badge>
      case "expired":
        return <Badge variant="outline">Expirado</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "pending":
        return <Clock className="h-4 w-4 text-yellow-500" />
      case "rejected":
        return <XCircle className="h-4 w-4 text-red-500" />
      case "expired":
        return <XCircle className="h-4 w-4 text-gray-500" />
      default:
        return null
    }
  }

  const activeAds = ads.filter((ad) => ad.status === "approved").length
  const totalViews = ads.reduce((sum, ad) => sum + ad.views, 0)
  const totalContacts = ads.reduce((sum, ad) => sum + ad.contacts, 0)

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Meus Anúncios</h1>
              <p className="text-gray-600">Gerencie seus anúncios e acompanhe o desempenho</p>
            </div>
            <Button asChild className="bg-green-600 hover:bg-green-700">
              <Link href="/anuncie">
                <Plus className="h-4 w-4 mr-2" />
                Novo Anúncio
              </Link>
            </Button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <Truck className="h-8 w-8 text-green-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Anúncios Ativos</p>
                    <p className="text-2xl font-bold text-gray-900">{activeAds}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <Eye className="h-8 w-8 text-blue-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Total de Visualizações</p>
                    <p className="text-2xl font-bold text-gray-900">{totalViews}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className="h-8 w-8 bg-orange-100 rounded-full flex items-center justify-center">
                    <span className="text-orange-600 font-bold">@</span>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Contatos Recebidos</p>
                    <p className="text-2xl font-bold text-gray-900">{totalContacts}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className="h-8 w-8 bg-purple-100 rounded-full flex items-center justify-center">
                    <span className="text-purple-600 font-bold">%</span>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Taxa de Conversão</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {totalViews > 0 ? ((totalContacts / totalViews) * 100).toFixed(1) : 0}%
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Ads List */}
          <div className="space-y-6">
            {ads.length === 0 ? (
              <Card>
                <CardContent className="p-12 text-center">
                  <Truck className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Nenhum anúncio encontrado</h3>
                  <p className="text-gray-600 mb-6">Você ainda não criou nenhum anúncio. Comece agora!</p>
                  <Button asChild className="bg-green-600 hover:bg-green-700">
                    <Link href="/anuncie">
                      <Plus className="h-4 w-4 mr-2" />
                      Criar Primeiro Anúncio
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ) : (
              ads.map((ad) => (
                <Card key={ad.id}>
                  <CardContent className="p-6">
                    <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                      {/* Image */}
                      <div className="flex-shrink-0">
                        <Image
                          src={ad.image || "/placeholder.svg"}
                          alt={ad.title}
                          width={200}
                          height={150}
                          className="w-48 h-36 object-cover rounded-lg"
                        />
                      </div>

                      {/* Content */}
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">{ad.title}</h3>
                            <p className="text-2xl font-bold text-green-600 mb-2">{formatCurrency(ad.price)}</p>
                            <div className="flex items-center space-x-2">
                              {getStatusIcon(ad.status)}
                              {getStatusBadge(ad.status)}
                            </div>
                          </div>
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                          <div>
                            <p className="text-sm text-gray-600">Visualizações</p>
                            <p className="font-semibold">{ad.views}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">Contatos</p>
                            <p className="font-semibold">{ad.contacts}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">Criado em</p>
                            <p className="font-semibold">{new Date(ad.createdAt).toLocaleDateString("pt-BR")}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">Expira em</p>
                            <p className="font-semibold">{new Date(ad.expiresAt).toLocaleDateString("pt-BR")}</p>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex flex-wrap gap-2">
                          <Button size="sm" variant="outline">
                            <Eye className="h-4 w-4 mr-1" />
                            Ver Anúncio
                          </Button>
                          {ad.status === "approved" && (
                            <Button size="sm" variant="outline">
                              <Edit className="h-4 w-4 mr-1" />
                              Editar
                            </Button>
                          )}
                          {ad.status === "expired" && (
                            <Button size="sm" className="bg-green-600 hover:bg-green-700">
                              Renovar Anúncio
                            </Button>
                          )}
                          <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700">
                            <Trash2 className="h-4 w-4 mr-1" />
                            Excluir
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
      </div>
    </ProtectedRoute>
  )
}
