import Link from "next/link"
import { CheckCircle, ArrowRight, Users, Shield, Heart, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import GlassCard from "@/components/GlassCard"

export default function AboutPage() {
  const features = [
    {
      icon: <CheckCircle className="w-5 h-5 text-aqua-500" />,
      text: "Check your stress level and view stress analysis",
    },
    {
      icon: <CheckCircle className="w-5 h-5 text-aqua-500" />,
      text: "Music Therapy with meditation sessions",
    },
    {
      icon: <CheckCircle className="w-5 h-5 text-aqua-500" />,
      text: "Exercise recommendations to reduce stress",
    },
    {
      icon: <CheckCircle className="w-5 h-5 text-aqua-500" />,
      text: "Access to a friendly chatbot for support",
    },
  ]

  const values = [
    {
      icon: <Shield className="w-8 h-8 text-aqua-500" />,
      title: "Privacy First",
      description: "Your data is optional and anonymized. We never share personal information without consent.",
    },
    {
      icon: <Heart className="w-8 h-8 text-aqua-500" />,
      title: "Student-Centered",
      description: "Every tool is designed specifically for students, understanding your unique challenges.",
    },
    {
      icon: <Users className="w-8 h-8 text-aqua-500" />,
      title: "Community Support",
      description: "Building a supportive community where students can find resources and encouragement.",
    },
    {
      icon: <Sparkles className="w-8 h-8 text-aqua-500" />,
      title: "Evidence-Based",
      description: "Our techniques are grounded in research and proven wellness practices.",
    },
  ]

  return (
    <div className="min-h-screen pt-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <div className="w-32 h-32 rounded-full overflow-hidden shadow-lg">
              <img
                src="/calmnest-team-photo.jpg"
                alt="CalmNest team dedicated to student wellness"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-6 text-balance">About CalmNest</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty leading-relaxed">
            Where your mind finds comfort through accessible mental wellness resources designed specifically for
            students.
          </p>
        </div>

        {/* Mission Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <GlassCard variant="elevated">
            <h2 className="text-2xl font-bold text-foreground mb-4 text-balance">Our Mission</h2>
            <p className="text-ocean-600 leading-relaxed mb-6 text-pretty">
              CalmNest exists to help students identify stress and support wellbeing through music therapy, guided
              exercises, stress analysis, and friendly conversational support. We believe that mental wellness should be
              accessible, approachable, and tailored to the unique challenges of student life.
            </p>
            <p className="text-ocean-600 leading-relaxed text-pretty">
              Our privacy-first design ensures that you have complete control over your data, with optional and
              anonymized information sharing. We're here to support your journey toward calmer, clearer days without
              judgment or pressure.
            </p>
          </GlassCard>

          <div className="space-y-6">
            <div className="h-48 rounded-lg overflow-hidden">
              <img
                src="/students-practicing-mindfulness-together.jpg"
                alt="Students practicing mindfulness together"
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-4">What You Can Do</h3>
            <div className="space-y-4">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start space-x-3">
                  {feature.icon}
                  <span className="text-ocean-600 text-sm leading-relaxed">{feature.text}</span>
                </div>
              ))}
            </div>

            <div className="pt-6">
              <Button asChild className="bg-aqua-500 hover:bg-aqua-600 text-white">
                <Link href="/signup">
                  Start Your Journey
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-foreground text-center mb-12 text-balance">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <GlassCard key={index} className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                    {value.icon}
                  </div>
                </div>
                <h3 className="font-semibold text-foreground mb-2 text-balance">{value.title}</h3>
                <p className="text-sm text-muted-foreground text-pretty">{value.description}</p>
                <div className="mt-4 h-16 rounded-lg overflow-hidden opacity-60">
                  <img
                    src={`/value-${value.title.toLowerCase().replace(" ", "-")}-illustration.jpg`}
                    alt={`${value.title} illustration`}
                    className="w-full h-full object-cover"
                  />
                </div>
              </GlassCard>
            ))}
          </div>
        </div>

        {/* Community Illustration */}
        <GlassCard variant="elevated" className="text-center">
          <div className="max-w-md mx-auto mb-6">
            <img
              src="/supportive-student-community-illustration.jpg"
              alt="Supportive community of students helping each other"
              className="w-full h-64 object-cover rounded-lg"
            />
          </div>
          <h3 className="text-2xl font-bold text-foreground mb-4 text-balance">Join Our Community</h3>
          <p className="text-ocean-600 leading-relaxed mb-6 text-pretty">
            You're not alone in your wellness journey. Join thousands of students who have found support, resources, and
            a sense of calm through CalmNest. Together, we're building a community where mental health matters and every
            student can thrive.
          </p>
          <Button asChild size="lg" className="bg-aqua-500 hover:bg-aqua-600 text-white">
            <Link href="/signup">Get Started Today</Link>
          </Button>
        </GlassCard>
      </div>
    </div>
  )
}
