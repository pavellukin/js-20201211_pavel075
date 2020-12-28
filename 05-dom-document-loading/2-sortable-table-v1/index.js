export default class SortableTable {
    subElements = {};
    order = "";

    constructor(header = [], {data = []} = {}) {
        this.header = header;
        this.data = data;
        this.render();
    }

    getColumnHeader(header) {
        return header.map(item => {
            return `
                <div class="sortable-table__cell" data-id=${item.id} data-sortable=${item.sortable} data-order=${this.order}>
                    <span>${item.title}</span>
                </div>`;
        }).join("");
    }

    getImage(imgUrl) {
        if(imgUrl.images && imgUrl.images.length) {
            return `<img class="sortable-table-image" alt="Image" src=${imgUrl.images[0].url}>`;
        }
    }

    getColumnBody(data) {
        return data.map(item => {
            return `
                <a href="#" class="sortable-table__row">
                    <div class="sortable-table__cell">
                        ${this.getImage(item)}
                    </div>
                    <div class="sortable-table__cell">${item.title}</div>
                    <div class="sortable-table__cell">${item.quantity}</div>
                    <div class="sortable-table__cell">${item.price}</div>
                    <div class="sortable-table__cell">${item.sales}</div>
                </a>`;
        }).join("");
    }

    get template() {
        return `
            <div data-element="productsContainer" class="products-list__container">
                <div class="sortable-table">        
                <div data-element="header" class="sortable-table__header sortable-table__row">
                    ${this.getColumnHeader(this.header)}
                </div>
                <div data-element="body" class="sortable-table__body">
                    ${this.getColumnBody(this.data)}
                </div>
                </div>
            </div>
        `;
    }

    render() {
        const element = document.createElement("div");
        element.innerHTML = this.template;
        this.element = element.firstElementChild;
        this.subElements = this.getSubElements(this.element);
    }

    getSubElements(element) {
        const elements = element.querySelectorAll("[data-element]");

        return [...elements].reduce((accum, subElement) => {
            accum[subElement.dataset.element] = subElement;
            return accum;
        }, {});
    }

    sort(field, order) {
        this.order = order;
        const sortType = this.header.find((value) => value.id === field)?.sortType;
        switch(order) {
            case "asc":
                this.update(makeOrderSorting(this.data, 1));
                break;
            case "desc":
                this.update(makeOrderSorting(this.data, -1));
                break;
            default:
                return;

        }

        function makeOrderSorting(array, direction) {
            if(sortType === "string") {
                return [...array].sort((a, b) => {
                    return direction * a[field].localeCompare(b[field], ["ru", "en"], {caseFirst: 'upper'});
                });
            }
            
            if(sortType === "number") {
                if(direction > 0) {
                    return [...array].sort((a, b) => a[field] - b[field]);
                } else {
                    return [...array].sort((a, b) => a[field] - b[field]).reverse();
                }
            }
        }
    }

    update(data) {
        this.subElements.body.innerHTML = this.getColumnBody(data);
    }

    remove() {
        this.element.remove();
    }

    destroy() {
        this.remove();
        this.subElements = {};
    }
}

