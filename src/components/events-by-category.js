"use client"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, MapPin, Users, Clock } from "lucide-react"
import Image from "next/image"


const eventsByCategory = {
  corrida: [
    {
      id: 1,
      title: "Meia Maratona de Florianópolis",
      date: "12 Abr 2024",
      time: "06:00",
      city: "Florianópolis, SC",
      participants: 1800,
      price: "R$ 95,00",
      image: "https://placehold.co/300x150",
      difficulty: "Intermediário",
    },
    {
      id: 2,
      title: "Corrida Rústica de Campos do Jordão",
      date: "18 Abr 2024",
      time: "07:30",
      city: "Campos do Jordão, SP",
      participants: 650,
      price: "R$ 80,00",
      image: "https://placehold.co/300x150",
      difficulty: "Avançado",
    },
    {
      id: 3,
      title: "5K Solidário Belo Horizonte",
      date: "25 Abr 2024",
      time: "08:00",
      city: "Belo Horizonte, MG",
      participants: 1200,
      price: "R$ 50,00",
      image: "https://placehold.co/300x150",
      difficulty: "Iniciante",
    },
  ],
  ciclismo: [
    {
      id: 4,
      title: "Gran Fondo Serra da Mantiqueira",
      date: "14 Abr 2024",
      time: "05:30",
      city: "Campos do Jordão, SP",
      participants: 400,
      price: "R$ 180,00",
      image: "https://placehold.co/300x150",
      difficulty: "Avançado",
    },
    {
      id: 5,
      title: "Pedal Urbano Curitiba",
      date: "21 Abr 2024",
      time: "07:00",
      city: "Curitiba, PR",
      participants: 800,
      price: "R$ 60,00",
      image: "https://placehold.co/300x150",
      difficulty: "Iniciante",
    },
  ],
  natacao: [
    {
      id: 6,
      title: "Travessia da Lagoa Rodrigo de Freitas",
      date: "16 Abr 2024",
      time: "07:00",
      city: "Rio de Janeiro, RJ",
      participants: 300,
      price: "R$ 120,00",
      image: "https://placehold.co/300x150",
      difficulty: "Intermediário",
    },
    {
      id: 7,
      title: "Maratona Aquática de Santos",
      date: "28 Abr 2024",
      time: "06:30",
      city: "Santos, SP",
      participants: 200,
      price: "R$ 150,00",
      image: "https://placehold.co/300x150",
      difficulty: "Avançado",
    },
  ],
}

const difficultyColors = {
  Iniciante: "bg-green-500/20 text-green-500",
  Intermediário: "bg-yellow-500/20 text-yellow-500",
  Avançado: "bg-red-500/20 text-red-500",
}

export function EventsByCategory() {
  return (
    <section className="py-16 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Eventos por{" "}
            <span className="bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent">Categoria</span>
          </h2>
          <p className="text-xl text-muted-foreground">Explore eventos organizados por modalidade esportiva</p>
        </div>

        <Tabs defaultValue="corrida" className="w-full">
          <TabsList className="grid w-full grid-cols-3 glass-dark border border-white/10 mb-8">
            <TabsTrigger
              value="corrida"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              Corrida
            </TabsTrigger>
            <TabsTrigger
              value="ciclismo"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              Ciclismo
            </TabsTrigger>
            <TabsTrigger
              value="natacao"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              Natação
            </TabsTrigger>
          </TabsList>

          {Object.entries(eventsByCategory).map(([category, events]) => (
            <TabsContent key={category} value={category}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {events.map((event) => (
                  <Card
                    key={event.id}
                    className="glass-dark border-white/10 hover:border-primary/50 transition-all duration-300 overflow-hidden group"
                  >
                    <div className="relative">
                      <Image
                        src={event.image || "/https://placehold.co/300"}
                        alt={event.title}
                        width={300}
                        height={150}
                        className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <Badge
                        className={`absolute top-3 right-3 ${difficultyColors[event.difficulty]}`}
                      >
                        {event.difficulty}
                      </Badge>
                    </div>

                    <CardContent className="p-4">
                      <h3 className="font-bold mb-3 group-hover:text-primary transition-colors">{event.title}</h3>

                      <div className="space-y-2 mb-4">
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Calendar className="w-4 h-4 mr-2" />
                          <span>{event.date}</span>
                          <Clock className="w-4 h-4 ml-3 mr-2" />
                          <span>{event.time}</span>
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <MapPin className="w-4 h-4 mr-2" />
                          <span>{event.city}</span>
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Users className="w-4 h-4 mr-2" />
                          <span>{event.participants} inscritos</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between mb-3">
                        <span className="text-lg font-bold text-primary">{event.price}</span>
                      </div>

                      <Button className="w-full gradient-primary" size="sm">
                        Inscrever-se
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  )
}
