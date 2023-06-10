const {
    addToCart,
    removefromCart
} = require("./src/cart.js")

const {
    read,
    write
} = require(`./helpers/readWrite.js`)

const chalk = require(`chalk`)

function nameMatch(name, products){
    filteredArr = products.map(product => {
        return product.name
    })
    searchResult = products.indexOf(name)
}

function validateEntries(toValidate,example){
    for(key of Object.keys(example)){
        if(!toValidate[example]){
            console.log(toValidate)
            console.log(`missing ${key} from object`)
            return false
        }
    }
    return true
}

function createItem (data, object) {
    let newItem = {}

    if(!object){
        object = process.argv.slice(3).map(input => {
            return input.split('=')
        })
        newItem = Object.fromEntries(object)
    } else {
        newItem = object
    }

    
    // let newItem = {
        //     name : object.name,
        //     priceInCents: object.price || 0,
        //     remaining: object.amount || 0,
        //     inStock: object.amount > 0 ? true : false,
        // }
        
        // source.push(newItem)
        
    data.push(newItem)
        
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
