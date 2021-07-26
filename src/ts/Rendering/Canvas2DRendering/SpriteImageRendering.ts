import {SpriteRenderingInterface} from "./SpriteRenderingInterface";
import {Image} from "../../Display/Image";

export class SpriteImageRendering implements SpriteRenderingInterface {

    render(sprite: Image, context: CanvasRenderingContext2D) {
        context.drawImage(
            sprite.source,
            0,
            0,
            <number>sprite.source.width,
            <number>sprite.source.height,
            sprite.absoluteRectangle.x,
            sprite.absoluteRectangle.y,
            sprite.rectangle.width,
            sprite.rectangle.height
        );
    }
}