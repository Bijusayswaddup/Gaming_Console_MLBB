// Simulate loading progress
document.addEventListener('DOMContentLoaded', function() {
    const loadingScreen = document.getElementById('loading-screen');
    const progressBar = document.getElementById('loading-progress');
    
    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.random() * 10;
        progressBar.style.width = `${progress}%`;
        
        if (progress >= 100) {
            clearInterval(interval);
            setTimeout(() => {
                loadingScreen.style.opacity = '0';
                loadingScreen.style.visibility = 'hidden';
                
                // Load heroes data after loading screen
                loadHeroesData();
            }, 500);
        }
    }, 200);

    // Search functionality
    const searchInput = document.getElementById('hero-search');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            const heroCards = document.querySelectorAll('.hero-card');
            
            heroCards.forEach(card => {
                const heroName = card.querySelector('.hero-name').textContent.toLowerCase();
                if (heroName.includes(searchTerm)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }
});

// Load heroes data from JSON
function loadHeroesData() {
    fetch('data/heroes.json')
        .then(response => response.json())
        .then(heroes => {
            populateHeroesGrid(heroes);
        })
        .catch(error => {
            console.error('Error loading heroes data:', error);
            document.getElementById('heroes-grid').innerHTML = 
                '<p class="error">Failed to load heroes. Please try again later.</p>';
        });
}

// Populate heroes grid
function populateHeroesGrid(heroes) {
    const heroesGrid = document.getElementById('heroes-grid');
    
    heroes.forEach(hero => {
        const heroCard = document.createElement('div');
        heroCard.className = 'hero-card';
        heroCard.innerHTML = `
            <img src="${hero.image}" alt="${hero.name}">
            <div class="hero-name">${hero.name}</div>
        `;
        
        // Add hover event to show preview
        heroCard.addEventListener('mouseenter', () => {
            showHeroPreview(hero);
        });
        
        // Add click event to select hero
        heroCard.addEventListener('click', () => {
            // Remove any existing active class
            document.querySelectorAll('.hero-card').forEach(card => {
                card.classList.remove('active');
            });
            // Add active class to clicked card
            heroCard.classList.add('active');
        });
        
        heroesGrid.appendChild(heroCard);
    });
}

// Show hero preview
function showHeroPreview(hero) {
    document.getElementById('hero-preview').innerHTML = `
        <img src="${hero.preview}" alt="${hero.name} Preview">
        <div class="hero-info">
            <h3>${hero.name}</h3>
            <span class="hero-role">
                <img src="${hero.roleIcon}" alt="${hero.role}">
                ${hero.role}
            </span>
            <p class="hero-desc">${hero.description}</p>
        </div>
    `;
}