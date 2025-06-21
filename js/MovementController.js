// Movement Controller class
class MovementController {
    constructor() {
        this.keys = {
            forward: false,
            backward: false,
            left: false,
            right: false
        };
        this.velocity = new THREE.Vector3();
        this.direction = new THREE.Vector3();
        this.moveSpeed = 100.0;
        this.clock = new THREE.Clock();
        this.controls = null;
    }

    setControls(controls) {
        this.controls = controls;
    }

    setupEventListeners() {
        // Keyboard controls
        document.addEventListener('keydown', (event) => {
            switch (event.code) {
                case 'ArrowUp':
                case 'KeyW':
                    this.keys.forward = true;
                    break;
                case 'ArrowDown':
                case 'KeyS':
                    this.keys.backward = true;
                    break;
                case 'ArrowLeft':
                case 'KeyA':
                    this.keys.left = true;
                    break;
                case 'ArrowRight':
                case 'KeyD':
                    this.keys.right = true;
                    break;
            }
        });

        document.addEventListener('keyup', (event) => {
            switch (event.code) {
                case 'ArrowUp':
                case 'KeyW':
                    this.keys.forward = false;
                    break;
                case 'ArrowDown':
                case 'KeyS':
                    this.keys.backward = false;
                    break;
                case 'ArrowLeft':
                case 'KeyA':
                    this.keys.left = false;
                    break;
                case 'ArrowRight':
                case 'KeyD':
                    this.keys.right = false;
                    break;
            }
        });
    }

    update() {
        if (!this.controls) return;

        const delta = this.clock.getDelta();
        
        this.velocity.x -= this.velocity.x * 10.0 * delta;
        this.velocity.z -= this.velocity.z * 10.0 * delta;

        this.direction.z = Number(this.keys.forward) - Number(this.keys.backward);
        this.direction.x = Number(this.keys.right) - Number(this.keys.left);
        this.direction.normalize();

        if (this.keys.forward || this.keys.backward) {
            this.velocity.z -= this.direction.z * this.moveSpeed * delta;
        }
        if (this.keys.left || this.keys.right) {
            this.velocity.x -= this.direction.x * this.moveSpeed * delta;
        }

        // Apply movement only if controls are locked
        if (this.controls.isLocked) {
            this.controls.moveRight(-this.velocity.x * delta);
            this.controls.moveForward(-this.velocity.z * delta);
            
            // Keep the camera at a fixed height (no floating)
            this.controls.getObject().position.y = 1.6;
            
            // Boundary limits to keep player in the gallery
            this.applyBoundaries();
        }
    }

    applyBoundaries() {
        const position = this.controls.getObject().position;
        
        // Hallway boundaries
        if (position.z > 5) position.z = 5; // Don't go behind start
        if (position.z > -15) {
            // In hallway - restrict x movement
            if (position.x > 1.5) position.x = 1.5;
            if (position.x < -1.5) position.x = -1.5;
        } else {
            // In sculpture room - wider x boundaries
            if (position.x > 5.5) position.x = 5.5;
            if (position.x < -5.5) position.x = -5.5;
            if (position.z < -26.5) position.z = -26.5; // Don't go through back wall
        }
    }
}
