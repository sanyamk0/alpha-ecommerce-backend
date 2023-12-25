const passport = require("passport");
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: "sanyamkumar002@gmail.com",
    pass: process.env.MAIL_PASSWORD,
  },
});

exports.isAuth = (req, res, done) => {
  return passport.authenticate("jwt");
};

exports.sanitizeUser = (user) => {
  return { id: user.id, role: user.role };
};

exports.cookieExtractor = function (req) {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies["jwt"];
  }
  return token;
};

exports.sendMail = async function ({ to, subject, text, html }) {
  const info = await transporter.sendMail({
    from: '"Alpha" <sanyamkumar002@gmail.com>',
    to: to,
    subject,
    text,
    html,
  });
  return info;
};

exports.invoiceTemplate = function (order) {
  return `<!DOCTYPE html>
  <html>
    <head>
      <meta charset="utf-8" />
      <meta http-equiv="x-ua-compatible" content="ie=edge" />
      <title>Email Receipt</title>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <style type="text/css">
        @media screen {
          @font-face {
            font-family: "Source Sans Pro";
            font-style: normal;
            font-weight: 400;
            src: local("Source Sans Pro Regular"), local("SourceSansPro-Regular"),
              url(https://fonts.gstatic.com/s/sourcesanspro/v10/ODelI1aHBYDBqgeIAH2zlBM0YzuT7MdOe03otPbuUS0.woff)
                format("woff");
          }
          @font-face {
            font-family: "Source Sans Pro";
            font-style: normal;
            font-weight: 700;
            src: local("Source Sans Pro Bold"), local("SourceSansPro-Bold"),
              url(https://fonts.gstatic.com/s/sourcesanspro/v10/toadOcfmlt9b38dHJxOBGFkQc6VGVFSmCnC_l7QZG60.woff)
                format("woff");
          }
        }
        body,
        table,
        td,
        a {
          -ms-text-size-adjust: 100%; /* 1 */
          -webkit-text-size-adjust: 100%; /* 2 */
        }
        table,
        td {
          mso-table-rspace: 0pt;
          mso-table-lspace: 0pt;
        }
        img {
          -ms-interpolation-mode: bicubic;
        }
        a[x-apple-data-detectors] {
          font-family: inherit !important;
          font-size: inherit !important;
          font-weight: inherit !important;
          line-height: inherit !important;
          color: inherit !important;
          text-decoration: none !important;
        }
        div[style*="margin: 16px 0;"] {
          margin: 0 !important;
        }
        body {
          width: 100% !important;
          height: 100% !important;
          padding: 0 !important;
          margin: 0 !important;
        }
        table {
          border-collapse: collapse !important;
        }
        a {
          color: #1a82e2;
        }
        img {
          height: auto;
          line-height: 100%;
          text-decoration: none;
          border: 0;
          outline: none;
        }
      </style>
    </head>
    <body style="background-color: #d2c7ba">
      <table border="0" cellpadding="0" cellspacing="0" width="100%">
        <tr>
          <td align="center" bgcolor="#D2C7BA">
            <table
              border="0"
              cellpadding="0"
              cellspacing="0"
              width="100%"
              style="max-width: 600px"
            >
              <tr>
                <td align="center" valign="top" style="padding: 36px 24px">
                  <p
                    style="
                      display: block;
                      border: 0;
                      width: 48px;
                      max-width: 48px;
                      min-width: 48px;
                    "
                  >
                    Alpha
                  </p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td align="center" bgcolor="#D2C7BA">
            <table
              border="0"
              cellpadding="0"
              cellspacing="0"
              width="100%"
              style="max-width: 600px"
            >
              <tr>
                <td
                  align="left"
                  bgcolor="#ffffff"
                  style="
                    padding: 36px 24px 0;
                    font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif;
                    border-top: 3px solid #d4dadf;
                  "
                >
                  <h1
                    style="
                      margin: 0;
                      font-size: 32px;
                      font-weight: 700;
                      letter-spacing: -1px;
                      line-height: 48px;
                    "
                  >
                    Thank you for your order!!
                  </h1>
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td align="center" bgcolor="#D2C7BA">
            <table
              border="0"
              cellpadding="0"
              cellspacing="0"
              width="100%"
              style="max-width: 600px"
            >
              <tr>
                <td
                  align="left"
                  bgcolor="#ffffff"
                  style="
                    padding: 24px;
                    font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif;
                    font-size: 16px;
                    line-height: 24px;
                  "
                >
                  <p style="margin: 0">
                    Here is a summary of your recent order. If you have any
                    questions or concerns about your order, please
                    <a href="sanyamkumar002@gmail.com">Contact us</a>.
                  </p>
                </td>
              </tr>
              <tr>
                <td
                  align="left"
                  bgcolor="#ffffff"
                  style="
                    padding: 24px;
                    font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif;
                    font-size: 16px;
                    line-height: 24px;
                  "
                >
                  <table border="0" cellpadding="0" cellspacing="0" width="100%">
                    <tr>
                      <td
                        align="left"
                        bgcolor="#D2C7BA"
                        width="60%"
                        style="
                          padding: 12px;
                          font-family: 'Source Sans Pro', Helvetica, Arial,
                            sans-serif;
                          font-size: 16px;
                          line-height: 24px;
                        "
                      >
                        <strong>Item</strong>
                      </td>
                      <td
                        align="left"
                        bgcolor="#D2C7BA"
                        width="20%"
                        style="
                          padding: 12px;
                          font-family: 'Source Sans Pro', Helvetica, Arial,
                            sans-serif;
                          font-size: 16px;
                          line-height: 24px;
                        "
                      >
                        <strong>Quantity</strong>
                      </td>
                      <td
                        align="left"
                        bgcolor="#D2C7BA"
                        width="20%"
                        style="
                          padding: 12px;
                          font-family: 'Source Sans Pro', Helvetica, Arial,
                            sans-serif;
                          font-size: 16px;
                          line-height: 24px;
                        "
                      >
                        <strong>Price</strong>
                      </td>
                    </tr>
                    ${order.items.map(
                      (item) => `
                    <tr>
                      <td
                        align="left"
                        width="60%"
                        style="
                          padding: 6px 12px;
                          font-family: 'Source Sans Pro', Helvetica, Arial,
                            sans-serif;
                          font-size: 16px;
                          line-height: 24px;
                        "
                      >
                        ${item.product.title}
                      </td>
                      <td
                        align="left"
                        width="20%"
                        style="
                          padding: 6px 12px;
                          font-family: 'Source Sans Pro', Helvetica, Arial,
                            sans-serif;
                          font-size: 16px;
                          line-height: 24px;
                        "
                      >
                        ${item.quantity}
                      </td>
                      <td
                        align="left"
                        width="20%"
                        style="
                          padding: 6px 12px;
                          font-family: 'Source Sans Pro', Helvetica, Arial,
                            sans-serif;
                          font-size: 16px;
                          line-height: 24px;
                        "
                      >
                        $${Math.round(
                          item.product.price *
                            (1 - item.product.discountPercentage / 100),
                          2
                        )}
                      </td>
                    </tr>
                    `
                    )}
  
                    <tr>
                      <td
                        align="left"
                        width="60%"
                        style="
                          padding: 12px;
                          font-family: 'Source Sans Pro', Helvetica, Arial,
                            sans-serif;
                          font-size: 16px;
                          line-height: 24px;
                          border-top: 2px dashed #d2c7ba;
                          border-bottom: 2px dashed #d2c7ba;
                        "
                      >
                        <strong>Total</strong>
                      </td>
                      <td
                        align="left"
                        width="20%"
                        style="
                          padding: 12px;
                          font-family: 'Source Sans Pro', Helvetica, Arial,
                            sans-serif;
                          font-size: 16px;
                          line-height: 24px;
                          border-top: 2px dashed #d2c7ba;
                          border-bottom: 2px dashed #d2c7ba;
                        "
                      >
                        <strong>${order.totalItems}</strong>
                      </td>
                      <td
                        align="left"
                        width="20%"
                        style="
                          padding: 12px;
                          font-family: 'Source Sans Pro', Helvetica, Arial,
                            sans-serif;
                          font-size: 16px;
                          line-height: 24px;
                          border-top: 2px dashed #d2c7ba;
                          border-bottom: 2px dashed #d2c7ba;
                        "
                      >
                        <strong>$${order.totalAmount}</strong>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td align="center" bgcolor="#D2C7BA" valign="top" width="100%">
            <table
              align="center"
              bgcolor="#ffffff"
              border="0"
              cellpadding="0"
              cellspacing="0"
              width="100%"
              style="max-width: 600px"
            >
              <tr>
                <td
                  align="left"
                  valign="top"
                  style="font-size: 0; border-bottom: 3px solid #d4dadf"
                >
                  <div
                    style="
                      display: inline-block;
                      width: 100%;
                      max-width: 50%;
                      min-width: 240px;
                      vertical-align: top;
                    "
                  >
                    <table
                      align="left"
                      border="0"
                      cellpadding="0"
                      cellspacing="0"
                      width="100%"
                      style="max-width: 300px"
                    >
                      <tr>
                        <td
                          align="left"
                          valign="top"
                          style="
                            padding-bottom: 36px;
                            padding-left: 36px;
                            font-family: 'Source Sans Pro', Helvetica, Arial,
                              sans-serif;
                            font-size: 16px;
                            line-height: 24px;
                          "
                        >
                          <p><strong>Delivery Address</strong></p>
                          <p>
                            ${order.selectedAddress.name}<br />
                            ${order.selectedAddress.street}<br />
                            ${order.selectedAddress.city},
                            ${order.selectedAddress.state},
                            ${order.selectedAddress.pinCode}
                          </p>
                          <p>Contact: ${order.selectedAddress.phone}</p>
                        </td>
                      </tr>
                    </table>
                  </div>
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td align="center" bgcolor="#D2C7BA" style="padding: 24px">
            <table
              border="0"
              cellpadding="0"
              cellspacing="0"
              width="100%"
              style="max-width: 600px"
            >
              <tr>
                <td
                  align="center"
                  bgcolor="#D2C7BA"
                  style="
                    padding: 12px 24px;
                    font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif;
                    font-size: 14px;
                    line-height: 20px;
                    color: #666;
                  "
                >
                  <p style="margin: 0">
                    You received this email because we received a order from your
                    account. If you didn't order you can safely delete this email.
                  </p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
  </html>
  `;
};
