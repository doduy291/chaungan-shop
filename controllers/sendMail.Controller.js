const nodemailer = require('nodemailer');
const ejs = require('ejs');

const sendEmail = async (options) => {
  //Tiến hành gửi mail
  const transporter = nodemailer.createTransport({
    // Cấu hình mail server
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: 'chaunganfashionshop@gmail.com', //Tài khoản gmail
      pass: 'chaungan123', //Mật khẩu tài khoản gmail
    },
  });

  // Nhận nội dung gửi mail dạng html
  const mailcontent = await ejs.renderFile(
    __dirname + '/../views/mail/ordermail.ejs',
    { infoBillEmail: options.client }
  );
  const mainOptions = {
    // thiết lập đối tượng, nội dung gửi mail
    from: 'chaunganfashionshop@gmail.com',
    to: options.emailclient,
    subject:
      'Hóa đơn mua hàng tại Châu Ngân Shop #' + options.client.sohoadonclient,
    html: mailcontent,
  };
  // Gửi mail
  await transporter.sendMail(mainOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
};

const sendEmailCancelOrder = async (options) => {
  //Tiến hành gửi mail, nếu có gì đó bạn có thể xử lý trước khi gửi mail
  const transporter = nodemailer.createTransport({
    // config mail server
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: 'chaunganfashionshop@gmail.com', //Tài khoản gmail vừa tạo
      pass: 'chaungan123', //Mật khẩu tài khoản gmail vừa tạo
    },
  });
  const mailcontent = await ejs.renderFile(
    __dirname + '/../views/mail/cfcancelordermail.ejs',
    { mahuydon: options.mahuydon }
  );
  const mainOptions = {
    // thiết lập đối tượng, nội dung gửi mail
    from: 'chaunganfashionshop@gmail.com',
    to: options.emailkh,
    subject: 'Mã hủy đơn hàng #' + options.sohoadonkh,
    html: mailcontent,
  };
  await transporter.sendMail(mainOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
};

const sendEmailResetPassword = async (options) => {
  //Tiến hành gửi mail, nếu có gì đó bạn có thể xử lý trước khi gửi mail
  const transporter = nodemailer.createTransport({
    // config mail server
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: 'chaunganfashionshop@gmail.com', //Tài khoản gmail vừa tạo
      pass: 'chaungan123', //Mật khẩu tài khoản gmail vừa tạo
    },
  });
  const mailcontent = await ejs.renderFile(
    __dirname + '/../views/mail/resetpassmail.ejs',
    { tokenreset: options.tokenreset }
  );
  const mainOptions = {
    // thiết lập đối tượng, nội dung gửi mail
    from: 'chaunganfashionshop@gmail.com',
    to: options.emailreset,
    subject:
      'Lấy lại mật khẩu email ' + options.emailreset + ' tại Châu Ngân Shop.',
    html: mailcontent,
  };
  await transporter.sendMail(mainOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
};
module.exports = { sendEmail, sendEmailCancelOrder, sendEmailResetPassword };
