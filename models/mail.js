const nodemailer = require("nodemailer");

const mail = {
    correo: process.env.CORREO,
    password: process.env.CORREO_PASS
}

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: mail.correo, // generated ethereal user
      pass: mail.password, // generated ethereal password
    },
  });

  // send mail with defined transport object
const enviarMail = async (correoDestino='', pass = '') => {
    console.log(mail)
    try{
    await transporter.sendMail({
        from: `"Escuela" <${process.env.CORREO}>`, // sender address
        to: correoDestino, // list of receivers
        subject: "Hello ✔", // Subject line
        text: "Registro Satisfactorio", // plain text body
        html: `<b>Bienbenido a la escuela</b>
        <h1> Su contraseña es: ${pass}</h1> <br> <p>se recomienda se modifique cuanto antes</p>`, // html body
      });

      console.log('mail enviado')
    }catch(err){
        console.log(err)
    }

}

module.exports = {
    enviarMail
}