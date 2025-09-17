"use client"

import { useState, useEffect } from "react"
import { Play, Heart, Clock, Volume2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import GlassCard from "@/components/GlassCard"
import MusicPlayer from "@/components/MusicPlayer"

interface Track {
  id: number
  title: string
  artist: string
  duration: string
  category: string
  audioUrl: string
  albumArt: string
  isFavorite?: boolean
}

export default function MusicTherapyPage() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [sessionTimer, setSessionTimer] = useState(0) // in minutes
  const [isSessionActive, setIsSessionActive] = useState(false)
  const [favorites, setFavorites] = useState<number[]>([])

  const tracks: Track[] = [
    {
      id: 1,
      title: "Ocean Waves",
      artist: "Nature Sounds",
      duration: "10:00",
      category: "Ambient",
      audioUrl: "/audio/ocean-waves.mp3",
      albumArt: "/calm-ocean-waves-album-art.jpg",
    },
    {
      id: 2,
      title: "Guided Breathing",
      artist: "Mindfulness Guide",
      duration: "5:30",
      category: "Guided Meditation",
      audioUrl: "/audio/guided-breathing.mp3",
      albumArt: "/guided-meditation-album-art.jpg",
    },
    {
      id: 3,
      title: "Forest Rain",
      artist: "Nature Sounds",
      duration: "15:00",
      category: "Sleep",
      audioUrl: "/audio/forest-rain.mp3",
      albumArt: "/peaceful-forest-rain-album-art.jpg",
    },
    {
      id: 4,
      title: "Focus Flow",
      artist: "Ambient Collective",
      duration: "8:45",
      category: "Focus",
      audioUrl: "/audio/focus-flow.mp3",
      albumArt: "/focus-flow-album-art.jpg",
    },
    {
      id: 5,
      title: "Body Scan Meditation",
      artist: "Wellness Coach",
      duration: "12:00",
      category: "Guided Meditation",
      audioUrl: "/audio/body-scan.mp3",
      albumArt: "/body-scan-meditation-album-art.jpg",
    },
    {
      id: 6,
      title: "Gentle Piano",
      artist: "Peaceful Melodies",
      duration: "7:20",
      category: "Ambient",
      audioUrl: "/audio/gentle-piano.mp3",
      albumArt: "/gentle-piano-album-art.jpg",
    },
    {
      id: 7,
      title: "Deep Sleep Sounds",
      artist: "Sleep Therapy",
      duration: "30:00",
      category: "Sleep",
      audioUrl: "/audio/deep-sleep.mp3",
      albumArt: "/deep-sleep-sounds-album-art.jpg",
    },
    {
      id: 8,
      title: "Morning Motivation",
      artist: "Positive Vibes",
      duration: "6:15",
      category: "Focus",
      audioUrl: "/audio/morning-motivation.mp3",
      albumArt: "/morning-motivation-album-art.jpg",
    },
  ]

  const categories = ["all", "Guided Meditation", "Sleep", "Focus", "Ambient"]

  const filteredTracks = tracks.filter((track) =>
    selectedCategory === "all" ? true : track.category === selectedCategory,
  )

  const toggleFavorite = (trackId: number) => {
    setFavorites((prev) => (prev.includes(trackId) ? prev.filter((id) => id !== trackId) : [...prev, trackId]))
  }

  const startSession = (minutes: number) => {
    setSessionTimer(minutes)
    setIsSessionActive(true)
  }

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isSessionActive && sessionTimer > 0) {
      interval = setInterval(() => {
        setSessionTimer((prev) => {
          if (prev <= 1) {
            setIsSessionActive(false)
            return 0
          }
          return prev - 1
        })
      }, 60000) // Update every minute
    }
    return () => clearInterval(interval)
  }, [isSessionActive, sessionTimer])

  return (
    <div className="min-h-screen pt-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-aqua-100 rounded-full flex items-center justify-center">
              <Volume2 className="w-8 h-8 text-aqua-600" />
            </div>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-ocean-900 mb-4 text-balance">Music Therapy</h1>
          <p className="text-lg text-ocean-600 max-w-2xl mx-auto text-pretty">
            Curated calming tracks and guided meditations to help you relax, focus, and find inner peace.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Controls & Categories */}
          <div className="space-y-6">
            {/* Session Timer */}
            <GlassCard>
              <h3 className="font-semibold text-ocean-900 mb-4 flex items-center">
                <Clock className="w-5 h-5 mr-2 text-aqua-500" />
                Session Timer
              </h3>
              {isSessionActive ? (
                <div className="text-center">
                  <div className="text-2xl font-bold text-aqua-600 mb-2">{sessionTimer} min</div>
                  <p className="text-sm text-ocean-600 mb-4">Session in progress</p>
                  <Button
                    onClick={() => setIsSessionActive(false)}
                    variant="outline"
                    size="sm"
                    className="border-ocean-300"
                  >
                    End Session
                  </Button>
                </div>
              ) : (
                <div className="space-y-3">
                  <p className="text-sm text-ocean-600 mb-3">Set a timer for your session:</p>
                  <div className="grid grid-cols-3 gap-2">
                    <Button onClick={() => startSession(10)} variant="outline" size="sm">
                      10 min
                    </Button>
                    <Button onClick={() => startSession(20)} variant="outline" size="sm">
                      20 min
                    </Button>
                    <Button onClick={() => startSession(30)} variant="outline" size="sm">
                      30 min
                    </Button>
                  </div>
                </div>
              )}
            </GlassCard>

            {/* Category Filter */}
            <GlassCard>
              <h3 className="font-semibold text-ocean-900 mb-4">Categories</h3>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category === "all" ? "All Categories" : category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </GlassCard>

            {/* Favorites */}
            <GlassCard>
              <h3 className="font-semibold text-ocean-900 mb-4 flex items-center">
                <Heart className="w-5 h-5 mr-2 text-aqua-500" />
                Favorites ({favorites.length})
              </h3>
              {favorites.length > 0 ? (
                <div className="space-y-2">
                  {tracks
                    .filter((track) => favorites.includes(track.id))
                    .slice(0, 3)
                    .map((track) => (
                      <div key={track.id} className="text-sm text-ocean-600">
                        {track.title}
                      </div>
                    ))}
                  {favorites.length > 3 && <div className="text-xs text-ocean-500">+{favorites.length - 3} more</div>}
                </div>
              ) : (
                <p className="text-sm text-ocean-500">No favorites yet. Heart tracks to add them here.</p>
              )}
            </GlassCard>
          </div>

          {/* Playlist */}
          <div className="lg:col-span-2">
            <GlassCard variant="elevated">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold text-ocean-900">
                  {selectedCategory === "all" ? "All Tracks" : selectedCategory}
                </h3>
                <span className="text-sm text-ocean-600">{filteredTracks.length} tracks</span>
              </div>

              <div className="space-y-4">
                {filteredTracks.map((track) => (
                  <div
                    key={track.id}
                    className="flex items-center space-x-4 p-4 rounded-lg hover:bg-white/5 transition-colors group"
                  >
                    <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                      <img
                        src={track.albumArt || "/placeholder.svg?height=64&width=64"}
                        alt={`${track.title} album art`}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <Play className="w-6 h-6 text-white" />
                      </div>
                    </div>

                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-ocean-900 truncate">{track.title}</h4>
                      <p className="text-sm text-ocean-600 truncate">{track.artist}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className="text-xs bg-aqua-100 text-aqua-700 px-2 py-1 rounded">{track.category}</span>
                        <span className="text-xs text-ocean-500">{track.duration}</span>
                      </div>
                    </div>

                    <Button
                      onClick={() => toggleFavorite(track.id)}
                      variant="ghost"
                      size="sm"
                      className="flex-shrink-0"
                    >
                      <Heart
                        className={`w-5 h-5 ${
                          favorites.includes(track.id) ? "fill-red-500 text-red-500" : "text-ocean-400"
                        }`}
                      />
                    </Button>
                  </div>
                ))}
              </div>
            </GlassCard>
          </div>
        </div>

        {/* Music Player Component */}
        <div className="mt-8">
          <MusicPlayer tracks={filteredTracks} />
        </div>
      </div>
    </div>
  )
}
