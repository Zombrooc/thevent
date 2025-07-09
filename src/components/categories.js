"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Bike, Waves, Mountain, Zap, Target, Trophy, Users, Timer } from "lucide-react"

const categories = [
  {
    name: "Corrida",
    icon: Zap,
    count: 156,
    color: "bg-red-500/20 text-red-500",
    gradient: "from-red-500/20 to-orange-500/20",
  },
  {
    name: "Ciclismo",
    icon: Bike,
    count: 89,
    color: "bg-blue-500/20 text-blue-500",
    gradient: "from-blue-500/20 to-cyan-500/20",
  },
  {
    name: "Natação",
    icon: Waves,
    count: 67,
    color: "bg-cyan-500/20 text-cyan-500",
    gradient: "from-cyan-500/20 to-blue-500/20",
  },
  {
    name: "Triathlon",
    icon: Target,
    count: 34,
    color: "bg-purple-500/20 text-purple-500",
    gradient: "from-purple-500/20 to-pink-500/20",
  },
  {
    name: "Trail Running",
    icon: Mountain,
    count: 78,
    color: "bg-green-500/20 text-green-500",
    gradient: "from-green-500/20 to-emerald-500/20",
  },
  {
    name: "Competições",
    icon: Trophy,
    count: 45,
    color: "bg-yellow-500/20 text-yellow-500",
    gradient: "from-yellow-500/20 to-orange-500/20",
  },
  {
    name: "Equipes",
    icon: Users,
    count: 23,
    color: "bg-indigo-500/20 text-indigo-500",
    gradient: "from-indigo-500/20 to-purple-500/20",
  },
  {
    name: "Contra o Tempo",
    icon: Timer,
    count: 91,
    color: "bg-pink-500/20 text-pink-500",
    gradient: "from-pink-500/20 to-red-500/20",
  },
]

export function EventsCategories() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Explore por{" "}
            <span className="bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent">
              Modalidade
            </span>
          </h2>
          <p className="text-xl text-muted-foreground">Encontre eventos da sua modalidade favorita</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((category, index) => (
            <Card
              key={index}
              className="glass-dark border-white/10 hover:border-primary/50 transition-all duration-300 cursor-pointer group"
            >
              <CardContent className="p-6 text-center">
                <div
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${category.gradient} flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}
                >
                  <category.icon className={`w-8 h-8 ${category.color.split(" ")[1]}`} />
                </div>
                <h3 className="font-semibold mb-2">{category.name}</h3>
                <Badge variant="secondary" className="glass">
                  {category.count} eventos
                </Badge>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
