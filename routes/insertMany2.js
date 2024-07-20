var express = require('express');
var router = express.Router();
require('dotenv').config();

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

    // データを登録
    const query = [
        { name: 'Yasushi', mail: 'osonoi@cu', tel: '1111' },
        { name: 'Koh', mail: 'kojima@cu', tel: '2222' },
        { name: 'Alice', mail: 'alice@example.com', tel: '3333' },
        { name: 'Bob', mail: 'bob@example.com', tel: '4444' },
        { name: 'Charlie', mail: 'charlie@example.com', tel: '5555' },
        { name: 'David', mail: 'david@example.com', tel: '6666' },
        { name: 'Eve', mail: 'eve@example.com', tel: '7777' },
        { name: 'Frank', mail: 'frank@example.com', tel: '8888' },
        { name: 'Grace', mail: 'grace@example.com', tel: '9999' },
        { name: 'Henry', mail: 'henry@example.com', tel: '0000' },  
    ];
    const note = await notes.insertMany(query);
    console.log(note);

    
} finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);

module.exports= router;