/* ============================================
   APPLE-INSPIRED INTERACTIONS
   Scroll-driven reveals, word-by-word text,
   animated counters, cinematic feel
   ============================================ */

// ===== Mobile Nav =====
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
});

document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// ===== Nav background on scroll =====
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
    nav.style.borderBottomColor = window.scrollY > 10
        ? 'rgba(255,255,255,0.1)'
        : 'transparent';
});

// ===== Smooth scroll =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
        e.preventDefault();
        const target = document.querySelector(anchor.getAttribute('href'));
        if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
});

// ===== Scroll Reveal (IntersectionObserver) =====
const revealElements = document.querySelectorAll('.scroll-reveal');

const revealObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObserver.unobserve(entry.target);
            }
        });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
);

revealElements.forEach(el => revealObserver.observe(el));

// ===== Word-by-word reveal (intro section) =====
const words = document.querySelectorAll('.word');

if (words.length) {
    const wordObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    activateWords();
                    wordObserver.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.3 }
    );

    wordObserver.observe(document.querySelector('.intro-section'));
}

function activateWords() {
    words.forEach((word, i) => {
        setTimeout(() => {
            word.classList.add('visible');
        }, i * 80);
    });
}

// ===== Stat Counter Animation =====
const statBigs = document.querySelectorAll('.stat-big');
let statsDone = false;

function animateCounters() {
    if (statsDone) return;
    statsDone = true;

    statBigs.forEach(el => {
        const target = parseInt(el.getAttribute('data-target'));
        const duration = 1800;
        const steps = 60;
        const stepTime = duration / steps;
        let current = 0;
        const increment = target / steps;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                el.textContent = target;
                clearInterval(timer);
            } else {
                el.textContent = Math.floor(current);
            }
        }, stepTime);
    });
}

const statsSection = document.querySelector('.stats-section');
if (statsSection) {
    const statsObserver = new IntersectionObserver(
        (entries) => {
            if (entries[0].isIntersecting) {
                animateCounters();
                statsObserver.unobserve(statsSection);
            }
        },
        { threshold: 0.3 }
    );
    statsObserver.observe(statsSection);
}

// ===== Project Filters =====
const pills = document.querySelectorAll('.pill');
const allFilterable = document.querySelectorAll('.project-feature[data-category], .project-card[data-category]');
const migrationTrio = document.querySelector('.migration-trio');

pills.forEach(pill => {
    pill.addEventListener('click', () => {
        const filter = pill.getAttribute('data-filter');

        pills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');

        allFilterable.forEach(card => {
            const cat = card.getAttribute('data-category');
            if (filter === 'all' || cat === filter) {
                card.classList.remove('hidden');
                requestAnimationFrame(() => card.classList.add('visible'));
            } else {
                card.classList.add('hidden');
                card.classList.remove('visible');
            }
        });

        // Show/hide migration trio container
        if (migrationTrio) {
            if (filter === 'all' || filter === 'migration') {
                migrationTrio.style.display = '';
            } else {
                migrationTrio.style.display = 'none';
            }
        }
    });
});

// ===== Parallax-like opacity on hero =====
const heroContent = document.querySelector('.hero-content');

window.addEventListener('scroll', () => {
    if (!heroContent) return;
    const scrollY = window.scrollY;
    const fadeStart = 100;
    const fadeEnd = 600;
    let opacity = 1;

    if (scrollY > fadeStart) {
        opacity = Math.max(0, 1 - (scrollY - fadeStart) / (fadeEnd - fadeStart));
    }

    heroContent.style.opacity = opacity;
    heroContent.style.transform = `translateY(${scrollY * 0.15}px)`;
}, { passive: true });

// ===== Active nav link tracking =====
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a');

const navObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.id;
                navAnchors.forEach(a => {
                    a.style.color = a.getAttribute('href') === `#${id}`
                        ? '#f5f5f7'
                        : '';
                });
            }
        });
    },
    { threshold: 0.25 }
);

sections.forEach(s => navObserver.observe(s));
