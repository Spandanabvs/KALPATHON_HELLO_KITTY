interface StressOrbProps {
  color: string
  intensity: number
}

export default function StressOrb({ color, intensity }: StressOrbProps) {
  const glowIntensity = Math.max(0.3, intensity)

  return (
    <div className="flex justify-center">
      <div
        className="w-32 h-32 rounded-full orb-glow transition-all duration-1000"
        style={{
          backgroundColor: color,
          boxShadow: `0 0 ${40 * glowIntensity}px ${color}, 0 0 ${80 * glowIntensity}px ${color}`,
          opacity: 0.8 + 0.2 * intensity,
        }}
      />
    </div>
  )
}
