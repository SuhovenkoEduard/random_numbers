const submitButton = document.querySelector('.button')
const numberInput = document.querySelector('.input')
const guessResult = document.querySelector('.guess-result')
const restartButton = document.querySelector('.restart-button')

submitButton.addEventListener('click', async (event) => {
  event.preventDefault()
  if (numberInput.value === '') {
    return
  }
  const response = await fetch(location.href, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ guessNumber: +numberInput.value }),
  })
  const json = await response.json()
  const { message } = json
  guessResult.textContent = message
  guessResult.style.backgroundColor = message === 'Success' ? 'green' : 'red'
  numberInput.disabled = true
  restartButton.hidden = false
  submitButton.hidden = true
  restartButton.focus()
  console.log({ message })
})

restartButton.addEventListener('click', () => {
  guessResult.textContent = ''
  guessResult.style.backgroundColor = 'yellow'
  numberInput.value = ''
  numberInput.disabled = false
  submitButton.hidden = false
  restartButton.hidden = true
  numberInput.focus()
})
