// process.env.NODE_ENV = 'test';

// let chai = require('chai');
// let chaiHttp = require('chai-http');
// let app = require('../app');
// let should = chai.should();

// chai.use(chaiHttp);

// // ĐĂNG KÝ
// describe('Đăng ký - Test', () => {
//   beforeEach((done) => {
//     done();
//   });
//   describe('DK3', () => {
//     it('Đăng ký - Không nhập gì', (done) => {
//       let dangky = {
//         email: null,
//         matkhau: null,
//       };
//       chai
//         .request(app)
//         .post('/auth/api/auth/signup')
//         .send(dangky)
//         .end((err, res) => {
//           res.should.have.status(200);
//           res.body.should.be.a('object');
//           should.not.exist(dangky.email);
//           should.not.exist(dangky.matkhau);
//           res.body.message_sql.should.equal('Đăng ký không thành công');
//           done();
//         });
//     });
//     it('Đăng ký - Chỉ nhập 1 trường', (done) => {
//       let dangky = {
//         email: 'doduy291@gmail.com',
//       };
//       chai
//         .request(app)
//         .post('/auth/api/auth/signup')
//         .send(dangky)
//         .end((err, res) => {
//           res.should.have.status(200);
//           res.body.should.be.a('object');
//           res.body.message_sql.should.equal('Đăng ký không thành công');
//           done();
//         });
//     });
//   });
//   describe('DK4', () => {
//     it('Đăng ký - Không nhập Email', (done) => {
//       let dangky = {
//         email: null,
//       };
//       chai
//         .request(app)
//         .post('/auth/api/auth/signup')
//         .send(dangky)
//         .end((err, res) => {
//           res.should.have.status(200);
//           res.body.should.be.a('object');
//           should.not.exist(dangky.email);
//           res.body.message.forEach((errors_msg) => {
//             if (
//               errors_msg.param === 'email' &&
//               errors_msg.msg === 'Không được bỏ trống'
//             ) {
//               errors_msg.msg.should.equal('Không được bỏ trống');
//             }
//           });
//           done();
//         });
//     });
//     it('Đăng ký - Không đúng định dạng Email', (done) => {
//       let dangky = {
//         email: 'aaaa1111',
//       };
//       chai
//         .request(app)
//         .post('/auth/api/auth/signup')
//         .send(dangky)
//         .end((err, res) => {
//           res.should.have.status(200);
//           res.body.should.be.a('object');
//           res.body.message.forEach((errors_msg) => {
//             if (
//               errors_msg.param === 'email' &&
//               errors_msg.msg === 'Không đúng định dạng Email'
//             ) {
//               errors_msg.msg.should.equal('Không đúng định dạng Email');
//             }
//           });

//           done();
//         });
//     });
//     it('Đăng ký - Không chứa ký tự đặc biệt Email', (done) => {
//       let dangky = {
//         email: 'aaaa1111@^%&@gmail.com',
//       };
//       chai
//         .request(app)
//         .post('/auth/api/auth/signup')
//         .send(dangky)
//         .end((err, res) => {
//           res.should.have.status(200);
//           res.body.should.be.a('object');
//           res.body.message.forEach((errors_msg) => {
//             if (
//               errors_msg.param === 'email' &&
//               errors_msg.msg === 'Không đúng định dạng Email'
//             ) {
//               errors_msg.msg.should.equal('Không đúng định dạng Email');
//             }
//           });

//           done();
//         });
//     });
//     it('Đăng ký - Email đã được sử dụng', (done) => {
//       let dangky = {
//         email: 'duydbpk01304@fpt.edu.vn',
//         matkhau: '123456',
//       };
//       chai
//         .request(app)
//         .post('/auth/api/auth/signup')
//         .send(dangky)
//         .end((err, res) => {
//           res.should.have.status(200);
//           res.body.should.be.a('object');
//           res.body.message.forEach((errors_msg) => {
//             if (
//               errors_msg.param === 'email' &&
//               errors_msg.msg === 'Email đã được sử dụng'
//             ) {
//               errors_msg.msg.should.equal('Email đã được sử dụng');
//             }
//           });

