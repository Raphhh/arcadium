import {Sprite} from "./index";

export class Shape extends Sprite {
    public lineCap:CanvasLineCap = 'butt';
    public lineDashOffset:number = 0.0;
    public lineJoin:CanvasLineJoin = 'miter';
    public lineWidth:number = 1;
    public miterLimit:number = 10.0;
    public lineDash:number[] = [];
    public fillStyle: string | CanvasGradient | CanvasPattern;
    public strokeStyle: string | CanvasGradient | CanvasPattern;
}