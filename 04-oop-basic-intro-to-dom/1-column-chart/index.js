export default class ColumnChart {
    constructor({data = [], label = "", link = "", value = 0} = {}) {
        this.data = data;
        this.label = label;
        this.link = label;
        this.value = value;
        this.chartHeight = 50;

        this.render();
    }

    render() {
        const element = document.createElement("div");

        element.innerHTML = `
        <div class="wrapper">
            <div class="dashboard__charts">
                <div class="dashboard__chart_orders">
                    <div class="column-chart" style="--chart-height: ${this.chartHeight}">
                        <div class="column-chart__title">
                                ${this.label}
                            <a href="/sales" class="column-chart__link">${this.link}</a>
                        </div>
                        <div class="column-chart__container">
                            <div data-element="header" class="column-chart__header">${this.value}</div>
                            <div data-element="body" class="column-chart__chart">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `;

        let colums = "";
        if(this.data.length) {
            for (const item of this.getColumnProps(this.data)) {
                colums += `<div style="--value: ${item.value}" data-tooltip="${item.percent}"></div>`;
            }
        } else {
            element.firstElementChild.classList.add("column-chart_loading");
        }

        element.querySelector(".column-chart__chart").innerHTML = colums;

        this.element = element.firstElementChild;
    }

    getColumnProps(data) {
        const maxValue = Math.max(...data);
        const scale = 50 / maxValue;
      
        return data.map(item => {
          return {
            percent: (item / maxValue * 100).toFixed(0) + '%',
            value: String(Math.floor(item * scale))
          };
        });
      }

    update(data) {
        this.data = data;
    }

    remove() {
        this.element.remove();
    }

    destroy() {
        this.remove();
    }
}
