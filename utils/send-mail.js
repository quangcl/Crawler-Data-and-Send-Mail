const nodemailer = require('nodemailer');
const mailConfig = require('../config/mail.config');
const sendMail = {
    initialize: async (info, data) => {
        const template = `
        <!DOCTYPE html>
        <html lang="en">

        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
                integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
            <title>Send Mail</title>
        </head>

        <body>
            <table
                class="table table-condensed kqcenter kqvertimarginw table-kq-border table-kq-hover-div table-bordered kqbackground table-kq-bold-border tb-phoi-border watermark table-striped"
                id="result_tab_mb" style="text-align: center; border: 4px solid #a3b6ca;">
                <thead>
                    <tr class="title_row">
                        <td class="color333" colspan="2">
                            <div class="col-sm-10">
                                <div class="col-sm-10">
                                    <span class=" chu15" id="result_date">Xin chào <span style="color: green">${info.name}</span>,
                                        đây là kết quả xsmb <b>Thứ tư ngày ${info.date}</b></span>

                                </div>
                        </td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td class="hover" style="width:16%;vertical-align:middle;font-size:16px;">Ký tự</td>
                        <td style="padding: 0;" class="hover">
                            <div class="row-no-gutters text-center">
                                <div id="rs_8_0" style="width:100%; position: relative; float: left;"
                                    class="phoi-size chu18 gray need_blank hover" rs_len="4" data-pattern="[0-9]{1,2}[A-Z]{2}"
                                    data-sofar="6ZX-15ZX-3ZX-2ZX-4ZX-7ZX" data-rolling-special="1" data-group-count="6">
                                    ${data.ki_tu}</div>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td class="hover" style="width:16%;vertical-align:middle;font-size:16px;color:red;">Đặc biệt</td>
                        <td style="padding: 0;" class="">
                            <div class="row-no-gutters text-center">
                                <div id="rs_0_0" style="width:100%; position: relative; float: left; color: red"
                                    class="phoi-size chu22 gray need_blank vietdam phoi-size chu30 maudo stop-reload hover"
                                    rs_len="5" data-pattern="[0-9]{5}" data-sofar="61639">${data.dac_biet}</div>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td class="hover" style="width:16%;vertical-align:middle;font-size:16px;">Giải nhất</td>
                        <td style="padding: 0;" class="">
                            <div class="row-no-gutters text-center">
                                <div id="rs_1_0" style="width:100%; position: relative; float: left;"
                                    class="phoi-size chu22 gray need_blank vietdam hover" rs_len="5" data-pattern="[0-9]{5}"
                                    data-sofar="24142">${data.giai_nhat}</div>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td class="hover" style="width:16%;vertical-align:middle;font-size:16px;">Giải nhì</td>
                        <td style="padding: 0;" class="">
                            <div class="row-no-gutters text-center">
                                <div id="rs_2_0" style="width:50%; position: relative; float: left;"
                                    class="phoi-size chu22 gray need_blank vietdam border-right hover" rs_len="5"
                                    data-pattern="[0-9]{5}" data-sofar="11092">${data.giai_hai[0]}</div>
                                <div id="rs_2_1" style="width:50%; position: relative; float: left;"
                                    class="phoi-size chu22 gray need_blank vietdam hover" rs_len="5" data-pattern="[0-9]{5}"
                                    data-sofar="41976">${data.giai_hai[1]}</div>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td class="hover" style="width:16%;vertical-align:middle;font-size:16px;">Giải ba</td>
                        <td style="padding: 0;" class="">
                            <div class="row-no-gutters text-center">
                                <div id="rs_3_0" style="width:33.333333333333%; position: relative; float: left;"
                                    class="phoi-size chu22 gray need_blank vietdam border-bottom border-right hover" rs_len="5"
                                    data-pattern="[0-9]{5}" data-sofar="73798">${data.giai_ba[0]}</div>
                                <div id="rs_3_1" style="width:33.333333333333%; position: relative; float: left;"
                                    class="phoi-size chu22 gray need_blank vietdam border-bottom border-right hover" rs_len="5"
                                    data-pattern="[0-9]{5}" data-sofar="27267">${data.giai_ba[1]}</div>
                                <div id="rs_3_2" style="width:33.333333333333%; position: relative; float: left;"
                                    class="phoi-size chu22 gray need_blank vietdam border-bottom hover" rs_len="5"
                                    data-pattern="[0-9]{5}" data-sofar="11136">${data.giai_ba[2]}</div>
                                <div id="rs_3_3" style="width:33.333333333333%; position: relative; float: left;"
                                    class="phoi-size chu22 gray need_blank vietdam border-right hover" rs_len="5"
                                    data-pattern="[0-9]{5}" data-sofar="91454">${data.giai_ba[3]}</div>
                                <div id="rs_3_4" style="width:33.333333333333%; position: relative; float: left;"
                                    class="phoi-size chu22 gray need_blank vietdam border-right hover" rs_len="5"
                                    data-pattern="[0-9]{5}" data-sofar="79233">${data.giai_ba[4]}</div>
                                <div id="rs_3_5" style="width:33.333333333333%; position: relative; float: left;"
                                    class="phoi-size chu22 gray need_blank vietdam hover" rs_len="5" data-pattern="[0-9]{5}"
                                    data-sofar="80885">${data.giai_ba[5]}</div>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td class="hover" style="width:16%;vertical-align:middle;font-size:16px;">Giải tư</td>
                        <td style="padding: 0;" class="">
                            <div class="row-no-gutters text-center">
                                <div id="rs_4_0" style="width:25%; position: relative; float: left;"
                                    class="phoi-size chu22 gray need_blank vietdam border-right hover" rs_len="4"
                                    data-pattern="[0-9]{4}" data-sofar="4006">${data.giai_tu[0]}</div>
                                <div id="rs_4_1" style="width:25%; position: relative; float: left;"
                                    class="phoi-size chu22 gray need_blank vietdam border-right hover" rs_len="4"
                                    data-pattern="[0-9]{4}" data-sofar="6559">${data.giai_tu[1]}</div>
                                <div id="rs_4_2" style="width:25%; position: relative; float: left;"
                                    class="phoi-size chu22 gray need_blank vietdam border-right hover" rs_len="4"
                                    data-pattern="[0-9]{4}" data-sofar="1777">${data.giai_tu[2]}</div>
                                <div id="rs_4_3" style="width:25%; position: relative; float: left;"
                                    class="phoi-size chu22 gray need_blank vietdam hover" rs_len="4" data-pattern="[0-9]{4}"
                                    data-sofar="6720">${data.giai_tu[3]}</div>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td class="hover" style="width:16%;vertical-align:middle;font-size:16px;">Giải năm</td>
                        <td style="padding: 0;" class="">
                            <div class="row-no-gutters text-center">
                                <div id="rs_5_0" style="width:33.333333333333%; position: relative; float: left;"
                                    class="phoi-size chu22 gray need_blank vietdam border-bottom border-right hover" rs_len="4"
                                    data-pattern="[0-9]{4}" data-sofar="3099">${data.giai_nam[0]}</div>
                                <div id="rs_5_1" style="width:33.333333333333%; position: relative; float: left;"
                                    class="phoi-size chu22 gray need_blank vietdam border-bottom border-right hover" rs_len="4"
                                    data-pattern="[0-9]{4}" data-sofar="9110">${data.giai_nam[1]}</div>
                                <div id="rs_5_2" style="width:33.333333333333%; position: relative; float: left;"
                                    class="phoi-size chu22 gray need_blank vietdam border-bottom hover" rs_len="4"
                                    data-pattern="[0-9]{4}" data-sofar="5717">${data.giai_nam[2]}</div>
                                <div id="rs_5_3" style="width:33.333333333333%; position: relative; float: left;"
                                    class="phoi-size chu22 gray need_blank vietdam border-right hover" rs_len="4"
                                    data-pattern="[0-9]{4}" data-sofar="8799">${data.giai_nam[3]}</div>
                                <div id="rs_5_4" style="width:33.333333333333%; position: relative; float: left;"
                                    class="phoi-size chu22 gray need_blank vietdam border-right hover" rs_len="4"
                                    data-pattern="[0-9]{4}" data-sofar="9924">${data.giai_nam[4]}</div>
                                <div id="rs_5_5" style="width:33.333333333333%; position: relative; float: left;"
                                    class="phoi-size chu22 gray need_blank vietdam hover" rs_len="4" data-pattern="[0-9]{4}"
                                    data-sofar="7762">${data.giai_nam[5]}</div>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td class="hover" style="width:16%;vertical-align:middle;font-size:16px;">Giải sáu</td>
                        <td style="padding: 0;" class="">
                            <div class="row-no-gutters text-center">
                                <div id="rs_6_0" style="width:33.333333333333%; position: relative; float: left;"
                                    class="phoi-size chu22 gray need_blank vietdam border-right hover" rs_len="3"
                                    data-pattern="[0-9]{3}" data-sofar="993">${data.giai_sau[0]}</div>
                                <div id="rs_6_1" style="width:33.333333333333%; position: relative; float: left;"
                                    class="phoi-size chu22 gray need_blank vietdam border-right hover" rs_len="3"
                                    data-pattern="[0-9]{3}" data-sofar="311">${data.giai_sau[1]}</div>
                                <div id="rs_6_2" style="width:33.333333333333%; position: relative; float: left;"
                                    class="phoi-size chu22 gray need_blank vietdam hover" rs_len="3" data-pattern="[0-9]{3}"
                                    data-sofar="470">${data.giai_sau[2]}</div>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td class="hover" style="width:16%;vertical-align:middle;font-size:16px;">Giải bảy</td>
                        <td style="padding: 0;" class="">
                            <div class="row-no-gutters text-center">
                                <div id="rs_7_0" style="width:25%; position: relative; float: left;"
                                    class="phoi-size chu22 gray need_blank vietdam border-right hover" rs_len="2"
                                    data-pattern="[0-9]{2}" data-sofar="94">${data.giai_bay[0]}</div>
                                <div id="rs_7_1" style="width:25%; position: relative; float: left;"
                                    class="phoi-size chu22 gray need_blank vietdam border-right hover" rs_len="2"
                                    data-pattern="[0-9]{2}" data-sofar="75">${data.giai_bay[1]}</div>
                                <div id="rs_7_2" style="width:25%; position: relative; float: left;"
                                    class="phoi-size chu22 gray need_blank vietdam border-right hover" rs_len="2"
                                    data-pattern="[0-9]{2}" data-sofar="42">${data.giai_bay[2]}</div>
                                <div id="rs_7_3" style="width:25%; position: relative; float: left;"
                                    class="phoi-size chu22 gray need_blank vietdam hover" rs_len="2" data-pattern="[0-9]{2}"
                                    data-sofar="95">${data.giai_bay[3]}</div>
                            </div>
                        </td>
                    </tr>
                    <tr>
                    </tr>
                </tbody>
            </table>
        </body>

        </html>
        `

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            secure: false,//true
            port: 25,//465
            auth: {
            user: mailConfig.user,
            pass: mailConfig.pass
            },
            tls: {
                rejectUnauthorized: false
            },
        });
        const mailOptions = {
            from: mailConfig.user,
            to: info.email,
            subject: `Kết quả xsmb ngày ${info.date}`,
            html: template
        };
        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
            console.log(error);
            } else {
            console.log('Email sent: ' + info.response);
            }
        });
    }
};
module.exports = sendMail;