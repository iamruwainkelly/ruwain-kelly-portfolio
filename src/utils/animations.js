export function fadeIn(element, duration = 500) {
    element.style.opacity = 0;
    element.style.transition = `opacity ${duration}ms`;
    element.style.display = 'block';

    requestAnimationFrame(() => {
        element.style.opacity = 1;
    });
}

export function fadeOut(element, duration = 500) {
    element.style.opacity = 1;
    element.style.transition = `opacity ${duration}ms`;

    requestAnimationFrame(() => {
        element.style.opacity = 0;

        setTimeout(() => {
            element.style.display = 'none';
        }, duration);
    });
}

export function slideIn(element, duration = 500) {
    element.style.transform = 'translateX(-100%)';
    element.style.transition = `transform ${duration}ms`;
    element.style.display = 'block';

    requestAnimationFrame(() => {
        element.style.transform = 'translateX(0)';
    });
}

export function slideOut(element, duration = 500) {
    element.style.transform = 'translateX(0)';
    element.style.transition = `transform ${duration}ms`;

    requestAnimationFrame(() => {
        element.style.transform = 'translateX(-100%)';

        setTimeout(() => {
            element.style.display = 'none';
        }, duration);
    });
}

export function createFallingCodeAnimation(container) {
    const chars = 'RUWAIN KELLY 01010101 ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const columns = Math.floor(container.offsetWidth / 20);
    const drops = Array(columns).fill(0);

    function draw() {
        // Clear previous content
        container.innerHTML = '';

        for (let i = 0; i < drops.length; i++) {
            const char = chars[Math.floor(Math.random() * chars.length)];
            const span = document.createElement('span');
            span.textContent = char;
            span.style.position = 'absolute';
            span.style.left = i * 20 + 'px';
            span.style.top = drops[i] * 20 + 'px';
            span.style.color = `hsl(${240 + Math.random() * 60}, 70%, ${50 + Math.random() * 30}%)`;
            span.style.fontSize = '14px';
            span.style.fontFamily = 'monospace';
            span.style.opacity = Math.random();
            container.appendChild(span);

            drops[i]++;
            if (drops[i] * 20 > container.offsetHeight && Math.random() > 0.975) {
                drops[i] = 0;
            }
        }
    }

    const interval = setInterval(draw, 100);
    return () => clearInterval(interval);
}