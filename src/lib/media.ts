import { photoLimits } from './validation'

export type LocalPhoto = { id: string; file: File; previewUrl: string; displayUrl: string; name: string }

export async function preparePhoto(file: File): Promise<LocalPhoto> {
  const previewUrl = URL.createObjectURL(file)
  const image = new Image()
  image.src = previewUrl
  try {
    await image.decode()
    const scale = Math.min(1, 1600 / Math.max(image.naturalWidth, image.naturalHeight))
    const canvas = document.createElement('canvas')
    canvas.width = Math.max(1, Math.round(image.naturalWidth * scale))
    canvas.height = Math.max(1, Math.round(image.naturalHeight * scale))
    canvas.getContext('2d')?.drawImage(image, 0, 0, canvas.width, canvas.height)
    const displayBlob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, 'image/jpeg', 0.88))
    if (!displayBlob) throw new Error('The image could not be prepared.')
    return { id: crypto.randomUUID(), file, previewUrl, displayUrl: URL.createObjectURL(displayBlob), name: file.name }
  } catch (error) {
    URL.revokeObjectURL(previewUrl)
    throw error instanceof Error ? error : new Error('The image could not be decoded.')
  }
}

export async function preparePhotos(files: File[]): Promise<LocalPhoto[]> {
  if (files.length > photoLimits.maxCount) throw new Error('You can add up to 48 photos.')
  return Promise.all(files.map(preparePhoto))
}

export function releasePhotos(photos: LocalPhoto[]): void {
  photos.forEach((photo) => { URL.revokeObjectURL(photo.previewUrl); URL.revokeObjectURL(photo.displayUrl) })
}
