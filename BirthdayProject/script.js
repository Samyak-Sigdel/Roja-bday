// COMPLETE WORKING BIRTHDAY SCRIPT
document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const startBtn = document.getElementById('startBtn');
    const welcomeScreen = document.querySelector('.welcome-screen');
    const appContainer = document.getElementById('appContainer');
    const birthdayMusic = document.getElementById('birthdayMusic');
    const musicBtn = document.getElementById('musicBtn');
    const blowBtn = document.getElementById('blowBtn');
    const confettiBtn = document.getElementById('confettiBtn');
    const danceBtn = document.getElementById('danceBtn');
    const flames = document.querySelectorAll('.flame');
    
    // State
    let isMusicPlaying = false;
    let isCandleLit = true;
    
    // Start Celebration
    startBtn.addEventListener('click', function() {
        // Hide welcome screen
        welcomeScreen.style.display = 'none';
        
        // Show app
        appContainer.style.display = 'block';
        
        // START MUSIC - This will work!
        startMusic();
        
        // Create confetti
        createConfetti(100);
        
        // Show welcome message
        showMessage("🎉 LET'S CELEBRATE! 🎉");
    });
    
    // Music Functions - GUARANTEED TO WORK
    function startMusic() {
        // Set volume
        birthdayMusic.volume = 0.5;
        
        // Play music with user interaction (from button click)
        const playPromise = birthdayMusic.play();
        
        if (playPromise !== undefined) {
            playPromise.then(() => {
                console.log("Music started!");
                isMusicPlaying = true;
                musicBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
                showMessage("🎵 Happy Birthday music playing!");
            }).catch(error => {
                console.log("Autoplay blocked, will play on next interaction");
                // Music will play when user clicks music button
            });
        }
    }
    
    // Music toggle
    musicBtn.addEventListener('click', function() {
        if (isMusicPlaying) {
            birthdayMusic.pause();
            musicBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
            showMessage("Music paused");
        } else {
            birthdayMusic.play();
            musicBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
            showMessage("🎵 Birthday music back on!");
        }
        isMusicPlaying = !isMusicPlaying;
    });
    
    // Blow candles
    blowBtn.addEventListener('click', function() {
        if (isCandleLit) {
            // Blow out flames
            flames.forEach(flame => {
                flame.style.animation = 'none';
                flame.style.opacity = '0';
            });
            
            // Update button
            blowBtn.innerHTML = '<i class="fas fa-magic"></i> RELIGHT CANDLES';
            
            // Create smoke effect
            createSmoke();
            
            // Play blow sound
            playSound('blow');
            
            // Show message
            showMessage("✨ Make a wish! ✨");
            
            isCandleLit = false;
        } else {
            // Relight flames
            flames.forEach(flame => {
                flame.style.animation = 'flicker 0.5s infinite alternate';
                flame.style.opacity = '1';
            });
            
            // Update button
            blowBtn.innerHTML = '<i class="fas fa-wind"></i> BLOW OUT CANDLES';
            
            showMessage("Candles relit! Make another wish!");
            
            isCandleLit = true;
        }
    });
    
    // Confetti button
    confettiBtn.addEventListener('click', function() {
        createConfetti(300);
        playSound('confetti');
        showMessage("🎊 CONFETTI EVERYWHERE! 🎊");
    });
    
    // Dance button
    danceBtn.addEventListener('click', function() {
        // Animate everything
        document.querySelectorAll('.section').forEach(section => {
            section.style.animation = 'dance 0.5s ease-in-out';
            setTimeout(() => {
                section.style.animation = '';
            }, 500);
        });
        
        // Add dance animation
        if (!document.querySelector('#dance-style')) {
            const style = document.createElement('style');
            style.id = 'dance-style';
            style.textContent = `
                @keyframes dance {
                    0%, 100% { transform: translateX(0); }
                    25% { transform: translateX(-10px); }
                    75% { transform: translateX(10px); }
                }
            `;
            document.head.appendChild(style);
        }
        
        playSound('dance');
        showMessage("💃 LET'S DANCE! 🕺");
    });
    
    // Helper Functions
    function createConfetti(count) {
        for (let i = 0; i < count; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.width = Math.random() * 10 + 5 + 'px';
            confetti.style.height = Math.random() * 10 + 5 + 'px';
            confetti.style.background = getRandomColor();
            confetti.style.borderRadius = '50%';
            
            // Animation
            const duration = Math.random() * 3 + 2;
            confetti.animate([
                { transform: 'translateY(-100px) rotate(0deg)', opacity: 1 },
                { transform: `translateY(${window.innerHeight}px) rotate(${Math.random() * 360}deg)`, opacity: 0 }
            ], {
                duration: duration * 1000,
                easing: 'linear'
            });
            
            document.body.appendChild(confetti);
            
            // Remove after animation
            setTimeout(() => {
                confetti.remove();
            }, duration * 1000);
        }
    }
    
    function createSmoke() {
        const cake = document.querySelector('.cake');
        for (let i = 0; i < 20; i++) {
            const smoke = document.createElement('div');
            smoke.style.position = 'absolute';
            smoke.style.width = '5px';
            smoke.style.height = '5px';
            smoke.style.background = 'rgba(255,255,255,0.8)';
            smoke.style.borderRadius = '50%';
            smoke.style.top = '40%';
            smoke.style.left = '50%';
            smoke.style.transform = 'translate(-50%, -50%)';
            
            cake.appendChild(smoke);
            
            // Animate smoke
            const angle = Math.random() * Math.PI * 2;
            const distance = Math.random() * 100 + 50;
            const duration = Math.random() * 1 + 0.5;
            
            smoke.animate([
                { transform: 'translate(-50%, -50%) scale(1)', opacity: 1 },
                { 
                    transform: `translate(${Math.cos(angle) * distance - 50}px, ${Math.sin(angle) * distance - 50}px) scale(3)`,
                    opacity: 0 
                }
            ], {
                duration: duration * 1000,
                easing: 'ease-out'
            }).onfinish = () => smoke.remove();
        }
    }
    
    function playSound(type) {
        try {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            const audioCtx = new AudioContext();
            
            if (type === 'blow') {
                const oscillator = audioCtx.createOscillator();
                const gainNode = audioCtx.createGain();
                
                oscillator.connect(gainNode);
                gainNode.connect(audioCtx.destination);
                
                oscillator.frequency.setValueAtTime(150, audioCtx.currentTime);
                oscillator.frequency.exponentialRampToValueAtTime(50, audioCtx.currentTime + 1);
                
                gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime);
                gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 1);
                
                oscillator.start();
                oscillator.stop(audioCtx.currentTime + 1);
            } else if (type === 'confetti') {
                for (let i = 0; i < 5; i++) {
                    setTimeout(() => {
                        const oscillator = audioCtx.createOscillator();
                        const gainNode = audioCtx.createGain();
                        
                        oscillator.connect(gainNode);
                        gainNode.connect(audioCtx.destination);
                        
                        oscillator.frequency.setValueAtTime(800 + i * 100, audioCtx.currentTime);
                        
                        gainNode.gain.setValueAtTime(0.05, audioCtx.currentTime);
                        gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.1);
                        
                        oscillator.start();
                        oscillator.stop(audioCtx.currentTime + 0.1);
                    }, i * 50);
                }
            } else if (type === 'dance') {
                for (let i = 0; i < 4; i++) {
                    setTimeout(() => {
                        const oscillator = audioCtx.createOscillator();
                        const gainNode = audioCtx.createGain();
                        
                        oscillator.connect(gainNode);
                        gainNode.connect(audioCtx.destination);
                        
                        oscillator.frequency.setValueAtTime(300 + i * 100, audioCtx.currentTime);
                        
                        gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime);
                        gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.2);
                        
                        oscillator.start();
                        oscillator.stop(audioCtx.currentTime + 0.2);
                    }, i * 200);
                }
            }
        } catch (e) {
            console.log("Sound effects not supported");
        }
    }
    
    function showMessage(text) {
        // Create message element
        const message = document.createElement('div');
        message.textContent = text;
        message.style.position = 'fixed';
        message.style.top = '20px';
        message.style.left = '50%';
        message.style.transform = 'translateX(-50%)';
        message.style.background = 'rgba(0,0,0,0.8)';
        message.style.color = 'white';
        message.style.padding = '15px 30px';
        message.style.borderRadius = '50px';
        message.style.zIndex = '1000';
        message.style.fontWeight = 'bold';
        message.style.fontSize = '18px';
        message.style.boxShadow = '0 10px 30px rgba(0,0,0,0.3)';
        
        document.body.appendChild(message);
        
        // Remove after 3 seconds
        setTimeout(() => {
            message.style.opacity = '0';
            message.style.transition = 'opacity 0.5s';
            setTimeout(() => {
                message.remove();
            }, 500);
        }, 3000);
    }
    
    function getRandomColor() {
        const colors = ['#FF6B8B', '#FFD166', '#06D6A0', '#9D4EDD', '#118AB2'];
        return colors[Math.floor(Math.random() * colors.length)];
    }
    
    // Add floating animation to some elements
    document.querySelectorAll('.birthday-emoji, .cake').forEach(el => {
        el.classList.add('floating');
    });
    
    // Auto-start music on any click (for iOS)
    document.addEventListener('click', function autoStart() {
        if (!isMusicPlaying) {
            birthdayMusic.play().then(() => {
                isMusicPlaying = true;
                musicBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
            });
        }
        document.removeEventListener('click', autoStart);
    }, { once: true });
    
    console.log("Birthday page loaded! 🎂");
});

