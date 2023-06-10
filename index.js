const express = require('express')
const app = express()
const morgan = require('morgan')
const port = 3000
const livereload = require("livereload");
const connectLiveReload = require("connect-livereload");
const path = require('path')

const liveReloadServer = livereload.createServer();
liveReloadServer.watch(path.join(__dirname, "public"));
liveReloadServer.server.once("connection", () => {
    setTimeout(() => {
        liveReloadServer.refresh("/");
    }, 100);
});
app.use(connectLiveReload());

app.use(express.urlencoded({ extended: true }))
app.set('view engine', 'ejs')
app.use(express.static("public"));
app.use(morgan('dev'))

app.use('/', require('./src/routes/Index'))
app.use('/auth', require('./src/routes/Auth'))

app.use((req, res, next) => {
    res.status(404).render('404');
});

app.listen(port, () => {
    console.log(`app listening on port ${port}`)
})

