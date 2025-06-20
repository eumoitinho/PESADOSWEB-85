"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle, Truck, Clock, CreditCard } from "lucide-react"
import Link from "next/link"

export default function AnuncieSuccessPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full">
        <Card>
          <CardContent className="p-8 text-center">
            <div className="mb-6">
              <div className="bg-green-100 p-4 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                <CheckCircle className="h-10 w-10 text-green-600" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Anúncio Criado com Sucesso!</h1>
              <p className="text-gray-600">
                Seu anúncio foi enviado para análise e será publicado em até 24 horas após a aprovação.
              </p>
            </div>

            <div className="space-y-4 mb-8">
              <div className="flex items-center text-sm text-gray-600">
                <Clock className="h-4 w-4 mr-2 text-blue-500" />
                <span>Análise: até 24 horas</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <CreditCard className="h-4 w-4 mr-2 text-green-500" />
                <span>Pagamento: processado com sucesso</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Truck className="h-4 w-4 mr-2 text-orange-500" />
                <span>Publicação: após aprovação</span>
              </div>
            </div>

            <div className="space-y-3">
              <Button asChild className="w-full bg-green-600 hover:bg-green-700">
                <Link href="/meus-anuncios">Ver Meus Anúncios</Link>
              </Button>
              <Button asChild variant="outline" className="w-full">
                <Link href="/">Voltar ao Início</Link>
              </Button>
            </div>

            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-800">
                <strong>Próximos passos:</strong> Você receberá um email quando seu anúncio for aprovado e publicado.
                Mantenha suas informações de contato atualizadas para receber consultas de interessados.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
