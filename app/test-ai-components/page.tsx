'use client'

import * as React from 'react'

import { Search } from 'lucide-react'

import { Button } from '@/components/ui/button'

import { 
  ChainOfThought, 
  ChainOfThoughtContent,
  ChainOfThoughtHeader,
  ChainOfThoughtSearchResult,
  ChainOfThoughtSearchResults,
  ChainOfThoughtStep,
} from '@/components/ai-elements/chain-of-thought'
import { 
  CodeBlock, 
  CodeBlockCopyButton 
} from '@/components/ai-elements/code-block'
import { 
  Reasoning, 
  ReasoningContent, 
  ReasoningTrigger 
} from '@/components/ai-elements/reasoning'

function TestChainOfThought() {
  return (
    <div className="space-y-4">
      <ChainOfThought defaultOpen>
        <ChainOfThoughtHeader />
        <ChainOfThoughtContent>
          <ChainOfThoughtStep
            icon={Search}
            label="Searching for information"
            status="complete"
          >
            <ChainOfThoughtSearchResults>
              <ChainOfThoughtSearchResult>
                Next.js Documentation
              </ChainOfThoughtSearchResult>
              <ChainOfThoughtSearchResult>
                React Best Practices
              </ChainOfThoughtSearchResult>
              <ChainOfThoughtSearchResult>
                TypeScript Guide
              </ChainOfThoughtSearchResult>
            </ChainOfThoughtSearchResults>
          </ChainOfThoughtStep>
          
          <ChainOfThoughtStep
            label="Understanding the requirements"
            description="Analyzing the user&apos;s needs and requirements"
            status="complete"
          >
            We need to implement AI reasoning components that match the AI SDK specifications.
            The components should be collapsible and support streaming content.
          </ChainOfThoughtStep>
          
          <ChainOfThoughtStep
            label="Implementing the solution"
            description="Building the components with proper TypeScript support"
            status="active"
          >
            Currently working on the Reasoning and ChainOfThought components...
          </ChainOfThoughtStep>
          
          <ChainOfThoughtStep
            label="Testing the implementation"
            description="Verifying all features work correctly"
            status="pending"
          />
        </ChainOfThoughtContent>
      </ChainOfThought>
    </div>
  )
}

export default function TestAIComponentsPage() {
  const [isReasoningStreaming, setIsReasoningStreaming] = React.useState(false)

  const sampleCode = `function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

console.log(fibonacci(10)); // Output: 55`

  const toggleReasoning = () => {
    setIsReasoningStreaming(!isReasoningStreaming)
  }

  return (
    <div className="container mx-auto py-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-4">AI SDK Components Test</h1>
        <p className="text-muted-foreground">
          Testing the AI SDK-compatible Reasoning, ChainOfThought, and CodeBlock components.
        </p>
      </div>

      {/* Reasoning Component Test */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold">Reasoning Component</h2>
          <Button onClick={toggleReasoning}>
            {isReasoningStreaming ? 'Stop Streaming' : 'Start Streaming'}
          </Button>
        </div>
        
        <Reasoning isStreaming={isReasoningStreaming}>
          <ReasoningTrigger>
            AI Reasoning Process
          </ReasoningTrigger>
          <ReasoningContent>
            <p>
              Let me think about this step by step:
            </p>
            <ol className="list-decimal list-inside space-y-1">
              <li>First, I need to understand the user&apos;s requirements</li>
              <li>Then, I should analyze the available options</li>
              <li>Next, I&apos;ll evaluate the pros and cons</li>
              <li>Finally, I&apos;ll provide a recommendation</li>
            </ol>
            {isReasoningStreaming && (
              <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-950/30 rounded-lg">
                <p className="text-sm">🤔 Currently analyzing the problem...</p>
              </div>
            )}
          </ReasoningContent>
        </Reasoning>
      </div>

      {/* Chain of Thought Component Test */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Chain of Thought Component</h2>
        <TestChainOfThought />
      </div>

      {/* Code Block Component Test */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Code Block Component</h2>
        <CodeBlock code={sampleCode} language="javascript">
          <CodeBlockCopyButton />
        </CodeBlock>
      </div>
    </div>
  )
}