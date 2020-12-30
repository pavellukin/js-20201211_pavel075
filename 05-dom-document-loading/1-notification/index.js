export default class NotificationMessage {
    static activeNotification;

    constructor(msg, {duration = 1000, type = "success"} = {}) {

        if(NotificationMessage.activeNotification) {
            NotificationMessage.activeNotification.remove();
        }

        this.msg = msg;
        this.duration = duration;
        this.type = type;

        this.render();
    }

    get template() {
        return `
            <div class="notification ${this.type}" style="--value:${this.duration/1000}s">
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
        NotificationMessage.activeNotification = this.element;
    }

    show(element = null) {

        if(element) {
            this.element = element;
        }
        
        document.body.append(this.element)
        
        NotificationMessage.timeout = setTimeout(() => {
            this.remove();
        }, this.duration);
    }

    remove() {
        this.element.remove();
    }

    destroy() {
        this.remove();
    }
}
