// Main JavaScript for both pages

// ==================== COMMON FUNCTIONS ====================
function createFloatingHearts() {
    const container = document.querySelector('.floating-hearts');
    if (!container) return;
    
    for (let i = 0; i < 20; i++) {
        const heart = document.createElement('div');
        heart.innerHTML = '💖';
        heart.style.position = 'fixed';
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.top = '-50px';
        heart.style.fontSize = (Math.random() * 20 + 15) + 'px';
        heart.style.opacity = Math.random() * 0.5 + 0.3;
        heart.style.zIndex = '0';
        heart.style.pointerEvents = 'none';
        
        // Animation
        heart.style.animation = `floatHeart ${Math.random() * 10 + 10}s linear infinite`;
        heart.style.animationDelay = Math.random() * 5 + 's';
        
        container.appendChild(heart);
    }
}

// Add custom animation for hearts
const style = document.createElement('style');
style.textContent = `
    @keyframes floatHeart {
        0% {
            transform: translateY(0) rotate(0deg);
            opacity: 0.7;
        }
        100% {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ==================== INDEX PAGE FUNCTIONALITY ====================
if (document.querySelector('.page-1')) {
    let currentPage = 1;
    const totalPages = 3;
    let isScrolling = false;
    
    // Initialize
    document.addEventListener('DOMContentLoaded', function() {
        createFloatingHearts();
        updateProgressDots();
        
        // Create more floating elements
        setInterval(createFloatingHeart, 2000);
    });
    
    // Scroll functionality
    window.addEventListener('wheel', function(e) {
        if (isScrolling) return;
        
        if (e.deltaY > 0 && currentPage < totalPages) {
            // Scroll down
            navigateToPage(currentPage + 1);
        } else if (e.deltaY < 0 && currentPage > 1) {
            // Scroll up
            navigateToPage(currentPage - 1);
        }
    });
    
    // Touch/swipe for mobile
    let touchStartY = 0;
    document.addEventListener('touchstart', function(e) {
        touchStartY = e.touches[0].clientY;
    });
    
    document.addEventListener('touchend', function(e) {
        if (isScrolling) return;
        
        const touchEndY = e.changedTouches[0].clientY;
        const diff = touchStartY - touchEndY;
        
        if (Math.abs(diff) > 50) { // Minimum swipe distance
            if (diff > 0 && currentPage < totalPages) {
                // Swipe up (next page)
                navigateToPage(currentPage + 1);
            } else if (diff < 0 && currentPage > 1) {
                // Swipe down (previous page)
                navigateToPage(currentPage - 1);
            }
        }
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (isScrolling) return;
        
        if (e.key === 'ArrowDown' && currentPage < totalPages) {
            navigateToPage(currentPage + 1);
        } else if (e.key === 'ArrowUp' && currentPage > 1) {
            navigateToPage(currentPage - 1);
        } else if (e.key === ' ' || e.key === 'Enter') {
            if (currentPage === 3) {
                document.getElementById('openHeartBtn').click();
            }
        }
    });
    
    // Progress dots click
    document.querySelectorAll('.dot').forEach(dot => {
        dot.addEventListener('click', function() {
            const pageNum = parseInt(this.dataset.page);
            navigateToPage(pageNum);
        });
    });
    
    // Open Heart Button
    const openHeartBtn = document.getElementById('openHeartBtn');
    if (openHeartBtn) {
        openHeartBtn.addEventListener('click', function() {
            // Button animation
            this.style.animation = 'none';
            this.style.transform = 'scale(0.9)';
            
            // Create explosion effect
            createHeartExplosion();
            
            // Navigate after delay
            setTimeout(() => {
                window.location.href = 'heart.html';
            }, 1000);
        });
    }
    
    // Navigation functions
    function navigateToPage(pageNum) {
        if (pageNum < 1 || pageNum > totalPages || isScrolling) return;
        
        isScrolling = true;
        currentPage = pageNum;
        
        // Hide all pages
        document.querySelectorAll('.page').forEach(page => {
            page.classList.remove('active');
        });
        
        // Show current page
        const currentPageElement = document.querySelector(`.page-${pageNum}`);
        currentPageElement.classList.add('active');
        
        // Update progress dots
        updateProgressDots();
        
        // Reset scrolling flag
        setTimeout(() => {
            isScrolling = false;
        }, 1000);
    }
    
    function updateProgressDots() {
        document.querySelectorAll('.dot').forEach(dot => {
            dot.classList.remove('active');
            if (parseInt(dot.dataset.page) === currentPage) {
                dot.classList.add('active');
            }
        });
    }
    
    function createFloatingHeart() {
        const heart = document.createElement('div');
        heart.innerHTML = ['💖', '💗', '💓', '💕', '💞'][Math.floor(Math.random() * 5)];
        heart.style.position = 'fixed';
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.top = '100vh';
        heart.style.fontSize = (Math.random() * 30 + 20) + 'px';
        heart.style.opacity = Math.random() * 0.5 + 0.3;
        heart.style.zIndex = '0';
        heart.style.pointerEvents = 'none';
        
        document.body.appendChild(heart);
        
        // Animate
        const animation = heart.animate([
            { transform: 'translateY(0) rotate(0deg)', opacity: 0.7 },
            { transform: `translateY(-${window.innerHeight + 100}px) rotate(360deg)`, opacity: 0 }
        ], {
            duration: Math.random() * 4000 + 3000,
            easing: 'cubic-bezier(0.215, 0.610, 0.355, 1)'
        });
        
        animation.onfinish = () => heart.remove();
    }
    
    function createHeartExplosion() {
        for (let i = 0; i < 50; i++) {
            const heart = document.createElement('div');
            heart.innerHTML = '💖';
            heart.style.position = 'fixed';
            heart.style.left = '50%';
            heart.style.top = '50%';
            heart.style.fontSize = '20px';
            heart.style.opacity = '1';
            heart.style.zIndex = '1000';
            heart.style.pointerEvents = 'none';
            heart.style.transform = 'translate(-50%, -50%)';
            
            document.body.appendChild(heart);
            
            // Random explosion direction
            const angle = Math.random() * Math.PI * 2;
            const distance = Math.random() * 200 + 100;
            const x = Math.cos(angle) * distance;
            const y = Math.sin(angle) * distance;
            
            // Animate explosion
            heart.animate([
                { transform: 'translate(-50%, -50%) scale(1)', opacity: 1 },
                { transform: `translate(${x}px, ${y}px) scale(0)`, opacity: 0 }
            ], {
                duration: 800,
                easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)'
            }).onfinish = () => heart.remove();
        }
    }
}

// ==================== HEART PAGE FUNCTIONALITY ====================
if (document.querySelector('.heart-page')) {
    document.addEventListener('DOMContentLoaded', function() {
        createFloatingHearts();
        
        // Animate message lines one by one
        const messageLines = document.querySelectorAll('.message-line');
        messageLines.forEach((line, index) => {
            setTimeout(() => {
                line.style.animation = 'slideIn 0.5s ease forwards';
            }, index * 500 + 500);
        });
        
        // Music player
        const musicBtn = document.getElementById('musicBtn');
        const bgMusic = document.getElementById('bgMusic');
        
        if (musicBtn && bgMusic) {
            let isPlaying = false;
            
            musicBtn.addEventListener('click', function() {
                if (isPlaying) {
                    bgMusic.pause();
                    musicBtn.innerHTML = '<i class="fas fa-music"></i> Play Music';
                } else {
                    bgMusic.play().catch(e => {
                        console.log("Autoplay prevented. User interaction needed.");
                        musicBtn.innerHTML = '<i class="fas fa-music"></i> Click to Play';
                    });
                    musicBtn.innerHTML = '<i class="fas fa-pause"></i> Pause Music';
                }
                isPlaying = !isPlaying;
            });
        }
        
      // Surprise button - Now opens special.html page
const surpriseBtn = document.getElementById('surpriseBtn');
if (surpriseBtn) {
    surpriseBtn.addEventListener('click', function() {
        // Create transition effect
        createHeartTransition();
        
        // Navigate after delay
        setTimeout(() => {
            window.location.href = 'special.html';
        }, 1000);
    });
}

function createHeartTransition() {
    // Create heart explosion effect
    for (let i = 0; i < 30; i++) {
        const heart = document.createElement('div');
        heart.innerHTML = '💖';
        heart.style.position = 'fixed';
        heart.style.left = '50%';
        heart.style.top = '50%';
        heart.style.fontSize = '25px';
        heart.style.opacity = '1';
        heart.style.zIndex = '1000';
        heart.style.pointerEvents = 'none';
        heart.style.transform = 'translate(-50%, -50%)';
        
        document.body.appendChild(heart);
        
        // Explosion animation
        const angle = Math.random() * Math.PI * 2;
        const distance = Math.random() * 300 + 150;
        const x = Math.cos(angle) * distance;
        const y = Math.sin(angle) * distance;
        
        heart.animate([
            { transform: 'translate(-50%, -50%) scale(1)', opacity: 1 },
            { transform: `translate(${x}px, ${y}px) scale(0)`, opacity: 0 }
        ], {
            duration: 1000,
            easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)'
        }).onfinish = () => heart.remove();
    }
}