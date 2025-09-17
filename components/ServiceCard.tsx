import type React from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import GlassCard from "@/components/GlassCard"

interface ServiceCardProps {
  title: string
  description: string
  icon: React.ReactNode
  href: string
  image: string
}

export default function ServiceCard({ title, description, icon, href, image }: ServiceCardProps) {
  return (
    <GlassCard className="group hover:scale-105 transition-all duration-300 cursor-pointer overflow-hidden p-0">
      <Link href={href} className="block">
        <div className="relative h-48 overflow-hidden">
          <Image
            src={image || "/placeholder.svg"}
            alt={title}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ocean-900/20 to-transparent" />
          <div className="absolute top-4 left-4">
            <div className="w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center">
              {icon}
            </div>
          </div>
        </div>

        <div className="p-6">
          <h3 className="text-xl font-semibold text-ocean-900 mb-3 text-balance group-hover:text-aqua-600 transition-colors">
            {title}
          </h3>
          <p className="text-ocean-600 text-sm leading-relaxed mb-4 text-pretty">{description}</p>
          <Button variant="ghost" className="text-aqua-600 hover:text-aqua-700 p-0 h-auto font-medium">
            Learn More
            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </Link>
    </GlassCard>
  )
}
