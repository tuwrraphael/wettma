export class ArrayToElementRenderer<T, E extends Element, K>{
    private keyToElement: Map<K, E>;
    private elementToKey: WeakMap<E, K>;
    
    constructor(private listElement: HTMLElement,
        private keySelector: (x: T) => K,
        private createElement: (x: T) => E) {
        this.keyToElement = new Map<K, E>();
        this.elementToKey = new WeakMap<E, K>();
    }

    update(list: T[], updateElement: (x: E, data: T) => void) {
        let keyCache = new Map<T, K>();
        let getKey = (d: T) => keyCache.get(d) || (() => {
            let key = this.keySelector(d);
            keyCache.set(d, key);
            return key;
        })();
        for (let x of Array.from(this.listElement.children)) {
            let el: E = <E>x;
            let data = list.find(i => this.elementToKey.get(el) == getKey(i));
            if (data) {
                updateElement(<E>el, data);
            }
            else {
                this.listElement.removeChild(el);
            }
        }
        let before: Element = null;
        let nextKeyToElement = new Map<K, E>();
        for (let t of list) {
            let key = getKey(t);
            let childElement: E = this.keyToElement.get(key);
            if (!childElement) {
                childElement = this.createElement(t);
                updateElement(childElement, t);
                this.elementToKey.set(childElement, key);
            }
            nextKeyToElement.set(key, childElement);
            if (null == before && childElement != this.listElement.firstElementChild) {
                this.listElement.prepend(childElement);
            }
            else if (null != before && before.nextElementSibling != childElement) {
                before.insertAdjacentElement("afterend", childElement);
            }
            before = childElement;
        }
        this.keyToElement = nextKeyToElement;
    }

}