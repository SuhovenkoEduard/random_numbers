import express from 'express'

const SERVER_PORT = 3000
const INTERVAL_DURATION = 10 * 1000

const LOG = (name: string, number: number) => console.log(`${name}: ${number}`)

const generateRandomNumber = () => {
  const randomNumber = Math.floor(Math.random() * 10 + 1)
  LOG('New randomNumber', randomNumber)
  return randomNumber
}

const regenerateNumber = (currentNumber: { number: number }) => currentNumber.number = generateRandomNumber()

const currentNumber: {
  number: null | number
} = { number: null }

const interval = {
  intervalId: 0,
  startInterval() {
    currentNumber.number = generateRandomNumber()
    this.intervalId = setInterval(() => regenerateNumber(currentNumber), INTERVAL_DURATION)
  },
  stopInterval() {
    clearInterval(this.intervalId)
  },
  restartInterval() {
    this.stopInterval()
    this.startInterval()
  },
}

const app = express()

app.use(express.json())
app.use(express.static('public'))

app.post('/', (request: express.Request, response: express.Response) => {
  const { guessNumber } = request.body
  LOG('GuessNumber', guessNumber)
  const message = guessNumber === currentNumber.number ? 'Success' : 'Failure'
  if (guessNumber === currentNumber.number) {
    interval.restartInterval()
  }
  response.send(JSON.stringify({ message }))
})

app.listen(3000, () => {
  console.log(`Server is listening on port ${SERVER_PORT}`)
  interval.startInterval()
})
