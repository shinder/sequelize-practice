const {
    Sequelize,
    sequelize,
    User,
    Member
} = require('./models/index');

(async ()=>{
    // 資料表變更時，請手動刪除資料表
    await sequelize.sync();  // 若資料表不存在，依 model 建立資料表
    const u1 = await User.create({firstName:'新德', lastName: 'Lin', birthday: '1999-12-12'});
    console.log(u1.toJSON());

    const m1 = await Member.create({
        email: 'shinder.lin@gmail.com',
        name: '林小新',
        password: sequelize.fn('SHA1', '123456'),
        mobile: '0918123456',
        address: '宜蘭縣',
        birthday: '1999-12-12',
        hash: sequelize.fn('SHA1', Math.random().toString()),
    });

    process.exit();
})();