"use client";

import Link from 'next/link'
import React, { Suspense, useState } from 'react'
import { Plus, Trash2 } from 'lucide-react'
import { toast } from 'sonner'

import { cn } from '@/lib/utils'

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarTrigger,
  useSidebar
} from '@/components/ui/sidebar'
import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'

import { ChatHistorySection } from './sidebar/chat-history-section'
import { ChatHistorySkeleton } from './sidebar/chat-history-skeleton'
import { IconLogo } from './ui/icons'

interface AppSidebarProps {
  user?: any; // Replace with proper user type if available
}

export default function AppSidebar({ user }: AppSidebarProps) {
  const { setOpenMobile } = useSidebar();
  const [showDeleteAllDialog, setShowDeleteAllDialog] = useState(false);

  const handleDeleteAll = () => {
    // TODO: Implement delete all functionality based on EPDI's history system
    const deletePromise = new Promise((resolve) => {
      setTimeout(() => {
        console.log("Delete all chats - implement based on EPDI's system");
        resolve("success");
      }, 1000);
    });

    toast.promise(deletePromise, {
      loading: "Deleting all chats...",
      success: () => {
        setShowDeleteAllDialog(false);
        return "All chats deleted successfully";
      },
      error: "Failed to delete all chats",
    });
  };

  return (
    <>
      <Sidebar side="left" variant="sidebar" collapsible="offcanvas" className="group-data-[side=left]:border-r-0">
        <SidebarHeader>
          <SidebarMenu>
            <div className="flex flex-row items-center justify-between">
              <Link
                href="/"
                className="flex items-center gap-2 px-2 py-3"
                onClick={() => {
                  setOpenMobile(false);
                }}
              >
                <div className="relative flex size-8 shrink-0 items-center justify-center overflow-hidden rounded-lg">
                  <IconLogo className={cn('size-5')} />
                </div>
                <span className="cursor-pointer rounded-md px-2 font-semibold text-lg hover:bg-muted">
                  EPDI Research
                </span>
              </Link>
              <div className="flex flex-row gap-1">
                {user && (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        className="h-10 w-10 p-0 md:h-8 md:w-8 md:p-1 touch-manipulation" // Better touch targets on mobile
                        onClick={() => setShowDeleteAllDialog(true)}
                        type="button"
                        variant="ghost"
                        size="icon"
                      >
                        <Trash2 className="h-5 w-5 md:h-4 md:w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent align="end" className="hidden md:block">
                      Delete All Chats
                    </TooltipContent>
                  </Tooltip>
                )}
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      className="h-10 w-10 p-0 md:h-8 md:w-8 md:p-1 touch-manipulation" // Better touch targets on mobile
                      onClick={() => {
                        setOpenMobile(false);
                        window.location.href = "/";
                      }}
                      type="button"
                      variant="ghost"
                      size="icon"
                    >
                      <Plus className="h-5 w-5 md:h-4 md:w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent align="end" className="hidden md:block">
                    New Chat
                  </TooltipContent>
                </Tooltip>
              </div>
            </div>
          </SidebarMenu>
        </SidebarHeader>
        
        <SidebarContent className="flex flex-col px-2 py-4 h-full">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link 
                  href="/" 
                  className="flex items-center gap-2 min-h-[44px] touch-manipulation" // Better touch targets
                  onClick={() => setOpenMobile(false)}
                >
                  <Plus className="size-5 md:size-4" />
                  <span className="text-base md:text-sm">New Research</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
          
          <div className="flex-1 overflow-y-auto mt-4 overscroll-contain"> {/* Better mobile scrolling */}
            <Suspense fallback={<ChatHistorySkeleton />}>
              <ChatHistorySection />
            </Suspense>
          </div>
        </SidebarContent>
        
        <SidebarFooter>
          {user && (
            <div className="p-2 text-xs text-muted-foreground">
              Welcome, {user.name || user.email || 'User'}
            </div>
          )}
        </SidebarFooter>
        
        <SidebarRail />
      </Sidebar>

      <AlertDialog onOpenChange={setShowDeleteAllDialog} open={showDeleteAllDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete all chats?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete all your
              research sessions and remove them from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteAll}>
              Delete All
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
