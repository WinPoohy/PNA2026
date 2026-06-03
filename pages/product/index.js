import { HeaderComponent } from "../../components/header/index.js";
import { ProductComponent } from "../../components/product/index.js";
import { MainPage } from "../main/index.js";

export class ProductPage {
    constructor(parent, id, allData) {
        this.parent = parent;
        this.id = id;
        this.allData = allData; // получаем актуальные данные из главной страницы
    }

    getData() {
        return this.allData.find(item => item.id == this.id);
    }

    get pageRoot() {
        return document.getElementById('product-page');
    }

    getHTML() {
        return `<div id="product-page" class="container mt-4"></div>`;
    }

    goHome() {
        const mainPage = new MainPage(this.parent);
        mainPage.render();
    }

    render() {
        this.parent.innerHTML = '';
        const header = new HeaderComponent(this.parent, 'product');
        header.render(() => this.goHome());

        this.parent.insertAdjacentHTML('beforeend', this.getHTML());

        const data = this.getData();
        if (data) {
            const product = new ProductComponent(this.pageRoot);
            product.render(data);
        } else {
            this.pageRoot.insertAdjacentHTML('beforeend', '<div class="alert alert-danger">Стиль не найден</div>');
        }
    }
}
