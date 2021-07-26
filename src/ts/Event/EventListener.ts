
import {EventListenerInterface} from "./EventListenerInterface";

export class EventListener implements EventListenerInterface {

    private callbacks:any = {};

    public on(eventName:string, callback:Function):void {
        if (!(eventName in this.callbacks)) {
            this.callbacks[eventName] = [];
        }
        this.callbacks[eventName].push(callback);
    }

    public fire(eventName:string, data?:any):void {
        if (eventName in this.callbacks) {
            for (let callback of this.callbacks[eventName]) {
                callback(data);
            }
        }
    }
}
