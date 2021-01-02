export default class SortableTable {
    subElements = {};
    order = "";

    constructor(header = [], { data = [], order = "asc", field = "price" } = {}) {
        this.header = header;
        this.data = data;
        this.order = order;
        this.field = field;

        this.render();
        this.element.querySelector("[data-element='header']").onclick = this.onClick.bind(this);
        this.changeSortColumn(this.field);
    }

    getColumnHeader(header) {
        return header.map(item => {
            return `
                <div class="sortable-table__cell" data-id=${item.id} data-sortable=${item.sortable} data-order=${this.order}>
                    <span>${item.title}</span>
                    <span data-element="arrow" class="sortable-table__sort-arrow">
                        <span class="sort-arrow"></span>
                    </span>
                </div>`;
        }).join("");
    }

    getTableRow(item) {
        const cells = this.header.map(({id, template}) => {
            return {id, template};
        });

        return cells.map(({id, template}) => {
            return template 
                ? template(item[id]) // imeges
                : `<div class="sortable-table__cell">${item[id]}</div>`;
        }).join("");
    }

    getColumnBody(data) {
        return data.map(item => {
            return `
                <a href="/products/${item.id}" class="sortable-table__row">
                    ${this.getTableRow(item)}
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

    changeSortColumn(field) {
        const allColumns = this.element.querySelectorAll('.sortable-table__cell[data-id]');
        const currentColumn = this.element.querySelector(`.sortable-table__cell[data-id="${field}"]`);

        let _dataOrder = currentColumn.dataset.order;

        if(field !== this.field) {
            this.field = field;
        } else {
            if(_dataOrder === "asc") {
                this.order = "desc";
            }
            if(_dataOrder === "desc") {
                this.order = "asc";
            }
        }
                
        allColumns.forEach(column => {
            column.dataset.order = "";
        });

        currentColumn.dataset.order = this.order;

        this.sort();
    }

    sort() {
        this.update(this.makeOrderSorting());
    }

    makeOrderSorting() {

        const _array = [...this.data];
        const { sortType } = this.header.find((value) => value.id === this.field);
        const direction = this.order === 'asc' ? 1 : -1;

        return _array.sort((a, b) => {
            switch(sortType) {
                case "string":
                    return direction * a[this.field].localeCompare(b[this.field], ["ru", "en"]);
                    break;
                case "number":
                    return direction * (a[this.field] - b[this.field]);
                    break;
                case "custom":
                    // TODO...
                    break;
                default: 
                    return (a, b) => direction * (a[this.field] - b[this.field]);
    
            }
        });
    }

    onClick(event) {
        let _target = event.target.closest("div.sortable-table__cell");
        if(!_target) {
            return;
        }
        if(!this.subElements.header.contains(_target)) {
            return;
        }

        let _field = _target.dataset.id;
        let _isSortable = (_target.dataset.sortable === "true");
   
        if(_field && _isSortable) {
            this.changeSortColumn(_field);
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

