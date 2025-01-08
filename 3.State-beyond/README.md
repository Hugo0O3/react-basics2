# 3: Beyond the State

## Today's Learning Objectives

Today you will learn about the single most important feature of React: `state`.

## Your Mission

### Step 4. Go back 

The previous 4th stage was tricky if you're not familiar with React. Let's go to a solution and some explanations. 

Remember, the challenge was to deal with the todos state. You had something like that :

```js
const initialTodos = ["My first todo", "My second todo"];

const [todos, setTodos] = useState(initialTodos);
```
#### 1. Change todos shape

First of all, we had to fix this issue : `Warning: Each child in a list should have a unique "key" prop.`

The problem here, is that our todos are just strings, we need to have more info to distinguih our todos. 

In React it is very common to use an array of objects like in a JSON file. 

Let's transform our `initialTodos`:

```js
const initialTodos = [
    { 
      id: 1,
      name: "My first todo"
    }, 
    { 
      id: 2,
      name: "My second todo"
    }
  ]
```

So, now we have an `id` for each todo. We can use this id for each `<li>` by adding a `key` attribute. `<li key={todo.id}>`

Well, the first part was easy, wasn't it ? 

For the second part, we need to change the state of the checkbox. But for now, we don't have info about the status of a todo, if it's completed or not. 

We need to had a property to the todo : 

```js
const initialTodos = [
    { 
      id: 1,
      name: "My first todo",
      done: false
    }, 
    { 
      id: 2,
      name: "My second todo", 
      done: true 
    }
  ]
```

The shape of our todos is now complete. 

#### 2. Change input shape

In the UI part, as we change the todos shape, we have to add an element to be able to select the correct checkbox. Now, we have an id that we can use it : 

```jsx
<li>
    <input type="checkbox" id={todo.id} onChange={}/> {todo.name}
</li>

```

It is not enough. We have to give a status to the checkbox: checked or not. Let's add that : 


```jsx
<li>
    <input 
      type="checkbox" 
      id={todo.id}
      name={todo.name} 
      checked={todo.done}
      onChange={}/> {todo.name}
</li>

```

For a better understanding, I changed the attributes disposition.

#### 3. Updating a state

Next step, we have to attach an event on the input field checkbox. We choose the event onChange.

We need a function to add into this event. It is common to use the term `handle` when we deal with event's DOM. 

This function will need an argument to know which todo to update in the state `todos`. We will select the id. 

Let's create the function : 

```js
const handleCheck = (id) => {

}
```

What should we update again ??? The todos ! 
How do we update a state in React ??? with the `set...` 

```js
const handleCheck = (id) => {
  setTodos()
}
```
>_____
> ##### Important Note 
>
> It's at that time, we enter in the "weird" part of React. 
>
> When you want to modify a value in a state, you cannot change it directly. That's mean, you take the previous state and you create an another one with the new value. This new state will replace the previous one. 
>
> Why? because the states are **immutable**. You **cannot change it**, otherwise React will send you an error. The immutability of an object is a common concept in programming languages.   
>
> To better undestrand this concept, I strongly advice you to read and make the exercises of the official doc: 
> - [Updating objects in state](https://react.dev/learn/updating-objects-in-state)
> - [Updating array in state](https://react.dev/learn/updating-arrays-in-state)
>
> By consequence, if you want to think in React & avoid mutating the state directly, it's always better to apply your changes on a **copy of the previous state**. 
>The method (function) to change a state is the `setState`. 
>____


So, for our `handleCheck` function, here a proposition : 

```js
const handleCheck = (id) => {
  const newTodos = todos.map(todo => 
    ...
  )
  setTodos(newTodos)
}
```

I created a newTodos with the todos I got. Then, I use it in the `setTodos` to update the state. 

Notice that I used a `.map` to create a new array from the previous one. 


#### 4. Add logic in function handleCheck

Then, we need to add the logic inside the `.map` loop. First, we have to catch the right checkbox we update. 

How can we do that ? With the id : 

```js
const handleCheck = (id) => {
  const newTodos = todos.map(todo => 
    if(todo.id === id) {
      ...
    }
    ...
  )
  setTodos(newTodos)
}
```

So, if the `todo.id === id` inverse the value of the todo.done. Otherwise, do nothing. Then, return the todo :

```js
const handleCheck = (id) => {
  const newTodos = todos.map((todo) => {
    if (todo.id === id) {
      todo.done = !todo.done;
    }
    return todo;
  });
  setTodos(newTodos);
}
```

#### 5. Add logic with the object mindset

We have our logic. If you use it in the onChange, it will work pretty well. But I would like to show you an another way to build this function. A way more concise and object oriented :

```jsx
const handleCheck = (id) => {
  setTodos( todos.map( todo => 
    if(todo.id === id) {
      return {
        ...todo,
        done: !todo.done
      }
    }
    return todo
  ))
}
```

- Here, we directly pass the setTodos function. We don't need to go through a variable to pass the new state because `.map` already return a new array. 
- In the if statement, we destructure the todo and replace the `done` property by the new value. Our case is simple but this method of destructuring can be usefull for a more complex case. 

#### 6. Pass handleCheck in the input

Now, that we have our function, we have to apply it in the input checkbox. We just have to call it inside the `onChange`... 

Hummm let's try like this : 

```jsx
<li>
    <input 
      type="checkbox" 
      id={todo.id}
      name={todo.name} 
      checked={todo.done}
      onChange={handleCheck(todo.id)}/> {todo.name}
</li>

```

Is it working ? No ? 
Wich error message do you get ?

```
Error: Too many re-renders. React limits the number of renders to prevent an infinite loop.
``` 

Why too many re-renders? 

React re-renders (re-builts) part of UI to be updated. For example, when a checkbox changes. 

The problem when you write a function like that `onChange={handleCheck(todo.id)}`, React will fire the function at each re-render. The `onChange` does not occur with this syntax. This is because JavaScript inside the JSX `{` and `}` executes right away.

What happens is : 
- on the first render, React build the UI once. 
- It fires `handleCheck(todo.id)`. 
- The handleCheck function changes the state which change the UI. 
- React re-render the UI. 
- React fires the handleCheck function. 
- The handleCheck function changes the state which change the UI. 
- React re-render the UI.
- React fires the handleCheck function. 
- The handleCheck function changes the state which change the UI. 

So.. it's an infinite loop ! 

To avoid this error, wrap the event handler in an anonymous function :

```js 
onChange={ () => handleCheck(todo.id) }
```

With this syntax, you're sure that React will only fire the function onChange of the checkbox. To have more info about this, I encourage you to read the official documentation here : https://react.dev/learn/responding-to-events


### Conclusion

Did you understand everything ? 
- If yes, Great, it's very important to understand how React works. 
- If not, you should re-do everything and read attentively the documentation. It might help. 

See you to the next chapter !