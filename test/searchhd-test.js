// process.env.NODE_ENV = 'test';

// let chai = require('chai');
// let chaiHttp = require('chai-http');
// let app = require('../app');
// let should = chai.should();

// chai.use(chaiHttp);

// // TÌM KIẾM HÁO ĐƠN
// describe('Tìm kiếm hóa đơn - Test', () => {
//   beforeEach((done) => {
//     done();
//   });

//   describe('TKHD2', () => {
//     it('Tìm kiếm hóa đơn - Không nhập gì', (done) => {
//       let sohoadon = null;
//       chai
//         .request(app)
//         .get('/cart/tim-kiem-hd?sohoadon=' + sohoadon)
//         .end((err, res) => {
//           res.should.have.status(200);
//           res.body.should.be.a('object');
//           should.not.exist(sohoadon);
//           res.body.message.should.equal('Không có đơn hàng');
//           done();
//         });
//     });
//     it('Tìm kiếm hóa đơn - Không nhập gì', (done) => {
//       let sohoadon = 'HD1223423423434';
//       chai
//         .request(app)
//         .get('/cart/tim-kiem-hd?sohoadon=' + sohoadon)
//         .end((err, res) => {
//           res.should.have.status(200);
//           res.body.should.be.a('object');
//           res.body.message.should.equal('Không có đơn hàng');
//           done();
//         });
//     });
//     it('Tìm kiếm hóa đơn - Nhập đúng mã hóa đơn', (done) => {
//       let sohoadon = 'HD20201209220150';
//       chai
//         .request(app)
//         .get('/cart/tim-kiem-hd?sohoadon=' + sohoadon)
//         .end((err, res) => {
//           res.should.have.status(200);
//           res.body.should.be.a('object');
//           res.body.message.should.equal('Hiển thị đơn hàng thành công');
//           res.body.searchHD[0].should.include.keys(
//             'sohoadon',
//             'ngaytaohoadon',
//             'tinhtrang',
//             'hinhthucthanhtoan',
//             'trangthaihoadon',
//             'nonkhachhang',
//             'khachhang'
//           );
//           done();
//         });
//     });
//   });
// });
