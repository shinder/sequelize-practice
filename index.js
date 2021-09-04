const {
    Sequelize,
    sequelize,
    User
} = require('./models/index');

(async ()=>{
    // 資料表變更時，請手動刪除資料表
    await sequelize.sync();  // 若資料表不存在，依 model 建立資料表
    const u1 = await User.create({firstName:'新德', lastName: 'Lin', birthday: '1999-12-12'});
    console.log(u1.toJSON());
    process.exit();
})();