import {SpriteRenderingInterface} from "./SpriteRenderingInterface";
import {Sprite} from "../../Display/Sprite";

export class BaseSpriteRendering implements SpriteRenderingInterface {

    render(sprite: Sprite, context: CanvasRenderingContext2D) {
        context.globalAlpha = sprite.alpha;

        if (sprite.translation) {
            context.translate(sprite.translation.x, sprite.translation.y);
        }

        if (sprite.scale) {
            //todo est-ce qu'il faut rendre la scale fixe lors d'une rotation? voir https://gist.github.com/rodrigopedra/fcf8e84ec6dc80f3572b97ae26e2924d
            context.translate(sprite.absoluteRectangle.center.x, sprite.absoluteRectangle.center.y);
            context.scale(sprite.scale.x, sprite.scale.y);
            context.translate(-sprite.absoluteRectangle.center.x, -sprite.absoluteRectangle.center.y);
        }

        if (sprite.rotation) {
            context.translate(sprite.absoluteRectangle.center.x, sprite.absoluteRectangle.center.y);
            context.rotate(sprite.rotation.radians);
            context.translate(-sprite.absoluteRectangle.center.x, -sprite.absoluteRectangle.center.y);
        }

        if (sprite.transformation) {
            context.translate(sprite.absoluteRectangle.center.x, sprite.absoluteRectangle.center.y);
            context.setTransform(
                sprite.transformation.a,
                sprite.transformation.b,
                sprite.transformation.c,
                sprite.transformation.d,
                sprite.transformation.e,
                sprite.transformation.f
            );
            //Todo ceci ne marche pas!
            console.error('sprite.transformation not implemented');
            context.translate(-sprite.absoluteRectangle.center.x, -sprite.absoluteRectangle.center.y);
        }

        if (sprite.shadow) {
            context.shadowBlur = sprite.shadow.blur;
            if (sprite.shadow.color) {
                context.shadowColor = sprite.shadow.color;
            }
            if (sprite.shadow.offset) {
                context.shadowOffsetX = sprite.shadow.offset.x;
                context.shadowOffsetY = sprite.shadow.offset.y;
            }
        }

        if (sprite.blendMode) {
            context.globalCompositeOperation = sprite.blendMode;
        }
    }
}