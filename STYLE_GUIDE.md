# Style Guide

Complete visual design guide for implementing the design system in Figma.

## Design Principles

### 1. Clarity First
- Use clear visual hierarchy through size, weight, and color
- Ensure sufficient contrast ratios for accessibility (WCAG 2.1 AA minimum)
- Prioritize readability over decoration

### 2. Consistency
- Use design tokens for all colors, spacing, and typography
- Maintain consistent component patterns across the application
- Follow established interaction patterns

### 3. Warmth & Professionalism
- Warm neutral color palette with earthy tones
- Professional and approachable aesthetic
- Subtle, refined details

### 4. Responsive & Adaptive
- Mobile-first approach
- Flexible layouts that adapt to content
- Touch-friendly target sizes (minimum 44px × 44px)

## Layout System

### Containers
- **Max Width**: 1280px
- **Padding**: 16px (mobile), 24px (tablet+)
- **Centered**: margin auto

### Grid
- **Columns**: 12
- **Gap**: 24px
- **Column Width**: Fluid (calc-based)

### Spacing Guidelines
- Use 8px base unit for all spacing
- Stack elements with consistent vertical rhythm
- Use spacing tokens: 2, 4, 8, 12, 16, 24, 32, 48, 64px

## Typography Guidelines

### Hierarchy

#### Heading 1 (H1)
- **Size**: 36px
- **Weight**: 700 (Bold)
- **Line Height**: 1.2
- **Use**: Page titles, hero sections
- **Max Width**: 800px

#### Heading 2 (H2)
- **Size**: 30px
- **Weight**: 600 (Semibold)
- **Line Height**: 1.2
- **Use**: Section titles
- **Max Width**: 700px

#### Heading 3 (H3)
- **Size**: 24px
- **Weight**: 600 (Semibold)
- **Line Height**: 1.3
- **Use**: Subsection titles, card headers

#### Heading 4 (H4)
- **Size**: 20px
- **Weight**: 600 (Semibold)
- **Line Height**: 1.4
- **Use**: Small section titles

#### Body Large
- **Size**: 18px
- **Weight**: 400 (Regular)
- **Line Height**: 1.5
- **Use**: Lead paragraphs, important content

#### Body
- **Size**: 16px
- **Weight**: 400 (Regular)
- **Line Height**: 1.5
- **Use**: Main content, descriptions
- **Max Width**: 700px for readability

#### Body Small
- **Size**: 14px
- **Weight**: 400 (Regular)
- **Line Height**: 1.5
- **Use**: Secondary content, UI labels

#### Caption
- **Size**: 12px
- **Weight**: 500 (Medium)
- **Line Height**: 1.4
- **Use**: Small labels, timestamps, metadata

### Content Guidelines
- **Line Length**: 50-75 characters for optimal readability
- **Paragraph Spacing**: 16px between paragraphs
- **List Spacing**: 8px between list items

## Color Usage Guidelines

### Primary Color
- **Use For**: Primary actions, links, important elements
- **Don't Use For**: Large backgrounds (too dominant)

### Secondary Color
- **Use For**: Secondary actions, subtle backgrounds
- **Don't Use For**: Important CTAs

### Accent Color
- **Use For**: Highlights, hover states, badges
- **Don't Use For**: Primary navigation

### Destructive Color
- **Use For**: Delete actions, errors, warnings
- **Use Sparingly**: Only when necessary

### Muted Colors
- **Use For**: Disabled states, placeholders, subtle elements
- **Background**: Low-contrast backgrounds

### Semantic Colors
Always use semantic color tokens:
- `background` - Main app background
- `foreground` - Primary text
- `card` - Elevated surfaces
- `border` - Dividers and borders
- `input` - Form elements

## Accessibility Guidelines

### Color Contrast
- **Normal Text**: Minimum 4.5:1 contrast ratio
- **Large Text** (18px+): Minimum 3:1 contrast ratio
- **UI Elements**: Minimum 3:1 contrast ratio

### Focus States
- All interactive elements MUST have visible focus states
- Use `ring` color with 2px offset
- Focus ring should be highly visible in both themes

### Touch Targets
- Minimum size: 44px × 44px
- Add padding if visual element is smaller
- Ensure adequate spacing between targets (8px minimum)

### Text Sizes
- Body text minimum: 16px
- Important content: 18px+
- Small text (captions): 12px minimum

## Component Patterns

### Buttons

#### Primary Button Pattern
```
When to use: Main actions, form submissions
Visual: High contrast, filled background
Examples: "Submit", "Save", "Create"
```

#### Secondary Button Pattern
```
When to use: Alternative actions, less important
Visual: Subtle background with border
Examples: "Cancel", "Back", "Skip"
```

#### Ghost Button Pattern
```
When to use: Tertiary actions, inline actions
Visual: Transparent background
Examples: "Learn more", "View details"
```

### Forms

#### Form Layout
- Label above input (default)
- Help text below input (12px, muted)
- Error message below input (12px, destructive)
- Vertical spacing: 16px between fields

#### Input States
- **Default**: Border `input`, focused border `ring`
- **Error**: Border `destructive`, helper text in `destructive`
- **Disabled**: Opacity 50%, cursor not-allowed
- **Success**: Optional green left border

