export default function getNextActiveElement(doms, options) {
    const { allowReadOnly } = options;
    let effectiveDomObj = {}, minTabIndexDom, nextActiveDom;
    for (let i = 0; i < doms.length; i++) {
        let item = doms[i];
        let { tabIndex, disabled, readOnly } = item;
        if (tabIndex < 0) continue;
        if (disabled === true) continue;
        if (allowReadOnly === false && readOnly === true) continue;
        if (!effectiveDomObj[tabIndex]) effectiveDomObj[tabIndex] = [];
        effectiveDomObj[tabIndex].push(item);
        if (!minTabIndexDom) minTabIndexDom = item;
        if (tabIndex === 0) continue;
        if (tabIndex < minTabIndexDom.tabIndex || minTabIndexDom.tabIndex === 0) minTabIndexDom = item;
    }
    let effectiveDomObjKeys = Object.keys(effectiveDomObj).sort(sort), effectiveDomObjKeysLength = effectiveDomObjKeys.length;
    if (effectiveDomObjKeysLength > 0) {
        let isFind = false;//can find the activeElement or not
        for (let i = 0; i < effectiveDomObjKeysLength; i++) {
            let doms = effectiveDomObj[effectiveDomObjKeys[i]];
            for (let j = 0; j < doms.length; j++) {
                let dom = doms[j];
                if (dom === document.activeElement) {//find the activeElement
                    if (j === doms.length - 1) { //the last dom of the array
                        if (effectiveDomObj[effectiveDomObjKeys[i + 1]]) {
                            nextActiveDom = effectiveDomObj[effectiveDomObjKeys[i + 1]][0];
                            isFind = true;
                            break;
                        }
                    } else {
                        nextActiveDom = effectiveDomObj[effectiveDomObjKeys[i]][j + 1];
                        isFind = true;
                        break;
                    }
                }
            }
        }
        return isFind ? nextActiveDom : minTabIndexDom;
    }
    return nextActiveDom;
}

function sort(a, b) {
    let numA = parseFloat(a), numB = parseFloat(b);
    if (numA === 0) return 1;
    if (numB === 0) return -1;
    return numA - numB;
}