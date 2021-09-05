const port = process.env.PORT || 3000;
const {
    Sequelize,
    sequelize,
    Category,
    Product,
} = require('./models/index');
const express = require('express');


const app = express();

app.use(express.urlencoded({extended: false}));
app.use(express.json());


// 路由定義：開始


app.get('/', (req, res)=>{
    res.json({name: 'Shinder Lin'});
});

// 取得某個產品
app.get('/product/:id(\\d+)', async (req, res)=>{
    const output = {
        success: false,
        data: null,
    };
    const p = await Product.findByPk(req.params.id);
    if(p) {
        output.data = p;
        output.success = true;
    }
    res.json(output);
});

// 取得某分類的產品
// app.get('/cate/:id([0-9]+)', async (req, res)=>{
app.get('/cate/:id(\\d+)', async (req, res)=>{
    const output = {
        success: false,
        data: null,
    };
    const c = await Category.findByPk(req.params.id);
    if(c){
        const p = await Product.findAll({
            where: {
                categoryId: req.params.id
            }
        });
        output.data = {...c.dataValues, nodes: p};
        output.success = true;
    }
    res.json(output);
});




// 404 放在所有的路由後面
app.use((req, res)=>{
    res.type('text/html');
    res.status(404).send('<h1>找不到頁面</h1>');
});
// 路由定義：結束

app.listen(port, ()=>{
    console.log(`server started: ${port}`);
});






