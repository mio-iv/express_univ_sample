var express = require('express');
var router = express.Router();
require('dotenv').config()

// 接続情報を設定
const { MongoClient, ServerApiVersion } = require('mongodb');
const { MONGODB_ACCESS_PASSWD } = process.env
const uri = `mongodb+srv://AdminUser:${MONGODB_ACCESS_PASSWD}@testcluster01.rn8jcef.mongodb.net/?retryWrites=true&w=majority&appName=TestCluster01`;
const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });

async function run() {
try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
    // データベース、コレクションを指定
    const database = client.db('notes');
    const notes = database.collection('notes');
    
    // すべてのレコードを削除
    const result = await notes.deleteMany( {} );
    console.log(result);

    
} finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);

module.exports= router;