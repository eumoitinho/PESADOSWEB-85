import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { AuthProvider } from "@/lib/auth"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Pesados Web - Compre e Venda Caminhões, Tratores e Implementos",
  description:
    "A maior plataforma do Brasil para compra e venda de veículos pesados, tratores e implementos agrícolas. Encontre o veículo ideal para seu negócio.",
  keywords: "caminhões, tratores, implementos agrícolas, veículos pesados, comprar caminhão, vender caminhão, Brasil",
  authors: [{ name: "Pesados Web" }],
  openGraph: {
    title: "Pesados Web - Marketplace de Veículos Pesados",
    description: "Compre e venda caminhões, tratores e implementos com segurança e facilidade.",
    url: "https://pesadosweb.com.br",
    siteName: "Pesados Web",
    locale: "pt_BR",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <AuthProvider>
          <Header />
          {children}
          <Footer />
        </AuthProvider>
      </body>
    </html>
  )
}
