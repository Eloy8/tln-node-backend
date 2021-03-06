const {
  calculateTip,
  fahrenheitToCelsius,
  celsiusToFahrenheit,
  add
} = require('../src/math')

// CALCULATE TIPS

test('Should calculate total with tip', () => {
  const total = calculateTip(10, .3)
  expect(total).toBe(13)
})

test('Should calculate total with default tip', () => {
  const total = calculateTip(10)
  expect(total).toBe(12.5)
})

// CALCULATE TEMPERATURES

test('Should convert 32 F to 0 C', () => {
  const celsius = fahrenheitToCelsius(32)
  expect(celsius).toBe(0)
})

test('Should convert 0 C to 32 F', () => {
  const fahrenheit = celsiusToFahrenheit(0)
  expect(fahrenheit).toBe(32)
})

// ASYNC TEST, Done in the parameter must be called before the test is success!
// Jest has a timeout after 5000ms, so dont even think of it!

// test('Async test demo', (done) => {
//   setTimeout(() => {
//     expect(1).toBe(1)
//     done()
//   }, 4995)
// })

test('Should add two numbers', (done) => {
  add(2, 3).then((sum) => {
    expect(sum).toBe(5)
    done()
  })
})

test('Should add two numbers async/await', async () => {
  const sum = await add(10, 22)
  expect(sum).toBe(32)
})
