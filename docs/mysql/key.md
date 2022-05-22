## 外键

```sql
# 定义外键
# sys_dict_map_dict_id_fk
constraint sys_dict_map_dict_id_fk
        foreign key (dict_id)
        references sys_dict (id)
        on delete cascade
```

on update cascade 和 on delete cascade 是数据库外键定义的可选项，
用来设置当主键表中的被参考列的数据发生变化时，外键表中相应字段的变换规则。

- no action 表示 不做任何操作；
- set null 表示在外键表中将相应字段设置为 null；
- set default 表示设置为默认值；
- cascade 表示级联操作，就是说，如果为 on update cascade，主键表中被参考字段更新，外键表中对应行相应更新；如果为 on delete cascade，主键表中的记录被删除，外键表中对应行相应删除。
  [MySQL 创建表时添加外键约束](https://wubin.work/blog/articles/153)
