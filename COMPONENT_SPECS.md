# Component Specifications

Complete specifications for all UI components in the design system.

## Button

### Variants

#### Primary
- **Background**: `primary`
- **Text Color**: `primary-foreground`
- **Border**: None
- **Padding**: `8px 16px` (2 × 4 units)
- **Border Radius**: `lg` (12px)
- **Font Weight**: 500
- **Height**: 40px
- **States**:
  - Hover: Opacity 90%
  - Active: Opacity 80%
  - Disabled: Opacity 50%
  - Focus: Ring with `ring` color, 2px offset

#### Secondary
- **Background**: `secondary`
- **Text Color**: `secondary-foreground`
- **Border**: 1px solid `border`
- **Padding**: `8px 16px`
- **Border Radius**: `lg` (12px)
- **States**: Same as primary

#### Outline
- **Background**: Transparent
- **Text Color**: `foreground`
- **Border**: 1px solid `input`
- **Padding**: `8px 16px`
- **Border Radius**: `lg` (12px)
- **States**:
  - Hover: Background `accent`, Text `accent-foreground`
  - Focus: Ring with `ring` color

#### Ghost
- **Background**: Transparent
- **Text Color**: `foreground`
- **Border**: None
- **Padding**: `8px 16px`
- **States**:
  - Hover: Background `accent`, Text `accent-foreground`

#### Destructive
- **Background**: `destructive`
- **Text Color**: `destructive-foreground`
- **Border**: None
- **Padding**: `8px 16px`
- **Border Radius**: `lg` (12px)

#### Link
- **Background**: Transparent
- **Text Color**: `primary`
- **Text Decoration**: Underline on hover
- **Padding**: None

### Sizes
- **Default**: Height 40px, Padding 8px 16px, Font 14px
- **Small**: Height 36px, Padding 8px 12px, Font 14px
- **Large**: Height 44px, Padding 12px 24px, Font 16px
- **Icon**: 40px × 40px square

## Input

### Default Input
- **Background**: `background`
- **Border**: 1px solid `input`
- **Text Color**: `foreground`
- **Padding**: `8px 12px`
- **Border Radius**: `md` (10px)
- **Height**: 40px
- **Font Size**: 14px
- **States**:
  - Focus: Border `ring`, Ring shadow
  - Disabled: Opacity 50%, Cursor not-allowed
  - Error: Border `destructive`

### Textarea
- **Same as Input** but:
  - Min Height: 80px
  - Resize: Vertical only
  - Padding: `12px`

## Card

### Default Card
- **Background**: `card`
- **Border**: 1px solid `border`
- **Border Radius**: `lg` (12px)
- **Padding**: `24px` (6 units)
- **Shadow**: `shadow-sm`

### Card Header
- **Padding**: `24px 24px 16px` (top/sides, bottom)
- **Border Bottom**: 1px solid `border` (optional)

### Card Content
- **Padding**: `24px`

### Card Footer
- **Padding**: `16px 24px 24px`
- **Border Top**: 1px solid `border` (optional)
- **Display**: Flex
- **Justify**: Space between
- **Align**: Center

## Badge

### Variants
- **Default**: Background `primary`, Text `primary-foreground`
- **Secondary**: Background `secondary`, Text `secondary-foreground`
- **Outline**: Border `border`, Background transparent
- **Destructive**: Background `destructive`, Text `destructive-foreground`

### Properties
- **Padding**: `2px 10px` (0.5 × 2.5 units)
- **Border Radius**: `full` (pill)
- **Font Size**: 12px
- **Font Weight**: 600
- **Height**: 22px
- **Display**: Inline-flex
- **Align**: Center

## Avatar

### Sizes
- **Small**: 32px × 32px
- **Medium**: 40px × 40px (default)
- **Large**: 48px × 48px
- **Extra Large**: 64px × 64px

### Properties
- **Border Radius**: `full`
- **Overflow**: Hidden
- **Background**: `muted` (fallback)
- **Text Color**: `muted-foreground`
- **Font Weight**: 500

### Avatar Fallback
- **Display**: Flex
- **Align**: Center
- **Justify**: Center
- **Background**: `muted`
- **Text**: Initials (1-2 characters)

## Dialog / Modal

### Overlay
- **Background**: `rgba(0, 0, 0, 0.8)`
- **Z-Index**: 1040

