# Command-Line Inventory Application project
## Dependencies
Hello there, this program requires the following dpendencies

```javascript
Chalk@4
Nanoid@3
```

This program has the following commands that can be run, required additional inputs are *<encapsulated>*
    
- createItem <*item key/value pairs*>
- deleteItem <*id*>
- updateItem <*id*> <*...key/value pairs*>
- showDetails <*id*>
- showAll
- addCart <*id*>
- removeCart <*id*>
- viewCart
- clearCart
- restoreDefault

## CreateItem <*item key/value pairs*>

Will check if the information provided has all of the required entries. Keys that are not in the required entries will be automatically thrown out by the application. Includes data validation and formatting.

**Requires the following key value pairs**
- name (string)
- priceInCents (number)
- remaining (number)
- size (number)
- gender (string)

*An id will be generated when the information is provided*

Data can be put in any order but must be formatted as such and separated by a single space. **Failing to do so will result in your input being rejected.**

Example:
```
node index.js create name=nugget priceInCents=100 remaining=1 size=10 gender=M
```

Output:
```js
Added nugget to database.
[
    {
    id: 'ex4',
    name: 'Adidas Ultraboost',
    priceInCents: 14999,
    remaining: 1,
    size: 12,
    gender: 'M'
  },
  {
    id: 'Fue',
    name: 'nugget',
    priceInCents: 100,
    remaining: 1,
    size: 10,
    gender: 'M'
  }
]
```
An id will be assigned when the item is generated.


## deleteItem <*id*>

Will check if there is an item with that id included in the database, and delete it if found. If nothing is found with that id then no edits will be made to the file. 

Example:
```
npm run deleteItem ex1
```

Output

## updateItem <*item key/value pairs*>

Will check if there is an item with that id included in the database. Allows for editing multiple keys and can be put in any order. Must be in the following format with **no spaces**. 

```js
key=value
```

Any new key/value pairs you attempt to add outside of what already exists will be ignored.

**Multi word inputs* ***must*** *be encapsulated in quotes**

Example:
```
npm run updateItem id=ex1 name="Lemon Squeezy"
```

Output:
```
{
  id: 'ex1',
  name: 'Lemon Squeezy',
  priceInCents: 13999,
  remaining: 10,
  size: 8,
  gender: 'F'
}
Updated Lemon Squeezy at ex1
```

Multi word strings must be encapsulated in strings. This will reject inputs with datatypes that do not match.

## showDetails <*id*>

Will show the details of the item matching the id given. Will log a message if that item is not found.

Example:
```
npm run showDetails ex1
```
Output:
``` 
name:       Jordans Retro 1
price:      139.99
remaining:  10 
size:       8
gender:     F
```

## showAll

Shows brief information on all items in the store(products). Such as id, name, price, and remaining. Requires no additional input.

Example:
```
npm run showAll
```

Example Output:
```js
[
    {
        id: 'ex1',
        name: 'Jordans Retro 1',
        remaining: 10,
        priceInCents: 13999
    },
    {
        id: 'ex2',
        name: 'New Balance Roav V2',
        remaining: 6,
        priceInCents: 3999
    },
]
```
___
## Cart Commands
These affect adding and removing items from the cart. Cart manipulation.
## addCart {*id*}
Adds an item to the cart and then logs a message and returns the list of items in the cart. Will add to the amount if the item is present in the cart.. Will not edit cart if an id is not specified or is not found.

Example:
```
npm run addCart ex1
```

Output:
```js
Added `Jordans Retro 1` to cart.
[
  {
    id: 'ex1',
    name: 'Jordans Retro 1',
    size: 8,
    price: 13999,
    amount: 1
  }
]
```

## removeCart <*id*>

Removes 1 count of an item from the cart with the matching ID. If one item is left, removes entire item from cart. If no matching ID is found or one is not provided, does nothing and returns the unmodified cart.


Example:
```
npm run removeCart ex1
```

Output:
```js
Removed 1 Jordans Retro 1 from cart
[]
```

## viewCart

Shows the grand total of all items in the cart, followed by all the items in the cart. Requires no additional input.

Example:
```
npm run viewCart
```

Output:
```js
Your total price is $139.99
[
  {
    id: 'ex1',
    name: 'Jordans Retro 1',
    size: 8,
    price: 139.99,
    amount: 1
  }
]
```

## clearCart

Clears the entire cart and resets it to a blank array `[]`

Example:
```
npm run clearCart
```

Output:
```js
Removed 5 items from cart.
[]
```

## restoreDefault

Restores all input files back to their default values. Useful if the products.json or cart.json become damaged through no fault of your own. Returns nothing. Requires no additional inputs.

Example:
```
npm run restoreDefaults
```

Output:
```js
`Restored defaults of all data files.`
```

# Stretch Goals

- Use chalk to fomat information given.
- Implement a check so that a user cant add more items to cart than in stick.
- Implement ability to add objects with keys in any order and edit as well.
