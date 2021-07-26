import {Point} from "./Point";
import {PointInterface} from "./PointInterface";

export class Vector {

    public a:Point;
    public b:Point;

    public constructor(a:PointInterface, b:PointInterface) {
        this.a = <Point>a;
        this.b = <Point>b;
    }

    public get length(): number {
        return Math.sqrt(
            Math.pow(this.b.x - this.a.x, 2)
            + Math.pow(this.b.y - this.a.y, 2)
        )
    }

    public toPoint():Point {
        return new Point({
            x: this.b.x - this.a.x,
            y: this.b.y - this.a.y,
        });
    }

    public add(vector:Vector):Point {
        return this.toPoint().add(vector.toPoint());
    }

    public subtract(vector:Vector):Point {
        return this.toPoint().subtract(vector.toPoint());
    }
}