// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Check if we're on the login page
    if (window.location.pathname.endsWith('index.html') || window.location.pathname === '/') {
        initializeLoginPage();
    }
    
    // Check if we're on the dashboard page
    if (window.location.pathname.endsWith('dashboard.html')) {
        initializeDashboard();
    }
});

// Love Question Modal Functionality (now acts as welcome modal)
function showLoveQuestionModal() {
    const loveQuestionModal = document.getElementById('loveQuestionModal');
    
    if (loveQuestionModal) {
        loveQuestionModal.classList.remove('hidden');
        spawnModalPetals(loveQuestionModal);
        initializeQuestionModalFlowerPetals();
        
        // Add scale-up animation
        loveQuestionModal.style.animation = 'modalEntrance 1.2s cubic-bezier(0.34, 1.56, 0.64, 1)';
    }
}

// Question Modal Flower Petals Effect
function initializeQuestionModalFlowerPetals() {
    const container = document.getElementById('questionModalFlowerPetalsContainer');
    if (!container) return;

    const petalColors = ['pink', 'white', 'light-pink', 'red', 'yellow', 'purple', 'blue'];
    const petalCount = 50;
    let questionModalInterval;

    function createQuestionModalPetal() {
        const petal = document.createElement('div');
        const colorClass = petalColors[Math.floor(Math.random() * petalColors.length)];
        
        petal.className = `flower-petal ${colorClass}`;
        
        const startX = Math.random() * container.offsetWidth;
        petal.style.left = `${startX}px`;
        petal.style.top = '-50px';
        
        const duration = 6 + Math.random() * 8;
        petal.style.animationDuration = `${duration}s`;
        
        const delay = Math.random() * 0.5;
        petal.style.animationDelay = `${delay}s`;
        
        const size = 12 + Math.random() * 12;
        petal.style.width = `${size}px`;
        petal.style.height = `${size}px`;
        
        const drift = (Math.random() - 0.5) * 80;
        petal.style.setProperty('--drift', `${drift}px`);
        
        container.appendChild(petal);
        
        setTimeout(() => {
            if (petal.parentNode) {
                petal.remove();
            }
        }, (duration + delay) * 1000);
    }

    // Create initial burst of petals immediately
    for (let i = 0; i < petalCount; i++) {
        setTimeout(() => createQuestionModalPetal(), i * 50);
    }

    // Continue creating petals continuously
    questionModalInterval = setInterval(createQuestionModalPetal, 200);

    // Clean up when modal is hidden
    const loveQuestionModal = document.getElementById('loveQuestionModal');
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.target.classList.contains('hidden')) {
                clearInterval(questionModalInterval);
                container.innerHTML = '';
                observer.disconnect();
            }
        });
    });

    observer.observe(loveQuestionModal, {
        attributes: true,
        attributeFilter: ['class']
    });
}

// Login Page Functionality
function initializeLoginPage() {
    const passwordInput = document.getElementById('passwordInput');
    const enterBtn = document.getElementById('enterBtn');
    const errorMessage = document.getElementById('errorMessage');
    const welcomeModal = document.getElementById('welcomeModal');
    
    // Correct password
    const correctPassword = 'iloveyouali';
    
    // Handle enter button click
    enterBtn.addEventListener('click', function() {
        validatePassword();
    });
    
    // Handle enter key press in password input
    passwordInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            validatePassword();
        }
    });
    
    // Password validation function
    function validatePassword() {
        const enteredPassword = passwordInput.value.trim();
        
        if (enteredPassword === correctPassword) {
            // Hide error message if visible
            errorMessage.classList.add('hidden');
            
            // Show love question modal (now acts as welcome modal)
            showLoveQuestionModal();
            
            // Auto-hide modal after 9 seconds and redirect to dashboard
            setTimeout(() => {
                const loveQuestionModal = document.getElementById('loveQuestionModal');
                if (loveQuestionModal) {
                    loveQuestionModal.style.animation = 'fadeOut 0.5s ease-out';
                    setTimeout(() => {
                        loveQuestionModal.classList.add('hidden');
                        window.location.href = 'dashboard.html';
                    }, 500);
                }
            }, 9000);
            
            // Clear password input
            passwordInput.value = '';
        } else {
            // Show error message
            errorMessage.classList.remove('hidden');
            
            // Shake animation for error
            passwordInput.style.animation = 'shake 0.5s ease-in-out';
            setTimeout(() => {
                passwordInput.style.animation = '';
            }, 500);
            
            // Clear password input
            passwordInput.value = '';
        }
    }
    
    // Handle modal backdrop click (optional - close modal if clicked outside)
    welcomeModal.addEventListener('click', function(e) {
        if (e.target === welcomeModal) {
            // Optional: You can close modal if clicked outside
            // welcomeModal.classList.add('hidden');
        }
    });
}

