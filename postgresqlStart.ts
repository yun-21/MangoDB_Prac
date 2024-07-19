import { Pool } from 'pg';

const pool = new Pool({
  user : "postgres",
  host : 'localhost',
  database : 'shindatabase',
  password : '1234',
  port : 5432,
});

async function addUser(pwd: string, name: string, tel:string){
  const client = await pool.connect(); // post랑 연결하는 법
  try {
    await client.query('INSERT INTO users(pwd,name,tel) VALUES($1,$2,$3)',[pwd,name,tel]);
    console.log(`사용자 '${name}' 추가 완료` );
  }catch(err){
    console.error('쿼리 실행 오류:',err);
  }finally{
    client.release();
  }
}

(async () => {
  try {
    await pool.query('CREATE TABLE IF NOT EXISTS users (id SERIAL PRIMARY KEY, pwd VARCHAR(50) NOT NULL, name VARCHAR(100) NOT NULL, tel VARCHAR(20) NOT NULL)');
    await addUser('123', '모모씨', '010-1234-5678');
  } catch (err) {
    console.error('오류 발생:', err);
  } finally {
    await pool.end();
  }
})();