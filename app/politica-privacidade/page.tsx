import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, Eye, Lock, Mail } from "lucide-react"

export default function PoliticaPrivacidadePage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Política de Privacidade</h1>
          <p className="text-lg text-gray-600">Última atualização: {new Date().toLocaleDateString("pt-BR")}</p>
        </div>

        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="h-6 w-6 mr-2 text-blue-900" />
                Compromisso com sua Privacidade
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 leading-relaxed">
                A Pesados Web está comprometida em proteger sua privacidade e dados pessoais, em conformidade com a Lei
                Geral de Proteção de Dados (LGPD - Lei 13.709/2018). Esta política explica como coletamos, usamos,
                armazenamos e protegemos suas informações.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Eye className="h-6 w-6 mr-2 text-blue-900" />
                Dados Coletados
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Dados Fornecidos por Você:</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  <li>Nome completo e informações de contato (email, telefone)</li>
                  <li>Localização (estado, cidade) para personalização de anúncios</li>
                  <li>Informações de pagamento (processadas via AbacatePay)</li>
                  <li>Dados dos veículos anunciados (marca, modelo, preço, fotos)</li>
                  <li>Comunicações conosco (mensagens, avaliações)</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Dados Coletados Automaticamente:</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  <li>Endereço IP e informações do dispositivo</li>
                  <li>Dados de navegação (páginas visitadas, tempo de permanência)</li>
                  <li>Localização geográfica (com seu consentimento)</li>
                  <li>Cookies e tecnologias similares</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Como Usamos seus Dados</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <div className="bg-blue-100 p-2 rounded-lg flex-shrink-0">
                    <span className="text-blue-900 font-semibold">1</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">Prestação de Serviços</h4>
                    <p className="text-gray-700">
                      Facilitar compra e venda de veículos, processar pagamentos e fornecer suporte.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="bg-blue-100 p-2 rounded-lg flex-shrink-0">
                    <span className="text-blue-900 font-semibold">2</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">Personalização</h4>
                    <p className="text-gray-700">
                      Exibir anúncios relevantes baseados na sua localização (priorizando Curitiba e região).
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="bg-blue-100 p-2 rounded-lg flex-shrink-0">
                    <span className="text-blue-900 font-semibold">3</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">Comunicação</h4>
                    <p className="text-gray-700">
                      Enviar notificações importantes, atualizações de serviço e marketing (com consentimento).
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="bg-blue-100 p-2 rounded-lg flex-shrink-0">
                    <span className="text-blue-900 font-semibold">4</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">Melhoria dos Serviços</h4>
                    <p className="text-gray-700">
                      Analisar uso da plataforma para melhorar funcionalidades e experiência do usuário.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Compartilhamento de Dados</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-4">Seus dados podem ser compartilhados apenas nas seguintes situações:</p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>
                  <strong>AbacatePay:</strong> Para processamento seguro de pagamentos
                </li>
                <li>
                  <strong>Visão Total:</strong> Para inspeções de veículos (apenas dados necessários)
                </li>
                <li>
                  <strong>Parceiros de Marketing:</strong> Google, Facebook (dados anonimizados, com consentimento)
                </li>
                <li>
                  <strong>Autoridades:</strong> Quando exigido por lei ou ordem judicial
                </li>
                <li>
                  <strong>Compradores/Vendedores:</strong> Informações de contato (apenas para usuários logados)
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Lock className="h-6 w-6 mr-2 text-blue-900" />
                Seus Direitos (LGPD)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-4">Você tem os seguintes direitos sobre seus dados pessoais:</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Acesso</h4>
                  <p className="text-sm text-gray-700">Confirmar se processamos seus dados e acessá-los</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Correção</h4>
                  <p className="text-sm text-gray-700">Corrigir dados incompletos ou inexatos</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Exclusão</h4>
                  <p className="text-sm text-gray-700">Solicitar a exclusão de dados desnecessários</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Portabilidade</h4>
                  <p className="text-sm text-gray-700">Receber seus dados em formato estruturado</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Oposição</h4>
                  <p className="text-sm text-gray-700">Opor-se ao tratamento em situações específicas</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Revogação</h4>
                  <p className="text-sm text-gray-700">Retirar consentimento a qualquer momento</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Cookies e Tecnologias</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Cookies Essenciais</h4>
                  <p className="text-gray-700">Necessários para funcionamento básico (login, carrinho, preferências)</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Cookies de Análise</h4>
                  <p className="text-gray-700">Google Analytics para entender como você usa nosso site</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Cookies de Marketing</h4>
                  <p className="text-gray-700">Personalização de anúncios baseada em localização e interesses</p>
                </div>
              </div>
              <p className="text-sm text-gray-600 mt-4">
                Você pode gerenciar suas preferências de cookies a qualquer momento através do link no rodapé.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Segurança dos Dados</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-4">
                Implementamos medidas técnicas e organizacionais para proteger seus dados:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                <li>Criptografia SSL/TLS para transmissão de dados</li>
                <li>Armazenamento seguro em servidores protegidos</li>
                <li>Acesso restrito apenas a funcionários autorizados</li>
                <li>Monitoramento contínuo de segurança</li>
                <li>Backups regulares e planos de recuperação</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Retenção de Dados</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-4">Mantemos seus dados pelo tempo necessário para:</p>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                <li>Cumprir obrigações legais e contratuais</li>
                <li>Resolver disputas e fazer cumprir acordos</li>
                <li>Fornecer serviços solicitados</li>
                <li>Dados de anúncios: até 5 anos após expiração</li>
                <li>Dados de pagamento: conforme exigido pela legislação fiscal</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Mail className="h-6 w-6 mr-2 text-blue-900" />
                Contato e Exercício de Direitos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-4">
                Para exercer seus direitos ou esclarecer dúvidas sobre esta política:
              </p>
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="font-semibold text-blue-900 mb-2">Encarregado de Dados (DPO)</p>
                <p className="text-gray-700">
                  Email:{" "}
                  <a href="mailto:privacidade@pesadosweb.com.br" className="text-blue-900 hover:underline">
                    privacidade@pesadosweb.com.br
                  </a>
                </p>
                <p className="text-gray-700">
                  Contato Geral:{" "}
                  <a href="mailto:contato@pesadosweb.com.br" className="text-blue-900 hover:underline">
                    contato@pesadosweb.com.br
                  </a>
                </p>
                <p className="text-gray-700">Telefone: (41) 3000-0000</p>
                <p className="text-gray-700">Prazo de resposta: até 15 dias úteis</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Alterações nesta Política</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">
                Esta política pode ser atualizada periodicamente. Notificaremos sobre mudanças significativas por email
                ou através de aviso em nosso site. A versão mais atual estará sempre disponível nesta página.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
