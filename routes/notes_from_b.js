var express = require('express');
var router = express.Router();
const cors = require('cors'); // corsミドルウェアを追加
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

// corsミドルウェアを使用
router.use(cors());

router.get('/', async (req, res) => {
    // データベース、コレクションを指定
    const database = client.db('notes');
    const notes = database.collection('notes');


    // 全てのドキュメントを取得
    const note = await notes.find({}).toArray();

    res.json(note);
})

module.exports = router;