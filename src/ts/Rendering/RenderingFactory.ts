import {HtmlCanvas} from "./HtmlCanvas";
import {Canvas2DRendering} from "./Canvas2DRendering/Canvas2DRendering";

export class RenderingFactory {

    private readonly canvas2DRendering:Canvas2DRendering;

    public constructor(canvas2DRendering:Canvas2DRendering) {
        this.canvas2DRendering = canvas2DRendering;
    }

    public create(htmlCanvas:HtmlCanvas):Canvas2DRendering {
        if (htmlCanvas.contextDimension === '2d') {
            return this.canvas2DRendering
        }
        throw new Error('canvas context not implemented');
    }
}