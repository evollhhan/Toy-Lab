export default function (r, callback) {
  let theta = Math.PI / 3
  let end = 0 - Math.PI * 3 / 2
  let x, y
  let index = 1
  for (; theta >= end;) {
    x = r * Math.cos(theta)
    y = r * Math.sin(theta)
    callback(x, y, index, theta)
    theta -= Math.PI / 6
    index++
  }
}
