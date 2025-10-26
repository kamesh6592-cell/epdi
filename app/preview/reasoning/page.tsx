'use client'

import * as React from 'react'

import {
  Reasoning,
  ReasoningContent,
  ReasoningTrigger,
} from '@/components/ai-elements/reasoning'

export default function ReasoningPreview() {
  return (
    <div className="container mx-auto max-w-4xl py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Reasoning Component</h1>
        <p className="text-muted-foreground">
          Production-ready reasoning component for AI SDK integration.
          Use this with your chat API that returns reasoning parts.
        </p>
      </div>

      <div className="space-y-6">
        <div className="rounded-lg border bg-card p-6">
          <h3 className="font-semibold mb-4">Example Usage</h3>
          
          {/* Example with no streaming - collapsed */}
          <div className="mb-6">
            <Reasoning className="w-full" isStreaming={false}>
              <ReasoningTrigger>
                Thought for 4 seconds
              </ReasoningTrigger>
              <ReasoningContent>
                Let me think about this problem step by step.
                
                First, I need to understand what the user is asking for.
                
                They want a reasoning component that opens automatically when streaming begins 
                and closes when streaming finishes. The component should be composable and 
                follow existing patterns in the codebase.
                
                This seems like a collapsible component with state management would be the 
                right approach.
              </ReasoningContent>
            </Reasoning>
          </div>
        </div>

        <div className="rounded-lg border bg-card p-6 space-y-4">
          <h3 className="font-semibold">Integration Guide</h3>
          
          <div className="text-sm space-y-3">
            <div>
              <p className="font-medium mb-1">1. In your chat component:</p>
              <pre className="bg-muted p-3 rounded text-xs overflow-x-auto">
{`{messages.map((message) => (
  <Message from={message.role} key={message.id}>
    <MessageContent>
      {message.parts.map((part, i) => {
        if (part.type === 'reasoning') {
          return (
            <Reasoning
              key={\`\${message.id}-\${i}\`}
              isStreaming={
                status === 'streaming' && 
                i === message.parts.length - 1 && 
                message.id === messages.at(-1)?.id
              }
            >
              <ReasoningTrigger />
              <ReasoningContent>{part.text}</ReasoningContent>
            </Reasoning>
          );
        }
        return <Response key={\`\${message.id}-\${i}\`}>{part.text}</Response>;
      })}
    </MessageContent>
  </Message>
))}`}
              </pre>
            </div>

            <div>
              <p className="font-medium mb-1">2. In your API route (app/api/chat/route.ts):</p>
              <pre className="bg-muted p-3 rounded text-xs overflow-x-auto">
{`import { streamText } from 'ai';

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = streamText({
    model: 'deepseek/deepseek-r1',
    messages,
  });

  return result.toUIMessageStreamResponse({
    sendReasoning: true, // Enable reasoning parts
  });
}`}
              </pre>
            </div>
          </div>
        </div>

        <div className="text-sm text-muted-foreground space-y-2">
          <p><strong>Features:</strong></p>
          <ul className="list-disc list-inside space-y-1 ml-4">
            <li>Auto-opens when isStreaming=true</li>
            <li>Auto-closes when streaming finishes</li>
            <li>Pulsing blue indicator during streaming</li>
            <li>Manual toggle when not streaming</li>
            <li>Smooth collapsible animations</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
