// Inspection Mode class
class InspectionMode {
    constructor() {
        this.isActive = false;
        this.scene = null;
        this.camera = null;
        this.controls = null;
        this.artwork = null;
        this.onExit = null;
    }

    enter(artwork, renderer) {
        this.isActive = true;

        // Create inspection scene
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x2a2a2a);

        // Create inspection camera
        this.camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );
        this.camera.position.set(0, 0, 3);
        this.camera.lookAt(0, 0, 0);

        // Setup lighting for inspection
        this.setupInspectionLighting();

        // Create artwork copy for inspection
        this.createInspectionArtwork(artwork);

        // Setup orbit controls
        this.controls = new THREE.OrbitControls(this.camera, renderer.domElement);
        this.controls.enableDamping = true;
        this.controls.dampingFactor = 0.05;
        this.controls.minDistance = 1.5;
        this.controls.maxDistance = 8;
        this.controls.target.set(0, 0, 0);
        this.controls.enabled = true;
    }    setupInspectionLighting() {
        // Ambient light
        const ambientLight = new THREE.AmbientLight(0x404040, 0.8);
        this.scene.add(ambientLight);

        // Main light
        const directionalLight = new THREE.DirectionalLight(0xffffff, 1.2);
        directionalLight.position.set(5, 5, 5);
        this.scene.add(directionalLight);

        // Fill light
        const fillLight = new THREE.DirectionalLight(0xffffff, 0.5);
        fillLight.position.set(-5, 3, 3);
        this.scene.add(fillLight);

        // Rim light
        const rimLight = new THREE.DirectionalLight(0xffffff, 0.3);
        rimLight.position.set(0, 0, -5);
        this.scene.add(rimLight);

        // Add reference grid and environment elements
        this.addInspectionEnvironment();
    }    addInspectionEnvironment() {
        // Create subtle background reference planes (box effect)
        this.addBackgroundPlanes();

        // Add inspection platform/pedestal indicator
        this.addInspectionPlatform();
    }

    addBackgroundPlanes() {
        // Semi-transparent background planes for depth reference
        const planeGeometry = new THREE.PlaneGeometry(8, 8);
        const planeMaterial = new THREE.MeshLambertMaterial({
            color: 0x333333,
            transparent: true,
            opacity: 0.1,
            side: THREE.DoubleSide
        });

        // Back plane
        const backPlane = new THREE.Mesh(planeGeometry, planeMaterial);
        backPlane.position.z = -4;
        this.scene.add(backPlane);

        // Side planes
        const leftPlane = new THREE.Mesh(planeGeometry, planeMaterial);
        leftPlane.position.x = -4;
        leftPlane.rotation.y = Math.PI / 2;
        this.scene.add(leftPlane);

        const rightPlane = new THREE.Mesh(planeGeometry, planeMaterial);
        rightPlane.position.x = 4;
        rightPlane.rotation.y = -Math.PI / 2;
        this.scene.add(rightPlane);
    }

    addInspectionPlatform() {
        // Create a subtle platform indicator to show where the artwork is positioned
        const platformGeometry = new THREE.CylinderGeometry(1.5, 1.5, 0.05, 32);
        const platformMaterial = new THREE.MeshLambertMaterial({
            color: 0x555555,
            transparent: true,
            opacity: 0.3
        });
        const platform = new THREE.Mesh(platformGeometry, platformMaterial);
        platform.position.y = -1.98;
        this.scene.add(platform);

        // Add a subtle ring around the platform
        const ringGeometry = new THREE.RingGeometry(1.5, 1.6, 32);
        const ringMaterial = new THREE.MeshLambertMaterial({
            color: 0x666666,
            transparent: true,
            opacity: 0.5,
            side: THREE.DoubleSide
        });
        const ring = new THREE.Mesh(ringGeometry, ringMaterial);
        ring.position.y = -1.97;
        ring.rotation.x = -Math.PI / 2;
        this.scene.add(ring);
    }

    createInspectionArtwork(originalArtwork) {
        let inspectionArtwork;

        if (originalArtwork.userData.type === 'painting') {
            inspectionArtwork = this.createInspectionPainting(originalArtwork);
        } else {
            inspectionArtwork = this.createInspectionSculpture(originalArtwork);
        }

        this.scene.add(inspectionArtwork);
        this.artwork = inspectionArtwork;
    }    createInspectionPainting(originalArtwork) {
        // Get original painting dimensions from the original artwork's scale
        const originalScale = originalArtwork.userData.scale || { x: 1.5, y: 1.2, z: 1 };
        const paintingWidth = originalScale.x * 1.5; // Scale up for inspection but keep proportions
        const paintingHeight = originalScale.y * 1.5;
        const canvasThickness = 0.08; // Consistent thickness

        // Get the texture from the original painting
        const originalPainting = originalArtwork.children.find(child =>
            child.material && child.material.map
        );

        let paintingMaterial;
        if (originalPainting && originalPainting.material.map) {
            paintingMaterial = new THREE.MeshLambertMaterial({
                map: originalPainting.material.map,
                transparent: true
            });
        } else {
            // Fallback to colored material
            const colors = [0xff6b6b, 0x4ecdc4, 0x45b7d1, 0xf9ca24, 0xf0932b];
            const color = colors[Math.floor(Math.random() * colors.length)];
            paintingMaterial = new THREE.MeshLambertMaterial({ color: color });
        }

        // Create canvas backing (modern gallery-wrapped canvas)
        const canvasGeometry = new THREE.BoxGeometry(paintingWidth, paintingHeight, canvasThickness);
        const canvasMaterial = new THREE.MeshLambertMaterial({ 
            color: 0xf5f5f5 // Off-white canvas color
        });
        const canvas = new THREE.Mesh(canvasGeometry, canvasMaterial);
        canvas.position.z = 0; // Canvas at center

        // Create painting surface (front) - positioned slightly in front to avoid flickering
        const paintingGeometry = new THREE.PlaneGeometry(paintingWidth, paintingHeight);
        const painting = new THREE.Mesh(paintingGeometry, paintingMaterial);
        painting.position.z = (canvasThickness / 2) + 0.005; // Few millimeters in front of canvas

        // Create side edges with subtle shadow/depth
        const sideEdgeMaterial = new THREE.MeshLambertMaterial({ 
            color: 0xe8e8e8 // Slightly darker than canvas
        });

        // Top edge
        const topEdgeGeometry = new THREE.PlaneGeometry(paintingWidth, canvasThickness);
        const topEdge = new THREE.Mesh(topEdgeGeometry, sideEdgeMaterial);
        topEdge.position.set(0, paintingHeight / 2, 0);
        topEdge.rotation.x = -Math.PI / 2;

        // Bottom edge
        const bottomEdge = new THREE.Mesh(topEdgeGeometry, sideEdgeMaterial);
        bottomEdge.position.set(0, -paintingHeight / 2, 0);
        bottomEdge.rotation.x = Math.PI / 2;

        // Left edge
        const leftEdgeGeometry = new THREE.PlaneGeometry(canvasThickness, paintingHeight);
        const leftEdge = new THREE.Mesh(leftEdgeGeometry, sideEdgeMaterial);
        leftEdge.position.set(-paintingWidth / 2, 0, 0);
        leftEdge.rotation.y = Math.PI / 2;

        // Right edge
        const rightEdge = new THREE.Mesh(leftEdgeGeometry, sideEdgeMaterial);
        rightEdge.position.set(paintingWidth / 2, 0, 0);
        rightEdge.rotation.y = -Math.PI / 2;

        // Create back face (canvas back) - positioned slightly behind to avoid flickering
        const backGeometry = new THREE.PlaneGeometry(paintingWidth - 0.02, paintingHeight - 0.02);
        const backMaterial = new THREE.MeshLambertMaterial({
            color: 0xdcdcdc,
            transparent: true,
            opacity: 0.9
        });
        const backFace = new THREE.Mesh(backGeometry, backMaterial);
        backFace.position.z = -(canvasThickness / 2) - 0.005; // Few millimeters behind canvas
        backFace.rotation.y = Math.PI;

        // Add subtle shadow/border effect - positioned slightly behind painting but in front of canvas
        const borderGeometry = new THREE.PlaneGeometry(paintingWidth + 0.01, paintingHeight + 0.01);
        const borderMaterial = new THREE.MeshLambertMaterial({
            color: 0x888888,
            transparent: true,
            opacity: 0.2
        });
        const border = new THREE.Mesh(borderGeometry, borderMaterial);
        border.position.z = (canvasThickness / 2) - 0.002; // Just behind the painting surface

        // Group everything together
        const group = new THREE.Group();
        group.add(canvas);      // Main canvas body (center)
        group.add(topEdge);     // Side edges
        group.add(bottomEdge);
        group.add(leftEdge);
        group.add(rightEdge);
        group.add(backFace);    // Back face (behind)
        group.add(border);      // Subtle border (behind painting)
        group.add(painting);    // Front artwork (most forward)

        return group;
    }    createInspectionSculpture(originalArtwork) {
        // Clone the sculpture and apply the scale from JSON data
        const sculpture = originalArtwork.clone();
        sculpture.position.set(0, 0, 0);
        
        // Use the scale from the sculpture's userData if available
        if (originalArtwork.userData && originalArtwork.userData.scale) {
            const scale = originalArtwork.userData.scale;
            sculpture.scale.set(scale.x, scale.y, scale.z);
            console.log(`🔍 Inspection mode: Applied sculpture scale from JSON: ${scale.x}, ${scale.y}, ${scale.z}`);
        } else {
            // Fallback to default scale if no scale defined
            sculpture.scale.set(2, 2, 2);
            console.log(`🔍 Inspection mode: Using default sculpture scale: 2, 2, 2`);
        }
        
        return sculpture;
    }

    update() {
        if (this.controls) {
            this.controls.update();
        }
    }

    render(renderer) {
        if (this.scene && this.camera) {
            renderer.render(this.scene, this.camera);
        }
    }    exit() {
        this.isActive = false;

        // Properly dispose of orbit controls
        if (this.controls) {
            this.controls.dispose();
            this.controls.enabled = false;
            this.controls = null;
        }

        // Clean up scene objects
        if (this.scene) {
            this.scene.traverse((child) => {
                if (child.material) {
                    if (Array.isArray(child.material)) {
                        child.material.forEach(material => material.dispose());
                    } else {
                        child.material.dispose();
                    }
                }
                if (child.geometry) {
                    child.geometry.dispose();
                }
            });
        }

        this.scene = null;
        this.camera = null;
        this.artwork = null;
    }
}
