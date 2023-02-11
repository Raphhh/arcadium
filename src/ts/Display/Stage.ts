import {Rectangle} from "../Geom";
import {SizeInterface} from "../Geom";
import {Sprite} from "./index";
import {Arcadium} from "../Arcadium";

export class Stage extends Sprite {

    public arcadium:Arcadium;

    public constructor(size:SizeInterface, arcadium:Arcadium) {
        super(null, new Rectangle({
            coordinates: {x: 0, y: 0},
            size: size
        }));
        this.arcadium = arcadium;
    }
}