// Navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Mobile menu toggle
    hamburger.addEventListener('click', function() {
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            
            // Update active link
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Update active navigation link on scroll
    window.addEventListener('scroll', function() {
        let current = '';
        const sections = document.querySelectorAll('.section, #home');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            if (window.pageYOffset >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // Features section interactivity
    const featureItems = document.querySelectorAll('.feature-item');
    const featureVisual = document.getElementById('feature-visual');

    featureItems.forEach(item => {
        item.addEventListener('click', function() {
            featureItems.forEach(f => f.classList.remove('active'));
            this.classList.add('active');
            
            const feature = this.getAttribute('data-feature');
            updateFeatureVisual(feature);
        });
    });

    function updateFeatureVisual(feature) {
        const visualContent = {
            tender: 'Tender Garage Operation - Automated deployment system',
            glass: 'Switchable Privacy Glass - Smart transparency control',
            cabin: 'On-Deck Master Suite - Configurable luxury space',
            sailing: 'Automated Sailing Systems - Push-button operation'
        };
        
        featureVisual.innerHTML = `<p>${visualContent[feature]}</p>`;
    }

    // Configuration section
    const colorOptions = document.querySelectorAll('.color-option');
    const layoutOptions = document.querySelectorAll('input[name="layout"]');
    const performanceOptions = document.querySelectorAll('input[name="performance"]');
    const yachtPreview = document.getElementById('yacht-preview');
    const previewLabel = yachtPreview.querySelector('.preview-label');

    let currentConfig = {
        color: 'vmg-green',
        layout: 'owner-suite',
        performance: 'standard'
    };

    colorOptions.forEach(option => {
        option.addEventListener('click', function() {
            colorOptions.forEach(o => o.classList.remove('active'));
            this.classList.add('active');
            currentConfig.color = this.getAttribute('data-color');
            updatePreview();
        });
    });

    layoutOptions.forEach(option => {
        option.addEventListener('change', function() {
            if (this.checked) {
                currentConfig.layout = this.value;
                updatePreview();
            }
        });
    });

    performanceOptions.forEach(option => {
        option.addEventListener('change', function() {
            if (this.checked) {
                currentConfig.performance = this.value;
                updatePreview();
                updatePricing();
            }
        });
    });

    function updatePreview() {
        const colorNames = {
            'vmg-green': 'VMG Green',
            'ocean-blue': 'Ocean Blue',
            'platinum-silver': 'Platinum Silver'
        };
        
        const layoutNames = {
            'owner-suite': "Owner's Suite",
            'expanded-salon': 'Expanded Salon'
        };
        
        const performanceNames = {
            'standard': 'Standard',
            'regatta': 'Regatta',
            'gp': 'GP'
        };

        previewLabel.textContent = `${colorNames[currentConfig.color]} - ${layoutNames[currentConfig.layout]} - ${performanceNames[currentConfig.performance]}`;
        
        // Update yacht preview background based on color
        const colorMap = {
            'vmg-green': 'linear-gradient(135deg, #2d5a3d, #1a3d2e)',
            'ocean-blue': 'linear-gradient(135deg, #1e3a5f, #0f2847)',
            'platinum-silver': 'linear-gradient(135deg, #8a8a8a, #5a5a5a)'
        };
        
        yachtPreview.style.background = colorMap[currentConfig.color];
    }

    function updatePricing() {
        const basePrices = {
            'standard': 2850000,
            'regatta': 2950000,
            'gp': 3050000
        };
        
        const basePrice = basePrices[currentConfig.performance];
        const options = 125000;
        const total = basePrice + options;
        
        document.querySelector('.summary-item span:last-child').textContent = `$${basePrice.toLocaleString()}`;
        document.querySelector('.summary-total span:last-child').textContent = `$${total.toLocaleString()}`;
    }

    // Performance simulator
    const windSpeedSlider = document.getElementById('wind-speed');
    const windAngleSlider = document.getElementById('wind-angle');
    const configSelect = document.getElementById('config-select');
    const windSpeedValue = document.getElementById('wind-speed-value');
    const windAngleValue = document.getElementById('wind-angle-value');
    const boatSpeed = document.getElementById('boat-speed');
    const heelAngle = document.getElementById('heel-angle');
    const vmgValue = document.getElementById('vmg-value');
    const yachtModel = document.querySelector('.yacht-model');
    const wakeEffect = document.querySelector('.wake-effect');

    function updatePerformanceSimulation() {
        const windSpeed = parseInt(windSpeedSlider.value);
        const windAngle = parseInt(windAngleSlider.value);
        const config = configSelect.value;
        
        windSpeedValue.textContent = windSpeed;
        windAngleValue.textContent = windAngle;
        
        // Calculate performance (simplified simulation)
        const configMultipliers = {
            'standard': 1.0,
            'regatta': 1.1,
            'gp': 1.2
        };
        
        const baseSpeed = Math.min(windSpeed * 0.8, 25) * configMultipliers[config];
        const angleEfficiency = Math.cos((windAngle - 45) * Math.PI / 180);
        const calculatedSpeed = Math.max(baseSpeed * Math.abs(angleEfficiency), 3);
        const calculatedHeel = Math.min(windSpeed * 0.5 + calculatedSpeed * 0.3, 35);
        const calculatedVMG = calculatedSpeed * Math.cos(windAngle * Math.PI / 180);
        
        boatSpeed.textContent = `${calculatedSpeed.toFixed(1)} knots`;
        heelAngle.textContent = `${calculatedHeel.toFixed(0)}°`;
        vmgValue.textContent = `${Math.abs(calculatedVMG).toFixed(1)} knots`;
        
        // Update visual elements
        yachtModel.style.transform = `translate(-50%, -50%) rotate(${windAngle - 90}deg) rotateY(${calculatedHeel}deg)`;
        wakeEffect.style.width = `${Math.min(calculatedSpeed * 8, 200)}px`;
        wakeEffect.style.opacity = Math.min(calculatedSpeed / 20, 1);
    }

    windSpeedSlider.addEventListener('input', updatePerformanceSimulation);
    windAngleSlider.addEventListener('input', updatePerformanceSimulation);
    configSelect.addEventListener('change', updatePerformanceSimulation);

    // Initialize performance simulation
    updatePerformanceSimulation();

    // Gallery filtering
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            
            galleryItems.forEach(item => {
                if (filter === 'all' || item.classList.contains(filter)) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // Contact form handling
    const inquiryForm = document.getElementById('inquiry-form');
    
    inquiryForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Simulate form submission
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            submitBtn.textContent = 'Message Sent!';
            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                inquiryForm.reset();
            }, 2000);
        }, 1500);
    });

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all sections for scroll animations
    document.querySelectorAll('.section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });

    // Parallax effect for hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const heroBackground = document.querySelector('.hero-background');
        
        if (heroBackground) {
            heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });

    // Initialize polar chart (simplified)
    const polarCanvas = document.getElementById('polar-canvas');
    if (polarCanvas) {
        const ctx = polarCanvas.getContext('2d');
        
        function drawPolarChart() {
            ctx.clearRect(0, 0, 300, 300);
            ctx.strokeStyle = '#2d5a3d';
            ctx.lineWidth = 2;
            
            // Draw polar grid
            const centerX = 150;
            const centerY = 150;
            const maxRadius = 120;
            
            // Draw concentric circles
            for (let i = 1; i <= 4; i++) {
                ctx.beginPath();
                ctx.arc(centerX, centerY, (maxRadius / 4) * i, 0, 2 * Math.PI);
                ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
                ctx.lineWidth = 1;
                ctx.stroke();
            }
            
            // Draw radial lines
            for (let angle = 0; angle < 360; angle += 30) {
                ctx.beginPath();
                ctx.moveTo(centerX, centerY);
                const x = centerX + maxRadius * Math.cos((angle - 90) * Math.PI / 180);
                const y = centerY + maxRadius * Math.sin((angle - 90) * Math.PI / 180);
                ctx.lineTo(x, y);
                ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
                ctx.stroke();
            }
            
            // Draw performance curve (simplified)
            ctx.beginPath();
            ctx.strokeStyle = '#2d5a3d';
            ctx.lineWidth = 3;
            
            for (let angle = 0; angle <= 180; angle += 5) {
                const windSpeed = parseInt(windSpeedSlider.value);
                const efficiency = Math.sin(angle * Math.PI / 180) * (windSpeed / 35);
                const radius = maxRadius * efficiency;
                const x = centerX + radius * Math.cos((angle - 90) * Math.PI / 180);
                const y = centerY + radius * Math.sin((angle - 90) * Math.PI / 180);
                
                if (angle === 0) {
                    ctx.moveTo(x, y);
                } else {
                    ctx.lineTo(x, y);
                }
            }
            ctx.stroke();
            
            // Draw current position
            const currentAngle = parseInt(windAngleSlider.value);
            const currentWindSpeed = parseInt(windSpeedSlider.value);
            const currentEfficiency = Math.sin(currentAngle * Math.PI / 180) * (currentWindSpeed / 35);
            const currentRadius = maxRadius * currentEfficiency;
            const currentX = centerX + currentRadius * Math.cos((currentAngle - 90) * Math.PI / 180);
            const currentY = centerY + currentRadius * Math.sin((currentAngle - 90) * Math.PI / 180);
            
            ctx.beginPath();
            ctx.arc(currentX, currentY, 5, 0, 2 * Math.PI);
            ctx.fillStyle = '#ff6b35';
            ctx.fill();
        }
        
        drawPolarChart();
        
        // Update polar chart when sliders change
        windSpeedSlider.addEventListener('input', drawPolarChart);
        windAngleSlider.addEventListener('input', drawPolarChart);
    }
});

// Utility function for smooth scrolling to sections
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const offsetTop = section.offsetTop - 80;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

// Add loading animation
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
});

// Add CSS for loading state
const loadingStyles = `
    body:not(.loaded) {
        overflow: hidden;
    }
    
    body:not(.loaded) .hero-content {
        opacity: 0;
        transform: translateY(50px);
    }
    
    body.loaded .hero-content {
        opacity: 1;
        transform: translateY(0);
        transition: opacity 1s ease, transform 1s ease;
    }
`;

const styleSheet = document.createElement('style');
styleSheet.textContent = loadingStyles;
document.head.appendChild(styleSheet);