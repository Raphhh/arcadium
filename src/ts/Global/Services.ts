import {RenderingFactory} from "../Rendering/RenderingFactory";
import {Canvas2DRendering} from "../Rendering/Canvas2DRendering/Canvas2DRendering";
import {BaseSpriteRendering} from "../Rendering/Canvas2DRendering/BaseSpriteRendering";
import {EventListener} from "../Event/EventListener";
import {Motion} from "../Core/Motion";
import {SpriteBoundariesRendering} from "../Rendering/Canvas2DRendering/SpriteBoundariesRendering";
import {Mouse} from "../Ui";
import {HtmlCanvas} from "../Rendering";
import {SpriteBaseShapeRendering} from "../Rendering/Canvas2DRendering/SpriteBaseShapeRendering";
import {SpriteTriangleShapeRendering} from "../Rendering/Canvas2DRendering/SpriteTriangleShapeRendering";
import {SpriteRectangleShapeRendering} from "../Rendering/Canvas2DRendering/SpriteRectangleShapeRendering";
import {SpriteCircleShapeRendering} from "../Rendering/Canvas2DRendering/SpriteCircleShapeRendering";

export class Services {

    public readonly htmlCanvas: HtmlCanvas;

    private services:any = {};
    private readonly animationFrameProvider: AnimationFrameProvider;

    public constructor(canvas:HtmlCanvas, globalObject:AnimationFrameProvider) {
        this.htmlCanvas = canvas;
        this.animationFrameProvider = globalObject;
    }

    private get(serviceId:string, init:Function):any {
        if (!this.services[serviceId]) {
            this.services[serviceId] = init();
        }
        return this.services[serviceId];
    }

    public get renderingFactory():RenderingFactory {
        return this.get('RenderingFactory', () => {
            return new RenderingFactory(
                this.canvas2DRendering
            );
        })
    }

    public get canvas2DRendering():Canvas2DRendering {
        return this.get('Canvas2DRendering', () => {
            return new Canvas2DRendering(
                this.baseSpriteRendering,
                this.spriteBoundariesRendering
            );
        })
    }

    public get baseSpriteRendering():BaseSpriteRendering {
        return this.get('BaseSpriteRendering', () => {
            return new BaseSpriteRendering();
        })
    }

    public get spriteBoundariesRendering():SpriteBoundariesRendering {
        return this.get('SpriteBoundariesRendering', () => {
            return new SpriteBoundariesRendering();
        })
    }

    public get eventListener():EventListener {
        return this.get('EventListener', () => {
            return new EventListener();
        })
    }

    public get motion():Motion {
        return this.get('Motion', () => {
            return new Motion(
                this.animationFrameProvider,
                this.eventListener
            );
        })
    }

    public get mouse(): Mouse {
        return this.get('Mouse', () => {
            return new Mouse(
                this.htmlCanvas.htmlCanvasElement
            );
        })
    }

    public get spriteBaseShapeRendering(): SpriteBaseShapeRendering {
        return this.get('SpriteBaseShapeRendering', () => {
            return new SpriteBaseShapeRendering();
        })
    }

    public get spriteTriangleShapeRendering(): SpriteTriangleShapeRendering {
        return this.get('SpriteTriangleShapeRendering', () => {
            return new SpriteTriangleShapeRendering();
        })
    }

    public get spriteRectangleShapeRendering(): SpriteRectangleShapeRendering {
        return this.get('SpriteRectangleShapeRendering', () => {
            return new SpriteRectangleShapeRendering();
        })
    }

    public get spriteCircleShapeRendering(): SpriteCircleShapeRendering {
        return this.get('SpriteCircleShapeRendering', () => {
            return new SpriteCircleShapeRendering();
        })
    }
}