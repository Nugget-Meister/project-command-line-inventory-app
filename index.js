const {
    addToCart,
    removefromCart
} = require("./src/cart.js")

const {
    read,
    write
} = require(`./helpers/readWrite.js`)

const sampleProduct = require(`./models/products.json`)
const sampleCart = require(`./models/cart.json`)

const chalk = require(`chalk`)

function nameMatch(name, products){
    filteredArr = products.map(product => {
        return product.name
    })
    searchResult = products.indexOf(name)
}

function validateEntries(toValidate, example){
    let badValue = []
    for(key of Object.keys(example)){
        // console.log(key,toValidate[key])
        if(!toValidate[key]){
            badValue.push(key)
        }
    }
    if(badValue.length > 0) {
        console.log(`Missing ${chalk.blue(...badValue)} from object`)
        return false
    } else {
        return true
    }
}

/**
 * Processes input from command line and returns a formed object.
 * Takes no direct inputs.
 * @returns {Object} - Object with key value pairs from commandline.
 */
function cmdToObject() {
    return Object.fromEntries(process.argv.slice(3).map(input => {
        return input.split('=')
    }))
}



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



function deleteItem () {}
function updateItem () {}
function itemDetails () {}
function listItems () {}



function run(command) {
    let source = read("./data","products.json")

    switch (command){
        case "create":
            let overWrite = createItem(source)
            console.log(overWrite)
            // write(overWrite,"./data","products.json");
            break;
        case "delete":
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
