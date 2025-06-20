"use client"

import { Button } from "@/components/ui/button"
import { Smartphone, Download, Star } from "lucide-react"
import { motion } from "framer-motion"
import Image from "next/image"

export function AppDownload() {
  return (
    <section className="py-16 bg-gradient-to-br from-green-600 to-green-700 text-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center mb-6">
              <Image src="/images/logo-circular.webp" alt="Pesados Web App" width={60} height={60} className="mr-4" />
              <h2 className="text-3xl md:text-4xl font-bold">Baixe o App Pesados Web</h2>
            </div>

            <p className="text-xl text-green-100 mb-8">
              Acesse milhares de veículos pesados na palma da sua mão. Disponível para iOS e Android com todas as
              funcionalidades da plataforma.
            </p>

            <div className="space-y-4 mb-8">
              <div className="flex items-center space-x-3">
                <div className="bg-green-500 p-2 rounded-full">
                  <Smartphone className="h-5 w-5" />
                </div>
                <span>Interface otimizada para mobile</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="bg-green-500 p-2 rounded-full">
                  <Download className="h-5 w-5" />
                </div>
                <span>Notificações de novos anúncios</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="bg-green-500 p-2 rounded-full">
                  <Star className="h-5 w-5" />
                </div>
                <span>Busca por localização GPS</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="bg-black hover:bg-gray-800 text-white rounded-xl px-6 py-4 flex items-center"
              >
                <Image
                  src="/images/app-store.png"
                  alt="Download na App Store"
                  width={120}
                  height={40}
                  className="h-10 w-auto"
                />
              </Button>
              <Button
                size="lg"
                className="bg-green-500 hover:bg-green-400 text-white rounded-xl px-6 py-4 flex items-center"
              >
                <Image
                  src="/images/google-play.png"
                  alt="Baixar no Google Play"
                  width={120}
                  height={40}
                  className="h-10 w-auto"
                />
              </Button>
            </div>

            <div className="mt-6 flex items-center space-x-4 text-green-100">
              <div className="flex items-center">
                <div className="flex space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current text-yellow-400" />
                  ))}
                </div>
                <span className="ml-2 text-sm">4.8/5</span>
              </div>
              <span className="text-sm">Mais de 10.000 downloads</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative mx-auto max-w-sm">
              <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 shadow-2xl">
                <Image
                  src="/images/logo-circular.webp"
                  alt="Pesados Web App Interface"
                  width={300}
                  height={600}
                  className="w-full h-auto rounded-2xl"
                />
              </div>

              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 bg-white text-green-600 p-3 rounded-full shadow-lg">
                <Download className="h-6 w-6" />
              </div>

              <div className="absolute -bottom-4 -left-4 bg-white text-green-600 p-3 rounded-full shadow-lg">
                <Smartphone className="h-6 w-6" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
