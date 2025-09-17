"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import GlassCard from "@/components/GlassCard"
import WaveBackground from "@/components/WaveBackground"

const PlayIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1.586a1 1 0 01.707.293l2.414 2.414a1 1 0 00.707.293H15M13 16h-1.586a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 008 13H7m0 0V9h2l2 2 2-2h2v4M7 13v4a2 2 0 002 2h6a2 2 0 002-2v-4"
    />
  </svg>
)

const ArrowRightIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M17 8l4 4m0 0l-4 4m4-4H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a4 4 0 11-8 0 4 4 0 018 0z"
    />
  </svg>
)

const UsersIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 4.354a4 4 0 110 5.292L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
    />
  </svg>
)

const ShieldIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
    />
  </svg>
)

const HeartIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
    />
  </svg>
)

const SparklesIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
    />
  </svg>
)

export default function HomePage() {
  const [showVideoModal, setShowVideoModal] = useState(false)

  const features = [
    {
      icon: <HeartIcon />,
      title: "Check your stress level",
      description: "Quick health questionnaire with visual stress analysis",
    },
    {
      icon: <SparklesIcon />,
      title: "Music Therapy sessions",
      description: "Curated calming tracks and guided meditations",
    },
    {
      icon: <UsersIcon />,
      title: "Exercise recommendations",
      description: "Step-by-step stress-reducing exercises and yoga",
    },
    {
      icon: <ShieldIcon />,
      title: "Friendly chatbot support",
      description: "Student-focused conversational support and resources",
    },
  ]

  return (
    <div className="relative min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-16">
        <WaveBackground />

        <div className="absolute inset-0 z-0">
          <img
            src="/peaceful-student-meditation-hero.jpg"
            alt="Peaceful student meditating in nature"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background/80" />
        </div>

        {/* Floating particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-primary/60 rounded-full opacity-60 animate-pulse"></div>
          <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-accent/40 rounded-full opacity-40 animate-pulse delay-1000"></div>
          <div className="absolute bottom-1/3 left-1/5 w-3 h-3 bg-primary/30 rounded-full opacity-30 animate-pulse delay-2000"></div>
          <div className="absolute top-1/2 right-1/4 w-1.5 h-1.5 bg-accent/50 rounded-full opacity-50 animate-pulse delay-3000"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <GlassCard variant="elevated" className="max-w-3xl mx-auto bg-background/95 border-primary/30">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 text-balance drop-shadow-lg">
              CalmNest —{" "}
              <span className="text-3xl sm:text-4xl lg:text-5xl text-primary">Where your mind finds comfort</span>
            </h1>

            <div className="space-y-4 mb-8">
              <p className="text-lg sm:text-xl text-card-foreground leading-relaxed text-pretty">
                Accessible mental-wellness resources, calming audio, and friendly support for students.
              </p>
              <p className="text-lg sm:text-xl text-card-foreground leading-relaxed text-pretty">
                Begin your journey toward calmer, clearer days.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3">
                <Link href="/signup">
                  Get Started
                  <ArrowRightIcon />
                </Link>
              </Button>

              <Button
                variant="outline"
                size="lg"
                onClick={() => setShowVideoModal(true)}
                className="border-border text-foreground hover:bg-accent hover:text-accent-foreground px-8 py-3"
              >
                <PlayIcon />
                Watch Video
              </Button>

              <Button asChild variant="ghost" size="lg" className="text-muted-foreground hover:text-foreground">
                <Link href="/services">
                  Explore Services
                  <ArrowRightIcon />
                </Link>
              </Button>
            </div>
          </GlassCard>
        </div>

        <div className="absolute top-20 left-10 hidden lg:block">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary/20 to-accent/30 opacity-20 flex items-center justify-center">
            <img src="/lotus-flower-icon.png" alt="" className="w-8 h-8 opacity-60" />
          </div>
        </div>
        <div className="absolute bottom-32 right-16 hidden lg:block">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-accent/20 to-primary/30 opacity-25 flex items-center justify-center">
            <img src="/zen-stone-icon.png" alt="" className="w-6 h-6 opacity-60" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 text-balance">
              Your wellness journey starts here
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
              Discover tools and resources designed specifically for students to manage stress and improve mental
              wellbeing.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <GlassCard key={index} className="text-center hover:scale-105 transition-transform cursor-pointer">
                <div className="flex justify-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                    {feature.icon}
                  </div>
                </div>
                <h3 className="font-semibold text-foreground mb-2 text-balance">{feature.title}</h3>
                <p className="text-sm text-muted-foreground text-pretty">{feature.description}</p>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* What students are saying Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 text-balance">
              What students are saying
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
              Real experiences from students who found their calm with CalmNest.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <GlassCard className="text-center">
              <div className="w-16 h-16 rounded-full mx-auto mb-4 overflow-hidden">
                <img
                  src="/student-testimonial-sarah.jpg"
                  alt="Sarah, Computer Science student"
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-muted-foreground mb-4 text-pretty italic">
                "The breathing exercises helped me manage my exam anxiety. I use CalmNest every day now."
              </p>
              <div className="text-sm">
                <div className="font-semibold text-foreground">Sarah M.</div>
                <div className="text-muted-foreground">Computer Science, Year 3</div>
              </div>
            </GlassCard>

            <GlassCard className="text-center">
              <div className="w-16 h-16 rounded-full mx-auto mb-4 overflow-hidden">
                <img
                  src="/student-testimonial-james.jpg"
                  alt="James, Psychology student"
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-muted-foreground mb-4 text-pretty italic">
                "The music therapy sessions are perfect for my study breaks. So calming and refreshing."
              </p>
              <div className="text-sm">
                <div className="font-semibold text-foreground">James L.</div>
                <div className="text-muted-foreground">Psychology, Year 2</div>
              </div>
            </GlassCard>

            <GlassCard className="text-center">
              <div className="w-16 h-16 rounded-full mx-auto mb-4 overflow-hidden">
                <img
                  src="/student-testimonial-maya.jpg"
                  alt="Maya, Engineering student"
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-muted-foreground mb-4 text-pretty italic">
                "The stress check feature helped me understand my patterns and take better care of myself."
              </p>
              <div className="text-sm">
                <div className="font-semibold text-foreground">Maya P.</div>
                <div className="text-muted-foreground">Engineering, Year 4</div>
              </div>
            </GlassCard>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <GlassCard variant="elevated">
            <div className="absolute inset-0 rounded-lg overflow-hidden">
              <img
                src="/peaceful-campus-library-study-space.jpg"
                alt="Peaceful campus study space"
                className="w-full h-full object-cover opacity-10"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-background/70" />
            </div>
            <div className="relative z-10">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 text-balance">
                Ready to find your calm?
              </h2>
              <p className="text-lg text-muted-foreground mb-8 text-pretty">
                Join thousands of students who have found peace and clarity with CalmNest.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground px-8">
                  <Link href="/signup">Start Your Journey</Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="border-border text-foreground hover:bg-accent hover:text-accent-foreground bg-transparent"
                >
                  <Link href="/about">Learn More</Link>
                </Button>
              </div>
            </div>
          </GlassCard>
        </div>
      </section>

      {/* Video Modal */}
      {showVideoModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="glass-card max-w-4xl w-full max-h-[80vh] overflow-hidden">
            <div className="flex justify-between items-center p-6 border-b border-border">
              <h3 className="text-xl font-semibold text-foreground">Welcome to CalmNest</h3>
              <button
                onClick={() => setShowVideoModal(false)}
                className="text-muted-foreground hover:text-foreground text-2xl"
                aria-label="Close video"
              >
                ×
              </button>
            </div>
            <div className="p-6">
              <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <PlayIcon />
                  <p className="text-muted-foreground">Video content would be embedded here</p>
                  <p className="text-sm text-muted-foreground/70 mt-2">
                    A calming introduction to CalmNest's features and benefits
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
