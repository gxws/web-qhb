require('babel-core/register')//使用babel加载运行模块
import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import config from './webpack.dev.config'

var app = new (require('express'))()
var port = 3002

var compiler = webpack(config)
app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }))
app.use(webpackHotMiddleware(compiler))

app.get("/", (req, res) => {
  res.sendFile(__dirname + '/_index.html')
})
app.get("/01_HD", (req, res) => {
  res.sendFile(__dirname + '/html/01_HD.html')
})
app.get("/02_HD", (req, res) => {
  res.sendFile(__dirname + '/html/02_HD.html')
})
app.get("/03_HD", (req, res) => {
  res.sendFile(__dirname + '/html/03_HD.html')
})
app.get("/04_HD", (req, res) => {
  res.sendFile(__dirname + '/html/04_HD.html')
})
app.get("/05_HD", (req, res) => {
  res.sendFile(__dirname + '/html/05_HD.html')
})
app.get("/06_HD", (req, res) => {
  res.sendFile(__dirname + '/html/06_HD.html')
})
app.get("/07_HD", (req, res) => {
  res.sendFile(__dirname + '/html/07_HD.html')
})
app.get("/08_HD", (req, res) => {
  res.sendFile(__dirname + '/html/08_HD.html')
})
app.get("/09_HD", (req, res) => {
  res.sendFile(__dirname + '/html/09_HD.html')
})
app.get("/10_HD", (req, res) => {
  res.sendFile(__dirname + '/html/10_HD.html')
})
app.get("/ajax", (req, res) => {
  res.sendFile(__dirname + '/static/js/ajax.json')
})
app.listen(port, error => {
  if (error) {
    console.error(error)
  } else {
    console.info("==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.", port, port)
  }
})
