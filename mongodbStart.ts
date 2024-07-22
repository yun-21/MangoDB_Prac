const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/testShin',{
  useNewUrlParser:true,
  useUnifiedTopology:true,
})
.then(()=>console.log('몽고 연결'))
.catch((err: unknown) =>console.error('몽고 연결 에러',err));

const mongoSchema = new mongoose.Schema({
  data: String,
});
const MongoModel = mongoose.model('testShin', mongoSchema);   