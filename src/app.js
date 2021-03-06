const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const Koa_Session = require('koa-session');
const koaStatic = require('koa-static')
const path = require('path')
const viewRouter = require('./routes/view')
const userAPIRouter = require('./routes/api/user')
const goodAPIRouter = require('./routes/api/good')
const utilsAPIRouter = require('./routes/api/utils')
const messageAPIRouter = require('./routes/api/message')
const cartAPIRouter = require('./routes/api/cart')
const myBoughtAPIRouter = require('./routes/api/myBought')
const begAPIRouter = require('./routes/api/beg')
const begCartAPIRouter = require('./routes/api/begCart')
const myBegged = require('./routes/api/myBegged')
const errorViewRouter = require('./routes/view/error')
// error handler
onerror(app)

// session 配置
const session_signed_key = ["some secret hurr"]; // 这个是配合signed属性的签名key
const session_config = {
  key: 'koa:sess',
  /**  cookie的key。 (默认是 koa:sess) */
  maxAge: 1 * 60 * 60 * 1000,
  /**  session 过期时间，以毫秒ms为单位计算 。*/
  autoCommit: true,
  /** 自动提交到响应头。(默认是 true) */
  overwrite: true,
  /** 是否允许重写 。(默认是 true) */
  httpOnly: true,
  /** 是否设置HttpOnly，如果在Cookie中设置了"HttpOnly"属性，那么通过程序(JS脚本、Applet等)将无法读取到Cookie信息，这样能有效的防止XSS攻击。  (默认 true) */
  signed: true,
  /** 是否签名。(默认是 true) */
  rolling: true,
  /** 是否每次响应时刷新Session的有效期。(默认是 false) */
  renew: false,
  /** 是否在Session快过期时刷新Session的有效期。(默认是 false) */
};
const session = Koa_Session(session_config, app)
app.keys = session_signed_key;
app.use(session);

// middlewares
app.use(bodyparser({
  enableTypes: ['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(koaStatic(__dirname + '/public'))
app.use(koaStatic(path.join(__dirname, '..', 'uploadFiles')))

app.use(views(__dirname + '/views', {
  extension: 'ejs'
}))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
app.use(userAPIRouter.routes(), userAPIRouter.allowedMethods())
app.use(goodAPIRouter.routes(), goodAPIRouter.allowedMethods())
app.use(viewRouter.routes(), viewRouter.allowedMethods())
app.use(messageAPIRouter.routes(), messageAPIRouter.allowedMethods())
app.use(cartAPIRouter.routes(), cartAPIRouter.allowedMethods())
app.use(myBoughtAPIRouter.routes(), myBoughtAPIRouter.allowedMethods())
app.use(begAPIRouter.routes(), begAPIRouter.allowedMethods())
app.use(begCartAPIRouter.routes(), begCartAPIRouter.allowedMethods())
app.use(myBegged.routes(), myBegged.allowedMethods())
app.use(utilsAPIRouter.routes(), utilsAPIRouter.allowedMethods())
app.use(errorViewRouter.routes(), errorViewRouter.allowedMethods()) // 404 路由注册到最后面
// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});


module.exports = app