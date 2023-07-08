import cors from 'cors';
import express from 'express';
import proxy from 'express-http-proxy';
import morgan from 'morgan';

const app = express();
const url = 'https://reqres.in'; // 요청을 보낼 서버 도메인
const port = 9090; // 프록시 서버 사용 포트

app.use(cors());
app.use(morgan('tiny'));
app.use('/', proxy(url));

app.listen(port, () => {
  console.log(`👉 Listening on ${port}, 📮 Proxy [ ${url} ]`);
});