### Cards

#### Card Hierarchy
- Use cards to group related content
- Card spacing: 16-24px internal padding
- Stack cards with 16px vertical gap
- Use borders, not heavy shadows

#### Card Patterns
```
Header (optional):
  - Title (H3 or H4)
  - Actions (top-right)

Content:
  - Main content area
  - Flexible layout

Footer (optional):
  - Actions (right-aligned)
  - Meta info (left-aligned)
```

### Navigation

#### Primary Navigation
- Sidebar for desktop (256px wide)
- Top bar for mobile
- Active state: `sidebar-primary` background
- Icon + label pattern

#### Breadcrumbs
- Show hierarchy (max 4 levels)
- Current page is bold
- Separator: "/" or chevron

### Data Display

#### Tables
- Zebra striping: subtle (optional)
- Hover state on rows
- Sticky header for long tables
- Right-align numbers
- Left-align text

#### Lists
- 8px gap between items
- 16px gap between sections
- Icons aligned left
- Actions aligned right

## Animation Guidelines

### Principles
- **Fast**: 150ms for small changes (hover, focus)
- **Base**: 200ms for standard transitions
- **Slow**: 300ms for complex animations
- **Easing**: Use `ease-out` for enter, `ease-in` for exit

### Common Animations

#### Fade In
```
Duration: 200ms
Easing: ease-out
Opacity: 0 → 1
```

#### Slide Down
```
Duration: 300ms
Easing: ease-out
Transform: translateY(-8px) → translateY(0)
Opacity: 0 → 1
```

#### Scale
```
Duration: 150ms
Easing: ease-out
Transform: scale(0.95) → scale(1)
```

### When to Animate
- ✅ Hover states
- ✅ Modal/dialog entry
- ✅ Dropdown menus
- ✅ Toast notifications
- ✅ Loading states
- ❌ Don't animate large content areas
- ❌ Don't animate scrolling content

## Icon Guidelines

### Sizes
- **Small**: 16px
- **Medium**: 20px (default)
- **Large**: 24px
- **Extra Large**: 32px

### Usage
- Use consistent icon set (Lucide icons)
- Icons should be optical size, not geometric
- Align with adjacent text baseline
- Use `currentColor` for fill/stroke

### Icon + Text
- Gap: 8px between icon and text
- Align center vertically
- Icons typically on left, except for dropdowns (right)

## Elevation System

### Shadow Usage
- **Level 0**: No shadow (flush with background)
- **Level 1**: `shadow-sm` - Subtle cards
- **Level 2**: `shadow-md` - Dropdowns, popovers
- **Level 3**: `shadow-lg` - Modals, drawers
- **Level 4**: `shadow-xl` - Command palette

### When to Use Shadows
- Cards that need separation
- Floating elements (dropdowns, tooltips)
- Modal overlays
- Sticky elements

## Responsive Design

### Breakpoint Strategy

#### Mobile (< 640px)
- Single column layout
- Stack navigation vertically
- Full-width cards
- Larger touch targets

#### Tablet (640px - 1024px)
- 2-column layouts
- Collapsible sidebar
- Medium cards

#### Desktop (1024px+)
- Multi-column layouts
- Persistent sidebar
- Optimal card sizing
- Hover interactions

### Mobile-Specific Guidelines
- Minimum font size: 16px (prevents zoom)
- Touch targets: 44px minimum
- Reduce padding: 16px instead of 24px
- Simplify navigation
- Use bottom sheets instead of dropdowns

## Best Practices

### Do's ✅
- Use semantic color tokens
- Follow spacing scale consistently
- Test in both light and dark modes
- Maintain 4.5:1 contrast for text
- Use relative units for typography
- Design mobile-first
- Add proper focus states

### Don'ts ❌
- Don't use arbitrary colors
- Don't use inconsistent spacing
- Don't rely on color alone for meaning
- Don't use small text for important content
- Don't create inaccessible color combinations
- Don't animate without purpose
- Don't use purple/indigo (unless requested)

## File Organization in Figma

### Recommended Structure
```
📁 Design System
  📄 Tokens (colors, typography, spacing)
  📄 Components
    - Buttons
    - Inputs
    - Cards
    - Navigation
    - Data Display
    - Feedback
    - Overlays
  📄 Patterns
    - Forms
    - Tables
    - Dashboard layouts
  📄 Examples
    - Light theme examples
    - Dark theme examples
```

### Component Naming
- Use clear, descriptive names
- Follow pattern: `Category/Component/Variant`
- Examples:
  - `Button/Primary/Default`
  - `Button/Primary/Hover`
  - `Input/Text/Default`
  - `Card/Default`

### Variants in Figma
- Create component variants for states
- Properties: `Variant`, `State`, `Size`
- Keep variants organized and labeled clearly

## Testing Checklist

Before finalizing designs:

- [ ] Test in light and dark modes
- [ ] Verify color contrast (use plugin)
- [ ] Check responsive breakpoints
- [ ] Test with real content (long/short)
- [ ] Verify all interactive states
- [ ] Check loading states
- [ ] Test error states
- [ ] Verify focus indicators
- [ ] Check touch target sizes
- [ ] Test with screen reader labels
