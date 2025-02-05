# 4: Making it Interactive

## Today's Learning Objectives

We have our component set up with _state_, and now we will make it interactive.

## Your Mission

### Step 1. Components Structure

You should have at least 3 components in your code (if you have more, that's also good!) with the following structure:

```
- App
  └ Form
  └ TodoList
```

`Form` and `TodoList` are "siblings", and they are both contained in the parent component `App`.

It's important to have one `Form` component that contains both the input field and the button because they have to interact with each other.

If that is not your case, you need to adapt your code to this structure (again, it's not a problem if you just have _extra_ components).

### Step 2. The Form

Dealing with forms in React is pleasure and pain. There are two ways of dealing with forms: with _controlled_ components, and with _uncontrolled_ components.

The first technique gives you greater control, but it can visibly slow your application down if you have _a lot_ of fields, and/or _a lot_ of nested components.

The second technique is as fast as a browser can be and it's usually fine for a large part of use cases.

We are going to use _uncontrolled_ components because we like simplicity, but you can read more about the two techniques in the [official documentation](https://react.dev/learn/sharing-state-between-components#controlled-and-uncontrolled-components), or in other material you find online.

Your `Form` component should look something like this:

```js
import React from "react";

export default function Form() {
  return (
    <form>
      <input 
        type="text" 
        name="todo" 
        placeholder="Write a new todo" 
      />
      <button>Add todo</button>
    </form>
  );
}
```

### Step 3. Click

When we click the button, we want a todo added to the list. So let's do the first thing: let's add a click handler function (empty for the moment), and an `onSubmit` property to the form.

_Side note: they are called "attributes" in HTML, but "properties" (most often abbreviated in "prop") in React. The reason will be clear later._

```js
import React from "react";

export default function Form() {
  function handleSubmit() {
    // Do something...
  }

  return (
    <form onSubmit={handleSubmit} >
      <input 
        type="text" 
        name="todo" 
        placeholder="Write a new todo" 
      />
      <button type="submit">Add todo</button>
    </form>
  );
}
```

Now, we know that we have to, somehow, get the value of the input inside the `handleSubmit` function. You might be tempted to add a _class_ or an _ID_ to the input field and retrieve its value with `document.getElementById()`, `document.querySelector()` or something like that...

**NEVER DO THAT IN REACT.**

If you do that you break out of the React update cycle, really bad things will happen to your application, and you will have bad luck for 7 years onwards.

_Note: I shouldn't say "never", there are in fact extreme circumstances in which you have no alternative, but the person writing who wrote this anecdote encountered such circumstances at most 3 times in 4 years of using React._

The "React" way of referring to a DOM element is by using a thing called "ref" (short for _reference_). And, of course, there is a hook for that.

### Step 4. `useRef`

Let's update our component with `useRef`:

```js
import React, { useRef } from "react";

export default function Form() {
  const inputRef = useRef();

  function handleSubmit() {
    const inputElement = inputRef.current;

    // Do something with inputElement...
    console.log(inputElement.value);
  }

  return (
    <form onSubmit={handleSubmit} >
      <input 
        type="text" 
        name="todo" 
        placeholder="Write a new todo" 
        ref={inputRef}
      />
      <button type="submit">Add todo</button>
    </form>
  );
}
```

And now let's unpack this!

**1.**

At the beginning of the file, we pull in `useRef` from React.