/**
 * sortStrings - sorts array of string by two criteria "asc" or "desc"
 * @param {string[]} arr - the array of strings
 * @param {string} [param="asc"] param - the sorting type "asc" or "desc"
 * @returns {string[]}
 */
export function sortStrings(arr, param = 'asc') {
  
    if (param === 'asc') {
        return compare(arr, 1);
    }

    if (param === 'desc') {
        return compare(arr, -1);
    }

    function compare(arr, num) {
        let arrTmp = [...arr];
        return arrTmp.sort((a, b) => num * a.localeCompare(b, 'ru', {caseFirst: 'upper'}));
    }
}
