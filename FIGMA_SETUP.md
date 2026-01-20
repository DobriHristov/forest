# Figma Setup Guide

Step-by-step instructions for setting up your design system in Figma.

## 1. Create a New Figma File

1. Open Figma
2. Create a new design file
3. Name it: "Design System" or "[Project Name] Design System"
4. Set canvas to 1440px wide (desktop standard)

## 2. Set Up Color Styles

### Creating Color Variables

Figma supports variables (Design → Variables). Here's how to set them up:

#### Step 1: Create Color Collections
1. Go to Design → Variables
2. Create a new collection: "Colors - Light"
3. Create another collection: "Colors - Dark"

#### Step 2: Add Light Mode Colors

In "Colors - Light" collection, create these variables:

**Semantic Colors:**
- `background` → `#FCFCFC`
- `foreground` → `#2E2E2E`
- `card` → `#FFFFFF`
- `card-foreground` → `#2E2E2E`
- `popover` → `#FFFFFF`
- `popover-foreground` → `#2E2E2E`

**Brand Colors:**
- `primary` → `#7A6A4D`
- `primary-foreground` → `#FCFCFC`
- `secondary` → `#F7F7F6`
- `secondary-foreground` → `#454544`
- `accent` → `#A88D5E`
- `accent-foreground` → `#FCFCFC`

**State Colors:**
- `muted` → `#F7F7F7`
- `muted-foreground` → `#787877`
- `destructive` → `#A34E3A`
- `destructive-foreground` → `#FCFCFC`

**UI Elements:**
- `border` → `#EFEFEF`
- `input` → `#F5F5F5`
- `ring` → `#7A6A4D`

**Chart Colors:**
- `chart-1` → `#7A6A4D`
- `chart-2` → `#A88D5E`
- `chart-3` → `#655841`
- `chart-4` → `#BAA889`
- `chart-5` → `#5A4D3A`

**Sidebar Colors:**
- `sidebar` → `#3A3A41`
- `sidebar-foreground` → `#F5F5F5`
- `sidebar-primary` → `#A88D5E`
- `sidebar-primary-foreground` → `#FCFCFC`
- `sidebar-accent` → `#4A4A52`
- `sidebar-accent-foreground` → `#F5F5F5`
- `sidebar-border` → `#454549`
- `sidebar-ring` → `#A88D5E`

#### Step 3: Add Dark Mode Colors

In "Colors - Dark" collection, create the same variables with dark values:

**Semantic Colors:**
- `background` → `#272320`
- `foreground` → `#F5F5F4`
- `card` → `#312D28`
- `card-foreground` → `#F5F5F4`
- `popover` → `#312D28`
- `popover-foreground` → `#F5F5F4`

**Brand Colors:**
- `primary` → `#B39668`
- `primary-foreground` → `#272320`
- `secondary` → `#3F3B36`
- `secondary-foreground` → `#F5F5F4`
- `accent` → `#C6A26B`
- `accent-foreground` → `#272320`

**State Colors:**
- `muted` → `#3F3B36`
- `muted-foreground` → `#9A9691`
- `destructive` → `#A34E3A`
- `destructive-foreground` → `#F5F5F4`

**UI Elements:**
- `border` → `#3F3B36`
- `input` → `#3F3B36`
- `ring` → `#B39668`

**Chart Colors:**
- `chart-1` → `#B39668`
- `chart-2` → `#C6A26B`
- `chart-3` → `#D4B482`
- `chart-4` → `#DEC89A`
- `chart-5` → `#9F7F52`

**Sidebar Colors:**
- `sidebar` → `#312D28`
- `sidebar-foreground` → `#F5F5F4`
- `sidebar-primary` → `#B39668`
- `sidebar-primary-foreground` → `#272320`
- `sidebar-accent` → `#3F3B36`
- `sidebar-accent-foreground` → `#F5F5F4`
- `sidebar-border` → `#3F3B36`
- `sidebar-ring` → `#B39668`

#### Step 4: Set Up Modes
1. In the Variables panel, set up "Light" and "Dark" modes
2. Assign the appropriate collection to each mode

## 3. Set Up Typography Styles

### Creating Text Styles

Go to Design → Text Styles and create these:

#### Headings
1. **Heading 1**
   - Font: Geist (or Inter/system font)
   - Size: 36px
   - Weight: Bold (700)
   - Line height: 120%
   - Color: `foreground` variable

