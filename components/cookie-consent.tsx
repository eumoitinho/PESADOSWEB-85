"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Cookie, Settings, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export function CookieConsent() {
  const [showConsent, setShowConsent] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [preferences, setPreferences] = useState({
    essential: true, // Always true, cannot be disabled
    analytics: false,
    marketing: false,
  })

  useEffect(() => {
    // Check if user has already given consent
    const consent = localStorage.getItem("cookie-consent")
    if (!consent) {
      setShowConsent(true)
    }
  }, [])

  const handleAcceptAll = () => {
    const consent = {
      essential: true,
      analytics: true,
      marketing: true,
      timestamp: new Date().toISOString(),
    }
    localStorage.setItem("cookie-consent", JSON.stringify(consent))
    setShowConsent(false)
  }

  const handleRejectAll = () => {
    const consent = {
      essential: true,
      analytics: false,
      marketing: false,
      timestamp: new Date().toISOString(),
    }
    localStorage.setItem("cookie-consent", JSON.stringify(consent))
    setShowConsent(false)
  }

  const handleSavePreferences = () => {
    const consent = {
      ...preferences,
      timestamp: new Date().toISOString(),
    }
    localStorage.setItem("cookie-consent", JSON.stringify(consent))
    setShowConsent(false)
    setShowSettings(false)
  }

  if (!showConsent) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 100 }}
        className="fixed bottom-4 left-4 right-4 z-50 max-w-md mx-auto"
      >
        <Card className="shadow-2xl border-2 border-blue-200">
          <CardContent className="p-6">
            <div className="flex items-start space-x-3 mb-4">
              <Cookie className="h-6 w-6 text-blue-900 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-gray-900 mb-2">Cookies e Privacidade</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Utilizamos cookies para melhorar sua experiência, personalizar anúncios baseados na sua localização e
                  analisar o tráfego do site, conforme nossa Política de Privacidade e em conformidade com a LGPD.
                </p>
              </div>
            </div>

            {!showSettings ? (
              <div className="space-y-3">
                <div className="flex flex-col sm:flex-row gap-2">
                  <Button
                    onClick={handleAcceptAll}
                    className="bg-blue-900 hover:bg-blue-800 text-white rounded-lg flex-1"
                  >
                    Aceitar Todos
                  </Button>
                  <Button
                    onClick={handleRejectAll}
                    variant="outline"
                    className="border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg flex-1"
                  >
                    Rejeitar Todos
                  </Button>
                </div>
                <Button
                  onClick={() => setShowSettings(true)}
                  variant="ghost"
                  className="w-full text-blue-900 hover:bg-blue-50 rounded-lg"
                >
                  <Settings className="h-4 w-4 mr-2" />
                  Personalizar
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <div className="font-medium text-sm">Cookies Essenciais</div>
                      <div className="text-xs text-gray-600">Necessários para o funcionamento do site</div>
                    </div>
                    <div className="text-xs text-green-600 font-medium">Sempre Ativo</div>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <div className="font-medium text-sm">Cookies de Análise</div>
                      <div className="text-xs text-gray-600">Ajudam a entender como você usa o site</div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={preferences.analytics}
                        onChange={(e) => setPreferences((prev) => ({ ...prev, analytics: e.target.checked }))}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <div className="font-medium text-sm">Cookies de Marketing</div>
                      <div className="text-xs text-gray-600">Personalizam anúncios baseados na localização</div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={preferences.marketing}
                        onChange={(e) => setPreferences((prev) => ({ ...prev, marketing: e.target.checked }))}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    onClick={handleSavePreferences}
                    className="bg-blue-900 hover:bg-blue-800 text-white rounded-lg flex-1"
                  >
                    Salvar Preferências
                  </Button>
                  <Button
                    onClick={() => setShowSettings(false)}
                    variant="outline"
                    className="border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}

            <div className="mt-4 pt-3 border-t border-gray-200">
              <div className="flex flex-wrap gap-2 text-xs">
                <a href="/politica-privacidade" className="text-blue-900 hover:underline">
                  Política de Privacidade
                </a>
                <span className="text-gray-400">•</span>
                <a href="/termos-uso" className="text-blue-900 hover:underline">
                  Termos de Uso
                </a>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </AnimatePresence>
  )
}
