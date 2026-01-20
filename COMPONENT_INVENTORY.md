# Component Inventory

Complete list of all available UI components in the design system.

## Layout Components

### 1. Sidebar
**File**: `components/ui/sidebar.tsx`
**Description**: Collapsible navigation sidebar with header, content, footer, and rail sections
**Variants**: Default, collapsed
**Key Features**:
- Collapsible with toggle
- Header, content, footer sections
- Menu items with icons
- Active state highlighting
- Mobile responsive

### 2. Resizable Panels
**File**: `components/ui/resizable.tsx`
**Description**: Draggable resize panels for flexible layouts
**Components**: ResizablePanelGroup, ResizablePanel, ResizableHandle
**Use Cases**: Split views, adjustable sidebars

### 3. Scroll Area
**File**: `components/ui/scroll-area.tsx`
**Description**: Custom scrollable area with styled scrollbars
**Features**: Smooth scrolling, custom scrollbar styling

### 4. Separator
**File**: `components/ui/separator.tsx`
**Description**: Visual divider for content sections
**Orientation**: Horizontal, Vertical

## Navigation Components

### 5. Breadcrumb
**File**: `components/ui/breadcrumb.tsx`
**Description**: Navigation hierarchy display
**Components**: BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator

### 6. Navigation Menu
**File**: `components/ui/navigation-menu.tsx`
**Description**: Accessible navigation with dropdowns
**Components**: NavigationMenu, NavigationMenuItem, NavigationMenuTrigger, NavigationMenuContent

### 7. Menubar
**File**: `components/ui/menubar.tsx`
**Description**: Desktop application-style menu bar
**Features**: Keyboard navigation, nested menus

### 8. Pagination
**File**: `components/ui/pagination.tsx`
**Description**: Page navigation for lists and tables
**Components**: PaginationContent, PaginationItem, PaginationLink, PaginationPrevious, PaginationNext

### 9. Tabs
**File**: `components/ui/tabs.tsx`
**Description**: Tabbed content navigation
**Components**: Tabs, TabsList, TabsTrigger, TabsContent

## Form Components

### 10. Button
**File**: `components/ui/button.tsx`
**Description**: Primary interactive element
**Variants**:
- default, destructive, outline, secondary, ghost, link
**Sizes**: default, sm, lg, icon

### 11. Button Group
**File**: `components/ui/button-group.tsx`
**Description**: Group of related buttons
**Layout**: Horizontal, vertical

### 12. Input
**File**: `components/ui/input.tsx`
**Description**: Text input field
**Types**: text, email, password, number, tel, url, search

### 13. Input Group
**File**: `components/ui/input-group.tsx`
**Description**: Input with addon elements
**Features**: Prefix, suffix, icons

### 14. Textarea
**File**: `components/ui/textarea.tsx`
**Description**: Multi-line text input
**Features**: Auto-resize, character count

### 15. Label
**File**: `components/ui/label.tsx`
**Description**: Form field label
**Features**: Associated with form controls, accessible

### 16. Checkbox
**File**: `components/ui/checkbox.tsx`
**Description**: Binary selection control
**States**: Checked, unchecked, indeterminate

### 17. Radio Group
**File**: `components/ui/radio-group.tsx`
**Description**: Single selection from multiple options
**Components**: RadioGroup, RadioGroupItem

### 18. Switch
**File**: `components/ui/switch.tsx`
**Description**: Toggle between two states
**Use Cases**: Settings, feature toggles

### 19. Slider
**File**: `components/ui/slider.tsx`
**Description**: Range input control
**Features**: Single/multiple thumbs, step values

### 20. Select
**File**: `components/ui/select.tsx`
**Description**: Dropdown selection menu
**Components**: Select, SelectTrigger, SelectContent, SelectItem, SelectGroup

### 21. Calendar
**File**: `components/ui/calendar.tsx`
**Description**: Date picker calendar
**Features**: Month/year navigation, date selection, range selection