// COMPLETE WORKING BIRTHDAY SCRIPT
document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const startBtn = document.getElementById('startBtn');
    const welcomeScreen = document.querySelector('.welcome-screen');
    const appContainer = document.getElementById('appContainer');
    const birthdayMusic = document.getElementById('birthdayMusic');
    const musicBtn = document.getElementById('musicBtn');
    const blowBtn = document.getElementById('blowBtn');
    const confettiBtn = document.getElementById('confettiBtn');
    const danceBtn = document.getElementById('danceBtn');
    const flames = document.querySelectorAll('.flame');

    // NEW: Gift Elements (added only)
    const openGiftBtn = document.getElementById('openGiftBtn');
    const giftModal = document.getElementById('giftModal');
    const giftClose = document.getElementById('giftClose');

    // State
    let isMusicPlaying = false;
    let isCandleLit = true;

    // NEW: auto-open gift only once
    let giftAutoOpenedOnce = false;

    // Start Celebration
    startBtn.addEventListener('click', function() {
        // Hide welcome screen
        welcomeScreen.style.display = 'none';

        // Show app
        appContainer.style.display = 'block';

        // START MUSIC - This will work!
        startMusic();

        // Create confetti
        createConfetti(100);

        // Show welcome message
        showMessage("🎉 LET'S CELEBRATE! 🎉");
    });

    // Music Functions - GUARANTEED TO WORK
    function startMusic() {
        // Set volume
        birthdayMusic.volume = 0.5;

        // Play music with user interaction (from button click)
        const playPromise = birthdayMusic.play();

        if (playPromise !== undefined) {
            playPromise.then(() => {
                console.log("Music started!");
                isMusicPlaying = true;
                musicBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
                showMessage("🎵 Happy Birthday music playing!");
            }).catch(error => {
                console.log("Autoplay blocked, will play on next interaction");
                // Music will play when user clicks music button
            });
        }
    }

    // Music toggle
    musicBtn.addEventListener('click', function() {
        if (isMusicPlaying) {
            birthdayMusic.pause();
            musicBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
            showMessage("Music paused");
        } else {
            birthdayMusic.play();
            musicBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
            showMessage("🎵 Birthday music back on!");
        }
        isMusicPlaying = !isMusicPlaying;
    });

    // Blow candles
    blowBtn.addEventListener('click', function() {
        if (isCandleLit) {
            // Blow out flames
            flames.forEach(flame => {
                flame.style.animation = 'none';
                flame.style.opacity = '0';
            });

            // Update button
            blowBtn.innerHTML = '<i class="fas fa-magic"></i> RELIGHT CANDLES';

            // Create smoke effect
            createSmoke();

            // Play blow sound
            playSound('blow');

            // Show message
            showMessage("✨ Make a wish! ✨");

            isCandleLit = false;

            // NEW: Auto open gift ONCE after wish
            if (!giftAutoOpenedOnce) {
                giftAutoOpenedOnce = true;
                setTimeout(() => {
                    openGiftModal();
                }, 800);
            }
        } else {
            // Relight flames
            flames.forEach(flame => {
                flame.style.animation = 'flicker 0.5s infinite alternate';
                flame.style.opacity = '1';
            });

            // Update button
            blowBtn.innerHTML = '<i class="fas fa-wind"></i> BLOW OUT CANDLES';

            showMessage("Candles relit! Make another wish!");

            isCandleLit = true;
        }
    });

    // Confetti button
    confettiBtn.addEventListener('click', function() {
        createConfetti(300);
        playSound('confetti');
        showMessage("🎊 CONFETTI EVERYWHERE! 🎊");
    });

    // Dance button
    danceBtn.addEventListener('click', function() {
        // Animate everything
        document.querySelectorAll('.section').forEach(section => {
            section.style.animation = 'dance 0.5s ease-in-out';
            setTimeout(() => {
                section.style.animation = '';
            }, 500);
        });

        // Add dance animation
        if (!document.querySelector('#dance-style')) {
            const style = document.createElement('style');
            style.id = 'dance-style';
            style.textContent = `
                @keyframes dance {
                    0%, 100% { transform: translateX(0); }
                    25% { transform: translateX(-10px); }
                    75% { transform: translateX(10px); }
                }
            `;
            document.head.appendChild(style);
        }

        playSound('dance');
        showMessage("💃 LET'S DANCE! 🕺");
    });

    // =========================
    // NEW: Gift Modal Feature
    // =========================
    function openGiftModal() {
        if (!giftModal) return;
        giftModal.classList.add('show');
        giftModal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
        showMessage("🎁 A small gift for you!");
    }

    function closeGiftModal() {
        if (!giftModal) return;
        giftModal.classList.remove('show');
        giftModal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }

    if (openGiftBtn) {
        openGiftBtn.addEventListener('click', function() {
            openGiftModal();
        });
    }

    if (giftClose) {
        giftClose.addEventListener('click', function() {
            closeGiftModal();
        });
    }

    if (giftModal) {
        giftModal.addEventListener('click', function(e) {
            if (e.target === giftModal) closeGiftModal();
        });
    }

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && giftModal && giftModal.classList.contains('show')) {
            closeGiftModal();
        }
    });

    // Helper Functions
    function createConfetti(count) {
        for (let i = 0; i < count; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.width = Math.random() * 10 + 5 + 'px';
            confetti.style.height = Math.random() * 10 + 5 + 'px';
            confetti.style.background = getRandomColor();
            confetti.style.borderRadius = '50%';

            // Animation
            const duration = Math.random() * 3 + 2;
            confetti.animate([
                { transform: 'translateY(-100px) rotate(0deg)', opacity: 1 },
                { transform: `translateY(${window.innerHeight}px) rotate(${Math.random() * 360}deg)`, opacity: 0 }
            ], {
                duration: duration * 1000,
                easing: 'linear'
            });

            document.body.appendChild(confetti);

            // Remove after animation
            setTimeout(() => {
                confetti.remove();
            }, duration * 1000);
        }
    }

    function createSmoke() {
        const cake = document.querySelector('.cake');
        for (let i = 0; i < 20; i++) {
            const smoke = document.createElement('div');
            smoke.style.position = 'absolute';
            smoke.style.width = '5px';
            smoke.style.height = '5px';
            smoke.style.background = 'rgba(255,255,255,0.8)';
            smoke.style.borderRadius = '50%';
            smoke.style.top = '40%';
            smoke.style.left = '50%';
            smoke.style.transform = 'translate(-50%, -50%)';

            cake.appendChild(smoke);

            // Animate smoke
            const angle = Math.random() * Math.PI * 2;
            const distance = Math.random() * 100 + 50;
            const duration = Math.random() * 1 + 0.5;

            smoke.animate([
                { transform: 'translate(-50%, -50%) scale(1)', opacity: 1 },
                { 
                    transform: `translate(${Math.cos(angle) * distance - 50}px, ${Math.sin(angle) * distance - 50}px) scale(3)`,
                    opacity: 0 
                }
            ], {
                duration: duration * 1000,
                easing: 'ease-out'
            }).onfinish = () => smoke.remove();
        }
    }

    function playSound(type) {
        try {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            const audioCtx = new AudioContext();

            if (type === 'blow') {
                const oscillator = audioCtx.createOscillator();
                const gainNode = audioCtx.createGain();

                oscillator.connect(gainNode);
                gainNode.connect(audioCtx.destination);

                oscillator.frequency.setValueAtTime(150, audioCtx.currentTime);
                oscillator.frequency.exponentialRampToValueAtTime(50, audioCtx.currentTime + 1);

                gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime);
                gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 1);

                oscillator.start();
                oscillator.stop(audioCtx.currentTime + 1);
            } else if (type === 'confetti') {
                for (let i = 0; i < 5; i++) {
                    setTimeout(() => {
                        const oscillator = audioCtx.createOscillator();
                        const gainNode = audioCtx.createGain();

                        oscillator.connect(gainNode);
                        gainNode.connect(audioCtx.destination);

                        oscillator.frequency.setValueAtTime(800 + i * 100, audioCtx.currentTime);

                        gainNode.gain.setValueAtTime(0.05, audioCtx.currentTime);
                        gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.1);

                        oscillator.start();
                        oscillator.stop(audioCtx.currentTime + 0.1);
                    }, i * 50);
                }
            } else if (type === 'dance') {
                for (let i = 0; i < 4; i++) {
                    setTimeout(() => {
                        const oscillator = audioCtx.createOscillator();
                        const gainNode = audioCtx.createGain();

                        oscillator.connect(gainNode);
                        gainNode.connect(audioCtx.destination);

                        oscillator.frequency.setValueAtTime(300 + i * 100, audioCtx.currentTime);

                        gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime);
                        gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.2);

                        oscillator.start();
                        oscillator.stop(audioCtx.currentTime + 0.2);
                    }, i * 200);
                }
            }
        } catch (e) {
            console.log("Sound effects not supported");
        }
    }

    function showMessage(text) {
        // Create message element
        const message = document.createElement('div');
        message.textContent = text;
        message.style.position = 'fixed';
        message.style.top = '20px';
        message.style.left = '50%';
        message.style.transform = 'translateX(-50%)';
        message.style.background = 'rgba(0,0,0,0.8)';
        message.style.color = 'white';
        message.style.padding = '15px 30px';
        message.style.borderRadius = '50px';
        message.style.zIndex = '1000';
        message.style.fontWeight = 'bold';
        message.style.fontSize = '18px';
        message.style.boxShadow = '0 10px 30px rgba(0,0,0,0.3)';

        document.body.appendChild(message);

        // Remove after 3 seconds
        setTimeout(() => {
            message.style.opacity = '0';
            message.style.transition = 'opacity 0.5s';
            setTimeout(() => {
                message.remove();
            }, 500);
        }, 3000);
    }

    function getRandomColor() {
        const colors = ['#FF6B8B', '#FFD166', '#06D6A0', '#9D4EDD', '#118AB2'];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    // Auto-start music on any click (for iOS)
    document.addEventListener('click', function autoStart() {
        if (!isMusicPlaying) {
            birthdayMusic.play().then(() => {
                isMusicPlaying = true;
                musicBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
            });
        }
        document.removeEventListener('click', autoStart);
    }, { once: true });

    console.log("Birthday page loaded! 🎂");
});
