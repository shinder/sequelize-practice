const port = process.env.PORT || 3000;
const {
    Sequelize,
    sequelize,
    Category,
    Product,
    User,
} = require('./models/index');
const { Op } = Sequelize;

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

        // c.dataValues, c.get() 取得資料物件
        // output.data = {...c.dataValues, nodes: p};
        output.data = {...c.get(), nodes: p};
        output.success = true;
    }
    res.json(output);
});

// 分頁, pagination
app.get('/product', async (req, res)=>{
    const perPage = 4;
    let page = 1;
    if(req.query.page){
        page = parseInt(req.query.page);
    }
    if(page<1) {
        return res.redirect('?page=1');
    }

    let output = {};

    // result = { count, rows}; // 將取得兩個屬性
    const {count, rows} = await Product.findAndCountAll({
        where: {
            // price: {
            //     [Op.lte]: 500
            // }
        },
        limit: perPage,
        offset: (page-1)*perPage
    });
    if(count !== 0 && rows.length===0) {
        return res.redirect('?page=1');
    }
    output = {
        count,
        rows,
        perPage,
        page,
        totalPages: Math.ceil(count/perPage)
    }
    res.json(output);
});

// 讀取再修改產品的價格
app.get('/product/price/:id(\\d+)', async (req, res)=>{
    const output = {
        success: false,
        data: null,
    };
    const p = await Product.findByPk(req.params.id);
    if(p) {
        p.price ++;
        output.data = await p.save(); // 儲存變更
        output.success = true;
    }
    res.json(output);
});

// 直接修改產品的價格
app.get('/product/price2/:id(\\d+)', async (req, res)=>{
    const output = {
        success: false,
        updatedCount: null,
    };
    [output.updatedCount] = await Product.update({price: 100}, {
        where:{
            id: req.params.id
        }
    });
    if(output.updatedCount) {
        output.success = true;
    }
    res.json(output);
});

// 新增測試資料
app.get('/user/add', async (req, res)=>{
    // const u1 = await User.create({firstName:'新德', lastName: '林', birthday: Date.now()});

    const u1 = new User({firstName:'新德', lastName: '林', birthday: Date.now()});
    await u1.save();
    res.json(u1);
});

// 用靜態方法 destroy() 移除資料
app.get('/user/del/:id(\\d+)', async (req, res)=>{
    const output = {
        success: false,
        deletedCount: 0,
    };

    output.deletedCount = await User.destroy({
        where: {
            id: req.params.id
        }
    });
    if(output.deletedCount){
        output.success = true;
    }
    res.json(output);
});

// 用物件方法 destroy() 移除資料
app.get('/user/del2/:id(\\d+)', async (req, res)=>{
    const output = {
        success: false,
        data: undefined,
    };

    const u1 = await User.findByPk(req.params.id);
    if(u1 && await u1.destroy()){
        output.success = true;
        output.data =  u1;
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






