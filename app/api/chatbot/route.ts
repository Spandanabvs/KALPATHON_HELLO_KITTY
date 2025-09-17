import { type NextRequest, NextResponse } from "next/server"

interface ChatRequest {
  message: string
}

interface ChatResponse {
  reply: string
  suggestions?: string[]
}

export async function POST(request: NextRequest) {
  try {
    const { message }: ChatRequest = await request.json()

    if (!message || typeof message !== "string") {
      return NextResponse.json({ error: "Message is required" }, { status: 400 })
    }

    const lowerMessage = message.toLowerCase()

    // Generate contextual response based on keywords
    let reply: string
    let suggestions: string[] = []

    if (lowerMessage.includes("stress") || lowerMessage.includes("anxious") || lowerMessage.includes("worried")) {
      reply =
        "I understand you're feeling stressed. That's completely normal, especially as a student. Stress can feel overwhelming, but there are gentle ways to manage it. Would you like to try a quick breathing exercise, or would you prefer to talk about what's causing the stress?"
      suggestions = [
        "Show me breathing exercises",
        "I want to talk about what's stressing me",
        "Help me with study stress",
        "I need relaxation techniques",
      ]
    } else if (lowerMessage.includes("sleep") || lowerMessage.includes("tired") || lowerMessage.includes("insomnia")) {
      reply =
        "Sleep troubles can really affect how we feel during the day. Many students struggle with sleep, whether it's from stress, irregular schedules, or racing thoughts. Creating a calming bedtime routine can help. Have you tried any relaxation techniques before bed?"
      suggestions = [
        "Tell me about sleep hygiene",
        "I have racing thoughts at night",
        "Show me bedtime relaxation",
        "Help with sleep schedule",
      ]
    } else if (
      lowerMessage.includes("motivation") ||
      lowerMessage.includes("unmotivated") ||
      lowerMessage.includes("lazy")
    ) {
      reply =
        "Feeling unmotivated happens to everyone, and it doesn't mean anything is wrong with you. Sometimes our minds need rest, or we might be overwhelmed. Small steps can help rebuild momentum. What's one tiny thing you could do today that would make you feel a little accomplished?"
      suggestions = [
        "Help me set small goals",
        "I'm overwhelmed with tasks",
        "Show me motivation techniques",
        "I need study motivation",
      ]
    } else if (lowerMessage.includes("sad") || lowerMessage.includes("depressed") || lowerMessage.includes("down")) {
      reply =
        "I'm sorry you're feeling down. Your feelings are valid, and it's okay to have difficult days. While I can offer support and resources, if you're consistently feeling this way, it might help to talk to a counselor or trusted friend. In the meantime, would you like some gentle activities that might help lift your mood?"
      suggestions = [
        "Show me mood-lifting activities",
        "I want to talk to someone",
        "Help me with self-care",
        "I need professional help resources",
      ]
    } else if (lowerMessage.includes("breathing") || lowerMessage.includes("breathe")) {
      reply =
        "Breathing exercises are wonderful for calming the mind and body! They're simple but powerful. I'd recommend starting with the 4-7-8 technique: breathe in for 4, hold for 7, exhale for 8. You can find guided breathing exercises in our Exercise section. Would you like me to walk you through a quick one?"
      suggestions = [
        "Guide me through breathing now",
        "Show me different breathing techniques",
        "I want longer breathing exercises",
        "Help with panic breathing",
      ]
    } else if (lowerMessage.includes("study") || lowerMessage.includes("exam") || lowerMessage.includes("school")) {
      reply =
        "Academic pressure can be really challenging! Remember that your worth isn't defined by grades. Taking regular breaks, staying organized, and managing stress are just as important as studying. What aspect of your studies is feeling most overwhelming right now?"
      suggestions = [
        "Help with study stress",
        "I need break ideas",
        "Show me focus techniques",
        "Help with exam anxiety",
      ]
    } else if (lowerMessage.includes("friend") || lowerMessage.includes("social") || lowerMessage.includes("lonely")) {
      reply =
        "Social connections are so important for our wellbeing. Feeling lonely or having social challenges is more common than you might think, especially in student life. Building relationships takes time, and it's okay to start small. Are you looking to make new connections or work on existing relationships?"
      suggestions = [
        "Help with making friends",
        "I feel lonely at school",
        "Social anxiety tips",
        "Building confidence socially",
      ]
    } else if (lowerMessage.includes("thank") || lowerMessage.includes("thanks")) {
      reply =
        "You're so welcome! I'm here whenever you need support or just want to chat. Remember, taking care of your mental health is a sign of strength, not weakness. You're doing great by reaching out and using these resources."
      suggestions = [
        "Tell me about other services",
        "I want to try music therapy",
        "Show me stress check tool",
        "Help me create a wellness routine",
      ]
    } else if (lowerMessage.includes("music") || lowerMessage.includes("relax")) {
      reply =
        "Music can be incredibly healing! Our music therapy section has curated playlists for different moods and needs - from focus music to sleep sounds to guided meditations. Different types of music can help with different situations. What kind of mood are you hoping to create?"
      suggestions = [
        "Show me calming music",
        "I need focus music",
        "Help me sleep with music",
        "Guided meditation sounds good",
      ]
    } else if (
      lowerMessage.includes("exercise") ||
      lowerMessage.includes("yoga") ||
      lowerMessage.includes("movement")
    ) {
      reply =
        "Movement is fantastic for mental health! Even gentle exercises like stretching or short walks can help reduce stress and improve mood. Our exercise section has everything from breathing techniques to yoga flows. You don't need to be athletic - it's all about what feels good for your body."
      suggestions = [
        "Show me gentle exercises",
        "I want to try yoga",
        "Quick stress-relief movements",
        "Exercises for study breaks",
      ]
    } else if (lowerMessage.includes("hello") || lowerMessage.includes("hi") || lowerMessage.includes("hey")) {
      reply =
        "Hello! It's lovely to meet you. I'm here to provide a supportive space where you can share what's on your mind, get resources for managing stress, or just have a friendly conversation. There's no judgment here - just support. How are you doing today?"
      suggestions = ["I'm feeling stressed", "I need help sleeping", "Show me your services", "I just want to chat"]
    } else {
      reply =
        "I hear you, and I appreciate you sharing that with me. Every student's experience is unique, and whatever you're going through is valid. While I'm here to offer support and resources, remember that you're not alone in this journey. Is there a particular area where you'd like some guidance or support?"
      suggestions = [
        "Help with stress management",
        "I need study support",
        "Show me relaxation techniques",
        "I want to improve my mood",
      ]
    }

    // Add a small delay to make it feel more natural
    await new Promise((resolve) => setTimeout(resolve, 1000 + Math.random() * 1000))

    const response: ChatResponse = {
      reply,
      suggestions,
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error("Error in chatbot:", error)
    return NextResponse.json({ error: "Failed to process message" }, { status: 500 })
  }
}
