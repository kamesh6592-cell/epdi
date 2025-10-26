'use client'

import { useState } from 'react'

import { Brain, Check, Eye,Search } from 'lucide-react'

import { Button } from '@/components/ui/button'

import {
  ChainOfThought,
  ChainOfThoughtContent,
  ChainOfThoughtHeader,
  ChainOfThoughtImage,
  ChainOfThoughtSearchResult,
  ChainOfThoughtSearchResults,
  ChainOfThoughtStep,
  CodeBlock,
  CodeBlockCopyButton,
  Reasoning,
  ReasoningContent,
  ReasoningTrigger,
} from '@/components/ai-elements'

export default function AIElementsDemo() {
  const [isReasoningStreaming, setIsReasoningStreaming] = useState(false)
  const [chainStep, setChainStep] = useState(0)

  const simulateReasoning = () => {
    setIsReasoningStreaming(true)
    setTimeout(() => {
      setIsReasoningStreaming(false)
    }, 3000)
  }

  const simulateChainProgression = () => {
    setChainStep(0)
    const steps = [1, 2, 3]
    steps.forEach((step, index) => {
      setTimeout(() => {
        setChainStep(step)
      }, (index + 1) * 1500)
    })
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold">AI Elements Demo</h1>
        <p className="text-muted-foreground">
          Demonstration of Reasoning, Chain of Thought, and Code Block components
        </p>
        <div className="flex gap-4 justify-center">
          <Button onClick={simulateReasoning}>
            Test Reasoning Stream
          </Button>
          <Button onClick={simulateChainProgression}>
            Test Chain Progression
          </Button>
        </div>
      </div>

      {/* Reasoning Component Demo */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Reasoning Component</h2>
        <Reasoning className="w-full" isStreaming={isReasoningStreaming}>
          <ReasoningTrigger 
            title={isReasoningStreaming ? "Thinking..." : "AI Reasoning Complete"}
          />
          <ReasoningContent>
            <div className="prose prose-sm max-w-none dark:prose-invert">
              <p>
                I need to analyze this problem step by step. First, let me consider
                the user&apos;s question and identify the key components that need to be
                addressed.
              </p>
              <p>
                The question involves multiple factors that I should evaluate:
              </p>
              <ul>
                <li>Understanding the context and requirements</li>
                <li>Identifying relevant information sources</li>
                <li>Analyzing potential solutions</li>
                <li>Synthesizing a comprehensive response</li>
              </ul>
              <p>
                Based on this analysis, I can provide a well-structured answer
                that addresses all aspects of the query.
              </p>
            </div>
          </ReasoningContent>
        </Reasoning>
      </div>

      {/* Chain of Thought Demo */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Chain of Thought Component</h2>
        <ChainOfThought defaultOpen>
          <ChainOfThoughtHeader>AI Problem Solving Process</ChainOfThoughtHeader>
          <ChainOfThoughtContent>
            <ChainOfThoughtStep
              icon={Search}
              label="Information Gathering"
              description="Searching for relevant data and context"
              status={chainStep >= 1 ? "complete" : chainStep === 0 ? "active" : "pending"}
            >
              {chainStep >= 1 && (
                <ChainOfThoughtSearchResults>
                  <ChainOfThoughtSearchResult>
                    Research Paper: &quot;AI Reasoning Methods&quot;
                  </ChainOfThoughtSearchResult>
                  <ChainOfThoughtSearchResult>
                    Article: &quot;Best Practices for AI Development&quot;
                  </ChainOfThoughtSearchResult>
                  <ChainOfThoughtSearchResult>
                    Study: &quot;Human-AI Interaction Patterns&quot;
                  </ChainOfThoughtSearchResult>
                </ChainOfThoughtSearchResults>
              )}
            </ChainOfThoughtStep>

            <ChainOfThoughtStep
              icon={Brain}
              label="Analysis and Processing"
              description="Analyzing gathered information and identifying patterns"
              status={chainStep >= 2 ? "complete" : chainStep === 1 ? "active" : "pending"}
            >
              {chainStep >= 2 && (
                <div className="text-sm text-muted-foreground">
                  <p>Key insights discovered:</p>
                  <ul className="list-disc list-inside mt-2 space-y-1">
                    <li>Pattern recognition shows consistent themes</li>
                    <li>Multiple approaches can be synthesized</li>
                    <li>User context suggests specific preferences</li>
                  </ul>
                </div>
              )}
            </ChainOfThoughtStep>

            <ChainOfThoughtStep
              icon={Eye}
              label="Visual Analysis"
              description="Processing visual elements and contextual cues"
              status={chainStep >= 3 ? "complete" : chainStep === 2 ? "active" : "pending"}
            >
              {chainStep >= 3 && (
                <ChainOfThoughtImage caption="Conceptual diagram of the solution approach">
                  <div className="w-full h-32 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <Brain className="h-8 w-8 mx-auto mb-2 text-blue-600 dark:text-blue-400" />
                      <p className="text-sm font-medium">AI Processing Flow</p>
                    </div>
                  </div>
                </ChainOfThoughtImage>
              )}
            </ChainOfThoughtStep>

            <ChainOfThoughtStep
              icon={Check}
              label="Solution Synthesis"
              description="Combining insights into a comprehensive response"
              status={chainStep >= 3 ? "complete" : "pending"}
            />
          </ChainOfThoughtContent>
        </ChainOfThought>
      </div>

      {/* Code Block Demo */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Code Block Component</h2>
        
        <div className="grid gap-4">
          <div>
            <h3 className="text-lg font-medium mb-2">JavaScript Example</h3>
            <CodeBlock 
              code={`function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

// Usage example
console.log(fibonacci(10)); // Output: 55`}
              language="javascript"
              showLineNumbers={true}
            >
              <CodeBlockCopyButton
                onCopy={() => console.log('JavaScript code copied!')}
              />
            </CodeBlock>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-2">TypeScript Interface</h3>
            <CodeBlock 
              code={`interface User {
  id: number;
  name: string;
  email: string;
  isActive: boolean;
}

const createUser = (userData: Partial<User>): User => {
  return {
    id: Math.random(),
    isActive: true,
    ...userData,
  } as User;
};`}
              language="typescript"
              showLineNumbers={true}
            >
              <CodeBlockCopyButton />
            </CodeBlock>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-2">Python Algorithm</h3>
            <CodeBlock 
              code={`def quicksort(arr):
    if len(arr) <= 1:
        return arr
    
    pivot = arr[len(arr) // 2]
    left = [x for x in arr if x < pivot]
    middle = [x for x in arr if x == pivot]
    right = [x for x in arr if x > pivot]
    
    return quicksort(left) + middle + quicksort(right)

# Example usage
numbers = [3, 6, 8, 10, 1, 2, 1]
sorted_numbers = quicksort(numbers)
print(sorted_numbers)  # [1, 1, 2, 3, 6, 8, 10]`}
              language="python"
              showLineNumbers={true}
            >
              <CodeBlockCopyButton />
            </CodeBlock>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-2">CSS Styling</h3>
            <CodeBlock 
              code={`.card {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
}`}
              language="css"
            >
              <CodeBlockCopyButton />
            </CodeBlock>
          </div>
        </div>
      </div>

      {/* Combined Example */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Combined Example</h2>
        <Reasoning className="w-full">
          <ReasoningTrigger title="Detailed Analysis with Chain of Thought" />
          <ReasoningContent>
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Here&apos;s how I approached this complex problem:
              </p>
              
              <ChainOfThought defaultOpen>
                <ChainOfThoughtHeader>Problem-Solving Steps</ChainOfThoughtHeader>
                <ChainOfThoughtContent>
                  <ChainOfThoughtStep
                    icon={Search}
                    label="Research Phase"
                    status="complete"
                  >
                    <ChainOfThoughtSearchResults>
                      <ChainOfThoughtSearchResult>
                        Technical Documentation
                      </ChainOfThoughtSearchResult>
                      <ChainOfThoughtSearchResult>
                        User Requirements
                      </ChainOfThoughtSearchResult>
                    </ChainOfThoughtSearchResults>
                  </ChainOfThoughtStep>
                  
                  <ChainOfThoughtStep
                    icon={Brain}
                    label="Analysis Complete"
                    status="complete"
                  />
                </ChainOfThoughtContent>
              </ChainOfThought>
            </div>
          </ReasoningContent>
        </Reasoning>
      </div>
    </div>
  )
}