
export class HtmlCanvas {

    public htmlCanvasElement:HTMLCanvasElement;
    public contextDimension:string;
    public contextOptions?:CanvasRenderingContext2DSettings

    public constructor(
        htmlCanvasElement:HTMLCanvasElement,
        contextDimension:string = '2d',
        contextOptions?:CanvasRenderingContext2DSettings
    ) {
        this.htmlCanvasElement = htmlCanvasElement;
        this.contextDimension = contextDimension;
        this.contextOptions = contextOptions;
    }

    public get context():CanvasRenderingContext2D|null {
        return <CanvasRenderingContext2D>this.htmlCanvasElement.getContext(this.contextDimension, this.contextOptions);
    }
}