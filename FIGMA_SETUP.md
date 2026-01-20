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
- `background` → `#FCFCFD`
- `foreground` → `#3A3A42`
- `card` → `#FFFFFF`
- `card-foreground` → `#3A3A42`
- `popover` → `#FFFFFF`
- `popover-foreground` → `#3A3A42`

**Brand Colors:**
- `primary` → `#1E5EBF`
- `primary-foreground` → `#FCFCFD`
- `secondary` → `#F5F5F7`
- `secondary-foreground` → `#474750`
- `accent` → `#3B7DBF`
- `accent-foreground` → `#FCFCFD`

**State Colors:**
- `muted` → `#F5F5F7`
- `muted-foreground` → `#7E7E8A`
- `destructive` → `#C53030`
- `destructive-foreground` → `#FCFCFD`

**UI Elements:**
- `border` → `#E8E8EB`
- `input` → `#F0F0F2`
- `ring` → `#1E5EBF`

**Chart Colors:**
- `chart-1` → `#1E5EBF`
- `chart-2` → `#3B7DBF`
- `chart-3` → `#2E7D9A`
- `chart-4` → `#6B93C4`
- `chart-5` → `#2A3F9E`

**Sidebar Colors:**
- `sidebar` → `#292933`
- `sidebar-foreground` → `#F5F5F7`
- `sidebar-primary` → `#3B7DBF`
- `sidebar-primary-foreground` → `#FCFCFD`
- `sidebar-accent` → `#383842`
- `sidebar-accent-foreground` → `#F5F5F7`
- `sidebar-border` → `#33333D`
- `sidebar-ring` → `#3B7DBF`

#### Step 3: Add Dark Mode Colors

In "Colors - Dark" collection, create the same variables with dark values:

**Semantic Colors:**
- `background` → `#1F1F28`
- `foreground` → `#F5F5F7`
- `card` → `#28282F`
- `card-foreground` → `#F5F5F7`
- `popover` → `#28282F`
- `popover-foreground` → `#F5F5F7`

**Brand Colors:**
- `primary` → `#5B8FDB`
- `primary-foreground` → `#1F1F28`
- `secondary` → `#363640`
- `secondary-foreground` → `#F5F5F7`
- `accent` → `#52A3C4`
- `accent-foreground` → `#1F1F28`

**State Colors:**
- `muted` → `#363640`
- `muted-foreground` → `#9999A6`
- `destructive` → `#C53030`
- `destructive-foreground` → `#F5F5F7`

**UI Elements:**
- `border` → `#363640`
- `input` → `#363640`
- `ring` → `#5B8FDB`

**Chart Colors:**
- `chart-1` → `#5B8FDB`
- `chart-2` → `#52A3C4`
- `chart-3` → `#70B8D6`
- `chart-4` → `#4775BF`
- `chart-5` → `#3658B8`

**Sidebar Colors:**
- `sidebar` → `#28282F`
- `sidebar-foreground` → `#F5F5F7`
- `sidebar-primary` → `#5B8FDB`
- `sidebar-primary-foreground` → `#1F1F28`
- `sidebar-accent` → `#363640`
- `sidebar-accent-foreground` → `#F5F5F7`
- `sidebar-border` → `#363640`
- `sidebar-ring` → `#5B8FDB`

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
