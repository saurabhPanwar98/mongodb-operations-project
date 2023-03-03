const MongoClient = require("mongodb").MongoClient;
const uri = "mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.7.1";
const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    console.log("Connected");
    const database = client.db("shopDB")
    const collection = database.collection("products")


    const data = {
      _id:3,
      name:"Bottle",
      price:5,
      stock:25,
      author:"Arav"
    }

    const dataToLook = {
      name:"Pencil"
    }

    const targetToUpdate = {
      _id:3
    }

    const updateThis = {
      $set:{author:"Arav"}
    }

    const deleteThis = {
      _id:3
    }
    // CRUD singularity ops
    // insertOne(database,data);
    // findOneData(database,dataToLook);
    // updateOneDoc(database,targetToUpdate,updateThis)
    // deleteOneDoc(database,deleteThis);
    // 

    const multipleDocs = [
      {
        _id:4,
        name:"Cutter",
        price:0.5,
        stock:22,
        author:"Ashu"
      },
      {
        _id:5,
        name:"Rubber",
        price:0.8,
        stock:21,
        author:"Ashu"
      },
      {
        _id:6,
        name:"Protector",
        price:1.3,
        stock:16,
        author:"Arav"
      }
    ]


    const query = {
      stock : {$gte:20},
      price:{$gt:1}
    }
    const options = {
      sort : {_id:1},
      projection:{_id:1,name:1,stock:1}
    }

    const queryForUpdate = {
      stock : {$gt:20}
    }
    const updateManyData = {
      $set : {"warehouse" : "Haridwar"}
    }

    const queryForDelete = {
      author:"Ashu"
    }
    // CRUD multiple operations
    // insertManyDocs(database,multipleDocs);   
    // findManyDocs(database,query,options);
    
    // updateManyDocs(database,queryForUpdate,updateManyData);
    // deleteManyDocs(database,queryForDelete);

    // collection.find().forEach(doc=>{
    //   console.log(doc);
    // })
   
  } catch (error) {
    console.log(error);
  }

}

run();

// Single document operation functions

async function insertOne(client,data){
  const insert = await client.collection("products").insertOne(data);
  const result = await insert;
  console.log(result);
}

async function findOneData(client,dataToLook){
  const find = await client.db("shopDB").collection("products").findOne(dataToLook);
  
  if(find) {
    console.log(`Found data for ${dataToLook.name}`);
    console.log(find);
  } else {
    console.log(`No data found for ${dataToLook.name}`);
  }
}

async function updateOneDoc(database,target,updatedData){
  const update = await database.collection("products").updateOne(target,updatedData)
  console.log(update);
}

async function deleteOneDoc(database,remove){
  const del = await database.collection("products").deleteOne(remove);
  console.log(del);
}

// Multiple documents operations functions

async function insertManyDocs(client,docs){
  const inserts = await client.collection("products").insertMany(docs)
  console.log(inserts);
}


async function findManyDocs(client,query,options){
  const cursor = client.collection("products").find(query,options);
  if(await cursor.length === 0){
    console.log("No docs found");
  }
  await cursor.forEach(element => {
    console.log(element);
  });
}

async function updateManyDocs(client,queryForUpdate,updateManyData){
  const updates = await client.collection("products").updateMany(queryForUpdate,updateManyData);
  console.log(updates)
}

async function deleteManyDocs(client,queryForDelete){
  const deletion = await client.collection("products").deleteMany(queryForDelete)
  console.log(deletion);
}