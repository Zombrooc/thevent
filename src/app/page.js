import { Navbar } from "@/components/Navbar"
import { EventsHero } from "@/components/hero"
import { EventsCategories } from "@/components/categories"
import { PopularEvents } from "@/components/popular-events"
import { NearbyEvents } from "@/components/nearby-events"
import { EventsByCategory } from "@/components/events-by-category"
import { EventsFooter } from "@/components/footer"

export default function EventsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <EventsHero />
      <EventsCategories />
      <PopularEvents />
      <NearbyEvents />
      <EventsByCategory />
      <EventsFooter />
    </div>
  )
}
