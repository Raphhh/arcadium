import {Sprite} from "../../Display/Sprite";

export interface SpriteRenderingInterface {
    render(sprite:Sprite, context:CanvasRenderingContext2D):void;
}