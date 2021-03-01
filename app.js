const fs = require("fs");
const path = require("path");
const csv = require("csvtojson");
const dirname = "./students";

if (!fs.existsSync(dirname)) {
    fs.mkdirSync(dirname);
}

const numberOfLabs = parseInt(process.argv[2]);

csv({ delimiter: ";" })
    .fromFile("data.csv")
    .then((persons) => {
        for (const person of persons) {
            const group = person.group;
            const number = person.no > 9 ? person.no : "0" + person.no;
            const name = person.name.split(" ");
            const index = person.index.toString().padStart(6, "0");
            const studentFolder = path.resolve(
                __dirname,
                dirname,
                `G0${group} - ${number} - ${index} - ${name[1]} ${name[0]}`
            );
            fs.mkdirSync(studentFolder);
            for (i = 1; i <= numberOfLabs; i++) {
                labFolder = path.resolve(
                    studentFolder,
                    `Lab ${i > 9 ? i : "0" + i} - data`
                );
                fs.mkdirSync(labFolder);
            }
        }
    })
    .catch((error) => console.log(error));
