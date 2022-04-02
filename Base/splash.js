const fs = require("fs");

const json = "cekiDB.json"


var data = {};

if (!fs.existsSync(json)) {
    fs.writeFileSync(json, "{}", "utf-8");
} else {
    fetchData();
}

async function fetchData() {
    const savedData = JSON.parse(fs.readFileSync(json));
    data = savedData;

}

async function saveData() {
    fs.writeFileSync(json, JSON.stringify(data, null, 2), "utf-8");
}

module.exports = { data, fetchData, saveData }