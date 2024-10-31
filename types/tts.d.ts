export interface TTSRequest {
    text: string
    references: Array<{
      audio: Blob
      text: string
    }>
    reference_id?: string
    normalize?: boolean
    format?: string
    mp3_bitrate?: number
    opus_bitrate?: number
    max_new_tokens?: number
    chunk_length?: number
    top_p?: number
    repetition_penalty?: number
    temperature?: number
    streaming?: boolean
    use_memory_cache?: 'always' | 'never' | 'on-demand'
    seed?: number
  }