//           done();
//         });
//     });

// it('Đăng ký - Email tối đa 40 ký tự', (done) => {
//   let dangky = {
//     email: 'duydbpkvipprobmtttttttttttttttttttttttttttttttttt@fpt.edu.vn',
//   };
//   chai
//     .request(app)
//     .post('/auth/api/auth/signup')
//     .send(dangky)
//     .end((err, res) => {
//       res.should.have.status(200);
//       res.body.should.be.a('object');
//       dangky.email.should.have.length(40);
//       done();
//     });
// });

// it('Đăng ký - Email không phân biệt hoa thường', (done) => {
//   let dangky = {
//     email: 'Duydbpk01304@fpt.edu.vn',
//     matkhau: '123456',
//   };
//   chai
//     .request(app)
//     .post('/auth/api/auth/signup')
//     .send(dangky)
//     .end((err, res) => {
//       res.should.have.status(200);
//       res.body.should.be.a('object');
//       dangky.should.have.property('email');
//       dangky.should.have.property('matkhau');
//       done();
//     });
// });

//   it('Đăng ký - Không chứa Unicode', (done) => {
//     let dangky = {
//       email: 'đỗbáduy@gmail.com',
//     };
//     chai
//       .request(app)
//       .post('/auth/api/auth/signup')
//       .send(dangky)
//       .end((err, res) => {
//         res.should.have.status(200);
//         res.body.should.be.a('object');
//         res.body.message.forEach((errors_msg) => {
//           if (
//             errors_msg.param === 'email' &&
//             errors_msg.msg === 'Không đúng định dạng Email'
//           ) {
//             errors_msg.msg.should.equal('Không đúng định dạng Email');
//           }
//         });
//         done();
//       });
//   });
// });

// describe('DK5', () => {
//   it('Đăng ký - Không nhập mật khẩu', (done) => {
//     let dangky = {
//       email: 'duydbpk01304@fpt.edu.vn',
//       matkhau: null,
//     };
//     chai
//       .request(app)
//       .post('/auth/api/auth/signup')
//       .send(dangky)
//       .end((err, res) => {
//         res.should.have.status(200);
//         res.body.should.be.a('object');
//         should.not.exist(dangky.matkhau);
//         res.body.message.forEach((errors_msg) => {
//           if (
//             errors_msg.param === 'matkhau' &&
//             errors_msg.msg === 'Không được bỏ trống'
//           ) {
//             errors_msg.msg.should.equal('Không được bỏ trống');
//           }
//         });
//         done();
//       });
//   });

//   it('Đăng ký - Mật khẩu chứa số ký tự đặc biệt - phân biệt hoa thường', (done) => {
//     let dangky = {
//       matkhau: 'Duy@123Do',
//     };
//     chai
//       .request(app)
//       .post('/auth/api/auth/signup')
//       .send(dangky)
//       .end((err, res) => {
//         res.should.have.status(200);
//         res.body.should.be.a('object');
//         dangky.should.have.property('matkhau');
//         done();
//       });
//   });

// it('Đăng ký - Mật khẩu tối đa 40 ký tự', (done) => {
//   let dangky = {
//     matkhau: 'duy29120123456aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
//   };
//   chai
//     .request(app)
//     .post('/auth/api/auth/signup')
//     .send(dangky)
//     .end((err, res) => {
//       res.should.have.status(200);
//       res.body.should.be.a('object');
//       dangky.matkhau.should.have.length(40);
//       done();
//     });
// });
// });

// describe('DK6', () => {
// it('Đăng ký - Nhập đủ thông tin, lưu vào database', (done) => {
//   let dangky = {
//     email: 'testsuccess291@gmail.com',
//     matkhau: 'Duy@123Do',
//   };
//   chai
//     .request(app)
//     .post('/auth/api/auth/signup')
//     .send(dangky)
//     .end((err, res) => {
//       res.should.have.status(200);
//       res.body.should.be.a('object');
//       dangky.should.have.property('email');
//       dangky.should.have.property('matkhau');
//       res.body.message.should.equal('Đăng ký thành công');
//       done();
//     });
// });
// });
// });

