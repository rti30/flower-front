
let deleteMathMedia = (media, value) => {
    let mediaQuery = `(${media}: ${value}px)`
    let mql = window.matchMedia(mediaQuery);
    mql.removeEventListener("change", addListener)
}
let addMathMedia = (media, value) => {
    let mediaQuery = `(${media}: ${value}px)`
    let mql = window.matchMedia(mediaQuery);
    mql.addEventListener("change", addListener)
    return mql;
    if (mql.matches) {
        return value;
    }
}
function mediaQuery(media, array, op) {
    if (op === 'add') {
        array.forEach(el => {
            addMathMedia(media, el)
        });
    }
    else if (op === 'delete') {
        array.forEach(el => {
            deleteMathMedia(media, el)
        });
    }
}
function addListener(e) {
    return e;
    if (e.matches) {

        return e.media.replace(/[^0-9\.]+/g, "");
    }
}

export { mediaQuery };

//import * as mediaQuery from './mediaQuery';
//mediaQuery('min-width', array, 'add')