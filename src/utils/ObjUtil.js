
/**
 * 对象操作
 */

import {isArray, isFunction, isObject} from "./TypeUtil";



/**
 * 按照属性名获取属性值，中途遇到方法会直接调用方法, 如最后一个是方法则会直接返回 属性名支持 . 分割
 * @param obj 对象
 * @param field 属性名  如  type.name
 * @returns {*}
 */
export function getObjAttrFun(obj, field){
    // return [obj, ...field.split("\.")].reduce((obj, item, i, arr) => {
    //     let value = obj[item];
    //     if(isFunction(value) && i !== arr.length - 1){
    //         return value();
    //     }
    //     return value;
    // });
}


