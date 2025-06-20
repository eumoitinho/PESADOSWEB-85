"use client"

import { useState } from "react"
import Link from "next/link"
import { useAuth } from "@/lib/auth"
import { Button } from "@/components/ui/button"
import { Menu, X, User, LogOut } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { user, logout, isAuthenticated, isAdmin } = useAuth()

  const navigation = [
    { name: "Comprar", href: "/comprar" },
    { name: "Caminhões", href: "/caminhoes" },
    { name: "Tratores", href: "/tratores" },
    { name: "Implementos", href: "/implementos" },
    { name: "Anuncie", href: "/anuncie" },
    { name: "Quem Somos", href: "/quem-somos" },
    { name: "Ajuda", href: "/ajuda" },
  ]

  return (
    <header className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center">
            <Image src="/images/logo-text.png" alt="Pesados Web" width={150} height={40} className="h-8 w-auto" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-700 hover:text-green-600 font-medium transition-colors duration-200"
              >
                {item.name}
              </Link>
            ))}
            {isAdmin && (
              <Link
                href="/admin"
                className="text-gray-700 hover:text-green-600 font-medium transition-colors duration-200"
              >
                Admin
              </Link>
            )}
          </nav>

          {/* Auth Buttons */}
          <div className="hidden lg:flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <span className="text-gray-700">Olá, {user?.name}</span>
                <Link href="/meus-anuncios">
                  <Button variant="ghost" className="text-gray-700 hover:text-green-600">
                    Meus Anúncios
                  </Button>
                </Link>
                <Button onClick={logout} variant="ghost" className="text-gray-700 hover:text-green-600">
                  <LogOut className="h-4 w-4 mr-2" />
                  Sair
                </Button>
              </div>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="ghost" className="text-gray-700 hover:text-green-600">
                    <User className="h-4 w-4 mr-2" />
                    Entrar
                  </Button>
                </Link>
                <Link href="/register">
                  <Button className="bg-green-600 hover:bg-green-700 text-white rounded-lg">Cadastrar</Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden border-t border-gray-100 py-4"
            >
              <nav className="flex flex-col space-y-4">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="text-gray-700 hover:text-green-600 font-medium py-2 transition-colors duration-200"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
                {isAdmin && (
                  <Link
                    href="/admin"
                    className="text-gray-700 hover:text-green-600 font-medium py-2 transition-colors duration-200"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Admin
                  </Link>
                )}
                <div className="flex flex-col space-y-2 pt-4 border-t border-gray-100">
                  {isAuthenticated ? (
                    <>
                      <span className="text-gray-700 py-2">Olá, {user?.name}</span>
                      <Link href="/meus-anuncios" onClick={() => setIsMenuOpen(false)}>
                        <Button variant="ghost" className="justify-start text-gray-700 hover:text-green-600">
                          Meus Anúncios
                        </Button>
                      </Link>
                      <Button
                        onClick={() => {
                          logout()
                          setIsMenuOpen(false)
                        }}
                        variant="ghost"
                        className="justify-start text-gray-700 hover:text-green-600"
                      >
                        <LogOut className="h-4 w-4 mr-2" />
                        Sair
                      </Button>
                    </>
                  ) : (
                    <>
                      <Link href="/login" onClick={() => setIsMenuOpen(false)}>
                        <Button variant="ghost" className="justify-start text-gray-700 hover:text-green-600">
                          <User className="h-4 w-4 mr-2" />
                          Entrar
                        </Button>
                      </Link>
                      <Link href="/register" onClick={() => setIsMenuOpen(false)}>
                        <Button className="bg-green-600 hover:bg-green-700 text-white rounded-lg">Cadastrar</Button>
                      </Link>
                    </>
                  )}
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  )
}
