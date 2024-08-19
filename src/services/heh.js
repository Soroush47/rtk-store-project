let s = `fontSize: "30px", fontWeight: "600"`;

let result = "";
for (let letter of s) {
    let newLetter = letter;
    if (letter.toLowerCase() !== letter) newLetter = "-" + letter.toLowerCase();
    else if (letter === '"') newLetter = "";
    else if (letter === ",") newLetter = ";\n";
    else if (letter === "\n") newLetter = "";
    result += newLetter;
}
let attributes = s.split(",").map(key => key.replaceAll('"', "").replaceAll(","));
console.log(result + ";");
