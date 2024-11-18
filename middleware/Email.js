import { Verification_Email_Template, Welcome_Email_Template } from "../utils/EmailTemplate.js";
import { transporter } from "./Email.config.js";


export const SendVerificationCode = async(email, verificationCode)=>{

    try {
        
        const emailHtml = Verification_Email_Template.replace(/{verificationCode}/g, verificationCode);

        // console.log("Prepared Email HTML:", emailHtml);
        const response = await  transporter.sendMail({
            from: '"Rabbil khan" <rabbilkhan125@gmail.com>',
            to: email,
            subject: 'Verify your Email',
            text: 'Verify your Email',
            html:emailHtml
          },);

          console.log("Email send successfully", response)
    } catch (error) {
        console.log("Email error")
    }
}


export const WelcomeEmail = async(email, username)=>{

    try {
        
        const welcomeHtml = Welcome_Email_Template.replace(/{username}/g, username);

        // console.log("Prepared Email HTML:", emailHtml);
        const response = await  transporter.sendMail({
            from: '"Rabbil khan" <rabbilkhan125@gmail.com>',
            to: email,
            subject: 'Welcome Email',
            text: 'Welcome Email',
            html:welcomeHtml
          },);

          console.log("Email send successfully", response)
    } catch (error) {
        console.log("Email error")
    }
}