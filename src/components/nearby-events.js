"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, MapPin, Navigation, Clock } from "lucide-react"

const nearbyEvents = [
  {
    id: 1,
    title: "Corrida do Parque Villa-Lobos",
    category: "Corrida",
    date: "20 Mar 2024",
    time: "07:00",
    location: "Parque Villa-Lobos, SP",
    distance: "2.5 km",
    price: "R$ 45,00",
    participants: 450,
  },
  {
    id: 2,
    title: "Pedalada Matinal Ibirapuera",
    category: "Ciclismo",
    date: "23 Mar 2024",
    time: "06:30",
    location: "Parque Ibirapuera, SP",
    distance: "1.8 km",
    price: "R$ 35,00",
    participants: 280,
  },
  {
    id: 3,
    title: "Natação no Clube Pinheiros",
    category: "Natação",
    date: "25 Mar 2024",
    time: "08:00",
    location: "Clube Pinheiros, SP",
    distance: "3.2 km",
    price: "R$ 60,00",
    participants: 120,
  },
  {
    id: 4,
    title: "Trail Run Cantareira",
    category: "Trail",
    date: "30 Mar 2024",
    time: "06:00",
    location: "Parque Cantareira, SP",
    distance: "5.1 km",
    price: "R$ 75,00",
    participants: 200,
  },
]

export function NearbyEvents() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Eventos{" "}
              <span className="bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent">
                Perto de Você
              </span>
            </h2>
            <p className="text-xl text-muted-foreground">Baseado na sua localização: São Paulo, SP</p>
          </div>
          <Button variant="outline" className="glass border-white/20 bg-transparent">
            <Navigation className="w-4 h-4 mr-2" />
            Alterar Localização
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {nearbyEvents.map((event) => (
            <Card
              key={event.id}
              className="glass-dark border-white/10 hover:border-primary/50 transition-all duration-300 group"
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="secondary" className="glass">
                    {event.category}
                  </Badge>
                  <span className="text-sm text-muted-foreground flex items-center">
                    <Navigation className="w-3 h-3 mr-1" />
                    {event.distance}
                  </span>
                </div>
                <CardTitle className="text-lg group-hover:text-primary transition-colors">{event.title}</CardTitle>
              </CardHeader>

              <CardContent className="space-y-3">
                <div className="space-y-2">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span>{event.date}</span>
                    <Clock className="w-4 h-4 ml-2 mr-1" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span>{event.location}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="font-bold text-primary">{event.price}</span>
                  <span className="text-sm text-muted-foreground">{event.participants} inscritos</span>
                </div>

                <Button className="w-full gradient-primary" size="sm">
                  Inscrever-se
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
