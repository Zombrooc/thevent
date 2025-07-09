"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, MapPin, Users, Heart, Share2, Clock } from "lucide-react"
import Image from "next/image"

const popularEvents = [
  {
    id: 1,
    title: "Maratona Internacional de São Paulo",
    category: "Corrida",
    date: "15 Mar 2024",
    endDate: "15 Mar 2024",
    time: "06:00",
    city: "São Paulo, SP",
    participants: 2500,
    maxParticipants: 3000,
    price: "R$ 120,00",
    image: "https://placehold.co/400x200",
    featured: true,
    difficulty: "Avançado",
  },
  
  {
    id: 2,
    title: "Pedal da Praia - Copacabana",
    category: "Ciclismo",
    date: "22 Mar 2024",
    endDate: "22 Mar 2024",
    time: "07:30",
    city: "Rio de Janeiro, RJ",
    participants: 800,
    maxParticipants: 1000,
    price: "R$ 85,00",
    image: "https://placehold.co/400x200",
    featured: false,
    difficulty: "Intermediário",
  },
  {
    id: 3,
    title: "Triathlon Brasília Challenge",
    category: "Triathlon",
    date: "05 Abr 2024",
    endDate: "07 Abr 2024",
    time: "05:00",
    city: "Brasília, DF",
    participants: 300,
    maxParticipants: 500,
    price: "R$ 250,00",
    image: "https://placehold.co/400x200",
    featured: true,
    difficulty: "Avançado",
  },
  {
    id: 4,
    title: "Corrida Noturna Ibirapuera",
    category: "Corrida",
    date: "28 Mar 2024",
    endDate: "28 Mar 2024",
    time: "19:00",
    city: "São Paulo, SP",
    participants: 1200,
    maxParticipants: 1500,
    price: "R$ 65,00",
    image: "https://placehold.co/400x200",
    featured: false,
    difficulty: "Iniciante",
  },
]

const difficultyColors = {
  Iniciante: "bg-green-500/20 text-green-500",
  Intermediário: "bg-yellow-500/20 text-yellow-500",
  Avançado: "bg-red-500/20 text-red-500",
}

export function PopularEvents() {
  return (
    <section className="py-16 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Eventos{" "}
              <span className="bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent">
                Populares
              </span>
            </h2>
            <p className="text-xl text-muted-foreground">Os eventos mais procurados pelos atletas</p>
          </div>
          <Button variant="outline" className="glass border-white/20 bg-transparent">
            Ver Todos
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {popularEvents.map((event) => (
            <Card
              key={event.id}
              className="glass-dark border-white/10 hover:border-primary/50 transition-all duration-300 overflow-hidden group"
            >
              <div className="relative">
                <Image
                  src={event.image || "/placeholder.svg"}
                  alt={event.title}
                  width={400}
                  height={200}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4 flex gap-2">
                  {event.featured && <Badge className="bg-primary text-primary-foreground">Destaque</Badge>}
                  <Badge className={difficultyColors[event.difficultyColors]}>
                    {event.difficulty}
                  </Badge>
                </div>
                <div className="absolute top-4 right-4 flex gap-2">
                  <Button size="sm" variant="ghost" className="glass bg-black/20 hover:bg-black/40">
                    <Heart className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="ghost" className="glass bg-black/20 hover:bg-black/40">
                    <Share2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="secondary" className="glass">
                    {event.category}
                  </Badge>
                  <span className="text-lg font-bold text-primary">{event.price}</span>
                </div>

                <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">{event.title}</h3>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span>
                      {event.date}
                      {event.endDate !== event.date && ` - ${event.endDate}`}
                    </span>
                    <Clock className="w-4 h-4 ml-4 mr-2" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span>{event.city}</span>
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Users className="w-4 h-4 mr-2" />
                    <span>
                      {event.participants}/{event.maxParticipants} inscritos
                    </span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button className="flex-1 gradient-primary">Inscrever-se</Button>
                  <Button variant="outline" className="glass border-white/20 bg-transparent">
                    Detalhes
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
