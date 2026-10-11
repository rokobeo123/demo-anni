const MAX_PHOTOS = 48
const MAX_FILE_BYTES = 20 * 1024 * 1024
const supportedTypes = new Set(['image/jpeg', 'image/png', 'image/webp', 'image/gif'])

export function normalizeText(value: string, maxLength: number): string {
  return Array.from(value).filter((character) => character >= ' ' && character !== '\u007f').join('').replace(/\s+/g, ' ').trim().slice(0, maxLength)
}

export function validateFiles(files: File[]): string[] {
  const errors: string[] = []
  if (files.length > MAX_PHOTOS) errors.push('You can add up to 48 photos.')
  for (const file of files.slice(0, MAX_PHOTOS)) {
    if (!supportedTypes.has(file.type)) errors.push(`${file.name} is not a supported image.`)
    else if (file.size === 0) errors.push(`${file.name} is empty.`)
    else if (file.size > MAX_FILE_BYTES) errors.push(`${file.name} is larger than 20 MB.`)
  }
  return errors
}

export const photoLimits = { maxCount: MAX_PHOTOS, maxBytes: MAX_FILE_BYTES, supportedTypes }
