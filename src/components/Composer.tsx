import { useRef, useState } from 'react'
import type { ChangeEvent } from 'react'
import type { LocalPhoto } from '../lib/media'
import { preparePhotos } from '../lib/media'
import { normalizeText, validateFiles } from '../lib/validation'

export type GiftDraft = { sender: string; recipient: string; letter: string; photos: LocalPhoto[]; audio: File | null }

type Props = { draft: GiftDraft; onChange: (draft: GiftDraft) => void; onPreview: () => void }

export function Composer({ draft, onChange, onPreview }: Props) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [errors, setErrors] = useState<string[]>([])
  const update = (field: 'sender' | 'recipient' | 'letter', value: string) => onChange({ ...draft, [field]: field === 'letter' ? value.slice(0, 9000) : normalizeText(value, 80) })
  const selectPhotos = async (event: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files ?? [])
    const messages = validateFiles([...draft.photos.map((photo) => photo.file), ...files])
    if (messages.length) { setErrors(messages); event.target.value = ''; return }
    try { onChange({ ...draft, photos: [...draft.photos, ...await preparePhotos(files)] }); setErrors([]) }
    catch (error) { setErrors([error instanceof Error ? error.message : 'Those photos could not be read.']) }
    event.target.value = ''
  }
  const preview = () => {
    const issues = [!draft.sender && 'Add your name before previewing.', !draft.recipient && 'Add who this is for.', !draft.letter.trim() && 'Write a note before previewing.'].filter(Boolean) as string[]
    if (issues.length) { setErrors(issues); return }
    setErrors([]); onPreview()
  }
  const movePhoto = (index: number, direction: -1 | 1) => {
    const destination = index + direction
    if (destination < 0 || destination >= draft.photos.length) return
    const photos = [...draft.photos]; [photos[index], photos[destination]] = [photos[destination], photos[index]]
    onChange({ ...draft, photos })
  }
  return <main className="composer-shell" aria-labelledby="composer-title">
    <header className="brand"><span className="brand-mark">L</span><span>Lumen Letter</span><span className="brand-note">a private local keepsake</span></header>
    <section className="composer-intro"><p className="eyebrow">A quiet occasion, made tangible</p><h1 id="composer-title">Make a letter<br /><em>they can enter.</em></h1><p>Compose an unshared moment. Your words, photographs, and optional soundtrack remain in this browser.</p></section>
    <section className="composer-card" aria-label="Gift details">
      <div className="form-grid"><label>From<input value={draft.sender} onChange={(e) => update('sender', e.target.value)} placeholder="Your name" maxLength={80} /></label><label>For<input value={draft.recipient} onChange={(e) => update('recipient', e.target.value)} placeholder="Their name" maxLength={80} /></label></div>
      <label className="letter-field">Your letter<textarea value={draft.letter} onChange={(e) => update('letter', e.target.value)} placeholder="Put the little things here — the ones you want them to keep." rows={9} maxLength={9000} /><span>{draft.letter.length.toLocaleString()} / 9,000</span></label>
      <div className="media-section"><div><p className="field-label">Photographs <span>optional · up to 48</span></p><p className="field-help">Originals are kept for this preview. A lighter private copy is made only for the 3D scene.</p></div><input ref={inputRef} className="visually-hidden" id="photos" type="file" accept="image/jpeg,image/png,image/webp,image/gif" multiple onChange={selectPhotos} /><button className="secondary-button" type="button" onClick={() => inputRef.current?.click()}>Add photographs</button></div>
      {draft.photos.length > 0 && <ol className="photo-tray" aria-label={`${draft.photos.length} selected photographs`}>{draft.photos.map((photo, index) => <li key={photo.id}><img src={photo.previewUrl} alt="" /><span>{index + 1}</span><div className="tray-actions"><button type="button" aria-label={`Move ${photo.name} earlier`} onClick={() => movePhoto(index, -1)}>↑</button><button type="button" aria-label={`Move ${photo.name} later`} onClick={() => movePhoto(index, 1)}>↓</button><button type="button" aria-label={`Remove ${photo.name}`} onClick={() => onChange({ ...draft, photos: draft.photos.filter((_, current) => current !== index) })}>×</button></div></li>)}</ol>}
      <div className="music-row"><div><p className="field-label">A local soundtrack <span>optional</span></p><p className="field-help">It will always wait for an intentional play.</p></div><label className="file-label">{draft.audio?.name ?? 'Choose audio'}<input className="visually-hidden" type="file" accept="audio/*" onChange={(e) => onChange({ ...draft, audio: e.target.files?.[0] ?? null })} /></label>{draft.audio && <button type="button" className="text-button" onClick={() => onChange({ ...draft, audio: null })}>Remove</button>}</div>
      {errors.length > 0 && <div className="form-errors" role="alert">{errors.map((error) => <p key={error}>{error}</p>)}</div>}
      <div className="composer-footer"><p>{draft.photos.length} / 48 photographs selected</p><button className="primary-button" type="button" onClick={preview}>Preview gift <span>→</span></button></div>
    </section>
  </main>
}
