// Gallery Builder class
class GalleryBuilder {
    constructor() {
        // Initialize materials - will be updated with textures when available
        this.floorMaterial = new THREE.MeshLambertMaterial({ 
            color: 0x8B4513 // Dark brown fallback
        });
        
        this.wallMaterial = new THREE.MeshLambertMaterial({ 
            color: 0xf5f5f5 // Light gray fallback
        });
        
        this.ceilingMaterial = new THREE.MeshLambertMaterial({ 
            color: 0xffffff // White ceiling
        });
        
        this.texturesLoaded = false;
        this.loadTextures();
    }

    // Load textures for gallery surfaces
    loadTextures() {
        const textureLoader = new THREE.TextureLoader();
        
        // Load floor texture (wood)
        textureLoader.load(
            'assets/textures/wood_floor.jpg',
            (texture) => {
                console.log('✅ Floor texture loaded');
                texture.wrapS = THREE.RepeatWrapping;
                texture.wrapT = THREE.RepeatWrapping;
                texture.repeat.set(4, 4); // Repeat texture for tiling
                this.floorMaterial.map = texture;
                this.floorMaterial.needsUpdate = true;
            },
            undefined,
            (error) => {
                console.warn('⚠️ Floor texture not found, using fallback color');
            }
        );
        
        // Load wall texture
        textureLoader.load(
            'assets/textures/wall_texture.jpg',
            (texture) => {
                console.log('✅ Wall texture loaded');
                texture.wrapS = THREE.RepeatWrapping;
                texture.wrapT = THREE.RepeatWrapping;
                texture.repeat.set(2, 2);
                this.wallMaterial.map = texture;
                this.wallMaterial.needsUpdate = true;
            },
            undefined,
            (error) => {
                console.warn('⚠️ Wall texture not found, using fallback color');
            }
        );
        
        // Load ceiling texture (optional)
        textureLoader.load(
            'assets/textures/ceiling_texture.jpg',
            (texture) => {
                console.log('✅ Ceiling texture loaded');
                texture.wrapS = THREE.RepeatWrapping;
                texture.wrapT = THREE.RepeatWrapping;
                texture.repeat.set(2, 2);
                this.ceilingMaterial.map = texture;
                this.ceilingMaterial.needsUpdate = true;
            },
            undefined,
            (error) => {
                console.warn('⚠️ Ceiling texture not found, using fallback color');
            }
        );    }

    createFloors(scene) {
        // Hallway floor
        const hallwayFloorGeometry = new THREE.PlaneGeometry(4, 20);
        const hallwayFloor = new THREE.Mesh(hallwayFloorGeometry, this.floorMaterial);
        hallwayFloor.rotation.x = -Math.PI / 2;
        hallwayFloor.position.set(0, 0, -5);
        hallwayFloor.receiveShadow = true;
        scene.add(hallwayFloor);

        // Sculpture room floor
        const roomFloorGeometry = new THREE.PlaneGeometry(12, 12);
        const roomFloor = new THREE.Mesh(roomFloorGeometry, this.floorMaterial);
        roomFloor.rotation.x = -Math.PI / 2;
        roomFloor.position.set(0, 0, -21);
        roomFloor.receiveShadow = true;
        scene.add(roomFloor);
    }

    createWalls(scene) {
        // Hallway walls (left and right)
        const hallwayWallGeometry = new THREE.PlaneGeometry(20, 4);
        
        // Left hallway wall
        const leftHallwayWall = new THREE.Mesh(hallwayWallGeometry, this.wallMaterial);
        leftHallwayWall.rotation.y = Math.PI / 2;
        leftHallwayWall.position.set(-2, 2, -5);
        scene.add(leftHallwayWall);

        // Right hallway wall
        const rightHallwayWall = new THREE.Mesh(hallwayWallGeometry, this.wallMaterial);
        rightHallwayWall.rotation.y = -Math.PI / 2;
        rightHallwayWall.position.set(2, 2, -5);
        scene.add(rightHallwayWall);

        // Sculpture room walls
        const roomWallGeometry = new THREE.PlaneGeometry(12, 4);
        
        // Back wall of sculpture room
        const backWall = new THREE.Mesh(roomWallGeometry, this.wallMaterial);
        backWall.position.set(0, 2, -27);
        scene.add(backWall);

        // Left wall of sculpture room
        const leftRoomWall = new THREE.Mesh(roomWallGeometry, this.wallMaterial);
        leftRoomWall.rotation.y = Math.PI / 2;
        leftRoomWall.position.set(-6, 2, -21);
        scene.add(leftRoomWall);

        // Right wall of sculpture room
        const rightRoomWall = new THREE.Mesh(roomWallGeometry, this.wallMaterial);
        rightRoomWall.rotation.y = -Math.PI / 2;
        rightRoomWall.position.set(6, 2, -21);
        scene.add(rightRoomWall);

        // Connection walls between hallway and room
        const connectionWallGeometry = new THREE.PlaneGeometry(4, 4);
        
        // Left connection wall
        const leftConnectionWall = new THREE.Mesh(connectionWallGeometry, this.wallMaterial);
        leftConnectionWall.rotation.y = Math.PI; // 180 degrees
        leftConnectionWall.position.set(-4, 2, -15);
        scene.add(leftConnectionWall);

        // Right connection wall
        const rightConnectionWall = new THREE.Mesh(connectionWallGeometry, this.wallMaterial);
        rightConnectionWall.rotation.y = 0 + Math.PI; // 180 degrees from previous (total Math.PI)
        rightConnectionWall.position.set(4, 2, -15);
        scene.add(rightConnectionWall);
    }    createCeilings(scene) {
        // Create double-sided ceiling material for visibility from both directions
        const doubleSidedCeilingMaterial = this.ceilingMaterial.clone();
        doubleSidedCeilingMaterial.side = THREE.DoubleSide;
        
        // Hallway ceiling
        const hallwayCeilingGeometry = new THREE.PlaneGeometry(4, 20);
        const hallawayCeiling = new THREE.Mesh(hallwayCeilingGeometry, doubleSidedCeilingMaterial);
        hallawayCeiling.rotation.x = Math.PI / 2;
        hallawayCeiling.position.set(0, 4, -5);
        scene.add(hallawayCeiling);

        // Sculpture room ceiling
        const roomCeilingGeometry = new THREE.PlaneGeometry(12, 12);
        const roomCeiling = new THREE.Mesh(roomCeilingGeometry, doubleSidedCeilingMaterial);
        roomCeiling.rotation.x = Math.PI / 2;
        roomCeiling.position.set(0, 4, -21);
        scene.add(roomCeiling);
    }
}
