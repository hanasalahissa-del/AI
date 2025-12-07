document.addEventListener('DOMContentLoaded', function() {
    const missionCards = document.querySelectorAll('.mission-card');

    // état initial (caché)
    missionCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = `fadeInUp 0.6s ease forwards`;
                entry.target.style.opacity = '1'; // montrer la carte
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target); // éviter de relancer plusieurs fois
            }
        });
    }, { threshold: 0.1 });

    missionCards.forEach(card => observer.observe(card));
});
