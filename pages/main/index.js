import { HeaderComponent } from "../../components/header/index.js";
import { ProductCardComponent } from "../../components/product-card/index.js";
import { ProductPage } from "../product/index.js";

// Mock-коллекция
const mockData = [
    {
        id: 1,
        src: "https://i.pinimg.com/736x/d3/4b/13/d34b13dec1e49ed2e87a38d920aaafc3.jpg",
        title: "Минимализм",
        text: "Чистые линии, много воздуха и функциональность.",
        popoverContent: "Минимализм зародился в 1960-х. Девиз: «Меньше значит больше»."
    },
    {
        id: 2,
        src: "https://blog.cramazing.ru/wp-content/uploads/2023/10/brutalizm.jpg",
        title: "Брутализм",
        text: "Грубые формы, бетонные текстуры, асимметрия.",
        popoverContent: "Брутализм в вебе: моноширинные шрифты, «сырые» макеты, отсутствие украшений."
    },
    {
        id: 3,
        src: "https://img.freepik.com/free-vector/neumorphic-design-user-interface-elements_52683-56480.jpg?semt=ais_hybrid&w=740&q=80",
        title: "Неоморфизм",
        text: "Мягкие тени, выпуклые элементы, пластичность.",
        popoverContent: "Неоморфизм создаёт ощущение мягкого пластика за счёт теней и фона."
    }
];

export class MainPage {
    constructor(parent) {
        this.parent = parent;
        this.data = [...mockData]; // копия для мутаций
        this.nextId = 4;
    }

    get pageRoot() {
        return document.getElementById('main-page');
    }

    getHTML() {
        return `
            <div id="main-page" class="container">
                <div class="row mb-3">
                    <div class="col">
                        <input type="text" id="filter-input" class="form-control" placeholder="Фильтр по названию...">
                    </div>
                    <div class="col-auto">
                        <button id="add-button" class="btn btn-success">➕ Добавить (копировать первую)</button>
                    </div>
                </div>
                <div id="cards-container" class="d-flex flex-wrap gap-3 justify-content-start"></div>
            </div>
        `;
    }

    // Отрисовка карточек с учётом фильтра
    renderCards() {
        const container = document.getElementById('cards-container');
        if (!container) return;
        container.innerHTML = '';

        const filterText = document.getElementById('filter-input')?.value.toLowerCase() || '';
        const filtered = this.data.filter(item => item.title.toLowerCase().includes(filterText));

        filtered.forEach(item => {
            const card = new ProductCardComponent(
                container,
                (id) => this.deleteCard(id),
                (id) => this.openProductPage(id)
            );
            card.render(item);
        });
    }

    deleteCard(id) {
        this.data = this.data.filter(item => item.id !== id);
        this.renderCards();
    }

    addCard() {
        if (this.data.length === 0) return;
        const first = this.data[0];
        const newCard = {
            ...first,
            id: this.nextId++,
            title: `${first.title} (копия)`,
            text: first.text
        };
        this.data.push(newCard);
        this.renderCards();
    }

    openProductPage(id) {
        const productPage = new ProductPage(this.parent, id, this.data);
        productPage.render();
    }

    goHome() {
        this.render();
    }

    render() {
        this.parent.innerHTML = '';
        // Хедер с кнопкой "Домой" (на главной она не перезагружает страницу, но можно сделать обновление)
        const header = new HeaderComponent(this.parent, 'main');
        header.render(() => this.goHome());

        this.parent.insertAdjacentHTML('beforeend', this.getHTML());

        // Вешаем обработчики фильтра и добавления
        const filterInput = document.getElementById('filter-input');
        const addBtn = document.getElementById('add-button');

        if (filterInput) {
            filterInput.addEventListener('input', () => this.renderCards());
        }
        if (addBtn) {
            addBtn.addEventListener('click', () => this.addCard());
        }

        this.renderCards();
    }
}