### Dialog Container
- **Background**: `card`
- **Border**: 1px solid `border`
- **Border Radius**: `lg` (12px)
- **Padding**: `24px`
- **Max Width**: 500px
- **Shadow**: `shadow-lg`
- **Z-Index**: 1050

### Dialog Header
- **Padding Bottom**: `16px`
- **Font Size**: 18px
- **Font Weight**: 600

### Dialog Footer
- **Padding Top**: `16px`
- **Display**: Flex
- **Justify**: End
- **Gap**: `8px`

## Dropdown Menu / Select

### Trigger
- **Same as Button** (typically secondary or outline variant)

### Menu Container
- **Background**: `popover`
- **Border**: 1px solid `border`
- **Border Radius**: `md` (10px)
- **Padding**: `4px`
- **Shadow**: `shadow-md`
- **Min Width**: 200px
- **Z-Index**: 1000

### Menu Item
- **Padding**: `8px 12px` (2 × 3 units)
- **Border Radius**: `sm` (8px)
- **Font Size**: 14px
- **States**:
  - Hover: Background `accent`, Text `accent-foreground`
  - Active: Background `accent`, Text `accent-foreground`
  - Disabled: Opacity 50%

### Menu Separator
- **Height**: 1px
- **Background**: `border`
- **Margin**: `4px 0`

## Tabs

### Tab List
- **Border Bottom**: 2px solid `border`
- **Display**: Flex
- **Gap**: `0`

### Tab Trigger
- **Padding**: `12px 16px`
- **Font Size**: 14px
- **Font Weight**: 500
- **Color**: `muted-foreground`
- **Border Bottom**: 2px solid transparent
- **Margin Bottom**: -2px
- **States**:
  - Hover: Color `foreground`
  - Active: Color `foreground`, Border `primary`

### Tab Content
- **Padding Top**: `16px`

## Table

### Table Container
- **Border**: 1px solid `border`
- **Border Radius**: `lg` (12px)
- **Overflow**: Hidden

### Table Header
- **Background**: `muted`
- **Font Weight**: 600
- **Font Size**: 12px
- **Text Transform**: Uppercase
- **Letter Spacing**: 0.5px
- **Color**: `muted-foreground`

### Table Cell
- **Padding**: `12px 16px`
- **Border Bottom**: 1px solid `border`
- **Font Size**: 14px

### Table Row
- **States**:
  - Hover: Background `muted/50`
  - Selected: Background `accent/10`

## Checkbox

### Box
- **Size**: 16px × 16px
- **Border**: 2px solid `primary`
- **Border Radius**: `sm` (8px)
- **Background**: Transparent (unchecked), `primary` (checked)

### Checkmark
- **Color**: `primary-foreground`
- **Size**: 12px

### States
- **Hover**: Opacity 80%
- **Focus**: Ring `ring` color
- **Disabled**: Opacity 50%

## Switch / Toggle

### Track
- **Width**: 44px
- **Height**: 24px
- **Border Radius**: `full`
- **Background**: `input` (off), `primary` (on)

### Thumb
- **Size**: 20px × 20px
- **Border Radius**: `full`
- **Background**: `background`
- **Position**: 2px from left (off), 2px from right (on)
- **Transition**: 200ms ease

## Slider

### Track
- **Height**: 4px
- **Background**: `secondary`
- **Border Radius**: `full`

### Range (filled portion)
- **Background**: `primary`

### Thumb
- **Size**: 16px × 16px
- **Border Radius**: `full`
- **Background**: `primary`
- **Border**: 2px solid `background`
- **Shadow**: `shadow-sm`
- **States**:
  - Hover: Scale 1.1
  - Focus: Ring `ring` color

## Progress Bar

### Track
- **Height**: 8px
- **Background**: `secondary`
- **Border Radius**: `full`
- **Overflow**: Hidden

### Bar
- **Background**: `primary`
- **Height**: 100%
- **Transition**: width 300ms ease

## Toast / Notification

### Container
- **Background**: `card`
- **Border**: 1px solid `border`
- **Border Radius**: `lg` (12px)
- **Padding**: `16px`
- **Shadow**: `shadow-lg`
- **Min Width**: 300px
- **Max Width**: 420px

### Variants
- **Default**: Border left 4px solid `primary`
- **Success**: Border left 4px solid green
- **Warning**: Border left 4px solid yellow
- **Error**: Border left 4px solid `destructive`

## Tooltip

