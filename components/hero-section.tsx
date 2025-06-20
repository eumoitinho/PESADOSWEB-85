"use client"

import { Button } from "@/components/ui/button"
import { Search, Truck, Tractor, Wrench } from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"

export function HeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-green-600 via-green-700 to-green-800 text-white py-20 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-black/20" />
      <div
        className="absolute inset-0 bg-cover bg-center opacity-30"
        style={{
          backgroundImage: "url('/placeholder.svg?height=800&width=1200')",
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-bold mb-6 leading-tight"
          >
            Compre e Venda <span className="text-green-400">Caminhões</span> com Facilidade
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl mb-8 text-green-100"
          >
            A maior plataforma do Brasil para veículos pesados, tratores e implementos agrícolas
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
          >
            <Button
              asChild
              size="lg"
              className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 text-lg rounded-xl transition-all duration-300 hover:scale-105"
            >
              <Link href="/anuncie">
                <Truck className="mr-2 h-5 w-5" />
                Anuncie Agora
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-green-500 hover:text-white px-8 py-4 text-lg rounded-xl transition-all duration-300 hover:scale-105"
            >
              <Link href="/comprar">
                <Search className="mr-2 h-5 w-5" />
                Buscar Veículos
              </Link>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto"
          >
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center hover:bg-white/20 transition-all duration-300">
              <Truck className="h-12 w-12 mx-auto mb-4 text-green-400" />
              <h3 className="text-lg font-semibold mb-2">Caminhões</h3>
              <p className="text-green-100">Encontre o caminhão ideal para seu negócio</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center hover:bg-white/20 transition-all duration-300">
              <Tractor className="h-12 w-12 mx-auto mb-4 text-green-400" />
              <h3 className="text-lg font-semibold mb-2">Tratores</h3>
              <p className="text-green-100">Tratores para agricultura e construção</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center hover:bg-white/20 transition-all duration-300">
              <Wrench className="h-12 w-12 mx-auto mb-4 text-green-400" />
              <h3 className="text-lg font-semibold mb-2">Implementos</h3>
              <p className="text-green-100">Implementos agrícolas e equipamentos</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
