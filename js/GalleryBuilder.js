// Gallery Builder class
class GalleryBuilder {
    constructor() {
        this.floorMaterial = new THREE.MeshLambertMaterial({ 
            color: 0x2c2c2c,
            transparent: true,
            opacity: 0.8
        });
        
        this.wallMaterial = new THREE.MeshLambertMaterial({ 
            color: 0xf5f5f5,
            transparent: true,
            opacity: 0.95
        });
        
        this.ceilingMaterial = new THREE.MeshLambertMaterial({ 
            color: 0x3c3c3c,
            transparent: true,
            opacity: 0.9
        });
    }

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
        leftConnectionWall.rotation.y = -Math.PI / 2;
        leftConnectionWall.position.set(-4, 2, -16);
        scene.add(leftConnectionWall);

        // Right connection wall
        const rightConnectionWall = new THREE.Mesh(connectionWallGeometry, this.wallMaterial);
        rightConnectionWall.rotation.y = Math.PI / 2;
        rightConnectionWall.position.set(4, 2, -16);
        scene.add(rightConnectionWall);
    }

    createCeilings(scene) {
        // Hallway ceiling
        const hallwayCeilingGeometry = new THREE.PlaneGeometry(4, 20);
        const hallawayCeiling = new THREE.Mesh(hallwayCeilingGeometry, this.ceilingMaterial);
        hallawayCeiling.rotation.x = Math.PI / 2;
        hallawayCeiling.position.set(0, 4, -5);
        scene.add(hallawayCeiling);

        // Sculpture room ceiling
        const roomCeilingGeometry = new THREE.PlaneGeometry(12, 12);
        const roomCeiling = new THREE.Mesh(roomCeilingGeometry, this.ceilingMaterial);
        roomCeiling.rotation.x = Math.PI / 2;
        roomCeiling.position.set(0, 4, -21);
        scene.add(roomCeiling);
    }
}
