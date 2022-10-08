export default {
  rand(min, max) {
    if (min > max) {
      var mid = min;
      min = max;
      max = mid;
    }
    //65<=Math.random()*26+65<26+65
    return parseInt(Math.random() * (max - min + 1) + min);
  },
  intToChinese(num) {
    // if (!/^(0|[1-9]\d*)(\.\d+)?$/.test(n)) {
    //   return "数据非法"; //判断数据是否大于0
    // }
    // let unit = "千百拾亿千百拾万千百拾点  ",
    //   str = "";
    // n += "00";
    // let indexpoint = n.indexOf("."); // 如果是小数，截取小数点前面的位数
    // if (indexpoint >= 0) {
    //   n = n.substring(0, indexpoint) + n.substr(indexpoint + 1, 2); // 若为小数，截取需要使用的unit单位
    // }
    // unit = unit.substr(unit.length - n.length); // 若为整数，截取需要使用的unit单位
    // for (let i = 0; i < n.length; i++) {
    //   str += "零壹贰叁肆伍陆柒捌玖".charAt(n.charAt(i)) + unit.charAt(i); //遍历转化为大写的数字
    // }

    // return str
    //   .replace(/零(千|百|拾|角)/g, "零")
    //   .replace(/(零)+/g, "零")
    //   .replace(/零(万|亿|元)/g, "$1")
    //   .replace(/(亿)万|壹(拾)/g, "$1$2")
    //   .replace(/^元零?|零分/g, "")
    //   .replace(/\s*/g, ""); // 替换掉数字里面的空字符，得到结果
    if (!/^\d*(\.\d*)?$/.test(num)) {
      // alert("Number is wrong!");
      return "Number is wrong!";
    }
    let AA = new Array("零", "壹", "贰", "叁", "肆", "伍", "陆", "柒", "捌", "玖");
    let BB = new Array("", "拾", "佰", "千", "万", "亿", "点", "");
    let a = ("" + num).replace(/(^0*)/g, "").split("."),
      k = 0,
      re = "";
    for (let i = a[0].length - 1; i >= 0; i--) {
      switch (k) {
        case 0:
          re = BB[7] + re;
          break;
        case 4:
          if (!new RegExp("0{4}\\d{" + (a[0].length - i - 1) + "}$").test(a[0]))
            re = BB[4] + re;
          break;
        case 8:
          re = BB[5] + re;
          BB[7] = BB[5];
          k = 0;
          break;
      }
      if (k % 4 == 2 && a[0].charAt(i + 2) != 0 && a[0].charAt(i + 1) == 0) re = AA[0] + re;
      if (a[0].charAt(i) != 0) re = AA[a[0].charAt(i)] + BB[k % 4] + re;
      k++;
    }
    if (a.length > 1){ //加上小数部分(如果有小数部分) 
      re += BB[6];
      for (let i = 0; i < a[1].length; i++) re += AA[a[1].charAt(i)];
    }
    return re;
  },
}
