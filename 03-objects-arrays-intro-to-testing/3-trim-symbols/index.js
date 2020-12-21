/**
 * trimSymbols - removes consecutive identical symbols if they quantity bigger that size
 * @param {string} string - the initial string
 * @param {number} size - the allowed size of consecutive identical symbols
 * @returns {string} - the new string without extra symbols according passed size
 */
export function trimSymbols(string, size) {
    if(size === 0) {
        return "";
    }
    if(!string || !size) {
        return string;
    }

    let stringAsArray = [...string];
    const uniqCharAsArray = [...new Set(stringAsArray)];

    for(const uniq of uniqCharAsArray) {
        let repeat = uniq.repeat(size);
        let pos = -1;
        if(string.includes(repeat)) {
            while ((pos = string.indexOf(repeat, pos + 1)) != -1) {
                for (let i = pos; i <= ((pos+size)-1); i++) {
                    stringAsArray[i] = `0${ stringAsArray[i]}`;
                    if(i === (pos+size)-1 && stringAsArray[i+1] === uniq) {
                       let count = i+1;
                       while (stringAsArray[count] === uniq) {
                        stringAsArray[count] = `#` ;
                        count++;
                       }
                    }
                }
            }
        }
    }
    
    return [...stringAsArray.join("")].filter(str => str !== "0" && str !== "#").join("");
}
