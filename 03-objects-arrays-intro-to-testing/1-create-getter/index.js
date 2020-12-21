/**
 * createGetter - creates function getter which allows select value from object
 * @param {string} path - the strings path separated by dot
 * @returns {function} - function-getter which allow get value from object by set path
 */
export function createGetter(path) {
    const pathAsArray = path.split(".");
    function search(list = {}) {
        
        for (const item of pathAsArray) {
            if (!!list[item] && typeof list[item] === "object") {
                return search(list[item]);
            }
            if(list[item]) {
                return list[item];
            }
        }
    }

    return search;
}
