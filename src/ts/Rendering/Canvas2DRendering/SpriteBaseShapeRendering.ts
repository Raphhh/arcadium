import {SpriteRenderingInterface} from "./SpriteRenderingInterface";
import {Shape} from "../../Display";

export class SpriteBaseShapeRendering implements SpriteRenderingInterface {

    render(sprite: Shape, context: CanvasRenderingContext2D): void {

        if (sprite.lineCap !== undefined) {
            context.lineCap = sprite.lineCap;
        }

        if (sprite.lineDashOffset !== undefined) {
            context.lineDashOffset = sprite.lineDashOffset;
        }

        if (sprite.lineJoin !== undefined) {
            context.lineJoin = sprite.lineJoin;
        }

        if (sprite.lineWidth !== undefined) {
            context.lineWidth = sprite.lineWidth;
        }

        if (sprite.miterLimit !== undefined) {
            context.miterLimit = sprite.miterLimit;
        }

        if (sprite.lineDash !== undefined) {
            context.setLineDash(sprite.lineDash);
        }

        // the fill color
        if (sprite.fillStyle !== undefined) {
            context.fillStyle = sprite.fillStyle;
            context.fill();
        }

        //the outline
        if (sprite.strokeStyle !== undefined) {
            context.strokeStyle = sprite.strokeStyle;
            context.stroke();
        }
    }
}