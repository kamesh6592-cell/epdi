# Code Block Component

The `CodeBlock` component provides syntax highlighting, line numbers, and copy to clipboard functionality for code blocks.

## Features

- Syntax highlighting with react-syntax-highlighter
- Line numbers (optional)
- Copy to clipboard functionality
- Automatic light/dark theme switching
- Customizable styles
- Accessible design
- Built with React Context API for component communication
- Responsive design that adapts to different screen sizes
- Support for all major programming languages

## Installation

```sh
npx ai-elements@latest add code-block
```

## Usage

```tsx
import { CodeBlock, CodeBlockCopyButton } from '@/components/ai-elements/code-block';
```

### Basic Usage

```tsx
<CodeBlock code={"console.log('hello world')"} language="javascript">
  <CodeBlockCopyButton
    onCopy={() => console.log('Copied code to clipboard')}
    onError={() => console.error('Failed to copy code to clipboard')}
  />
</CodeBlock>
```

### With Line Numbers

```tsx
<CodeBlock 
  code={`function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}`} 
  language="javascript"
  showLineNumbers={true}
>
  <CodeBlockCopyButton />
</CodeBlock>
```

### Multiple Languages

```tsx
// TypeScript example
<CodeBlock 
  code={`interface User {
  id: number;
  name: string;
  email: string;
}

const user: User = {
  id: 1,
  name: "John Doe",
  email: "john@example.com"
};`} 
  language="typescript"
  showLineNumbers={true}
>
  <CodeBlockCopyButton />
</CodeBlock>

// Python example
<CodeBlock 
  code={`def quicksort(arr):
    if len(arr) <= 1:
        return arr
    pivot = arr[len(arr) // 2]
    left = [x for x in arr if x < pivot]
    middle = [x for x in arr if x == pivot]
    right = [x for x in arr if x > pivot]
    return quicksort(left) + middle + quicksort(right)`} 
  language="python"
  showLineNumbers={true}
>
  <CodeBlockCopyButton />
</CodeBlock>
```

## Usage with AI SDK

Build a simple code generation tool using the [`experimental_useObject`](https://ai-sdk.dev/docs/reference/ai-sdk-ui/use-object) hook.

Add the following component to your frontend:

```tsx filename="app/page.tsx"
'use client';

import { experimental_useObject as useObject } from '@ai-sdk/react';
import { codeBlockSchema } from '@/app/api/codegen/route';
import {
  CodeBlock,
  CodeBlockCopyButton,
} from '@/components/ai-elements/code-block';
import { useState } from 'react';

export default function Page() {
  const [input, setInput] = useState('');
  const { object, submit, isLoading } = useObject({
    api: '/api/codegen',
    schema: codeBlockSchema,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      submit(input);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 relative size-full rounded-lg border h-[600px]">
      <div className="flex flex-col h-full">
        <div className="flex-1 overflow-auto mb-4">
          {object?.code && object?.language && (
            <CodeBlock
              code={object.code}
              language={object.language}
              showLineNumbers={true}
            >
              <CodeBlockCopyButton />
            </CodeBlock>
          )}
        </div>

        <form onSubmit={handleSubmit} className="mt-4">
          <input
            value={input}
            placeholder="Generate a React todolist component"
            onChange={(e) => setInput(e.target.value)}
            className="w-full p-2 border rounded"
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
          >
            {isLoading ? 'Generating...' : 'Generate Code'}
          </button>
        </form>
      </div>
    </div>
  );
}
```

Add the following route to your backend:

```tsx filename="api/codegen/route.ts"
import { streamObject } from 'ai';
import { z } from 'zod';

export const codeBlockSchema = z.object({
  language: z.string(),
  filename: z.string(),
  code: z.string(),
});

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const context = await req.json();

  const result = streamObject({
    model: 'openai/gpt-4o',
    schema: codeBlockSchema,
    prompt:
      `You are a helpful coding assistant. Only generate code, no markdown formatting or backticks, or text.` +
      context,
  });

  return result.toTextStreamResponse();
}
```

## Advanced Examples

### Custom Copy Button

```tsx
<CodeBlock code="npm install react" language="bash">
  <CodeBlockCopyButton
    onCopy={() => toast.success('Command copied!')}
    onError={(error) => toast.error('Failed to copy: ' + error.message)}
  >
    <Copy className="h-4 w-4 mr-2" />
    Copy Command
  </CodeBlockCopyButton>
</CodeBlock>
```

### Dark Mode Integration

The component automatically adapts to your theme. To force dark mode:

```tsx
<div className="dark">
  <CodeBlock code="const theme = 'dark';" language="javascript">
    <CodeBlockCopyButton />
  </CodeBlock>
</div>
```

### Integration with Existing Components

```tsx
import { Reasoning, ReasoningContent, ReasoningTrigger } from '@/components/ai-elements';

<Reasoning>
  <ReasoningTrigger title="Code Analysis" />
  <ReasoningContent>
    <p>Here's the optimized version of your function:</p>
    <CodeBlock 
      code={optimizedCode} 
      language="javascript"
      showLineNumbers={true}
    >
      <CodeBlockCopyButton />
    </CodeBlock>
  </ReasoningContent>
</Reasoning>
```

## Props

### `<CodeBlock />`

| Prop | Type | Description | Optional |
|------|------|-------------|----------|
| `code` | `string` | The code content to display. | ✗ |
| `language` | `string` | The programming language for syntax highlighting. | ✗ |
| `showLineNumbers` | `boolean` | Whether to show line numbers. Default: false. | ✓ |
| `children` | `React.ReactNode` | Child elements (like CodeBlockCopyButton) positioned in the top-right corner. | ✓ |
| `className` | `string` | Additional CSS classes to apply to the root container. | ✓ |
| `[...props]` | `React.HTMLAttributes<HTMLDivElement>` | Any other props are spread to the root div. | ✓ |

### `<CodeBlockCopyButton />`

| Prop | Type | Description | Optional |
|------|------|-------------|----------|
| `onCopy` | `() => void` | Callback fired after a successful copy. | ✓ |
| `onError` | `(error: Error) => void` | Callback fired if copying fails. | ✓ |
| `timeout` | `number` | How long to show the copied state (ms). Default: 2000. | ✓ |
| `children` | `React.ReactNode` | Custom content for the button. Defaults to copy/check icons. | ✓ |
| `className` | `string` | Additional CSS classes to apply to the button. | ✓ |
| `[...props]` | `React.ComponentProps<typeof Button>` | Any other props are spread to the underlying shadcn/ui Button component. | ✓ |

## Supported Languages

The component supports all languages supported by react-syntax-highlighter, including:

- JavaScript/TypeScript
- Python
- Java
- C/C++
- C#
- Go
- Rust
- PHP
- Ruby
- Swift
- Kotlin
- SQL
- HTML/CSS
- JSON
- YAML
- Markdown
- Bash/Shell
- And many more...

## Accessibility

The component includes:
- Proper ARIA labels for screen readers
- Keyboard navigation support
- High contrast mode compatibility
- Screen reader announcements for copy actions
- Semantic markup for code blocks

## Customization

The component uses CSS custom properties and can be styled with Tailwind classes. The syntax highlighting themes automatically adapt to your application's light/dark mode settings.

### Custom Styling

```tsx
<CodeBlock 
  code="const custom = true;" 
  language="javascript"
  className="my-custom-styles border-2 border-blue-500"
>
  <CodeBlockCopyButton className="bg-blue-500 hover:bg-blue-600" />
</CodeBlock>
```