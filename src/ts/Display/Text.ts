import {Sprite} from "./index";
import {SpriteRectangle} from "./Sprite";
import {SpriteTextRendering} from "../Rendering/Canvas2DRendering/SpriteTextRendering";
import {SpriteRendering} from "./Sprite";

export class Text extends Sprite {

    public text:string;
    public direction:CanvasDirection;
    public font:string;
    public textAlign:CanvasTextAlign;
    public textBaseline:CanvasTextBaseline;
    public adjustToWidth:boolean = false;
    public lineHeight = 15;

    constructor(text:string, parent:Sprite, rectangle?:SpriteRectangle, rendering?:SpriteRendering) {
        super(parent, rectangle, rendering || new SpriteTextRendering());
        this.text = text;
    }
}