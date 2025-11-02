# 🔥 Concert Countdown - 5 Days Left!

An interactive, animated countdown featuring a massive burning "5" with state-of-the-art flame effects.

## Features

### 🎭 Interactive Experience
- **Tap to Reveal**: Start with a mysterious tap screen
- **Dramatic Reveal**: Screen transitions with scaling and fade effects
- **Screen Shake**: Impact effect when countdown is revealed

### 🔥 Burning Effects
- **Animated Flames**: Real-time particle-based fire simulation using HTML5 Canvas
- **Burning Number**: The big "5" features:
  - Animated fire gradient that shifts through red, orange, and yellow
  - Flickering effect for realism
  - Glowing text shadows
- **Floating Sparks**: Continuous particle effects around the number
- **Dynamic Fire Particles**: 150+ animated flame particles rising from the bottom

### 🎨 Visual Design
- **Massive Typography**: The "5" scales responsively (45vw on desktop, 60vw on mobile)
- **Professional Fonts**: Uses Bebas Neue for the number and Oswald for text
- **Color Palette**: Fire-inspired gradients from deep red to bright yellow
- **Layered Effects**: Multiple z-index layers for depth

## How to Run

### Quick Start
```bash
# Navigate to the project directory
cd /home/bogdan/work_area/countdown_anton

# Run the Python server
python3 serve.py

# Open in browser
# Go to http://localhost:8000
```

### Alternative Methods
1. **Direct File**: Open `index.html` directly in any modern browser
2. **Live Server**: Use VS Code Live Server extension
3. **Node.js**: `npx http-server`

## Technical Details

### Technologies Used
- **HTML5 Canvas**: For realistic flame particle animation
- **CSS3 Animations**: For text effects, gradients, and transitions
- **Vanilla JavaScript**: No dependencies, pure JS for interactions
- **Web Animations API**: For smooth particle movements

### Performance Optimizations
- Hardware-accelerated CSS transforms
- Efficient particle recycling system
- Responsive canvas sizing
- Optimized animation frame rates

### Browser Compatibility
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile browsers (iOS Safari, Chrome Mobile)

## Customization

### Change Countdown Number
Edit line in `index.html`:
```html
<div class="big-number">5</div>
```

### Adjust Flame Intensity
Modify particle count in JavaScript:
```javascript
for (let i = 0; i < 150; i++) {  // Change 150 to increase/decrease flames
```

### Customize Colors
Update the gradient in CSS:
```css
background: linear-gradient(
    45deg,
    #ff0000,  /* Start color */
    #ffff00   /* End color */
);
```

## File Structure
```
countdown_anton/
├── index.html    # Main countdown page with all code
├── serve.py      # Python development server
└── README.md     # Documentation
```

Enjoy the burning countdown! 🎸🔥