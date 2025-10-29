import YAML from "yaml";
import fs from "fs-extra";

const obj = { hello: "world" };
const yamlText = YAML.stringify(obj);
fs.writeFileSync("config.yaml", yamlText, "utf-8");

const parsed = YAML.parse(yamlText);
console.log(parsed);
