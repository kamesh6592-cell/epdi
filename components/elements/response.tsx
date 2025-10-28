"use client";

import React, { type ComponentProps, memo } from "react";
import { MemoizedReactMarkdown } from "@/components/ui/markdown";
import { cn } from "@/lib/utils";

type ResponseProps = ComponentProps<"div"> & {
  children: string;
};

export const Response = memo(
  ({ className, children, ...props }: ResponseProps) => (
    <div
      className={cn(
        "w-full max-w-full overflow-hidden break-words [&>*:first-child]:mt-0 [&>*:last-child]:mb-0",
        "[&_code]:whitespace-pre-wrap [&_code]:break-words [&_code]:max-w-full",
        "[&_pre]:max-w-full [&_pre]:overflow-x-auto [&_pre]:break-words",
        "[&_table]:max-w-full [&_table]:overflow-x-auto",
        "[&_img]:max-w-full [&_img]:h-auto",
        "prose prose-sm max-w-none dark:prose-invert",
        className
      )}
      {...props}
    >
      <MemoizedReactMarkdown className="w-full max-w-full overflow-hidden break-words">
        {children}
      </MemoizedReactMarkdown>
    </div>
  ),
  (prevProps: ResponseProps, nextProps: ResponseProps) => prevProps.children === nextProps.children
);

Response.displayName = "Response";