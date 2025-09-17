"use client"

import { useState } from "react"
import { Dumbbell, Clock, User, ChevronDown, ChevronUp, Play } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import GlassCard from "@/components/GlassCard"
import ExerciseModal from "@/components/ExerciseModal"

interface Exercise {
  id: number
  title: string
  description: string
  steps: string[]
  duration: string
  difficulty: "Beginner" | "Intermediate" | "Advanced"
  category: "Breathing" | "Yoga" | "Meditation" | "Movement"
  benefits: string[]
  quote: string
  image: string
}

export default function ExercisesPage() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedDifficulty, setSelectedDifficulty] = useState("all")
  const [expandedExercise, setExpandedExercise] = useState<number | null>(null)
  const [modalExercise, setModalExercise] = useState<Exercise | null>(null)

  const exercises: Exercise[] = [
    {
      id: 1,
      title: "4-7-8 Breathing Technique",
      description: "A simple yet powerful breathing exercise to reduce anxiety and promote relaxation.",
      steps: [
        "Sit comfortably with your back straight",
        "Place the tip of your tongue against the ridge behind your upper teeth",
        "Exhale completely through your mouth, making a whoosh sound",
        "Close your mouth and inhale through your nose for 4 counts",
        "Hold your breath for 7 counts",
        "Exhale through your mouth for 8 counts, making a whoosh sound",
        "Repeat the cycle 3-4 times",
      ],
      duration: "5 minutes",
      difficulty: "Beginner",
      category: "Breathing",
      benefits: ["Reduces anxiety", "Improves sleep", "Lowers stress hormones"],
      quote: "Breath is the bridge which connects life to consciousness.",
      image: "/breathing-exercise-peaceful-setting.jpg",
    },
    {
      id: 2,
      title: "Progressive Muscle Relaxation",
      description: "Systematically tense and relax different muscle groups to release physical tension.",
      steps: [
        "Lie down in a comfortable position",
        "Start with your toes - tense for 5 seconds, then relax",
        "Move to your calves - tense and relax",
        "Continue with thighs, abdomen, hands, arms, shoulders",
        "Tense your facial muscles, then relax",
        "Take a moment to notice the difference between tension and relaxation",
        "Breathe deeply and enjoy the relaxed state",
      ],
      duration: "15 minutes",
      difficulty: "Beginner",
      category: "Meditation",
      benefits: ["Reduces muscle tension", "Improves body awareness", "Promotes deep relaxation"],
      quote: "Tension is who you think you should be. Relaxation is who you are.",
      image: "/progressive-muscle-relaxation-guide.jpg",
    },
    {
      id: 3,
      title: "Sun Salutation (Surya Namaskara)",
      description: "A flowing sequence of yoga poses that energizes the body and calms the mind.",
      steps: [
        "Mountain Pose - Stand tall with palms together at heart center",
        "Upward Salute - Inhale, sweep arms overhead",
        "Standing Forward Fold - Exhale, hinge at hips, fold forward",
        "Half Lift - Inhale, hands to shins, lengthen spine",
        "Low Push-up - Exhale, step back, lower down",
        "Upward Facing Dog - Inhale, roll over toes, open chest",
        "Downward Facing Dog - Exhale, roll over toes, lift hips",
        "Standing Forward Fold - Inhale, step feet to hands",
        "Mountain Pose - Exhale, rise to standing",
      ],
      duration: "10 minutes",
      difficulty: "Intermediate",
      category: "Yoga",
      benefits: ["Increases flexibility", "Builds strength", "Improves circulation"],
      quote: "Yoga is not about touching your toes. It is about what you learn on the way down.",
      image: "/sun-salutation-yoga-sequence.jpg",
    },
    {
      id: 4,
      title: "Mindful Walking",
      description: "A gentle movement practice that combines walking with mindfulness meditation.",
      steps: [
        "Find a quiet path or space where you can walk slowly",
        "Begin walking at a slower pace than usual",
        "Focus on the sensation of your feet touching the ground",
        "Notice the movement of your legs and the swing of your arms",
        "When your mind wanders, gently return attention to walking",
        "Observe your surroundings without judgment",
        "End by standing still and taking three deep breaths",
      ],
      duration: "20 minutes",
      difficulty: "Beginner",
      category: "Movement",
      benefits: ["Reduces rumination", "Improves mood", "Increases mindfulness"],
      quote: "Walk as if you are kissing the Earth with your feet.",
      image: "/mindful-walking-peaceful-path.jpg",
    },
    {
      id: 5,
      title: "Child's Pose Flow",
      description: "A restorative yoga sequence that promotes deep relaxation and stress relief.",
      steps: [
        "Kneel on the floor with big toes touching",
        "Sit back on your heels and separate your knees hip-width apart",
        "Fold forward, extending your arms in front of you",
        "Rest your forehead on the ground",
        "Breathe deeply and hold for 1-2 minutes",
        "Slowly roll up to sitting",
        "Repeat 3-5 times, focusing on your breath",
      ],
      duration: "8 minutes",
      difficulty: "Beginner",
      category: "Yoga",
      benefits: ["Calms the nervous system", "Relieves back tension", "Promotes introspection"],
      quote: "In stillness, the world resets.",
      image: "/childs-pose-yoga-relaxation.jpg",
    },
    {
      id: 6,
      title: "Box Breathing",
      description: "A structured breathing technique used by Navy SEALs to maintain calm under pressure.",
      steps: [
        "Sit upright in a comfortable position",
        "Exhale all air from your lungs",
        "Inhale through your nose for 4 counts",
        "Hold your breath for 4 counts",
        "Exhale through your mouth for 4 counts",
        "Hold empty for 4 counts",
        "Repeat for 4-8 cycles",
      ],
      duration: "6 minutes",
      difficulty: "Intermediate",
      category: "Breathing",
      benefits: ["Improves focus", "Reduces stress response", "Enhances emotional regulation"],
      quote: "Breathe in peace, breathe out stress.",
      image: "/box-breathing-technique-visualization.jpg",
    },
  ]

  const categories = ["all", "Breathing", "Yoga", "Meditation", "Movement"]
  const difficulties = ["all", "Beginner", "Intermediate", "Advanced"]

  const filteredExercises = exercises.filter((exercise) => {
    const categoryMatch = selectedCategory === "all" || exercise.category === selectedCategory
    const difficultyMatch = selectedDifficulty === "all" || exercise.difficulty === selectedDifficulty
    return categoryMatch && difficultyMatch
  })

  const toggleExpanded = (exerciseId: number) => {
    setExpandedExercise(expandedExercise === exerciseId ? null : exerciseId)
  }

  const openModal = (exercise: Exercise) => {
    setModalExercise(exercise)
  }

  const closeModal = () => {
    setModalExercise(null)
  }

  return (
    <div className="min-h-screen pt-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-aqua-100 rounded-full flex items-center justify-center">
              <Dumbbell className="w-8 h-8 text-aqua-600" />
            </div>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-ocean-900 mb-4 text-balance">Exercise Recommendations</h1>
          <p className="text-lg text-ocean-600 max-w-2xl mx-auto text-pretty">
            Step-by-step stress-reducing exercises, yoga poses, and mindfulness practices for daily wellness.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="flex-1">
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category === "all" ? "All Categories" : category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex-1">
            <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
              <SelectTrigger>
                <SelectValue placeholder="Select difficulty" />
              </SelectTrigger>
              <SelectContent>
                {difficulties.map((difficulty) => (
                  <SelectItem key={difficulty} value={difficulty}>
                    {difficulty === "all" ? "All Levels" : difficulty}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Exercise Cards */}
        <div className="space-y-6">
          {filteredExercises.map((exercise) => (
            <GlassCard key={exercise.id} className="overflow-hidden">
              <div className="flex flex-col lg:flex-row">
                {/* Image */}
                <div className="lg:w-1/3">
                  <div className="h-48 lg:h-full relative overflow-hidden rounded-lg lg:rounded-r-none">
                    <img
                      src={exercise.image || "/placeholder.svg?height=200&width=300"}
                      alt={exercise.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ocean-900/20 to-transparent" />
                  </div>
                </div>

                {/* Content */}
                <div className="lg:w-2/3 p-6 lg:pl-8">
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <span className="text-xs bg-aqua-100 text-aqua-700 px-2 py-1 rounded">{exercise.category}</span>
                    <span className="text-xs bg-ocean-100 text-ocean-700 px-2 py-1 rounded">{exercise.difficulty}</span>
                    <div className="flex items-center text-xs text-ocean-600">
                      <Clock className="w-3 h-3 mr-1" />
                      {exercise.duration}
                    </div>
                  </div>

                  <h3 className="text-xl font-semibold text-ocean-900 mb-2 text-balance">{exercise.title}</h3>
                  <p className="text-ocean-600 mb-4 text-pretty">{exercise.description}</p>

                  {/* Benefits */}
                  <div className="mb-4">
                    <h4 className="font-medium text-ocean-900 mb-2">Benefits:</h4>
                    <div className="flex flex-wrap gap-2">
                      {exercise.benefits.map((benefit, index) => (
                        <span key={index} className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                          {benefit}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Quote */}
                  <blockquote className="italic text-ocean-600 text-sm mb-4 border-l-2 border-aqua-300 pl-3">
                    "{exercise.quote}"
                  </blockquote>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap gap-3">
                    <Button onClick={() => openModal(exercise)} className="bg-aqua-500 hover:bg-aqua-600 text-white">
                      <Play className="w-4 h-4 mr-2" />
                      Begin Exercise
                    </Button>
                    <Button
                      onClick={() => toggleExpanded(exercise.id)}
                      variant="outline"
                      className="border-ocean-300 text-ocean-700"
                    >
                      {expandedExercise === exercise.id ? (
                        <>
                          Hide Steps <ChevronUp className="w-4 h-4 ml-2" />
                        </>
                      ) : (
                        <>
                          View Steps <ChevronDown className="w-4 h-4 ml-2" />
                        </>
                      )}
                    </Button>
                  </div>

                  {/* Expanded Steps */}
                  {expandedExercise === exercise.id && (
                    <div className="mt-6 pt-6 border-t border-white/10">
                      <h4 className="font-medium text-ocean-900 mb-3">Step-by-step instructions:</h4>
                      <ol className="space-y-2">
                        {exercise.steps.map((step, index) => (
                          <li key={index} className="flex items-start space-x-3">
                            <span className="flex-shrink-0 w-6 h-6 bg-aqua-100 text-aqua-700 rounded-full flex items-center justify-center text-xs font-medium">
                              {index + 1}
                            </span>
                            <span className="text-ocean-600 text-sm">{step}</span>
                          </li>
                        ))}
                      </ol>
                    </div>
                  )}
                </div>
              </div>
            </GlassCard>
          ))}
        </div>

        {filteredExercises.length === 0 && (
          <div className="text-center py-12">
            <User className="w-16 h-16 text-ocean-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-ocean-600 mb-2">No exercises found</h3>
            <p className="text-ocean-500">Try adjusting your filters to see more exercises.</p>
          </div>
        )}
      </div>

      {/* Exercise Modal */}
      {modalExercise && <ExerciseModal exercise={modalExercise} onClose={closeModal} />}
    </div>
  )
}
