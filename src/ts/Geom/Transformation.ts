import {TransformationInterface} from "./TransformationInterface";

export class Transformation implements TransformationInterface {

    public a:number;
    public b:number;
    public c:number;
    public d:number;
    public e:number;
    public f:number;

    public constructor(a:number, b:number, c:number, d:number, e:number, f:number) {
        this.a = a;
        this.b = b;
        this.c = c;
        this.d = d;
        this.e = e;
        this.f = f;
    }
}
