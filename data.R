# generate random "dataset"
make_data <- function(n = sample(5:50, 1)) {
  lapply(seq(n), \(x){
    rand()
  })
}

# pick random item
rand <- function() {
  fn <- sample(c("item1", "item2", "item3"), 1)
  do.call(fn, list())
}

# for a text input
item1 <- function(n = sample(1:3, 1)) {
  lapply(seq(n), \(x){
    list(
      type = "text",
      value = paste0(sample(letters, 10), collapse = "")
    )
  })
}

# for a select input
item2 <- function(n = sample(1:3, 1)) {
  lapply(seq(n), \(x) {
    list(
      type = "select",
      value = sample(LETTERS[1:4], 1)
    )
  })
}

# for a numeric input
item3 <- function(n = sample(1:3, 1)) {
  lapply(seq(n), \(x) {
    list(
      type = "number",
      value = sample(1:100, 1)
    )
  })
}
