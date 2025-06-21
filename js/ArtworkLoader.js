// ===== ARTWORK LOADER CLASS =====
// This class manages all artwork data and creates 3D objects for paintings and sculptures
// CUSTOMIZE: Add new artworks, change positions, scales, colors, and textures here
class ArtworkLoader {
    constructor() {
        // ===== PAINTINGS DATA =====
        // CUSTOMIZE: Add/remove/modify paintings here
        // Each painting needs: type, title, artist, year, description, imageUrl, position, rotation, scale
        this.artworksData = [
            {
                type: 'painting',                              // DON'T CHANGE: Required for system to work
                title: 'La Nuit Étoilée',                     // CUSTOMIZE: Display name
                artist: 'Vincent van Gogh',                   // CUSTOMIZE: Artist name
                year: '1889',                                  // CUSTOMIZE: Year as string
                description: 'Cette œuvre emblématique de Van Gogh capture le mouvement du ciel nocturne avec des tourbillons expressifs et des couleurs vibrantes.', // CUSTOMIZE: Description text
                imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg/1280px-Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg', // CUSTOMIZE: Image URL or local path
                position: { x: -1.9, y: 2, z: 2 },           // CUSTOMIZE: 3D position (x: left/right, y: up/down, z: forward/back)
                rotation: { x: 0, y: Math.PI / 2, z: 0 },    // CUSTOMIZE: 3D rotation (y: main rotation for wall mounting)
                scale: { x: 1.5, y: 1.2, z: 1 }             // CUSTOMIZE: Size (x: width, y: height, z: depth)
            },            {
                type: 'painting',                              // DON'T CHANGE: Required for system
                title: 'La Joconde',                          // CUSTOMIZE: Mona Lisa
                artist: 'Léonard de Vinci',                   // CUSTOMIZE: Leonardo da Vinci
                year: '1503-1519',                             // CUSTOMIZE: Date range
                description: 'Portrait de Lisa Gherardini, épouse de Francesco del Giocondo. Célèbre pour son sourire énigmatique et la technique du sfumato.',
                imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg/687px-Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg',
                position: { x: 1.9, y: 2, z: 0 },            // CUSTOMIZE: Right wall position
                rotation: { x: 0, y: -Math.PI / 2, z: 0 },   // CUSTOMIZE: Facing left (-PI/2)
                scale: { x: 1.2, y: 1.6, z: 1 }             // CUSTOMIZE: Portrait proportions
            },
            {
                type: 'painting',                              // DON'T CHANGE: Required for system
                title: 'La Grande Vague',                     // CUSTOMIZE: The Great Wave
                artist: 'Katsushika Hokusai',                 // CUSTOMIZE: Japanese artist
                year: '1831',                                  // CUSTOMIZE: Publication year
                description: 'Estampe japonaise représentant une vague géante menaçant des bateaux, avec le mont Fuji en arrière-plan.',
                imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/The_Great_Wave_off_Kanagawa.jpg/1280px-The_Great_Wave_off_Kanagawa.jpg',
                position: { x: -1.9, y: 2, z: -2 },          // CUSTOMIZE: Left wall, further back
                rotation: { x: 0, y: Math.PI / 2, z: 0 },    // CUSTOMIZE: Facing right (PI/2)
                scale: { x: 2, y: 1.4, z: 1 }               // CUSTOMIZE: Wider landscape format
            },
            {
                type: 'painting',                              // DON'T CHANGE: Required for system
                title: 'Le Cri',                              // CUSTOMIZE: The Scream
                artist: 'Edvard Munch',                       // CUSTOMIZE: Norwegian artist
                year: '1893',                                  // CUSTOMIZE: Creation year
                description: 'Œuvre expressionniste représentant une figure angoissée sur un pont, devenue icône de l\'anxiété moderne.',
                imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Edvard_Munch%2C_1893%2C_The_Scream%2C_oil%2C_tempera_and_pastel_on_cardboard%2C_91_x_73_cm%2C_National_Gallery_of_Norway.jpg/800px-Edvard_Munch%2C_1893%2C_The_Scream%2C_oil%2C_tempera_and_pastel_on_cardboard%2C_91_x_73_cm%2C_National_Gallery_of_Norway.jpg',
                position: { x: 1.9, y: 2, z: -4 },           // CUSTOMIZE: Right wall, further back
                rotation: { x: 0, y: -Math.PI / 2, z: 0 },   // CUSTOMIZE: Facing left
                scale: { x: 1.2, y: 1.6, z: 1 }             // CUSTOMIZE: Portrait proportions
            },
            {
                type: 'painting',                              // DON'T CHANGE: Required for system
                title: 'Guernica',                            // CUSTOMIZE: Picasso's masterpiece
                artist: 'Pablo Picasso',                      // CUSTOMIZE: Spanish artist
                year: '1937',                                  // CUSTOMIZE: War painting
                description: 'Peinture cubiste dénonçant les horreurs de la guerre, créée en réaction au bombardement de Guernica.',
                imageUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/7/74/PicassoGuernica.jpg/1280px-PicassoGuernica.jpg',
                position: { x: -1.9, y: 2, z: -6 },          // CUSTOMIZE: Left wall, furthest back
                rotation: { x: 0, y: Math.PI / 2, z: 0 },    // CUSTOMIZE: Facing right
                scale: { x: 2.5, y: 1.2, z: 1 }             // CUSTOMIZE: Very wide landscape format
            }        ];

        // ===== SCULPTURES DATA =====
        // CUSTOMIZE: Add/remove/modify sculptures here
        // Each sculpture needs: type, title, artist, year, description, position, color
        this.sculpturesData = [
            {
                type: 'sculpture',                             // DON'T CHANGE: Required for system
                title: 'Forme Abstraite I',                   // CUSTOMIZE: Display name
                artist: 'Artiste Contemporain',               // CUSTOMIZE: Artist name
                year: '2020',                                  // CUSTOMIZE: Creation year
                description: 'Sculpture géométrique explorant les formes et les volumes dans l\'espace.',
                position: { x: -3, y: 1, z: -19 },           // CUSTOMIZE: 3D position in sculpture room
                color: 0x7f8c8d                               // CUSTOMIZE: Hex color (0x for hex notation)
            },
            {
                type: 'sculpture',                             // DON'T CHANGE: Required for system
                title: 'Équilibre',                           // CUSTOMIZE: Balance
                artist: 'Sculpteur Moderne',                  // CUSTOMIZE: Modern Sculptor
                year: '2019',                                  // CUSTOMIZE: Year
                description: 'Œuvre minimaliste questionnant l\'équilibre et la stabilité.',
                position: { x: 3, y: 1.5, z: -23 },          // CUSTOMIZE: Right side, higher position
                color: 0x34495e                               // CUSTOMIZE: Dark blue-gray color
            },
            {
                type: 'sculpture',                             // DON'T CHANGE: Required for system
                title: 'Harmonie',                            // CUSTOMIZE: Harmony
                artist: 'Créateur Visionnaire',               // CUSTOMIZE: Visionary Creator
                year: '2021',                                  // CUSTOMIZE: Recent year
                description: 'Composition géométrique évoquant l\'harmonie des formes naturelles.',
                position: { x: 0, y: 1.2, z: -21 },          // CUSTOMIZE: Center position
                color: 0x9b59b6                               // CUSTOMIZE: Purple color
            }
        ];    }    // ===== MAIN ARTWORK LOADING FUNCTION =====
    // This function loads all artworks into the scene
    // DON'T CHANGE: This handles the loading process and error handling
    loadArtworks(scene, loadingManager, callback) {
        const artworks = [];
        const textureLoader = new THREE.TextureLoader(loadingManager);
        
        let paintingsToLoad = this.artworksData.length;
        let paintingsLoaded = 0;
        
        // ===== LOAD PAINTINGS WITH TEXTURES =====
        // This attempts to load each painting's image texture
        this.artworksData.forEach((artworkData, index) => {
            console.log(`Loading painting ${index + 1}:`, artworkData.title); // DEBUG
            
            textureLoader.load(
                artworkData.imageUrl,                         // Try to load the image
                (texture) => {
                    // SUCCESS: Image loaded, create painting with texture
                    console.log(`✅ Texture loaded for: ${artworkData.title}`); // DEBUG
                    const painting = this.createPainting(artworkData, texture);
                    scene.add(painting);
                    artworks.push(painting);
                    
                    paintingsLoaded++;
                    if (paintingsLoaded === paintingsToLoad) {
                        this.finishLoading(scene, artworks, callback);
                    }
                },
                undefined,                                     // Progress callback (not used)
                (error) => {
                    // ERROR: Image failed to load, create colored placeholder
                    console.error(`❌ Error loading texture for ${artworkData.title}:`, error);
                    const placeholder = this.createPlaceholderPainting(artworkData);
                    scene.add(placeholder);
                    artworks.push(placeholder);
                    
                    paintingsLoaded++;
                    if (paintingsLoaded === paintingsToLoad) {
                        this.finishLoading(scene, artworks, callback);
                    }
                }
            );
        });
        
        // If no paintings to load, finish immediately
        if (paintingsToLoad === 0) {
            this.finishLoading(scene, artworks, callback);
        }
    }
    
