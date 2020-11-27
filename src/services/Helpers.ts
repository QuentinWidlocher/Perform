import { and, isEmpty, isNil, not } from "ramda";

export var isNotNil = <T extends unknown>(val: T): val is T => not(isNil(val))

export var isNotEmpty = (val: any) => not(isEmpty(val))

export var isFilled = <T extends Array<unknown>>(val: T): val is T => isNotNil(val) && isNotEmpty(val)

export var assertExist = <T extends unknown>(o: T, err: string): o is T => { 
    if (isNil(o)) { 
        throw new Error(err) 
    } else { 
        return true 
    } 
}