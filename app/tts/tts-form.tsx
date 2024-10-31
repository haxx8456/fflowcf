'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { toast } from 'sonner'

export function TTSForm() {
  const [loading, setLoading] = useState(false)
  const [audioUrl, setAudioUrl] = useState<string>()

  const onSubmit = async (formData: FormData) => {
    setLoading(true)
    try {
      const response = await fetch('/api/tts', {
        method: 'POST',
        body: formData
      })

      if (!response.ok) {
        throw new Error('Failed to generate audio')
      }

      const blob = await response.blob()
      setAudioUrl(URL.createObjectURL(blob))
    } catch (error) {
      toast.error('Failed to generate audio')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form action={onSubmit}>
      <div className="space-y-4">
        <Textarea 
          name="text"
          placeholder="Enter text to convert to speech..."
          required
        />
        <Input
          type="file"
          name="reference_audio"
          accept="audio/*"
        />
        <Button type="submit" disabled={loading}>
          {loading ? 'Generating...' : 'Generate Speech'}
        </Button>
      </div>
      {audioUrl && (
        <audio controls src={audioUrl} className="w-full mt-4" />
      )}
    </form>
  )
}