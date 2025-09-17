import Link from "next/link"
import { Calendar, Clock, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import GlassCard from "@/components/GlassCard"

interface BlogPost {
  id: string
  title: string
  excerpt: string
  date: string
  readTime: string
  category: string
  image: string
  author: string
}

export default function BlogPage() {
  const blogPosts: BlogPost[] = [
    {
      id: "managing-study-stress",
      title: "5 Proven Techniques for Managing Study Stress",
      excerpt:
        "Discover evidence-based strategies to reduce academic pressure and maintain mental wellbeing during exam periods. Learn how to create sustainable study habits that support both your academic goals and mental health.",
      date: "2024-01-15",
      readTime: "6 min read",
      category: "Study Tips",
      image: "/student-studying-peacefully-with-plants.jpg",
      author: "Dr. Sarah Chen",
    },
    {
      id: "breathing-exercises-guide",
      title: "The Complete Guide to Breathing Exercises for Students",
      excerpt:
        "Master the art of mindful breathing with our comprehensive guide. From the 4-7-8 technique to box breathing, learn how simple breathing exercises can transform your stress levels and improve focus.",
      date: "2024-01-10",
      readTime: "8 min read",
      category: "Wellness",
      image: "/peaceful-breathing-exercise-nature.jpg",
      author: "Michael Rodriguez",
    },
    {
      id: "study-break-ideas",
      title: "10 Refreshing Study Break Ideas That Actually Work",
      excerpt:
        "Not all study breaks are created equal. Discover science-backed break activities that will recharge your mind, boost creativity, and help you return to studying with renewed focus and energy.",
      date: "2024-01-05",
      readTime: "5 min read",
      category: "Productivity",
      image: "/students-taking-healthy-study-break.jpg",
      author: "Emma Thompson",
    },
  ]

  const categories = ["All", "Study Tips", "Wellness", "Productivity", "Mental Health"]

  return (
    <div className="min-h-screen pt-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-ocean-900 mb-6 text-balance">Wellness Blog</h1>
          <p className="text-lg text-ocean-600 max-w-2xl mx-auto text-pretty">
            Discover insights, tips, and resources to support your mental wellness journey as a student.
          </p>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <Button
              key={category}
              variant={category === "All" ? "default" : "outline"}
              className={
                category === "All"
                  ? "bg-aqua-500 hover:bg-aqua-600 text-white"
                  : "border-ocean-300 text-ocean-700 hover:bg-ocean-50"
              }
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Featured Post */}
        <GlassCard variant="elevated" className="mb-12 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="order-2 lg:order-1 p-6 lg:p-8">
              <div className="flex items-center space-x-4 mb-4">
                <span className="text-xs bg-aqua-100 text-aqua-700 px-3 py-1 rounded-full">Featured</span>
                <span className="text-xs bg-ocean-100 text-ocean-700 px-3 py-1 rounded-full">
                  {blogPosts[0].category}
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-ocean-900 mb-4 text-balance">{blogPosts[0].title}</h2>
              <p className="text-ocean-600 leading-relaxed mb-6 text-pretty">{blogPosts[0].excerpt}</p>
              <div className="flex items-center space-x-4 text-sm text-ocean-500 mb-6">
                <div className="flex items-center space-x-1">
                  <Calendar className="w-4 h-4" />
                  <span>{new Date(blogPosts[0].date).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="w-4 h-4" />
                  <span>{blogPosts[0].readTime}</span>
                </div>
              </div>
              <Button asChild className="bg-aqua-500 hover:bg-aqua-600 text-white">
                <Link href={`/blog/${blogPosts[0].id}`}>
                  Read Article
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
            </div>
            <div className="order-1 lg:order-2">
              <div className="h-64 lg:h-full relative overflow-hidden rounded-lg lg:rounded-l-none">
                <img
                  src={blogPosts[0].image || "/placeholder.svg?height=300&width=400"}
                  alt={blogPosts[0].title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ocean-900/20 to-transparent" />
              </div>
            </div>
          </div>
        </GlassCard>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {blogPosts.slice(1).map((post) => (
            <GlassCard key={post.id} className="overflow-hidden hover:scale-105 transition-transform group">
              <Link href={`/blog/${post.id}`}>
                <div className="h-48 relative overflow-hidden">
                  <img
                    src={post.image || "/placeholder.svg?height=200&width=400"}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ocean-900/20 to-transparent" />
                  <div className="absolute top-4 left-4">
                    <span className="text-xs bg-white/90 text-ocean-700 px-2 py-1 rounded backdrop-blur-sm">
                      {post.category}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-semibold text-ocean-900 mb-3 text-balance group-hover:text-aqua-600 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-ocean-600 text-sm leading-relaxed mb-4 text-pretty">{post.excerpt}</p>

                  <div className="flex items-center justify-between text-xs text-ocean-500">
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-3 h-3" />
                        <span>{new Date(post.date).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-3 h-3" />
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                    <span className="font-medium">{post.author}</span>
                  </div>
                </div>
              </Link>
            </GlassCard>
          ))}
        </div>

        {/* Newsletter Signup */}
        <GlassCard variant="elevated" className="mt-16 text-center">
          <h3 className="text-2xl font-bold text-ocean-900 mb-4 text-balance">Stay Updated</h3>
          <p className="text-ocean-600 mb-6 text-pretty">
            Get the latest wellness tips and resources delivered to your inbox weekly.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-2 rounded-lg border border-ocean-300 focus:outline-none focus:ring-2 focus:ring-aqua-500 bg-white/50 backdrop-blur-sm"
            />
            <Button className="bg-aqua-500 hover:bg-aqua-600 text-white">Subscribe</Button>
          </div>
        </GlassCard>
      </div>
    </div>
  )
}
