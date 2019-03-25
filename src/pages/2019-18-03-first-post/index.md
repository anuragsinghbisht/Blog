---
path: '/js-promises'
date: '2019-03-18'
title: 'Javascript Promises'
tags: ['javascript']
excerpt: 'Javascript Promises'
---

*Use promises & fetch API*

3 states of promise

* Pending
* Settled
    * Fulfilled
    * Rejected

```js
      var s = "JavaScript syntax highlighting";
      alert(s);
```

```js
const API_URL = "https://starwars.egghead.training/";

const $output = document.getElementById("output");

$output.innerText = `Loading...`;

function getFilmTitle(films) {
  return films
    .sort((a, b) => a.episode_id - b.episode_id)
    .map(film => `${film.episode_id}.${film.title}`)
    .join("\n");
}

fetch(API_URL + "films")
  .then(response => response.json())
  .then(films => {
    $output.innerText = getFilmTitle(films);
  });
```

*Catch errors in Javascript Promises Chain*
In promise chain, then .then function takes 2 arguments. 1st argument is executed when the promised is resolved. 2nd argument is executed when the promise is rejected.

```js
fetch("URL")
    .then(
      // isResolved
      () => {},
      // isRejected
      () => {}
      )     
```

Now, we can create a common block where we can catch all the errors as follows 

```js
fetch("URL")
    .then(() => {})
    .then(undefined, () => {});
```

This practice is so common that this block can be replaced as .catch block

```js
fetch("URL")
    .then(() => {})
    .catch(() => {});
```

**Fetch will always enter the resolve block if promise is fulfilled. That is, even if api response is not 200.

```js
const API_URL = "https://starwars.egghead.training/";

const $output = document.getElementById("output");

$output.innerText = `Loading...`;

function getFilmTitle(films) {
  return films
    .sort((a, b) => a.episode_id - b.episode_id)
    .map(film => `${film.episode_id}.${film.title}`)
    .join("\n");
}

fetch(API_URL + "films")
  .then(response => {
    if (!response.ok) {
      throw Error("Unsuccessfull response");
    }
    return response.json();
  })
  .then(films => {
    $output.innerText = getFilmTitle(films);
  })
  .catch(error => {
    console.warn(error);
    $output.innerText = ":(";
  });
```

*Clean up logic using finally*

```js
fetch(API_URL + "films")
  .then(response => {
    if (!response.ok) {
      throw Error("Unsuccessfull response");
    }
    return response.json();
  })
  .then(films => {
    $output.innerText = getFilmTitle(films);
  })
  .catch(error => {
    console.warn(error);
    $output.innerText = ":(";
  })
  .finally(() => {
    $spinner.remove();
  });
```

*Create a Rejected Promise*

```js
fetch(API_URL + "movies")
  .then(response => {
    if (!response.ok) {
      return Promise.reject(new Error("Unsuccessfull response"));
    }
    return response.json();
  })
  .then(films => {
    $output.innerText = getFilmTitle(films);
  })
  .catch(error => {
    console.warn(error);
    $output.innerText = ":(";
  })
  .finally(() => {
    $spinner.remove();
  });
```

*Create a resolved Promise*
Use Promise.resolve to convert any non-standard promise into native promise

```js
Promise.resolve($.getJSON(API_URL + "films"))  
  .then(films => {
    $output.innerText = getFilmTitle(films);
  })
  .catch(error => {
    console.warn(error);
    $output.innerText = ":(";
  })
  .finally(() => {
    $spinner.remove();
  });
```

*Create a new promise*

```js
const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve();
  }, 1000);
});

promise.then(
    () => console.log("resolved"),
    () => console.log("reject")
);

```

*Promise.race()*

```js
function resolveAfter(ms, value) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(value);
        }, ms);
    });
}

const promiseA = resolveAfter(1000, 'a');
const promiseB = resolveAfter(2000, 'b');

const promise = Promise.race([promiseA, promiseB]).finally(() => {});

promise.then((v) => console.log(v));
```

*Promise.all()*

```js
import "./styles.css";

// #region Setup
const API_URL = "https://starwars.egghead.training/";

const $output = document.getElementById("output");
const $spinner = document.getElementById("spinner");

const queryAPI = endpoint => {
  return fetch(`${API_URL}${endpoint}`).then(response => {
    return response.ok
      ? response.json()
      : Promise.reject(new Error("Unsuccessfull response"));
  });
};
// #endregion

// queryAPI("films")
//   .then(films => {
//     return queryAPI("planets").then(planets => {
//       $output.innerText = `${films.length} films, ${planets.length} planets`;
//     });
//   })
//   .finally(() => $spinner.remove());

Promise.all([queryAPI("films"), queryAPI("planets"), queryAPI("species")])
  .then(([films, planets, species]) => {
    $output.innerText = `${films.length} films, ${planets.length} planets and ${
      species.length
    } species`;
  })
  .catch(error => {
    console.warn(error);
    $output.innerText = ":(";
  })
  .finally(() => $spinner.remove());
```

*Async/await*

```js
// #region Setup
const API_URL = "https://starwars.egghead.training/";

const $output = document.getElementById("output");
const $spinner = document.getElementById("spinner");

async function queryAPI(endpoint) {
  const response = await fetch(API_URL + endpoint);
  if (response.ok) {
    return response.json();
  }
  throw Error("Unsuccessfull response");
}
// #endregion

async function main() {
  try {
    const [films, planets] = await Promise.all([
      queryAPI("films"),
      queryAPI("planets")
    ]);
    $output.innerText = `${films.length} films, ${planets.length} planets`;
  } catch (error) {
    console.warn(error);
    $output.innerText = ":(";
  } finally {
    $spinner.remove();
  }
}

main();
```
