// Menú hamburguesa
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Cerrar menú al hacer clic en un enlace
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');

        // Actualizar enlace activo
        document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
        link.classList.add('active');
    });
});

// Animación de habilidades
function animateSkills() {
    const skillItems = document.querySelectorAll('.skill-item');

    skillItems.forEach(item => {
        const skillValue = item.getAttribute('data-skill');
        const progressBar = item.querySelector('.skill-progress');
        const percentElement = item.querySelector('.skill-percent');

        // Reset para animación
        progressBar.style.width = '0%';
        percentElement.textContent = '0%';

        // Animar
        setTimeout(() => {
            progressBar.style.width = `${skillValue}%`;
            let currentPercent = 0;
            const increment = skillValue / 50; // Dividimos en 50 pasos

            const timer = setInterval(() => {
                currentPercent += increment;
                if (currentPercent >= skillValue) {
                    currentPercent = skillValue;
                    clearInterval(timer);
                }
                percentElement.textContent = `${Math.round(currentPercent)}%`;
            }, 20);
        }, 300);
    });
}

// Filtro de proyectos
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Cambiar botón activo
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        const filter = button.getAttribute('data-filter');

        // Filtrar proyectos
        projectCards.forEach(card => {
            const category = card.getAttribute('data-category');

            if (filter === 'all' || category === filter) {
                card.style.display = 'block';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'scale(1)';
                }, 100);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    });
});

// Animación al hacer scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');

            // Animar habilidades cuando sean visibles
            if (entry.target.id === 'skills') {
                animateSkills();
            }
        }
    });
}, observerOptions);

// Observar todas las secciones
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// Añadir clase fade-in a elementos
document.querySelectorAll('.skill-category, .project-card, .info-card').forEach(el => {
    el.classList.add('fade-in');
    observer.observe(el);
});

// Cambiar color del header al hacer scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(30, 41, 59, 0.98)';
        header.style.boxShadow = '0 5px 20px rgba(0,0,0,0.1)';
    } else {
        header.style.background = 'rgba(30, 41, 59, 0.95)';
        header.style.boxShadow = 'none';
    }
});

// Formulario de contacto
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Aquí iría la lógica para enviar el formulario
        alert('¡Gracias por tu mensaje! Te responderé pronto.');
        contactForm.reset();
    });
}

// Inicializar animaciones de habilidades cuando la página cargue
document.addEventListener('DOMContentLoaded', () => {
    // Si la sección de habilidades ya está visible
    const skillsSection = document.getElementById('skills');
    if (skillsSection.getBoundingClientRect().top < window.innerHeight * 0.8) {
        animateSkills();
    }
});