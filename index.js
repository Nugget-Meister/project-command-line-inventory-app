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
  cmdToObject,
  checkNaN
} = require(`./helpers/formatValidate.js`)

// Package Importing
const {nanoid} = require('nanoid')
const chalk = require(`chalk`)

const sampleProduct = require(`./models/products.json`)
const sampleCart = require(`./models/cart.json`)


function createItem (data, object) {
    let newItem = !object ? cmdToObject() : object

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
    let updatedItem = !object ? cmdToObject() : object
    let indexMatch = null

    if (updatedItem.id) {
        indexMatch = idMatch(data,updatedItem.id)
    } else {
        console.log(chalk.red(`ID not specified. Please specify ID and try again. Data not modified.`))
        return data
    }
    // console.log(indexMatch)
    if(indexMatch != -1) {
        updatedItem = {
            id : updatedItem.id,
            name: updatedItem.name || data[indexMatch].name,
            priceInCents: checkNaN(updatedItem.priceInCents) || data[indexMatch].priceInCents,
            remaining: checkNaN(updatedItem.remaining) || data[indexMatch].remaining,
            size: checkNaN(updatedItem.size) || data[indexMatch].size,
            gender: updatedItem.gender || data[indexMatch].gender,
        }

        console.log(updatedItem)

        if (!validateEntries(updatedItem, sampleProduct)){
            console.log(chalk.bgRed(`Invalid object entered. Data unchanged.`))
            // return data
        } 
        else {
            console.log(`Updated ${chalk.yellow(updatedItem.name)} at ${chalk.yellow(updatedItem.id)}`)
            data[indexMatch] = updatedItem
        }
    } else {
        console.log(chalk.red(`Item with id ${chalk.yellow(updatedItem.id)} not found. Data unchanged.`))
    }

    // return data
}

function itemDetails () {}
function listItems () {}


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
            overWrite = updateItem(source)
            console.log(overWrite)
            // write(overWrite,"./data","products.json")
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
            console.log("command not recognized", command)
            break;
    } 
}

run(process.argv[2])