// // ĐĂNG NHẬP
// describe('Đăng nhập - Test', () => {
//   beforeEach((done) => {
//     done();
//   });
//   describe('DN2', () => {
//     it('Đăng nhập - Không nhập gì', (done) => {
//       let dangnhap = {
//         email: null,
//         matkhau: null,
//       };
//       chai
//         .request(app)
//         .post('/auth/api/auth/signin')
//         .send(dangnhap)
//         .end((err, res) => {
//           res.should.have.status(200);
//           res.body.should.be.a('object');
//           should.not.exist(dangnhap.email);
//           should.not.exist(dangnhap.matkhau);
//           res.body.message_sql.should.equal('Đăng nhập không thành công');
//           done();
//         });
//     });

//     it('Đăng nhập - Nhập đúng Email, trống mật khẩu', (done) => {
//       let dangnhap = {
//         email: 'duydbpk01304@fpt.edu.vn',
//         matkhau: null,
//       };
//       chai
//         .request(app)
//         .post('/auth/api/auth/signin')
//         .send(dangnhap)
//         .end((err, res) => {
//           res.should.have.status(200);
//           res.body.should.be.a('object');
//           should.not.exist(dangnhap.matkhau);
//           res.body.message.forEach((errors_msg) => {
//             if (
//               errors_msg.param === 'matkhau' &&
//               errors_msg.msg === 'Mật khẩu không trùng'
//             ) {
//               errors_msg.msg.should.equal('Mật khẩu không trùng');
//             }
//           });

//           done();
//         });
//     });

//     it('Đăng nhập - Trống Email, nhập mật khẩu', (done) => {
//       let dangnhap = {
//         email: null,
//         matkhau: '1234567',
//       };
//       chai
//         .request(app)
//         .post('/auth/api/auth/signin')
//         .send(dangnhap)
//         .end((err, res) => {
//           res.should.have.status(200);
//           res.body.should.be.a('object');
//           should.not.exist(dangnhap.email);
//           res.body.message.forEach((errors_msg) => {
//             if (
//               errors_msg.param === 'email' &&
//               errors_msg.msg === 'Không được bỏ trống'
//             ) {
//               errors_msg.msg.should.equal('Không được bỏ trống');
//             }
//           });

//           done();
//         });
//     });

//     it('Đăng nhập - Nhập sai Email, nhập sai mật khẩu', (done) => {
//       let dangnhap = {
//         email: 'accountwrong291@gmail.com',
//         matkhau: '1234567',
//       };
//       chai
//         .request(app)
//         .post('/auth/api/auth/signin')
//         .send(dangnhap)
//         .end((err, res) => {
//           res.should.have.status(200);
//           res.body.should.be.a('object');
//           res.body.message.forEach((errors_msg) => {
//             if (
//               errors_msg.param === 'email' &&
//               errors_msg.param === 'matkhau' &&
//               errors_msg.msg === 'Email không tồn tại' &&
//               errors_msg.msg === 'Mật khẩu không trùng'
//             ) {
//               errors_msg.msg.should.equal(
//                 'Email không tồn tại' || 'Mật khẩu không trùng'
//               );
//             }
//           });
//           done();
//         });
//     });

//     it('Đăng nhập - Nhập đúng Email, nhập sai mật khẩu', (done) => {
//       let dangnhap = {
//         email: 'duydbpk01304@fpt.edu.vn',
//         matkhau: '123456789',
//       };
//       chai
//         .request(app)
//         .post('/auth/api/auth/signin')
//         .send(dangnhap)
//         .end((err, res) => {
//           res.should.have.status(200);
//           res.body.should.be.a('object');
//           res.body.message.forEach((errors_msg) => {
//             if (
//               errors_msg.param === 'matkhau' &&
//               errors_msg.msg === 'Mật khẩu không trùng'
//             ) {
//               errors_msg.msg.should.equal('Mật khẩu không trùng');
//             }
//           });
//           done();
//         });
//     });

