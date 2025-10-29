import { parse } from "csv-parse/sync";
import { stringify } from "csv-stringify/sync";
const csvText = "id,name\n1,Ada\n2,Alan\n";
const records = parse(csvText, { columns: true });
console.log(records);

const csvOut = stringify(records, { header: true });
console.log(csvOut);
