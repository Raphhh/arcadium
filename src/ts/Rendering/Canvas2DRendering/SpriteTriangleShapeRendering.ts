import {Shape} from "../../Display";
import {SpriteBaseShapeRendering} from "./SpriteBaseShapeRendering";

export class SpriteTriangleShapeRendering extends SpriteBaseShapeRendering {

    render(sprite: Shape, context: CanvasRenderingContext2D): void {

        context.beginPath();
        context.moveTo(
            sprite.absoluteRectangle.x + (sprite.rectangle.width / 2),
            sprite.absoluteRectangle.y
        );
        context.lineTo(
            sprite.absoluteRectangle.x,
            sprite.absoluteRectangle.y + sprite.rectangle.height
        );
        context.lineTo(
            sprite.absoluteRectangle.x + sprite.rectangle.width,
            sprite.absoluteRectangle.y + sprite.rectangle.height
        );
        context.closePath();

        super.render(sprite, context);
    }
}