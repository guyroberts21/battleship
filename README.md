# Battleships Game

A Battleships game played against an AI, made using [React](https://reactjs.org).

## Build Process

In this project, I used Test Driven Development with my factory functions (the ships, player and gameboard). This proved to be extremely useful - although the production of the entire app may have been slightly slower, there were less bugs and the bugs that remained were generally easy to fix since the tests had allowed me to remove any outstanding ones.

After having tested the factory functions, I used create-react-app to start the main part of the project and began by creating the static react page.

Next, I worked out the minimal representation of the state for all the components and how they would link together.

After this, I implemented drag and drop functionality using the HTML Drag and Drop API - this required some testing in side projects to work out how this all worked together.

Finally, after a few more bug fixes, I styled the project with a simple color scheme to make it look quite nice.

## Things I learnt throughout the project

### 1. Test Driven Development

Since this was my first time trying out TDD, it wasn't the most efficient process. However, after some time, I began to realise how important and useful it is. Instead of simple creating and debugging, I had to think about how the creation would work, what should it return, how to test this, then implement this. The longer process allows for better production overall.

### 2. Changing state from changes in the props

Although it isn't advised to use the static getDerivedStateFromProps (look [here](https://reactjs.org/blog/2018/06/07/you-probably-dont-need-derived-state.html)), I ended up using this method twice in the project. I am still working on finding a better solution and will make the necessary amends once I have found one. However, as I used this method, I have discovered the reasons how it can lead to anti-patterns and why it is discouraged.

### 3. HTML Drag and Drop API

I spent a lot of time experimenting with this API - with two small side-projects. I created a simple implementation of dragging icons onto their correct corresponding containers. I then created a prototype version of how the Drag and Drop API would work with a grid system and dragging containers onto the grid. This [tutorial](https://www.youtube.com/watch?v=7HUCAYMylCQ&list=LLm4MiRjSRKufscqQZscLqCQ&index=3&t=0s) proved to be really useful for understanding how to use the API methods. Finally, I implemented the drag and drop functionality into the project, which wasn't a seamless process but eventually it worked out.

## Github Pages used to preview site

View it [here](https://guyroberts21.github.io/battleship/)
