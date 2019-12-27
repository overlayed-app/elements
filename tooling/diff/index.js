const fs = require("fs");
const http = require("http");
const https = require("https");

const cmp = (a, b) => {
  return (
    a && b && a.name === b.name && a.version === b.version && a.url === b.url
  );
};

const lock = JSON.parse(
  fs.readFileSync(`${__dirname}/../../registry-lock.json`, "utf-8")
);
const registry = JSON.parse(
  fs.readFileSync(`${__dirname}/../../registry.json`, "utf-8")
);

if (lock.length == registry.length) {
  console.log(`No changes.`);
} else if (registry.length < lock.length) {
  console.log("Removal detected.");
} else if (registry.length > lock.length) {
  if (registry.length - lock.length > 1) {
    console.log(
      `Multiple additions. Not yet supported. Please submit one at a time.`
    );
    process.exit(1);
  }

  const newEntry = registry.find((v, i) => !cmp(lock[i], v));

  console.log(`Addition detected: ${newEntry.name}`);

  (newEntry.url.startsWith("http://") ? http : https).get(newEntry.url, res => {
    if (res.statusCode.toString()[0] !== "2") {
      console.error(err);
      process.exit(1);
    } else {
      console.log(`${newEntry.url} responds with ${res.statusCode}`);

      fs.writeFileSync(
        `${__dirname}/../../registry-lock.json`,
        JSON.stringify(registry)
      );

      console.log("Lockfile updated. Run success.");
    }
  });
}
