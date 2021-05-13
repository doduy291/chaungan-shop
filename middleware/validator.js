const { check, oneOf } = require('express-validator');
const db = require('../server');
const DBkhachhang = db.khachhang;
const DBsanpham = db.sanpham;
const DBmausanpham = db.mausanpham;
const DBsizesanpham = db.sizesanpham;
var bcrypt = require('bcryptjs');

let validateSignIn = () => {
  return [
    check('email', 'Không được bỏ trống').not().isEmpty(),
    check('email', 'Không đúng định dạng Email').isEmail(),
    check('email').custom((email) => {
      return DBkhachhang.findOne({
        where: { email: email.toLowerCase() },
      }).then((checkExistEmail) => {
        if (!checkExistEmail) {
          return Promise.reject('Email không tồn tại');
        }
      });
    }),
    check('matkhau', 'Không được bỏ trống').not().isEmpty(),
    check('matkhau').custom((pass, { req }) => {
      const email = req.body.email;
      return DBkhachhang.findOne({
        where: {
          email: email,
        },
      }).then((checkExistPass) => {
        if (checkExistPass !== null) {
          var passwordIsValid = bcrypt.compareSync(
            pass,
            checkExistPass.matkhau
          );
          if (!passwordIsValid) {
            return Promise.reject('Mật khẩu không trùng');
          }
        } else {
          return Promise.reject('Mật khẩu không trùng');
        }
      });
    }),
  ];
};

let validateSignUp = () => {
  return [
    check('email', 'Không được bỏ trống').not().isEmpty(),
    check('email', 'Không đúng định dạng Email').isEmail(),
    check('email').custom((email) => {
      return DBkhachhang.findOne({
        where: { email: email.toLowerCase() },
      }).then((checkExistEmail) => {
        if (checkExistEmail) {
          return Promise.reject('Email đã được sử dụng');
        }
      });
    }),
    check('matkhau', 'Mật khẩu phải lớn hơn 6 ký tự').isLength({
      min: 6,
    }),
    check('matkhau', 'Không được bỏ trống').not().isEmpty(),
  ];
};

let validateCheckout = () => {
  return [
    check('hovaten', 'Không được bỏ trống').not().isEmpty(),
    check('hovaten', 'Họ tên không có ký tự đặc biệt').matches(
      /^([a-zA-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s])+$/
    ),
    check('tinhthanh', 'Không được bỏ trống').not().isEmpty(),
    check('quanhuyen', 'Không được bỏ trống').not().isEmpty(),
    check('diachi', 'Không được bỏ trống').not().isEmpty(),
    check('email', 'Không được bỏ trống').not().isEmpty(),
    check('email', 'Không đúng định dạng Email').isEmail(),
    check('phone', 'Không được bỏ trống').not().isEmpty(),
    check('phone', 'Không đúng định dạng số điện thoại').matches(
      /(09|03|07|08|05)+([0-9]{8})/
    ),
    check('rbpay', 'Vui lòng chọn phương pháp thanh toán').not().isEmpty(),
  ];
};

let validateAddToCart = () => {
  return [
    check('spdata.sizesp', 'Hãy chọn size sản phẩm').not().isEmpty(),
    check('spdata.colorsp', 'Hãy chọn màu sản phẩm').not().isEmpty(),
    check('spdata.soluong').custom((soluong, { req }) => {
      const spdata = req.body.spdata;
      if (spdata.colorsp !== undefined) {
        return DBsanpham.findOne({
          where: {
            tensanpham: spdata.tensanpham,
          },
          include: [
            {
              model: DBmausanpham,
              attributes: ['idmausanpham', 'tenmausanpham'],
              where: { tenmausanpham: spdata.colorsp },
            },
            {
              model: DBsizesanpham,
              attributes: ['idsize', 'tensize'],
              where: { tensize: spdata.sizesp },
            },
          ],
          raw: true,
          nest: true,
        }).then((checkTonKho) => {
          if (checkTonKho !== null) {
            if (checkTonKho.tonkho < soluong) {
              return Promise.reject(
                'Hàng tồn kho size ' +
                  spdata.sizesp +
                  ' - màu ' +
                  spdata.colorsp +
                  ' chỉ còn ' +
                  checkTonKho.tonkho +
                  ' sản phẩm'
              );
            }
          } else {
            return Promise.reject(
              `Sản phẩm size ${spdata.sizesp} - màu ${spdata.colorsp} đã hết hàng!`
            );
          }
        });
      }
    }),
  ];
};
module.exports = {
  validateSignIn,
  validateSignUp,
  validateCheckout,
  validateAddToCart,
};
