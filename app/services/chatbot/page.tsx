"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Send, MessageCircle, User, Bot, Heart, Moon, Coffee, Book } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import GlassCard from "@/components/GlassCard"

interface Message {
  id: number
  text: string
  sender: "user" | "bot"
  timestamp: Date
  suggestions?: string[]
}

export default function ChatbotPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hi there! I'm your friendly wellness companion. I'm here to provide supportive conversation and help you find resources for managing stress and improving your wellbeing. How are you feeling today?",
      sender: "bot",
      timestamp: new Date(),
      suggestions: ["I'm feeling stressed", "I can't sleep", "I need motivation", "Tell me about breathing exercises"],
    },
  ])
  const [inputMessage, setInputMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const quickReplies = [
    { text: "Sleep tips", icon: <Moon className="w-4 h-4" /> },
    { text: "Breathing exercise", icon: <Heart className="w-4 h-4" /> },
    { text: "Study break ideas", icon: <Book className="w-4 h-4" /> },
    { text: "Reduce caffeine anxiety", icon: <Coffee className="w-4 h-4" /> },
  ]

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const sendMessage = async (messageText: string) => {
    if (!messageText.trim()) return

    const userMessage: Message = {
      id: Date.now(),
      text: messageText,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputMessage("")
    setIsLoading(true)

    try {
      const response = await fetch("/api/chatbot", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: messageText }),
      })

      if (!response.ok) {
        throw new Error("Failed to get response")
      }

      const data = await response.json()

      const botMessage: Message = {
        id: Date.now() + 1,
        text: data.reply,
        sender: "bot",
        timestamp: new Date(),
        suggestions: data.suggestions,
      }

      setMessages((prev) => [...prev, botMessage])
    } catch (error) {
      console.error("Error:", error)
      const errorMessage: Message = {
        id: Date.now() + 1,
        text: "I'm sorry, I'm having trouble responding right now. Please try again in a moment.",
        sender: "bot",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    sendMessage(inputMessage)
  }

  const handleSuggestionClick = (suggestion: string) => {
    sendMessage(suggestion)
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  return (
    <div className="min-h-screen pt-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto py-16">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-aqua-100 rounded-full flex items-center justify-center">
              <MessageCircle className="w-8 h-8 text-aqua-600" />
            </div>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-ocean-900 mb-4 text-balance">Friendly Chatbot</h1>
          <p className="text-lg text-ocean-600 max-w-2xl mx-auto text-pretty">
            A supportive companion for students. Get encouragement, resources, and gentle guidance for your wellness
            journey.
          </p>
        </div>

        {/* Privacy Notice */}
        <GlassCard className="mb-6 text-center">
          <p className="text-sm text-ocean-600 text-pretty">
            <strong>Privacy Note:</strong> This chatbot is for supportive conversation only and is not a substitute for
            professional medical advice. Your conversations are not stored permanently.
          </p>
        </GlassCard>

        {/* Chat Interface */}
        <GlassCard variant="elevated" className="h-[600px] flex flex-col">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`flex items-start space-x-3 max-w-[80%]`}>
                  {message.sender === "bot" && (
                    <div className="w-8 h-8 bg-aqua-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Bot className="w-5 h-5 text-aqua-600" />
                    </div>
                  )}

                  <div
                    className={`rounded-lg p-3 ${
                      message.sender === "user"
                        ? "bg-aqua-500 text-white"
                        : "bg-white/10 backdrop-blur-sm text-ocean-900"
                    }`}
                  >
                    <p className="text-sm leading-relaxed text-pretty">{message.text}</p>
                    <p className={`text-xs mt-2 ${message.sender === "user" ? "text-aqua-100" : "text-ocean-500"}`}>
                      {formatTime(message.timestamp)}
                    </p>

                    {/* Suggestions */}
                    {message.suggestions && (
                      <div className="mt-3 space-y-2">
                        {message.suggestions.map((suggestion, index) => (
                          <button
                            key={index}
                            onClick={() => handleSuggestionClick(suggestion)}
                            className="block w-full text-left text-xs bg-white/10 hover:bg-white/20 rounded px-3 py-2 transition-colors"
                          >
                            {suggestion}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {message.sender === "user" && (
                    <div className="w-8 h-8 bg-ocean-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <User className="w-5 h-5 text-ocean-600" />
                    </div>
                  )}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-aqua-100 rounded-full flex items-center justify-center">
                    <Bot className="w-5 h-5 text-aqua-600" />
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-ocean-400 rounded-full animate-pulse"></div>
                      <div className="w-2 h-2 bg-ocean-400 rounded-full animate-pulse delay-100"></div>
                      <div className="w-2 h-2 bg-ocean-400 rounded-full animate-pulse delay-200"></div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Replies */}
          <div className="border-t border-white/10 p-4">
            <div className="flex flex-wrap gap-2 mb-4">
              {quickReplies.map((reply, index) => (
                <Button
                  key={index}
                  onClick={() => handleSuggestionClick(reply.text)}
                  variant="outline"
                  size="sm"
                  className="border-ocean-300 text-ocean-700 hover:bg-ocean-50"
                >
                  {reply.icon}
                  <span className="ml-2">{reply.text}</span>
                </Button>
              ))}
            </div>

            {/* Input */}
            <form onSubmit={handleSubmit} className="flex space-x-2">
              <Input
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Type your message..."
                disabled={isLoading}
                className="flex-1"
              />
              <Button
                type="submit"
                disabled={isLoading || !inputMessage.trim()}
                className="bg-aqua-500 hover:bg-aqua-600 text-white"
              >
                <Send className="w-5 h-5" />
              </Button>
            </form>
          </div>
        </GlassCard>
      </div>
    </div>
  )
}
