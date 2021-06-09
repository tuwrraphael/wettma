export function abortableEventListener<TCallbackFnResult,
    TEvent,
    TCallbackFn extends (this: THTMLElement, event: any) => TCallbackFnResult,
    TAddEventListener extends (eventName: TEvent, listener: TCallbackFn) => void,
    THTMLElement extends { addEventListener: TAddEventListener, removeEventListener: TAddEventListener }>(element: THTMLElement, event: TEvent, listenerFn: TCallbackFn, signal: AbortSignal): void
export function abortableEventListener<TCallbackFnResult,
    TEvent extends keyof HTMLElementEventMap,
    TCallbackFn extends (this: THTMLElement, event: HTMLElementEventMap[TEvent]) => TCallbackFnResult,
    TAddEventListener extends (eventName: TEvent, listener: TCallbackFn) => void,
    THTMLElement extends { addEventListener: TAddEventListener, removeEventListener: TAddEventListener }>(element: THTMLElement, event: TEvent, listenerFn: TCallbackFn, signal: AbortSignal): void {
    element.addEventListener(event, listenerFn);
    signal.addEventListener("abort", () => {
        element.removeEventListener(event, listenerFn);
    });
}