import express from 'express';
import mysql2 from 'mysql2';
import dotenv from 'dotenv';

const app = express();
const PORT = 3002;

dotenv.config();
app.use(express.static('public'));
//create a connection pool
const pool = mysql2.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
}).promise();

app.use(express.urlencoded({extended: true}));
app.set('view engine', 'ejs');

app.get('/', (req, res) =>{
    res.render('resume');
});

app.get('/contact-form', (req, res) =>{
    res.render('contact-form');
});

app.get('/admin', async(req, res) =>{

    const [data_input_list] = await pool.query('SELECT * FROM contact_requests order by timestamp DESC');
    res.render('admin', {data_input_list});
});

app.post('/confirm', async (req, res) =>{
    const data_input = req.body;
    data_input.timestamp = new Date();

    const sql_insert = 'INSERT INTO contact_requests (fname, lname, job_title, company, linkedin, email, met, met_other, message, mailing_list, email_format, timestamp) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';

    const params = [
        data_input.fname,
        data_input.lname,
        data_input['job-title'],
        data_input.company,
        data_input.linkedin,
        data_input.email,
        data_input.met,
        data_input['met-other'],
        data_input.message,
        data_input['mailing-list'],
        data_input['email-format'],
        data_input.timestamp
    ];

    const [result] = await pool.execute(sql_insert, params);
    data_input.id = result.insertId;
    console.log("New req with id: " + data_input.id + " has been created.");

    res.render('confirm', {data_input});
});


app.listen(PORT, () =>{
    console.log(`Server is running at: http://localhost:${PORT}`);
});