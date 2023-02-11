
import {EventListener} from "../Event/EventListener";
import {MotionState} from "./MotionState";
import {MotionEvents} from "./MotionEvents";

export class Motion {

    private animationFrameProvider:AnimationFrameProvider;
    private eventListener:EventListener;
    private state:MotionState;
    private frame:number;
    private animationId:number = 0;

    constructor(
        animationFrameProvider:AnimationFrameProvider,
        eventListener:EventListener
    ) {
        this.animationFrameProvider = animationFrameProvider;
        this.eventListener = eventListener;
        this.state = MotionState.Stop;
    }

    public isRunning() {
        return this.state === MotionState.Start;
    }

    public onFrame(callback:Function):void {
        this.eventListener.on(MotionEvents.FRAME, callback);
    }

    public start():void {
        this.state = MotionState.Start;
        this.frame = 0;
        this.play();
    }

    public pause():void {
        this.state = MotionState.Pause;
    }

    public stop():void {
        this.state = MotionState.Stop;
        this.animationFrameProvider.cancelAnimationFrame(this.animationId);
    }
    
    private play() {
        //doc https://developer.mozilla.org/fr/docs/Games/Anatomy#construire_une_boucle_principale_encore_plus_optimis%C3%A9e_en_javascript

        this.animationId = this.animationFrameProvider.requestAnimationFrame(() => {
            this.play();
        });
        if (this.isRunning()) {
            ++this.frame;
            this.eventListener.fire(MotionEvents.FRAME, this.frame);
        }
    }
}
