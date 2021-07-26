import {Sprite} from "./Display/index";
import {Rectangle} from "./Geom/Rectangle";
import {Motion} from "./Core/Motion";
import {HtmlCanvas} from "./Rendering/HtmlCanvas";
import {Services} from "./Global/Services";
import {Canvas2DRendering} from "./Rendering/Canvas2DRendering/Canvas2DRendering";
import {Angle} from "./Geom/Angle";
import {Point} from "./Geom/Point";
import {Transformation} from "./Geom/Transformation";
import {Vector} from "./Geom/Vector";
import {Mouse, MouseEvents} from "./Ui";

export function arca(canvas:HTMLCanvasElement, contextDimension:string = '2d'):Arcadium {
    return new Arcadium(canvas, contextDimension);
}

export class Arcadium {

    public readonly stage:Sprite;
    public isDebugMode= false;
    public readonly services:Services;
    private readonly rendering: Canvas2DRendering;

    public constructor(canvas:HTMLCanvasElement, contextDimension:string = '2d', services?:Services) {
        this.services = services || new Services(new HtmlCanvas(canvas, contextDimension), window);
        this.stage = new Sprite(null, new Rectangle({
            x: 0,
            y: 0,
            width: canvas.width,
            height: canvas.height
        }));
        this.rendering = this.services.renderingFactory.create(this.services.htmlCanvas);
    }

    public display() {
        this.clear();
        this.rendering.renderSprite(
            this.services.htmlCanvas.context,
            this.stage,
            this.isDebugMode
        );
    }

    public clear() {
        this.rendering.clear(
            this.services.htmlCanvas.context,
            this.stage
        );
    }

    public setup(callback:Function): this {
        callback(this);
        this.display();
        return this;
    }

    public loop(callback:Function): Motion {
        this.services.motion.onFrame(() => {
            this.setup(callback);
        });
        this.services.motion.start();
        return this.services.motion;
    }

    public on(eventName:string, callback:Function) {
        this.services.eventListener.on(eventName, callback);
    }

    public get ui(): {mouse:Mouse} {
        return {
            mouse: this.services.mouse
        }
    }
}
