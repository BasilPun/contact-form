import express from 'express';

const app = express();
const PORT = 3002;

app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.set('view engine', 'ejs');

const data_input_list = []

app.get('/', (req, res) =>{
    res.render('home');
});

app.get('/admin', (req, res) =>{
    res.render('admin', {data_input_list});
});

app.post('/confirm', (req, res) =>{
    const data_input = req.body;
    data_input.timestamp = new Date();
    data_input_list.push(data_input);
    res.render('confirm', {data_input});
});


app.listen(PORT, () =>{
    console.log(`Server is running at: http://localhost:${PORT}`);
});