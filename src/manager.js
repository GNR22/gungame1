/* manager.js
The UIManager class builds and updates all the game’s user-interface elements—level selection, timer, 
score, countdown, crosshair, and a loading screen—and connects them to Three.js’s LoadingManager to 
show real-time loading progress.

Purpose:
Its purpose is to centralize and manage every visual UI component of the game so the gameplay code 
stays clean while the UI updates automatically and consistently.
*/


import * as THREE from 'three';

export class UIManager {
    constructor() {
        this.scoreDiv = document.getElementById('score');
        this.crosshair = document.getElementById('crosshair');
        this.elements = {};
        this.levels = {}; // Initialize empty levels
        this.createUI();
        this.setupLoadingManager();
    }

    createUI() {
        // Use default values - DON'T use beginner directly
        const defaultLevel = {
            name: 'Select Level',
            description: 'Choose a difficulty level to start',
            targetCount: 0,
            gameTime: 0,
            targetSize: 0
        };

        this.elements.levelSelector = document.createElement('div');
        this.elements.levelSelector.id = 'level-selector';
        this.elements.levelSelector.innerHTML = `
            <div class="level-buttons">
                <button id="beginner-btn" class="level-btn beginner">🟢 BEGINNER</button>
                <button id="intermediate-btn" class="level-btn intermediate">🟠 INTERMEDIATE</button>
                <button id="professional-btn" class="level-btn professional">🔴 PROFESSIONAL</button>
            </div>
            <div class="level-info" id="level-info">
                <h3>${defaultLevel.name}</h3>
                <p>${defaultLevel.description}</p>
                <p>Targets: ${defaultLevel.targetCount} | Time: ${defaultLevel.gameTime}s | Size: ${defaultLevel.targetSize}</p>
            </div>
        `;
        document.body.appendChild(this.elements.levelSelector);

        // Timer
        this.elements.timerDiv = document.createElement('div');
        this.elements.timerDiv.id = 'timer';
        this.elements.timerDiv.textContent = 'Time: 0:00';
        document.body.appendChild(this.elements.timerDiv);

        // Countdown
        this.elements.countdownDiv = document.createElement('div');
        this.elements.countdownDiv.id = 'countdown';
        this.elements.countdownDiv.style.display = 'none';
        document.body.appendChild(this.elements.countdownDiv);

        // Loading Screen
        this.createLoadingScreen();
    }

    // Add this method to update level info after levels are loaded
    updateLevelInfo(levels) {
        this.levels = levels;
        const levelInfo = document.getElementById('level-info');
        if (levelInfo && levels.beginner) {
            levelInfo.innerHTML = `
                <h3>${levels.beginner.name}</h3>
                <p>${levels.beginner.description}</p>
                <p>Targets: ${levels.beginner.targetCount} | Time: ${levels.beginner.gameTime}s | Size: ${levels.beginner.targetSize}</p>
            `;
        }
    }

    createLoadingScreen() {
        this.elements.loadingScreen = document.createElement('div');
        this.elements.loadingScreen.id = 'loading-screen';
        this.elements.loadingScreen.innerHTML = `
            <div class="loading-content">
                <div class="loading-spinner"></div>
                <div class="loading-text">Loading Game Assets...</div>
                <div class="loading-progress">
                    <div class="progress-bar">
                        <div class="progress-fill" id="progress-fill"></div>
                    </div>
                    <div class="progress-text" id="progress-text">0%</div>
                </div>
            </div>
        `;
        document.body.appendChild(this.elements.loadingScreen);

        this.addLoadingStyles();
    }

    addLoadingStyles() {
        const loadingStyles = document.createElement('style');
        loadingStyles.textContent = `
            #loading-screen {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.9);
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 1000;
                color: white;
                font-family: Arial, sans-serif;
            }
            
            .loading-content {
                text-align: center;
                max-width: 400px;
                padding: 20px;
            }
            
            .loading-spinner {
                width: 50px;
                height: 50px;
                border: 5px solid #333;
                border-top: 5px solid #4CAF50;
                border-radius: 50%;
                animation: spin 1s linear infinite;
                margin: 0 auto 20px;
            }
            
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
            
            .loading-text {
                font-size: 18px;
                margin-bottom: 20px;
            }
            
            .loading-progress {
                margin-top: 20px;
            }
            
            .progress-bar {
                width: 100%;
                height: 20px;
                background: #333;
                border-radius: 10px;
                overflow: hidden;
                margin-bottom: 10px;
            }
            
            .progress-fill {
                height: 100%;
                background: linear-gradient(90deg, #4CAF50, #45a049);
                width: 0%;
                transition: width 0.3s ease;
            }
            
            .progress-text {
                font-size: 14px;
                color: #ccc;
            }
        `;
        document.head.appendChild(loadingStyles);
    }

    setupLoadingManager() {
        this.loadingManager = new THREE.LoadingManager();

        this.loadingManager.onStart = (url, itemsLoaded, itemsTotal) => {
            console.log(`Started loading: ${url}`);
            console.log(`Progress: ${itemsLoaded}/${itemsTotal}`);
        };

        this.loadingManager.onLoad = () => {
            console.log('All assets loaded successfully!');
            this.hideLoadingScreen();
        };

        this.loadingManager.onProgress = (url, itemsLoaded, itemsTotal) => {
            const progress = (itemsLoaded / itemsTotal) * 100;
            this.updateProgressBar(progress);
            console.log(`Loading: ${url}`);
            console.log(`Progress: ${itemsLoaded}/${itemsTotal} (${Math.round(progress)}%)`);
        };

        this.loadingManager.onError = (url) => {
            console.error(`Error loading: ${url}`);
            this.showError(`Error loading: ${url.split('/').pop()}`);
        };
    }

    updateProgressBar(progress) {
        const progressFill = document.getElementById('progress-fill');
        const progressText = document.getElementById('progress-text');
        
        if (progressFill && progressText) {
            progressFill.style.width = `${progress}%`;
            progressText.textContent = `${Math.round(progress)}%`;
        }
    }

    hideLoadingScreen() {
        this.elements.loadingScreen.style.opacity = '0';
        this.elements.loadingScreen.style.transition = 'opacity 0.5s ease';
        setTimeout(() => {
            this.elements.loadingScreen.style.display = 'none';
        }, 500);
    }

    showError(message) {
        const progressText = document.getElementById('progress-text');
        if (progressText) {
            progressText.textContent = message;
            progressText.style.color = '#ff4444';
        }
    }

    // Public methods to control UI elements
    showLevelSelector() {
        this.elements.levelSelector.style.display = 'block';
    }

    hideLevelSelector() {
        this.elements.levelSelector.style.display = 'none';
    }

    showCountdown() {
        this.elements.countdownDiv.style.display = 'block';
    }

    hideCountdown() {
        this.elements.countdownDiv.style.display = 'none';
    }

    updateCountdown(number) {
        this.elements.countdownDiv.textContent = number;
        this.elements.countdownDiv.className = 'countdown';
    }

    updateTimer(time) {
        this.elements.timerDiv.textContent = `Time: ${time}`;
    }

    updateScore(score) {
        if (this.scoreDiv) {
            this.scoreDiv.textContent = `Score: ${score}`;
        }
    }

    showCrosshair() {
        if (this.crosshair) {
            this.crosshair.style.display = 'block';
        }
    }

    hideCrosshair() {
        if (this.crosshair) {
            this.crosshair.style.display = 'none';
        }
    }

    getLoadingManager() {
        return this.loadingManager;
    }

    getElement(id) {
        return this.elements[id] || document.getElementById(id);
    }
}