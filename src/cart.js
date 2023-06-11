const chalk = require(`chalk`)
const {idMatch} = require(`../helpers/formatValidate.js`)

function addToCart(data,cart,id) {
    id = id ? id : process.argv[3]

    let item = data[idMatch(data,id)]
    let itemInCart = idMatch(cart,id)

    if(!item){
        console.log(chalk.red(`Item with id ${id} not found. Cart not modified.`))
        return cart
    }

    if(item.remaining < 1){
        console.log(chalk.red(`None of ${item.name} left in stock. Item not added to cart.`))
        return cart
    }

    if(itemInCart != -1 ){
        cart[itemInCart].amount += 1
    } else {
        cart.push({
                id: item.id,
                name: item.name,
                size: item.size,
                amount: 1,
            })
        }
    console.log(chalk.bgGray(`Added ${chalk.yellow(item.name)} to cart.`))
    return cart
}

function removefromCart(cart, id){
    id = id ? id : process.argv[3]
    let itemMatch = idMatch(cart,id)
    if(itemMatch != -1) {
        console.log(chalk.bgRed(`Removed ${chalk.bgRed()}`))
    } else {
        console.log(chalk.red(`Item with ID ${chalk.yellow(id)} not found. No changes have been made.`))
    }
    return cart
}

function clearCart(cart){
    total = 0
    cart.forEach(item => {
        total += item.amount
    })
    if(total > 0) {
        console.log(chalk.red(`Removed ${chalk.yellow(total)} items from cart.`))
    } else {
        console.log(chalk.yellow(`Nothing in the cart to remove`))
    }
   
    return []
}

module.exports = {
    addToCart,
    removefromCart,
    clearCart
}