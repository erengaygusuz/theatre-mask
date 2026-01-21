/* templatemo-604-piano-scripts.js
   Tiyatro Maske - TemplateMo 604 uyarlamasi
   Gereksiz piano/audio kodlari kaldirildi.
*/

// ===== SNOWFLAKES =====
function createSnowflakes() {
    const container = document.getElementById('snowflakes');
    if (!container) return;

    container.innerHTML = '';
    const flakes = ['❄', '❅', '❆', '✦', '•'];
    const count = 25;

    for (let i = 0; i < count; i++) {
        const flake = document.createElement('div');
        flake.className = 'snowflake';
        flake.textContent = flakes[Math.floor(Math.random() * flakes.length)];
        flake.style.left = Math.random() * 100 + '%';
        flake.style.fontSize = (Math.random() * 0.6 + 0.5) + 'rem';
        flake.style.opacity = Math.random() * 0.4 + 0.2;
        flake.style.animationDuration = (Math.random() * 15 + 20) + 's';
        flake.style.animationDelay = Math.random() * 10 + 's';
        container.appendChild(flake);
    }
}

// ===== NAVIGATION =====
function initNavigation() {
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');
    if (!navToggle || !navLinks) return;

    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
}

// ===== GALLERY LIGHTBOX =====
function initGallery() {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxClose = document.getElementById('lightboxClose');
    const lightboxPrev = document.getElementById('lightboxPrev');
    const lightboxNext = document.getElementById('lightboxNext');
    const galleryItems = document.querySelectorAll('.gallery-item');

    if (!lightbox || !lightboxImg || !galleryItems.length) return;

    let currentIndex = 0;
    const images = Array.from(galleryItems)
        .map(item => item.querySelector('img')?.src)
        .filter(Boolean);

    function openLightbox(index) {
        currentIndex = index;
        lightboxImg.src = images[currentIndex];
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }

    function showPrev() {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        lightboxImg.src = images[currentIndex];
    }

    function showNext() {
        currentIndex = (currentIndex + 1) % images.length;
        lightboxImg.src = images[currentIndex];
    }

    galleryItems.forEach((item, index) => {
        item.addEventListener('click', () => openLightbox(index));
    });

    if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
    if (lightboxPrev) lightboxPrev.addEventListener('click', showPrev);
    if (lightboxNext) lightboxNext.addEventListener('click', showNext);

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });

    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') showPrev();
        if (e.key === 'ArrowRight') showNext();
    });
}

// ===== FORM HANDLING =====
function initForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // Burayı istersen gerçek backend / form endpoint ile değiştirirsin.
        alert('Mesajınız alındı! En kısa sürede dönüş yapacağız. 🎭');

        form.reset();
    });
}

// ===== INITIALIZE =====
document.addEventListener('DOMContentLoaded', () => {
    createSnowflakes();
    initNavigation();
    initGallery();
    initForm();
});
