export function mockGetArticles() {
  return JSON.parse(localStorage.getItem("articles"));
}

export function mockSetArticles(articles) {
  localStorage.setItem("articles", JSON.stringify(articles));
}