### Container
- **Background**: `popover`
- **Border**: 1px solid `border`
- **Border Radius**: `md` (10px)
- **Padding**: `8px 12px`
- **Font Size**: 12px
- **Max Width**: 250px
- **Shadow**: `shadow-md`
- **Z-Index**: 1070

### Arrow
- **Size**: 8px
- **Color**: `popover`

## Sidebar

### Container
- **Width**: 256px (collapsed: 64px)
- **Background**: `sidebar`
- **Border Right**: 1px solid `sidebar-border`
- **Height**: 100vh

### Sidebar Header
- **Padding**: `16px`
- **Border Bottom**: 1px solid `sidebar-border`

### Sidebar Item
- **Padding**: `12px 16px`
- **Border Radius**: `md` (10px)
- **Color**: `sidebar-foreground`
- **Font Size**: 14px
- **States**:
  - Hover: Background `sidebar-accent`
  - Active: Background `sidebar-primary`, Color `sidebar-primary-foreground`

## Accordion

### Header
- **Padding**: `16px`
- **Font Weight**: 600
- **Border Bottom**: 1px solid `border`
- **Cursor**: Pointer
- **States**:
  - Hover: Background `muted/50`

### Content
- **Padding**: `16px`
- **Animation**: Slide down 200ms

### Icon
- **Transition**: Rotate 200ms
- **Rotation**: 0deg (closed), 180deg (open)

## Breadcrumb

### Container
- **Display**: Flex
- **Align**: Center
- **Gap**: `8px`
- **Font Size**: 14px

### Item
- **Color**: `muted-foreground`
- **States**:
  - Hover: Color `foreground`
  - Active/Current: Color `foreground`, Font weight 600

### Separator
- **Color**: `muted-foreground`
- **Margin**: `0 8px`

## Pagination

### Container
- **Display**: Flex
- **Gap**: `4px`

### Button
- **Size**: 36px × 36px
- **Border Radius**: `md` (10px)
- **Font Size**: 14px
- **States**:
  - Active: Background `primary`, Color `primary-foreground`
  - Hover: Background `accent`

## Spinner / Loading

### Default
- **Size**: 24px × 24px
- **Border**: 2px solid `muted`
- **Border Top**: 2px solid `primary`
- **Border Radius**: `full`
- **Animation**: Spin 600ms linear infinite

### Sizes
- **Small**: 16px
- **Medium**: 24px
- **Large**: 32px
- **Extra Large**: 48px

## Skeleton

### Properties
- **Background**: `muted`
- **Border Radius**: `md` (10px)
- **Animation**: Pulse 2s ease-in-out infinite

### Common Shapes
- **Text Line**: Height 16px, Width 100%
- **Avatar**: 40px × 40px, Border radius `full`
- **Button**: Height 40px, Width 100px

## Alert

### Container
- **Padding**: `16px`
- **Border**: 1px solid
- **Border Radius**: `lg` (12px)
- **Display**: Flex
- **Gap**: `12px`

### Variants
- **Default**: Border `border`, Background `card`
- **Destructive**: Border `destructive`, Background `destructive/10`

### Icon
- **Size**: 20px
- **Flex Shrink**: 0

## Popover

### Container
- **Background**: `popover`
- **Border**: 1px solid `border`
- **Border Radius**: `md` (10px)
- **Padding**: `16px`
- **Shadow**: `shadow-md`
- **Max Width**: 300px
- **Z-Index**: 1060

## Command Menu

### Container
- **Background**: `popover`
- **Border**: 1px solid `border`
- **Border Radius**: `lg` (12px)
- **Shadow**: `shadow-xl`
- **Width**: 640px

### Input
- **Padding**: `16px`
- **Border**: None
- **Border Bottom**: 1px solid `border`
- **Font Size**: 16px

### List
- **Max Height**: 400px
- **Overflow**: Auto
- **Padding**: `8px`

### Item
- **Padding**: `12px`
- **Border Radius**: `md` (10px)
- **States**:
  - Selected: Background `accent`, Text `accent-foreground`

## Calendar / Date Picker

### Header
- **Padding**: `16px`
- **Display**: Flex
- **Justify**: Space between
- **Font Weight**: 600

### Grid
- **Gap**: `4px`
- **Padding**: `8px`

### Day Cell
- **Size**: 36px × 36px
- **Border Radius**: `md` (10px)
- **Font Size**: 14px
- **States**:
  - Hover: Background `accent`
  - Selected: Background `primary`, Color `primary-foreground`
  - Today: Border 1px solid `primary`
  - Outside month: Opacity 30%
