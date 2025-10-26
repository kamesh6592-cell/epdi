'use client'

import * as React from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import {
  oneDark,
  oneLight,
} from 'react-syntax-highlighter/dist/esm/styles/prism'
import { useTheme } from 'next-themes'

import { Check, Copy } from 'lucide-react'

import { cn } from '@/lib/utils'

import { Button } from '@/components/ui/button'

interface CodeBlockContextType {
  code: string
}

const CodeBlockContext = React.createContext<CodeBlockContextType | undefined>(
  undefined
)

const useCodeBlock = () => {
  const context = React.useContext(CodeBlockContext)
  if (!context) {
    throw new Error('useCodeBlock must be used within a CodeBlock component')
  }
  return context
}

interface CodeBlockProps extends React.HTMLAttributes<HTMLDivElement> {
  code: string
  language: string
  showLineNumbers?: boolean
  children?: React.ReactNode
}

const CodeBlock = React.forwardRef<HTMLDivElement, CodeBlockProps>(
  (
    { code, language, showLineNumbers = false, children, className, ...props },
    ref
  ) => {
    const { theme, systemTheme } = useTheme()
    const [mounted, setMounted] = React.useState(false)

    React.useEffect(() => {
      setMounted(true)
    }, [])

    if (!mounted) {
      return null
    }

    const currentTheme = theme === 'system' ? systemTheme : theme
    const isDark = currentTheme === 'dark'

    return (
      <CodeBlockContext.Provider value={{ code }}>
        <div
          ref={ref}
          className={cn(
            'relative rounded-lg border bg-muted/50 overflow-hidden',
            className
          )}
          {...props}
        >
          {children && (
            <div className="absolute top-2 right-2 z-10">{children}</div>
          )}
          <div className="overflow-auto">
            <SyntaxHighlighter
              language={language}
              style={isDark ? oneDark : oneLight}
              showLineNumbers={showLineNumbers}
              customStyle={{
                margin: 0,
                background: 'transparent',
                fontSize: '14px',
                lineHeight: '1.5',
              }}
              lineNumberStyle={{
                minWidth: '3em',
                paddingRight: '1em',
                color: isDark ? '#6b7280' : '#9ca3af',
                borderRight: `1px solid ${isDark ? '#374151' : '#e5e7eb'}`,
                marginRight: '1em',
                textAlign: 'right',
              }}
              wrapLines={true}
              wrapLongLines={true}
            >
              {code}
            </SyntaxHighlighter>
          </div>
        </div>
      </CodeBlockContext.Provider>
    )
  }
)
CodeBlock.displayName = 'CodeBlock'

interface CodeBlockCopyButtonProps {
  onCopy?: () => void
  onError?: (error: Error) => void
  timeout?: number
  children?: React.ReactNode
  className?: string
}

const CodeBlockCopyButton = React.forwardRef<
  React.ElementRef<typeof Button>,
  CodeBlockCopyButtonProps & Omit<React.ComponentProps<typeof Button>, keyof CodeBlockCopyButtonProps>
>(
  (
    { onCopy, onError, timeout = 2000, children, className, ...buttonProps },
    ref
  ) => {
    const { code } = useCodeBlock()
    const [copied, setCopied] = React.useState(false)

    const handleCopy = async () => {
      try {
        await navigator.clipboard.writeText(code)
        setCopied(true)
        onCopy?.()
        
        setTimeout(() => {
          setCopied(false)
        }, timeout)
      } catch (error) {
        onError?.(error as Error)
      }
    }

    return (
      <Button
        ref={ref}
        variant="outline"
        size="sm"
        onClick={handleCopy}
        className={cn(
          'h-8 w-8 p-0 bg-background/80 backdrop-blur-sm border-border/50',
          'hover:bg-background/90 transition-all duration-200',
          copied && 'text-green-600 border-green-300',
          className
        )}
        {...buttonProps}
      >
        {children ? (
          children
        ) : copied ? (
          <Check className="h-4 w-4" />
        ) : (
          <Copy className="h-4 w-4" />
        )}
        <span className="sr-only">
          {copied ? 'Copied to clipboard' : 'Copy code to clipboard'}
        </span>
      </Button>
    )
  }
)
CodeBlockCopyButton.displayName = 'CodeBlockCopyButton'

export { CodeBlock, CodeBlockCopyButton }