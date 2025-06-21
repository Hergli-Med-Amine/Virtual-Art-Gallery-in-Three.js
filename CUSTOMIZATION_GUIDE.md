# 🎨 Virtual Art Gallery - Customization Guide

This guide explains how to customize every aspect of your Virtual Art Gallery. The code is heavily commented to help you understand what each part does.

## 📁 File Structure & What Each File Does

```
Virtual-Art-Gallery/
├── index.html              # Main HTML page
├── style.css               # All visual styling
├── main.js                 # App initialization (minimal)
├── js/
│   ├── Gallery.js          # Main controller (scene, camera, lighting)
│   ├── ArtworkLoader.js    # Paintings & sculptures data/creation
│   ├── GalleryBuilder.js   # Walls, floors, ceilings
│   ├── MovementController.js # First-person navigation
│   ├── InspectionMode.js   # Detailed artwork viewing
│   └── UIController.js     # User interface elements
└── README.md               # Basic project info
```

## 🖼️ Adding/Modifying Artworks

### **File: `js/ArtworkLoader.js`**

#### Adding a New Painting
```javascript
// Add to the artworksData array:
{
    type: 'painting',                    // DON'T CHANGE
    title: 'Your Painting Title',       // Display name
    artist: 'Artist Name',              // Artist name
    year: '2024',                        // Year as string
    description: 'Your description...',  // Info panel text
    imageUrl: 'https://your-image-url.jpg', // Image URL or local path
    position: { x: -1.9, y: 2, z: 2 },  // 3D position
    rotation: { x: 0, y: Math.PI / 2, z: 0 }, // Rotation (y is main)
    scale: { x: 1.5, y: 1.2, z: 1 }     // Size (width, height, depth)
}
```

#### Adding a New Sculpture
```javascript
// Add to the sculpturesData array:
{
    type: 'sculpture',                   // DON'T CHANGE
    title: 'Your Sculpture Title',      // Display name
    artist: 'Sculptor Name',            // Artist name
    year: '2024',                        // Year
    description: 'Your description...',  // Info panel text
    position: { x: 0, y: 1.2, z: -21 }, // 3D position
    color: 0x9b59b6                     // Hex color (0x prefix)
}
```

#### Positioning Guide
- **X axis**: Left (negative) ↔ Right (positive)
- **Y axis**: Down (negative) ↔ Up (positive)  
- **Z axis**: Back (negative) ↔ Forward (positive)

#### Rotation Guide
- **Y rotation**: Main rotation for wall-mounted paintings
  - `0`: Facing forward
  - `Math.PI / 2`: Facing right (left wall)
  - `-Math.PI / 2`: Facing left (right wall)
  - `Math.PI`: Facing backward

## 🏛️ Gallery Architecture

### **File: `js/GalleryBuilder.js`**

#### Customizing Gallery Dimensions
```javascript
// In createFloors(), createWalls(), createCeilings() functions:
// Change these values to resize the gallery spaces

// Hallway dimensions
const hallwayLength = 15;    // How long the entrance hallway is
const hallwayWidth = 4;      // How wide the hallway is

// Sculpture room dimensions  
const roomWidth = 12;        // Width of the sculpture room
const roomLength = 8;        // Length of the sculpture room
```

#### Changing Materials/Colors
```javascript
// Floor material
const floorMaterial = new THREE.MeshLambertMaterial({ 
    color: 0x8B4513  // Change this hex color
});

// Wall material
const wallMaterial = new THREE.MeshLambertMaterial({ 
    color: 0xf0f0f0  // Change this hex color
});
```

## 🎮 Movement & Navigation

### **File: `js/MovementController.js`**

#### Adjusting Movement Speed
```javascript
this.moveSpeed = 15.0;  // Change this value (higher = faster)
```

#### Changing Key Bindings
```javascript
// In setupEventListeners(), modify these cases:
case 'KeyW':        // Forward key
case 'KeyS':        // Backward key  
case 'KeyA':        // Left key
case 'KeyD':        // Right key
```

#### Adjusting Boundaries
```javascript
// In applyBoundaries(), change these limits:
if (position.x > 1.5) position.x = 1.5;    // Right boundary
if (position.x < -1.5) position.x = -1.5;  // Left boundary
if (position.z > 5) position.z = 5;        // Forward boundary
if (position.z < -26.5) position.z = -26.5; // Back boundary
```

## 💡 Lighting

### **File: `js/Gallery.js` - setupLighting() function**

#### Adjusting Ambient Light
```javascript
const ambientLight = new THREE.AmbientLight(
    0x404040,  // Color (darker = more dramatic)
    0.6        // Intensity (0-1, higher = brighter)
);
```

#### Modifying Directional Light
```javascript
const directionalLight = new THREE.DirectionalLight(
    0xffffff,  // Color (white)
    1.0        // Intensity
);
directionalLight.position.set(10, 10, 5);  // Light position
```

## 🎨 Visual Styling

### **File: `style.css`**

#### Changing Crosshair Appearance
```css
.crosshair {
    width: 20px;                    /* Size */
    height: 20px;
    border: 2px solid rgba(255, 255, 255, 0.9); /* Color & thickness */
    border-radius: 50%;             /* Shape (50% = circle) */
}
```

