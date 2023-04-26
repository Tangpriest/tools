const koa = require('koa')
const app = new koa()

app.listen(8080, () => {
	console.log('Server is running on port 8080')
})