// process.env.NODE_ENV = 'test';

// let chai = require('chai');
// let chaiHttp = require('chai-http');
// let app = require('../app');
// let should = chai.should();

// chai.use(chaiHttp);

// // DETAIL SANPHAM
// describe('Chi tiết sản phẩm - Test', () => {
//   beforeEach((done) => {
//     done();
//   });

//   describe('CTSP2', () => {
//     it('Chi tiết sản phẩm /GET/:tensanpham - Hiển thị trang chi tiết sản phẩm', (done) => {
//       let tensanpham = 'Áo%20Nike';
//       chai
//         .request(app)
//         .get('/product-detail/' + tensanpham)
//         .end((err, res) => {
//           should.not.exist(err);
//           res.should.have.status(200);
//           res.body.should.be.a('object');
//           res.body.message.should.equal(
//             'Hiển thị trang chi tiết sản phẩm thành công'
//           );
//           res.body.dataProductDetail[0].should.include.keys(
//             'idsanpham',
//             'tensanpham',
//             'masanpham',
//             'motasanpham',
//             'giabanle',
//             'khoiluong',
//             'tonkho',
//             'idloaisanpham',
//             'idhangsanpham',
//             'anhsanpham',
//             'idsizesanpham',
//             'idmausanpham'
//           );
//           res.body.dataProductDetailColor[0].should.include.keys(
//             'tensanpham',
//             'idmausanpham',
//             'mausanpham'
//           );
//           res.body.dataProductDetailSize[0].should.include.keys(
//             'tensanpham',
//             'idsizesanpham',
//             'sizesanpham'
//           );
//           done();
//         });
//     });
//   });
// });
