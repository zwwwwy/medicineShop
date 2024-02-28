// 参考网址：https://www.nhooo.com/note/qad9y9.html
function json2Form(json) {
 var str = [];
 for (var p in json) {
  str.push(encodeURIComponent(p) + "=" + encodeURIComponent(json[p]));
 }
 return str.join("&");
}
module.exports = {
 json2Form: json2Form,
}