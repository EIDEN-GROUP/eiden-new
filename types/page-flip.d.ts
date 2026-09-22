declare module "page-flip" {
  export class PageFlip {
    constructor(block: HTMLElement, settings: Record<string, unknown>);
    loadFromHTML(items: HTMLElement[]): void;
    on(event: "flip", callback: (e: { data: number }) => void): PageFlip;
    flip(page: number): void;
    flipNext(): void;
    flipPrev(): void;
    update(): void;
    getUI(): { destroy(): void };
    getRender(): object;
  }
}
