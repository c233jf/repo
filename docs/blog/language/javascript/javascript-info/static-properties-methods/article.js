import { consola } from 'consola'

class Article {
  // 等同于 Article.publisher = 'Ilya Kantor'
  static publisher = 'Ilya Kantor'

  constructor(title, date) {
    this.title = title
    this.date = date
  }

  static compare(articleA, articleB) {
    return articleA.date - articleB.date
  }

  static createTodays() {
    return new this("Today's digest", new Date())
  }
}

const articles = [
  new Article('HTML', new Date(2019, 1, 1)),
  new Article('CSS', new Date(2019, 0, 1)),
  new Article('JavaScript', new Date(2019, 11, 1)),
]

articles.sort(Article.compare)

consola.info(articles[0].title) // CSS

const article = Article.createTodays()
consola.info(article.title) // Today's digest

consola.info(Article.publisher) // Ilya Kantor
