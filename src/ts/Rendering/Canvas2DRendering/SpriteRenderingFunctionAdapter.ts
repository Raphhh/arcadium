import {Sprite} from "../../Display";
import {SpriteRenderingInterface} from "./SpriteRenderingInterface";

export class SpriteRenderingFunctionAdapter implements SpriteRenderingInterface {

    private readonly callback: (sprite: Sprite, context: CanvasRenderingContext2D) => void;

    public constructor(callback: (sprite:Sprite, context:CanvasRenderingContext2D) => void) {
        this.callback = callback;
    }

    render(sprite: Sprite, context: CanvasRenderingContext2D): void {
        this.callback(sprite, context);
    }
}