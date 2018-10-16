// import '@babel/polyfill'
const elements = [1, 2, 3].map(item => {
  console.log('foobar'.includes('foo'))
  return console.log('9999')
})

console.log(elements)

async function azumia() {
  console.log('begin')
  await new Promise(resolve => {
    setTimeout(() => {
      resolve()
    }, 1000)
  })
  console.log('done')
}
azumia()

console.log(Object.values({ 1: 2 }))

console.log(Array.isArray([]))
