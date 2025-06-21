// UI Controller class
class UIController {
    constructor() {
        this.setupEventListeners();
    }

    setupEventListeners() {
        // ESC key to exit inspection mode
        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape') {
                this.exitInspection();
            }
        });

        // Close button
        const closeBtn = document.getElementById('close-info');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                this.exitInspection();
            });
        }
    } 
    
    setupPointerLockUI(controls) {
        // Automatically lock pointer when canvas is clicked
        const canvas = document.getElementById('gallery-canvas');
        canvas.addEventListener('click', () => {
            if (!window.gallery || !window.gallery.inspectionMode.isActive) {
                controls.lock();
            }
        });

        controls.addEventListener('lock', () => {
            this.showCrosshair();
            // Reset cursor to center
            this.resetCursorToCenter();
        });

        controls.addEventListener('unlock', () => {
            this.hideCrosshair();
        });
    }

    // Auto-start movement after everything is loaded
    autoStartMovement(controls) {
        // Wait for the loading screen to disappear, then auto-lock
        setTimeout(() => {
            if (!window.gallery || !window.gallery.inspectionMode.isActive) {
                controls.lock();
            }
        }, 2000); // Increased delay to ensure everything is loaded
    }     resetCursorToCenter() {
        // Note: Due to browser security restrictions, we cannot programmatically 
        // reset the cursor to center. Users will need to click with the crosshair
        // when pointer lock is active.
        
        const crosshair = document.getElementById('crosshair');
        if (crosshair) {
            // Ensure crosshair is properly centered and visible
            crosshair.style.position = 'fixed';
            crosshair.style.left = '50%';
            crosshair.style.top = '50%';
            crosshair.style.transform = 'translate(-50%, -50%)';
            crosshair.style.zIndex = '1000';
            
            // Force reflow
            crosshair.offsetHeight;
        }

        // Focus the canvas to ensure it can receive input
        const canvas = document.getElementById('gallery-canvas');
        if (canvas) {
            canvas.focus();
        }
    }

    showCrosshair() {
        const crosshair = document.getElementById('crosshair');
        if (crosshair) {
            crosshair.classList.add('visible');
        }
    }

    hideCrosshair() {
        const crosshair = document.getElementById('crosshair');
        if (crosshair) {
            crosshair.classList.remove('visible');
        }
    }

    showArtworkInfo(artworkData) {
        document.getElementById('artwork-title').textContent = artworkData.title;
        document.getElementById('artwork-artist').textContent = `Par ${artworkData.artist}`;
        document.getElementById('artwork-year').textContent = artworkData.year;
        document.getElementById('artwork-description').textContent = artworkData.description;

        document.getElementById('info-panel').classList.remove('hidden');
    }

    hideArtworkInfo() {
        document.getElementById('info-panel').classList.add('hidden');
    }

    hideLoadingScreen() {
        const loadingScreen = document.getElementById('loading-screen');
        if (loadingScreen) {
            loadingScreen.style.opacity = '0';
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 500);
        }
    }

    exitInspection() {
        if (window.gallery && window.gallery.inspectionMode.isActive) {
            window.gallery.exitInspectionMode();
        }
    }
}
