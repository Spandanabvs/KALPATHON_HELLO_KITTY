import { type NextRequest, NextResponse } from "next/server"

interface StressData {
  sleepHours: string
  bloodPressure: string
  respirationRate: string
  maxHeartRate: string
  caffeineIntake?: string
  moodRating?: string
}

export async function POST(request: NextRequest) {
  try {
    const data: StressData = await request.json()

    // Convert string inputs to numbers
    const sleepHours = Number(data.sleepHours)
    const respirationRate = Number(data.respirationRate)
    const maxHeartRate = Number(data.maxHeartRate)
    const caffeineIntake = data.caffeineIntake ? Number(data.caffeineIntake) : 0
    const moodRating = data.moodRating ? Number(data.moodRating) : 5

    // Parse blood pressure (assuming format like "120/80")
    const bpParts = data.bloodPressure.split("/")
    const systolic = bpParts[0] ? Number(bpParts[0]) : 120
    const diastolic = bpParts[1] ? Number(bpParts[1]) : 80

    // Calculate stress score (0-100)
    let stressScore = 0

    // Sleep factor (optimal: 7-9 hours)
    if (sleepHours < 6) stressScore += 25
    else if (sleepHours < 7) stressScore += 15
    else if (sleepHours > 9) stressScore += 10

    // Blood pressure factor (normal: <120/80)
    if (systolic > 140 || diastolic > 90) stressScore += 20
    else if (systolic > 130 || diastolic > 85) stressScore += 15
    else if (systolic > 120 || diastolic > 80) stressScore += 10

    // Respiration rate factor (normal: 12-20)
    if (respirationRate > 24) stressScore += 15
    else if (respirationRate > 20) stressScore += 10
    else if (respirationRate < 10) stressScore += 5

    // Heart rate factor (varies by age, but high rates indicate stress)
    if (maxHeartRate > 180) stressScore += 15
    else if (maxHeartRate > 160) stressScore += 10
    else if (maxHeartRate > 140) stressScore += 5

    // Caffeine factor
    if (caffeineIntake > 4) stressScore += 10
    else if (caffeineIntake > 2) stressScore += 5

    // Mood factor (inverted - low mood increases stress)
    if (moodRating <= 3) stressScore += 20
    else if (moodRating <= 5) stressScore += 10
    else if (moodRating >= 8) stressScore -= 5

    // Cap the score at 100
    stressScore = Math.min(100, Math.max(0, stressScore))

    // Determine category and orb properties
    let category: string
    let orbColor: string
    let orbIntensity: number
    let recommendations: string[]

    if (stressScore > 70) {
      category = "High Stress / Anxious"
      orbColor = "#ef4444" // red
      orbIntensity = 0.9
      recommendations = [
        "Consider speaking with a counselor or mental health professional",
        "Try our guided breathing exercises to help manage immediate stress",
        "Listen to our calming music therapy sessions",
        "Prioritize getting 7-9 hours of sleep tonight",
        "Reduce caffeine intake and try herbal tea instead",
        "Take short breaks throughout your day for mindfulness",
      ]
    } else if (stressScore > 40) {
      category = "Moderate Stress"
      orbColor = "#f59e0b" // amber
      orbIntensity = 0.6
      recommendations = [
        "Practice daily stress-reduction exercises from our library",
        "Try our music therapy sessions for relaxation",
        "Maintain a consistent sleep schedule",
        "Consider light physical activity like walking or yoga",
        "Use our chatbot for supportive conversation",
        "Take regular breaks from studying or work",
      ]
    } else if (stressScore > 20) {
      category = "Low Stress / Calm"
      orbColor = "#3b82f6" // blue
      orbIntensity = 0.4
      recommendations = [
        "You're doing well! Keep up your current wellness routine",
        "Try our music therapy for continued relaxation",
        "Maintain your healthy sleep habits",
        "Consider our exercise recommendations for ongoing wellness",
        "Use our resources proactively to maintain your calm state",
      ]
    } else {
      category = "Very Calm / Happy"
      orbColor = "#10b981" // green
      orbIntensity = 0.3
      recommendations = [
        "Excellent! You're managing stress very well",
        "Continue your current healthy habits",
        "Consider sharing your wellness strategies with friends",
        "Use our resources to maintain this positive state",
        "You might enjoy our uplifting music therapy sessions",
      ]
    }

    return NextResponse.json({
      stressLevelScore: Math.round(stressScore),
      category,
      orbColor,
      orbIntensity,
      recommendations,
    })
  } catch (error) {
    console.error("Error in stress prediction:", error)
    return NextResponse.json({ error: "Failed to analyze stress data" }, { status: 500 })
  }
}
