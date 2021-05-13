const express = require('express');
const dbConfig = require('./configs/db.config');
const morgan = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');
const cookieParser = require('cookie-parser');
var flash = require('connect-flash');
const compression = require('compression');

// Router

const viewRouter = require('./routes/viewRoute');
const sanphamRouter = require('./routes/sanphamRoute');
const detailsanphamRouter = require('./routes/detailsanphamRoute');
const orderRouter = require('./routes/orderRoute');
const cartRouter = require('./routes/cartRoute');
const HoaDonRouter = require('./routes/hoadonRouter');
const KhachHangRouter = require('./routes/khachhangRouter');
const authRoutes = require('./routes/auth.Route.js');
const NhaCungCapRouter = require('./routes/nhacungcapRouter');
const KhoRouter = require('./routes/khoRoute');
const trahangRouter = require('./routes/trahangRouter');
const hoatdongRouter = require('./routes/hoatdongRouter');
const tongquanRouter = require('./routes/tongquan.Router');
const PhieuNhapRouter = require('./routes/phieunhapRouter');
const ThuChiRouter = require('./routes/thuchiRouter');

const app = express();
app.use(express.json());
app.use(compression());
//1) MIDDLEWARE
// Morgan
// if (dbConfig.NODE_ENV === 'development') {
//   app.use(morgan('dev'));
// }

//don't show the log when it is test
// if (process.env.NODE_ENV !== 'test') {
//   //use morgan to log at command line
//   app.use(morgan('combined')); //'combined' outputs the Apache style LOGs
// }

// body-parse
// parse requests of content-type - application/json
app.use(bodyParser.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// Cookie Parse
app.use(cookieParser());

// Session secret
app.use(
  session({
    secret: 'bestsecretsession',
    resave: false,
    saveUninitialized: true,
  })
);
// Connect-Flash Message
app.use(flash());

// Cors
app.use(cors());

// 2) VIEWS / PAGES
app.use(express.static(path.join(__dirname, '/public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
// Path css/js/img/...

// 3) ROUTES
app.use('/auth', authRoutes);
app.use('/', viewRouter);
app.use('/product', sanphamRouter);
app.use('/order', orderRouter);
app.use('/cart', cartRouter);
app.use('/product-detail', detailsanphamRouter);
//<==========================================>
app.use('/admin', HoaDonRouter);
app.use('/admin', KhachHangRouter);
app.use('/admin', NhaCungCapRouter);
app.use('/admin', KhoRouter);
app.use('/admin', trahangRouter);
app.use('/admin', hoatdongRouter);
app.use('/admin', tongquanRouter);
app.use('/admin', PhieuNhapRouter);
app.use('/admin', ThuChiRouter);

// 4)Server
const port = dbConfig.PORT;
app.listen(port, () => {
  console.log(`App connect to ${dbConfig.DB} on host: ${dbConfig.HOST}`);
});

module.exports = app; //for testing
