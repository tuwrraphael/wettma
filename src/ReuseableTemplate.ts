export class ReuseableTemplate {
    private instance: HTMLTemplateElement;
    constructor(private readonly template: string) {
    }

    get(): DocumentFragment {
        if (null == this.instance) {
            this.instance = document.createElement("template");
            this.instance.innerHTML = this.template;
        }
        return document.importNode(this.instance.content, true);
    }
}
