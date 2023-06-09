const {
    idMatch,
    validateEntries,
    cmdToObject,
    checkNaN
  } = require(`../helpers/formatValidate.js`)

const {nanoid} = require('nanoid')
const chalk = require('chalk')

const sampleProduct = require(`../models/products.json`)

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

function removeItem (data, id) {   
    id = id ? id : process.argv[3]
    let indexMatch = idMatch(data,id)

    if(indexMatch != -1) {
        console.log(chalk.bgRed(`Deleted ${chalk.yellow(data[indexMatch].name)} from database.`))
        return data.toSpliced(indexMatch,1)
    } else {
        console.log(chalk.red(`No item found with ID of ${chalk.yellow(id)}`))
    }

    return data
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
    return data
}

function itemDetails (data, id) {
    process.argv[3] ? id = process.argv[3] : null
    let item = null
    try {
       item = data[idMatch(data,id)]
    }
    catch{
        console.log(`${chalk.bgRed(`ERROR:`)} No dataset input.`)
        return null
    }

    if(!item){
        console.log(chalk.red(`No item with ID ${chalk.yellow(id)} found.`))
        return null
    } else {
    return `name:       ${chalk.green(item.name)}
price:      ${item.priceInCents/100}
remaining:  ${chalk.yellow(item.remaining)} 
size:       ${chalk.blue(item.size)}
gender:     ${chalk.bgGray(item.gender)}`    
    }
}

function listItems (data) {
    return filteredArr = data.map(item => {
        return {
            id: item.id,
            name: item.name,
            remaining: item.remaining,
            priceInCents: item.priceInCents,

        }
    })
}

module.exports = {
    createItem,
    removeItem,
    updateItem,
    itemDetails,
    listItems
}