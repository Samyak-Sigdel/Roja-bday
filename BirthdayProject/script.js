document.addEventListener('DOMContentLoaded', function() {
    console.log("🎂 Birthday Celebration Loading...");
    
    // Create sparkles
    createSparkles();
    
    // Elements
    const elements = {
        welcomeScreen: document.getElementById('welcomeScreen'),
        appContainer: document.getElementById('appContainer'),
        startBtn: document.getElementById('startBtn'),
        birthdayMusic: document.getElementById('birthdayMusic'),
        musicBtn: document.getElementById('musicBtn'),
        blowBtn: document.getElementById('blowBtn'),
        confettiBtn: document.getElementById('confettiBtn'),
        danceBtn: document.getElementById('danceBtn'),
        flames: document.querySelectorAll('.flame'),
        toast: document.getElementById('toast'),
        openGiftBtn: document.getElementById('openGiftBtn'),
        giftModal: document.getElementById('giftModal'),
        giftClose: document.getElementById('giftClose'),
        prevSlide: document.getElementById('prevSlide'),
        nextSlide: document.getElementById('nextSlide'),
        slides: document.querySelectorAll('.slide'),
        dots: document.querySelectorAll('.slide-dot')
    };
    
    // State
    let isMusicPlaying = false;
    let isCandleLit = true;
    let balloonsInterval;
    let giftAutoOpenedOnce = false;
    let currentSlide = 0;
    const totalSlides = elements.slides.length;
    
    // Create sparkles in background
    function createSparkles() {
        const container = document.getElementById('sparkles');
        for (let i = 0; i < 50; i++) {
            const sparkle = document.createElement('div');
            sparkle.className = 'sparkle';
            sparkle.style.left = Math.random() * 100 + 'vw';
            sparkle.style.top = Math.random() * 100 + 'vh';
            sparkle.style.animationDelay = Math.random() * 3 + 's';
            container.appendChild(sparkle);
        }
    }
    
    // Slideshow Functions
    function showSlide(index) {
        elements.slides.forEach(slide => slide.classList.remove('active'));
        elements.dots.forEach(dot => dot.classList.remove('active'));
        
        elements.slides[index].classList.add('active');
        elements.dots[index].classList.add('active');
        currentSlide = index;
    }
    
    function nextSlide() {
        currentSlide = (currentSlide + 1) % totalSlides;
        showSlide(currentSlide);
    }
    
    function prevSlide() {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        showSlide(currentSlide);
    }
    
    // Slideshow event listeners
    if (elements.nextSlide) {
        elements.nextSlide.addEventListener('click', nextSlide);
    }
    
    if (elements.prevSlide) {
        elements.prevSlide.addEventListener('click', prevSlide);
    }
    
    elements.dots.forEach((dot, index) => {
        dot.addEventListener('click', () => showSlide(index));
    });
    
    // Auto advance slides every 5 seconds
    let slideInterval = setInterval(nextSlide, 5000);
    
    // Pause auto-advance when hovering over slideshow
    const slideshowContainer = document.querySelector('.slideshow-container');
    if (slideshowContainer) {
        slideshowContainer.addEventListener('mouseenter', () => {
            clearInterval(slideInterval);
        });
        
        slideshowContainer.addEventListener('mouseleave', () => {
            slideInterval = setInterval(nextSlide, 5000);
        });
    }
    
    // Start Celebration
    elements.startBtn.addEventListener('click', function() {
        console.log("🎉 Starting celebration...");
        
        this.style.transform = 'scale(0.95)';
        
        elements.welcomeScreen.style.opacity = '0';
        elements.welcomeScreen.style.transition = 'opacity 0.8s ease';
        
        setTimeout(() => {
            elements.welcomeScreen.style.display = 'none';
            elements.appContainer.style.display = 'block';
            elements.appContainer.style.animation = 'fadeIn 1s forwards';
            createBalloons();
            showToast("🎉 WELCOME TO YOUR BIRTHDAY ROJA! 🎉");
            
            setTimeout(() => {
                this.style.transform = '';
            }, 300);
        }, 800);
        
        setTimeout(() => {
            playMusic();
        }, 1000);
    });
    
    // Music Functions
    function playMusic() {
        console.log("🎵 Attempting to play music...");
        
        elements.birthdayMusic.volume = 0.6;
        
        const playPromise = elements.birthdayMusic.play();
        
        if (playPromise !== undefined) {
            playPromise.then(() => {
                console.log("✅ Music playing successfully!");
                isMusicPlaying = true;
                elements.musicBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
                elements.musicBtn.style.background = 'linear-gradient(45deg, #FF69B4, #FF1493)';
            }).catch(error => {
                console.log("⚠️ Auto-play blocked, will play on button click");
                showToast("🎵 Click the music button to start!");
            });
        }
    }
    
    // Music toggle
    elements.musicBtn.addEventListener('click', function() {
        console.log("🎵 Music button clicked");
        
        if (isMusicPlaying) {
            elements.birthdayMusic.pause();
            this.innerHTML = '<i class="fas fa-volume-mute"></i>';
            this.style.background = 'linear-gradient(45deg, #FF69B4, #FF1493)';
            showToast("Music paused");
        } else {
            elements.birthdayMusic.play().then(() => {
                this.innerHTML = '<i class="fas fa-volume-up"></i>';
                this.style.background = 'linear-gradient(45deg, #FF1493, #FF69B4)';
                showToast("🎵 Happy Birthday music playing!");
                isMusicPlaying = true;
            }).catch(error => {
                console.log("Music play failed:", error);
                showToast("Click again to allow music");
            });
        }
        
        this.style.transform = 'scale(1.2)';
        setTimeout(() => {
            this.style.transform = '';
        }, 300);
    });
    
    // Blow candles
    elements.blowBtn.addEventListener('click', function() {
        console.log("🕯️ Blow button clicked");
        
        if (isCandleLit) {
            elements.flames.forEach((flame, index) => {
                setTimeout(() => {
                    flame.style.animation = 'none';
                    flame.style.opacity = '0';
                    flame.style.transform = 'translateX(-50%) scale(0.3)';
                }, index * 200);
            });
            
            this.innerHTML = '<i class="fas fa-magic"></i> WISH GRANTED!';
            this.style.background = 'linear-gradient(45deg, #FF1493, #FF69B4)';
            
            createSmoke();
            createConfetti(200);
            showToast("✨ YOUR WISH HAS BEEN SENT! ✨");
            playCelebrationSound();
            
            isCandleLit = false;
            
            if (!giftAutoOpenedOnce) {
                giftAutoOpenedOnce = true;
                setTimeout(() => {
                    openGiftModal();
                }, 900);
            }
            
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 300);
            
            setTimeout(() => {
                if (!isCandleLit) {
                    this.innerHTML = '<i class="fas fa-redo"></i> RELIGHT CANDLES';
                }
            }, 3000);
        } else {
            elements.flames.forEach((flame, index) => {
                setTimeout(() => {
                    flame.style.animation = 'flicker 0.4s infinite alternate, glow-flame 1s infinite alternate';
                    flame.style.opacity = '1';
                    flame.style.transform = 'translateX(-50%) scale(1)';
                }, index * 200);
            });
            
            this.innerHTML = '<i class="fas fa-wind"></i> BLOW OUT CANDLES';
            this.style.background = 'linear-gradient(45deg, #FF69B4, #FF1493)';
            
            showToast("Candles relit! Make another wish! 🔥");
            
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 300);
            
            isCandleLit = true;
        }
    });
    
    // Confetti button
    elements.confettiBtn.addEventListener('click', function() {
        console.log("🎊 Confetti button clicked");
        
        createConfetti(300);
        
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = '';
        }, 300);
        
        playConfettiSound();
        showToast("🎊 CONFETTI EVERYWHERE! 🎊");
    });
    
    // Dance button
    elements.danceBtn.addEventListener('click', function() {
        console.log("💃 Dance button clicked");
        
        document.querySelectorAll('.section').forEach(section => {
            section.style.animation = 'dance 0.3s ease-in-out';
            setTimeout(() => {
                section.style.animation = '';
            }, 300);
        });
        
        if (!document.querySelector('#dance-style')) {
            const style = document.createElement('style');
            style.id = 'dance-style';
            style.textContent = `
                @keyframes dance {
                    0%, 100% { transform: translateX(0); }
                    25% { transform: translateX(-15px); }
                    75% { transform: translateX(15px); }
                }
            `;
            document.head.appendChild(style);
        }
        
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = '';
        }, 300);
        
        playDanceSound();
        createConfetti(100);
        showToast("💃 LET'S DANCE! 🕺");
    });

    // Gift Modal Functions
    function openGiftModal() {
        if (!elements.giftModal) return;
        elements.giftModal.classList.add('show');
        elements.giftModal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
        showToast("🎁 A gift for you, Roja!");
    }

    function closeGiftModal() {
        if (!elements.giftModal) return;
        elements.giftModal.classList.remove('show');
        elements.giftModal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }

    if (elements.openGiftBtn) {
        elements.openGiftBtn.addEventListener('click', function() {
            openGiftModal();
            this.style.transform = 'scale(0.95)';
            setTimeout(() => { this.style.transform = ''; }, 220);
        });
    }

    if (elements.giftClose) {
        elements.giftClose.addEventListener('click', function() {
            closeGiftModal();
        });
    }

    if (elements.giftModal) {
        elements.giftModal.addEventListener('click', function(e) {
            if (e.target === elements.giftModal) {
                closeGiftModal();
            }
        });
    }

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && elements.giftModal && elements.giftModal.classList.contains('show')) {
            closeGiftModal();
        }
    });
    
    // Helper Functions
    function createBalloons() {
        console.log("🎈 Creating balloons...");
        
        if (balloonsInterval) clearInterval(balloonsInterval);
        
        balloonsInterval = setInterval(() => {
            const balloon = document.createElement('div');
            balloon.className = 'balloon';
            
            const colors = ['#FF69B4', '#FFB6C1', '#FF1493', '#FFC0CB', '#FFD1DC'];
            const color = colors[Math.floor(Math.random() * colors.length)];
            balloon.style.background = `radial-gradient(circle at 30% 30%, ${color}, ${color}dd)`;
            
            const left = Math.random() * 85 + 5;
            balloon.style.left = left + '%';
            
            const duration = Math.random() * 10 + 15;
            balloon.style.animationDuration = duration + 's';
            
            document.body.appendChild(balloon);
            
            setTimeout(() => {
                if (balloon.parentNode) {
                    balloon.remove();
                }
            }, duration * 1000);
        }, 1500);
    }
    
    function createConfetti(count) {
        console.log(`🎊 Creating ${count} confetti pieces`);
        const colors = ['#FF69B4', '#FFB6C1', '#FF1493', '#FFC0CB', '#FFD1DC'];
        
        for (let i = 0; i < count; i++) {
            setTimeout(() => {
                const confetti = document.createElement('div');
                confetti.className = 'confetti';
                
                const left = Math.random() * 100;
                const size = Math.random() * 15 + 5;
                const color = colors[Math.floor(Math.random() * colors.length)];
                const shape = Math.random() > 0.5 ? 'circle' : 'square';
                
                confetti.style.cssText = `
                    position: fixed;
                    left: ${left}vw;
                    width: ${size}px;
                    height: ${shape === 'circle' ? size : size/2}px;
                    background: ${color};
                    border-radius: ${shape === 'circle' ? '50%' : '3px'};
                    transform: rotate(${Math.random() * 360}deg);
                    z-index: 9999;
                    pointer-events: none;
                    top: -20px;
                `;
                
                document.body.appendChild(confetti);
                
                const duration = Math.random() * 3 + 2;
                const horizontalDrift = (Math.random() - 0.5) * 400;
                
                confetti.animate([
                    { 
                        transform: `translate(0, 0) rotate(0deg)`,
                        opacity: 1
                    },
                    { 
                        transform: `translate(${horizontalDrift}px, 100vh) rotate(${Math.random() * 720}deg)`,
                        opacity: 0
                    }
                ], {
                    duration: duration * 1000,
                    easing: 'cubic-bezier(0.1, 0.8, 0.9, 0.1)'
                });
                
                setTimeout(() => {
                    if (confetti.parentNode) confetti.remove();
                }, duration * 1000);
            }, i * 5);
        }
    }
    
    function createSmoke() {
        const cake = document.querySelector('.cake');
        for (let i = 0; i < 20; i++) {
            setTimeout(() => {
                const smoke = document.createElement('div');
                smoke.style.cssText = `
                    position: absolute;
                    width: ${15 + Math.random() * 15}px;
                    height: ${15 + Math.random() * 15}px;
                    background: radial-gradient(circle, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0) 70%);
                    border-radius: 50%;
                    top: 40%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    z-index: 10;
                    filter: blur(2px);
                `;
                
                cake.appendChild(smoke);
                
                const angle = Math.random() * Math.PI * 2;
                const distance = Math.random() * 120 + 60;
                const duration = Math.random() * 1.5 + 0.5;
                
                smoke.animate([
                    { 
                        transform: 'translate(-50%, -50%) scale(1)',
                        opacity: 1
                    },
                    { 
                        transform: `translate(${Math.cos(angle) * distance - 50}px, ${Math.sin(angle) * distance - 50}px) scale(3)`,
                        opacity: 0
                    }
                ], {
                    duration: duration * 1000,
                    easing: 'ease-out'
                }).onfinish = () => {
                    if (smoke.parentNode) smoke.remove();
                };
            }, i * 50);
        }
    }
    
    function playCelebrationSound() {
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            for (let i = 0; i < 6; i++) {
                setTimeout(() => {
                    const oscillator = audioContext.createOscillator();
                    const gainNode = audioContext.createGain();
                    
                    oscillator.connect(gainNode);
                    gainNode.connect(audioContext.destination);
                    
                    const notes = [523.25, 659.25, 783.99, 1046.50];
                    oscillator.frequency.setValueAtTime(notes[i % 4], audioContext.currentTime);
                    oscillator.type = 'sine';
                    
                    gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
                    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.4);
                    
                    oscillator.start();
                    oscillator.stop(audioContext.currentTime + 0.4);
                }, i * 200);
            }
        } catch (error) {
            console.log("Sound effects not available");
        }
    }
    
    function playConfettiSound() {
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            for (let i = 0; i < 8; i++) {
                setTimeout(() => {
                    const oscillator = audioContext.createOscillator();
                    const gainNode = audioContext.createGain();
                    
                    oscillator.connect(gainNode);
                    gainNode.connect(audioContext.destination);
                    
                    oscillator.frequency.setValueAtTime(800 + Math.random() * 400, audioContext.currentTime);
                    oscillator.type = 'triangle';
                    
                    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
                    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
                    
                    oscillator.start();
                    oscillator.stop(audioContext.currentTime + 0.1);
                }, i * 50);
            }
        } catch (error) {
            console.log("Sound effects not available");
        }
    }
    
    function playDanceSound() {
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            for (let i = 0; i < 4; i++) {
                setTimeout(() => {
                    const oscillator = audioContext.createOscillator();
                    const gainNode = audioContext.createGain();
                    
                    oscillator.connect(gainNode);
                    gainNode.connect(audioContext.destination);
                    
                    oscillator.frequency.setValueAtTime(150 + i * 50, audioContext.currentTime);
                    oscillator.type = 'sine';
                    
                    gainNode.gain.setValueAtTime(0.15, audioContext.currentTime);
                    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
                    
                    oscillator.start();
                    oscillator.stop(audioContext.currentTime + 0.3);
                }, i * 200);
            }
        } catch (error) {
            console.log("Sound effects not available");
        }
    }
    
    function showToast(message) {
        console.log("📱 Toast:", message);
        elements.toast.textContent = message;
        elements.toast.style.opacity = '1';
        elements.toast.style.transform = 'translateX(-50%) translateY(0)';
        setTimeout(() => {
            elements.toast.style.opacity = '0';
            elements.toast.style.transform = 'translateX(-50%) translateY(-100px)';
        }, 3000);
    }
    
    // Add fadeIn animation
    if (!document.querySelector('#fadeIn-style')) {
        const style = document.createElement('style');
        style.id = 'fadeIn-style';
        style.textContent = `
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
        `;
        document.head.appendChild(style);
    }
    
    document.addEventListener('click', function initializeAudio() {
        console.log("🎵 Audio context initialized");
        document.removeEventListener('click', initializeAudio);
    }, { once: true });
    
    console.log("✅ Birthday Celebration Ready!");
    console.log("🎂 Happy Birthday Roja! 🎂");
});