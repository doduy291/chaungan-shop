// process.env.NODE_ENV = 'test';

// let chai = require('chai');
// let chaiHttp = require('chai-http');
// let app = require('../app');
// let should = chai.should();

// chai.use(chaiHttp);

// // THỐNG KÊ
// describe('Thống kê - Test', () => {
//   beforeEach((done) => {
//     done();
//   });

//   describe('TK3', () => {
//     it('Thống kê tổng quan - Báo cáo thống kê hoạt động bán hàng trong ngày hiện tại', (done) => {
//       chai
//         .request(app)
//         .get('/admin/tongquan')
//         .end((err, res) => {
//           res.should.have.status(200);
//           res.body.should.be.a('object');
//           res.body.message.should.equal(
//             'Hiển thị trang thống kê tổng quan thành công'
//           );
//           res.body.HDchuaduyet.should.include.keys('hoadonchuaduyet');
//           res.body.HDToday.should.include.keys('tongtiendathanhtoanToday');
//           res.body.DonhangToday.should.include.keys('tongsohoadonToday');
//           res.body.SP.should.include.keys('tongsanpham');
//           res.body.Hangkhachtratrongngay.should.include.keys('hangkhachtra');
//           res.body.Khachnotrongngay.should.include.keys('khachnotrongngay');
//           res.body.Donhangweb.should.include.keys('donhangweb');
//           res.body.Donhangshop.should.include.keys('donhangtaishop');
//           done();
//         });
//     });
//     it('Thống kê tổng quan - Báo cáo thống kê hoạt động tháng này và tháng trước', (done) => {
//       chai
//         .request(app)
//         .get('/admin/tongquan')
//         .end((err, res) => {
//           res.should.have.status(200);
//           res.body.should.be.a('object');
//           res.body.message.should.equal(
//             'Hiển thị trang thống kê tổng quan thành công'
//           );
//           res.body.Tongtienthangtruoc.should.include.keys('tongtienthangtruoc');
//           res.body.Tongchithangtruoc.should.include.keys('tongtienthangtruoc');
//           res.body.Khachnothangtruoc.should.include.keys('khachnnothangtruoc');
//           res.body.HDthangtruoc.should.include.keys('hoadonthangtruoc');
//           res.body.HDdathanhtoanthangtruoc.should.include.keys(
//             'hoadondathanhtoanthangtruoc'
//           );
//           res.body.SPbanthangtruoc.should.include.keys('sanphambanthangtruoc');
//           res.body.Trahangthangtruoc.should.include.keys(
//             'hangkhachtrathangtruoc'
//           );
//           res.body.Tienbanhangthang.should.include.keys('tienbanhangthang');
//           res.body.Tongchitrongthang.should.include.keys('tongchitrongthang');
//           res.body.Khachnotrongthang.should.include.keys('khachnotrongthang');
//           res.body.Tongdonhang.should.include.keys('tongdonhang');
//           res.body.Dathanhtoan.should.include.keys('hoadondathanhtoan');
//           res.body.Chuathanhtoan.should.include.keys('hoadonchuathanhtoan');
//           res.body.SPbantrongthang.should.include.keys('sanphambantrongthang');
//           res.body.Trahang.should.include.keys('hangkhachtrathanghientai');

//           done();
//         });
//     });
//     it('Thống kê tổng quan - Báo cáo thống kê thông tin hôm nay', (done) => {
//       chai
//         .request(app)
//         .get('/admin/tongquan')
//         .end((err, res) => {
//           res.should.have.status(200);
//           res.body.should.be.a('object');
//           res.body.message.should.equal(
//             'Hiển thị trang thống kê tổng quan thành công'
//           );
//           res.body.HDToday.should.include.keys('tongtiendathanhtoanToday');
//           res.body.SPbantrongngay.should.include.keys('sanphambantrongngay');
//           res.body.Trahangtrongngay.should.include.keys('trahangtrongngay');
//           res.body.Tonkho.should.include.keys('tongtonkho');
//           res.body.Saphethang.should.include.keys('saphethang');
//           res.body.Hethang.should.include.keys('hethang');
//           res.body.SP.should.include.keys('tongsanpham');
//           res.body.NCC.should.include.keys('soNCC');
//           res.body.LoaiSP.should.include.keys('loaiSP');
//           res.body.KeSP.should.include.keys('keSP');
//           done();
//         });
//     });
//   });

//   describe('TK4', () => {
//     it('Thống kê hóa đơn - Thực hiện lọc hóa đơn', (done) => {
//       let timeselect = 'Thời+gian';
//       let loaihoadon = 1;
//       let first_date = '2020-12-01';
//       let end_date = '2020-12-11';
//       var query =
//         'timeselect=' +
//         timeselect +
//         '&loaihoadon=' +
//         loaihoadon +
//         '&first_date=' +
//         first_date +
//         '&end_date=' +
//         end_date;
//       chai
//         .request(app)
//         .get('/admin/hoadon/search?' + encodeURI(query))

//         .end((err, res) => {
//           res.should.have.status(200);
//           res.body.should.be.a('object');
//           res.body.message.should.equal('Hiển thị lọc hóa đơn thành công');
//           done();
//         });
//     });

//     it('Thống kê - Xem chi tiết hóa đơn', (done) => {
//       let idhoadon = 392;
//       chai
//         .request(app)
//         .get('/admin/hoadon/chitiethoadon/' + idhoadon)

//         .end((err, res) => {
//           res.should.have.status(200);
//           res.body.should.be.a('object');
//           res.body.message.should.equal('Hiển thị chi tiết hóa đơn thành công');
//           res.body.DetailHD[0].should.include.keys(
//             'sohoadon',
//             'khachhang',
//             'nonkhachhang',
//             'tongtien',
//             'diachigiaohang',
//             'loaihoadon',
//             'trangthaihoadon',
//             'hinhthucthanhtoan',
//             'tinhtrang'
//           );
//           done();
//         });
//     });
//   });
//   describe('TK5', () => {
//     it('Thống kê trả hàng - Xem trả hàng', (done) => {
//       chai
//         .request(app)
//         .get('/admin/trahang')
//         .end((err, res) => {
//           res.should.have.status(200);
//           res.body.should.be.a('object');
//           res.body.message.should.equal('Hiển thị trả hàng thành công');
//           done();
//         });
//     });
//   });
//   describe('TK6', () => {
//     it('Thống kê nhập kho - Xem nhập kho', (done) => {
//       chai
//         .request(app)
//         .get('/admin/phieunhap')
//         .end((err, res) => {
//           res.should.have.status(200);
//           res.body.should.be.a('object');
//           res.body.message.should.equal('Hiển thị nhập kho thành công');
//           done();
//         });
//     });
//   });
//   describe('TK7', () => {
//     it('Thống kê tồn kho - Xem tồn kho', (done) => {
//       chai
//         .request(app)
//         .get('/admin/tonkho')
//         .end((err, res) => {
//           res.should.have.status(200);
//           res.body.should.be.a('object');
//           res.body.message.should.equal('Hiển thị tồn kho thành công');
//           done();
//         });
//     });
//   });
// });
