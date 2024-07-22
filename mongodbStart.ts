import { MongoClient } from 'mongodb';

async function main() {
    const uri = "mongodb://localhost:27017";
    const client = new MongoClient(uri);

    try {
        await client.connect();
        const database = client.db('testDB');
        const collection = database.collection('testCollection');

        const docs = [
            { name: 'Alice', age: 30 },
            { name: 'Bob', age: 25 },
            { name: 'Charlie', age: 35 }
        ];

        const result = await collection.insertMany(docs);
        console.log(`Documents inserted: ${result.insertedCount}`);

        const documents = await collection.find({}).toArray();
        console.log('Documents in testCollection:', documents);
    } finally {
        await client.close();
    }
}

main().catch(console.error);