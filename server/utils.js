export function requireProperties(obj, props) {
    for (let prop of props) {
        if (! obj.hasOwnProperty(prop)) 
            throw createError(StatusCodes.BAD_REQUEST, `Missing required property '${prop}'`);
    }
}
