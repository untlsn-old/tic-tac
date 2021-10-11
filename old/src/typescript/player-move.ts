export
class PlayerMove {
  X: string
  O: string

  constructor(x: string, o: string) {
    this.X = x
    this.O = o
  }

  async doOnBoth(func: (player: string) => void) {
    func(this.X)
    func(this.O)
  }

  whoIs(data: string) {
    return data == this.X ? 'x' : 'o'
  }
}