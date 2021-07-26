import {Shape} from "../../Display";
import {SpriteBaseShapeRendering} from "./SpriteBaseShapeRendering";

export class SpriteCircleShapeRendering extends SpriteBaseShapeRendering {

    render(sprite: Shape, context: CanvasRenderingContext2D): void {

        context.beginPath();
        context.arc(
            sprite.absoluteRectangle.x + sprite.rectangle.width / 2,
            sprite.absoluteRectangle.y + sprite.rectangle.height / 2,
            sprite.rectangle.width / 2,
            0,
            Math.PI * 2,
            false
        );
        context.closePath();

        super.render(sprite, context);
    }
}