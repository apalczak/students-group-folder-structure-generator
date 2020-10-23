const fs = require("fs");
const csv = require("csvtojson");
const dirname = "./students";

if (!fs.existsSync(dirname)) {
    fs.mkdirSync(dirname);
}

csv({ delimiter: ";" })
    .fromFile("data.csv")
    .then((persons) => {
        for (const person of persons) {
            const number = person.no > 9 ? person.no : "0" + person.no;
            const name = person.name.split(" ");
            const index = person.index.toString().padStart(6, "0");
            fs.mkdirSync(
                `${dirname}/${number} - ${index} - ${name[1]} ${name[0]} -`
            );
        }
    })
    .catch((error) => console.log(error));
