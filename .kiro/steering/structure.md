# Project Structure

## File Organization

```
/
├── index.html          # Main HTML file with all page sections
├── styles.css          # Complete stylesheet with all components
├── script.js           # All JavaScript functionality
├── .kiro/              # Kiro IDE configuration
└── .vscode/            # VS Code settings
```

## HTML Structure

The `index.html` file contains all page sections in a single-page application format:

- **Navigation**: Fixed header with responsive hamburger menu
- **Hero Section**: Landing area with typing animation and CTA buttons
- **About Section**: Personal bio, skills grid, and CV timeline
- **Projects Section**: Filterable project showcase with overlay effects
- **Contact Section**: Contact information and functional form
- **Footer**: Social links and copyright

## CSS Architecture

The `styles.css` file is organized in logical sections:

1. **Reset & Variables**: CSS reset and custom properties
2. **Base Styles**: Typography and global styles
3. **Navigation**: Header and menu styles
4. **Hero Section**: Landing page styling
5. **About Section**: Bio, skills, and timeline components
6. **Projects Section**: Project cards and filtering
7. **Contact Section**: Contact form and info styling
8. **Footer**: Bottom section styling
9. **Animations**: Keyframe animations and transitions
10. **Responsive**: Media queries for different screen sizes

## JavaScript Modules

The `script.js` file contains modular functions:

- **Navigation**: Mobile menu, scroll effects, active link highlighting
- **Animations**: Typing effect, scroll animations, parallax
- **Interactions**: Project filtering, form handling, smooth scrolling
- **Utilities**: Throttling, validation, notifications

## Design Patterns

### CSS Patterns

- CSS Custom Properties for consistent theming
- BEM-like naming conventions for components
- Mobile-first responsive design approach
- Component-based organization

### JavaScript Patterns

- Module pattern with init functions
- Event delegation for dynamic content
- Progressive enhancement
- Intersection Observer for scroll animations

## Content Structure

- Personal information is embedded directly in HTML
- Project data is hardcoded but easily extractable to JSON
- Contact information uses placeholder email/links
- All text content is in English

## Responsive Breakpoints

- Mobile: < 768px (hamburger menu, single column)
- Tablet: 768px - 1024px (adjusted grid layouts)
- Desktop: > 1024px (full multi-column layouts)
