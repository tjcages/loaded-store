// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// require("dotenv").config();

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).send({ message: 'Only POST requests allowed' })
    return
  }

  try {
    const response = await fetch(
      `${process.env.API_ROUTE}/subscribeToUpdates`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(req.body),
      }
    )
    const json = await response.json()
    if (json.status == 'success') {
      res.status(200).send({ message: 'Subscribed to updates' })
      return
    } else {
      res.status(500).send({ message: 'Error subscribing to updates', json })
      return
    }
  } catch (error) {
    res.status(500).send({ message: 'Error subscribing to updates', error })
    return
  }
}
