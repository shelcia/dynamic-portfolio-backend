const emailTemp = (name, url) => `
<!doctype html>
<html lang="en-US">

<head>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet">

  <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
  <title>Verify Email Password Email</title>
  <style type="text/css">
    a:hover {
      text-decoration: underline !important;
    }

    * {
      font-family: 'Poppins', 'Google Sans' !important;
    }
  </style>
</head>

<body marginheight="0" topmargin="0" marginwidth="0" style="margin: 0px; background-color: #f2f3f8;" leftmargin="0">
  <!--100% body table-->
  <table cellspacing="0" border="0" cellpadding="0" width="100%" bgcolor="#f2f3f8">
    <tr>
      <td>
        <table style="background-color: #f2f3f8; max-width:670px;  margin:0 auto;" width="100%" border="0" align="center" cellpadding="0" cellspacing="0">
          <tr>
            <td style="height:80px;">&nbsp;</td>
          </tr>
          <tr>
            <td style="text-align:center;">
            </td>
          </tr>
          <tr>
            <td style="height:20px;">&nbsp;</td>
          </tr>
          <tr>
            <td>
              <table width="95%" border="0" align="center" cellpadding="0" cellspacing="0" style="max-width:670px;background:#fff; border-radius:3px; text-align:left;-webkit-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);-moz-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);box-shadow:0 6px 18px 0 rgba(0,0,0,.06);">
                <tr>
                  <td style="height:40px;">&nbsp;</td>
                </tr>
                <tr>
                  <td style="padding:0 35px;">
                    <h1 style="color:#063e5d; font-weight:500; margin:0;font-size:32px;font-family:'Poppins',sans-serif; text-align:center;"> Verify your email
                      <span style="display:block; margin-left:auto; margin-right:auto; margin-top:19px; margin-bottom:30px; border-bottom:1px solid #cecece; width:100px;"></span>
                    </h1>

                    <p style="color:#455056; font-size:17px;line-height:24px; margin:0;font-weight:500;">Vanakkam ${name},</p>
                    <br />
                    <p style="color:#455056; font-size:15px;line-height:24px; margin:0;">

Glad you are trying out dynamic portfolio. Don't worry I will not do anything with your email id xD. 
                    </p>
                  </td>
                </tr>
                <tr>
                  <td style="padding:0 35px;">
                    <p style="color:#455056; font-size:15px; line-height:24px; margin:0;">
                      <br>
                      Now Please do verify your email before login:
                    </p>
                  </td>
                </tr>

                <tr>
                  <td style="text-align:center;">
                    <a th:href=${url} style="background:#ffa350;text-decoration:none !important; font-weight:500; margin-top:20px; color:#fff;text-transform:uppercase; font-size:14px;padding:10px 24px;display:inline-block;border-radius:50px;text-align:center;">
                      Verify your email</a>
                  </td>
                </tr>

                <tr>
                  <td style="text-align:center; padding:0 35px;">
                    <p style="color:#455056; font-size:15px; line-height:24px; margin:0;">
                      <br>
                      If above button is not working, use this link:
                      <br>
                      ${url}
                    </p>
                  </td>
                </tr>
                <tr>
                  <td style="text-align:left; padding:0 35px;">
                    <p style="color:#455056; font-size:12px; line-height:24px; margin:0;">
                      <br>
                      *Link does'nt expire
                      <br>
                    </p>
                  </td>
                </tr>
                <tr>
                  <td style="padding:0 35px;">
                    <p style="color:#455056; font-size:15px;line-height:24px; margin:0;">
                      <br>
                      In case you have any issues please create a issue at 
                      <a th:href="https://github.com/shelcia/dynamic-portfolio/issues">github</a>
                    </p>

                    <p style="color:#455056; font-size:17px;line-height:24px; font-weight:500; margin-bottom:0px;">
                      Regards,
                    </p>
                    <p style="color:#455056; font-size:17px;line-height:24px; font-weight:500; margin-top:0px;">Shelcia</p>
                  </td>
                </tr>
                <tr>
                  <td style="height:40px;">&nbsp;</td>
                </tr>
              </table>
            </td>
          <tr>
            <td style="height:20px;">&nbsp;</td>
          </tr>
          <tr>
            <td style="text-align:center;">
              <a href="https://dynamic--portfolio.vercel.app/" style="font-size:14px; color:rgba(69, 80, 86, 0.7411764705882353); line-height:18px; margin:0 0 0;">&copy; <strong>https://dynamic--portfolio.vercel.app/</strong></a>
            </td>
          </tr>
          <tr>
            <td style="height:80px;">&nbsp;</td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
  <!--/100% body table-->
</body>

</html>
`;

module.exports = emailTemp;
