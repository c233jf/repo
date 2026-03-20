-- to-do 应用示例的数据库表结构

-- 项目表是由任务组成的
create table project (
    name        text primary key,
    description text,
    deadline    date
);

-- 任务是完成项目的步骤
create table task (
    id           integer primary key autoincrement not null,
    priority     integer default 1,
    details      text,
    status       text,
    deadline     date,
    completed_on date,
    project      text not null references project(name)
);
