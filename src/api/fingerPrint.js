import Fingerprint2 from 'fingerprintjs2';
let result;
let userInfo;
function getFP() {
    return new Promise(resolve => {
        let pr = () => Fingerprint2.get({}, resolve)
        if (window.requestIdleCallback) {
            requestIdleCallback(pr);
        }
        else {
            setTimeout(pr, 5000);
        }
    });
}
result = getFP().then(components => {
    userInfo = components[0].value;
    return components.splice(0, 1);
})
    .then(components => {
        return components.map(component => component.value).join('')
    })
    .then(Fingerprint2.x64hash128)
    .then((hash) => {
        return {
            deviceId: hash,
            userInfo
        }
    });
export default result


