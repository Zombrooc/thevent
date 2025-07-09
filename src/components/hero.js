"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, MapPin, Calendar, Filter } from "lucide-react"
import { motion } from "framer-motion"

export function EventsHero() {
  return (
    <section className="relative py-16 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-purple-500/5 to-pink-500/10" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Encontre o{" "}
            <span className="bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent">
              evento perfeito
            </span>{" "}
            para você
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Descubra eventos esportivos incríveis na sua região e participe da maior comunidade esportiva do Brasil
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          <div className="glass-dark rounded-2xl p-6 border border-white/10">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="md:col-span-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                  <Input
                    placeholder="Buscar por evento ou modalidade..."
                    className="pl-12 h-12 glass border-white/20 bg-transparent text-lg"
                  />
                </div>
              </div>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                <Input placeholder="Cidade ou região..." className="pl-12 h-12 glass border-white/20 bg-transparent" />
              </div>
              <Button size="lg" className="h-12 gradient-primary">
                <Search className="w-5 h-5 mr-2" />
                Buscar
              </Button>
            </div>

            <div className="flex flex-wrap gap-2 mt-4">
              <Button variant="outline" size="sm" className="glass border-white/20 bg-transparent">
                <Calendar className="w-4 h-4 mr-2" />
                Este fim de semana
              </Button>
              <Button variant="outline" size="sm" className="glass border-white/20 bg-transparent">
                <Filter className="w-4 h-4 mr-2" />
                Corrida
              </Button>
              <Button variant="outline" size="sm" className="glass border-white/20 bg-transparent">
                <Filter className="w-4 h-4 mr-2" />
                Ciclismo
              </Button>
              <Button variant="outline" size="sm" className="glass border-white/20 bg-transparent">
                <Filter className="w-4 h-4 mr-2" />
                Natação
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
