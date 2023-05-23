import express,{json} from 'express'
import cron from 'node-cron'
import { sendWelcomeEmail } from './Emails/welcomeEmail'
import { resetPasswordEmail } from './Emails/resetEmail'
const app =  express()
app.use(json())

cron.schedule('*/5 * * * * *', async() => {
    await sendWelcomeEmail()
    await resetPasswordEmail()
  });

app.listen(6000,()=>console.log("running..."))