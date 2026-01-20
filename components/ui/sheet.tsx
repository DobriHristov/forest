'use client'

import * as React from 'react'
import * as SheetPrimitive from '@radix-ui/react-dialog'
import { XIcon } from 'lucide-react'

import { cn } from '@/lib/utils'

function Sheet({ ...props }: React.ComponentProps<typeof SheetPrimitive.Root>) {
  return <SheetPrimitive.Root data-slot="sheet" {...props} />
}

function SheetTrigger({
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Trigger>) {
  return <SheetPrimitive.Trigger data-slot="sheet-trigger" {...props} />
}

function SheetClose({
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Close>) {
  return <SheetPrimitive.Close data-slot="sheet-close" {...props} />
}

function SheetPortal({
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Portal>) {
  return <SheetPrimitive.Portal data-slot="sheet-portal" {...props} />
}

function SheetOverlay({
  className,
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Overlay>) {
  return (
    <SheetPrimitive.Overlay
      data-slot="sheet-overlay"
      className={cn(
        'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-transparent',
        className,
      )}
      {...props}
    />
  )
}

function SheetContent({
  className,
  children,
  side = 'right',
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Content> & {
  side?: 'top' | 'right' | 'bottom' | 'left'
}) {
  const [width, setWidth] = React.useState(800)
  const [height, setHeight] = React.useState(400)
  const [isResizing, setIsResizing] = React.useState(false)
  const startPos = React.useRef({ x: 0, y: 0 })
  const startSize = React.useRef({ width: 0, height: 0 })

  const handleMouseDown = (e: React.MouseEvent, direction: 'horizontal' | 'vertical') => {
    e.preventDefault()
    setIsResizing(true)
    startPos.current = { x: e.clientX, y: e.clientY }
    startSize.current = { width, height }

    const handleMouseMove = (e: MouseEvent) => {
      if (direction === 'horizontal') {
        if (side === 'right') {
          const newWidth = startSize.current.width + (startPos.current.x - e.clientX)
          setWidth(Math.max(400, Math.min(window.innerWidth - 100, newWidth)))
        } else if (side === 'left') {
          const newWidth = startSize.current.width + (e.clientX - startPos.current.x)
          setWidth(Math.max(400, Math.min(window.innerWidth - 100, newWidth)))
        }
      } else {
        if (side === 'bottom') {
          const newHeight = startSize.current.height + (startPos.current.y - e.clientY)
          setHeight(Math.max(300, Math.min(window.innerHeight - 100, newHeight)))
        } else if (side === 'top') {
          const newHeight = startSize.current.height + (e.clientY - startPos.current.y)
          setHeight(Math.max(300, Math.min(window.innerHeight - 100, newHeight)))
        }
      }
    }

    const handleMouseUp = () => {
      setIsResizing(false)
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
  }

  const resizeHandleClass = "absolute z-10 hover:bg-blue-500/20 transition-colors"

  return (
    <SheetPortal>
      <SheetOverlay />
      <SheetPrimitive.Content
        data-slot="sheet-content"
        style={{
          width: (side === 'left' || side === 'right') ? `${width}px` : undefined,
          height: (side === 'top' || side === 'bottom') ? `${height}px` : undefined,
        }}
        className={cn(
          'bg-background data-[state=open]:animate-in data-[state=closed]:animate-out fixed z-50 flex flex-col gap-4 shadow-lg transition-none',
          side === 'right' &&
            'data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right inset-y-0 right-0 h-full border-l',
          side === 'left' &&
            'data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left inset-y-0 left-0 h-full border-r',
          side === 'top' &&
            'data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top inset-x-0 top-0 border-b',
          side === 'bottom' &&
            'data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom inset-x-0 bottom-0 border-t',
          className,
        )}
        {...props}
      >
        {(side === 'right' || side === 'left') && (
          <div
            className={cn(
              resizeHandleClass,
              side === 'right' ? 'left-0 cursor-ew-resize' : 'right-0 cursor-ew-resize',
              'top-0 bottom-0 w-1 hover:w-2'
            )}
            onMouseDown={(e) => handleMouseDown(e, 'horizontal')}
          />
        )}
        {(side === 'top' || side === 'bottom') && (
          <div
            className={cn(
              resizeHandleClass,
              side === 'bottom' ? 'top-0 cursor-ns-resize' : 'bottom-0 cursor-ns-resize',
              'left-0 right-0 h-1 hover:h-2'
            )}
            onMouseDown={(e) => handleMouseDown(e, 'vertical')}
          />
        )}
        {children}
        <SheetPrimitive.Close className="ring-offset-background focus:ring-ring data-[state=open]:bg-secondary absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none">
          <XIcon className="size-4" />
          <span className="sr-only">Close</span>
        </SheetPrimitive.Close>
      </SheetPrimitive.Content>
    </SheetPortal>
  )
}

function SheetHeader({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="sheet-header"
      className={cn('flex flex-col gap-1.5 p-4', className)}
      {...props}
    />
  )
}

function SheetFooter({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="sheet-footer"
      className={cn('mt-auto flex flex-col gap-2 p-4', className)}
      {...props}
    />
  )
}

function SheetTitle({
  className,
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Title>) {
  return (
    <SheetPrimitive.Title
      data-slot="sheet-title"
      className={cn('text-foreground font-semibold', className)}
      {...props}
    />
  )
}

function SheetDescription({
  className,
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Description>) {
  return (
    <SheetPrimitive.Description
      data-slot="sheet-description"
      className={cn('text-muted-foreground text-sm', className)}
      {...props}
    />
  )
}

export {
  Sheet,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
}
