const chalk = require(`chalk`)

function idMatch(data, id){
    filteredArr = data.map(item => {
        return item.id
    })
    return filteredArr.indexOf(id)
}

function validateEntries(toValidate, example){
    let badValue = []
    for(key of Object.keys(example)){
        if(!toValidate[key]){
            badValue.push(key)
        }
        if(typeof example[key] == "number") { // NaN Validation
            if(Number(toValidate[key]) !== Number(toValidate[key])){
                console.log(chalk.red(`NaN detected for ${chalk.yellow(key)}. Please check input and try again.`))
                badValue.push(key)
            }
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

module.exports = {
    idMatch,
    cmdToObject,
    validateEntries
}