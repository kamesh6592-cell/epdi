# Chain of Thought Component

The `ChainOfThought` component provides a visual representation of an AI's reasoning process, showing step-by-step thinking with support for search results, images, and progress indicators. It helps users understand how AI arrives at conclusions.

## Features

- Collapsible interface with smooth animations powered by Radix UI
- Step-by-step visualization of AI reasoning process
- Support for different step statuses (complete, active, pending)
- Built-in search results display with badge styling
- Image support with captions for visual content
- Custom icons for different step types
- Context-aware components using React Context API
- Fully typed with TypeScript
- Accessible with keyboard navigation support
- Responsive design that adapts to different screen sizes
- Smooth fade and slide animations for content transitions
- Composable architecture for flexible customization

## Installation

```sh
npx ai-elements@latest add chain-of-thought
```

## Usage

```tsx
import {
  ChainOfThought,
  ChainOfThoughtContent,
  ChainOfThoughtHeader,
  ChainOfThoughtImage,
  ChainOfThoughtSearchResult,
  ChainOfThoughtSearchResults,
  ChainOfThoughtStep,
} from '@/components/ai-elements/chain-of-thought';
```

### Basic Usage

```tsx
<ChainOfThought defaultOpen>
  <ChainOfThoughtHeader />
  <ChainOfThoughtContent>
    <ChainOfThoughtStep
      icon={SearchIcon}
      label="Searching for information"
      status="complete"
    >
      <ChainOfThoughtSearchResults>
        <ChainOfThoughtSearchResult>
          Result 1
        </ChainOfThoughtSearchResult>
      </ChainOfThoughtSearchResults>
    </ChainOfThoughtStep>
  </ChainOfThoughtContent>
</ChainOfThought>
```

### Advanced Example

```tsx
import { Search, Brain, Check } from 'lucide-react';

<ChainOfThought defaultOpen>
  <ChainOfThoughtHeader>AI Reasoning Process</ChainOfThoughtHeader>
  <ChainOfThoughtContent>
    <ChainOfThoughtStep
      icon={Search}
      label="Searching for relevant information"
      description="Looking for academic papers and recent research"
      status="complete"
    >
      <ChainOfThoughtSearchResults>
        <ChainOfThoughtSearchResult>
          Paper: "Machine Learning in Healthcare"
        </ChainOfThoughtSearchResult>
        <ChainOfThoughtSearchResult>
          Study: "AI Ethics Guidelines 2024"
        </ChainOfThoughtSearchResult>
        <ChainOfThoughtSearchResult>
          Article: "Future of AI Development"
        </ChainOfThoughtSearchResult>
      </ChainOfThoughtSearchResults>
    </ChainOfThoughtStep>
    
    <ChainOfThoughtStep
      icon={Brain}
      label="Analyzing gathered information"
      description="Processing and correlating findings"
      status="active"
    />
    
    <ChainOfThoughtStep
      icon={Check}
      label="Formulating response"
      description="Synthesizing information into comprehensive answer"
      status="pending"
    />
  </ChainOfThoughtContent>
</ChainOfThought>
```

### With Images

```tsx
<ChainOfThought defaultOpen>
  <ChainOfThoughtHeader>Visual Analysis</ChainOfThoughtHeader>
  <ChainOfThoughtContent>
    <ChainOfThoughtStep
      label="Image analysis complete"
      status="complete"
    >
      <ChainOfThoughtImage caption="Detected objects in the scene">
        <img 
          src="/path/to/analyzed-image.jpg" 
          alt="Analysis result"
          className="w-full h-auto rounded"
        />
      </ChainOfThoughtImage>
    </ChainOfThoughtStep>
  </ChainOfThoughtContent>
</ChainOfThought>
```

## Props

### `<ChainOfThought />`

| Prop | Type | Description | Optional |
|------|------|-------------|----------|
| `open` | `boolean` | Controlled open state of the collapsible. | ✓ |
| `defaultOpen` | `boolean` | Default open state when uncontrolled. Defaults to false. | ✓ |
| `onOpenChange` | `(open: boolean) => void` | Callback when the open state changes. | ✓ |
| `[...props]` | `React.ComponentProps<"div">` | Any other props are spread to the root div element. | ✓ |

### `<ChainOfThoughtHeader />`

| Prop | Type | Description | Optional |
|------|------|-------------|----------|
| `children` | `React.ReactNode` | Custom header text. Defaults to "Chain of Thought". | ✓ |
| `[...props]` | `React.ComponentProps<typeof CollapsibleTrigger>` | Any other props are spread to the CollapsibleTrigger component. | ✓ |

### `<ChainOfThoughtStep />`

| Prop | Type | Description | Optional |
|------|------|-------------|----------|
| `icon` | `LucideIcon` | Icon to display for the step. Defaults to DotIcon. | ✓ |
| `label` | `string` | The main text label for the step. | ✗ |
| `description` | `string` | Optional description text shown below the label. | ✓ |
| `status` | `"complete" \| "active" \| "pending"` | Visual status of the step. Defaults to "complete". | ✓ |
| `[...props]` | `React.ComponentProps<"div">` | Any other props are spread to the root div element. | ✓ |

### `<ChainOfThoughtSearchResults />`

| Prop | Type | Description | Optional |
|------|------|-------------|----------|
| `[...props]` | `React.ComponentProps<"div">` | Any props are spread to the container div element. | ✓ |

### `<ChainOfThoughtSearchResult />`

| Prop | Type | Description | Optional |
|------|------|-------------|----------|
| `[...props]` | `React.ComponentProps<typeof Badge>` | Any props are spread to the Badge component. | ✓ |

### `<ChainOfThoughtContent />`

| Prop | Type | Description | Optional |
|------|------|-------------|----------|
| `[...props]` | `React.ComponentProps<typeof CollapsibleContent>` | Any props are spread to the CollapsibleContent component. | ✓ |

### `<ChainOfThoughtImage />`

| Prop | Type | Description | Optional |
|------|------|-------------|----------|
| `caption` | `string` | Optional caption text displayed below the image. | ✓ |
| `[...props]` | `React.ComponentProps<"div">` | Any other props are spread to the container div element. | ✓ |

## Integration with Existing Components

The ChainOfThought component can be easily integrated into existing chat flows or reasoning displays. For example, you can combine it with the Reasoning component:

```tsx
<div className="space-y-4">
  <Reasoning isStreaming={false}>
    <ReasoningTrigger />
    <ReasoningContent>
      <ChainOfThought defaultOpen>
        <ChainOfThoughtHeader>Detailed Analysis</ChainOfThoughtHeader>
        <ChainOfThoughtContent>
          <ChainOfThoughtStep
            label="Information gathering"
            status="complete"
          >
            <ChainOfThoughtSearchResults>
              <ChainOfThoughtSearchResult>
                Research paper found
              </ChainOfThoughtSearchResult>
            </ChainOfThoughtSearchResults>
          </ChainOfThoughtStep>
        </ChainOfThoughtContent>
      </ChainOfThought>
    </ReasoningContent>
  </Reasoning>
</div>
```

## Accessibility

The component includes:
- Proper ARIA labels and roles
- Keyboard navigation support
- Focus management
- Screen reader compatibility
- High contrast mode support

## Customization

The component uses CSS custom properties and can be styled with Tailwind classes. All sub-components accept className props for custom styling.