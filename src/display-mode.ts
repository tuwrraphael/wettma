export function isStandalone() {
    const mqStandAlone = "(display-mode: standalone)";
    if (navigator && (<any>navigator).standalone) {
        return true;
    } else if (typeof window.matchMedia == "function" && window.matchMedia(mqStandAlone).matches) {
        return true;
    }
    return false;
}

