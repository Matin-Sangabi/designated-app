export function format(input) {
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
