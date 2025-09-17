import Link from "next/link"
import { Brain, Music, Dumbbell, MessageCircle, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import GlassCard from "@/components/GlassCard"
import ServiceCard from "@/components/ServiceCard"

export default function ServicesPage() {
  const services = [
    {
      title: "Stress Check & Analysis",
      description: "Answer a quick health & sleep questionnaire to gauge your stress level and see a visual analysis.",
      icon: <Brain className="w-8 h-8 text-aqua-500" />,
      href: "/services/stress-check",
      image: "/peaceful-meditation-scene-with-soft-lighting.jpg",
    },
    {
      title: "Music Therapy",
      description: "Curated calming tracks and guided meditations to help you relax and refocus.",
      icon: <Music className="w-8 h-8 text-aqua-500" />,
      href: "/services/music-therapy",
      image: "/serene-music-therapy-session-with-headphones.jpg",
    },
    {
      title: "Exercise Recommendations",
      description: "Step-by-step stress-reducing exercises, yoga, and short routines for daily practice.",
      icon: <Dumbbell className="w-8 h-8 text-aqua-500" />,
      href: "/services/exercises",
      image: "/gentle-yoga-poses-in-peaceful-setting.jpg",
    },
    {
      title: "Friendly Chatbot",
      description: "A student-focused chatbot for supportive, non-clinical conversation and resource links.",
      icon: <MessageCircle className="w-8 h-8 text-aqua-500" />,
      href: "/services/chatbot",
      image: "/friendly-ai-chatbot-interface-with-calming-colors.jpg",
    },
  ]

  return (
    <div className="min-h-screen pt-20 px-4 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <section className="max-w-6xl mx-auto py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold text-ocean-900 mb-6 text-balance">Our Wellness Services</h1>
          <p className="text-lg text-ocean-600 max-w-3xl mx-auto text-pretty leading-relaxed">
            Discover personalized tools and resources designed to support your mental wellbeing journey. Each service is
            crafted with students in mind, offering practical solutions for stress management and emotional support.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {services.map((service, index) => (
            <ServiceCard key={index} {...service} />
          ))}
        </div>

        {/* How It Works Section */}
        <GlassCard variant="elevated" className="text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-ocean-900 mb-6 text-balance">How CalmNest Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div className="space-y-4">
              <div className="w-12 h-12 bg-aqua-100 rounded-full flex items-center justify-center mx-auto">
                <span className="text-aqua-600 font-bold text-lg">1</span>
              </div>
              <h3 className="font-semibold text-ocean-900">Choose Your Service</h3>
              <p className="text-ocean-600 text-sm text-pretty">
                Select from our range of wellness tools based on your current needs and preferences.
              </p>
            </div>
            <div className="space-y-4">
              <div className="w-12 h-12 bg-aqua-100 rounded-full flex items-center justify-center mx-auto">
                <span className="text-aqua-600 font-bold text-lg">2</span>
              </div>
              <h3 className="font-semibold text-ocean-900">Personalized Experience</h3>
              <p className="text-ocean-600 text-sm text-pretty">
                Receive tailored recommendations and content based on your responses and preferences.
              </p>
            </div>
            <div className="space-y-4">
              <div className="w-12 h-12 bg-aqua-100 rounded-full flex items-center justify-center mx-auto">
                <span className="text-aqua-600 font-bold text-lg">3</span>
              </div>
              <h3 className="font-semibold text-ocean-900">Track Progress</h3>
              <p className="text-ocean-600 text-sm text-pretty">
                Monitor your wellbeing journey and access resources whenever you need support.
              </p>
            </div>
          </div>
          <Button asChild size="lg" className="bg-aqua-500 hover:bg-aqua-600 text-white">
            <Link href="/signup">
              Get Started Today
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </Button>
        </GlassCard>
      </section>

      {/* Privacy & Support Section */}
      <section className="max-w-4xl mx-auto py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <GlassCard>
            <h3 className="text-xl font-semibold text-ocean-900 mb-4">Privacy First</h3>
            <p className="text-ocean-600 text-sm leading-relaxed text-pretty">
              Your privacy is our priority. All data is optional and anonymized. We never share personal information,
              and you have full control over what you choose to share with our services.
            </p>
          </GlassCard>
          <GlassCard>
            <h3 className="text-xl font-semibold text-ocean-900 mb-4">Student-Focused</h3>
            <p className="text-ocean-600 text-sm leading-relaxed text-pretty">
              Every tool and resource is designed specifically for students, understanding the unique challenges of
              academic life, social pressures, and the transition to independence.
            </p>
          </GlassCard>
        </div>
      </section>
    </div>
  )
}
