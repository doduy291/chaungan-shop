// process.env.NODE_ENV = 'test';

// let chai = require('chai');
// let chaiHttp = require('chai-http');
// let app = require('../app');
// let should = chai.should();

// chai.use(chaiHttp);

// // TÌM KIẾM HÁO ĐƠN
// describe('Giỏ hàng - Test', () => {
//   beforeEach((done) => {
//     done();
//   });

//   describe('GH2', () => {
//     it('Giỏ hàng - Thêm sản phẩm vào giỏ hàng', (done) => {
//       var spData = {
//         sizesp: 'M',
//         colorsp: 'Trắng',
//         soluong: '1',
//         tensanpham: 'Áo Nike',
//       };
//       chai
//         .request(app)
//         .post('/order/addtocart')
//         .send({ spdata: spData })
//         .end((err, res) => {
//           res.should.have.status(200);
//           res.body.should.be.a('object');
//           res.body.message.should.equal('Thêm sản phẩm thành công');
//           res.body.result.should.equal('redirect');
//           res.body.url.should.equal('/cart');
//           done();
//         });
//     });
//   });

//   describe('GH3', () => {
//     it('Giỏ hàng - Thêm 1 sản phẩm nhiều lần', (done) => {
//       var spData = {
//         sizesp: 'M',
//         colorsp: 'Trắng',
//         soluong: '1',
//         tensanpham: 'Áo Nike',
//       };
//       chai
//         .request(app)
//         .post('/order/addtocart')
//         .send({ spdata: spData })
//         .end((err, res) => {
//           res.should.have.status(200);
//           res.body.should.be.a('object');
//           res.body.message.should.equal('Thêm sản phẩm thành công');
//           res.body.result.should.equal('redirect');
//           res.body.url.should.equal('/cart');
//           done();
//         });
//     });
//   });

//   describe('GH4', () => {
//     it('Giỏ hàng - Thêm nhiều loại sản phẩm khác nhau', (done) => {
//       var spData = {
//         sizesp: 'M',
//         colorsp: 'Nâu',
//         soluong: '1',
//         tensanpham: 'Quần Tây Nam',
//       };
//       chai
//         .request(app)
//         .post('/order/addtocart')
//         .send({ spdata: spData })
//         .end((err, res) => {
//           res.should.have.status(200);
//           res.body.should.be.a('object');
//           res.body.message.should.equal('Thêm sản phẩm thành công');
//           res.body.result.should.equal('redirect');
//           res.body.url.should.equal('/cart');
//           done();
//         });
//     });
//   });

//   describe('GH5', () => {
//     it('Giỏ hàng - Xóa sản phẩm giỏ hàng', (done) => {
//       var idchitiethoadon = '514';
//       chai
//         .request(app)
//         .get('/cart/removePrdCart/' + idchitiethoadon)
//         .end((err, res) => {
//           res.should.have.status(200);
//           res.body.should.be.a('object');
//           res.body.message.should.equal('Xóa sản phẩm thành công');
//           done();
//         });
//     });
//   });
// });
