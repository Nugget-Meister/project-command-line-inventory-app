const {
    writeFileSync,
    readFileSync
} = require("node:fs")

function read(path, file){
    let info = readFileSync(`./${path}/${file}`, "utf8");
    return info ? JSON.parse(info) : []
}

function write(data, path, file ) {
    data = JSON.stringify(data)
    return writeFileSync(`${path}/${file}`, data, {encoding: "utf-8"})
}

module.exports = {
    read,
    write
}