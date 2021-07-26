export class Angle {

    private value:number = 0;

    public constructor(degrees:number) {
        this.degrees = degrees;
    }

    get degrees(): number {
        return this.value;
    }
    set degrees(degrees: number) {
        this.value = degrees;
    }

    public get radians():number {
        return this.degrees * (Math.PI/180);
    }

    public set radians(radians:number) {
        this.degrees = radians * (180/Math.PI);
    }

    public add(angle:Angle) {
        this.degrees += angle.degrees;
    }

    public subtract(angle:Angle) {
        this.degrees -= angle.degrees;
    }
}