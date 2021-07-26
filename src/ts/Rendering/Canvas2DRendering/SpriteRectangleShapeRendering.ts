import {Shape} from "../../Display";
import {SpriteBaseShapeRendering} from "./SpriteBaseShapeRendering";

export class SpriteRectangleShapeRendering extends SpriteBaseShapeRendering {

    render(sprite: Shape, context: CanvasRenderingContext2D): void {

        context.beginPath();
        context.rect(
            sprite.absoluteRectangle.x,
            sprite.absoluteRectangle.y,
            sprite.rectangle.width,
            sprite.rectangle.height
        );
        context.closePath();

        super.render(sprite, context)
    }
}