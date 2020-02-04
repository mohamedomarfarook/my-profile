import express from 'express';
import next from 'next';
import compression from 'compression';
import routes from './routes';
import bodyParser from 'body-parser';

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'

const app = next({ dev })
const handle = routes.getRequestHandler(app)

app.prepare()
.then(() => {
  const server = express();
  server.use(compression());
  server.use(bodyParser.urlencoded({ extended: false }));
  server.use(bodyParser.json());
  
  //Mailer
  server.post('/api/contact', (req, res) => {
    const { email, name } = req.body
    console.log(req.body)
    res.send('success')
  });
  
  server.get('*', (req, res) => handle(req, res))
  
  // server
  server.use(handle).listen(port, (err) => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
})
