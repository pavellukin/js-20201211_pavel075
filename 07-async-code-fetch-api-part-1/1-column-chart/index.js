import fetchJson from "./utils/fetch-json.js";

export default class ColumnChart {
    subElements = {};
    chartHeight = 50;
    fullUrl = "https://course-js.javascript.ru/";

    constructor({
        url = "",
        range = {from: "", to: ""},
        label = '',
        link = '',
        value = 0,
        formatHeading = null
    } = {}) {
        this.fullUrl += url;
        this.range = range;
        this.label = label;
        this.link = link;
        this.value = value;
        this.formatHeading = formatHeading;
    
        this.render();
    }

    getColumnBody(values) {
        if(!values.length) return;

        const maxValue = Math.max(...values);
        const scale = this.chartHeight / maxValue;

        if (values) {
            this.element.classList.remove('column-chart_loading');
        }

        return values
            .map(item => {
            const percent = (item / maxValue * 100).toFixed(0);
            return `<div style="--value: ${Math.floor(item * scale)}" data-tooltip="${percent}%"></div>`;
        })
        .join('');
    }

    getLink() {
        return this.link ? `<a class="column-chart__link" href="${this.link}">View all</a>` : '';
    }

    getValue(value) {
        return this.formatHeading ? this.formatHeading(value) : value;
    }

    get template() {
        return `
            <div class="column-chart column-chart_loading" style="--chart-height: ${this.chartHeight}">
            <div class="column-chart__title">
                Total ${this.label}
                ${this.getLink()}
            </div>
            <div class="column-chart__container">
                <div data-element="header" class="column-chart__header"></div>
                <div data-element="body" class="column-chart__chart"></div>
            </div>
            </div>
        `;
    }

    render() {
        const element = document.createElement('div');

        element.innerHTML = this.template;

        this.element = element.firstElementChild;

        this.subElements = this.getSubElements(this.element);
        this.update(this.range.from, this.range.to);
    }

    getSubElements(element) {
        const elements = element.querySelectorAll('[data-element]');
    
        return [...elements].reduce((accum, subElement) => {
          accum[subElement.dataset.element] = subElement;
            return accum;
        }, {});
    }

    async update(from, to) {
        const data = await fetchJson(this.fullUrl + `?from=${from}&to=${to}`);
        const values = Object.values(data);
        const value = values.reduce((accum, num) => accum += num);

        this.subElements.body.innerHTML = this.getColumnBody(values);
        this.subElements.header.innerHTML = this.getValue(value);
    }
    
    remove () {
        this.element.remove();
    }
    
    destroy() {
        this.remove();
        this.subElements = {};
    }
}