2. **Heading 2**
   - Font: Geist
   - Size: 30px
   - Weight: Semibold (600)
   - Line height: 120%
   - Color: `foreground` variable

3. **Heading 3**
   - Font: Geist
   - Size: 24px
   - Weight: Semibold (600)
   - Line height: 130%
   - Color: `foreground` variable

4. **Heading 4**
   - Font: Geist
   - Size: 20px
   - Weight: Semibold (600)
   - Line height: 140%
   - Color: `foreground` variable

#### Body Text
1. **Body Large**
   - Font: Geist
   - Size: 18px
   - Weight: Regular (400)
   - Line height: 150%
   - Color: `foreground` variable

2. **Body**
   - Font: Geist
   - Size: 16px
   - Weight: Regular (400)
   - Line height: 150%
   - Color: `foreground` variable

3. **Body Small**
   - Font: Geist
   - Size: 14px
   - Weight: Regular (400)
   - Line height: 150%
   - Color: `foreground` variable

4. **Caption**
   - Font: Geist
   - Size: 12px
   - Weight: Medium (500)
   - Line height: 140%
   - Color: `muted-foreground` variable

#### Monospace
1. **Code**
   - Font: Geist Mono (or Fira Code/JetBrains Mono)
   - Size: 14px
   - Weight: Regular (400)
   - Line height: 150%

## 4. Set Up Effect Styles (Shadows)

### Creating Effect Styles

Go to Design → Effect Styles:

1. **Shadow SM**
   - Type: Drop shadow
   - X: 0, Y: 1
   - Blur: 2
   - Color: Black at 5% opacity

2. **Shadow MD**
   - Type: Drop shadow (add 2 shadows)
   - Shadow 1: X: 0, Y: 4, Blur: 6, Color: Black 10%
   - Shadow 2: X: 0, Y: 2, Blur: 4, Color: Black 10%

3. **Shadow LG**
   - Type: Drop shadow (add 2 shadows)
   - Shadow 1: X: 0, Y: 10, Blur: 15, Color: Black 10%
   - Shadow 2: X: 0, Y: 4, Blur: 6, Color: Black 10%

4. **Shadow XL**
   - Type: Drop shadow (add 2 shadows)
   - Shadow 1: X: 0, Y: 20, Blur: 25, Color: Black 10%
   - Shadow 2: X: 0, Y: 8, Blur: 10, Color: Black 10%

## 5. Create Components

### Button Component

1. Create a frame: 40px height, auto width
2. Add text layer: "Button", centered
3. Add padding: 8px top/bottom, 16px left/right
4. Add background: `primary` variable
5. Border radius: 12px
6. Create component (Cmd/Ctrl + Alt + K)

#### Create Variants
Right-click component → Add variant

**Variant Properties:**
- `Type`: Primary, Secondary, Outline, Ghost, Destructive, Link
- `Size`: Small (36px), Default (40px), Large (44px)
- `State`: Default, Hover, Active, Disabled

**Variant Configurations:**

Primary Default:
- Background: `primary`
- Text: `primary-foreground`

Primary Hover:
- Background: `primary` at 90% opacity

Secondary Default:
- Background: `secondary`
- Text: `secondary-foreground`
- Border: 1px `border`

Outline Default:
- Background: Transparent
- Text: `foreground`
- Border: 1px `input`

### Input Component

1. Create a frame: 40px height, 240px width
2. Add text layer: "Placeholder text"
3. Add padding: 8px top/bottom, 12px left/right
4. Background: `background`
5. Border: 1px `input`
6. Border radius: 10px
7. Create component

**Variant Properties:**
- `State`: Default, Focus, Error, Disabled

### Card Component

1. Create a frame: auto layout vertical
2. Background: `card`
3. Border: 1px `border`
4. Border radius: 12px
5. Padding: 24px
6. Shadow: shadow-sm
7. Create component

**Nested Components:**
- Card Header (with title)
- Card Content (flexible)
- Card Footer (with actions)

### Badge Component

1. Create a frame: 22px height, auto width
2. Padding: 2px top/bottom, 10px left/right
3. Border radius: 9999px (pill shape)
4. Background: `primary`
5. Text: 12px, weight 600, `primary-foreground`
6. Create component

**Variant Properties:**
- `Type`: Default, Secondary, Outline, Destructive

## 6. Create Auto Layout Patterns

