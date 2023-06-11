
const {
    read,
    write
} = require(`./helpers/readWrite.js`)

const {
    addToCart,
    removefromCart,
    clearCart,
    viewCart
} = require("./src/cart.js")

const {
    createItem,
    removeItem,
    updateItem,
    itemDetails,
    listItems
} = require('./src/item.js')

// Package Importing

const chalk = require(`chalk`)

function run(command) {
    let source = read("./data","products.json")
    let savedCart = read(`./data`,`cart.json`)
    let overWrite = null
    switch (command){
        case "create":
            overWrite = createItem(source);
            console.log(overWrite)
            write(overWrite,"./data","products.json");
            break;
        case "remove": 
            overWrite = removeItem(source)
            console.log(overWrite)
            write(overWrite,"./data","products.json")
            break;
        case "update":
            overWrite = updateItem(source)
            console.log(overWrite)
            write(overWrite,"./data","products.json")
            break;
        case "showDetails":
            console.log(itemDetails(source))
            break;
        case "showAll":
            console.log(listItems(source))
            break;
        case "addCart":
            overWrite = addToCart(source, savedCart)
            console.log(overWrite)
            write(overWrite,"./data","cart.json")
            break;
        case "removeCart":
            overWrite = removefromCart(savedCart)
            console.log(overWrite)
            write(overWrite,"./data","cart.json")
            break;
        case "viewCart":
            overWrite = viewCart(savedCart)
            console.log(overWrite)
            break;
        case "clearCart":
            overWrite = clearCart(savedCart)
            console.log(overWrite)
            write(overWrite,"./data","cart.json")
            break;
        case "restoreDefault":
            overWrite = read("./data","_products.json")
            write(overWrite,"./data","products.json")
            write([],"./data","cart.json") 
            console.log(chalk.red(`Restored defaults of all data files.`))
        default:
            break;
    } 
}

run(process.argv[2])
