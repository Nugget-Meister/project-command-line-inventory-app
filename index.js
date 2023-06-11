//Helper importin
const {
    addToCart,
    removefromCart
} = require("./src/cart.js")

const {
    read,
    write
} = require(`./helpers/readWrite.js`)

const {
  idMatch,
  validateEntries,
  cmdToObject  
} = require(`./helpers/formatValidate.js`)

// Package Importing
const {nanoid} = require('nanoid')
const chalk = require(`chalk`)

const sampleProduct = require(`./models/products.json`)
const sampleCart = require(`./models/cart.json`)


function createItem (data, object) {
    let newItem = {}

    if(!object){
        newItem = cmdToObject()
    } else {
        newItem = object
    }

    
    //Validate and format created object
    if(!validateEntries(newItem,sampleProduct)) {
        console.log(`${chalk.bgRed(`Invalid object entered. Data not added`)}`)
    } else {
        newItem = {
            id: nanoid(3),
            name: String(newItem.name),
            priceInCents: Number(newItem.priceInCents),
            remaining: Number(newItem.remaining),
            size: Number(newItem.size),
            gender: String(newItem.gender)
        }
        console.log(chalk.green(`Added ${chalk.yellow(newItem.name)} to database.`))
        data.push(newItem)
    }

    return data
}


/**
 * Deletes item from selected array with that name
 * @param {*} data - Source array to remove item from
 * @param {*} id - id of item to delete
 */
function deleteItem (data, id) {

    let indexMatch = id ? idMatch(data,id) : idMatch(data,process.argv[3])

    if(indexMatch != -1) {
        console.log(chalk.bgRed(`Deleted ${chalk.yellow(data[indexMatch].name)} from database.`))
        return data.toSpliced(indexMatch,1)
    }
}

function updateItem (data, object) {

    // let indexMatch = id ? idMatch(data,id) : idMatch(data,process.argv[3])
}
function itemDetails () {}
function listItems () {}

console.log(nanoid(3))

function run(command) {
    let source = read("./data","products.json")
    let overWrite = null
    switch (command){
        case "create":
            overWrite = createItem(source);
            console.log(overWrite)
            // write(overWrite,"./data","products.json");
            break;
        case "delete": 
            overWrite = deleteItem(source)
            console.log(overWrite)
            // write(overWrite,"./data","products.json")
            break;
        case "update":
            break;
        case "showAll":
            break;
        case "showDetails":
            break;
        case "addCart":
            break;
        case "removeCart":
            break;
        case "clearCart":
            break;
        default:
            console.log()
            break;
    } 
}

run(process.argv[2])
