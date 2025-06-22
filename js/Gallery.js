// ===== MAIN GALLERY CLASS =====
// This is the central controller for the entire Virtual Art Gallery
// It manages the 3D scene, camera, lighting, and coordinates all other components
// 
// CUSTOMIZE OVERVIEW:
// - Scene setup: lighting, camera, renderer settings
// - Gallery structure: walls, floors, ceilings
// - Artwork loading and positioning  
// - Navigation controls and interaction
// - Inspection mode for detailed artwork viewing
//
// OTHER FILES TO CUSTOMIZE:
// - ArtworkLoader.js: Add/modify paintings and sculptures
// - GalleryBuilder.js: Change gallery architecture  
// - MovementController.js: Adjust movement speed and controls
// - InspectionMode.js: Modify artwork inspection behavior
// - UIController.js: Change interface elements
// - style.css: Modify visual appearance and layout


class Gallery {
    constructor() {
        // ===== CORE THREE.JS COMPONENTS =====
        this.scene = null;                                     // 3D scene container
        this.camera = null;                                    // Player's viewpoint
        this.renderer = null;                                  // Renders 3D to canvas
        this.controls = null;                                  // First-person controls
        this.loadingManager = new THREE.LoadingManager();     // Handles asset loading
        this.artworks = [];                                    // Array of all artworks

        // ===== COMPONENT CLASSES =====
        // DON'T CHANGE: These handle specific functionality
        this.movementController = new MovementController();    // Player movement
        this.inspectionMode = new InspectionMode();            // Artwork inspection
        this.artworkLoader = new ArtworkLoader();              // Loads paintings/sculptures
        this.uiController = new UIController();                // User interface

        this.init();                                           // Start initialization
    }    // ===== INITIALIZATION SEQUENCE =====
    // DON'T CHANGE: This calls all setup functions in correct order
    init() {
        this.setupScene();
        this.setupRenderer();
        this.setupCamera();
        this.setupControls();
        this.setupLighting();
        this.setupLoadingManager();
        this.setupEventListeners();

        this.createGalleryStructure();
        // loadArtworks is now called separately as it's async
    }