### 22. Form
**File**: `components/ui/form.tsx`
**Description**: Form context and validation
**Components**: Form, FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage
**Integration**: React Hook Form + Zod

### 23. Field
**File**: `components/ui/field.tsx`
**Description**: Form field wrapper
**Features**: Label, description, error handling

### 24. Input OTP
**File**: `components/ui/input-otp.tsx`
**Description**: One-time password input
**Features**: Auto-focus, auto-complete

## Display Components

### 25. Card
**File**: `components/ui/card.tsx`
**Description**: Content container with sections
**Components**: Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter

### 26. Avatar
**File**: `components/ui/avatar.tsx`
**Description**: User profile image or fallback
**Components**: Avatar, AvatarImage, AvatarFallback

### 27. Badge
**File**: `components/ui/badge.tsx`
**Description**: Status or label indicator
**Variants**: default, secondary, destructive, outline

### 28. Table
**File**: `components/ui/table.tsx`
**Description**: Data table display
**Components**: Table, TableHeader, TableBody, TableFooter, TableRow, TableHead, TableCell, TableCaption

### 29. Chart
**File**: `components/ui/chart.tsx`
**Description**: Data visualization wrapper
**Integration**: Recharts
**Features**: Responsive, themed, tooltips

### 30. Empty
**File**: `components/ui/empty.tsx`
**Description**: Empty state placeholder
**Features**: Icon, title, description, action

### 31. Kbd
**File**: `components/ui/kbd.tsx`
**Description**: Keyboard shortcut display
**Use Cases**: Documentation, tooltips

### 32. Item
**File**: `components/ui/item.tsx`
**Description**: Reusable list item component
**Features**: Icon, title, description, actions

## Feedback Components

### 33. Alert
**File**: `components/ui/alert.tsx`
**Description**: Attention-grabbing message
**Variants**: default, destructive
**Components**: Alert, AlertTitle, AlertDescription

### 34. Alert Dialog
**File**: `components/ui/alert-dialog.tsx`
**Description**: Modal confirmation dialog
**Components**: AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogFooter, AlertDialogTitle, AlertDialogDescription, AlertDialogAction, AlertDialogCancel
**Use Cases**: Confirmations, destructive actions

### 35. Toast / Sonner
**File**: `components/ui/toast.tsx`, `components/ui/sonner.tsx`
**Description**: Temporary notification
**Features**: Auto-dismiss, action button, variants
**Position**: Top, bottom, left, right

### 36. Toaster
**File**: `components/ui/toaster.tsx`
**Description**: Toast notification container

### 37. Progress
**File**: `components/ui/progress.tsx`
**Description**: Progress indicator
**Features**: Percentage-based, determinate/indeterminate

### 38. Spinner
**File**: `components/ui/spinner.tsx`
**Description**: Loading indicator
**Sizes**: sm, md, lg, xl

### 39. Skeleton
**File**: `components/ui/skeleton.tsx`
**Description**: Loading placeholder
**Features**: Animated shimmer effect

## Overlay Components

### 40. Dialog
**File**: `components/ui/dialog.tsx`
**Description**: Modal overlay dialog
**Components**: Dialog, DialogTrigger, DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogDescription
**Features**: Focus trap, escape to close, backdrop

### 41. Drawer
**File**: `components/ui/drawer.tsx`
**Description**: Slide-out panel
**Components**: Drawer, DrawerTrigger, DrawerContent, DrawerHeader, DrawerFooter, DrawerTitle, DrawerDescription
**Positions**: Left, right, top, bottom

### 42. Sheet
**File**: `components/ui/sheet.tsx`
**Description**: Side panel overlay
**Components**: Sheet, SheetTrigger, SheetContent, SheetHeader, SheetFooter, SheetTitle, SheetDescription
**Sides**: Left, right, top, bottom

