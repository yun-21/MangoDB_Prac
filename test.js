// MongoDB 서버에 연결되지 않은 상태에서 실행되는 기본 스크립트

// 데이터베이스 선택 (선택된 데이터베이스가 없으면 새로 생성됨)
db = db.getSiblingDB('testDatabase');

// 컬렉션 생성
db.createCollection('testCollection');

// 문서 삽입
db.testCollection.insertOne({
  name: 'Alice',
  age: 30
});

// 여러 문서 삽입
db.testCollection.insertMany([
  { name: 'Bob', age: 25 },
  { name: 'Charlie', age: 35 }
]);

// 문서 조회
print("Documents in testCollection:");
db.testCollection.find().forEach(printjson);

// 문서 업데이트
db.testCollection.updateOne(
  { name: 'Alice' }, // 필터 조건
  { $set: { age: 31 } } // 업데이트할 내용
);

// 문서 삭제
db.testCollection.deleteOne({ name: 'Bob' });

// 전체 컬렉션 삭제
db.testCollection.drop();

// 데이터베이스 삭제
db.dropDatabase();