    setupScene() {
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x1a1a1a);
    }

    setupRenderer() {
        const canvas = document.getElementById('gallery-canvas');
        this.renderer = new THREE.WebGLRenderer({
            canvas: canvas,
            antialias: true
        });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        this.renderer.setClearColor(0x1a1a1a);
    }    
    
    setupCamera() {
        this.camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );
        // Start in the center of the long hallway (centered at z = -11)
        this.camera.position.set(0, 1.6, -11);
    }

    setupControls() {
        this.controls = new THREE.PointerLockControls(this.camera, this.renderer.domElement);
        this.scene.add(this.controls.getObject());
        this.movementController.setControls(this.controls);
    }    
      setupLighting() {
        // Brightened ambient light for better overall illumination
        const ambientLight = new THREE.AmbientLight(0x404040, 0.2);
        this.scene.add(ambientLight);

        // Create a 2-column grid of point lights for the long hallway
        // Hallway dimensions: 12 wide x 32 long, centered at z = -11
        const gridRows = 5; // 8 rows along the length (32 units / 4 = 8)
        const gridCols = 2; // 2 columns across the width 
        const spacingX = 6; // 6 units between lights along X 
        const spacingZ = 6; // 6 units between lights along Z 
        
        // Calculate starting positions to center the grid
        const startX = -((gridCols - 1) * spacingX) / 2; // Center on X axis: -2, +2
        const startZ = 5 - ((gridRows - 1) * spacingZ) / 2; // Start from entrance: z = 5 to z = -27

        console.log(`🔧 Creating ${gridRows}x${gridCols} light grid for long hallway`);
        console.log(`🔧 Grid starts at X: ${startX}, Z: ${startZ}`);

        for (let row = 0; row < gridRows; row++) {
            for (let col = 0; col < gridCols; col++) {
                const x = startX + col * spacingX;
                const z = startZ - row * spacingZ; // Subtract to go towards back of hallway
                
                const pointLight = new THREE.PointLight(0xffffff, 0.3, 50);
                pointLight.position.set(x, 4, z+8);
                pointLight.castShadow = false;
                this.scene.add(pointLight);

                // Add visual indicators
                // const arrowDir = new THREE.Vector3(0, -1, 0);
                // const arrowLength = 0.5;
                // const arrowColor = 0xff0000;
                // const arrowHelper = new THREE.ArrowHelper(
                //     arrowDir,
                //     pointLight.position,
                //     arrowLength,
                //     arrowColor
                // );
                // this.scene.add(arrowHelper);

                // // Add small sphere markers
                // const sphereGeometry = new THREE.SphereGeometry(0.08, 16, 16);
                // const sphereMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
                // const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
                // sphere.position.copy(pointLight.position);
                // this.scene.add(sphere);
                
                // console.log(`💡 Light ${row * gridCols + col + 1}/${gridRows * gridCols} at (${x}, 4, ${z})`);
            }
        }

        console.log(`✅ Created long hallway lighting grid with ${gridRows * gridCols} lights`);
    }

    setupLoadingManager() {
        this.loadingManager.onLoad = () => {
            this.uiController.hideLoadingScreen();
            // Auto-start movement after loading is complete
            setTimeout(() => {
                this.uiController.autoStartMovement(this.controls);
            }, 500);
        };

        this.loadingManager.onProgress = (url, loaded, total) => {
            console.log(`Loading: ${loaded}/${total} - ${url}`);
        };
    }

    setupEventListeners() {
        // Window resize
        window.addEventListener('resize', () => {
            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(window.innerWidth, window.innerHeight);

            // Update inspection camera if exists
            if (this.inspectionMode.camera) {
                this.inspectionMode.camera.aspect = window.innerWidth / window.innerHeight;
                this.inspectionMode.camera.updateProjectionMatrix();
            }
        });

        // Pointer lock controls
        this.uiController.setupPointerLockUI(this.controls);

        // Movement controls
        this.movementController.setupEventListeners();

        // Artwork interaction
        this.renderer.domElement.addEventListener('click', (event) => {
            if (this.controls.isLocked && !this.inspectionMode.isActive) {
                this.handleArtworkClick(event);
            }
        });

        // Inspection mode controls
        this.inspectionMode.onExit = () => {
            this.exitInspectionMode();
        };
    }    createGalleryStructure() {
        const galleryBuilder = new GalleryBuilder();
        galleryBuilder.createFloors(this.scene);
        galleryBuilder.createWalls(this.scene);
        galleryBuilder.createCeilings(this.scene);
    }async loadArtworks() {
        await this.artworkLoader.loadArtworks(this.scene, this.loadingManager, (artworks) => {
            this.artworks = artworks;
            console.log('Loaded artworks:', this.artworks.length); // DEBUG
            console.log('Artwork types:', this.artworks.map(a => a.userData?.type || 'no-type')); // DEBUG
        });
    }

    // ===== ARTWORK INTERACTION SYSTEM =====
    // This handles clicking on artworks to enter inspection mode
    handleArtworkClick(event) {
        console.log('Artwork click handler triggered'); // DEBUG
        console.log('Controls locked:', this.controls.isLocked); // DEBUG
        console.log('Inspection mode active:', this.inspectionMode.isActive); // DEBUG

        const artwork = this.getClickedArtwork(event);
        if (artwork) {
            console.log('Found artwork, entering inspection mode:', artwork.userData.title); // DEBUG
            this.enterInspectionMode(artwork);
        } else {
            console.log('No artwork found to inspect'); // DEBUG
        }
    }    // ===== RAYCASTING FOR ARTWORK DETECTION =====
    // This function detects which artwork the user clicked on
    // CUSTOMIZE: Modify raycasting logic here if you want to change click detection
    getClickedArtwork(event) {
        // Convert mouse coordinates to normalized device coordinates (-1 to +1)
        const mouse = new THREE.Vector2();
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

        // Create raycaster from camera through mouse position
        const raycaster = new THREE.Raycaster();
        raycaster.setFromCamera(mouse, this.camera);

        // Find all intersections with artwork objects
        const intersects = raycaster.intersectObjects(this.artworks, true);

        console.log('Click detected, intersects found:', intersects.length); // DEBUG

        if (intersects.length > 0) {
            for (let i = 0; i < intersects.length; i++) {
                const clickedObject = intersects[i].object;
                let artwork = clickedObject;

                console.log('Checking intersect', i, 'clicked object:', clickedObject); // DEBUG

                // Traverse up the object hierarchy to find the main artwork group
                // This ensures we get the parent artwork whether user clicks frame or painting
                while (artwork && (!artwork.userData || !artwork.userData.type)) {
                    artwork = artwork.parent;
                    console.log('Traversing to parent:', artwork?.userData); // DEBUG
                }

                // Check if we found a valid artwork
                if (artwork && artwork.userData && artwork.userData.type) {
                    console.log('Found artwork with userData:', artwork.userData); // DEBUG
                    console.log('Artwork type:', artwork.userData.type); // DEBUG
                    return artwork;
                }
            }
        }

        console.log('No valid artwork found'); // DEBUG
        return null;
    }

    // ===== INSPECTION MODE ENTRY =====
    // This switches from first-person navigation to artwork inspection
    enterInspectionMode(artwork) {
        // Unlock pointer controls immediately
        this.controls.unlock();

        // Enter inspection mode
        this.inspectionMode.enter(artwork, this.renderer);
        this.uiController.showArtworkInfo(artwork.userData);
    }    exitInspectionMode() {
        this.inspectionMode.exit();
        this.uiController.hideArtworkInfo();

        // Simple and reliable re-lock after short delay
        setTimeout(() => {
            if (!this.inspectionMode.isActive) {
                this.uiController.resetCursorToCenter();
                this.controls.lock();
            }
        }, 100);
    }

    animate() {
        requestAnimationFrame(() => this.animate());

        if (this.inspectionMode.isActive) {
            this.inspectionMode.update();
            this.inspectionMode.render(this.renderer);
        } else {
            this.movementController.update();
            this.renderer.render(this.scene, this.camera);
        }
    }

    start() {
        this.animate();
    }
}
