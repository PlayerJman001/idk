const canvas = document.getElementById("ACanvas");
const ctx = canvas.getContext("2d");

ctx.beginpath();
ctx.rect(20, 40, 50, 50);
ctx.fillstyle = "red";
ctx.fill;
ctx.closePath()