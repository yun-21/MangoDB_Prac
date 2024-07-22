// TypeScript에서는 MongoDB를 TypeScript의 타입을 사용하여 정의할 수 있어
// 먼저 `mongodb` 패키지를 설치해 주어야 해

// MongoDB 클라이언트 모듈 가져오기
import { MongoClient, Db } from 'mongodb';

// MongoDB 클라이언트 연결 문자열
const uri = 'mongodb://localhost:27017';

// MongoDB 클라이언트 생성
const client = new MongoClient(uri);

// 데이터베이스와 컬렉션 설정
async function run() {
  try {
    // 클라이언트 연결
    await client.connect();
    
    // 데이터베이스 선택 (없으면 새로 생성됨)
    const db: Db = client.db('testDatabase');

    // 컬렉션 생성
    const collection = db.collection('testCollection');

    // 문서 삽입
    await collection.insertOne({ name: 'Alice', age: 30 });
    await collection.insertMany([
      { name: 'Bob', age: 25 },
      { name: 'Charlie', age: 35 }
    ]);

    // 문서 조회
    const docs = await collection.find().toArray();
    console.log('Documents in testCollection:', docs);

    // 문서 업데이트
    await collection.updateOne(
      { name: 'Alice' }, // 필터 조건
      { $set: { age: 31 } } // 업데이트할 내용
    );

    // 문서 삭제
    await collection.deleteOne({ name: 'Bob' });

    // 컬렉션 삭제
    await collection.drop();

    // 데이터베이스 삭제
    await db.dropDatabase();

  } finally {
    // 클라이언트 연결 종료
    await client.close();
  }
}

// 스크립트 실행
run().catch(console.dir);