function spawnModalPetals(modalElement) {
    if (!modalElement) {
        return;
    }

    const existingLayer = modalElement.querySelector('.petal-layer');
    if (existingLayer) {
        existingLayer.remove();
    }

    const petalLayer = document.createElement('div');
    petalLayer.className = 'petal-layer';
    modalElement.appendChild(petalLayer);

    const petalCount = window.innerWidth < 768 ? 10 : 16;
    const now = Date.now();
    const maxLifetimeMs = 6500;

    for (let i = 0; i < petalCount; i += 1) {
        const petalWrap = document.createElement('span');
        petalWrap.className = 'petal-wrap';

        const petal = document.createElement('span');
        petal.className = 'petal';

        const left = Math.random() * 100;
        const drift = (Math.random() * 140 - 70).toFixed(0);
        const delay = (Math.random() * 0.9).toFixed(2);
        const duration = (4.8 + Math.random() * 2.2).toFixed(2);
        const scale = (0.75 + Math.random() * 0.7).toFixed(2);
        const rot = (Math.random() * 360).toFixed(0);
        const spin = (1.8 + Math.random() * 2.6).toFixed(2);

        petalWrap.style.left = `${left}%`;
        petalWrap.style.setProperty('--petal-drift', `${drift}px`);
        petalWrap.style.setProperty('--petal-delay', `${delay}s`);
        petalWrap.style.setProperty('--petal-dur', `${duration}s`);
        petalWrap.style.setProperty('--petal-scale', scale);
        petalWrap.style.setProperty('--petal-rot', `${rot}deg`);
        petalWrap.style.setProperty('--petal-spin', `${spin}s`);

        petalWrap.appendChild(petal);
        petalLayer.appendChild(petalWrap);
    }

    window.setTimeout(() => {
        if (!petalLayer.isConnected) {
            return;
        }
        petalLayer.style.transition = 'opacity 800ms ease';
        petalLayer.style.opacity = '0';
        window.setTimeout(() => {
            if (petalLayer.isConnected) {
                petalLayer.remove();
            }
        }, 900);
    }, Math.max(0, maxLifetimeMs - (Date.now() - now)));
}

// Dashboard Functionality
function initializeDashboard() {
    initializeNavigation();
    initializeAkiSection();
    initializeMusicSection();
    initializeFlowerPetals();
    initializeDynamicGallery();
}

// Navigation System
function initializeNavigation() {
    const navButtons = document.querySelectorAll('.nav-btn');
    const sections = document.querySelectorAll('.section');
    
    navButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetSection = this.dataset.section;
            
            // Remove active class from all buttons and sections
            navButtons.forEach(btn => btn.classList.remove('active'));
            sections.forEach(section => section.classList.remove('active'));
            
            // Add active class to clicked button and corresponding section
            this.classList.add('active');
            const targetElement = document.getElementById(targetSection);
            if (targetElement) {
                targetElement.classList.add('active');
            }
        });
    });
}

