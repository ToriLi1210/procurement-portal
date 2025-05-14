import { readdirSync, statSync, readFileSync, writeFileSync, existsSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const baseDir = path.join(__dirname, "../public/images/devices");
const output = {};

for (const category of readdirSync(baseDir)) {
  const categoryDir = path.join(baseDir, category);

  if (statSync(categoryDir).isDirectory()) {
    const devices = readdirSync(categoryDir).filter((name) =>
      statSync(path.join(categoryDir, name)).isDirectory()
    );

    output[capitalize(category)] = devices.map((deviceId) => {
      // meta.json path
      const metaPath = path.join(categoryDir, deviceId, "meta.json");
      let description = "";
      let star = 0;
      let price = 0;
      let condition = "";
      //  read meta.json
      if (existsSync(metaPath)) {
        try {
          const meta = JSON.parse(readFileSync(metaPath, "utf-8"));
          description = meta.description || "";
          star = meta.star || 0;
          price = meta.price ||0;
          condition = meta.condition || "Brand New"
        } catch (err) {
          console.warn(`⚠️ Failed to parse meta.json for ${deviceId}: ${err.message}`);
        }
      }

      return {
        id: deviceId,
        name: insertSpaces(deviceId),
        category: category.toLowerCase(),
        description,
        star,
        price,
        condition,
      };
    });
  }
}

writeFileSync(
  path.join(__dirname, "../src/data/devices.json"),
  JSON.stringify(output, null, 2)
);

console.log("✅ devices.json has been generated at src/data/devices.json");

function capitalize(s) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}
function insertSpaces(str) {
  return str
    .replace(/([a-z])([A-Z])/g, "$1 $2")     // camelCase → camel Case
    .replace(/(\d)([a-zA-Z])/g, "$1 $2");    // digit followed by letter → space
}
