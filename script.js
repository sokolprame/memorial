document.addEventListener('DOMContentLoaded', () => {
    // 1. Анимация появления (оставляем как есть)
    const scrollElements = document.querySelectorAll('h1, h2, p, .grid, .aspect-video, section');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('opacity-100', 'translate-y-0');
            }
        });
    }, { threshold: 0.1 });

    scrollElements.forEach(el => {
        el.classList.add('opacity-0', 'translate-y-10', 'transition-all', 'duration-1000');
        observer.observe(el);
    });

    // 2. Логика модального окна
    const modal = document.getElementById('photo-modal');
    const modalImg = document.getElementById('modal-img');

    // Находим все картинки в галерее
    const galleryImages = document.querySelectorAll('.grid img');

    galleryImages.forEach(img => {
        img.addEventListener('click', (e) => {
            e.preventDefault(); // Запрещаем браузеру любые стандартные действия

            const src = e.currentTarget.src;
            modalImg.src = src;

            // Показываем окно
            modal.style.display = 'flex';

            // Фиксируем body, чтобы не было прокрутки
            document.body.style.overflow = 'hidden';

            // Анимация появления через requestAnimationFrame (надежнее чем setTimeout)
            requestAnimationFrame(() => {
                modal.classList.add('opacity-100');
                modalImg.classList.remove('opacity-0', 'scale-95');
                modalImg.classList.add('opacity-100', 'scale-100');
            });
        });
    });

    // 3. Функция закрытия
    const closeModal = () => {
        modal.classList.remove('opacity-100');
        modalImg.classList.add('opacity-0', 'scale-95');

        setTimeout(() => {
            modal.style.display = 'none';
            document.body.style.overflow = '';
            modalImg.src = '';
        }, 300);
    };

    modal.addEventListener('click', (e) => {
        if (e.target !== modalImg) closeModal();
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeModal();
    });
});