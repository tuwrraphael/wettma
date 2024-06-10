import { ContainerRouteRenderer, Router } from "route-it";
import { AsyncRouteResolver } from "route-it/dist/router";
import { HomeComponent } from "./components/HomeComponent/HomeComponent";
import { LoginComponent } from "./components/LoginComponent/LoginComponent";
import { RegisterComponent } from "./components/RegisterComponent/RegisterComponent";

export class AppRouter {
    activeRoute: string;
    static instance: AppRouter = null;
    router: Router<HTMLElement>;
    static getInstance() {
        if (null == this.instance) {
            this.instance = new AppRouter();
        }
        return this.instance;
    }

    constructor() {
        let self = this;
        class AppRouteResolver implements AsyncRouteResolver<HTMLElement> {
            async resolve(lastRoute: string, currentRoute: string, router: Router<any>): Promise<false | HTMLElement> {
                switch (currentRoute) {
                    case "login":
                        self.activeRoute = "login";
                        return new LoginComponent();
                    case "register":
                        self.activeRoute = "register";
                        return new RegisterComponent();
                    case "explanation":
                        self.activeRoute = "explanation";
                        let { ExplanationComponent } = await import("./components/ExplanationComponent/ExplanationComponent");
                        return new ExplanationComponent();
                    case "scoreboard":
                        self.activeRoute = "scoreboard";
                        let { ScoreboardComponent } = await import("./components/ScoreboardComponent/ScoreboardComponent");
                        return new ScoreboardComponent();
                    case "setresult":
                        self.activeRoute = "setresult";
                        let { SetResultComponent } = await import("./components/SetResultComponent/SetResultComponent");
                        return new SetResultComponent();
                    case "placecomputerbets":
                        self.activeRoute = "placecomputerbets";
                        let { PlaceComputerBetsComponent } = await import("./components/PlaceComputerBetsComponent/PlaceComputerBetsComponent");
                        return new PlaceComputerBetsComponent();
                    default:
                        self.activeRoute = "home";
                        let c = new HomeComponent();
                        return c;
                }
            }
        }
        this.router = new Router<HTMLElement>(new AppRouteResolver(), new ContainerRouteRenderer(document.getElementById("content")));
    }
}
