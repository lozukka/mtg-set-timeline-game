# mtg-set-icon-timeline-game

## Project description:

The user is shown two set symbols from the Magic: the Gathering trading card game. The user must answer whether set A is older or newer than set B.
The game keeps track of the user's score. If the answer is wrong, the game stops and the final score and the correct answer to the last question are displayed on the screen.
I coded this little game for my spouse, who wanted to improve their knowledge of the MTG timeline.

_I do not own the MTG set icons; they are the property of Wizards. This project was created for my own learning purposes._

The set symbols are randomly generated from a JSON file. JSON file structure:

```
{
    "image": "./",
    "name": "",
    "date": "2020-01-24"
  }
```

# My process

## Built with

- HTML5 markup
- CSS
- Flexbox
- Vanilla Javascript
- Mobile-first workflow

## What I learned

I learned to better understand how to build a larger project. I learned how to use the state structure in Javascript better. In this project, I control the visibility of buttons and
other elements with the state structure.
I created my first JSON file from scratch. I built my code so that in the future, sets could just be added to the JSON file, and otherwise there would be no need to edit the code.
