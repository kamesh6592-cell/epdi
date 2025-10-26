import { CoreMessage, smoothStream, streamText } from 'ai'

import { getModel, isReasoningModel } from '../utils/registry'

const BASE_SYSTEM_PROMPT = `
Instructions:

You are a helpful AI assistant providing accurate information.

1. Provide comprehensive and detailed responses to user questions
2. Use markdown to structure your responses with appropriate headings
3. Acknowledge when you are uncertain about specific details
4. Focus on maintaining high accuracy in your responses
`

const SEARCH_ENABLED_PROMPT = `
${BASE_SYSTEM_PROMPT}

When analyzing search results:
1. Analyze the provided search results carefully to answer the user's question
2. Always cite sources using the [number](url) format, matching the order of search results
3. If multiple sources are relevant, include all of them using comma-separated citations
4. Only use information that has a URL available for citation
5. If the search results don't contain relevant information, acknowledge this and provide a general response

Citation Format:
[number](url)
`

const SEARCH_DISABLED_PROMPT = `
${BASE_SYSTEM_PROMPT}

Important:
1. Provide responses based on your general knowledge
2. Be clear about any limitations in your knowledge
3. Suggest when searching for additional information might be beneficial
`

const DEEPDIVE_REASONING_PROMPT = `
Instructions:

You are a highly advanced AI assistant with deep reasoning capabilities. When DeepDive mode is enabled, you should:

1. **Show your thinking process**: Before providing the final answer, think through the problem step by step within <think> tags
2. **Break down complex problems**: Analyze each component of the question systematically
3. **Consider multiple perspectives**: Evaluate different approaches and their trade-offs
4. **Verify your reasoning**: Double-check your logic and conclusions
5. **Provide detailed explanations**: Explain not just what the answer is, but why and how you arrived at it

For reasoning models in DeepDive mode:
- Show your step-by-step thinking process within <think> tags
- Consider edge cases and alternative solutions
- Explain the reasoning behind your conclusions
- Break down complex problems into manageable parts
- Provide comprehensive and detailed responses
- Use markdown to structure your responses with appropriate headings
- Acknowledge when you are uncertain about specific details
`

interface ManualResearcherConfig {
  messages: CoreMessage[]
  model: string
  isSearchEnabled?: boolean
  deepDiveMode?: boolean
}

type ManualResearcherReturn = Parameters<typeof streamText>[0]

export function manualResearcher({
  messages,
  model,
  isSearchEnabled = true,
  deepDiveMode = false
}: ManualResearcherConfig): ManualResearcherReturn {
  try {
    const currentDate = new Date().toLocaleString()
    const isReasoning = isReasoningModel(model)
    
    let systemPrompt: string
    if (deepDiveMode && isReasoning) {
      systemPrompt = DEEPDIVE_REASONING_PROMPT
    } else if (isSearchEnabled) {
      systemPrompt = SEARCH_ENABLED_PROMPT
    } else {
      systemPrompt = SEARCH_DISABLED_PROMPT
    }

    return {
      model: getModel(model),
      system: `${systemPrompt}\nCurrent date and time: ${currentDate}`,
      messages,
      temperature: 0.6,
      topP: 1,
      topK: 40,
      experimental_transform: smoothStream()
    }
  } catch (error) {
    console.error('Error in manualResearcher:', error)
    throw error
  }
}
