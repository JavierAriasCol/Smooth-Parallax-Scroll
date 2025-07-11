// Register GSAP ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Initialize Lenis smooth scroll
const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    direction: 'vertical',
    gestureDirection: 'vertical',
    smooth: true,
    mouseMultiplier: 1,
    smoothTouch: false,
    touchMultiplier: 2,
    infinite: false,
});

// Lenis animation frame
function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// Update ScrollTrigger when Lenis scrolls
lenis.on('scroll', ScrollTrigger.update);

// Variables for dimensions
let windowHeight = window.innerHeight;

// Update dimensions on resize
function updateDimensions() {
    windowHeight = window.innerHeight;
    ScrollTrigger.refresh();
}

// Resize event listener
window.addEventListener('resize', updateDimensions);

// Initialize parallax animations when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Set initial dimensions
    updateDimensions();
    
    // Parallax animations for each column
    // Column 1: y = height * 2
    gsap.to('.column-1', {
        y: () => windowHeight * 2,
        ease: 'none',
        scrollTrigger: {
            trigger: '.gallery',
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
            invalidateOnRefresh: true,
        }
    });
    
    // Column 2: y = height * 3.3
    gsap.to('.column-2', {
        y: () => windowHeight * 3.3,
        ease: 'none',
        scrollTrigger: {
            trigger: '.gallery',
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
            invalidateOnRefresh: true,
        }
    });
    
    // Column 3: y = height * 1.25
    gsap.to('.column-3', {
        y: () => windowHeight * 1.25,
        ease: 'none',
        scrollTrigger: {
            trigger: '.gallery',
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
            invalidateOnRefresh: true,
        }
    });
    
    // Column 4: y = height * 3
    gsap.to('.column-4', {
        y: () => windowHeight * 3,
        ease: 'none',
        scrollTrigger: {
            trigger: '.gallery',
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
            invalidateOnRefresh: true,
        }
    });
    
    // Optional: Add fade-in animation for images
    gsap.fromTo('.image-container', 
        {
            opacity: 0,
            y: 50
        },
        {
            opacity: 1,
            y: 0,
            duration: 1,
            stagger: 0.1,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: '.gallery',
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            }
        }
    );
});

// Handle page visibility change to pause/resume Lenis
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        lenis.stop();
    } else {
        lenis.start();
    }
});

// Smooth scroll to top function (optional utility)
function scrollToTop() {
    lenis.scrollTo(0, {
        duration: 2,
        easing: (t) => 1 - Math.pow(1 - t, 3)
    });
}

// Debug mode (uncomment for development)
// ScrollTrigger.addEventListener('refresh', () => console.log('ScrollTrigger refreshed'));
// ScrollTrigger.config({ ignoreMobileResize: true });