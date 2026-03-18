document.addEventListener('DOMContentLoaded', () => {
    // Находим все элементы, которые хотим анимировать
    // Мы будем искать заголовки, параграфы, фото и разделители
    const scrollElements = document.querySelectorAll('h1, h2, p, .grid, .aspect-video, .flex.items-center');

    // Настраиваем "наблюдатель"
    const elementInView = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Когда элемент виден, добавляем класс "show"
                entry.target.classList.add('opacity-100', 'translate-y-0');
                entry.target.classList.remove('opacity-0', 'translate-y-10');
                // Прекращаем наблюдение за этим элементом, чтобы анимация не дергалась постоянно
                observer.unobserve(entry.target);
            }
        });
    };

    const observer = new IntersectionObserver(elementInView, {
        root: null, // следим относительно окна браузера
        threshold: 0.15 // анимация сработает, когда 15% элемента будет видно
    });

    // Устанавливаем начальное состояние (невидимость и смещение вниз)
    scrollElements.forEach(el => {
        el.classList.add('opacity-0', 'translate-y-10', 'transition-all', 'duration-1000', 'ease-out');
        observer.observe(el);
    });
});// JavaScript source code
