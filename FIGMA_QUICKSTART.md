# Figma Quick Start Guide

Get started with creating Figma components from this design system in 30 minutes.

## Documentation Files

This package includes 5 comprehensive documentation files:

1. **DESIGN_TOKENS.md** - All colors, typography, spacing, shadows, and design values
2. **COMPONENT_SPECS.md** - Detailed specifications for every component (buttons, inputs, cards, etc.)
3. **COMPONENT_INVENTORY.md** - Complete list of 58+ available components
4. **STYLE_GUIDE.md** - Visual design guidelines and best practices
5. **FIGMA_SETUP.md** - Step-by-step Figma setup instructions

## Quick Setup Checklist

### Phase 1: Foundation (10 minutes)

- [ ] Create new Figma file
- [ ] Set up color variables (Design → Variables)
  - Create "Colors - Light" collection
  - Create "Colors - Dark" collection
  - Add all color tokens from DESIGN_TOKENS.md
- [ ] Create text styles (Design → Text Styles)
  - H1, H2, H3, H4
  - Body Large, Body, Body Small, Caption
- [ ] Create effect styles (Design → Effect Styles)
  - Shadow SM, MD, LG, XL

### Phase 2: Core Components (15 minutes)

- [ ] Create Button component with variants
  - Variants: Primary, Secondary, Outline, Ghost, Destructive
  - States: Default, Hover, Disabled
  - Sizes: Small, Default, Large
- [ ] Create Input component
  - States: Default, Focus, Error, Disabled
- [ ] Create Card component
  - Include: Header, Content, Footer sections
- [ ] Create Badge component
  - Variants: Default, Secondary, Destructive, Outline

### Phase 3: Documentation (5 minutes)

- [ ] Create Cover page with project info
- [ ] Create Colors page showing light/dark modes
- [ ] Create Components page with all variants
- [ ] Add usage examples

## Color Setup (Copy & Paste)

### Light Mode - Primary Colors
```
Primary: #7A6A4D
Primary Foreground: #FCFCFC
Secondary: #F7F7F6
Accent: #A88D5E
Background: #FCFCFC
Foreground: #2E2E2E
Border: #EFEFEF
```

### Dark Mode - Primary Colors
```
Primary: #B39668
Primary Foreground: #272320
Secondary: #3F3B36
Accent: #C6A26B
Background: #272320
Foreground: #F5F5F4
Border: #3F3B36
```

## Typography Setup (Copy & Paste)

| Style | Font | Size | Weight | Line Height |
|-------|------|------|--------|-------------|
| H1 | Geist | 36px | Bold (700) | 120% |
| H2 | Geist | 30px | Semibold (600) | 120% |
| H3 | Geist | 24px | Semibold (600) | 130% |
| H4 | Geist | 20px | Semibold (600) | 140% |
| Body | Geist | 16px | Regular (400) | 150% |
| Small | Geist | 14px | Regular (400) | 150% |
| Caption | Geist | 12px | Medium (500) | 140% |

## Spacing Scale (Copy & Paste)

```
2px, 4px, 8px, 12px, 16px, 24px, 32px, 48px, 64px
```

## Border Radius

```
Small: 8px
Medium: 10px
Large: 12px
Full: 9999px (pill shape)
```

## Essential Components Priority

### Must Have (Start Here)
1. Button
2. Input
3. Card
4. Badge
5. Avatar

### Should Have (Next)
6. Select/Dropdown
7. Checkbox
8. Switch
9. Dialog/Modal
10. Toast/Alert

### Nice to Have (Later)
11. Table
12. Tabs
13. Accordion
14. Tooltip
15. Calendar

## Component Variants Table

| Component | Variants | States | Sizes |
|-----------|----------|--------|-------|
| Button | 6 types | 4 states | 3 sizes |
| Input | 1 type | 4 states | 3 sizes |
| Badge | 4 types | - | 1 size |
| Card | 1 type | - | Flexible |
| Avatar | 1 type | - | 4 sizes |

## Quick Component Specs

### Button
- Height: 40px (default)
- Padding: 8px 16px
- Border Radius: 12px
- Font: 14px Medium

### Input
- Height: 40px
- Padding: 8px 12px
- Border: 1px
- Border Radius: 10px
- Font: 14px Regular

### Card
- Padding: 24px
- Border: 1px
- Border Radius: 12px
- Shadow: SM

### Badge
- Height: 22px
- Padding: 2px 10px
- Border Radius: Full
- Font: 12px Semibold

## Auto Layout Settings