#### Modifying Info Panel
```css
.info-panel {
    background: rgba(0, 0, 0, 0.9); /* Background color/transparency */
    border-radius: 15px;            /* Rounded corners */
    padding: 2rem;                  /* Internal spacing */
    max-width: 400px;               /* Maximum width */
}
```

#### Changing Loading Screen
```css
.loading-content h1 {
    color: #d4af37;                 /* Title color (gold) */
    font-size: 2.5rem;              /* Title size */
}

.loading-spinner {
    border-top: 3px solid #d4af37;  /* Spinner color */
}
```

## 🔍 Inspection Mode

### **File: `js/InspectionMode.js`**

#### Adjusting Camera Limits
```javascript
this.controls.minDistance = 1.5;  // Closest zoom
this.controls.maxDistance = 8;     // Furthest zoom
```

#### Changing Inspection Lighting
```javascript
// In setupInspectionLighting():
const ambientLight = new THREE.AmbientLight(0x404040, 0.8);  // Ambient intensity
const directionalLight = new THREE.DirectionalLight(0xffffff, 1.2);  // Main light intensity
```

#### Modifying Painting Frame in Inspection
```javascript
// In createInspectionPainting():
const canvasBackGeometry = new THREE.BoxGeometry(2.5, 2, 0.1);  // Canvas size & thickness
const canvasBackMaterial = new THREE.MeshLambertMaterial({ 
    color: 0xf8f8f8  // Canvas backing color
});
```

## 🖼️ Frame Customization

### **File: `js/ArtworkLoader.js`**

#### Changing Frame Appearance
```javascript
// In createPainting() and createPlaceholderPainting():
const frameMaterial = new THREE.MeshLambertMaterial({ 
    color: 0x8B4513  // Frame color (brown)
});

// Frame thickness
const frameGeometry = new THREE.BoxGeometry(
    artworkData.scale.x + 0.2,  // Frame width (painting + 0.2)
    artworkData.scale.y + 0.2,  // Frame height (painting + 0.2)  
    0.1                         // Frame depth (thickness)
);
```

## 🎪 Sculpture Customization

### **File: `js/ArtworkLoader.js` - createSculpture() function**

#### Changing Sculpture Geometry
```javascript
// Current: Dodecahedron (12-sided polyhedron)
const sculptureGeometry = new THREE.DodecahedronGeometry(0.6);

// Other options:
const sculptureGeometry = new THREE.BoxGeometry(1, 1, 1);           // Cube
const sculptureGeometry = new THREE.SphereGeometry(0.6);            // Sphere
const sculptureGeometry = new THREE.ConeGeometry(0.6, 1.2);         // Cone
const sculptureGeometry = new THREE.CylinderGeometry(0.6, 0.6, 1);  // Cylinder
const sculptureGeometry = new THREE.TorusGeometry(0.6, 0.2);        // Donut
```

#### Modifying Pedestal
```javascript
const pedestalGeometry = new THREE.CylinderGeometry(
    0.8,  // Top radius
    0.8,  // Bottom radius  
    0.3   // Height
);
const pedestalMaterial = new THREE.MeshLambertMaterial({ 
    color: 0x95a5a6  // Pedestal color (gray)
});
```

## 🎯 Common Customizations

### Adding Your Own Images
1. Upload images to a hosting service (imgur, your own server, etc.)
2. Copy the direct image URL
3. Replace the `imageUrl` in `ArtworkLoader.js`
4. Or use local images: `imageUrl: './images/your-image.jpg'`

### Changing Gallery Size
1. Modify dimensions in `GalleryBuilder.js`
2. Adjust movement boundaries in `MovementController.js`
3. Update artwork positions in `ArtworkLoader.js`

### Adding More Rooms
1. Extend the gallery structure in `GalleryBuilder.js`
2. Add new artwork positions in `ArtworkLoader.js`
3. Update movement boundaries in `MovementController.js`

### Changing Color Scheme
1. Update CSS colors in `style.css`
2. Modify material colors in all `.js` files
3. Change lighting colors in `Gallery.js`

## 🐛 Troubleshooting

### Images Not Loading
- Check if the `imageUrl` is accessible
- Check browser console for errors
- Verify CORS permissions for external images

### Movement Issues
- Check boundary limits in `MovementController.js`
- Verify camera height settings
- Test movement speed values

### Positioning Problems
- Use console.log to debug positions
- Check rotation values (use multiples of Math.PI/2)
- Verify scale values are positive

## 🎨 Color Reference

Common colors in hex format:
- `0xffffff` - White
- `0x000000` - Black  
- `0xff0000` - Red
- `0x00ff00` - Green
- `0x0000ff` - Blue
- `0xffd700` - Gold
- `0x8B4513` - Brown (frame color)
- `0x95a5a6` - Gray (pedestal color)

## 📱 Making It Responsive

The gallery includes responsive CSS for mobile devices. Customize breakpoints in `style.css`:

```css
@media (max-width: 768px) {
    /* Tablet and mobile styles */
}

@media (max-width: 480px) {
    /* Mobile-specific styles */
}
```

Happy customizing! 🎨✨
