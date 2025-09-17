"use client"

import type React from "react"

import { useState } from "react"
import { Brain, Heart, Moon, Coffee, Activity } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import GlassCard from "@/components/GlassCard"
import StressOrb from "@/components/StressOrb"

interface StressResult {
  stressLevelScore: number
  category: string
  orbColor: string
  orbIntensity: number
  recommendations: string[]
}

export default function StressCheckPage() {
  const [formData, setFormData] = useState({
    sleepHours: "",
    bloodPressure: "",
    respirationRate: "",
    maxHeartRate: "",
    caffeineIntake: "",
    moodRating: "",
  })
  const [result, setResult] = useState<StressResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.sleepHours || Number(formData.sleepHours) < 0 || Number(formData.sleepHours) > 24) {
      newErrors.sleepHours = "Please enter valid sleep hours (0-24)"
    }

    if (!formData.bloodPressure) {
      newErrors.bloodPressure = "Blood pressure is required"
    }

    if (!formData.respirationRate || Number(formData.respirationRate) < 5 || Number(formData.respirationRate) > 50) {
      newErrors.respirationRate = "Please enter valid respiration rate (5-50 breaths/min)"
    }

    if (!formData.maxHeartRate || Number(formData.maxHeartRate) < 50 || Number(formData.maxHeartRate) > 220) {
      newErrors.maxHeartRate = "Please enter valid heart rate (50-220 bpm)"
    }

    if (formData.caffeineIntake && (Number(formData.caffeineIntake) < 0 || Number(formData.caffeineIntake) > 20)) {
      newErrors.caffeineIntake = "Please enter valid caffeine intake (0-20 cups/day)"
    }

    if (formData.moodRating && (Number(formData.moodRating) < 1 || Number(formData.moodRating) > 10)) {
      newErrors.moodRating = "Please enter valid mood rating (1-10)"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return

    setLoading(true)
    try {
      const response = await fetch("/api/predict-stress", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error("Failed to analyze stress")
      }

      const data = await response.json()
      setResult(data)
    } catch (error) {
      console.error("Error:", error)
      // Handle error appropriately
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  return (
    <div className="min-h-screen pt-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-4xl mx-auto py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center shadow-lg border border-primary/30">
              <Brain className="w-8 h-8 text-primary" />
            </div>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4 text-balance drop-shadow-lg">
            Stress Check & Analysis
          </h1>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto text-pretty">
            Answer a few questions about your health and lifestyle to get a personalized stress analysis with
            recommendations.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form */}
          <GlassCard variant="elevated">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="sleepHours" className="flex items-center space-x-2 text-white">
                  <Moon className="w-4 h-4 text-primary" />
                  <span>Sleep Hours (per night)</span>
                </Label>
                <Input
                  id="sleepHours"
                  type="number"
                  min="0"
                  max="24"
                  step="0.5"
                  value={formData.sleepHours}
                  onChange={(e) => handleInputChange("sleepHours", e.target.value)}
                  placeholder="e.g., 7.5"
                  className={errors.sleepHours ? "border-red-300" : ""}
                />
                {errors.sleepHours && <p className="text-red-400 text-sm">{errors.sleepHours}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="bloodPressure" className="flex items-center space-x-2 text-white">
                  <Heart className="w-4 h-4 text-primary" />
                  <span>Blood Pressure (mmHg)</span>
                </Label>
                <Input
                  id="bloodPressure"
                  type="text"
                  value={formData.bloodPressure}
                  onChange={(e) => handleInputChange("bloodPressure", e.target.value)}
                  placeholder="e.g., 120/80"
                  className={errors.bloodPressure ? "border-red-300" : ""}
                />
                {errors.bloodPressure && <p className="text-red-400 text-sm">{errors.bloodPressure}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="respirationRate" className="flex items-center space-x-2 text-white">
                  <Activity className="w-4 h-4 text-primary" />
                  <span>Respiration Rate (breaths/min)</span>
                </Label>
                <Input
                  id="respirationRate"
                  type="number"
                  min="5"
                  max="50"
                  value={formData.respirationRate}
                  onChange={(e) => handleInputChange("respirationRate", e.target.value)}
                  placeholder="e.g., 16"
                  className={errors.respirationRate ? "border-red-300" : ""}
                />
                {errors.respirationRate && <p className="text-red-400 text-sm">{errors.respirationRate}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="maxHeartRate" className="flex items-center space-x-2 text-white">
                  <Heart className="w-4 h-4 text-primary" />
                  <span>Max Heart Rate (bpm)</span>
                </Label>
                <Input
                  id="maxHeartRate"
                  type="number"
                  min="50"
                  max="220"
                  value={formData.maxHeartRate}
                  onChange={(e) => handleInputChange("maxHeartRate", e.target.value)}
                  placeholder="e.g., 180"
                  className={errors.maxHeartRate ? "border-red-300" : ""}
                />
                {errors.maxHeartRate && <p className="text-red-400 text-sm">{errors.maxHeartRate}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="caffeineIntake" className="flex items-center space-x-2 text-white">
                  <Coffee className="w-4 h-4 text-primary" />
                  <span>Caffeine Intake (cups/day) - Optional</span>
                </Label>
                <Input
                  id="caffeineIntake"
                  type="number"
                  min="0"
                  max="20"
                  value={formData.caffeineIntake}
                  onChange={(e) => handleInputChange("caffeineIntake", e.target.value)}
                  placeholder="e.g., 2"
                  className={errors.caffeineIntake ? "border-red-300" : ""}
                />
                {errors.caffeineIntake && <p className="text-red-400 text-sm">{errors.caffeineIntake}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="moodRating" className="text-white">
                  Mood Rating (1-10) - Optional
                </Label>
                <Select value={formData.moodRating} onValueChange={(value) => handleInputChange("moodRating", value)}>
                  <SelectTrigger className={errors.moodRating ? "border-red-300" : ""}>
                    <SelectValue placeholder="Select your current mood" />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => (
                      <SelectItem key={num} value={num.toString()}>
                        {num} - {num <= 3 ? "Low" : num <= 6 ? "Moderate" : "High"}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.moodRating && <p className="text-red-400 text-sm">{errors.moodRating}</p>}
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-primary hover:bg-primary/90 text-slate-900 shadow-lg hover:shadow-xl transition-all font-semibold"
                size="lg"
              >
                {loading ? "Analyzing..." : "Analyze My Stress Level"}
              </Button>
            </form>
          </GlassCard>

          {/* Results */}
          <div className="space-y-6">
            {result ? (
              <>
                <GlassCard variant="elevated" className="text-center">
                  <h3 className="text-xl font-semibold text-white mb-4">Your Stress Analysis</h3>
                  <StressOrb color={result.orbColor} intensity={result.orbIntensity} />
                  <div className="mt-6">
                    <p className="text-2xl font-bold text-primary mb-2">{result.stressLevelScore}/100</p>
                    <p className="text-lg text-slate-300 mb-4">{result.category}</p>
                    <div className="w-full bg-slate-700 rounded-full h-3">
                      <div
                        className="bg-gradient-to-r from-primary to-primary/80 h-3 rounded-full transition-all duration-1000"
                        style={{ width: `${result.stressLevelScore}%` }}
                      />
                    </div>
                  </div>
                </GlassCard>

                <GlassCard>
                  <h4 className="font-semibold text-white mb-4">Recommendations</h4>
                  <ul className="space-y-3">
                    {result.recommendations.map((rec, index) => (
                      <li key={index} className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                        <span className="text-slate-300 text-sm">{rec}</span>
                      </li>
                    ))}
                  </ul>
                </GlassCard>
              </>
            ) : (
              <GlassCard className="text-center py-12">
                <Brain className="w-16 h-16 text-slate-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">Ready for Analysis</h3>
                <p className="text-slate-300 text-sm">
                  Fill out the form to get your personalized stress analysis and recommendations.
                </p>
              </GlassCard>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
