document.addEventListener('DOMContentLoaded', () => {
    // Select Elements
    const logo = document.querySelector('.logo-container');
    const menu = document.querySelector('.menu-icon');
    const leftContent = document.querySelectorAll('.left-section .content > *');
    const product = document.querySelector('.product-stage');
    const rightContent = document.querySelectorAll('.right-section .promo-content > *');
    const themeToggle = document.querySelector('#theme-toggle');
    const body = document.body;
    const heroCan = document.querySelector('#hero-can');
    const bgOverlay = document.querySelector('.background-overlay');
    const themeText = themeToggle.querySelector('.btn-text');
    const can = document.querySelector('.product-can');
    const glass = document.querySelector('.glass-card');

    // Animation Helper
    const animate = (el, delay, x = 0, y = 30) => {
        if (!el) return;
        el.style.opacity = '0';
        el.style.transform = `translate(${x}px, ${y}px)`;
        el.style.transition = 'all 1.2s cubic-bezier(0.16, 1, 0.3, 1)';
        
        setTimeout(() => {
            el.style.opacity = '1';
            el.style.transform = 'translate(0, 0)';
        }, delay);
    };

    // Initial Animation Sequence
    const runEntranceAnimations = () => {
        animate(logo, 200, 0, -20);
        animate(menu, 300, 20, 0);
        leftContent.forEach((el, i) => animate(el, 400 + (i * 100)));
        animate(product, 600, 0, 50);
        rightContent.forEach((el, i) => animate(el, 800 + (i * 100)));
    };

    runEntranceAnimations();

    // Theme Configuration
    const themes = {
        life: {
            can: 'assets/Coca-Cola.webp',
            bg: 'assets/green_background.webp',
            btn: 'Classic Red'
        },
        classic: {
            can: 'assets/Coca_Cola_Classic_Can.webp',
            bg: 'assets/red_background.webp',
            btn: 'Nature Life'
        }
    };

    let currentTheme = 'life';

    // Theme Switcher Logic
    themeToggle.addEventListener('click', () => {
        currentTheme = currentTheme === 'life' ? 'classic' : 'life';
        const config = themes[currentTheme];

        body.setAttribute('data-theme', currentTheme);
        themeText.textContent = config.btn;

        // Transition visuals
        product.style.opacity = '0';
        product.style.transform = 'scale(0.9)';
        
        setTimeout(() => {
            heroCan.src = config.can;
            if (config.bg === 'none') {
                bgOverlay.style.backgroundImage = 'none';
            } else {
                bgOverlay.style.backgroundImage = `url(${config.bg})`;
            }
            
            product.style.opacity = '1';
            product.style.transform = 'scale(1)';
            
            // Re-animate typography for fresh feel
            leftContent.forEach((el, i) => animate(el, 100 + (i * 100)));
            rightContent.forEach((el, i) => animate(el, 300 + (i * 100)));
        }, 400);
    });

    // Premium Parallax Effect
    product.addEventListener('mousemove', (e) => {
        const { width, height, left, top } = product.getBoundingClientRect();
        const centerX = left + width / 2;
        const centerY = top + height / 2;
        const moveX = (e.clientX - centerX) / (width / 2);
        const moveY = (e.clientY - centerY) / (height / 2);
        
        can.style.transform = `
            translate(${moveX * 15}px, ${moveY * 15}px) 
            rotateX(${-moveY * 10}deg) 
            rotateY(${moveX * 15}deg)
        `;
        
        glass.style.transform = `
            translate(${moveX * -10}px, ${moveY * -10}px)
            rotateX(${-moveY * 5}deg) 
            rotateY(${moveX * 5}deg)
        `;
    });

    product.addEventListener('mouseleave', () => {
        can.style.transform = 'translate(0, 0) rotateX(0) rotateY(0)';
        glass.style.transform = 'translate(0, 0) rotateX(0) rotateY(0)';
    });
});
