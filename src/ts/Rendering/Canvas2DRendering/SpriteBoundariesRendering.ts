import {SpriteRenderingInterface} from "./SpriteRenderingInterface";
import {Rectangle} from "../../Geom/Rectangle";
import {Shape} from "../../Display/Shape";

export class SpriteBoundariesRendering implements SpriteRenderingInterface {

    render(sprite: Shape, context: CanvasRenderingContext2D) {
        let rectangle:Rectangle = sprite.absoluteRectangle;

        // the rectangle
        context.beginPath();
        context.rect(rectangle.x, rectangle.y, rectangle.width, rectangle.height);
        context.closePath();

        //the outline
        context.lineWidth = sprite.lineWidth;
        context.strokeStyle = sprite.strokeStyle;
        context.stroke();
    }
}