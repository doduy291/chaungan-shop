const db = require('../server');
const DBkhachhang = db.khachhang;
const Op = db.Sequelize.Op;

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const send = require('../controllers/sendMail.Controller');

exports.signup = (req, res) => {
  // Save User to Database
  var today = new Date();
  DBkhachhang.create({
    tenkhachhang: 'Chưa có tên',
    email: req.body.email.toLowerCase(),
    matkhau: bcrypt.hashSync(req.body.matkhau, 8),
    ngaysinh: today,
    gioitinh: 1,
    role: 'user',
    idloaikhachhang: 1,
    idnguoidung: 1,
  })
    .then((data) => {
      var token = jwt.sign(
        { idkhachhang: data.idkhachhang },
        'superchaungan-secret-key',
        {
          expiresIn: 86400, // 24 hours
        }
      );
      // Save JWT to cookie
      res.cookie('my-token', token);
      res.redirect('/');
    })
    .catch((err) => {
      res.status(500).send({ message: 'Đăng ký không thành công' });
    });
};

exports.signin = async (req, res) => {
  const dataAccount = await DBkhachhang.findOne({
    where: {
      email: req.body.email.toLowerCase(),
    },
  });

  var token = jwt.sign(
    { idkhachhang: dataAccount.idkhachhang },
    'superchaungan-secret-key',
    {
      expiresIn: 86400, // 24 hours
    }
  );
  // Save JWT to cookie
  res.cookie('my-token', token);

  //testing
  // if (dataAccount.role === 'user') {
  //   return res.status(200).json({
  //     message: 'Đăng nhập thành công',
  //     message_role: 'Quyền User',
  //   });
  // } else {
  //   return res.status(200).json({
  //     message: 'Đăng nhập thành công',
  //     message_role: 'Quyền Admin',
  //   });
  // }

  if (dataAccount.role === 'user') {
    res.redirect('/');
  } else {
    res.redirect('/admin/tongquan');
  }
};

exports.logout = (req, res) => {
  res.cookie('my-token', 'loggedout', {
    expires: new Date(Date.now() + 10 * 10),
    httpOnly: true,
  });
  res.redirect('/');
};

const createResetTokenPassword = () => {
  const resetToken = crypto.randomBytes(32).toString('hex');
  crypto.createHash('sha256').update(resetToken).digest('hex');
  return { resetToken };
};
exports.getCodeResetPass = async (req, res) => {
  const emailreset = req.body.email;
  if (emailreset.length > 10) {
    const token = createResetTokenPassword();
    await DBkhachhang.update(
      {
        resetmatkhau: token.resetToken,
      },
      {
        where: { email: req.body.email },
      }
    );
    await send.sendEmailResetPassword({
      tokenreset: token.resetToken,
      emailreset: req.body.email,
    });
    req.flash('message_success', 'Đã gửi mã kích hoạt vào Email');
    res.redirect('/auth/forgot-password');
  } else {
    req.flash('message_err', 'Gửi Email thất bại, vui lòng nhập đúng Email');
    res.redirect('/auth/forgot-password');
  }
};
exports.resetPassword = async (req, res) => {
  const tokenparams = req.params.token;
  const sametokenKH = await DBkhachhang.findOne({
    where: { resetmatkhau: tokenparams },
  });
  if (sametokenKH) {
    res.render('auth/resetPassword', { token: tokenparams });
  } else {
    res.redirect('/auth/forgot-password');
  }
};
exports.updateNewPassword = async (req, res) => {
  const tokenparams = req.params.token;

  await DBkhachhang.update(
    {
      matkhau: bcrypt.hashSync(req.body.newpassword, 8),
      resetmatkhau: '',
    },
    {
      where: { resetmatkhau: tokenparams },
    }
  );
  res.redirect('/auth');
};
