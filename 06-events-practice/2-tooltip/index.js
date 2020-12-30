class Tooltip {
    static instance = null;

    onPointerover = (event) => {
        let target = event.target;
        if(target.tagName !== "DIV" && !target.dataset.tooltip) {
            return;
        }

        this.element.hidden = false;
        this.element.textContent = target.dataset.tooltip;
        document.body.append(this.element);
    }

    onPointerout = (event) => {
        this.element.remove();
    }

    onMousemove = (event) => {
        this.element.style.left = event.clientX + "px";
        this.element.style.top = (event.clientY + 5) + "px";
    }

    constructor() {
        if (!Tooltip.instance) {
            Tooltip.instance = this;
            this.removeEventListeners();
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
        document.body.addEventListener("mousemove", this.onMousemove);
    }

    removeEventListeners() {
        document.body.removeEventListener("pointerover", this.onPointerover);
        document.body.removeEventListener("pointerout", this.onPointerout);
        document.body.removeEventListener("mousemove", this.onMousemove);
        console.log(1234);
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
    }
}

const tooltip = new Tooltip();

export default tooltip;
