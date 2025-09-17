"use client"

import type React from "react"

import { useState } from "react"
import { Mail, Phone, Send, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import GlassCard from "@/components/GlassCard"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = "Name is required"
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!formData.email) {
      newErrors.email = "Email is required"
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address"
    }

    if (!formData.subject) {
      newErrors.subject = "Please select a subject"
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required"
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters long"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return

    setIsLoading(true)

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error("Failed to send message")
      }

      // Reset form
      setFormData({ name: "", email: "", subject: "", message: "" })
      alert("Thank you for your message! We'll get back to you soon.")
    } catch (error) {
      console.error("Error:", error)
      alert("Sorry, there was an error sending your message. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const contactInfo = [
    {
      icon: <Mail className="w-6 h-6 text-aqua-500" />,
      title: "Email Us",
      content: "support@calmnest.com",
      description: "We typically respond within 24 hours",
      image: "/email-support-illustration.jpg",
    },
    {
      icon: <MessageSquare className="w-6 h-6 text-aqua-500" />,
      title: "Live Chat",
      content: "Available 9 AM - 6 PM EST",
      description: "Get instant help with our chatbot",
      image: "/live-chat-support-illustration.jpg",
    },
    {
      icon: <Phone className="w-6 h-6 text-red-500" />,
      title: "Crisis Support",
      content: "988 Suicide & Crisis Lifeline",
      description: "24/7 free and confidential support",
      image: "/crisis-support-helpline-illustration.jpg",
    },
  ]

  return (
    <div className="min-h-screen pt-20 px-4 sm:px-6 lg:px-8">
      <div className="absolute inset-0 z-0">
        <img
          src="/peaceful-support-team-helping-students.jpg"
          alt="Supportive team helping students"
          className="w-full h-full object-cover opacity-5"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/95 via-background/90 to-background/95" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 rounded-full overflow-hidden shadow-lg">
              <img
                src="/friendly-support-representative.jpg"
                alt="Friendly support representative"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-ocean-900 mb-6 text-balance">Get in Touch</h1>
          <p className="text-lg text-ocean-600 max-w-2xl mx-auto text-pretty">
            We're here to help and answer any questions you might have. Reach out to us and we'll respond as soon as we
            can.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Information */}
          <div className="space-y-6">
            {contactInfo.map((info, index) => (
              <GlassCard key={index}>
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-aqua-50 rounded-full flex items-center justify-center flex-shrink-0">
                    {info.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-ocean-900 mb-1">{info.title}</h3>
                    <p className="text-ocean-700 font-medium mb-1">{info.content}</p>
                    <p className="text-sm text-ocean-600 text-pretty">{info.description}</p>
                    <div className="mt-3 w-full h-16 rounded-lg overflow-hidden">
                      <img
                        src={info.image || "/placeholder.svg"}
                        alt={`${info.title} illustration`}
                        className="w-full h-full object-cover opacity-60"
                      />
                    </div>
                  </div>
                </div>
              </GlassCard>
            ))}

            {/* Privacy Notice */}
            <GlassCard className="bg-green-50/50 border-green-700">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
                  <img
                    src="/privacy-security-icon.png"
                    alt="Privacy and security"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-semibold text-green-800 mb-2">Privacy & Confidentiality</h3>
                  <p className="text-sm text-green-700 text-pretty">
                    Your privacy is important to us. All communications are handled confidentially and we never share
                    your personal information without your consent.
                  </p>
                </div>
              </div>
            </GlassCard>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <GlassCard variant="elevated">
              <div className="relative mb-6 h-32 rounded-lg overflow-hidden">
                <img
                  src="/students-collaborating-peacefully.jpg"
                  alt="Students collaborating peacefully"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <h2 className="text-2xl font-bold text-ocean-900 text-balance drop-shadow-lg">Send us a Message</h2>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      placeholder="Your full name"
                      className={errors.name ? "border-red-300" : ""}
                    />
                    {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      placeholder="your.email@example.com"
                      className={errors.email ? "border-red-300" : ""}
                    />
                    {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Select value={formData.subject} onValueChange={(value) => handleInputChange("subject", value)}>
                    <SelectTrigger className={errors.subject ? "border-red-300" : ""}>
                      <SelectValue placeholder="Select a subject" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="general">General Inquiry</SelectItem>
                      <SelectItem value="technical">Technical Support</SelectItem>
                      <SelectItem value="feedback">Feedback</SelectItem>
                      <SelectItem value="partnership">Partnership</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.subject && <p className="text-red-500 text-sm">{errors.subject}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => handleInputChange("message", e.target.value)}
                    placeholder="Tell us how we can help you..."
                    rows={6}
                    className={errors.message ? "border-red-300" : ""}
                  />
                  {errors.message && <p className="text-red-500 text-sm">{errors.message}</p>}
                </div>

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-aqua-500 hover:bg-aqua-600 text-white"
                  size="lg"
                >
                  {isLoading ? (
                    "Sending..."
                  ) : (
                    <>
                      Send Message
                      <Send className="ml-2 w-5 h-5" />
                    </>
                  )}
                </Button>
              </form>
            </GlassCard>
          </div>
        </div>
      </div>
    </div>
  )
}
