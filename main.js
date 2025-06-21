// Main application initialization
document.addEventListener('DOMContentLoaded', async () => {
    window.gallery = new Gallery();
    await window.gallery.loadArtworks(); // Wait for async loading
    window.gallery.start();
});
