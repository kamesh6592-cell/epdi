# Reasoning Component

The `Reasoning` component displays AI reasoning content, automatically opening during streaming and closing when finished.

## Features

- Automatically opens when streaming content and closes when finished
- Manual toggle control for user interaction
- Smooth animations and transitions powered by Radix UI
- Visual streaming indicator with pulsing animation
- Composable architecture with separate trigger and content components
- Built with accessibility in mind including keyboard navigation
- Responsive design that works across different screen sizes
- Seamlessly integrates with both light and dark themes
- Built on top of shadcn/ui Collapsible primitives
- TypeScript support with proper type definitions

## Installation

```sh
npx ai-elements@latest add reasoning
```

## Usage

```tsx
import {
  Reasoning,
  ReasoningContent,
  ReasoningTrigger,
} from '@/components/ai-elements/reasoning';
```

```tsx
<Reasoning className="w-full" isStreaming={false}>
  <ReasoningTrigger />
  <ReasoningContent>I need to compute the square of 2.</ReasoningContent>
</Reasoning>
```

## Usage with AI SDK

Build a chatbot with reasoning using Deepseek R1.

Add the following component to your frontend:

```tsx filename="app/page.tsx"
'use client';

import {
  Reasoning,
  ReasoningContent,
  ReasoningTrigger,
} from '@/components/ai-elements/reasoning';
import { useState } from 'react';
import { useChat } from '@ai-sdk/react';

const ReasoningDemo = () => {
  const [input, setInput] = useState('');

  const { messages, sendMessage, status } = useChat();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage({ text: input });
    setInput('');
  };

  return (
    <div className="max-w-4xl mx-auto p-6 relative size-full rounded-lg border h-[600px]">
      <div className="flex flex-col h-full">
        <div className="flex-1 overflow-auto">
          {messages.map((message) => (
            <div key={message.id} className="mb-4">
              {message.parts.map((part, i) => {
                switch (part.type) {
                  case 'text':
                    return (
                      <div key={`${message.id}-${i}`} className="prose">
                        {part.text}
                      </div>
                    );
                  case 'reasoning':
                    return (
                      <Reasoning
                        key={`${message.id}-${i}`}
                        className="w-full"
                        isStreaming={status === 'streaming' && i === message.parts.length - 1 && message.id === messages.at(-1)?.id}
                      >
                        <ReasoningTrigger />
                        <ReasoningContent>{part.text}</ReasoningContent>
                      </Reasoning>
                    );
                }
              })}
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="mt-4">
          <input
            value={input}
            placeholder="Say something..."
            onChange={(e) => setInput(e.target.value)}
            className="w-full p-2 border rounded"
          />
          <button
            type="submit"
            disabled={!input.trim()}
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default ReasoningDemo;
```

Add the following route to your backend:

```ts filename="app/api/chat/route.ts"
import { streamText, UIMessage, convertToModelMessages } from 'ai';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const { model, messages }: { messages: UIMessage[]; model: string } =
    await req.json();

  const result = streamText({
    model: 'deepseek/deepseek-r1',
    messages: convertToModelMessages(messages),
  });

  return result.toUIMessageStreamResponse({
    sendReasoning: true,
  });
}
```

## Props

### `<Reasoning />`

| Prop | Type | Description | Optional |
|------|------|-------------|----------|
| `isStreaming` | `boolean` | Whether the reasoning is currently streaming (auto-opens and closes the panel). | ✓ |
| `[...props]` | `React.ComponentProps<typeof Collapsible>` | Any other props are spread to the underlying Collapsible component. | ✓ |

### `<ReasoningTrigger />`

| Prop | Type | Description | Optional |
|------|------|-------------|----------|
| `title` | `string` | Optional title to display in the trigger (default: "Reasoning"). | ✓ |
| `[...props]` | `React.ComponentProps<typeof CollapsibleTrigger>` | Any other props are spread to the underlying CollapsibleTrigger component. | ✓ |

### `<ReasoningContent />`

| Prop | Type | Description | Optional |
|------|------|-------------|----------|
| `[...props]` | `React.ComponentProps<typeof CollapsibleContent>` | Any other props are spread to the underlying CollapsibleContent component. | ✓ |

## DeepDive Feature

The DeepDive toggle has been added to the input bar next to the Search toggle. When enabled, it activates reasoning mode for deeper analysis of queries.

### Usage

The DeepDive toggle appears in the chat input panel and can be toggled on/off to enable reasoning mode. When active:

- Shows a pulsing lightbulb icon
- Enables deeper AI reasoning for complex queries  
- Persists state using cookies across sessions
- Integrates seamlessly with the existing search functionality

The toggle state is stored in cookies as `deepdive-mode` and can be accessed programmatically if needed for backend processing.