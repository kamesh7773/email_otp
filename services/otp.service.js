const otpGenerrator = require('otp-generator');
const crypto = require('crypto');
var nodemailer = require('nodemailer');

const key = "EfGwOPExvP";
var otp;

// Method for genrating the OTP
async function sendOtp(params , callback){
    otp = otpGenerrator.generate(
        6,{
            digits :true,
            upperCaseAlphabets : false,
            specialChars: false,
            lowerCaseAlphabets: false,
        }
    );
    const ttl = 5 * 60 * 1000; // otp is valid for 5 min
    const expires = Date.now() + ttl;
    const data = `${params.email}.${otp}.${expires}`;
    const hash = crypto.createHmac('sha256',key).update(data).digest('hex');
    const fullHash = `${hash}.${expires}`;

    // This the Email OTP template that is send to user if possible then in otpMessage we can send HTMl code also.
    var model = {
        email : params.email,
        subject : "Email OTP for varification",
    };


    // Useing Already Defined Send EMail Method
    sendEmail(model,(error, result) =>{
        if(error){
           return callback(error);
        }

        else{
            return callback(null, fullHash);
        }
    });
}

// Method for verifying the OTP
async function verifyOTP(params, callback){
    let [hashValue , expires] = params.hash.split('.');

    let now = Date.now();

    if(now > parseInt(expires)) return callback('OTP Expired');

    let data = `${params.email}.${params.otp}.${expires}`;

    let newCalculatedHash = crypto.createHmac("sha256",key).update(data).digest('hex');

    if(newCalculatedHash === hashValue){
        return callback(null, "Success");
    }

    return callback("Invalid OTP");
    
}


