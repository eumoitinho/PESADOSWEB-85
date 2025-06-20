import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, AlertTriangle, Shield, Gavel } from "lucide-react"

export default function TermosUsoPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Termos de Uso</h1>
          <p className="text-lg text-gray-600">Última atualização: {new Date().toLocaleDateString("pt-BR")}</p>
        </div>

        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="h-6 w-6 mr-2 text-blue-900" />
                Aceitação dos Termos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 leading-relaxed">
                Ao acessar e usar a plataforma Pesados Web, você concorda em cumprir estes Termos de Uso e nossa
                Política de Privacidade. Se você não concorda com qualquer parte destes termos, não deve usar nossos
                serviços.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Sobre a Plataforma</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-4">
                A Pesados Web é uma plataforma online que facilita a conexão entre compradores e vendedores de veículos
                pesados, tratores e implementos agrícolas no Brasil.
              </p>
              <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
                <div className="flex items-start space-x-2">
                  <AlertTriangle className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-yellow-800 mb-1">Importante</h4>
                    <p className="text-yellow-700 text-sm">
                      A Pesados Web NÃO realiza vendas diretas. Somos uma plataforma de intermediação que conecta
                      compradores e vendedores. Todas as transações são realizadas diretamente entre as partes.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Cadastro e Conta de Usuário</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Requisitos para Cadastro:</h4>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  <li>Ser maior de 18 anos ou ter autorização legal</li>
                  <li>Fornecer informações verdadeiras e atualizadas</li>
                  <li>Manter a confidencialidade de sua senha</li>
                  <li>Aceitar receber comunicações essenciais por email</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Responsabilidades do Usuário:</h4>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  <li>Manter dados de contato atualizados</li>
                  <li>Notificar imediatamente sobre uso não autorizado da conta</li>
                  <li>Usar a plataforma apenas para fins legítimos</li>
                  <li>Respeitar outros usuários e nossa equipe</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Anúncios de Veículos</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Regras para Anunciantes:</h4>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  <li>Fornecer informações precisas sobre o veículo</li>
                  <li>Usar apenas fotos reais e atuais do veículo</li>
                  <li>Definir preços justos e condizentes com o mercado</li>
                  <li>Responder prontamente às consultas de interessados</li>
                  <li>Informar a localização real do veículo</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Conteúdo Proibido:</h4>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  <li>Veículos roubados, clonados ou com documentação irregular</li>
                  <li>Informações falsas ou enganosas</li>
                  <li>Conteúdo ofensivo, discriminatório ou inadequado</li>
                  <li>Links para sites externos não autorizados</li>
                  <li>Spam ou anúncios duplicados</li>
                </ul>
              </div>

              <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-800 mb-2">Processo de Aprovação</h4>
                <p className="text-blue-700 text-sm">
                  Todos os anúncios passam por análise antes da publicação. Reservamo-nos o direito de rejeitar anúncios
                  que não atendam nossos critérios.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Pagamentos e Taxas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Taxa de Anúncio de Veículos:</h4>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  <li>Valor: R$ 50,00 por anúncio</li>
                  <li>Duração: 7, 30 ou 60 dias (conforme plano escolhido)</li>
                  <li>Pagamento via AbacatePay (boleto, cartão, PIX)</li>
                  <li>Ativação em até 24 horas após aprovação</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Anúncios de Banner (Empresas):</h4>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  <li>Header: R$ 600,00</li>
                  <li>Sidebar: R$ 400,00</li>
                  <li>Footer: R$ 500,00</li>
                  <li>In-Feed: R$ 450,00</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Política de Reembolso:</h4>
                <p className="text-gray-700">
                  Reembolsos são processados apenas em casos de erro técnico comprovado ou cancelamento antes da
                  ativação do anúncio. Não há reembolso após a publicação do anúncio.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Contato entre Usuários</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
                  <h4 className="font-semibold text-green-800 mb-2">Acesso a Informações de Contato</h4>
                  <p className="text-green-700 text-sm">
                    Apenas usuários logados podem visualizar informações de contato dos anunciantes. Esta medida protege
                    a privacidade e incentiva o cadastro na plataforma.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Diretrizes para Comunicação:</h4>
                  <ul className="list-disc list-inside text-gray-700 space-y-1">
                    <li>Manter comunicação respeitosa e profissional</li>
                    <li>Não compartilhar dados pessoais desnecessários</li>
                    <li>Reportar comportamentos inadequados</li>
                    <li>Realizar negociações de boa-fé</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="h-6 w-6 mr-2 text-blue-900" />
                Limitação de Responsabilidade
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">A Pesados Web NÃO se responsabiliza por:</h4>
                  <ul className="list-disc list-inside text-gray-700 space-y-1">
                    <li>Veracidade das informações fornecidas pelos usuários</li>
                    <li>Condição real dos veículos anunciados</li>
                    <li>Negociações e transações entre usuários</li>
                    <li>Problemas de entrega, pagamento ou documentação</li>
                    <li>Danos decorrentes do uso da plataforma</li>
                  </ul>
                </div>

                <div className="bg-red-50 border border-red-200 p-4 rounded-lg">
                  <div className="flex items-start space-x-2">
                    <AlertTriangle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-red-800 mb-1">Aviso Importante</h4>
                      <p className="text-red-700 text-sm">
                        Recomendamos sempre verificar pessoalmente o veículo, documentação e realizar inspeção técnica
                        antes de qualquer transação.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Propriedade Intelectual</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-4">
                Todo o conteúdo da plataforma (textos, imagens, logos, design) é protegido por direitos autorais e
                propriedade intelectual da Pesados Web.
              </p>
              <div>
                <h4 className="font-semibold mb-2">É proibido:</h4>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  <li>Copiar ou reproduzir conteúdo sem autorização</li>
                  <li>Usar nossa marca ou logo sem permissão</li>
                  <li>Criar sites ou aplicativos similares usando nosso conteúdo</li>
                  <li>Fazer engenharia reversa de nossa tecnologia</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Gavel className="h-6 w-6 mr-2 text-blue-900" />
                Violações e Penalidades
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Penalidades por Violação:</h4>
                  <ul className="list-disc list-inside text-gray-700 space-y-1">
                    <li>Advertência por email</li>
                    <li>Remoção de anúncios</li>
                    <li>Suspensão temporária da conta</li>
                    <li>Banimento permanente da plataforma</li>
                    <li>Ações legais quando aplicável</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Como Reportar Violações:</h4>
                  <p className="text-gray-700">
                    Entre em contato conosco através do email{" "}
                    <a href="mailto:contato@pesadosweb.com.br" className="text-blue-900 hover:underline">
                      contato@pesadosweb.com.br
                    </a>{" "}
                    com detalhes da violação e evidências quando possível.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Parceria Visão Total</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-4">
                Temos parceria com a Visão Total para inspeções técnicas de veículos. Anúncios com selo "Verificado"
                passaram por inspeção profissional.
              </p>
              <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                <p className="text-blue-700 text-sm">
                  A inspeção é opcional e de responsabilidade do vendedor. A Pesados Web não se responsabiliza pelos
                  resultados das inspeções.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Alterações nos Termos</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-4">
                Reservamo-nos o direito de modificar estes termos a qualquer momento. Usuários serão notificados sobre
                mudanças significativas por email ou através de aviso na plataforma.
              </p>
              <p className="text-gray-700">
                O uso continuado da plataforma após as alterações constitui aceitação dos novos termos.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Lei Aplicável e Foro</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">
                Estes termos são regidos pelas leis brasileiras. Qualquer disputa será resolvida no foro da comarca de
                Curitiba, Paraná, renunciando as partes a qualquer outro foro, por mais privilegiado que seja.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Contato</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-700 mb-2">Para dúvidas sobre estes termos ou nossa plataforma:</p>
                <p className="text-gray-700">
                  Email:{" "}
                  <a href="mailto:contato@pesadosweb.com.br" className="text-blue-900 hover:underline">
                    contato@pesadosweb.com.br
                  </a>
                </p>
                <p className="text-gray-700">Telefone: (41) 3000-0000</p>
                <p className="text-gray-700">Horário: Segunda a Sexta, 8h às 18h</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
