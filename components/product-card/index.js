export class ProductCardComponent {
    constructor(parent, onDelete, onOpenProduct) {
        this.parent = parent;
        this.onDelete = onDelete;       // удаление карточки
        this.onOpenProduct = onOpenProduct; // переход на страницу продукта
    }

    getHTML(data) {
        return `
            <div class="card" style="width: 300px;" data-id="${data.id}">
                <img class="card-img-top" src="${data.src}" alt="${data.title}">
                <div class="card-body">
                    <h5 class="card-title">${data.title}</h5>
                    <p class="card-text">${data.text}</p>
                    <div class="d-flex justify-content-between">
                        <button class="btn btn-sm btn-info popover-btn" data-id="${data.id}"
                                data-bs-toggle="popover" data-bs-title="ⓘ Информация"
                                data-bs-content="${data.popoverContent}" data-bs-trigger="click">
                            Инфо
                        </button>
                        <button class="btn btn-sm btn-primary open-btn" data-id="${data.id}">
                            Открыть
                        </button>
                        <button class="btn btn-sm btn-danger delete-btn" data-id="${data.id}">
                            Удалить
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    // Инициализация Bootstrap Popover
    initPopover(data) {
        const btn = document.querySelector(`.popover-btn[data-id="${data.id}"]`);
        if (btn && typeof bootstrap !== 'undefined') {
            new bootstrap.Popover(btn, { trigger: 'click', placement: 'top' });
        }
    }

    addListeners(data) {
        const deleteBtn = document.querySelector(`.delete-btn[data-id="${data.id}"]`);
        const openBtn = document.querySelector(`.open-btn[data-id="${data.id}"]`);

        if (deleteBtn) {
            deleteBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.onDelete(data.id);
            });
        }
        if (openBtn) {
            openBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.onOpenProduct(data.id);
            });
        }
    }

    render(data) {
        const html = this.getHTML(data);
        this.parent.insertAdjacentHTML('beforeend', html);
        this.initPopover(data);
        this.addListeners(data);
    }
}
