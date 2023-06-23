import cron from 'node-cron'
import{ sendWelcomeEmail } from './EmailServices/welcome'
import { sendPreferredEmail } from './EmailServices/preferred'

// cron.schedule(' */2 * * * * *' , async () => {
//     await sendWelcomeEmail()
// })

// cron.schedule(' */2 * * * * *' , async () => {
//     await sendPreferredEmail()
// })