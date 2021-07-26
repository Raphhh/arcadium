import {Sprite} from "../../Display/Sprite";
import {BaseSpriteRendering} from "./BaseSpriteRendering";
import {SpriteBoundariesRendering} from "./SpriteBoundariesRendering";
import {Shape} from "../../Display/Shape";
import {Rectangle} from "../../Geom/Rectangle";

export class Canvas2DRendering {

    private readonly baseSpriteRendering:BaseSpriteRendering;
    private readonly spriteBoundariesRendering:SpriteBoundariesRendering;

    public constructor(baseSpriteRendering:BaseSpriteRendering, spriteBoundariesRendering:SpriteBoundariesRendering) {
        this.baseSpriteRendering = baseSpriteRendering;
        this.spriteBoundariesRendering = spriteBoundariesRendering;
    }

    public clear(context:CanvasRenderingContext2D, sprite:Sprite) {
        let rectangle:Rectangle = sprite.absoluteRectangle;
        context.clearRect(rectangle.left, rectangle.top, rectangle.right, rectangle.bottom);
    }

    public renderSprite(context:CanvasRenderingContext2D, sprite:Sprite, isDebugMode:boolean) {
        this.renderSingleSprite(context, sprite, isDebugMode);
        for (const child of sprite.children) {
            this.renderSprite(context, child, isDebugMode);
        }
    }

    private renderSingleSprite(context:CanvasRenderingContext2D, sprite:Sprite, isDebugMode:boolean) {
        context.save();

        if (sprite.isVisible) {
            this.baseSpriteRendering.render(sprite, context)
            if (sprite.rendering) {
                sprite.rendering.render(sprite, context);
            }
        }

        if (isDebugMode) {
            this.renderBoundaries(context, sprite, '#ccc');
            context.restore();
            this.renderBoundaries(context, sprite,'#0000ff');
        }

        context.restore();
    }

    private renderBoundaries(context:CanvasRenderingContext2D, sprite:Sprite, color:string) {
        if (!sprite.parent) {
            //avoid to debug the stage
            return;
        }

        let shape:Shape = new Shape(null, sprite.rectangle);
        shape.strokeStyle = color;
        this.spriteBoundariesRendering.render(shape, context);
    }
}