// Typing Animation Function
function typeWriter(element, text, speed = 50) {
    element.innerHTML = '';
    element.classList.remove('hidden');
    let i = 0;
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// AKI Section Functionality
function initializeAkiSection() {
    const loveYouTooBtn = document.getElementById('loveYouTooBtn');
    const loveMessage = document.getElementById('loveMessage');
    
    // Store original content
    const originalContent = loveMessage.innerHTML;
    let isTyping = false;
    
    // Handle "I Love You My AKI!" button
    if (loveYouTooBtn) {
        loveYouTooBtn.addEventListener('click', function() {
            // Add click animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 200);
            
            // Toggle message visibility
            if (loveMessage.classList.contains('hidden') || !isTyping) {
                // Clear any existing content
                loveMessage.innerHTML = '';
                loveMessage.classList.remove('hidden');
                isTyping = true;
                
                // Start typing animation
                typeWriter(loveMessage, originalContent, 30);
                
                // Auto-play Taylor Swift - Lover song after a short delay
                setTimeout(() => {
                    playTaylorSwiftLover();
                }, 1000);
                
                // Scroll to message after a short delay
                setTimeout(() => {
                    loveMessage.scrollIntoView({ 
                        behavior: 'smooth', 
                        block: 'nearest' 
                    });
                }, 500);
                
                // Reset typing flag after animation completes
                setTimeout(() => {
                    isTyping = false;
                }, originalContent.length * 30 + 1000);
                
            } else {
                loveMessage.classList.add('hidden');
                isTyping = false;
            }
        });
    }
}

// Function to play Taylor Swift - Lover song
function playTaylorSwiftLover() {
    const audioPlayer = document.getElementById('audioPlayer');
    const songItems = document.querySelectorAll('.song-item');
    const playBtns = document.querySelectorAll('.play-btn');
    
    // Find Taylor Swift - Lover song (index 4)
    const taylorSwiftIndex = 4;
    
    if (audioPlayer && songItems.length > taylorSwiftIndex) {
        // Load and play the song
        const songFile = songItems[taylorSwiftIndex].dataset.song;
        const songTitle = songItems[taylorSwiftIndex].querySelector('h4').textContent;
        const songDescription = songItems[taylorSwiftIndex].querySelector('p').textContent;
        
        audioPlayer.src = `assets/music/${songFile}`;
        
        // Update UI
        document.getElementById('currentSong').textContent = songTitle;
        document.getElementById('currentArtist').textContent = songDescription;
        
        // Update active states
        songItems.forEach(item => item.classList.remove('active'));
        songItems[taylorSwiftIndex].classList.add('active');
        
        playBtns.forEach(btn => btn.textContent = '▶');
        playBtns[taylorSwiftIndex].textContent = '⏸';
        
        // Play the song with error handling
        audioPlayer.play().then(() => {
            console.log('Taylor Swift - Lover started playing successfully');
        }).catch(error => {
            console.error('Error playing Taylor Swift - Lover:', error);
            // Show user-friendly message if autoplay is blocked
            if (error.name === 'NotAllowedError') {
                showTemporaryMessage('Click play button to start music', playBtns[taylorSwiftIndex]);
            }
        });
    }
}

// Music Section Functionality
function initializeMusicSection() {
    const audioPlayer = document.getElementById('audioPlayer');
    const playPauseBtn = document.getElementById('playPauseBtn');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const currentSongEl = document.getElementById('currentSong');
    const currentArtistEl = document.getElementById('currentArtist');
    const songItems = document.querySelectorAll('.song-item');
    const playBtns = document.querySelectorAll('.play-btn');
    
    let currentSongIndex = 0;
    let isPlaying = false;
    
    const songs = Array.from(songItems).map(item => item.dataset.song);
    
    function loadSong(index) {
        const songFile = songs[index];
        const songItem = songItems[index];
        const songTitle = songItem.querySelector('h4').textContent;
        const songDescription = songItem.querySelector('p').textContent;
        
        // Show loading indicator
        showTemporaryMessage('Loading...', playPauseBtn);
        
        audioPlayer.src = `assets/music/${songFile}`;
        currentSongEl.textContent = songTitle;
        currentArtistEl.textContent = songDescription;
        
        // Update active state
        songItems.forEach(item => item.classList.remove('active'));
        songItems[index].classList.add('active');
        
        // Update play buttons
        playBtns.forEach(btn => btn.textContent = '▶');
        playBtns[index].textContent = isPlaying ? '⏸' : '▶';
        
        // Clear loading message when ready
        audioPlayer.addEventListener('canplay', () => {
            showTemporaryMessage('Click play button to start music', playPauseBtn);
        }, { once: true });
    }
    
    function playSong() {
        // Require user interaction for first play
        if (audioPlayer.src === '') {
            showTemporaryMessage('Click play button to start music', playPauseBtn);
            return;
        }
        
        audioPlayer.play().then(() => {
            isPlaying = true;
            playPauseBtn.textContent = '⏸';
            playBtns[currentSongIndex].textContent = '⏸';
        }).catch(error => {
            console.error('Audio play failed:', error);
            showTemporaryMessage('Click play button to start music', playPauseBtn);
        });
    }
    
    function pauseSong() {
        audioPlayer.pause();
        isPlaying = false;
        playPauseBtn.textContent = '▶';
        playBtns[currentSongIndex].textContent = '▶';
    }
    
    function togglePlayPause() {
        if (isPlaying) {
            pauseSong();
        } else {
            playSong();
        }
    }
    
    // Handle play/pause button
    if (playPauseBtn) {
        playPauseBtn.addEventListener('click', togglePlayPause);
    }
    
    // Handle previous button
    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
            loadSong(currentSongIndex);
            if (isPlaying) {
                playSong();
            }
        });
    }
    
    // Handle next button
    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            currentSongIndex = (currentSongIndex + 1) % songs.length;
            loadSong(currentSongIndex);
            if (isPlaying) {
                playSong();
            }
        });
    }
    
    // Handle song item clicks
    songItems.forEach((item, index) => {
        item.addEventListener('click', function(e) {
            // Don't trigger if clicking on the play button specifically
            if (!e.target.classList.contains('play-btn')) {
                currentSongIndex = index;
                loadSong(currentSongIndex);
                if (isPlaying) {
                    playSong();
                } else {
                    playSong();
                }
            }
        });
    });
    
    // Handle individual play buttons
    playBtns.forEach((btn, index) => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            if (currentSongIndex === index && isPlaying) {
                pauseSong();
            } else {
                currentSongIndex = index;
                loadSong(currentSongIndex);
                playSong();
            }
        });
    });
    
    // Handle audio ended event
    if (audioPlayer) {
        audioPlayer.addEventListener('ended', function() {
            // Auto play next song
            currentSongIndex = (currentSongIndex + 1) % songs.length;
            loadSong(currentSongIndex);
            playSong();
        });
    }
    
    // Load first song
    loadSong(0);
}

