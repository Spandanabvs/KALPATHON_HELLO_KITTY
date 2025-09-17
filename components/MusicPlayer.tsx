"use client"

import { useState, useRef, useEffect } from "react"
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import GlassCard from "@/components/GlassCard"

interface Track {
  id: number
  title: string
  artist: string
  duration: string
  category: string
  audioUrl: string
  albumArt: string
}

interface MusicPlayerProps {
  tracks: Track[]
}

export default function MusicPlayer({ tracks }: MusicPlayerProps) {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState([75])
  const [isMuted, setIsMuted] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)

  const currentTrack = tracks[currentTrackIndex]

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const updateTime = () => setCurrentTime(audio.currentTime)
    const updateDuration = () => setDuration(audio.duration)

    audio.addEventListener("timeupdate", updateTime)
    audio.addEventListener("loadedmetadata", updateDuration)
    audio.addEventListener("ended", nextTrack)

    return () => {
      audio.removeEventListener("timeupdate", updateTime)
      audio.removeEventListener("loadedmetadata", updateDuration)
      audio.removeEventListener("ended", nextTrack)
    }
  }, [currentTrackIndex])

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume[0] / 100
    }
  }, [volume, isMuted])

  const togglePlay = () => {
    if (!audioRef.current) return

    if (isPlaying) {
      audioRef.current.pause()
    } else {
      audioRef.current.play()
    }
    setIsPlaying(!isPlaying)
  }

  const nextTrack = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % tracks.length)
    setIsPlaying(false)
  }

  const previousTrack = () => {
    setCurrentTrackIndex((prev) => (prev - 1 + tracks.length) % tracks.length)
    setIsPlaying(false)
  }

  const seekTo = (value: number[]) => {
    if (audioRef.current) {
      audioRef.current.currentTime = value[0]
      setCurrentTime(value[0])
    }
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, "0")}`
  }

  const toggleMute = () => {
    setIsMuted(!isMuted)
  }

  if (!currentTrack) return null

  return (
    <GlassCard variant="elevated">
      <audio ref={audioRef} src={currentTrack.audioUrl} />

      <div className="flex items-center space-x-4">
        {/* Album Art */}
        <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
          <img
            src={currentTrack.albumArt || "/placeholder.svg?height=64&width=64"}
            alt={`${currentTrack.title} album art`}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Track Info */}
        <div className="flex-1 min-w-0">
          <h4 className="font-medium text-ocean-900 truncate">{currentTrack.title}</h4>
          <p className="text-sm text-ocean-600 truncate">{currentTrack.artist}</p>
        </div>

        {/* Controls */}
        <div className="flex items-center space-x-2">
          <Button onClick={previousTrack} variant="ghost" size="sm">
            <SkipBack className="w-5 h-5" />
          </Button>

          <Button onClick={togglePlay} className="bg-aqua-500 hover:bg-aqua-600 text-white">
            {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
          </Button>

          <Button onClick={nextTrack} variant="ghost" size="sm">
            <SkipForward className="w-5 h-5" />
          </Button>
        </div>

        {/* Volume */}
        <div className="flex items-center space-x-2 min-w-0">
          <Button onClick={toggleMute} variant="ghost" size="sm">
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </Button>
          <div className="w-20">
            <Slider value={volume} onValueChange={setVolume} max={100} step={1} className="w-full" />
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mt-4">
        <div className="flex items-center space-x-2 text-xs text-ocean-600 mb-2">
          <span>{formatTime(currentTime)}</span>
          <div className="flex-1">
            <Slider value={[currentTime]} onValueChange={seekTo} max={duration || 100} step={1} className="w-full" />
          </div>
          <span>{formatTime(duration)}</span>
        </div>
      </div>
    </GlassCard>
  )
}
