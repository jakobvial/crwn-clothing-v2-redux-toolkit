import {AnyAction} from "redux";

/*
The Matchable-pattern is a pattern that allows us to use type guards with action creators.
It includes use of intersection types, type predicates for type narrowing, and function overloads.
*/
type Matchable<AC extends () => AnyAction> = AC & {
    type: ReturnType<AC>["type"];
    match(action: AnyAction): action is ReturnType<AC>;
}

export function withMatcher<AC extends () => AnyAction & {
    type: string
}>(actionCreator: AC): Matchable<AC>;

export function withMatcher<AC extends (...args: any[]) => AnyAction & {
    type: string
}>(actionCreator: AC): Matchable<AC>;

export function withMatcher(actionCreator: Function) {
    const type = actionCreator().type;
    return Object.assign(actionCreator, {
        type,
        match(action: AnyAction) {
            return action.type === type;
        }
    });
}

/*
ActionWithPayload<T, P> is a generic utility type with two type parameters, T and P. It represents an object with two
properties: type, which is of type T, and payload, which is of type P.
*/
export type ActionWithPayload<T, P> = {
    type: T,
    payload: P
}

/*
Action<T> is a generic utility type with one type parameter, T. It represents an object with one property: type, which
is of type T.
*/
export type Action<T> = {
    type: T
}

/*
-   The following are overload signatures related to implementation signature of the createAction function.
    They are distinguished by their type parameters, by not having a body, and having the same name as the function they
    are related to below.
-   You always want to export the type definitions of your actions and action creators.
-   The two overloads handle different cases:
    a)  The first overload takes two parameters: type of type T, and payload of type P. The constraint T extends string
        ensures that T should be a string or a subtype of a string. This overload returns an object of type
        ActionWithPayload<T, P>.
    b)  The second overload takes two parameters: type of type T, and payload of type void. The constraint T extends string
        remains the same as the first overload. This overload returns an object of type Action<T>.
*/
export function createAction<T extends string, P>(type: T, payload: P): ActionWithPayload<T, P>;

export function createAction<T extends string>(type: T, payload: void): Action<T>

/*The implementation part of the createAction function is a union type of the two overloads.
The implementation of the first overload returns an object with two properties: type and payload.
The implementation of the second overload returns an object with one property: type.
Note that it is distinguished by having a body with a return, but not a return type annotation.
*/
export function createAction<T extends string, P>(type: T, payload: P) {
    return {type, payload};
}