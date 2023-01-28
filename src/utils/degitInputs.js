export function format(input) {
  const persianNumbers = [/۰/g, /۱/g, /۲/g, /۳/g, /۴/g, /۵/g, /۶/g, /۷/g, /۸/g, /۹/g];
  if( typeof(input.value === String)){
    for(var i=0; i<10; i++)
    {
      input.value = input.value.replace(persianNumbers[i], i);
    }
    let nStr = input.value + "";
    nStr = nStr.replace(/,/g, "");
    let x = nStr.split(".");
    let x1 = x[0];
    let x2 = x.length > 1 ? "." + x[1] : "";
    let rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
      x1 = x1.replace(rgx, `$1,$2`); //"$1" + "," + "$2"
    }
    input.value = x1 + x2;
  }
  
}
