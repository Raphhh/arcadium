import {Sprite} from "./index";
import {SpriteRectangle} from "./Sprite";
import {SpriteImageRendering} from "../Rendering/Canvas2DRendering/SpriteImageRendering";
import {SpriteRendering} from "./Sprite";

export class Image extends Sprite {

    public readonly source:CanvasImageSource;

    constructor(source:CanvasImageSource, parent:Sprite, rectangle?:SpriteRectangle, rendering?:SpriteRendering) {
        super(parent, rectangle, rendering || new SpriteImageRendering());
        this.source = source;
    }
}