### 43. Popover
**File**: `components/ui/popover.tsx`
**Description**: Floating content container
**Components**: Popover, PopoverTrigger, PopoverContent
**Use Cases**: Additional info, menus

### 44. Hover Card
**File**: `components/ui/hover-card.tsx`
**Description**: Content on hover
**Components**: HoverCard, HoverCardTrigger, HoverCardContent
**Use Cases**: User profiles, previews

### 45. Tooltip
**File**: `components/ui/tooltip.tsx`
**Description**: Small informational popup
**Components**: Tooltip, TooltipTrigger, TooltipContent, TooltipProvider
**Features**: Delay, positioning

### 46. Dropdown Menu
**File**: `components/ui/dropdown-menu.tsx`
**Description**: Contextual action menu
**Components**: DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuCheckboxItem, DropdownMenuRadioItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuGroup, DropdownMenuSub
**Features**: Keyboard navigation, nested menus, checkboxes, radio items

### 47. Context Menu
**File**: `components/ui/context-menu.tsx`
**Description**: Right-click context menu
**Components**: ContextMenu, ContextMenuTrigger, ContextMenuContent, ContextMenuItem, ContextMenuCheckboxItem, ContextMenuRadioItem, ContextMenuLabel, ContextMenuSeparator, ContextMenuShortcut

### 48. Command
**File**: `components/ui/command.tsx`
**Description**: Command palette / search menu
**Components**: Command, CommandDialog, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem, CommandSeparator, CommandShortcut
**Features**: Keyboard navigation, search, groups

## Utility Components

### 49. Accordion
**File**: `components/ui/accordion.tsx`
**Description**: Collapsible content sections
**Components**: Accordion, AccordionItem, AccordionTrigger, AccordionContent
**Types**: Single, multiple expand

### 50. Collapsible
**File**: `components/ui/collapsible.tsx`
**Description**: Expandable/collapsible content
**Components**: Collapsible, CollapsibleTrigger, CollapsibleContent

### 51. Aspect Ratio
**File**: `components/ui/aspect-ratio.tsx`
**Description**: Maintain aspect ratio container
**Ratios**: 16/9, 4/3, 1/1, custom

### 52. Carousel
**File**: `components/ui/carousel.tsx`
**Description**: Image/content carousel
**Components**: Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext
**Features**: Auto-play, navigation, dots

### 53. Toggle
**File**: `components/ui/toggle.tsx`
**Description**: Pressed/unpressed button state
**Variants**: default, outline
**Sizes**: default, sm, lg

### 54. Toggle Group
**File**: `components/ui/toggle-group.tsx`
**Description**: Group of toggle buttons
**Types**: Single, multiple selection

## Theme Components

### 55. Theme Provider
**File**: `components/theme-provider.tsx`
**Description**: Light/dark theme management
**Features**: System preference detection, theme switching, persistence

## Hooks

### 56. use-mobile
**File**: `hooks/use-mobile.ts`
**Description**: Detect mobile viewport
**Returns**: Boolean

### 57. use-toast
**File**: `hooks/use-toast.ts`
**Description**: Toast notification hook
**Methods**: toast(), dismiss()

## Application Components

### 58. Employee Dashboard
**File**: `components/employee-dashboard.tsx`
**Description**: Complete dashboard application
**Features**:
- Employee management table
- Add/edit/delete employees
- Search and filter
- Department management
- Responsive design
- Light/dark mode support

## Icons

**Library**: Lucide React
**File**: Imported from `lucide-react`

**Commonly Used Icons**:
- User, Users, UserPlus
- Home, Building2, Briefcase
- Search, Filter, X
- ChevronDown, ChevronUp, ChevronLeft, ChevronRight
- Menu, MoreHorizontal, MoreVertical
- Edit, Trash2, Eye, EyeOff
- Plus, Minus, Check
- Calendar, Clock
- Mail, Phone
- Settings, LogOut
- Sun, Moon (theme toggle)
- Upload, Download
- AlertCircle, Info, CheckCircle

