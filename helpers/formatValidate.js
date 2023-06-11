const chalk = require(`chalk`)

function idMatch(data, id){
    filteredArr = data.map(item => {
        return item.id
    })
    return filteredArr.indexOf(id)
}


/**
 * Checks if a value can be converted to a number, returns a "bad" flag
 * if cant be converted, the number version if it can, or the original 
 * value if undefined.
 * @param {String} value - String version of number to be converted
 * @returns String, Number, or Original Value
 */
function checkNaN(value) {
    //Skips checks if undefined.
    if(value == undefined){
        return value
    }

    if(Number(value) !== Number(value)){
        return "bad"
    } else {
        return Number(value)
    }
}


function validateEntries(toValidate, example){
    let badValue = []
    for(key of Object.keys(example)){
        if(!toValidate[key]){
            badValue.push(key)
        }
        if(typeof example[key] == "number") { // NaN Validation
            if(checkNaN(toValidate[key]) == "bad"){
                console.log(chalk.red(`NaN detected for ${chalk.yellow(key)}. Please check input and try again.`))
                badValue.push(key)
            }
        }
    }
    if(badValue.length > 0) {
        console.log(`Invalid or missing ${chalk.blue(...badValue)}.`)
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

module.exports = {
    idMatch,
    cmdToObject,
    validateEntries,
    checkNaN
}