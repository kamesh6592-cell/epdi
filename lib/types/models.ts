export interface Model {
  id: string
  name: string
  provider: string
  providerId: string
  enabled: boolean
  toolCallType: 'native' | 'manual'
  toolCallModel?: string
  avatar?: string // Custom avatar path, defaults to providerId logo if not set
  // Ollama-specific fields (only added when needed)
  capabilities?: string[]
  contextWindow?: number
}
