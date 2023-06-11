# Command-Line Inventory Application project
## Dependencies
Hello there, this program requires the following dpendencies

```javascript
Chalk@4
Nanoid@3
```

This program has the following commands that can be run, required additional inputs are *{encapsulated}*
    
- createItem {*item key/value pairs*}
- deleteItem {*id*}
- updateItem {*id*} {*...key/value pairs*}
- showDetails {*id*}
- showAll
- addCart {*id*}
- removeCart {*id*}
- viewCart
- clearCart
- restoreDefault


## CreateItem {*item key/value pairs*}

Will check if the information provided has all of the required entries. Keys that are not in the required entries will be automatically thrown out by the application. Includes data validation and formatting.

**Requires the following key value pairs**
- name (string)
- priceInCents (number)
- remaining (number)
- size (number)
- gender (String)

*An id will be generated when the information is provided*

Data can be put in any order but must be formatted as such and separated by a single space. **Failing to do so will result in your input being rejected.**

Example:
`npm run createItem name=nugget`

An id will be assigned when the item is generated.

___

## deleteItem {*id*}

Will check if there is an item with that id included in the database, and delete it if found. If nothing is found with that id then no edits will be made to the file. 

Example:
```
npm run deleteItem ex1
```


## updateItem {*item key/value pairs*}

Will check if there is an item with that id included in the database. Allows for editing multiple keys and can be put in any order. Must be in the following format with ~**no spaces**~. 

```
key=value
```

Any new key/value pairs you attempt to add outside of what already exists will be ignored.

**Multi word inputs* ***must*** *be encapsulated in quotes**

Example:
```
npm run updateItem id=ex1 name="Lemon Squeezy"
```

Multi word strings must be encapsulated in strings. This will reject inputs with datatypes that do not match.

## showDetails {*id*}

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

___
## Cart Commands

## addCart {*id*}
Will add an item to the cart if the item is found. Will not edit the cart otherwise.


## removeCart {*id*}
## viewCart
## clearCart
## restoreDefault