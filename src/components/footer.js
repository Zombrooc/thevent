import Link from "next/link"
import { Trophy, Github, Twitter, Linkedin, Instagram, Mail, Phone, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function EventsFooter() {
  return (
    <footer className="bg-background border-t border-border/40">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 gradient-primary rounded-lg flex items-center justify-center">
                <Trophy className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent">
                Thevent
              </span>
            </div>
            <p className="text-muted-foreground">
              A maior plataforma de eventos do Brasil. Conectamos participantes e organizadores para criar experiências
              inesquecíveis.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Github className="w-5 h-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter className="w-5 h-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Linkedin className="w-5 h-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Instagram className="w-5 h-5" />
              </Link>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Para Atletas</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/events" className="text-muted-foreground hover:text-primary transition-colors">
                  Encontrar Eventos
                </Link>
              </li>
              <li>
                <Link href="/calendar" className="text-muted-foreground hover:text-primary transition-colors">
                  Meu Calendário
                </Link>
              </li>
              <li>
                <Link href="/profile" className="text-muted-foreground hover:text-primary transition-colors">
                  Meu Perfil
                </Link>
              </li>
              <li>
                <Link href="/results" className="text-muted-foreground hover:text-primary transition-colors">
                  Meus Resultados
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Para Organizadores</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/organizers" className="text-muted-foreground hover:text-primary transition-colors">
                  Criar Evento
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="text-muted-foreground hover:text-primary transition-colors">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-muted-foreground hover:text-primary transition-colors">
                  Preços
                </Link>
              </li>
              <li>
                <Link href="/support" className="text-muted-foreground hover:text-primary transition-colors">
                  Suporte
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Newsletter</h3>
            <p className="text-muted-foreground text-sm mb-4">
              Receba as novidades sobre eventos esportivos na sua região
            </p>
            <div className="space-y-2">
              <Input placeholder="Seu e-mail" className="glass border-white/20 bg-transparent" />
              <Button className="w-full gradient-primary" size="sm">
                Inscrever-se
              </Button>
            </div>
          </div>
        </div>

        <div className="border-t border-border/40 mt-12 pt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="font-semibold mb-4">Contato</h4>
              <div className="space-y-2">
                <div className="flex items-center text-sm text-muted-foreground">
                  <Mail className="w-4 h-4 mr-2" />
                  <span>contato@thevent.com.br</span>
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Phone className="w-4 h-4 mr-2" />
                  <span>(11) 9999-9999</span>
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <MapPin className="w-4 h-4 mr-2" />
                  <span>São Paulo, SP - Brasil</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col md:items-end justify-center">
              <p className="text-muted-foreground text-sm mb-4">© 2024 Thevent. Todos os direitos reservados.</p>
              <div className="flex space-x-6">
                <Link href="/privacy" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  Privacidade
                </Link>
                <Link href="/terms" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  Termos
                </Link>
                <Link href="/cookies" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  Cookies
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
