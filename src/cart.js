const chalk = require(`chalk`)
const {idMatch} = require(`../helpers/formatValidate.js`)

function addToCart(data,cart,id) {
    id = id ? id : process.argv[3]
    let itemMatch = idMatch(data,id)
    let item = null
    let itemInCart = null;
    

    if(itemMatch == -1){
        console.log(chalk.red(`Item with id ${id} not found. Cart not modified.`))
        return cart
    } else {
        item = data[itemMatch]
        itemInCart = idMatch(cart,id)
    }


    try {
        if(item.remaining < cart[itemInCart].amount){
            console.log(chalk.red(`None of ${item.name} left in stock. Item not added to cart.`))
            return cart
        }
    } catch {
        if(item.remaining < 1){
            console.log(chalk.red(`None of ${item.name} left in stock. Item not added to cart.`))
            return cart
        }
    }

    if(itemInCart != -1 ){
        cart[itemInCart].amount += 1
    } else {
        cart.push({
                id: item.id,
                name: item.name,
                size: item.size,
                price: item.priceInCents,
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
        console.log(chalk.red(`Removed 1 ${chalk.yellow(cart[itemMatch].name)} from cart`))
       
        if (cart[itemMatch].amount <= 1){
            cart = cart.toSpliced(itemMatch,1)
        } else{
            cart[itemMatch].amount -= 1;
        }

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

function viewCart(cart){
    let total = cart.reduce((total, add) => ((add.price * add.amount)/100) + total, 0)
    console.log(chalk.green(`Your total price is ${chalk.blue(`$${total.toFixed(2)}`)}`))
    return cart.map(item => {
        return {  
                id: item.id,
                name: item.name,
                size: item.size,
                price: item.price/100,
                amount: item.amount,  
        }
    })
}


module.exports = {
    addToCart,
    removefromCart,
    viewCart,
    clearCart
}