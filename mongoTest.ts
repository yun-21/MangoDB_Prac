import { MongoClient, Db } from 'mongodb';

const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    const db: Db = client.db('testDatabase');
    const collection = db.collection('testCollection');

    await collection.insertOne({ name: 'Alice', age: 30 });
    await collection.insertMany([
      { name: 'Bob', age: 25 },
      { name: 'Charlie', age: 35 }
    ]);

    const docs = await collection.find().toArray();
    console.log('Documents in testCollection:', docs);

    await collection.updateOne(
      { name: 'Alice' },
      { $set: { age: 31 } }
    );

    await collection.deleteOne({ name: 'Bob' });

    // 컬렉션 삭제
    // await collection.drop();

    // 데이터베이스 삭제
    // await db.dropDatabase();

  } finally {
    await client.close();
  }
}

run().catch(console.dir);
