# Todo App

## Tools used

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.0.4.
Express and Prisma make up the backend, Material UI for some widgets.

The Angular CLI did heavy lifting in pushing out frontend boilerplate, and I used the Bing chat AI to scaffold API endpoints and client service methods (it was a real time saver, but boy it is not ready for primetime).

Autoformatting with ESLint and Prettier, development in VSCode and Firefox.

## Running servers

You will need [Node](https://nodejs.org/en) and the [Angular CLI](https://github.com/angular/angular-cli) to run this project.

Please run the obligatory `npm i`

The Node/Prisma server is launched with `node --watch server.ts`, running at `http://localhost:3000/`

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

I would have really liked to have added a dockerfile to make launching this a little less dependency laden. Appologies, if I get time tomorrow I'll make a branch and we can agree it doesn't count toward the project, it's just quality of life!

## Notes

I spent time adding a user login interface for multi-tennency. Good call in terms of time use? Unsure, just didn't feel right not to.

I made the description filter server side and sorting client side. I started to build functionality into the todos API to accomodate sorting but ran out of time. Shucks.

I wrote this README after the two hours had elapsed.

I did not get quite as far as I would have liked:

- Integrating Material UI
- Adding update to todo listings (missing frontend)
- I made `todo.priority` a boolean, I would have prefered multiple levels but couldn't afford the complexity
- The login is pretty janky! That was extra, please don't hold it against me!
- Sorts aren't reversible (ascending/descending). That should have gotten in.
- Typing is not representative of my standards
- Tests ¯\_(ツ)\_/¯