    finishLoading(scene, artworks, callback) {
        // ===== LOAD SCULPTURES =====
        // Sculptures don't need textures, just geometry and colors
        this.sculpturesData.forEach((sculptureData, index) => {
            console.log(`Loading sculpture ${index + 1}:`, sculptureData.title); // DEBUG
            const sculpture = this.createSculpture(sculptureData);
            scene.add(sculpture.pedestal);                     // Add pedestal to scene
            scene.add(sculpture.sculpture);                    // Add sculpture to scene
            artworks.push(sculpture.sculpture);                // Only sculpture is clickable
        });

        console.log(`🎨 All artworks loaded! Total: ${artworks.length}`); // DEBUG
        callback(artworks);                                    // Return all artworks to gallery
    }// ===== PAINTING CREATION WITH TEXTURE =====
    // This creates a framed painting with a loaded image texture
    // CUSTOMIZE: Modify frame appearance, painting positioning, materials here
    createPainting(artworkData, texture) {
        // ----- CREATE FRAME -----
        // CUSTOMIZE: Change frame dimensions, color, material here
        const frameGeometry = new THREE.BoxGeometry(
            artworkData.scale.x + 0.2,                        // Frame width = painting width + 0.2
            artworkData.scale.y + 0.2,                        // Frame height = painting height + 0.2
            0.1                                                // Frame depth (thickness)
        );
        const frameMaterial = new THREE.MeshLambertMaterial({ 
            color: 0x8B4513                                    // CUSTOMIZE: Frame color (brown)
        });
        const frame = new THREE.Mesh(frameGeometry, frameMaterial);
        frame.userData = { isFrame: true };                    // REVERTED: Mark frame for identification
        
        // ----- CREATE PAINTING SURFACE -----
        // CUSTOMIZE: This is the actual painting with the image
        const paintingGeometry = new THREE.PlaneGeometry(
            artworkData.scale.x,                               // Painting width
            artworkData.scale.y                                // Painting height
        );
        const paintingMaterial = new THREE.MeshLambertMaterial({ 
            map: texture,                                      // Apply the loaded image texture
            transparent: true                                   // Allow transparency if image has it
        });
        const painting = new THREE.Mesh(paintingGeometry, paintingMaterial);
        painting.position.z = 0.06;                           // Position slightly in front of frame
          // ----- GROUP FRAME AND PAINTING TOGETHER -----
        const artworkGroup = new THREE.Group();
        artworkGroup.add(frame);                               // Add frame to group
        artworkGroup.add(painting);                            // Add painting to group
        
        // ----- POSITION AND ROTATE THE ARTWORK -----
        // CUSTOMIZE: This positions the artwork in 3D space
        artworkGroup.position.set(
            artworkData.position.x,                            // X: Left(-) / Right(+)
            artworkData.position.y,                            // Y: Down(-) / Up(+)
            artworkData.position.z                             // Z: Back(-) / Forward(+)
        );
        artworkGroup.rotation.set(
            artworkData.rotation.x,                            // X rotation (tilt up/down)
            artworkData.rotation.y,                            // Y rotation (turn left/right) - MOST IMPORTANT
            artworkData.rotation.z                             // Z rotation (roll left/right)
        );
        
        // ----- SET ARTWORK METADATA -----
        // DON'T CHANGE: This stores the artwork information for inspection mode
        artworkGroup.userData = artworkData;
        artworkGroup.castShadow = true;                        // Enable shadow casting
        
        return artworkGroup;
    }    // ===== PLACEHOLDER PAINTING CREATION =====
    // This creates a colored rectangle if the image fails to load
    // CUSTOMIZE: Change fallback colors, frame style here    
    createPlaceholderPainting(artworkData) {
        // ----- RANDOM COLOR SELECTION -----
        // CUSTOMIZE: Add/remove/change colors for failed image loads
        const colors = [0xff6b6b, 0x4ecdc4, 0x45b7d1, 0xf9ca24, 0xf0932b];
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        // ----- CREATE FRAME (SAME AS TEXTURED PAINTING) -----
        const frameGeometry = new THREE.BoxGeometry(
            artworkData.scale.x + 0.2, 
            artworkData.scale.y + 0.2, 
            0.1
        );
        const frameMaterial = new THREE.MeshLambertMaterial({ color: 0x8B4513 });
        const frame = new THREE.Mesh(frameGeometry, frameMaterial);
        frame.userData = { isFrame: true };                    // REVERTED: Mark frame for identification
        
        // ----- CREATE COLORED PAINTING SURFACE -----
        // This creates a solid colored rectangle instead of textured
        const paintingGeometry = new THREE.PlaneGeometry(
            artworkData.scale.x, 
            artworkData.scale.y
        );
        const paintingMaterial = new THREE.MeshLambertMaterial({ 
            color: color                                       // Use random color instead of texture
        });
        const painting = new THREE.Mesh(paintingGeometry, paintingMaterial);
        painting.position.z = 0.06;                           // Slightly in front of frame        
        // ----- GROUP AND POSITION (SAME AS TEXTURED PAINTING) -----
        const artworkGroup = new THREE.Group();
        artworkGroup.add(frame);
        artworkGroup.add(painting);
        
        artworkGroup.position.set(
            artworkData.position.x,
            artworkData.position.y,
            artworkData.position.z
        );
        artworkGroup.rotation.set(
            artworkData.rotation.x,
            artworkData.rotation.y,
            artworkData.rotation.z
        );
        
        artworkGroup.userData = artworkData;                   // Store metadata
        artworkGroup.castShadow = true;                        // Enable shadows
        
        return artworkGroup;
    }

