import {SpriteRenderingInterface} from "./SpriteRenderingInterface";
import {Text} from "../../Display/Text";

export class SpriteTextRendering implements SpriteRenderingInterface {

    render(sprite: Text, context: CanvasRenderingContext2D) {

        context.direction = sprite.direction;
        context.font = sprite.font;
        context.textAlign = sprite.textAlign;
        context.textBaseline = sprite.textBaseline;

        const lines = sprite.text.split('\n');

        for (let i:number = 0; i < lines.length; ++i) {
            context.fillText(
                lines[i],
                sprite.absoluteRectangle.x,
                sprite.absoluteRectangle.y + (sprite.lineHeight * (i + 1)),
                sprite.adjustToWidth ? sprite.rectangle.width : undefined
            );
        }
    }
}