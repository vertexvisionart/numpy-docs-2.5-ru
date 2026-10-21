const DOCUMENTATION_OPTIONS = {
    VERSION: '2.5.0',
    LANGUAGE: 'ru',
    COLLAPSE_INDEX: false,
    BUILDER: 'html',
    FILE_SUFFIX: '.html',
    LINK_SUFFIX: '.html',
    HAS_SOURCE: false,
    SOURCELINK_SUFFIX: '.txt',
    NAVIGATION_WITH_KEYS: false,
    SHOW_SEARCH_SUMMARY: true,
    ENABLE_SEARCH_SHORTCUTS: true,
};

// Identify the independent publisher of this Russian translation.
document.addEventListener('DOMContentLoaded', function () {
    const brand = document.querySelector('a.navbar-brand');
    if (brand) {
        brand.replaceChildren();
        const name = document.createElement('span');
        name.className = 'ru-publisher-brand';
        name.textContent = 'vertexvisionart';
        brand.append(name);
        brand.setAttribute('aria-label', 'vertexvisionart — русский перевод, главная страница');
    }
    const container = document.querySelector('.bd-article-container');
    if (container) {
        const notice = document.createElement('aside');
        notice.className = 'ru-publisher-notice';
        notice.setAttribute('aria-label', 'О переводе');
        const title = document.createElement('strong');
        title.textContent = 'Неофициальный русский перевод';
        notice.append(title, document.createElement('br'));
        notice.append('Независимый проект vertexvisionart. Сайт не связан с NumPy или NumFOCUS и не имеет их официального одобрения. ');
        const original = document.createElement('a');
        original.href = 'https://numpy.org/doc/2.5/';
        original.textContent = 'Официальная документация';
        const source = document.createElement('a');
        source.href = 'https://github.com/vertexvisionart/numpy-docs-2.5-ru';
        source.textContent = 'Репозиторий перевода';
        notice.append(original, ' · ', source);
        container.prepend(notice);
    }
    const footer = document.querySelector('.bd-footer');
    if (footer) {
        const credit = document.createElement('p');
        credit.className = 'ru-publisher-trademark';
        credit.textContent = 'NumPy — товарный знак NumFOCUS. NumPy is a trademark of NumFOCUS.';
        footer.append(credit);
    }
    document.querySelectorAll('link[rel~="icon"]').forEach(function (icon) { icon.remove(); });
    const icon = document.createElement('link');
    icon.rel = 'icon';
    icon.href = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"%3E%3Crect width="32" height="32" rx="6" fill="%23334a62"/%3E%3Ctext x="16" y="24" text-anchor="middle" font-family="sans-serif" font-size="25" fill="white"%3EV%3C/text%3E%3C/svg%3E';
    document.head.append(icon);
    document.body.classList.add('ru-publisher-ready');
});
