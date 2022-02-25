# JS Shiny

[video](https://www.youtube.com/watch?v=EuIJS5t5g3M&) walking
through building the app.

This is a pattern I very commonly use for dynamic inputs
in Shiny.
This is admitedly a simplified MRE but the gist is there.

The premises is, I do not know at development time how
many inputs I have to handle because I need to interact
with highly dynamic (and often nested) data.
Data structure fluctuates.

Dynamic inputs in shiny are a pain: simply use JavaScript.

1. Send the data to the front-end to render the inputs
2. On change capture changes

__Advantages__

Better, clearer, more performant, etc.
Notice there is no reactive madness in the back-end.
In fact, no reactivity at all (in this simple example)
You do no need a reactive to hold the data: what is on screen
is in sync with what is in the back-end/database.

Some comments in the JavaScript code.