    // ===== SCULPTURE CREATION =====
    // This creates 3D sculptures with pedestals
    // CUSTOMIZE: Change sculpture geometry, pedestal style, materials here
    createSculpture(sculptureData) {
        // ----- CREATE PEDESTAL -----
        // CUSTOMIZE: Change pedestal size, shape, color here
        const pedestalGeometry = new THREE.CylinderGeometry(
            0.8,                                               // Top radius
            0.8,                                               // Bottom radius (same = cylinder)
            0.3                                                // Height
        );
        const pedestalMaterial = new THREE.MeshLambertMaterial({ 
            color: 0x95a5a6                                    // CUSTOMIZE: Gray pedestal color
        });
        const pedestal = new THREE.Mesh(pedestalGeometry, pedestalMaterial);        pedestal.position.set(
            sculptureData.position.x,                          // X position (matches sculpture)
            0.15,                                              // Y position (half of pedestal height)
            sculptureData.position.z                           // Z position (matches sculpture)
        );
        pedestal.castShadow = true;                            // Pedestal casts shadows
        pedestal.receiveShadow = true;                         // Pedestal receives shadows
        
        // ----- CREATE SCULPTURE -----
        // CUSTOMIZE: Change sculpture geometry type, size, material here
        const sculptureGeometry = new THREE.DodecahedronGeometry(
            0.6                                                // CUSTOMIZE: Sculpture size/radius
            // OTHER GEOMETRY OPTIONS: BoxGeometry, SphereGeometry, ConeGeometry, etc.
        );
        const sculptureMaterial = new THREE.MeshPhongMaterial({ 
            color: sculptureData.color,                        // Use color from sculptureData
            shininess: 100                                     // CUSTOMIZE: How shiny/reflective (0-100)
        });
        const sculpture = new THREE.Mesh(sculptureGeometry, sculptureMaterial);
        
        // ----- POSITION SCULPTURE -----
        sculpture.position.set(
            sculptureData.position.x,                          // X position
            sculptureData.position.y,                          // Y position (on top of pedestal)
            sculptureData.position.z                           // Z position
        );
        sculpture.castShadow = true;                           // Enable shadow casting
        sculpture.userData = sculptureData;                    // Store metadata for inspection
        
        // ----- RETURN BOTH PEDESTAL AND SCULPTURE -----
        // DON'T CHANGE: Gallery needs both objects
        return { pedestal, sculpture };
    }
}
