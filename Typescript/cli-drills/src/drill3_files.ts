import fs from "fs-extra";

async function filesDrill() {
  await fs.ensureDir(".data");
  await fs.writeJSON(".data/state.json", { ok: true }, { spaces: 2 });
  const state = await fs.readJSON(".data/state.json");
  console.log(state);
}
filesDrill();