//     it('Đăng nhập - Nhập sai Email, nhập mật khẩu', (done) => {
//       let dangnhap = {
//         email: 'accountwrong291@gmail.com',
//         matkhau: '1234567',
//       };
//       chai
//         .request(app)
//         .post('/auth/api/auth/signin')
//         .send(dangnhap)
//         .end((err, res) => {
//           res.should.have.status(200);
//           res.body.should.be.a('object');
//           res.body.message.forEach((errors_msg) => {
//             if (
//               errors_msg.param === 'email' &&
//               errors_msg.msg === 'Email không tồn tại'
//             ) {
//               errors_msg.msg.should.equal('Email không tồn tại');
//             }
//           });
//           done();
//         });
//     });

//     it('Đăng nhập - Mật khẩu tối đa 40 ký tự', (done) => {
//       let dangnhap = {
//         matkhau: 'duy29120123456aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
//       };
//       chai
//         .request(app)
//         .post('/auth/api/auth/signup')
//         .send(dangnhap)
//         .end((err, res) => {
//           res.should.have.status(200);
//           res.body.should.be.a('object');
//           dangnhap.matkhau.should.have.length(40);
//           done();
//         });
//     });

//     it('Đăng nhập - Email tối đa 40 ký tự', (done) => {
//       let dangnhap = {
//         email: 'duydbpkvipprobmtttttttttttttttttttttttttttttttttt@fpt.edu.vn',
//       };
//       chai
//         .request(app)
//         .post('/auth/api/auth/signup')
//         .send(dangky)
//         .end((err, res) => {
//           res.should.have.status(200);
//           res.body.should.be.a('object');
//           dangnhap.email.should.have.length(40);
//           done();
//         });
//     });

//     it('Đăng nhập - Email không phân biệt hoa thường', (done) => {
//       let dangnhap = {
//         email: 'Duydbpk01304@fpt.edu.vn',
//         matkhau: '123456',
//       };
//       chai
//         .request(app)
//         .post('/auth/api/auth/signin')
//         .send(dangnhap)
//         .end((err, res) => {
//           res.should.have.status(200);
//           res.body.should.be.a('object');
//           dangnhap.should.have.property('email');
//           dangnhap.should.have.property('matkhau');
//           res.body.message.should.equal('Đăng nhập thành công');
//           done();
//         });
//     });

//     it('Đăng nhập - Không chứa Unicode', (done) => {
//       let dangnhap = {
//         email: 'đỗbáduy@gmail.com',
//         matkhau: '1234567',
//       };
//       chai
//         .request(app)
//         .post('/auth/api/auth/signin')
//         .send(dangnhap)
//         .end((err, res) => {
//           res.should.have.status(200);
//           res.body.should.be.a('object');
//           res.body.message_sql.should.equal('Đăng nhập không thành công');
//           done();
//         });
//     });
//   });

//   describe('DN3', () => {
//     it('Đăng nhập - Email quyền admin', (done) => {
//       let dangnhap = {
//         email: 'duydbpk01304@fpt.edu.vn',
//         matkhau: '123456',
//       };
//       chai
//         .request(app)
//         .post('/auth/api/auth/signin')
//         .send(dangnhap)
//         .end((err, res) => {
//           res.should.have.status(200);
//           res.body.should.be.a('object');
//           dangnhap.should.have.property('email');
//           dangnhap.should.have.property('matkhau');
//           res.body.message.should.equal('Đăng nhập thành công');
//           res.body.message_role.should.equal('Quyền Admin');
//           done();
//         });
//     });

//     it('Đăng nhập - Email quyền user', (done) => {
//       let dangnhap = {
//         email: 'doduy123@gmail.com',
//         matkhau: '123456',
//       };
//       chai
//         .request(app)
//         .post('/auth/api/auth/signin')
//         .send(dangnhap)
//         .end((err, res) => {
//           res.should.have.status(200);
//           res.body.should.be.a('object');
//           dangnhap.should.have.property('email');
//           dangnhap.should.have.property('matkhau');
//           res.body.message.should.equal('Đăng nhập thành công');
//           res.body.message_role.should.equal('Quyền User');
//           done();
//         });
//     });
//   });
// });
