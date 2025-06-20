"use client"

import { ProtectedRoute } from "@/components/protected-route"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  DollarSign,
  TrendingUp,
  Users,
  Truck,
  Eye,
  CheckCircle,
  XCircle,
  BarChart3,
  MapPin,
  Calendar,
} from "lucide-react"
import { useState } from "react"

interface AdData {
  id: string
  title: string
  user: string
  price: number
  location: string
  status: "pending" | "approved" | "rejected"
  createdAt: string
  type: "vehicle" | "banner"
}

export default function AdminPage() {
  const [selectedTab, setSelectedTab] = useState("dashboard")

  // Mock data
  const stats = {
    totalRevenue: 125000,
    monthlyRevenue: 15000,
    totalUsers: 2847,
    activeAds: 156,
    pendingAds: 23,
  }

  const recentAds: AdData[] = [
    {
      id: "1",
      title: "Volvo FH 540 6x4",
      user: "João Silva",
      price: 450000,
      location: "Curitiba, PR",
      status: "pending",
      createdAt: "2024-01-15",
      type: "vehicle",
    },
    {
      id: "2",
      title: "Banner Scania Header",
      user: "Scania Brasil",
      price: 600,
      location: "São Paulo, SP",
      status: "approved",
      createdAt: "2024-01-14",
      type: "banner",
    },
    {
      id: "3",
      title: "John Deere 6110J",
      user: "Maria Santos",
      price: 320000,
      location: "Londrina, PR",
      status: "approved",
      createdAt: "2024-01-13",
      type: "vehicle",
    },
  ]

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: 0,
    }).format(value)
  }

  const handleAdAction = (adId: string, action: "approve" | "reject") => {
    console.log(`${action} ad ${adId}`)
    // In real app, this would call API
  }

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Receita Total</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(stats.totalRevenue)}</div>
            <p className="text-xs text-muted-foreground">+12% em relação ao mês anterior</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Receita Mensal</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(stats.monthlyRevenue)}</div>
            <p className="text-xs text-muted-foreground">Janeiro 2024</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Usuários Ativos</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalUsers.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">+8% novos usuários este mês</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Anúncios Ativos</CardTitle>
            <Truck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeAds}</div>
            <p className="text-xs text-muted-foreground">{stats.pendingAds} aguardando aprovação</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Anúncios Recentes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentAds.map((ad) => (
                <div key={ad.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex-1">
                    <div className="font-medium">{ad.title}</div>
                    <div className="text-sm text-gray-600 flex items-center">
                      <MapPin className="h-3 w-3 mr-1" />
                      {ad.location} • {ad.user}
                    </div>
                    <div className="text-sm text-gray-500">
                      {ad.type === "vehicle" ? formatCurrency(ad.price) : `Banner - ${formatCurrency(ad.price)}`}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge
                      variant={
                        ad.status === "approved" ? "default" : ad.status === "pending" ? "secondary" : "destructive"
                      }
                    >
                      {ad.status === "approved" ? "Aprovado" : ad.status === "pending" ? "Pendente" : "Rejeitado"}
                    </Badge>
                    {ad.status === "pending" && (
                      <div className="flex space-x-1">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleAdAction(ad.id, "approve")}
                          className="h-8 w-8 p-0"
                        >
                          <CheckCircle className="h-4 w-4 text-green-600" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleAdAction(ad.id, "reject")}
                          className="h-8 w-8 p-0"
                        >
                          <XCircle className="h-4 w-4 text-red-600" />
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Distribuição por Região</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { region: "Curitiba, PR", count: 45, percentage: 28 },
                { region: "São Paulo, SP", count: 38, percentage: 24 },
                { region: "Londrina, PR", count: 22, percentage: 14 },
                { region: "Cascavel, PR", count: 18, percentage: 11 },
                { region: "Outros", count: 33, percentage: 23 },
              ].map((item) => (
                <div key={item.region} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 text-gray-400 mr-2" />
                    <span className="text-sm">{item.region}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-20 bg-gray-200 rounded-full h-2">
                      <div className="bg-green-600 h-2 rounded-full" style={{ width: `${item.percentage}%` }} />
                    </div>
                    <span className="text-sm font-medium">{item.count}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )

  const renderAdManagement = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Gerenciar Anúncios</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentAds.map((ad) => (
              <div key={ad.id} className="border rounded-lg p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h3 className="font-medium">{ad.title}</h3>
                      <Badge variant={ad.type === "vehicle" ? "default" : "secondary"}>
                        {ad.type === "vehicle" ? "Veículo" : "Banner"}
                      </Badge>
                    </div>
                    <div className="text-sm text-gray-600 space-y-1">
                      <div className="flex items-center">
                        <Users className="h-3 w-3 mr-1" />
                        {ad.user}
                      </div>
                      <div className="flex items-center">
                        <MapPin className="h-3 w-3 mr-1" />
                        {ad.location}
                      </div>
                      <div className="flex items-center">
                        <Calendar className="h-3 w-3 mr-1" />
                        {new Date(ad.createdAt).toLocaleDateString("pt-BR")}
                      </div>
                      <div className="flex items-center">
                        <DollarSign className="h-3 w-3 mr-1" />
                        {formatCurrency(ad.price)}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge
                      variant={
                        ad.status === "approved" ? "default" : ad.status === "pending" ? "secondary" : "destructive"
                      }
                    >
                      {ad.status === "approved" ? "Aprovado" : ad.status === "pending" ? "Pendente" : "Rejeitado"}
                    </Badge>
                    <Button size="sm" variant="outline">
                      <Eye className="h-4 w-4 mr-1" />
                      Ver
                    </Button>
                    {ad.status === "pending" && (
                      <>
                        <Button
                          size="sm"
                          onClick={() => handleAdAction(ad.id, "approve")}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Aprovar
                        </Button>
                        <Button size="sm" variant="destructive" onClick={() => handleAdAction(ad.id, "reject")}>
                          <XCircle className="h-4 w-4 mr-1" />
                          Rejeitar
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderAnalytics = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <BarChart3 className="h-5 w-5 mr-2" />
            Relatórios e Análises
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-4">Receita por Mês</h4>
              <div className="space-y-3">
                {[
                  { month: "Janeiro", revenue: 15000, growth: 12 },
                  { month: "Dezembro", revenue: 13400, growth: 8 },
                  { month: "Novembro", revenue: 12400, growth: 15 },
                  { month: "Outubro", revenue: 10800, growth: 5 },
                ].map((item) => (
                  <div key={item.month} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="font-medium">{item.month}</span>
                    <div className="text-right">
                      <div className="font-bold">{formatCurrency(item.revenue)}</div>
                      <div className={`text-sm ${item.growth > 0 ? "text-green-600" : "text-red-600"}`}>
                        {item.growth > 0 ? "+" : ""}
                        {item.growth}%
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-4">Tipos de Anúncios</h4>
              <div className="space-y-3">
                {[
                  { type: "Veículos", count: 134, revenue: 6700 },
                  { type: "Banner Header", count: 12, revenue: 7200 },
                  { type: "Banner Sidebar", count: 8, revenue: 3200 },
                  { type: "Banner Footer", count: 6, revenue: 3000 },
                ].map((item) => (
                  <div key={item.type} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="font-medium">{item.type}</span>
                    <div className="text-right">
                      <div className="font-bold">{item.count} anúncios</div>
                      <div className="text-sm text-gray-600">{formatCurrency(item.revenue)}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  return (
    <ProtectedRoute requireAdmin>
      <div className="min-h-screen bg-gray-50">
        <div className="bg-white border-b">
          <div className="container mx-auto px-4 py-6">
            <h1 className="text-3xl font-bold text-gray-900">Painel Administrativo</h1>
            <p className="text-gray-600 mt-2">Gerencie anúncios, usuários e acompanhe métricas da plataforma</p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          {/* Navigation Tabs */}
          <div className="mb-8">
            <nav className="flex space-x-8">
              {[
                { id: "dashboard", label: "Dashboard", icon: BarChart3 },
                { id: "ads", label: "Gerenciar Anúncios", icon: Truck },
                { id: "analytics", label: "Relatórios", icon: TrendingUp },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setSelectedTab(tab.id)}
                  className={`flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                    selectedTab === tab.id ? "bg-green-100 text-green-700" : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  <tab.icon className="h-4 w-4 mr-2" />
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          {selectedTab === "dashboard" && renderDashboard()}
          {selectedTab === "ads" && renderAdManagement()}
          {selectedTab === "analytics" && renderAnalytics()}
        </div>
      </div>
    </ProtectedRoute>
  )
}
