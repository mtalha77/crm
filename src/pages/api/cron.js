export default function handler(req, res) {
  console.log('Cron job handler called')
  console.log('hunfajalil')

  res.status(200).end('Hello Cron!')
}
