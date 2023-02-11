import {Sprite} from "../Display";
import {MouseEvents} from "./MouseEvents";
import {Point, Vector} from "../Geom";

export class Mouse extends Point {

    private canvas: HTMLCanvasElement;

    public constructor(canvas:HTMLCanvasElement) {
        super({x: null, y: null});
        this.canvas = canvas;
        this.canvas.addEventListener('mousemove', (evt:MouseEvent) => {
            this.x = evt.offsetX;
            this.y = evt.offsetY;
        });
    }

    public on<K extends keyof HTMLElementEventMap>(eventName: K, listener: (this: HTMLCanvasElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions) {
        this.canvas.addEventListener(eventName, listener);
    }

    public track(sprite:Sprite, eventName:MouseEvents, callback:Function) {
        switch (eventName) {
            case MouseEvents.MOUSE_OVER:
                this.onOver(sprite, callback);
                break;
            case MouseEvents.MOUSE_OUT:
                this.onOut(sprite, callback);
                break;
            case MouseEvents.CLICK:
            case MouseEvents.MOUSE_DOWN:
            case MouseEvents.MOUSE_UP:
                this.onClickableEvent(sprite, eventName, callback);
                break;
            default:
                throw new Error('event not managed');
        }
    }

    public unTrack() {
        //todo
    }

    public onOver(sprite:Sprite, callback:Function) {
        this.on('mousemove', (evt:MouseEvent) => {
            if (this.isOver(sprite)) {
                //todo faire un vrai event en arg.
                callback(evt, sprite, MouseEvents.MOUSE_OVER);
            }
        });
    }

    public onOut(sprite:Sprite, callback:Function) {
        this.on('mousemove', (evt:MouseEvent) => {
            if (!this.isOver(sprite)) {
                callback(evt, sprite, MouseEvents.MOUSE_OUT);
            }
        });
    }

    public onClick(sprite:Sprite, callback:Function) {
        this.onClickableEvent(sprite, MouseEvents.CLICK, callback);
    }

    public onDrag(sprite:Sprite, onDrag:Function, onDrop:Function) {
        console.warn('this function is experimental');

        let originalDistance:Vector|null = null;

        this.onClickableEvent(sprite, MouseEvents.MOUSE_UP, () => {
            originalDistance = null;
            onDrop();
        });

        this.onClickableEvent(sprite, MouseEvents.MOUSE_DOWN, () => {
            originalDistance = new Vector(
                new Point(sprite.absoluteRectangle),
                new Point(this)
            );
        });

        this.on('mousemove', (evt:MouseEvent) => {

            if (!originalDistance) {
                return;
            }

            sprite.rectangle.coordinates = sprite.rectangle.coordinates.subtract(originalDistance.subtract(new Vector(
                sprite.absoluteRectangle,
                this
            )));

            onDrag();

        })
    }

    private setCursorAsPoint(sprite:Sprite) {
        this.onOver(sprite, () => {
            this.canvas.style.cursor = 'pointer';
        });
        this.onOut(sprite, () => {
            this.canvas.style.cursor = 'default'
        });
    }

    private onClickableEvent(sprite:Sprite, eventName:MouseEvents, callback:Function) {
        this.setCursorAsPoint(sprite);
        this.on(eventName, (evt:MouseEvent) => {
            if (this.isOver(sprite)) {
                callback(evt, sprite, eventName);
            }
        });
    }
}