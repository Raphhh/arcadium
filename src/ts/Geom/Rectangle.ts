
import {Point} from "./Point";
import {Vector} from "./Vector";
import {PointInterface} from "./PointInterface";
import {RectangleInterface} from "./RectangleInterface";

export class Rectangle implements RectangleInterface {

    private _coordinates:Point;
    private _size:Point;

    public constructor(rectangle:RectangleInterface);
    public constructor(rectangle:{coordinates:PointInterface, size:PointInterface});
    constructor(rectangle:any) {

        if (rectangle.coordinates) {
            this.coordinates = rectangle.coordinates;
        } else {
            this.coordinates = {
                x: rectangle.x,
                y: rectangle.y
            };
        }

        if (rectangle.size) {
            this.size = rectangle.size;
        } else {
            this.size = {
                x: rectangle.width,
                y: rectangle.height
            };
        }
    }

    public get coordinates():Point {
        return this._coordinates;
    }

    public set coordinates(coordinates:PointInterface) {
        this._coordinates = new Point(coordinates);
    }

    public get size():Point {
        return this._size;
    }

    public set size(size:PointInterface) {
        this._size = new Point(size);
    }

    public get x():number {
        return this.coordinates.x;
    }

    public get y():number {
        return this.coordinates.y;
    }

    public get width():number {
        return this.size.x;
    }

    public get height():number {
        return this.size.y;
    }

    public set x(x:number) {
        this.coordinates.x = x;
    }

    public set y(y:number) {
        this.coordinates.y = y;
    }

    public set width(width:number) {
        this.size.x = width;
    }

    public set height(height:number) {
        this.size.y = height;
    }

    public get left():number {
        return this.x;
    }

    public get right():number {
        return this.x + this.width;
    }

    public get top():number {
        return this.y;
    }

    public get bottom():number {
        return this.y + this.height;
    }

    public get topLeft():Point {
        return new Point({
            x: this.left,
            y: this.top
        });
    }

    public get topRight():Point {
        return new Point({
            x: this.right,
            y: this.top
        });
    }

    public get bottomLeft():Point {
        return new Point({
            x: this.left,
            y: this.bottom
        });
    }

    public get bottomRight():Point {
        return new Point({
            x: this.right,
            y: this.bottom
        });
    }

    public get center():Point {
        return new Point({
                x: this.x + (this.width / 2),
                y: this.y + (this.height / 2)
            });
    }

    public add(rect:RectangleInterface):Rectangle {
        const rectangle:Rectangle = new Rectangle(rect);
        return new Rectangle({
                coordinates: this.coordinates.add(rectangle.coordinates),
                size: this.size.add(rectangle.size),
            }
        )
    }

    public contains(point:PointInterface):boolean {
        if (point.x < this.left) {
            return false;
        }

        if (point.x > this.right) {
            return false;
        }

        if (point.y < this.top) {
            return false;
        }

        if (point.y > this.bottom) {
            return false;
        }

        return true;
    }

    public calculateAverageDistance(rect:RectangleInterface):Vector {
        const rectangle:Rectangle = new Rectangle(rect);
        return new Vector(
            this.center,
            rectangle.center
        )
    }

    public calculateIntersection(toIntersect:RectangleInterface):Rectangle|null {
        const rectangle:Rectangle = new Rectangle(toIntersect);

        let topLeft:Point|null = this.calculateIntersectionTopLeft(rectangle);
        if (!topLeft) {
            return null;
        }

        let topRight:Point|null = this.calculateIntersectionTopRight(rectangle);
        if (!topLeft) {
            return null;
        }

        let bottomLeft:Point|null = this.calculateIntersectionBottomLeft(rectangle);
        if (!topLeft) {
            return null;
        }

        function fromAngle(topLeft: Point, topRight: Point, bottomLeft: Point) {
            if (topLeft.y != topRight.y || topLeft.x != bottomLeft.x) {
                throw new Error('rectangle coordinates not valid');
            }
            return new Rectangle({
                x: topLeft.x,
                y: topLeft.y,
                width: topRight.x - topLeft.x,
                height: bottomLeft.y - topLeft.y
            });
        }

        return fromAngle(topLeft, topRight, bottomLeft)
    }

    private calculateIntersectionTopLeft(rectangle:Rectangle):Point|null {
        if (this.contains(rectangle.topLeft)) {
            return rectangle.topLeft;
        }
        if(rectangle.contains(this.topLeft)) {
            return this.topLeft;
        }
        return null;
    }

    private calculateIntersectionTopRight(rectangle:Rectangle):Point|null {
        if (this.contains(rectangle.topRight)) {
            return rectangle.topRight;
        }
        if(rectangle.contains(this.topRight)) {
            return this.topRight;
        }
        return null;
    }

    private calculateIntersectionBottomLeft(rectangle:Rectangle):Point|null {
        if (this.contains(rectangle.bottomLeft)) {
            return rectangle.bottomLeft;
        }
        if(rectangle.contains(this.bottomLeft)) {
            return this.bottomLeft;
        }
        return null;
    }
}
