export class HeaderComponent {
    constructor(parent, currentPage = 'main') {
        this.parent = parent;
        this.currentPage = currentPage; // 'main' или 'product'
    }

    getHTML() {
        return `
            <nav class="navbar navbar-light bg-light mb-4 p-3">
                <div class="container-fluid">
                    <span class="navbar-brand mb-0 h1">🎨 Дизайн-стили</span>
                    <button id="home-button" class="btn btn-outline-primary" type="button">🏠 Домой</button>
                </div>
            </nav>
        `;
    }

    addListeners(listener) {
        const homeBtn = document.getElementById('home-button');
        if (homeBtn) homeBtn.addEventListener('click', listener);
    }

    render(listener) {
        const html = this.getHTML();
        this.parent.insertAdjacentHTML('afterbegin', html);
        this.addListeners(listener);
    }
}