### Form Layout
1. Create vertical auto layout
2. Spacing: 16px between fields
3. Include: Label, Input, Helper Text

### Card Grid
1. Create horizontal auto layout
2. Spacing: 16px
3. Wrap: Yes
4. Set min width per card: 300px

### Navigation
1. Create vertical auto layout (sidebar)
2. Width: 256px
3. Padding: 16px
4. Spacing: 4px between items

## 7. Create Responsive Frames

Set up common device frames:

1. **Mobile**: 375px × 667px (iPhone SE)
2. **Tablet**: 768px × 1024px (iPad)
3. **Desktop**: 1440px × 900px (Standard)
4. **Large Desktop**: 1920px × 1080px (Full HD)

## 8. Icon Library

### Option 1: Import from Iconify
1. Install Iconify plugin
2. Search for "Lucide" icon set
3. Import commonly used icons
4. Create components for each icon

### Option 2: Manual Setup
1. Create 20px × 20px frames
2. Draw icons or import SVGs
3. Use `currentColor` for strokes
4. Create components

**Common Icons Needed:**
- Home, User, Settings
- Menu, X (close)
- ChevronDown, ChevronUp, ChevronLeft, ChevronRight
- Check, Plus, Minus
- Search, Mail, Phone
- Calendar, Clock
- Upload, Download
- Edit, Trash, Eye

## 9. Document Your System

### Create Documentation Pages

1. **Cover Page**
   - Project name
   - Version
   - Last updated date
   - Brand colors preview

2. **Color Page**
   - Show all color tokens
   - Light and dark mode side-by-side
   - Usage guidelines

3. **Typography Page**
   - All text styles with examples
   - Hierarchy demonstration
   - Spacing guidelines

4. **Components Page**
   - All components with states
   - Usage examples
   - Dos and don'ts

5. **Patterns Page**
   - Common layouts
   - Form patterns
   - Navigation patterns

## 10. Export Assets

### For Developers

1. **Icons**: Export as SVG
2. **Images**: Export at 1x, 2x, 3x
3. **Components**: Share Figma link with Dev Mode access

### Design Tokens Export

Use a plugin like "Design Tokens":
1. Install plugin
2. Export tokens as JSON
3. Share with development team

## Tips for Organization

### Naming Conventions
- Use clear, descriptive names
- Group related items with prefixes
- Example: `btn-primary-default`, `btn-primary-hover`

### Pages Structure
```
📄 Cover
📄 Design Tokens
  - Colors
  - Typography
  - Spacing
  - Shadows
📄 Components
  - Buttons
  - Forms
  - Cards
  - Navigation
📄 Patterns
  - Layouts
  - Forms
  - Tables
📄 Examples
  - Dashboard (Light)
  - Dashboard (Dark)
  - Mobile App
```

### Component Organization
- Create a master components page
- Keep instances in design files
- Use libraries to share across projects

### Version Control
- Publish library updates
- Document changes in file description
- Use version numbering (v1.0, v1.1, etc.)

## Maintenance

### Regular Updates
- Review and update quarterly
- Add new components as needed
- Deprecate unused components
- Maintain consistency

### Collaboration
- Share library with team
- Enable comments for feedback
- Regular design reviews
- Document decisions

## Useful Figma Plugins

1. **Contrast** - Check color contrast ratios
2. **Iconify** - Import icons easily
3. **Design Tokens** - Export design tokens
4. **Autoflow** - Create user flow diagrams
5. **Content Reel** - Generate realistic content
6. **Unsplash** - Free stock photos
7. **Stark** - Accessibility checker
8. **Arc** - Make curved text and shapes

## Resources

- Figma Best Practices: https://www.figma.com/best-practices/
- Figma Variables Guide: https://help.figma.com/hc/en-us/articles/15339657135383
- Design Systems in Figma: https://www.figma.com/community/file/1033751847904927230

## Next Steps

After setup:
1. ✅ Create all base components
2. ✅ Set up light and dark modes
3. ✅ Build example screens
4. ✅ Share with team for feedback
5. ✅ Publish component library
6. ✅ Document usage guidelines
7. ✅ Train team on system usage

## Questions?

Refer to:
- `DESIGN_TOKENS.md` - Complete token reference
- `COMPONENT_SPECS.md` - Detailed component specifications
- `STYLE_GUIDE.md` - Visual design guidelines
