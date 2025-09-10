const { EntitySchema } = require("typeorm");

const User = new EntitySchema({
    name: "User",
    tableName: "users",
    columns: {
        // 主键（自增整数示例，根据需求选 UUID）
        id: {
            primary: true,
            type: "int",
            generated: "increment"
        },
        username: {
            type: "varchar",
            length: 255,
            nullable: false,
            unique: true
        },
        password: {
            type: "varchar",
            length: 255,
            nullable: false
        },
    }
});

module.exports = { User };