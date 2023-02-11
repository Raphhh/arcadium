import {Rectangle} from "../Geom/Rectangle";
import {Angle} from "../Geom/Angle";
import {SpriteRenderingInterface} from "../Rendering/Canvas2DRendering/SpriteRenderingInterface";
import {Shadow} from "./Shadow";
import {Image} from "./index";
import {Text} from "./index";
import {Shape} from "./index";
import {Point} from "../Geom/Point";
import {Transformation} from "../Geom/Transformation";
import {TransformationInterface} from "../Geom/TransformationInterface";
import {PointInterface} from "../Geom/PointInterface";
import {SpriteRenderingFunctionAdapter} from "../Rendering/Canvas2DRendering/SpriteRenderingFunctionAdapter";

enum relativeX {
    left = 'left',
    right = 'right',
    center = 'center',
}

enum relativeY {
    top = 'top',
    bottom = 'bottom',
    center = 'center',
}

export type SpriteRectangle = Rectangle | {x?:number|relativeX, y?:number|relativeY, width?:number|string, height?:number|string};

export type SpriteRendering = SpriteRenderingInterface | ((sprite:Sprite, context:CanvasRenderingContext2D) => void);

export class Sprite {

    public readonly parent:Sprite|null;
    public readonly children:Array<Sprite> = [];
    public readonly rectangle:Rectangle;
    private _rendering:SpriteRenderingInterface|null = null;
    public isVisible:boolean = true;
    public alpha:number = 1;
    public rotation:Angle = new Angle(0);
    private _scale:Point|null = null;
    private _translation:Point|null = null;
    private _transformation:Transformation|null = null;
    public shadow:Shadow|null = null;
    public blendMode:string = ''; //see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/globalCompositeOperation

    public constructor(parent:Sprite|null, rectangle?:SpriteRectangle, rendering?:SpriteRendering) {

        this.rendering = rendering;

        this.parent = parent;
        if (this.parent) {
            this.parent.children.push(this);
        }

        if (!rectangle) {
            if (this.parent && this.parent.rectangle) {
                this.rectangle = this.parent.rectangle
            } else {
                throw new Error('no base rectangle defined');
            }
        } else if (!(rectangle instanceof Rectangle)) {
            this.rectangle = new Rectangle({x: 0, y: 0, width: 0, height: 0});

            if (!this.parent) {
                throw new Error('relative rectangle of sprite needs a parent');
            }

            if (!rectangle.width) {
                this.rectangle.width = this.parent.rectangle.width;

            } else if (typeof rectangle.width === 'string') {
                //todo
                throw new Error('sorry, not implemented');

            } else {
                this.rectangle.width = rectangle.width;
            }

            if (!rectangle.height) {
                this.rectangle.height = this.parent.rectangle.height;

            } else if (typeof rectangle.height === 'string') {
                //todo
                throw new Error('sorry, not implemented');

            } else {
                this.rectangle.height = rectangle.height;
            }

            if (!rectangle.x) {
                this.rectangle.x = 0;

            } else if (typeof rectangle.x === 'string') {
                switch (rectangle.x) {
                    case relativeX.left:
                        this.rectangle.x = 0;
                        break;
                    case relativeX.center:
                        this.rectangle.x = this.parent.rectangle.center.x - (<number>rectangle.width/2);
                        break;
                    case relativeX.right:
                        this.rectangle.x = this.parent.rectangle.right - <number>rectangle.width;
                        break;
                }

            } else {
                this.rectangle.x = rectangle.x;
            }

            if (!rectangle.y) {
                this.rectangle.y = 0;

            } else if (typeof rectangle.y === 'string') {
                switch (rectangle.y) {
                    case 'top':
                        this.rectangle.y = 0;
                        break;
                    case 'center':
                        this.rectangle.y = this.parent.rectangle.center.y - (<number>rectangle.height/2);
                        break;
                    case 'bottom':
                        this.rectangle.y = this.parent.rectangle.bottom - <number>rectangle.height;
                        break;
                }

            } else {
                this.rectangle.y = rectangle.y;
            }

        } else {
            this.rectangle = rectangle;
        }
    }

    public set rendering(rendering:SpriteRendering|null) {
        if (rendering instanceof Function) {
            rendering = new SpriteRenderingFunctionAdapter(rendering);
        }
        this._rendering = rendering;
    }

    public get rendering():SpriteRenderingInterface {
        return this._rendering;
    }

    public get x(): number {
        return this.rectangle.x;
    }

    public set x(x:number) {
        this.rectangle.x = x;
    }

    public get y(): number {
        return this.rectangle.y;
    }

    public set y(y:number) {
        this.rectangle.y = y;
    }

    public get width(): number {
        return this.rectangle.width;
    }

    public set width(width:number) {
        this.rectangle.width = width;
    }

    public get height(): number {
        return this.rectangle.height;
    }

    public set height(height:number) {
        this.rectangle.height = height;
    }

    public get scale():Point|null {
        return this._scale;
    }

    public set scale(scale:PointInterface) {
        this._scale = <Point>scale;
    }

    public get translation():Point|null {
        return this._translation;
    }

    public set translation(translation:PointInterface) {
        this._translation = <Point>translation;
    }

    public get transformation():Transformation|null {
        return this._transformation;
    }

    public set transformation(transformation:TransformationInterface) {
        this._transformation = <Transformation>transformation;
    }

    public get absoluteRectangle():Rectangle {
        if (!this.parent) {
            return new Rectangle(this.rectangle);
        }
        return this.parent.absoluteRectangle.add(this.rectangle);
    }

    public addSprite(rectangle?:SpriteRectangle, rendering?:SpriteRendering):Sprite {
        return new Sprite(this, rectangle, rendering);
    }

    public addImage(image:CanvasImageSource, rectangle?:SpriteRectangle, rendering?:SpriteRendering):Image {
        return new Image(image, this, rectangle, rendering);
    }

    public addText(text:string, rectangle?:SpriteRectangle, rendering?:SpriteRendering):Text {
        return new Text(text, this, rectangle, rendering);
    }

    public addShape(rectangle?:SpriteRectangle, rendering?:SpriteRendering):Shape {
        return new Shape(this, rectangle, rendering);
    }

    public get stage():Sprite {
        if (this.parent) {
            return this.parent.stage;
        }
        return this;
    }
}