### Vertical Stack (Common)
- Direction: Vertical
- Gap: 16px
- Padding: 24px
- Alignment: Top Left

### Horizontal Group
- Direction: Horizontal
- Gap: 8px
- Alignment: Center
- Distribute: Space between

### Form Layout
- Direction: Vertical
- Gap: 16px
- Label-Input gap: 8px

## Time Estimates

| Task | Time |
|------|------|
| Color setup | 5 min |
| Typography setup | 3 min |
| Effects/Shadows | 2 min |
| Button component | 5 min |
| Input component | 3 min |
| Card component | 4 min |
| Badge component | 2 min |
| Other components | 10-15 min |
| Documentation | 5 min |
| **Total** | **30-40 min** |

## Pro Tips

### Speed Up Creation
1. Use Figma Variables for colors (switch themes instantly)
2. Create auto-layout components (resize automatically)
3. Use component properties (fewer variants)
4. Duplicate and modify (faster than recreating)
5. Use keyboard shortcuts (Cmd/Ctrl + K for components)

### Common Mistakes to Avoid
- ❌ Hardcoding colors instead of using variables
- ❌ Forgetting dark mode variants
- ❌ Not using auto layout
- ❌ Creating too many variants
- ❌ Inconsistent spacing

### Best Practices
- ✅ Name layers clearly
- ✅ Group related elements
- ✅ Use constraints for responsive design
- ✅ Test components in both themes
- ✅ Document usage in descriptions

## Keyboard Shortcuts

| Action | Shortcut |
|--------|----------|
| Create component | Cmd/Ctrl + Alt + K |
| Create variant | Right-click → Add variant |
| Auto layout | Shift + A |
| Frame | F |
| Text | T |
| Rectangle | R |
| Duplicate | Cmd/Ctrl + D |
| Group | Cmd/Ctrl + G |

## Next Steps

After basic setup:

1. **Week 1**: Core components (buttons, inputs, cards)
2. **Week 2**: Form components (select, checkbox, radio)
3. **Week 3**: Overlay components (modals, dropdowns, tooltips)
4. **Week 4**: Complex components (tables, navigation, charts)

## Resources at a Glance

| Document | Purpose | When to Use |
|----------|---------|-------------|
| DESIGN_TOKENS.md | Color values, spacing, typography | Setting up variables |
| COMPONENT_SPECS.md | Component measurements | Building components |
| COMPONENT_INVENTORY.md | Available components | Planning what to build |
| STYLE_GUIDE.md | Design principles | Making design decisions |
| FIGMA_SETUP.md | Detailed instructions | Step-by-step guidance |

## Sample Component Build Order

**Session 1** (30 min):
1. Colors & typography
2. Button (all variants)
3. Input (basic states)
4. Card

**Session 2** (45 min):
5. Badge
6. Avatar
7. Select/Dropdown
8. Checkbox & Switch

**Session 3** (60 min):
9. Dialog/Modal
10. Toast/Alert
11. Table
12. Tabs

## Design Token Reference (Quick Access)

### Most Used Colors
```
Primary: #7A6A4D (light) / #B39668 (dark)
Background: #FCFCFC (light) / #272320 (dark)
Border: #EFEFEF (light) / #3F3B36 (dark)
```

### Most Used Spacing
```
Small gap: 8px
Medium gap: 16px
Large gap: 24px
Card padding: 24px
Button padding: 8px 16px
```

### Most Used Shadows
```
Card: 0 1px 2px rgba(0,0,0,0.05)
Dropdown: 0 4px 6px rgba(0,0,0,0.1)
Modal: 0 10px 15px rgba(0,0,0,0.1)
```

## Testing Checklist

Before publishing:
- [ ] All components have light AND dark mode
- [ ] Color contrast meets WCAG AA (4.5:1)
- [ ] Touch targets are 44px minimum
- [ ] Components scale properly
- [ ] Variants are clearly labeled
- [ ] Auto layout works correctly
- [ ] Documentation is complete

## Support

Questions? Refer to the detailed documentation:
- For color questions → DESIGN_TOKENS.md
- For component sizes → COMPONENT_SPECS.md
- For design decisions → STYLE_GUIDE.md
- For Figma help → FIGMA_SETUP.md
- For component list → COMPONENT_INVENTORY.md

## Version

- **Design System Version**: 1.0
- **Last Updated**: 2026-01-20
- **Component Count**: 58+
- **Theme Support**: Light & Dark

---

**Ready to start?** Open Figma, create a new file, and follow Phase 1 above!
