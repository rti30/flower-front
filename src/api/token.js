const LOCAL_ACCESS_NAME = 'flowerAccess';

function getUserId(access) {
    console.log('зашли token getUserId');
    return getJWTPayload(access);
}

function setTokens(access) {
    console.log('зашли set token');
    let accessData = getJWTPayload(access);
    localStorage.setItem(LOCAL_ACCESS_NAME, access);
    accessData.userName
}

function cleanTokensData() {
    console.log('зашли в cleanTokensData');
    localStorage.removeItem(LOCAL_ACCESS_NAME);
}

function getAccessToken() {
    console.log('зашли get token');
    // null, exp ...
    return localStorage.getItem(LOCAL_ACCESS_NAME);
}


function getJWTPayload(token) {
    console.log('зашли в getJWTPayload');
    return parseJWT(token).payload;
}

function parseJWT(token) {
    console.log('зашли в parseJWT');
    let parts = token.split('.');

    return {
        header: parsePart(parts[0]),
        payload: parsePart(parts[1]),
        sign: parts[2]
    };
}

function parsePart(str) {
    console.log('зашли в parsePart');
    return JSON.parse(atob(str));
}

export { setTokens, cleanTokensData, getJWTPayload, getAccessToken, getUserId }