// Gallery Builder class
class GalleryBuilder {
    constructor() {        // Initialize materials - will be updated with textures when available
        this.floorMaterial = new THREE.MeshLambertMaterial({
            color: 0xffffff 
        });
        this.wallMaterial = new THREE.MeshLambertMaterial({
            color: 0xffffff 
        });        this.ceilingMaterial = new THREE.MeshLambertMaterial({
            color: 0xffffff,
            emissive: 0xffffff,
            emissiveIntensity: 0.5
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
        //          // Load ceiling texture (optional)
        // textureLoader.load(
        //     'assets/textures/ceiling_texture.jpg',
        //     (texture) => {
        //         console.log('✅ Ceiling texture loaded');
        //         texture.wrapS = THREE.RepeatWrapping;
        //         texture.wrapT = THREE.RepeatWrapping;
        //         texture.repeat.set(2, 2);
        //         texture.flipY = false; // Prevent texture flipping issues
        //         this.ceilingMaterial.map = texture;
        //         this.ceilingMaterial.side = THREE.DoubleSide; // Make base material double-sided
        //         this.ceilingMaterial.needsUpdate = true;
        //     },
        //     undefined,
        //     (error) => {
        //         console.warn('⚠️ Ceiling texture not found, using fallback color');
        //         // Make sure fallback is also double-sided
        //         this.ceilingMaterial.side = THREE.DoubleSide;
        //         this.ceilingMaterial.needsUpdate = true;
        //     });
    }


    createFloors(scene) {
        // Hallway floor
        const hallwayFloorGeometry = new THREE.PlaneGeometry(12, 32);
        const hallwayFloor = new THREE.Mesh(hallwayFloorGeometry, this.floorMaterial);
        hallwayFloor.rotation.x = -Math.PI / 2;
        hallwayFloor.position.set(0, 0, -11);
        hallwayFloor.receiveShadow = true;
        scene.add(hallwayFloor);

        // Sculpture room floor
        // const roomFloorGeometry = new THREE.PlaneGeometry(12, 12);
        // const roomFloor = new THREE.Mesh(roomFloorGeometry, this.floorMaterial);
        // roomFloor.rotation.x = -Math.PI / 2;
        // roomFloor.position.set(0, 0, -21);
        // roomFloor.receiveShadow = true;
        // scene.add(roomFloor);
    }

    createWalls(scene) {
        // Hallway walls (left and right)
        const hallwayWallGeometry = new THREE.PlaneGeometry(32, 4);

        // Left hallway wall
        const leftHallwayWall = new THREE.Mesh(hallwayWallGeometry, this.wallMaterial);
        leftHallwayWall.rotation.y = Math.PI / 2;
        leftHallwayWall.position.set(-6, 2, -11);
        scene.add(leftHallwayWall);

        // Right hallway wall
        const rightHallwayWall = new THREE.Mesh(hallwayWallGeometry, this.wallMaterial);
        rightHallwayWall.rotation.y = -Math.PI / 2;
        rightHallwayWall.position.set(6, 2, -11);
        scene.add(rightHallwayWall);

        // Back wall of hallway
        const backHallwayWall = new THREE.Mesh(hallwayWallGeometry, this.wallMaterial);
        backHallwayWall.rotation.y = Math.PI ; 
        backHallwayWall.position.set(0, 2, 5);
        scene.add(backHallwayWall);

        const backWall = new THREE.Mesh(hallwayWallGeometry, this.wallMaterial);
        backWall.position.set(0, 2, -27);
        scene.add(backWall);


    }

    createCeilings(scene) {
        // Use the bright beige ceiling material

        // Hallway ceiling
        const hallwayCeilingGeometry = new THREE.PlaneGeometry(12, 32);
        const hallawayCeiling = new THREE.Mesh(hallwayCeilingGeometry, this.ceilingMaterial);
        hallawayCeiling.rotation.x = Math.PI / 2; // Face down
        hallawayCeiling.position.set(0, 4, -11);
        scene.add(hallawayCeiling);

        // // Sculpture room ceiling
        // const roomCeilingGeometry = new THREE.PlaneGeometry(12, 12);
        // const roomCeiling = new THREE.Mesh(roomCeilingGeometry, this.ceilingMaterial.clone());
        // roomCeiling.rotation.x = Math.PI / 2; // Face down
        // roomCeiling.position.set(0, 4, -21);
        // scene.add(roomCeiling);

        console.log('� Bright beige ceilings created');
    }
}
