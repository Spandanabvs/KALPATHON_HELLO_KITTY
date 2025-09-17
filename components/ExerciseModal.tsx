"use client"

import { useState, useEffect } from "react"
import { X, Play, Pause, RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"
import GlassCard from "@/components/GlassCard"

interface Exercise {
  id: number
  title: string
  description: string
  steps: string[]
  duration: string
  difficulty: string
  category: string
  benefits: string[]
  quote: string
  image: string
}

interface ExerciseModalProps {
  exercise: Exercise
  onClose: () => void
}

export default function ExerciseModal({ exercise, onClose }: ExerciseModalProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [isActive, setIsActive] = useState(false)
  const [timeRemaining, setTimeRemaining] = useState(30) // 30 seconds per step
  const [totalTime, setTotalTime] = useState(0)

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isActive && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            // Auto-advance to next step
            if (currentStep < exercise.steps.length - 1) {
              setCurrentStep((prevStep) => prevStep + 1)
              return 30
            } else {
              setIsActive(false)
              return 0
            }
          }
          return prev - 1
        })
        setTotalTime((prev) => prev + 1)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isActive, timeRemaining, currentStep, exercise.steps.length])

  const toggleTimer = () => {
    setIsActive(!isActive)
  }

  const resetExercise = () => {
    setCurrentStep(0)
    setIsActive(false)
    setTimeRemaining(30)
    setTotalTime(0)
  }

  const nextStep = () => {
    if (currentStep < exercise.steps.length - 1) {
      setCurrentStep(currentStep + 1)
      setTimeRemaining(30)
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
      setTimeRemaining(30)
    }
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="glass-card max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-white/10">
          <div>
            <h2 className="text-2xl font-bold text-ocean-900 text-balance">{exercise.title}</h2>
            <p className="text-ocean-600 text-sm">
              Step {currentStep + 1} of {exercise.steps.length}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-ocean-600 hover:text-ocean-800 text-2xl p-2"
            aria-label="Close exercise"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
          {/* Progress Bar */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-ocean-600">Progress</span>
              <span className="text-sm text-ocean-600">
                {Math.round(((currentStep + 1) / exercise.steps.length) * 100)}%
              </span>
            </div>
            <div className="w-full bg-ocean-100 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-aqua-400 to-aqua-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentStep + 1) / exercise.steps.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Timer */}
          <div className="text-center mb-6">
            <div className="text-4xl font-bold text-aqua-600 mb-2">{formatTime(timeRemaining)}</div>
            <div className="text-sm text-ocean-600 mb-4">
              Total time: {formatTime(totalTime)} | Session: {exercise.duration}
            </div>
            <div className="flex justify-center space-x-3">
              <Button onClick={toggleTimer} className="bg-aqua-500 hover:bg-aqua-600 text-white">
                {isActive ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
              </Button>
              <Button onClick={resetExercise} variant="outline" className="border-ocean-300 bg-transparent">
                <RotateCcw className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Current Step */}
          <GlassCard className="mb-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-aqua-100 text-aqua-700 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                {currentStep + 1}
              </div>
              <p className="text-lg text-ocean-900 leading-relaxed text-pretty">{exercise.steps[currentStep]}</p>
            </div>
          </GlassCard>

          {/* Navigation */}
          <div className="flex justify-between items-center mb-6">
            <Button
              onClick={prevStep}
              disabled={currentStep === 0}
              variant="outline"
              className="border-ocean-300 bg-transparent"
            >
              Previous Step
            </Button>
            <Button
              onClick={nextStep}
              disabled={currentStep === exercise.steps.length - 1}
              className="bg-aqua-500 hover:bg-aqua-600 text-white"
            >
              Next Step
            </Button>
          </div>

          {/* Motivational Quote */}
          <div className="text-center">
            <blockquote className="italic text-ocean-600 text-lg border-l-4 border-aqua-300 pl-4 text-pretty">
              "{exercise.quote}"
            </blockquote>
          </div>

          {/* Completion Message */}
          {currentStep === exercise.steps.length - 1 && !isActive && timeRemaining === 0 && (
            <GlassCard className="mt-6 text-center bg-green-50/50">
              <h3 className="text-xl font-semibold text-green-800 mb-2">Exercise Complete!</h3>
              <p className="text-green-700 mb-4">
                Great job! You've completed the {exercise.title} exercise in {formatTime(totalTime)}.
              </p>
              <Button onClick={resetExercise} className="bg-green-600 hover:bg-green-700 text-white">
                Do It Again
              </Button>
            </GlassCard>
          )}
        </div>
      </div>
    </div>
  )
}
