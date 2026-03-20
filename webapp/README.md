# 测验系统 - 前端

学生登录 → 选题（5 套）→ 答题（20 道单选）→ 成绩 ≥80 分可进入后续程序。

## 访问方式

- **本地**：`python3 -m http.server 8000 --directory webapp`，访问 <http://localhost:8000>
- **GitHub Pages**：若部署到 `webapp/`，则 `https://sstgp-sgl.github.io/WebApplication/webapp/`

## 页面说明

| 页面 | 路径 | 说明 |
|------|------|------|
| 首页 | index.html | 重定向到登录或选题 |
| 登录 | login.html | 学号 + 姓名登录 |
| 选题 | select.html | 选择 5 套题目之一 |
| 答题 | quiz.html?set=1 | 20 道单选题 |
| 结果 | result.html | 通过/未通过，可重考 |
| 锁定 | locked.html | 未通过时访问 app 的提示 |
| 后续程序 | app.html | 通过后进入的占位页 |

## 技术说明

- 纯前端，登录与成绩存于 `localStorage`
- 题库在 `js/data.js`，5 套各 25 题，随机抽 20 题
- 通过标准：20 题全对 100 分，≥80 分通过
