const { EntitySchema } = require("typeorm");

const Article = new EntitySchema({
    name: "Article",
    tableName: "articles",
    columns: {
        // 主键（自增整数示例，根据需求选 UUID）
        id: {
            primary: true,
            type: "int",
            generated: "increment"
        },
        title: {
            type: "varchar",
            length: 255,
            nullable: false,
            unique: false
        },
        type: {
            type: "varchar",
            length: 255,
            nullable: false
        },
        content: {
            type: "text",
            nullable: false
        },
        markdownContent: {
            type: "text",
            nullable: false
        },
        createTime: {
            type: "varchar",
            length: 255,
            nullable: false
        }
    },
    relations: {
        // 一个问题可以属于多个分类（多对多关系）
        user: {
            type: 'many-to-many', // 关系类型：多对多
            target: 'User', // 关联的目标实体
            inverseSide: 'articles', // 对应 User 中关联 Article 的字段名
         
           
        }
    }
});

module.exports = { Article };