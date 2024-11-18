
import nodemailer from 'nodemailer'

export const transporter =  nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, 
    auth: {
      user: "rabbilkhan125@gmail.com",
      pass: "dhca wfxx duks faic",
    },
  });


  // const SendEmail = async() =>{

  //   try{
        
  //   const info = await  transporter.sendMail({
  //           from: '"Rabbil khan" <rabbilkhan125@gmail.com>',
  //           to: 'rabbilkhan163@gmail.com',
  //           subject: 'Message',
  //           text: 'I hope this message gets delivered!',
  //           html: '<b> Hello World? </b>',
  //         });
  //         console.log(info);


  //   }catch(error){
  //       console.log(error)
  //   }
    
  // }
  // SendEmail()



  