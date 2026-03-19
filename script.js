document.addEventListener('DOMContentLoaded', () => {
    // --- 1. Анимация появления элементов ---
    const scrollElements = document.querySelectorAll('h1, h2, p, .grid, .aspect-video, .flex.items-center');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('opacity-100', 'translate-y-0');
                entry.target.classList.remove('opacity-0', 'translate-y-10');
            }
        });
    }, { threshold: 0.1 });

    scrollElements.forEach(el => {
        el.classList.add('opacity-0', 'translate-y-10', 'transition-all', 'duration-1000');
        observer.observe(el);
    });

    // --- 2. Модальное окно (Увеличение фото) ---
    const modal = document.getElementById('photo-modal');
    const modalImg = document.getElementById('modal-img');

    // Ищем картинки именно внутри галереи (.grid)
    const galleryImages = document.querySelectorAll('.grid img');

    galleryImages.forEach(img => {
        // Убедимся, что курсор меняется на лупу
        img.style.cursor = 'zoom-in';

        img.addEventListener('click', (event) => {
            // Используем event.currentTarget, чтобы точно взять src той картинки, на которую нажали
            const clickedSrc = event.currentTarget.src;

            // Сначала подставляем путь, потом показываем
            modalImg.src = clickedSrc;

            modal.classList.remove('hidden');

            // Маленькая задержка, чтобы анимация opacity сработала плавно
            setTimeout(() => {
                modal.classList.add('opacity-100');
                // Добавляем масштаб, если в HTML был scale-95
                modalImg.classList.add('scale-100');
                modalImg.classList.remove('scale-95');
            }, 10);

            document.body.style.overflow = 'hidden';
        });
    });

    // --- 3. Закрытие модального окна ---
    const closeModal = () => {
        modal.classList.remove('opacity-100');
        modalImg.classList.remove('scale-100');
        modalImg.classList.add('scale-95');

        setTimeout(() => {
            modal.classList.add('hidden');
            document.body.style.overflow = '';
            // Очищаем src после закрытия, чтобы при следующем открытии не мелькало старое фото
            modalImg.src = '';
        }, 300);
    };

    // Закрытие при клике на любое место модалки (фон)
    modal.addEventListener('click', (e) => {
        // Закрываем только если кликнули по фону или кнопке, а не по самой картинке
        if (e.target !== modalImg) {
            closeModal();
        }
    });

    // Закрытие на клавишу Esc (удобно для ПК)
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
            closeModal();
        }
    });
});