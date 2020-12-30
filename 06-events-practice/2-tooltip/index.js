class Tooltip {
    static instance = null;

    onPointerover = (event) => {
        this.element.hidden = false;
        let target = event.target;
        if(target.tagName !== "DIV" && !target.dataset.tooltip) {
            return;
        }
        this.element.textContent = target.dataset.tooltip;
    }

    onPointerout = (event) => {
        this.element.hidden = true;
    }

    onMousemove = (event) => {
        this.element.style.left = event.clientX + "px";
        this.element.style.top = (event.clientY + 5) + "px";
    }

    constructor() {
        if (!Tooltip.instance) {
            Tooltip.instance = this;
        } else {
            return Tooltip.instance;
        }

        this.render(true);
        this.containers = document.querySelectorAll("div");
    }

    get template() {
        return `<div id="container" class="tooltip"></div>`;
    }

    render(hidden) {
        const element = document.createElement("div");
        element.innerHTML = this.template;
        this.element = element.firstElementChild;
        this.element.hidden = hidden;
        document.body.append(this.element);
    }

    addEventListeners() {
        for (let item of [...this.containers]) {
            item.addEventListener("pointerover", this.onPointerover);
            item.addEventListener("pointerout", this.onPointerout);
            item.addEventListener("mousemove", this.onMousemove);
        }
    }

    initialize() {
        this.addEventListeners();
    }

    remove() {
        this.element.remove();
    }

    destroy() {
        this.remove();
    }
}

const tooltip = new Tooltip();

export default tooltip;
