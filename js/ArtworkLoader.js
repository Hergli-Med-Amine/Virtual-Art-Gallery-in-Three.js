// ===== ARTWORK LOADER CLASS =====
// This class manages all artwork data and creates 3D objects for paintings and sculptures
// Data is now loaded from JSON files in /assets/data/
class ArtworkLoader {
    constructor() {
        // Data will be loaded from JSON files
        this.artworksData = [];
        this.sculpturesData = [];
    }

    // Load artwork data from JSON files
    async loadArtworkData() {
        try {
            // Load paintings data
            const paintingsResponse = await fetch('assets/data/paintings.json');
            this.artworksData = await paintingsResponse.json();
            
            // Load sculptures data  
            const sculpturesResponse = await fetch('assets/data/sculptures.json');
            this.sculpturesData = await sculpturesResponse.json();
            
            // Convert color strings back to hex numbers for sculptures
            this.sculpturesData.forEach(sculpture => {
                if (typeof sculpture.color === 'string') {
                    sculpture.color = parseInt(sculpture.color, 16);
                }
            });
            
            console.log('✅ Artwork data loaded from JSON files');
            console.log(`📋 Loaded ${this.artworksData.length} paintings and ${this.sculpturesData.length} sculptures`);
            
        } catch (error) {
            console.error('❌ Failed to load artwork data:', error);
            // Fallback: use empty arrays, gallery will still load without artworks
            this.artworksData = [];
            this.sculpturesData = [];
        }
    }// ===== MAIN ARTWORK LOADING FUNCTION =====
    // This function loads all artworks into the scene    // ===== MAIN ARTWORK LOADING FUNCTION =====
    // This function loads artwork data from JSON and creates 3D objects
    async loadArtworks(scene, loadingManager, callback) {
        // First load the JSON data
        await this.loadArtworkData();
        
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
        // Sculptures can be either procedural or GLTF models
        let sculpturesToLoad = this.sculpturesData.length;
        let sculpturesLoaded = 0;
        
        if (sculpturesToLoad === 0) {
            console.log(`🎨 All artworks loaded! Total: ${artworks.length}`);
            callback(artworks);
            return;
        }
        
        this.sculpturesData.forEach((sculptureData, index) => {
            console.log(`Loading sculpture ${index + 1}:`, sculptureData.title);
            
            if (sculptureData.modelUrl) {
                // Load GLTF model
                this.loadGLTFSculpture(sculptureData, scene, artworks, () => {
                    sculpturesLoaded++;
                    if (sculpturesLoaded === sculpturesToLoad) {
                        console.log(`🎨 All artworks loaded! Total: ${artworks.length}`);
                        callback(artworks);
                    }
                });
            } else {
                // Create procedural sculpture
                const sculpture = this.createSculpture(sculptureData);
                scene.add(sculpture.pedestal);
                scene.add(sculpture.sculpture);
                artworks.push(sculpture.sculpture);
                
                sculpturesLoaded++;
                if (sculpturesLoaded === sculpturesToLoad) {
                    console.log(`🎨 All artworks loaded! Total: ${artworks.length}`);
                    callback(artworks);
                }
            }
        });
    }

    // ===== GLTF SCULPTURE LOADING =====
    // This loads 3D models from GLTF files
    loadGLTFSculpture(sculptureData, scene, artworks, onComplete) {
        // Check if GLTFLoader is available
        if (typeof THREE.GLTFLoader === 'undefined') {
            console.error('❌ GLTFLoader not available. Please include GLTFLoader in your HTML.');
            // Fallback to procedural sculpture
            const sculpture = this.createSculpture(sculptureData);
            scene.add(sculpture.pedestal);
            scene.add(sculpture.sculpture);
            artworks.push(sculpture.sculpture);
            onComplete();
            return;
        }
        
        const loader = new THREE.GLTFLoader();
        
        loader.load(
            sculptureData.modelUrl,
            (gltf) => {
                console.log(`✅ GLTF loaded for: ${sculptureData.title}`);
                
                // Create pedestal
                const pedestal = this.createPedestal(sculptureData);
                scene.add(pedestal);
                
                // Process the loaded model
                const model = gltf.scene;
                
                // Apply scale if specified
                if (sculptureData.scale) {
                    model.scale.set(
                        sculptureData.scale.x,
                        sculptureData.scale.y,
                        sculptureData.scale.z
                    );
                }
                
                // Position the model
                model.position.set(
                    sculptureData.position.x,
                    sculptureData.position.y,
                    sculptureData.position.z
                );
                  // Enable shadows and apply white color
                model.traverse((child) => {
                    if (child.isMesh) {
                        child.castShadow = true;
                        child.receiveShadow = true;
                        
                        // Force white color for the sculpture
                        if (sculptureData.color) {
                            const color = typeof sculptureData.color === 'string' 
                                ? parseInt(sculptureData.color, 16) 
                                : sculptureData.color;
                            
                            // Replace the material with white
                            child.material = new THREE.MeshLambertMaterial({
                                color: color
                            });
                            
                            console.log(`🎨 Applied white color to sculpture mesh: ${color.toString(16)}`);
                        }
                    }
                });
                
                // Store metadata
                model.userData = sculptureData;
                
                scene.add(model);
                artworks.push(model);
                onComplete();
            },
            (progress) => {
                console.log(`Loading progress for ${sculptureData.title}:`, progress);
            },
            (error) => {
                console.error(`❌ Error loading GLTF for ${sculptureData.title}:`, error);
                // Fallback to procedural sculpture
                const sculpture = this.createSculpture(sculptureData);
                scene.add(sculpture.pedestal);
                scene.add(sculpture.sculpture);
                artworks.push(sculpture.sculpture);
                onComplete();
            }
        );
    }

    // ===== PEDESTAL CREATION =====
    // Separate pedestal creation for GLTF sculptures
    createPedestal(sculptureData) {
        const pedestalGeometry = new THREE.CylinderGeometry(0.8, 0.8, 0.3);
        const pedestalMaterial = new THREE.MeshLambertMaterial({ color: 0x95a5a6 });
        const pedestal = new THREE.Mesh(pedestalGeometry, pedestalMaterial);
        
        pedestal.position.set(
            sculptureData.position.x,
            0.15,
            sculptureData.position.z
        );
        pedestal.castShadow = true;
        pedestal.receiveShadow = true;
        
        return pedestal;
    }// ===== PAINTING CREATION WITH TEXTURE =====
    // This creates a framed painting with a loaded image texture
    // CUSTOMIZE: Modify frame appearance, painting positioning, materials here
    createPainting(artworkData, texture) {
        // ----- CREATE FRAME -----
        // CUSTOMIZE: Change frame dimensions, color, material here
        const frameGeometry = new THREE.BoxGeometry(
            artworkData.scale.x + 0.1,                        // Frame width = painting width + 0.2
            artworkData.scale.y + 0.1,                        // Frame height = painting height + 0.2
            0.02                                          // Frame depth (thickness)
        );
        const frameMaterial = new THREE.MeshLambertMaterial({ 
            color: 0xdac4aa                                   // CUSTOMIZE: Frame color (brown)
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
        painting.position.z = 0.03;                           // Position slightly in front of frame
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
