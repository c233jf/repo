class Debounce {
  tid: number | null = null

  performProcessing() {
    console.log('Processing...')
  }

  debounceProcessing() {
    if (this.tid) {
      clearTimeout(this.tid)
    }
    this.tid = setTimeout(() => {
      this.performProcessing()
    }, 100)
  }
}

const debounce = new Debounce()
debounce.debounceProcessing()