// Method that send the Email with OTP
async function sendEmail(params, callback){
  const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
          user: 'laxmansinghaaa64@gmail.com',
          pass: 'lhmgughohoisdqfd'
      }
  });

  var mailOptions = {
      from :{
          name:"Registration OTP",
          address:"verify@marfa.io",
      },
      to: params.email,
      subject: params.subject,
      html: `<!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Document</title>
          <style>
            @font-face {
              font-family: "Google Sans";
              font-style: italic;
              font-weight: 400;
              src: url(https://fonts.gstatic.com/s/googlesans/v58/4Ua9rENHsxJlGDuGo1OIlL3L2JB874GPhFI9_IqmuRqGpjeaLi42kO8QpnQOs5beU3yksanMY0EhlzvKFho5.woff2)
                format("woff2");
              unicode-range: U+0308, U+0530-058F, U+2010, U+2024, U+25CC, U+FB13-FB17;
            }
            @font-face {
              font-family: "Google Sans";
              font-style: italic;
              font-weight: 400;
              src: url(https://fonts.gstatic.com/s/googlesans/v58/4Ua9rENHsxJlGDuGo1OIlL3L2JB874GPhFI9_IqmuRqGpjeaLi42kO8QpnQOs5beU3yksanMY0EhlznKFho5.woff2)
                format("woff2");
              unicode-range: U+0951-0952, U+0964-0965, U+0980-09FE, U+1CD0, U+1CD2,
                U+1CD5-1CD6, U+1CD8, U+1CE1, U+1CEA, U+1CED, U+1CF2, U+1CF5-1CF7,
                U+200C-200D, U+20B9, U+25CC, U+A8F1;
            }
            @font-face {
              font-family: "Google Sans";
              font-style: italic;
              font-weight: 400;
              src: url(https://fonts.gstatic.com/s/googlesans/v58/4Ua9rENHsxJlGDuGo1OIlL3L2JB874GPhFI9_IqmuRqGpjeaLi42kO8QpnQOs5beU3yksanMY0EhlybKFho5.woff2)
                format("woff2");
              unicode-range: U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF,
                U+A640-A69F, U+FE2E-FE2F;
            }
            @font-face {
              font-family: "Google Sans";
              font-style: italic;
              font-weight: 400;
              src: url(https://fonts.gstatic.com/s/googlesans/v58/4Ua9rENHsxJlGDuGo1OIlL3L2JB874GPhFI9_IqmuRqGpjeaLi42kO8QpnQOs5beU3yksanMY0Ehly_KFho5.woff2)
                format("woff2");
              unicode-range: U+0301, U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;
            }
            @font-face {
              font-family: "Google Sans";
              font-style: italic;
              font-weight: 400;
              src: url(https://fonts.gstatic.com/s/googlesans/v58/4Ua9rENHsxJlGDuGo1OIlL3L2JB874GPhFI9_IqmuRqGpjeaLi42kO8QpnQOs5beU3yksanMY0EhlyrKFho5.woff2)
                format("woff2");
              unicode-range: U+0900-097F, U+1CD0-1CF9, U+200C-200D, U+20A8, U+20B9,
                U+20F0, U+25CC, U+A830-A839, U+A8E0-A8FF, U+11B00-11B09;
            }
            @font-face {
              font-family: "Google Sans";
              font-style: italic;
              font-weight: 400;
              src: url(https://fonts.gstatic.com/s/googlesans/v58/4Ua9rENHsxJlGDuGo1OIlL3L2JB874GPhFI9_IqmuRqGpjeaLi42kO8QpnQOs5beU3yksanMY0EhlzrKFho5.woff2)
                format("woff2");
              unicode-range: U+1200-1399, U+2D80-2DDE, U+AB01-AB2E, U+1E7E0-1E7E6,
                U+1E7E8-1E7EB, U+1E7ED-1E7EE, U+1E7F0-1E7FE;
            }
            @font-face {
              font-family: "Google Sans";
              font-style: italic;
              font-weight: 400;
              src: url(https://fonts.gstatic.com/s/googlesans/v58/4Ua9rENHsxJlGDuGo1OIlL3L2JB874GPhFI9_IqmuRqGpjeaLi42kO8QpnQOs5beU3yksanMY0EhlzTKFho5.woff2)
                format("woff2");
              unicode-range: U+0589, U+10A0-10FF, U+1C90-1CBA, U+1CBD-1CBF,
                U+2D00-2D2F;
            }
            @font-face {
              font-family: "Google Sans";
              font-style: italic;
              font-weight: 400;
              src: url(https://fonts.gstatic.com/s/googlesans/v58/4Ua9rENHsxJlGDuGo1OIlL3L2JB874GPhFI9_IqmuRqGpjeaLi42kO8QpnQOs5beU3yksanMY0EhlyjKFho5.woff2)
                format("woff2");
              unicode-range: U+0370-0377, U+037A-037F, U+0384-038A, U+038C,
                U+038E-03A1, U+03A3-03FF;
            }
            @font-face {
              font-family: "Google Sans";
              font-style: italic;
              font-weight: 400;
              src: url(https://fonts.gstatic.com/s/googlesans/v58/4Ua9rENHsxJlGDuGo1OIlL3L2JB874GPhFI9_IqmuRqGpjeaLi42kO8QpnQOs5beU3yksanMY0EhlzDKFho5.woff2)
                format("woff2");
              unicode-range: U+0951-0952, U+0964-0965, U+0A80-0AFF, U+200C-200D,
                U+20B9, U+25CC, U+A830-A839;
            }
            @font-face {
              font-family: "Google Sans";
              font-style: italic;
              font-weight: 400;
              src: url(https://fonts.gstatic.com/s/googlesans/v58/4Ua9rENHsxJlGDuGo1OIlL3L2JB874GPhFI9_IqmuRqGpjeaLi42kO8QpnQOs5beU3yksanMY0EhlwjKFho5.woff2)
                format("woff2");
              unicode-range: U+0951-0952, U+0964-0965, U+0A01-0A76, U+200C-200D,
                U+20B9, U+25CC, U+262C, U+A830-A839;
            }
            @font-face {
              font-family: "Google Sans";
              font-style: italic;
              font-weight: 400;
              src: url(https://fonts.gstatic.com/s/googlesans/v58/4Ua9rENHsxJlGDuGo1OIlL3L2JB874GPhFI9_IqmuRqGpjeaLi42kO8QpnQOs5beU3yksanMY0EhlynKFho5.woff2)
                format("woff2");
              unicode-range: U+0590-05FF, U+200C-2010, U+20AA, U+25CC, U+FB1D-FB4F;
            }
            @font-face {
              font-family: "Google Sans";
              font-style: italic;
              font-weight: 400;
              src: url(https://fonts.gstatic.com/s/googlesans/v58/4Ua9rENHsxJlGDuGo1OIlL3L2JB874GPhFI9_IqmuRqGpjeaLi42kO8QpnQOs5beU3yksanMY0EhlyDKFho5.woff2)
                format("woff2");
              unicode-range: U+1780-17FF, U+19E0-19FF, U+200C-200D, U+25CC;
            }
            @font-face {
              font-family: "Google Sans";
              font-style: italic;
              font-weight: 400;
              src: url(https://fonts.gstatic.com/s/googlesans/v58/4Ua9rENHsxJlGDuGo1OIlL3L2JB874GPhFI9_IqmuRqGpjeaLi42kO8QpnQOs5beU3yksanMY0EhlyLKFho5.woff2)
                format("woff2");
              unicode-range: U+0E81-0EDF, U+200C-200D, U+25CC;
            }
            @font-face {
              font-family: "Google Sans";
              font-style: italic;
              font-weight: 400;
              src: url(https://fonts.gstatic.com/s/googlesans/v58/4Ua9rENHsxJlGDuGo1OIlL3L2JB874GPhFI9_IqmuRqGpjeaLi42kO8QpnQOs5beU3yksanMY0EhlzLKFho5.woff2)
                format("woff2");
              unicode-range: U+0951-0952, U+0964-0965, U+0B01-0B77, U+1CDA, U+1CF2,
                U+200C-200D, U+20B9, U+25CC;
            }
            @font-face {
              font-family: "Google Sans";
              font-style: italic;
              font-weight: 400;
              src: url(https://fonts.gstatic.com/s/googlesans/v58/4Ua9rENHsxJlGDuGo1OIlL3L2JB874GPhFI9_IqmuRqGpjeaLi42kO8QpnQOs5beU3yksanMY0EhlzbKFho5.woff2)
                format("woff2");
              unicode-range: U+0964-0965, U+0D81-0DF4, U+1CF2, U+200C-200D, U+25CC,
                U+111E1-111F4;
            }
            @font-face {
              font-family: "Google Sans";
              font-style: italic;
              font-weight: 400;
              src: url(https://fonts.gstatic.com/s/googlesans/v58/4Ua9rENHsxJlGDuGo1OIlL3L2JB874GPhFI9_IqmuRqGpjeaLi42kO8QpnQOs5beU3yksanMY0Ehlz3KFho5.woff2)
                format("woff2");
              unicode-range: U+0964-0965, U+0B82-0BFA, U+200C-200D, U+20B9, U+25CC;
            }
            @font-face {
              font-family: "Google Sans";
              font-style: italic;
              font-weight: 400;
              src: url(https://fonts.gstatic.com/s/googlesans/v58/4Ua9rENHsxJlGDuGo1OIlL3L2JB874GPhFI9_IqmuRqGpjeaLi42kO8QpnQOs5beU3yksanMY0EhlzfKFho5.woff2)
                format("woff2");
              unicode-range: U+0951-0952, U+0964-0965, U+0C00-0C7F, U+1CDA, U+1CF2,
                U+200C-200D, U+25CC;
            }
            @font-face {
              font-family: "Google Sans";
              font-style: italic;
              font-weight: 400;
              src: url(https://fonts.gstatic.com/s/googlesans/v58/4Ua9rENHsxJlGDuGo1OIlL3L2JB874GPhFI9_IqmuRqGpjeaLi42kO8QpnQOs5beU3yksanMY0Ehlz_KFho5.woff2)
                format("woff2");
              unicode-range: U+0E01-0E5B, U+200C-200D, U+25CC;
            }
            @font-face {
              font-family: "Google Sans";
              font-style: italic;
              font-weight: 400;
              src: url(https://fonts.gstatic.com/s/googlesans/v58/4Ua9rENHsxJlGDuGo1OIlL3L2JB874GPhFI9_IqmuRqGpjeaLi42kO8QpnQOs5beU3yksanMY0EhlyTKFho5.woff2)
                format("woff2");
              unicode-range: U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169,
                U+01A0-01A1, U+01AF-01B0, U+0300-0301, U+0303-0304, U+0308-0309,
                U+0323, U+0329, U+1EA0-1EF9, U+20AB;
            }
            @font-face {
              font-family: "Google Sans";
              font-style: italic;
              font-weight: 400;
              src: url(https://fonts.gstatic.com/s/googlesans/v58/4Ua9rENHsxJlGDuGo1OIlL3L2JB874GPhFI9_IqmuRqGpjeaLi42kO8QpnQOs5beU3yksanMY0EhlyXKFho5.woff2)
                format("woff2");
              unicode-range: U+0100-02AF, U+0304, U+0308, U+0329, U+1E00-1E9F,
                U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C0, U+2113, U+2C60-2C7F,
                U+A720-A7FF;
            }
            @font-face {
              font-family: "Google Sans";
              font-style: italic;
              font-weight: 400;
              src: url(https://fonts.gstatic.com/s/googlesans/v58/4Ua9rENHsxJlGDuGo1OIlL3L2JB874GPhFI9_IqmuRqGpjeaLi42kO8QpnQOs5beU3yksanMY0EhlyvKFg.woff2)
                format("woff2");
              unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6,
                U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+2074, U+20AC,
                U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
            }
            @font-face {
              font-family: "Google Sans";
              font-style: normal;
              font-weight: 400;
              src: url(https://fonts.gstatic.com/s/googlesans/v58/4UaRrENHsxJlGDuGo1OIlJfC6l_24rlCK1Yo_Iq2rgCIlsw.woff2)
                format("woff2");
              unicode-range: U+0308, U+0530-058F, U+2010, U+2024, U+25CC, U+FB13-FB17;
            }
            @font-face {
              font-family: "Google Sans";
              font-style: normal;
              font-weight: 400;
              src: url(https://fonts.gstatic.com/s/googlesans/v58/4UaRrENHsxJlGDuGo1OIlJfC6l_24rlCK1Yo_Iq2rACIlsw.woff2)
                format("woff2");
              unicode-range: U+0951-0952, U+0964-0965, U+0980-09FE, U+1CD0, U+1CD2,
                U+1CD5-1CD6, U+1CD8, U+1CE1, U+1CEA, U+1CED, U+1CF2, U+1CF5-1CF7,
                U+200C-200D, U+20B9, U+25CC, U+A8F1;
            }
            @font-face {
              font-family: "Google Sans";
              font-style: normal;
              font-weight: 400;
              src: url(https://fonts.gstatic.com/s/googlesans/v58/4UaRrENHsxJlGDuGo1OIlJfC6l_24rlCK1Yo_Iq2swCIlsw.woff2)
                format("woff2");
              unicode-range: U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF,
                U+A640-A69F, U+FE2E-FE2F;
            }
            @font-face {
              font-family: "Google Sans";
              font-style: normal;
              font-weight: 400;
              src: url(https://fonts.gstatic.com/s/googlesans/v58/4UaRrENHsxJlGDuGo1OIlJfC6l_24rlCK1Yo_Iq2ugCIlsw.woff2)
                format("woff2");
              unicode-range: U+0301, U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;
            }
            @font-face {
              font-family: "Google Sans";
              font-style: normal;
              font-weight: 400;
              src: url(https://fonts.gstatic.com/s/googlesans/v58/4UaRrENHsxJlGDuGo1OIlJfC6l_24rlCK1Yo_Iq2vwCIlsw.woff2)
                format("woff2");
              unicode-range: U+0900-097F, U+1CD0-1CF9, U+200C-200D, U+20A8, U+20B9,
                U+20F0, U+25CC, U+A830-A839, U+A8E0-A8FF, U+11B00-11B09;
            }
            @font-face {
              font-family: "Google Sans";
              font-style: normal;
              font-weight: 400;
              src: url(https://fonts.gstatic.com/s/googlesans/v58/4UaRrENHsxJlGDuGo1OIlJfC6l_24rlCK1Yo_Iq2rwCIlsw.woff2)
                format("woff2");
              unicode-range: U+1200-1399, U+2D80-2DDE, U+AB01-AB2E, U+1E7E0-1E7E6,
                U+1E7E8-1E7EB, U+1E7ED-1E7EE, U+1E7F0-1E7FE;
            }
            @font-face {
              font-family: "Google Sans";
              font-style: normal;
              font-weight: 400;
              src: url(https://fonts.gstatic.com/s/googlesans/v58/4UaRrENHsxJlGDuGo1OIlJfC6l_24rlCK1Yo_Iq2oQCIlsw.woff2)
                format("woff2");
              unicode-range: U+0589, U+10A0-10FF, U+1C90-1CBA, U+1CBD-1CBF,
                U+2D00-2D2F;
            }
            @font-face {
              font-family: "Google Sans";
              font-style: normal;
              font-weight: 400;
              src: url(https://fonts.gstatic.com/s/googlesans/v58/4UaRrENHsxJlGDuGo1OIlJfC6l_24rlCK1Yo_Iq2vQCIlsw.woff2)
                format("woff2");
              unicode-range: U+0370-0377, U+037A-037F, U+0384-038A, U+038C,
                U+038E-03A1, U+03A3-03FF;
            }
            @font-face {
              font-family: "Google Sans";
              font-style: normal;
              font-weight: 400;
              src: url(https://fonts.gstatic.com/s/googlesans/v58/4UaRrENHsxJlGDuGo1OIlJfC6l_24rlCK1Yo_Iq2pQCIlsw.woff2)
                format("woff2");
              unicode-range: U+0951-0952, U+0964-0965, U+0A80-0AFF, U+200C-200D,
                U+20B9, U+25CC, U+A830-A839;
            }
            @font-face {
              font-family: "Google Sans";
              font-style: normal;
              font-weight: 400;
              src: url(https://fonts.gstatic.com/s/googlesans/v58/4UaRrENHsxJlGDuGo1OIlJfC6l_24rlCK1Yo_Iq2nQCIlsw.woff2)
                format("woff2");
              unicode-range: U+0951-0952, U+0964-0965, U+0A01-0A76, U+200C-200D,
                U+20B9, U+25CC, U+262C, U+A830-A839;
            }
            @font-face {
              font-family: "Google Sans";
              font-style: normal;
              font-weight: 400;
              src: url(https://fonts.gstatic.com/s/googlesans/v58/4UaRrENHsxJlGDuGo1OIlJfC6l_24rlCK1Yo_Iq2vACIlsw.woff2)
                format("woff2");
              unicode-range: U+0590-05FF, U+200C-2010, U+20AA, U+25CC, U+FB1D-FB4F;
            }
            @font-face {
              font-family: "Google Sans";
              font-style: normal;
              font-weight: 400;
              src: url(https://fonts.gstatic.com/s/googlesans/v58/4UaRrENHsxJlGDuGo1OIlJfC6l_24rlCK1Yo_Iq2tQCIlsw.woff2)
                format("woff2");
              unicode-range: U+1780-17FF, U+19E0-19FF, U+200C-200D, U+25CC;
            }
            @font-face {
              font-family: "Google Sans";
              font-style: normal;
              font-weight: 400;
              src: url(https://fonts.gstatic.com/s/googlesans/v58/4UaRrENHsxJlGDuGo1OIlJfC6l_24rlCK1Yo_Iq2twCIlsw.woff2)
                format("woff2");
              unicode-range: U+0E81-0EDF, U+200C-200D, U+25CC;
            }
            @font-face {
              font-family: "Google Sans";
              font-style: normal;
              font-weight: 400;
              src: url(https://fonts.gstatic.com/s/googlesans/v58/4UaRrENHsxJlGDuGo1OIlJfC6l_24rlCK1Yo_Iq2pwCIlsw.woff2)
                format("woff2");
              unicode-range: U+0951-0952, U+0964-0965, U+0B01-0B77, U+1CDA, U+1CF2,
                U+200C-200D, U+20B9, U+25CC;
            }
            @font-face {
              font-family: "Google Sans";
              font-style: normal;
              font-weight: 400;
              src: url(https://fonts.gstatic.com/s/googlesans/v58/4UaRrENHsxJlGDuGo1OIlJfC6l_24rlCK1Yo_Iq2owCIlsw.woff2)
                format("woff2");
              unicode-range: U+0964-0965, U+0D81-0DF4, U+1CF2, U+200C-200D, U+25CC,
                U+111E1-111F4;
            }
            @font-face {
              font-family: "Google Sans";
              font-style: normal;
              font-weight: 400;
              src: url(https://fonts.gstatic.com/s/googlesans/v58/4UaRrENHsxJlGDuGo1OIlJfC6l_24rlCK1Yo_Iq2qACIlsw.woff2)
                format("woff2");
              unicode-range: U+0964-0965, U+0B82-0BFA, U+200C-200D, U+20B9, U+25CC;
            }
            @font-face {
              font-family: "Google Sans";
              font-style: normal;
              font-weight: 400;
              src: url(https://fonts.gstatic.com/s/googlesans/v58/4UaRrENHsxJlGDuGo1OIlJfC6l_24rlCK1Yo_Iq2ogCIlsw.woff2)
                format("woff2");
              unicode-range: U+0951-0952, U+0964-0965, U+0C00-0C7F, U+1CDA, U+1CF2,
                U+200C-200D, U+25CC;
            }
            @font-face {
              font-family: "Google Sans";
              font-style: normal;
              font-weight: 400;
              src: url(https://fonts.gstatic.com/s/googlesans/v58/4UaRrENHsxJlGDuGo1OIlJfC6l_24rlCK1Yo_Iq2qgCIlsw.woff2)
                format("woff2");
              unicode-range: U+0E01-0E5B, U+200C-200D, U+25CC;
            }
            @font-face {
              font-family: "Google Sans";
              font-style: normal;
              font-weight: 400;
              src: url(https://fonts.gstatic.com/s/googlesans/v58/4UaRrENHsxJlGDuGo1OIlJfC6l_24rlCK1Yo_Iq2sQCIlsw.woff2)
                format("woff2");
              unicode-range: U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169,
                U+01A0-01A1, U+01AF-01B0, U+0300-0301, U+0303-0304, U+0308-0309,
                U+0323, U+0329, U+1EA0-1EF9, U+20AB;
            }
            @font-face {
              font-family: "Google Sans";
              font-style: normal;
              font-weight: 400;
              src: url(https://fonts.gstatic.com/s/googlesans/v58/4UaRrENHsxJlGDuGo1OIlJfC6l_24rlCK1Yo_Iq2sACIlsw.woff2)
                format("woff2");
              unicode-range: U+0100-02AF, U+0304, U+0308, U+0329, U+1E00-1E9F,
                U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C0, U+2113, U+2C60-2C7F,
                U+A720-A7FF;
            }
            @font-face {
              font-family: "Google Sans";
              font-style: normal;
              font-weight: 400;
              src: url(https://fonts.gstatic.com/s/googlesans/v58/4UaRrENHsxJlGDuGo1OIlJfC6l_24rlCK1Yo_Iq2vgCI.woff2)
                format("woff2");
              unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6,
                U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+2074, U+20AC,
                U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
            }
            @font-face {
              font-family: "Google Sans";
              font-style: normal;
              font-weight: 500;
              src: url(https://fonts.gstatic.com/s/googlesans/v58/4UaRrENHsxJlGDuGo1OIlJfC6l_24rlCK1Yo_Iq2rgCIlsw.woff2)
                format("woff2");
              unicode-range: U+0308, U+0530-058F, U+2010, U+2024, U+25CC, U+FB13-FB17;
            }
            @font-face {
              font-family: "Google Sans";
              font-style: normal;
              font-weight: 500;
              src: url(https://fonts.gstatic.com/s/googlesans/v58/4UaRrENHsxJlGDuGo1OIlJfC6l_24rlCK1Yo_Iq2rACIlsw.woff2)
                format("woff2");
              unicode-range: U+0951-0952, U+0964-0965, U+0980-09FE, U+1CD0, U+1CD2,
                U+1CD5-1CD6, U+1CD8, U+1CE1, U+1CEA, U+1CED, U+1CF2, U+1CF5-1CF7,
                U+200C-200D, U+20B9, U+25CC, U+A8F1;
            }
            @font-face {
              font-family: "Google Sans";
              font-style: normal;
              font-weight: 500;
              src: url(https://fonts.gstatic.com/s/googlesans/v58/4UaRrENHsxJlGDuGo1OIlJfC6l_24rlCK1Yo_Iq2swCIlsw.woff2)
                format("woff2");
              unicode-range: U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF,
                U+A640-A69F, U+FE2E-FE2F;
            }
            @font-face {
              font-family: "Google Sans";
              font-style: normal;
              font-weight: 500;
              src: url(https://fonts.gstatic.com/s/googlesans/v58/4UaRrENHsxJlGDuGo1OIlJfC6l_24rlCK1Yo_Iq2ugCIlsw.woff2)
                format("woff2");
              unicode-range: U+0301, U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;
            }
            @font-face {
              font-family: "Google Sans";
              font-style: normal;
              font-weight: 500;
              src: url(https://fonts.gstatic.com/s/googlesans/v58/4UaRrENHsxJlGDuGo1OIlJfC6l_24rlCK1Yo_Iq2vwCIlsw.woff2)
                format("woff2");
              unicode-range: U+0900-097F, U+1CD0-1CF9, U+200C-200D, U+20A8, U+20B9,
                U+20F0, U+25CC, U+A830-A839, U+A8E0-A8FF, U+11B00-11B09;
            }
            @font-face {
              font-family: "Google Sans";
              font-style: normal;
              font-weight: 500;
              src: url(https://fonts.gstatic.com/s/googlesans/v58/4UaRrENHsxJlGDuGo1OIlJfC6l_24rlCK1Yo_Iq2rwCIlsw.woff2)
                format("woff2");
              unicode-range: U+1200-1399, U+2D80-2DDE, U+AB01-AB2E, U+1E7E0-1E7E6,
                U+1E7E8-1E7EB, U+1E7ED-1E7EE, U+1E7F0-1E7FE;
            }
            @font-face {
              font-family: "Google Sans";
              font-style: normal;
              font-weight: 500;
              src: url(https://fonts.gstatic.com/s/googlesans/v58/4UaRrENHsxJlGDuGo1OIlJfC6l_24rlCK1Yo_Iq2oQCIlsw.woff2)
                format("woff2");
              unicode-range: U+0589, U+10A0-10FF, U+1C90-1CBA, U+1CBD-1CBF,
                U+2D00-2D2F;
            }
            @font-face {
              font-family: "Google Sans";
              font-style: normal;
              font-weight: 500;
              src: url(https://fonts.gstatic.com/s/googlesans/v58/4UaRrENHsxJlGDuGo1OIlJfC6l_24rlCK1Yo_Iq2vQCIlsw.woff2)
                format("woff2");
              unicode-range: U+0370-0377, U+037A-037F, U+0384-038A, U+038C,
                U+038E-03A1, U+03A3-03FF;
            }
            @font-face {
              font-family: "Google Sans";
              font-style: normal;
              font-weight: 500;
              src: url(https://fonts.gstatic.com/s/googlesans/v58/4UaRrENHsxJlGDuGo1OIlJfC6l_24rlCK1Yo_Iq2pQCIlsw.woff2)
                format("woff2");
              unicode-range: U+0951-0952, U+0964-0965, U+0A80-0AFF, U+200C-200D,
                U+20B9, U+25CC, U+A830-A839;
            }
            @font-face {
              font-family: "Google Sans";
              font-style: normal;
              font-weight: 500;
              src: url(https://fonts.gstatic.com/s/googlesans/v58/4UaRrENHsxJlGDuGo1OIlJfC6l_24rlCK1Yo_Iq2nQCIlsw.woff2)
                format("woff2");
              unicode-range: U+0951-0952, U+0964-0965, U+0A01-0A76, U+200C-200D,
                U+20B9, U+25CC, U+262C, U+A830-A839;
            }
            @font-face {
              font-family: "Google Sans";
              font-style: normal;
              font-weight: 500;
              src: url(https://fonts.gstatic.com/s/googlesans/v58/4UaRrENHsxJlGDuGo1OIlJfC6l_24rlCK1Yo_Iq2vACIlsw.woff2)
                format("woff2");
              unicode-range: U+0590-05FF, U+200C-2010, U+20AA, U+25CC, U+FB1D-FB4F;
            }
            @font-face {
              font-family: "Google Sans";
              font-style: normal;
              font-weight: 500;
              src: url(https://fonts.gstatic.com/s/googlesans/v58/4UaRrENHsxJlGDuGo1OIlJfC6l_24rlCK1Yo_Iq2tQCIlsw.woff2)
                format("woff2");
              unicode-range: U+1780-17FF, U+19E0-19FF, U+200C-200D, U+25CC;
            }
            @font-face {
              font-family: "Google Sans";
              font-style: normal;
              font-weight: 500;
              src: url(https://fonts.gstatic.com/s/googlesans/v58/4UaRrENHsxJlGDuGo1OIlJfC6l_24rlCK1Yo_Iq2twCIlsw.woff2)
                format("woff2");
              unicode-range: U+0E81-0EDF, U+200C-200D, U+25CC;
            }
            @font-face {
              font-family: "Google Sans";
              font-style: normal;
              font-weight: 500;
              src: url(https://fonts.gstatic.com/s/googlesans/v58/4UaRrENHsxJlGDuGo1OIlJfC6l_24rlCK1Yo_Iq2pwCIlsw.woff2)
                format("woff2");
              unicode-range: U+0951-0952, U+0964-0965, U+0B01-0B77, U+1CDA, U+1CF2,
                U+200C-200D, U+20B9, U+25CC;
            }
            @font-face {
              font-family: "Google Sans";
              font-style: normal;
              font-weight: 500;
              src: url(https://fonts.gstatic.com/s/googlesans/v58/4UaRrENHsxJlGDuGo1OIlJfC6l_24rlCK1Yo_Iq2owCIlsw.woff2)
                format("woff2");
              unicode-range: U+0964-0965, U+0D81-0DF4, U+1CF2, U+200C-200D, U+25CC,
                U+111E1-111F4;
            }
            @font-face {
              font-family: "Google Sans";
              font-style: normal;
              font-weight: 500;
              src: url(https://fonts.gstatic.com/s/googlesans/v58/4UaRrENHsxJlGDuGo1OIlJfC6l_24rlCK1Yo_Iq2qACIlsw.woff2)
                format("woff2");
              unicode-range: U+0964-0965, U+0B82-0BFA, U+200C-200D, U+20B9, U+25CC;
            }
            @font-face {
              font-family: "Google Sans";
              font-style: normal;
              font-weight: 500;
              src: url(https://fonts.gstatic.com/s/googlesans/v58/4UaRrENHsxJlGDuGo1OIlJfC6l_24rlCK1Yo_Iq2ogCIlsw.woff2)
                format("woff2");
              unicode-range: U+0951-0952, U+0964-0965, U+0C00-0C7F, U+1CDA, U+1CF2,
                U+200C-200D, U+25CC;
            }
            @font-face {
              font-family: "Google Sans";
              font-style: normal;
              font-weight: 500;
              src: url(https://fonts.gstatic.com/s/googlesans/v58/4UaRrENHsxJlGDuGo1OIlJfC6l_24rlCK1Yo_Iq2qgCIlsw.woff2)
                format("woff2");
              unicode-range: U+0E01-0E5B, U+200C-200D, U+25CC;
            }
            @font-face {
              font-family: "Google Sans";
              font-style: normal;
              font-weight: 500;
              src: url(https://fonts.gstatic.com/s/googlesans/v58/4UaRrENHsxJlGDuGo1OIlJfC6l_24rlCK1Yo_Iq2sQCIlsw.woff2)
                format("woff2");
              unicode-range: U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169,
                U+01A0-01A1, U+01AF-01B0, U+0300-0301, U+0303-0304, U+0308-0309,
                U+0323, U+0329, U+1EA0-1EF9, U+20AB;
            }
            @font-face {
              font-family: "Google Sans";
              font-style: normal;
              font-weight: 500;
              src: url(https://fonts.gstatic.com/s/googlesans/v58/4UaRrENHsxJlGDuGo1OIlJfC6l_24rlCK1Yo_Iq2sACIlsw.woff2)
                format("woff2");
              unicode-range: U+0100-02AF, U+0304, U+0308, U+0329, U+1E00-1E9F,
                U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C0, U+2113, U+2C60-2C7F,
                U+A720-A7FF;
            }
            @font-face {
              font-family: "Google Sans";
              font-style: normal;
              font-weight: 500;
              src: url(https://fonts.gstatic.com/s/googlesans/v58/4UaRrENHsxJlGDuGo1OIlJfC6l_24rlCK1Yo_Iq2vgCI.woff2)
                format("woff2");
              unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6,
                U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+2074, U+20AC,
                U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
            }
            @font-face {
              font-family: "Google Sans";
              font-style: normal;
              font-weight: 700;
              src: url(https://fonts.gstatic.com/s/googlesans/v58/4UaRrENHsxJlGDuGo1OIlJfC6l_24rlCK1Yo_Iq2rgCIlsw.woff2)
                format("woff2");
              unicode-range: U+0308, U+0530-058F, U+2010, U+2024, U+25CC, U+FB13-FB17;
            }
            @font-face {
              font-family: "Google Sans";
              font-style: normal;
              font-weight: 700;
              src: url(https://fonts.gstatic.com/s/googlesans/v58/4UaRrENHsxJlGDuGo1OIlJfC6l_24rlCK1Yo_Iq2rACIlsw.woff2)
                format("woff2");
              unicode-range: U+0951-0952, U+0964-0965, U+0980-09FE, U+1CD0, U+1CD2,
                U+1CD5-1CD6, U+1CD8, U+1CE1, U+1CEA, U+1CED, U+1CF2, U+1CF5-1CF7,
                U+200C-200D, U+20B9, U+25CC, U+A8F1;
            }
            @font-face {
              font-family: "Google Sans";
              font-style: normal;
              font-weight: 700;
              src: url(https://fonts.gstatic.com/s/googlesans/v58/4UaRrENHsxJlGDuGo1OIlJfC6l_24rlCK1Yo_Iq2swCIlsw.woff2)
                format("woff2");
              unicode-range: U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF,
                U+A640-A69F, U+FE2E-FE2F;
            }
            @font-face {
              font-family: "Google Sans";
              font-style: normal;
              font-weight: 700;
              src: url(https://fonts.gstatic.com/s/googlesans/v58/4UaRrENHsxJlGDuGo1OIlJfC6l_24rlCK1Yo_Iq2ugCIlsw.woff2)
                format("woff2");
              unicode-range: U+0301, U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;
            }
            @font-face {
              font-family: "Google Sans";
              font-style: normal;
              font-weight: 700;
              src: url(https://fonts.gstatic.com/s/googlesans/v58/4UaRrENHsxJlGDuGo1OIlJfC6l_24rlCK1Yo_Iq2vwCIlsw.woff2)
                format("woff2");
              unicode-range: U+0900-097F, U+1CD0-1CF9, U+200C-200D, U+20A8, U+20B9,
                U+20F0, U+25CC, U+A830-A839, U+A8E0-A8FF, U+11B00-11B09;
            }
            @font-face {
              font-family: "Google Sans";
              font-style: normal;
              font-weight: 700;
              src: url(https://fonts.gstatic.com/s/googlesans/v58/4UaRrENHsxJlGDuGo1OIlJfC6l_24rlCK1Yo_Iq2rwCIlsw.woff2)
                format("woff2");
              unicode-range: U+1200-1399, U+2D80-2DDE, U+AB01-AB2E, U+1E7E0-1E7E6,
                U+1E7E8-1E7EB, U+1E7ED-1E7EE, U+1E7F0-1E7FE;
            }
            @font-face {
              font-family: "Google Sans";
              font-style: normal;
              font-weight: 700;
              src: url(https://fonts.gstatic.com/s/googlesans/v58/4UaRrENHsxJlGDuGo1OIlJfC6l_24rlCK1Yo_Iq2oQCIlsw.woff2)
                format("woff2");
              unicode-range: U+0589, U+10A0-10FF, U+1C90-1CBA, U+1CBD-1CBF,
                U+2D00-2D2F;
            }
            @font-face {
              font-family: "Google Sans";
              font-style: normal;
              font-weight: 700;
              src: url(https://fonts.gstatic.com/s/googlesans/v58/4UaRrENHsxJlGDuGo1OIlJfC6l_24rlCK1Yo_Iq2vQCIlsw.woff2)
                format("woff2");
              unicode-range: U+0370-0377, U+037A-037F, U+0384-038A, U+038C,
                U+038E-03A1, U+03A3-03FF;
            }
            @font-face {
              font-family: "Google Sans";
              font-style: normal;
              font-weight: 700;
              src: url(https://fonts.gstatic.com/s/googlesans/v58/4UaRrENHsxJlGDuGo1OIlJfC6l_24rlCK1Yo_Iq2pQCIlsw.woff2)
                format("woff2");
              unicode-range: U+0951-0952, U+0964-0965, U+0A80-0AFF, U+200C-200D,
                U+20B9, U+25CC, U+A830-A839;
            }
            @font-face {
              font-family: "Google Sans";
              font-style: normal;
              font-weight: 700;
              src: url(https://fonts.gstatic.com/s/googlesans/v58/4UaRrENHsxJlGDuGo1OIlJfC6l_24rlCK1Yo_Iq2nQCIlsw.woff2)
                format("woff2");
              unicode-range: U+0951-0952, U+0964-0965, U+0A01-0A76, U+200C-200D,
                U+20B9, U+25CC, U+262C, U+A830-A839;
            }
            @font-face {
              font-family: "Google Sans";
              font-style: normal;
              font-weight: 700;
              src: url(https://fonts.gstatic.com/s/googlesans/v58/4UaRrENHsxJlGDuGo1OIlJfC6l_24rlCK1Yo_Iq2vACIlsw.woff2)
                format("woff2");
              unicode-range: U+0590-05FF, U+200C-2010, U+20AA, U+25CC, U+FB1D-FB4F;
            }
            @font-face {
              font-family: "Google Sans";
              font-style: normal;
              font-weight: 700;
              src: url(https://fonts.gstatic.com/s/googlesans/v58/4UaRrENHsxJlGDuGo1OIlJfC6l_24rlCK1Yo_Iq2tQCIlsw.woff2)
                format("woff2");
              unicode-range: U+1780-17FF, U+19E0-19FF, U+200C-200D, U+25CC;
            }
            @font-face {
              font-family: "Google Sans";
              font-style: normal;
              font-weight: 700;
              src: url(https://fonts.gstatic.com/s/googlesans/v58/4UaRrENHsxJlGDuGo1OIlJfC6l_24rlCK1Yo_Iq2twCIlsw.woff2)
                format("woff2");
              unicode-range: U+0E81-0EDF, U+200C-200D, U+25CC;
            }
            @font-face {
              font-family: "Google Sans";
              font-style: normal;
              font-weight: 700;
              src: url(https://fonts.gstatic.com/s/googlesans/v58/4UaRrENHsxJlGDuGo1OIlJfC6l_24rlCK1Yo_Iq2pwCIlsw.woff2)
                format("woff2");
              unicode-range: U+0951-0952, U+0964-0965, U+0B01-0B77, U+1CDA, U+1CF2,
                U+200C-200D, U+20B9, U+25CC;
            }
            @font-face {
              font-family: "Google Sans";
              font-style: normal;
              font-weight: 700;
              src: url(https://fonts.gstatic.com/s/googlesans/v58/4UaRrENHsxJlGDuGo1OIlJfC6l_24rlCK1Yo_Iq2owCIlsw.woff2)
                format("woff2");
              unicode-range: U+0964-0965, U+0D81-0DF4, U+1CF2, U+200C-200D, U+25CC,
                U+111E1-111F4;
            }
            @font-face {
              font-family: "Google Sans";
              font-style: normal;
              font-weight: 700;
              src: url(https://fonts.gstatic.com/s/googlesans/v58/4UaRrENHsxJlGDuGo1OIlJfC6l_24rlCK1Yo_Iq2qACIlsw.woff2)
                format("woff2");
              unicode-range: U+0964-0965, U+0B82-0BFA, U+200C-200D, U+20B9, U+25CC;
            }
            @font-face {
              font-family: "Google Sans";
              font-style: normal;
              font-weight: 700;
              src: url(https://fonts.gstatic.com/s/googlesans/v58/4UaRrENHsxJlGDuGo1OIlJfC6l_24rlCK1Yo_Iq2ogCIlsw.woff2)
                format("woff2");
              unicode-range: U+0951-0952, U+0964-0965, U+0C00-0C7F, U+1CDA, U+1CF2,
                U+200C-200D, U+25CC;
            }
            @font-face {
              font-family: "Google Sans";
              font-style: normal;
              font-weight: 700;
              src: url(https://fonts.gstatic.com/s/googlesans/v58/4UaRrENHsxJlGDuGo1OIlJfC6l_24rlCK1Yo_Iq2qgCIlsw.woff2)
                format("woff2");
              unicode-range: U+0E01-0E5B, U+200C-200D, U+25CC;
            }
            @font-face {
              font-family: "Google Sans";
              font-style: normal;
              font-weight: 700;
              src: url(https://fonts.gstatic.com/s/googlesans/v58/4UaRrENHsxJlGDuGo1OIlJfC6l_24rlCK1Yo_Iq2sQCIlsw.woff2)
                format("woff2");
              unicode-range: U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169,
                U+01A0-01A1, U+01AF-01B0, U+0300-0301, U+0303-0304, U+0308-0309,
                U+0323, U+0329, U+1EA0-1EF9, U+20AB;
            }
            @font-face {
              font-family: "Google Sans";
              font-style: normal;
              font-weight: 700;
              src: url(https://fonts.gstatic.com/s/googlesans/v58/4UaRrENHsxJlGDuGo1OIlJfC6l_24rlCK1Yo_Iq2sACIlsw.woff2)
                format("woff2");
              unicode-range: U+0100-02AF, U+0304, U+0308, U+0329, U+1E00-1E9F,
                U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C0, U+2113, U+2C60-2C7F,
                U+A720-A7FF;
            }
            @font-face {
              font-family: "Google Sans";
              font-style: normal;
              font-weight: 700;
              src: url(https://fonts.gstatic.com/s/googlesans/v58/4UaRrENHsxJlGDuGo1OIlJfC6l_24rlCK1Yo_Iq2vgCI.woff2)
                format("woff2");
              unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6,
                U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+2074, U+20AC,
                U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
            }
            @import url("https://fonts.googleapis.com/css?family=Roboto:100,100i,300,300i,400,400i,500,500i,700,700i,900,900i&display=swap");
            @font-face {
              font-family: "Google Sans";
              font-style: normal;
              font-weight: 400;
              src: url(https://fonts.gstatic.com/s/googlesans/v58/4UasrENHsxJlGDuGo1OIlJfC6l_24rlCK1Yo_Iqcsih3SAyH6cAwhX9RPiIUvaYr.woff2)
                format("woff2");
              unicode-range: U+0308, U+0530-058F, U+2010, U+2024, U+25CC, U+FB13-FB17;
            }
            @font-face {
              font-family: "Google Sans";
              font-style: normal;
              font-weight: 400;
              src: url(https://fonts.gstatic.com/s/googlesans/v58/4UasrENHsxJlGDuGo1OIlJfC6l_24rlCK1Yo_Iqcsih3SAyH6cAwhX9RPiAUvaYr.woff2)
                format("woff2");
              unicode-range: U+0951-0952, U+0964-0965, U+0980-09FE, U+1CD0, U+1CD2,
                U+1CD5-1CD6, U+1CD8, U+1CE1, U+1CEA, U+1CED, U+1CF2, U+1CF5-1CF7,
                U+200C-200D, U+20B9, U+25CC, U+A8F1;
            }
            @font-face {
              font-family: "Google Sans";
              font-style: normal;
              font-weight: 400;
              src: url(https://fonts.gstatic.com/s/googlesans/v58/4UasrENHsxJlGDuGo1OIlJfC6l_24rlCK1Yo_Iqcsih3SAyH6cAwhX9RPj8UvaYr.woff2)
                format("woff2");
              unicode-range: U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF,
                U+A640-A69F, U+FE2E-FE2F;
            }
            @font-face {
              font-family: "Google Sans";
              font-style: normal;
              font-weight: 400;
              src: url(https://fonts.gstatic.com/s/googlesans/v58/4UasrENHsxJlGDuGo1OIlJfC6l_24rlCK1Yo_Iqcsih3SAyH6cAwhX9RPjYUvaYr.woff2)
                format("woff2");
              unicode-range: U+0301, U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;
            }
            @font-face {
              font-family: "Google Sans";
              font-style: normal;
              font-weight: 400;
              src: url(https://fonts.gstatic.com/s/googlesans/v58/4UasrENHsxJlGDuGo1OIlJfC6l_24rlCK1Yo_Iqcsih3SAyH6cAwhX9RPjMUvaYr.woff2)
                format("woff2");
              unicode-range: U+0900-097F, U+1CD0-1CF9, U+200C-200D, U+20A8, U+20B9,
                U+20F0, U+25CC, U+A830-A839, U+A8E0-A8FF, U+11B00-11B09;
            }
            @font-face {
              font-family: "Google Sans";
              font-style: normal;
              font-weight: 400;
              src: url(https://fonts.gstatic.com/s/googlesans/v58/4UasrENHsxJlGDuGo1OIlJfC6l_24rlCK1Yo_Iqcsih3SAyH6cAwhX9RPiMUvaYr.woff2)
                format("woff2");
              unicode-range: U+1200-1399, U+2D80-2DDE, U+AB01-AB2E, U+1E7E0-1E7E6,
                U+1E7E8-1E7EB, U+1E7ED-1E7EE, U+1E7F0-1E7FE;
            }
            @font-face {
              font-family: "Google Sans";
              font-style: normal;
              font-weight: 400;
              src: url(https://fonts.gstatic.com/s/googlesans/v58/4UasrENHsxJlGDuGo1OIlJfC6l_24rlCK1Yo_Iqcsih3SAyH6cAwhX9RPi0UvaYr.woff2)
                format("woff2");
              unicode-range: U+0589, U+10A0-10FF, U+1C90-1CBA, U+1CBD-1CBF,
                U+2D00-2D2F;
            }
            @font-face {
              font-family: "Google Sans";
              font-style: normal;
              font-weight: 400;
              src: url(https://fonts.gstatic.com/s/googlesans/v58/4UasrENHsxJlGDuGo1OIlJfC6l_24rlCK1Yo_Iqcsih3SAyH6cAwhX9RPjEUvaYr.woff2)
                format("woff2");
              unicode-range: U+0370-0377, U+037A-037F, U+0384-038A, U+038C,
                U+038E-03A1, U+03A3-03FF;
            }
            @font-face {
              font-family: "Google Sans";
              font-style: normal;
              font-weight: 400;
              src: url(https://fonts.gstatic.com/s/googlesans/v58/4UasrENHsxJlGDuGo1OIlJfC6l_24rlCK1Yo_Iqcsih3SAyH6cAwhX9RPikUvaYr.woff2)
                format("woff2");
              unicode-range: U+0951-0952, U+0964-0965, U+0A80-0AFF, U+200C-200D,
                U+20B9, U+25CC, U+A830-A839;
            }
            @font-face {
              font-family: "Google Sans";
              font-style: normal;
              font-weight: 400;
              src: url(https://fonts.gstatic.com/s/googlesans/v58/4UasrENHsxJlGDuGo1OIlJfC6l_24rlCK1Yo_Iqcsih3SAyH6cAwhX9RPhEUvaYr.woff2)
                format("woff2");
              unicode-range: U+0951-0952, U+0964-0965, U+0A01-0A76, U+200C-200D,
                U+20B9, U+25CC, U+262C, U+A830-A839;
            }
            @font-face {
              font-family: "Google Sans";
              font-style: normal;
              font-weight: 400;
              src: url(https://fonts.gstatic.com/s/googlesans/v58/4UasrENHsxJlGDuGo1OIlJfC6l_24rlCK1Yo_Iqcsih3SAyH6cAwhX9RPjAUvaYr.woff2)
                format("woff2");
              unicode-range: U+0590-05FF, U+200C-2010, U+20AA, U+25CC, U+FB1D-FB4F;
            }
            @font-face {
              font-family: "Google Sans";
              font-style: normal;
              font-weight: 400;
              src: url(https://fonts.gstatic.com/s/googlesans/v58/4UasrENHsxJlGDuGo1OIlJfC6l_24rlCK1Yo_Iqcsih3SAyH6cAwhX9RPjkUvaYr.woff2)
                format("woff2");
              unicode-range: U+1780-17FF, U+19E0-19FF, U+200C-200D, U+25CC;
            }
            @font-face {
              font-family: "Google Sans";
              font-style: normal;
              font-weight: 400;
              src: url(https://fonts.gstatic.com/s/googlesans/v58/4UasrENHsxJlGDuGo1OIlJfC6l_24rlCK1Yo_Iqcsih3SAyH6cAwhX9RPjsUvaYr.woff2)
                format("woff2");
              unicode-range: U+0E81-0EDF, U+200C-200D, U+25CC;
            }
            @font-face {
              font-family: "Google Sans";
              font-style: normal;
              font-weight: 400;
              src: url(https://fonts.gstatic.com/s/googlesans/v58/4UasrENHsxJlGDuGo1OIlJfC6l_24rlCK1Yo_Iqcsih3SAyH6cAwhX9RPisUvaYr.woff2)
                format("woff2");
              unicode-range: U+0951-0952, U+0964-0965, U+0B01-0B77, U+1CDA, U+1CF2,
                U+200C-200D, U+20B9, U+25CC;
            }
            @font-face {
              font-family: "Google Sans";
              font-style: normal;
              font-weight: 400;
              src: url(https://fonts.gstatic.com/s/googlesans/v58/4UasrENHsxJlGDuGo1OIlJfC6l_24rlCK1Yo_Iqcsih3SAyH6cAwhX9RPi8UvaYr.woff2)
                format("woff2");
              unicode-range: U+0964-0965, U+0D81-0DF4, U+1CF2, U+200C-200D, U+25CC,
                U+111E1-111F4;
            }
            @font-face {
              font-family: "Google Sans";
              font-style: normal;
              font-weight: 400;
              src: url(https://fonts.gstatic.com/s/googlesans/v58/4UasrENHsxJlGDuGo1OIlJfC6l_24rlCK1Yo_Iqcsih3SAyH6cAwhX9RPiQUvaYr.woff2)
                format("woff2");
              unicode-range: U+0964-0965, U+0B82-0BFA, U+200C-200D, U+20B9, U+25CC;
            }
            @font-face {
              font-family: "Google Sans";
              font-style: normal;
              font-weight: 400;
              src: url(https://fonts.gstatic.com/s/googlesans/v58/4UasrENHsxJlGDuGo1OIlJfC6l_24rlCK1Yo_Iqcsih3SAyH6cAwhX9RPi4UvaYr.woff2)
                format("woff2");
              unicode-range: U+0951-0952, U+0964-0965, U+0C00-0C7F, U+1CDA, U+1CF2,
                U+200C-200D, U+25CC;
            }
            @font-face {
              font-family: "Google Sans";
              font-style: normal;
              font-weight: 400;
              src: url(https://fonts.gstatic.com/s/googlesans/v58/4UasrENHsxJlGDuGo1OIlJfC6l_24rlCK1Yo_Iqcsih3SAyH6cAwhX9RPiYUvaYr.woff2)
                format("woff2");
              unicode-range: U+0E01-0E5B, U+200C-200D, U+25CC;
            }
            @font-face {
              font-family: "Google Sans";
              font-style: normal;
              font-weight: 400;
              src: url(https://fonts.gstatic.com/s/googlesans/v58/4UasrENHsxJlGDuGo1OIlJfC6l_24rlCK1Yo_Iqcsih3SAyH6cAwhX9RPj0UvaYr.woff2)
                format("woff2");
              unicode-range: U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169,
                U+01A0-01A1, U+01AF-01B0, U+0300-0301, U+0303-0304, U+0308-0309,
                U+0323, U+0329, U+1EA0-1EF9, U+20AB;
            }
            @font-face {
              font-family: "Google Sans";
              font-style: normal;
              font-weight: 400;
              src: url(https://fonts.gstatic.com/s/googlesans/v58/4UasrENHsxJlGDuGo1OIlJfC6l_24rlCK1Yo_Iqcsih3SAyH6cAwhX9RPjwUvaYr.woff2)
                format("woff2");
              unicode-range: U+0100-02AF, U+0304, U+0308, U+0329, U+1E00-1E9F,
                U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C0, U+2113, U+2C60-2C7F,
                U+A720-A7FF;
            }
            @font-face {
              font-family: "Google Sans";
              font-style: normal;
              font-weight: 400;
              src: url(https://fonts.gstatic.com/s/googlesans/v58/4UasrENHsxJlGDuGo1OIlJfC6l_24rlCK1Yo_Iqcsih3SAyH6cAwhX9RPjIUvQ.woff2)
                format("woff2");
              unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6,
                U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+2074, U+20AC,
                U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
            }
            @font-face {
              font-family: "Google Sans";
              font-style: normal;
              font-weight: 500;
              src: url(https://fonts.gstatic.com/s/googlesans/v58/4UasrENHsxJlGDuGo1OIlJfC6l_24rlCK1Yo_Iqcsih3SAyH6cAwhX9RPiIUvaYr.woff2)
                format("woff2");
              unicode-range: U+0308, U+0530-058F, U+2010, U+2024, U+25CC, U+FB13-FB17;
            }
            @font-face {
              font-family: "Google Sans";
              font-style: normal;
              font-weight: 500;
              src: url(https://fonts.gstatic.com/s/googlesans/v58/4UasrENHsxJlGDuGo1OIlJfC6l_24rlCK1Yo_Iqcsih3SAyH6cAwhX9RPiAUvaYr.woff2)
                format("woff2");
              unicode-range: U+0951-0952, U+0964-0965, U+0980-09FE, U+1CD0, U+1CD2,
                U+1CD5-1CD6, U+1CD8, U+1CE1, U+1CEA, U+1CED, U+1CF2, U+1CF5-1CF7,
                U+200C-200D, U+20B9, U+25CC, U+A8F1;
            }
            @font-face {
              font-family: "Google Sans";
              font-style: normal;
              font-weight: 500;
              src: url(https://fonts.gstatic.com/s/googlesans/v58/4UasrENHsxJlGDuGo1OIlJfC6l_24rlCK1Yo_Iqcsih3SAyH6cAwhX9RPj8UvaYr.woff2)
                format("woff2");
              unicode-range: U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF,
                U+A640-A69F, U+FE2E-FE2F;
            }
            @font-face {
              font-family: "Google Sans";
              font-style: normal;
              font-weight: 500;
              src: url(https://fonts.gstatic.com/s/googlesans/v58/4UasrENHsxJlGDuGo1OIlJfC6l_24rlCK1Yo_Iqcsih3SAyH6cAwhX9RPjYUvaYr.woff2)
                format("woff2");
              unicode-range: U+0301, U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;
            }
            @font-face {
              font-family: "Google Sans";
              font-style: normal;
              font-weight: 500;
              src: url(https://fonts.gstatic.com/s/googlesans/v58/4UasrENHsxJlGDuGo1OIlJfC6l_24rlCK1Yo_Iqcsih3SAyH6cAwhX9RPjMUvaYr.woff2)
                format("woff2");
              unicode-range: U+0900-097F, U+1CD0-1CF9, U+200C-200D, U+20A8, U+20B9,
                U+20F0, U+25CC, U+A830-A839, U+A8E0-A8FF, U+11B00-11B09;
            }
            @font-face {
              font-family: "Google Sans";
              font-style: normal;
              font-weight: 500;
              src: url(https://fonts.gstatic.com/s/googlesans/v58/4UasrENHsxJlGDuGo1OIlJfC6l_24rlCK1Yo_Iqcsih3SAyH6cAwhX9RPiMUvaYr.woff2)
                format("woff2");
              unicode-range: U+1200-1399, U+2D80-2DDE, U+AB01-AB2E, U+1E7E0-1E7E6,
                U+1E7E8-1E7EB, U+1E7ED-1E7EE, U+1E7F0-1E7FE;
            }
            @font-face {
              font-family: "Google Sans";
              font-style: normal;
              font-weight: 500;
              src: url(https://fonts.gstatic.com/s/googlesans/v58/4UasrENHsxJlGDuGo1OIlJfC6l_24rlCK1Yo_Iqcsih3SAyH6cAwhX9RPi0UvaYr.woff2)
                format("woff2");
              unicode-range: U+0589, U+10A0-10FF, U+1C90-1CBA, U+1CBD-1CBF,
                U+2D00-2D2F;
            }
            @font-face {
              font-family: "Google Sans";
              font-style: normal;
              font-weight: 500;
              src: url(https://fonts.gstatic.com/s/googlesans/v58/4UasrENHsxJlGDuGo1OIlJfC6l_24rlCK1Yo_Iqcsih3SAyH6cAwhX9RPjEUvaYr.woff2)
                format("woff2");
              unicode-range: U+0370-0377, U+037A-037F, U+0384-038A, U+038C,
                U+038E-03A1, U+03A3-03FF;
            }
            @font-face {
              font-family: "Google Sans";
              font-style: normal;
              font-weight: 500;
              src: url(https://fonts.gstatic.com/s/googlesans/v58/4UasrENHsxJlGDuGo1OIlJfC6l_24rlCK1Yo_Iqcsih3SAyH6cAwhX9RPikUvaYr.woff2)
                format("woff2");
              unicode-range: U+0951-0952, U+0964-0965, U+0A80-0AFF, U+200C-200D,
                U+20B9, U+25CC, U+A830-A839;
            }
            @font-face {
              font-family: "Google Sans";
              font-style: normal;
              font-weight: 500;
              src: url(https://fonts.gstatic.com/s/googlesans/v58/4UasrENHsxJlGDuGo1OIlJfC6l_24rlCK1Yo_Iqcsih3SAyH6cAwhX9RPhEUvaYr.woff2)
                format("woff2");
              unicode-range: U+0951-0952, U+0964-0965, U+0A01-0A76, U+200C-200D,
                U+20B9, U+25CC, U+262C, U+A830-A839;
            }
            @font-face {
              font-family: "Google Sans";
              font-style: normal;
              font-weight: 500;
              src: url(https://fonts.gstatic.com/s/googlesans/v58/4UasrENHsxJlGDuGo1OIlJfC6l_24rlCK1Yo_Iqcsih3SAyH6cAwhX9RPjAUvaYr.woff2)
                format("woff2");
              unicode-range: U+0590-05FF, U+200C-2010, U+20AA, U+25CC, U+FB1D-FB4F;
            }
            @font-face {
              font-family: "Google Sans";
              font-style: normal;
              font-weight: 500;
              src: url(https://fonts.gstatic.com/s/googlesans/v58/4UasrENHsxJlGDuGo1OIlJfC6l_24rlCK1Yo_Iqcsih3SAyH6cAwhX9RPjkUvaYr.woff2)
                format("woff2");
              unicode-range: U+1780-17FF, U+19E0-19FF, U+200C-200D, U+25CC;
            }
            @font-face {
              font-family: "Google Sans";
              font-style: normal;
              font-weight: 500;
              src: url(https://fonts.gstatic.com/s/googlesans/v58/4UasrENHsxJlGDuGo1OIlJfC6l_24rlCK1Yo_Iqcsih3SAyH6cAwhX9RPjsUvaYr.woff2)
                format("woff2");
              unicode-range: U+0E81-0EDF, U+200C-200D, U+25CC;
            }
            @font-face {
              font-family: "Google Sans";
              font-style: normal;
              font-weight: 500;
              src: url(https://fonts.gstatic.com/s/googlesans/v58/4UasrENHsxJlGDuGo1OIlJfC6l_24rlCK1Yo_Iqcsih3SAyH6cAwhX9RPisUvaYr.woff2)
                format("woff2");
              unicode-range: U+0951-0952, U+0964-0965, U+0B01-0B77, U+1CDA, U+1CF2,
                U+200C-200D, U+20B9, U+25CC;
            }
            @font-face {
              font-family: "Google Sans";
              font-style: normal;
              font-weight: 500;
              src: url(https://fonts.gstatic.com/s/googlesans/v58/4UasrENHsxJlGDuGo1OIlJfC6l_24rlCK1Yo_Iqcsih3SAyH6cAwhX9RPi8UvaYr.woff2)
                format("woff2");
              unicode-range: U+0964-0965, U+0D81-0DF4, U+1CF2, U+200C-200D, U+25CC,
                U+111E1-111F4;
            }
            @font-face {
              font-family: "Google Sans";
              font-style: normal;
              font-weight: 500;
              src: url(https://fonts.gstatic.com/s/googlesans/v58/4UasrENHsxJlGDuGo1OIlJfC6l_24rlCK1Yo_Iqcsih3SAyH6cAwhX9RPiQUvaYr.woff2)
                format("woff2");
              unicode-range: U+0964-0965, U+0B82-0BFA, U+200C-200D, U+20B9, U+25CC;
            }
            @font-face {
              font-family: "Google Sans";
              font-style: normal;
              font-weight: 500;
              src: url(https://fonts.gstatic.com/s/googlesans/v58/4UasrENHsxJlGDuGo1OIlJfC6l_24rlCK1Yo_Iqcsih3SAyH6cAwhX9RPi4UvaYr.woff2)
                format("woff2");
              unicode-range: U+0951-0952, U+0964-0965, U+0C00-0C7F, U+1CDA, U+1CF2,
                U+200C-200D, U+25CC;
            }
            @font-face {
              font-family: "Google Sans";
              font-style: normal;
              font-weight: 500;
              src: url(https://fonts.gstatic.com/s/googlesans/v58/4UasrENHsxJlGDuGo1OIlJfC6l_24rlCK1Yo_Iqcsih3SAyH6cAwhX9RPiYUvaYr.woff2)
                format("woff2");
              unicode-range: U+0E01-0E5B, U+200C-200D, U+25CC;
            }
            @font-face {
              font-family: "Google Sans";
              font-style: normal;
              font-weight: 500;
              src: url(https://fonts.gstatic.com/s/googlesans/v58/4UasrENHsxJlGDuGo1OIlJfC6l_24rlCK1Yo_Iqcsih3SAyH6cAwhX9RPj0UvaYr.woff2)
                format("woff2");
              unicode-range: U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169,
                U+01A0-01A1, U+01AF-01B0, U+0300-0301, U+0303-0304, U+0308-0309,
                U+0323, U+0329, U+1EA0-1EF9, U+20AB;
            }
            @font-face {
              font-family: "Google Sans";
              font-style: normal;
              font-weight: 500;
              src: url(https://fonts.gstatic.com/s/googlesans/v58/4UasrENHsxJlGDuGo1OIlJfC6l_24rlCK1Yo_Iqcsih3SAyH6cAwhX9RPjwUvaYr.woff2)
                format("woff2");
              unicode-range: U+0100-02AF, U+0304, U+0308, U+0329, U+1E00-1E9F,
                U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C0, U+2113, U+2C60-2C7F,
                U+A720-A7FF;
            }
            @font-face {
              font-family: "Google Sans";
              font-style: normal;
              font-weight: 500;
              src: url(https://fonts.gstatic.com/s/googlesans/v58/4UasrENHsxJlGDuGo1OIlJfC6l_24rlCK1Yo_Iqcsih3SAyH6cAwhX9RPjIUvQ.woff2)
                format("woff2");
              unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6,
                U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+2074, U+20AC,
                U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
            }
            body {
              direction: initial;
              font: small/1.5 Arial, Helvetica, sans-serif;
              font-size: 0.875rem;
              color: #222;
              background: #f6f8fc;
              font-family: "Google Sans", Roboto, RobotoDraft, Helvetica, Arial,
                sans-serif;
            }
            .h7:first-child > .Bk > .G2 {
              border-top: none;
            }
      
            body {
              margin: 0;
              width: 100%;
              height: 100%;
            }
      
            body {
              font-family: arial, sans-serif;
            }
      
            body {
              height: 100%;
              width: 100%;
              overflow: hidden;
            }
      
            body {
              font-family: "Google Sans", Roboto, RobotoDraft, Helvetica, Arial,
                sans-serif;
            }
      
            body {
              margin: 0;
            }
      
            body {
              color: #202124;
            }
      
            html {
              margin: 0;
              height: 100%;
              width: 100%;
              overflow: hidden;
            }
      
            .m_2997542426849713084container {
              max-width: 600px;
              margin: 20px auto;
              background-color: #ffffff;
              border-radius: 8px;
              overflow: hidden;
            }
      
            .m_2997542426849713084header {
              background-color: #2c3e50;
              padding: 20px;
              text-align: center;
              color: #ffffff;
            }
      
            .m_2997542426849713084divider {
              height: 1px;
              background-color: #ecf0f1;
              margin: 20px 0;
            }
      
            .m_2997542426849713084footer {
              text-align: center;
              padding: 20px;
              background-color: #ecf0f1;
            }
      
            .m_2997542426849713084logo {
              display: block;
              margin: 0 auto;
              width: 80px;
            }
      
            .msg2997542426849713084 h1 {
              color: white;
              font-weight: 500;
              margin: 20px 0;
              font-size: 28px;
            }
      
            .msg2997542426849713084 p {
              color: #7f8c8d;
              font-size: 16px;
              line-height: 1.6;
              margin: 0 20px;
            }
      
            .m_2997542426849713084otp {
              background: red;
              padding: 5px 15px 5px 15px;
              font-size: 20px;
              font-weight: bold;
              border-radius: 20px;
              color: white;
              background-color: #2c3e50;
            }
      
            .m_2997542426849713084footer-text {
              font-size: 14px;
              color: #95a5a6;
              margin: 0;
            }
      
            a {
              color: #222;
            }
      
            a[href] {
              color: #15c;
            }
          </style>
        </head>
        <body>
          <div class="m_2997542426849713084container snipcss-Cistb">
            <div class="m_2997542426849713084header">
              <img
                class="m_2997542426849713084logo CToWUd"
                src="https://ci3.googleusercontent.com/meips/ADKq_NbhTJvKBb23wgYieOLt1bw3fGy-sAyh6h0vq_xs_qYpW0cCUhCntBpk5-Xk0Se9cW3ZJBWaZ4v1rV6IvxFxsVStQYWIOvE71r4pIjx5eyU=s0-d-e1-ft#https://cdn-icons-png.flaticon.com/128/10002/10002041.png"
                title="logo"
                alt="logo"
                data-bit="iit"
              />
              <h1>EMAIL OTP</h1>
            </div>
            <div class="m_2997542426849713084divider"></div>
            <center>
              <p>Your requested OTP for <b>Email OTP</b></p>
              <br />
              <span class="m_2997542426849713084otp">${otp}</span>
            </center>
            <div class="m_2997542426849713084divider"></div>
            <div class="m_2997542426849713084footer">
              <p class="m_2997542426849713084footer-text">
                ©
                <strong
                  ><a
                    href="http://www.rohitchouhan.com"
                    target="_blank"
                    data-saferedirecturl="https://www.google.com/url?q=http://www.rohitchouhan.com&amp;source=gmail&amp;ust=1716876339537000&amp;usg=AOvVaw1nJYsxJ5VsZTY-L6biXkS4"
                    >www.rohitchouhan.com</a
                  ></strong
                >
              </p>
              <div class="yj6qo"></div>
              <div class="adL"></div>
            </div>
            <div class="adL"></div>
          </div>
        </body>
      </html>
      `,
  }

  transporter.sendMail(mailOptions,function (error,info){
      if(error){
          return callback(error);
      }
      else{
          return callback(null, info.response);
      }
  });
}


module.exports = {
    sendOtp,
    verifyOTP
}


