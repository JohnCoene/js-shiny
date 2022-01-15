library(shiny)
source("data.R")

shiny::addResourcePath(
  "assets",
  "assets"
)

ui <- fluidPage(
  # v5 if shiny >= v1.7.0
  # v4 otherwise
  theme = bslib::bs_theme(version = 5),
  tags$head(
    tags$script(
      src = "assets/script.js"
    )
  ),
  actionButton("update", "Randomise"),
  div(
    style = "width:500px;",
    id = "app"
  )
)

server <- function(input, output, session) {

  observeEvent(input$update, {
    session$sendCustomMessage(
      "dataset-in",
      list(
        data = make_data()
      )
    )
  })

  observeEvent(input$datasetOut, {
    cat("Update dataset #", input$datasetOut$box)
    print(input$datasetOut$values)
  })
}

shinyApp(ui, server)
