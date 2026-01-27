# ContainerIQ Design System

## Spacing Standards

### Component Padding
- **Cards**: `p-5` (20px)
- **Page containers**: `p-6` (24px)
- **Sidebar logo area**: `px-4 py-5`
- **Sidebar nav**: `px-3`
- **TopBar**: `px-6` (24px)

### Component Gaps
- **KPI Card Grid**: `gap-4` (16px)
- **Page sections**: `space-y-5` (20px)
- **Menu items**: `mb-0.5` (2px)
- **Internal card spacing**: `mb-3` (12px)

### Element Sizing
- **Logo height**: `h-8` (32px)
- **TopBar height**: `h-16` (64px)
- **Sidebar width**: `w-64` (256px)
- **Icon sizes (cards)**: `w-8 h-8` (32px)
- **Icon sizes (topbar)**: `w-4-5 h-4-5` (16-20px)

## Typography Scale

### Headings
- **Page title**: `text-base font-semibold` (16px)
- **Card title**: `text-xs font-medium` (12px)

### Body Text
- **Primary value**: `text-2xl font-bold` (24px)
- **Secondary info**: `text-xs` (12px)
- **Menu items**: `text-sm font-medium` (14px)
- **Search input**: `text-sm` (14px)

## Border Radius
- **Cards**: `rounded-xl` (12px)
- **Buttons/Inputs**: `rounded-lg` (8px)

## Interactive States
- All clickable elements: `cursor-pointer`
- Hover states: `hover:bg-gray-100`, `hover:shadow-lg`
- Focus states: `focus:ring-2 focus:ring-primary-teal`
- Transitions: `transition-colors`, `transition-shadow`

## Layout
- **Sidebar**: Fixed, left-aligned, full height
- **TopBar**: Fixed, spans remaining width
- **Main content**: Offset by sidebar width and topbar height
- **Background**: `bg-gray-50` for main area, `bg-bg-white` for cards

## Notes
- Keep components small and focused (< 50 lines)
- Maintain consistent spacing ratios
- Use Tailwind's spacing scale (4px increments)
- Prefer smaller, tighter spacing for modern look
