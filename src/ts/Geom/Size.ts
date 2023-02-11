import {SizeInterface} from "./SizeInterface";
import {Sprite} from "../Display";

export class Size implements SizeInterface {

    public width:number;
    public height:number;

    public constructor(size:SizeInterface) {
        this.width = size.width;
        this.height = size.height;
    }
}