// Utility Functions
function showTemporaryMessage(message, element) {
    // Create temporary message element
    const messageEl = document.createElement('div');
    messageEl.textContent = message;
    messageEl.style.cssText = `
        position: absolute;
        top: -40px;
        left: 50%;
        transform: translateX(-50%);
        background: rgba(255, 255, 255, 0.9);
        color: #764ba2;
        padding: 8px 16px;
        border-radius: 20px;
        font-size: 14px;
        white-space: nowrap;
        z-index: 1000;
        animation: fadeInUp 0.3s ease-out;
    `;
    
    // Position relative to parent
    element.style.position = 'relative';
    element.appendChild(messageEl);
    
    // Remove after 3 seconds
    setTimeout(() => {
        messageEl.style.animation = 'fadeOut 0.3s ease-out';
        setTimeout(() => {
            if (messageEl.parentNode) {
                messageEl.parentNode.removeChild(messageEl);
            }
        }, 300);
    }, 3000);
}

// Add fadeOut animation dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeOut {
        from { opacity: 1; }
        to { opacity: 0; }
    }
`;
document.head.appendChild(style);

// Dynamic Gallery Functionality
function initializeDynamicGallery() {
    const galleryGrid = document.querySelector('.gallery-grid');
    if (!galleryGrid) return;

    // Array of known image files in assets/images folder
    // This approach ensures the gallery always reflects current folder contents
    const knownImages = [
        '0864d0c5-f4cc-44b3-9791-02ea85b96f8f.jpeg',
        '1st laag.jpeg',
        '1st pic beach.jpeg',
        '39cac872-9a62-47fd-a1a0-cd83bf5a735b.jpeg',
        'a3423beb-1414-4395-be76-adb5ca7ba61b.jpeg',
        'bday.jpeg',
        'beach  4.jpeg',
        'beach 3.jpeg',
        'beach.jpeg',
        'carnival.jpeg',
        'edit.jpeg',
        'gift.jpeg',
        'graduate.jpeg',
        'lothesa.jpeg',
        'nice pic.jpeg',
        'time 2.jpeg',
        'time.jpeg',
        'treat.jpeg'
    ];

    // Clear existing hardcoded gallery items
    galleryGrid.innerHTML = '';

    // Create gallery items for each image
    knownImages.forEach((imageName, index) => {
        const galleryItem = createGalleryItem(imageName, index);
        galleryGrid.appendChild(galleryItem);
    });

    // Add image load error handling
    addImageErrorHandling();
}

function createGalleryItem(imageName, index) {
    const item = document.createElement('div');
    item.className = 'gallery-item';
    
    const img = document.createElement('img');
    img.src = `assets/images/${imageName}`;
    img.alt = `Our precious memory ${index + 1}`;
    img.loading = 'lazy'; // Lazy loading for better performance
    
    // Create caption based on filename
    const caption = createImageCaption(imageName);
    
    const captionDiv = document.createElement('div');
    captionDiv.className = 'image-caption';
    captionDiv.textContent = caption;
    
    item.appendChild(img);
    item.appendChild(captionDiv);
    
    return item;
}

function createImageCaption(imageName) {
    // Generate meaningful captions based on filename
    const filename = imageName.toLowerCase().replace(/\.[^/.]+$/, ""); // Remove extension
    
    // Special captions for specific images
    const specialCaptions = {
        '0864d0c5-f4cc-44b3-9791-02ea85b96f8f': 'The time when you introduced me to your family.',
        '39cac872-9a62-47fd-a1a0-cd83bf5a735b': 'The first time I gave flowers as a gift.',
        'bday': 'I gave you a bouquet on your birthday.',
        'beach': 'Our beautiful beach moments.',
        'carnival': 'Fun times at the carnival.',
        'gift': 'The day you gave me a gift.',
        'lothesa': 'A precious moment together.',
        'time 2': 'Your special day.',
        'time': 'The day you said yes to me.',
        'treat': 'The time I treated you at Jollibee.',
        'graduate': 'Your proud graduation moment.'
    };
    
    // Check for special captions
    for (const [key, caption] of Object.entries(specialCaptions)) {
        if (filename.includes(key)) {
            return caption;
        }
    }
    
    // Default captions based on filename patterns
    if (filename.includes('beach')) {
        return 'Our beach adventures together.';
    } else if (filename.includes('1st')) {
        return 'Our first precious moments.';
    } else if (filename.includes('nice')) {
        return 'Picture for your graduation.';
    } else if (filename.includes('edit')) {
        return 'Your edited photo.';
    } else if (filename.includes('a3423beb-1414-4395-be76-adb5ca7ba61b')) {
        return 'Another precious memory with you.'; // No caption for this specific image
    } else {
        return 'The time of your graduation.';
    }
}

function addImageErrorHandling() {
    const images = document.querySelectorAll('.gallery-item img');
    
    images.forEach(img => {
        img.addEventListener('error', function() {
            // If image fails to load, remove the entire gallery item
            const galleryItem = this.closest('.gallery-item');
            if (galleryItem) {
                galleryItem.style.opacity = '0';
                setTimeout(() => {
                    galleryItem.remove();
                }, 300);
            }
        });
        
        img.addEventListener('load', function() {
            // Add fade-in effect when image loads successfully
            this.style.opacity = '0';
            this.style.transition = 'opacity 0.5s ease-in-out';
            setTimeout(() => {
                this.style.opacity = '1';
            }, 100);
        });
    });
}

// Flower Petals Background Effect
function initializeFlowerPetals() {
    const container = document.getElementById('flowerPetalsContainer');
    if (!container) return;

    const petalColors = ['pink', 'white', 'light-pink', 'red', 'yellow'];
    const petalCount = 15;

    function createPetal() {
        const petal = document.createElement('div');
        const colorClass = petalColors[Math.floor(Math.random() * petalColors.length)];
        
        petal.className = `flower-petal ${colorClass}`;
        
        // Random starting position
        const startX = Math.random() * window.innerWidth;
        petal.style.left = `${startX}px`;
        petal.style.top = '-50px';
        
        // Random animation duration
        const duration = 8 + Math.random() * 12;
        petal.style.animationDuration = `${duration}s`;
        
        // Random delay
        const delay = Math.random() * 5;
        petal.style.animationDelay = `${delay}s`;
        
        // Random size
        const size = 15 + Math.random() * 15;
        petal.style.width = `${size}px`;
        petal.style.height = `${size}px`;
        
        // Random horizontal drift
        const drift = (Math.random() - 0.5) * 100;
        petal.style.setProperty('--drift', `${drift}px`);
        
        container.appendChild(petal);
        
        // Remove petal after animation completes
        setTimeout(() => {
            if (petal.parentNode) {
                petal.remove();
            }
        }, (duration + delay) * 1000);
    }

    // Create initial petals
    for (let i = 0; i < petalCount; i++) {
        setTimeout(() => createPetal(), i * 300);
    }

    // Continue creating new petals
    setInterval(createPetal, 2000);
}

// Modal Flower Petals Effect (More petals)
function initializeModalFlowerPetals() {
    const container = document.getElementById('modalFlowerPetalsContainer');
    if (!container) return;

    const petalColors = ['pink', 'white', 'light-pink', 'red'];
    const petalCount = 30; // Increased petal count for modal

    function createModalPetal() {
        const petal = document.createElement('div');
        const colorClass = petalColors[Math.floor(Math.random() * petalColors.length)];
        
        petal.className = `flower-petal ${colorClass}`;
        
        // Random starting position within modal
        const startX = Math.random() * container.offsetWidth;
        petal.style.left = `${startX}px`;
        petal.style.top = '-50px';
        
        // Shorter animation duration for modal
        const duration = 6 + Math.random() * 8;
        petal.style.animationDuration = `${duration}s`;
        
        // Random delay
        const delay = Math.random() * 3;
        petal.style.animationDelay = `${delay}s`;
        
        // Smaller size for modal
        const size = 12 + Math.random() * 12;
        petal.style.width = `${size}px`;
        petal.style.height = `${size}px`;
        
        // Random horizontal drift
        const drift = (Math.random() - 0.5) * 80;
        petal.style.setProperty('--drift', `${drift}px`);
        
        container.appendChild(petal);
        
        // Remove petal after animation completes
        setTimeout(() => {
            if (petal.parentNode) {
                petal.remove();
            }
        }, (duration + delay) * 1000);
    }

    // Create initial petals with faster spawn rate
    for (let i = 0; i < petalCount; i++) {
        setTimeout(() => createModalPetal(), i * 100);
    }

    // Continue creating new petals more frequently for modal
    const modalInterval = setInterval(createModalPetal, 1000);

    // Clean up interval when modal is hidden
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.target.classList.contains('hidden')) {
                clearInterval(modalInterval);
                observer.disconnect();
            }
        });
    });

    observer.observe(container.parentElement, {
        attributes: true,
        attributeFilter: ['class']
    });
}
