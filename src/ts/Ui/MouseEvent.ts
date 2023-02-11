import {Mouse} from "./Mouse";
import {Point} from "../Geom";

export type GlobalMouseEvent = globalThis.MouseEvent;

export class MouseEvent {

    public readonly mouse:Mouse;
    public readonly location:Point;
    public readonly original:GlobalMouseEvent

    public constructor(mouse:Mouse, original:GlobalMouseEvent) {
        this.mouse = mouse;
        this.location = new Point(mouse);
        this.original = original;
    }
}