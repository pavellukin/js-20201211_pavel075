class Tooltip {
    static instance = null;

    onPointerover = (event) => {
        const target = event.target;
        if(target instanceof HTMLElement && !target.dataset.tooltip) {
            return;
        }

        this.element.hidden = false;
        this.element.textContent = target.dataset.tooltip;
        document.body.append(this.element);
        document.body.addEventListener("mousemove", this.onMousemove);
    }

    onPointerout = (event) => {
        this.element.remove();
        document.body.removeEventListener("mousemove", this.onMousemove);
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
    }

    get template() {
        return `<div class="tooltip"></div>`;
    }

    render(hidden) {
        const element = document.createElement("div");
        element.innerHTML = this.template;
        this.element = element.firstElementChild;
        this.element.hidden = hidden;
        document.body.append(this.element);
    }

    addEventListeners() {
        document.body.addEventListener("pointerover", this.onPointerover);
        document.body.addEventListener("pointerout", this.onPointerout);
    }

    removeEventListeners() {
        document.body.removeEventListener("pointerover", this.onPointerover);
        document.body.removeEventListener("pointerout", this.onPointerout);
    }

    removeMousemove() {

    }

    initialize() {
        this.render(true);
        this.addEventListeners();
    }

    remove() {
        this.element.remove();
    }

    destroy() {
        this.remove();
        this.removeEventListeners();
    }
}

const tooltip = new Tooltip();

export default tooltip;
