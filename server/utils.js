export function requireProperties(obj, props) {
    for (let prop of props) {
        if (! obj.hasOwnProperty(prop)) 
            throw createError(StatusCodes.BAD_REQUEST, `Missing required property '${prop}'`);
    }
}

export function noOtherPropertiesThan(obj, props) {
    const propsSet = new Set(props);
    Object.keys(obj).forEach( prop => {
        if (! propsSet.has(prop))
            throw createError(StatusCodes.BAD_REQUEST, `Unknown property '${prop}'`);
    });
}
