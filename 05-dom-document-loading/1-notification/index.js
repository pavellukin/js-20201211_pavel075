export default class NotificationMessage {
    constructor(msg, {duration = 1000, type = "success"} = {}) {
        this.msg = msg;
        this.duration = duration;
        this.type = type;

        this.render();
    }

    get template() {
        return `
            <div style="position: fixed; top: 0; right: 0;">
                <button id="btn1">${this.msg}</button>
            </div>
            <div class="notification success" style="--value:${this.duration}s">
            <div class="timer"></div>
            <div class="inner-wrapper">
                <div class="notification-header">${this.type}</div>
                    <div class="notification-body">${this.msg}</div>
                </div>
            </div>
        `;
    }

    render() {
        const element = document.createElement("div");
        element.innerHTML = this.template;
        this.element = element.firstElementChild;

        if(!this.element.classList.contains(this.type)) {
            this.element.classList.add(this.type);
        }
    }

    show(element) {
        if(element) {
            this.element = element;
        }

        setTimeout(() => {
            this.element;
        }, this.duration);

        this.destroy();
    }

    remove() {
        this.element.remove();
    }

    destroy() {
        this.remove();
    }
}
