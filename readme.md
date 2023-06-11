# Command-Line Inventory Application project

Hello there, this program requires the following dpendencies

```javascript
Chalk@4
Nanoid@3
```

This program has the following commands that can be run
```json
    createItem
    deleteItem
    updateItem
    showDetails
    showAll
    addCart
    "removeCart
    "viewCart": "node index.js viewCart",
    "clearCart": "node index.js clearCart",
    "restoreProducts": "node index.js restoreProducts"
```

## CreateItem()

Will check if the information provided has all of the required entries. Keys that are not in the required entries will be automatically thrown out by the application. Includes data validation and formatting.

data can be put in any order but should be 

An id will be assigned when the item is generated.

## DeleteItem()

Will check if there is an item with that id included in the database, and delete it if found. If nothing is found with that id then no edits will be made. 

- The item being searched for needs to be encapsulated in quotes if spaces are being used.

## Update item

Will check if there is an item with that id included in the database. Allows for editing multiple keys and can be put in any order. Must be in the following format with no spaces. 

`key=format`

Multi word strings must be encapsulated in strings. This will reject inputs with datatypes that do not match.

## Item details.

Will show the details of the item matching the id given. Will log a message if that item is not found.