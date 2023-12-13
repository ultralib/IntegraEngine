import { Game } from "./Game";

export class Globals {
    public static get game(): Game | null {
        return (window as any).$game ?? null;
    }

    public static set game(val: Game) {
        (window as any).$game = val;
    }
}
