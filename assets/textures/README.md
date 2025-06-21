# Textures Required for Virtual Art Gallery

Please add the following texture files to this directory:

## Required Textures:

### 1. Floor Texture
- **Filename**: `wood_floor.jpg` or `wood_floor.png`
- **Type**: Wood tile/parquet texture
- **Size**: 1024x1024 or 512x512 pixels
- **Description**: Seamless wood flooring texture with natural wood grain and planks. Should be tileable.
- **Suggested style**: Dark oak, walnut, or mahogany wood planks

### 2. Wall Texture  
- **Filename**: `wall_texture.jpg` or `wall_texture.png`
- **Type**: Gallery wall texture
- **Size**: 1024x1024 or 512x512 pixels
- **Description**: Subtle textured wall suitable for art gallery (could be fabric, plaster, or painted texture)
- **Suggested style**: Light gray or off-white textured wall, museum-quality finish

### 3. Ceiling Texture (Optional)
- **Filename**: `ceiling_texture.jpg` or `ceiling_texture.png`
- **Type**: Clean ceiling texture
- **Size**: 512x512 pixels
- **Description**: Clean white ceiling texture, could be smooth or slightly textured
- **Suggested style**: Clean white painted ceiling or acoustic tile

## Notes:
- All textures should be seamlessly tileable
- JPG or PNG format preferred
- Power-of-2 dimensions (512x512, 1024x1024, etc.) for better WebGL performance
- Avoid textures with harsh lighting or shadows baked in
- Keep file sizes reasonable for web loading (under 2MB each)

## Usage:
These textures will be automatically loaded and applied to:
- Floor: Wood texture repeated across all floor surfaces
- Walls: Subtle texture on all gallery walls
- Ceiling: Clean finish on ceiling surfaces
