
export interface EventListenerInterface {

    on(eventName:string, callback:Function):void;

    fire(eventName:string, data?:any):void;
}
