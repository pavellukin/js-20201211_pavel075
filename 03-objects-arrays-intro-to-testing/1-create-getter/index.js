/**
 * createGetter - creates function getter which allows select value from object
 * @param {string} path - the strings path separated by dot
 * @returns {function} - function-getter which allow get value from object by set path
 */
export function createGetter(path) {
    const pathAsArray = path.split(".");
    let num = 0;
    function search(list = {}) {      
        if(num === pathAsArray.length)  {
            return;
        }

        let item = pathAsArray[num];
        if(!!list[item] && typeof list[item] === "object") {
            num++;
            return search(list[item]);
        }
        if(list[item]) {
            return list[item];
        }
        /*for (const item of pathAsArray) {
            if (!!list[item] && typeof list[item] === "object") {
                return search(list[item]);
            }
            if(list[item]) {
                return list[item];
            }
        }*/

    }

    return search;
}
