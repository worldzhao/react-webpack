export class Apple {
  constructor({ model }) {
    this.className = 'Apple'
    this.model = model
  }
  getModel() {
    const b = Object.assign({}, { a: 2 })
    return this.model
  }
}
