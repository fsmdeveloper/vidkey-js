import fetch from "node-fetch";

const getKeys = async () => {
  const url = "https://github.com/fsmdeveloper/vidsrc-keys/blob/main/keys.json";

  try {
    const response = await fetch(url);
    if (response.status !== 200) {
      console.error("Failed to fetch decryption keys:", response.statusText);
      return null;
    }

    const body = await response.text();
    const matches = body.match(/"rawLines":\s*\["(.+)"\]/);
    if (!matches) {
      console.error("Failed to extract rawLines from keys page");
      return null;
    }

    const rawJsonString = matches[1].replace(/\\\"/g, '"');
    const keys = JSON.parse(rawJsonString);

    if (keys && keys.length > 0) {
      const key1 = keys[0];
      const key2 = keys[1];
      // console.log(`key1: ${key1}`);
      // console.log(`key2: ${key2}`);
      return { key1, key2 };
    } else {
      console.error("Keys array is empty or malformed");
      return null;
    }
  } catch (error) {
    console.error("Error:", error.message);
    return null;
  }
};

const main = async () => {
  try {
    const keys = await getKeys();
    console.log(keys);
  } catch (error) {
    console.error(`Error in main function: ${error.message}`);
  }
};

main();
