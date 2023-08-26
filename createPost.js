const { Faker } = require("@faker-js/faker");
const faker = new Faker();

// Rest of the code (createPost function and other helper functions) remains the same

const fs = require("fs");
const { stringify } = require("querystring");

const generateRandomTitle = (length) => {
  const characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

const getRandomElementFromArray = (arr) => {
  const randomIndex = Math.floor(Math.random() * arr.length);
  return arr[randomIndex];
};

const generateRandomImageUrl = () => {
  const width = faker.random.number({ min: 200, max: 800 });
  const height = faker.random.number({ min: 200, max: 800 });
  return `https://via.placeholder.com/${width}x${height}`;
};

const createPost = (numberOfPost, overWrite) => {
  if (!numberOfPost) {
    console.log("Please input Number");
    return;
  }
  numberOfPost = parseInt(numberOfPost);
  console.log("Creating", numberOfPost, " posts");
  //read current Data
  // Turn Json to JS object
  let data = JSON.parse(fs.readFileSync("db.json"));
  if (overWrite) {
    data.posts = [];
    console.log(data.posts);
  }

  // Initialize _id variable

  for (let i = 0; i < numberOfPost; i++) {
    const post = {
      title: generateRandomTitle(50),
      type: getRandomElementFromArray([
        "house",
        "residential_land",
        "farm_land",
        "office",
      ]),
      description: generateRandomTitle(500),
      image: [
        generateRandomImageUrl(),
        generateRandomImageUrl(),
        generateRandomImageUrl(),
        generateRandomImageUrl(),
        generateRandomImageUrl(),
        generateRandomImageUrl(),
        generateRandomImageUrl(),
        generateRandomImageUrl(),
        generateRandomImageUrl(),
        generateRandomImageUrl(),
      ],
      author: "64cc767e78eacb5c97a3848a",
      district: getRandomElementFromArray([
        "pleiku",
        "chupah",
        "chupuh",
        "chuse",
        "iagrai",
        "ducco",
        "dakdoa",
        "chuprong",
        "mangyang",
        "krongpa",
        "ankhe",
        "phuthien",
        "ayunpa",
        "dakpo",
        "kbang",
        "kongchro",
        "iapa",
      ]),
      address: faker.address.streetAddress(),
      wish: getRandomElementFromArray(["rent", "sell"]),
      vip: getRandomElementFromArray([true, false]),
      direction: getRandomElementFromArray([
        "east",
        "west",
        "south",
        "north",
        "east-north",
        "east-south",
        "west-north",
        "west-south",
      ]),
      process: getRandomElementFromArray(["pending", "accepted", "declined"]),
      price: faker.commerce.price(),
      acreage: faker.datatype.number({ min: 50, max: 1000 }),
      isDeleted: false,
      reactions: faker.datatype.number({ min: 0, max: 15 }),
      createdAt: faker.date.past(),
      updatedAt: faker.date.past(),
    };
    console.log("Created", post.title);
    console.log("======");
    data.posts.push(post);
  }
  fs.writeFileSync("db.json", JSON.stringify(data));
  console.log(`Created ${numberOfPost} posts`);
};

const numberInput = process.argv.slice(2)[0];
const overwriteInput = process.argv.slice(2)[1];

createPost(numberInput, overwriteInput);