## Color System

All components use semantic color tokens from the design system:
- Primary, Secondary, Accent
- Muted, Destructive
- Background, Foreground, Card, Border, Input, Ring
- Chart colors (1-5)
- Sidebar colors

## Accessibility Features

All components include:
- ✅ Keyboard navigation
- ✅ ARIA attributes
- ✅ Focus indicators
- ✅ Screen reader support
- ✅ Color contrast compliance
- ✅ Touch target sizes

## Testing

Components use:
- React 19
- TypeScript
- Tailwind CSS 4
- Radix UI primitives
- Class Variance Authority

## File Structure

```
components/
  ui/
    ├── accordion.tsx
    ├── alert-dialog.tsx
    ├── alert.tsx
    ├── aspect-ratio.tsx
    ├── avatar.tsx
    ├── badge.tsx
    ├── breadcrumb.tsx
    ├── button-group.tsx
    ├── button.tsx
    ├── calendar.tsx
    ├── card.tsx
    ├── carousel.tsx
    ├── chart.tsx
    ├── checkbox.tsx
    ├── collapsible.tsx
    ├── command.tsx
    ├── context-menu.tsx
    ├── dialog.tsx
    ├── drawer.tsx
    ├── dropdown-menu.tsx
    ├── empty.tsx
    ├── field.tsx
    ├── form.tsx
    ├── hover-card.tsx
    ├── input-group.tsx
    ├── input-otp.tsx
    ├── input.tsx
    ├── item.tsx
    ├── kbd.tsx
    ├── label.tsx
    ├── menubar.tsx
    ├── navigation-menu.tsx
    ├── pagination.tsx
    ├── popover.tsx
    ├── progress.tsx
    ├── radio-group.tsx
    ├── resizable.tsx
    ├── scroll-area.tsx
    ├── select.tsx
    ├── separator.tsx
    ├── sheet.tsx
    ├── sidebar.tsx
    ├── skeleton.tsx
    ├── slider.tsx
    ├── sonner.tsx
    ├── spinner.tsx
    ├── switch.tsx
    ├── table.tsx
    ├── tabs.tsx
    ├── textarea.tsx
    ├── toast.tsx
    ├── toaster.tsx
    ├── toggle-group.tsx
    ├── toggle.tsx
    ├── tooltip.tsx
    ├── use-mobile.tsx
    └── use-toast.ts
  ├── employee-dashboard.tsx
  └── theme-provider.tsx
```

## Usage Examples

Each component can be imported and used like:

```tsx
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

function MyComponent() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Example</CardTitle>
      </CardHeader>
      <CardContent>
        <Input placeholder="Enter text..." />
        <Button>Submit</Button>
      </CardContent>
    </Card>
  )
}
```

## Component Combinations

### Form Example
```
Form + FormField + FormItem + FormLabel + Input + FormMessage
```

### Modal Example
```
Dialog + DialogTrigger + DialogContent + DialogHeader + DialogTitle + DialogFooter + Button
```

### Menu Example
```
DropdownMenu + DropdownMenuTrigger + DropdownMenuContent + DropdownMenuItem
```

### Navigation Example
```
Sidebar + SidebarHeader + SidebarContent + SidebarMenu + SidebarMenuItem
```

## Quick Reference

| Component Type | Count |
|---------------|-------|
| Layout | 4 |
| Navigation | 5 |
| Form Controls | 15 |
| Display | 8 |
| Feedback | 7 |
| Overlays | 9 |
| Utility | 6 |
| Theme | 1 |
| Application | 1 |
| **Total** | **58** |

## Related Documentation

- See `COMPONENT_SPECS.md` for detailed specifications
- See `DESIGN_TOKENS.md` for color and spacing values
- See `STYLE_GUIDE.md` for usage guidelines
- See `FIGMA_SETUP.md` for Figma implementation
