import Link from "next/link"
import { Truck, Facebook, Instagram, Youtube, Mail, Phone, MapPin } from "lucide-react"
import { BannerAd } from "./banner-ad"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-4">
        <BannerAd placement="footer" />
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="bg-blue-600 p-2 rounded-lg">
                <Truck className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold">Pesados Web</span>
            </div>
            <p className="text-gray-400 mb-4">
              A maior plataforma do Brasil para compra e venda de veículos pesados, tratores e implementos agrícolas.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Links Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/comprar" className="text-gray-400 hover:text-white transition-colors">
                  Comprar Veículos
                </Link>
              </li>
              <li>
                <Link href="/anuncie" className="text-gray-400 hover:text-white transition-colors">
                  Anunciar Veículo
                </Link>
              </li>
              <li>
                <Link href="/caminhoes" className="text-gray-400 hover:text-white transition-colors">
                  Caminhões
                </Link>
              </li>
              <li>
                <Link href="/tratores" className="text-gray-400 hover:text-white transition-colors">
                  Tratores
                </Link>
              </li>
              <li>
                <Link href="/implementos" className="text-gray-400 hover:text-white transition-colors">
                  Implementos
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Suporte</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/ajuda" className="text-gray-400 hover:text-white transition-colors">
                  Central de Ajuda
                </Link>
              </li>
              <li>
                <Link href="/quem-somos" className="text-gray-400 hover:text-white transition-colors">
                  Quem Somos
                </Link>
              </li>
              <li>
                <Link href="/politica-privacidade" className="text-gray-400 hover:text-white transition-colors">
                  Política de Privacidade
                </Link>
              </li>
              <li>
                <Link href="/termos-uso" className="text-gray-400 hover:text-white transition-colors">
                  Termos de Uso
                </Link>
              </li>
              <li>
                <button className="text-gray-400 hover:text-white transition-colors text-left">
                  Gerenciar Cookies
                </button>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contato</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-gray-400" />
                <a href="mailto:contato@pesadosweb.com.br" className="text-gray-400 hover:text-white transition-colors">
                  contato@pesadosweb.com.br
                </a>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-gray-400" />
                <span className="text-gray-400">(41) 3000-0000</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-gray-400" />
                <span className="text-gray-400">Curitiba, PR - Brasil</span>
              </div>
            </div>

            <div className="mt-6">
              <p className="text-sm text-gray-400 mb-2">Baixe nosso app:</p>
              <div className="flex space-x-2">
                <img
                  src="/placeholder.svg?height=40&width=120"
                  alt="App Store"
                  className="h-10 hover:opacity-80 transition-opacity cursor-pointer"
                />
                <img
                  src="/placeholder.svg?height=40&width=120"
                  alt="Google Play"
                  className="h-10 hover:opacity-80 transition-opacity cursor-pointer"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">© {currentYear} Pesados Web. Todos os direitos reservados.</p>
            <div className="flex items-center space-x-4 mt-4 md:mt-0">
              <span className="text-sm text-gray-400">Parceiro oficial:</span>
              <div className="bg-white p-2 rounded">
                <span className="text-blue-900 font-bold text-sm">Visão Total</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
