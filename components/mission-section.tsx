"use client"

import { motion } from "framer-motion"
import { Shield, Zap, Users, Award } from "lucide-react"
import Image from "next/image"

export function MissionSection() {
  const features = [
    {
      icon: Shield,
      title: "Confiança",
      description: "Verificação rigorosa de todos os anúncios e parceria com Visão Total para inspeções.",
    },
    {
      icon: Zap,
      title: "Inovação",
      description: "Tecnologia de ponta para conectar compradores e vendedores de forma eficiente.",
    },
    {
      icon: Users,
      title: "Comunidade",
      description: "Mais de 50.000 usuários ativos em todo o Brasil confiam na nossa plataforma.",
    },
    {
      icon: Award,
      title: "Excelência",
      description: "Reconhecidos como a melhor plataforma de veículos pesados do país.",
    },
  ]

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Revolucionando o Mercado de Veículos Pesados
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Desde 2021, a Pesados Web tem como missão transformar a forma como brasileiros compram e vendem caminhões,
              tratores e implementos agrícolas. Com o apoio do ex-lutador Wanderlei Silva, construímos uma plataforma
              baseada em confiança, inovação e eficiência.
            </p>

            <div className="bg-green-50 p-6 rounded-xl mb-8">
              <div className="flex items-start space-x-4">
                <Image
                  src="/images/wanderlei-silva.jpg"
                  alt="Wanderlei Silva"
                  width={80}
                  height={80}
                  className="rounded-full object-cover"
                />
                <div>
                  <blockquote className="text-gray-700 italic mb-2">
                    "A Pesados Web representa a força e determinação que sempre defendi. Uma plataforma que luta pelos
                    brasileiros que trabalham duro."
                  </blockquote>
                  <cite className="text-sm font-medium text-green-700">- Wanderlei Silva, Embaixador da Marca</cite>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="flex items-start space-x-3"
                >
                  <div className="bg-green-100 p-2 rounded-lg flex-shrink-0">
                    <feature.icon className="h-5 w-5 text-green-700" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">{feature.title}</h3>
                    <p className="text-sm text-gray-600">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/images/wanderlei-silva.jpg"
                alt="Wanderlei Silva - Embaixador Pesados Web"
                width={500}
                height={600}
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-green-900/20 to-transparent" />
            </div>

            {/* Floating Stats */}
            <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-lg">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">50K+</div>
                <div className="text-sm text-gray-600">Usuários Ativos</div>
              </div>
            </div>

            <div className="absolute -top-6 -right-6 bg-white p-6 rounded-xl shadow-lg">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">R$ 2B+</div>
                <div className="text-sm text-gray-600">Em Negócios</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
