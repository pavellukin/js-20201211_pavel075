export default class NotificationMessage {
    static timeout = null;

    constructor(msg, {duration = 1000, type = "success"} = {}) {
        this.msg = msg;
        this.duration = duration;
        this.type = type;

        this.render();
    }

    get template() {
        return `
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

    show(element = null) {

        if(element) {
            this.element = element;
        }
        
        const elem = document.querySelector(".notification");
        if(elem) {
            elem.remove();
            this.destroy();
            clearTimeout(NotificationMessage.timeout);
        }

        setTimeout(() => document.body.append(this.element), 100);

        NotificationMessage.timeout = setTimeout(() => {
            this.destroy();
        }, this.duration);
    }

    remove() {
        this.element.remove();
    }

    destroy() {
        this.remove();
    }
}
