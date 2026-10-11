import { useEffect, useMemo, useRef, useState } from 'react'

type Props = { file: File | null }
export function AudioControl({ file }: Props) {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [playing, setPlaying] = useState(false)
  const [error, setError] = useState('')
  const url = useMemo(() => file ? URL.createObjectURL(file) : '', [file])
  useEffect(() => () => { if (url) URL.revokeObjectURL(url) }, [url])
  if (!file || !url) return null
  const toggle = async () => { try { if (audioRef.current?.paused) { await audioRef.current.play(); setPlaying(true) } else { audioRef.current?.pause(); setPlaying(false) } } catch { setError('This audio file could not play, but the gift is ready without it.') } }
  return <div className="audio-control"><audio ref={audioRef} src={url} onEnded={() => setPlaying(false)} onError={() => setError('This audio file could not play.')} /><button type="button" onClick={toggle} aria-label={playing ? 'Pause soundtrack' : 'Play soundtrack'}>{playing ? 'Ⅱ Pause sound' : '▶ Play sound'}</button>{error && <span role="status">{error}</span>}</div>
}
