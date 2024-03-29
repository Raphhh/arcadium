import {PointInterface} from "./PointInterface";
import {Sprite} from "../Display";

export class Point implements PointInterface {

    public x:number;
    public y:number;

    public constructor(point:PointInterface) {
        this.x = point.x;
        this.y = point.y;
    }

    public add(point:Point):Point {
        return new Point({
            x: this.x + point.x,
            y: this.y + point.y
        })
    }

    public subtract(point:Point):Point {
        return new Point({
            x: this.x - point.x,
            y: this.y - point.y
        })
    }

    public isOver(sprite:Sprite):boolean {
        return sprite.absoluteRectangle.contains(this);
    }
}
