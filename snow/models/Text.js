export default function (text, opt) {
  // default
  opt = opt || {}
  opt.w = opt.w || 32
  opt.h = opt.h || 32
  opt.font = opt.font || '14px Arial'
  opt.color = opt.color || '#ffffff'

  let cvs = document.createElement('canvas')
  cvs.width = opt.w
  cvs.height = opt.h
  let ctx = cvs.getContext('2d')
  ctx.font = opt.font
  ctx.fillStyle = opt.color
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillText(text, opt.w / 2, opt.h / 2)
  return cvs
}
