import { Action } from "./requests/Action";
import { State } from "./state";

interface Subscription<State> {
    call(a: State): void;
}

export class Store {
    private static instance: Store = null;
    private worker: Worker;
    private subscriptions: Subscription<State>[];
    private _state: State = null;

    get state() {
        return this._state;
    }

    static getInstance() {
        if (null == this.instance) {
            this.instance = new Store();
        }
        return this.instance;
    }

    constructor() {
        this.subscriptions = [];
        this.worker = new Worker(new URL("./worker", import.meta.url));
        this.worker.addEventListener("message", ev => {
            this._state = ev.data;
            for (let s of this.subscriptions) {
                try {
                    s.call(this._state);
                }
                catch (err) {
                    console.error(`Error while updating`, err);
                }

            }
        });
    }

    subscribe(call: (a: State) => void, signal?: AbortSignal) {
        let sub = { call };
        this.subscriptions.push(sub);
        if (signal) {
            signal.addEventListener("abort", () => {
                this.subscriptions.splice(this.subscriptions.indexOf(sub), 1);
            });
        }
    }

    postAction(action: Action) {
        this.worker.postMessage(action);
    }
}