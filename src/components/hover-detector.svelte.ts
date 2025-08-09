
export class HoverDetector {
    public hovering: boolean = $state(false);
    public element: HTMLElement | null = $state(null);
    private timer: NodeJS.Timeout | null = $state(null);

    constructor() {
        window.addEventListener("mousemove", (e) => this.listener(e));
    }

    private listener(ev: MouseEvent) {
        if (!this.element) return;

        let rect = this.element.getBoundingClientRect();
        let inside =
            ev.clientX >= rect.left &&
            ev.clientX <= rect.right &&
            ev.clientY >= rect.top &&
            ev.clientY <= rect.bottom;

        if (inside) {
            this.hovering = true;
            if (this.timer) clearTimeout(this.timer);
            this.timer = setTimeout(() => {
                this.hovering = false;
            }, 2000);
        }
    }
}