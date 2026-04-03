# Gradventure 前端（`webapp/`）

游戏化留学准备：**大一抉择卡牌** → **结局** → **商店** 用成长点数解锁后续内容（如导师 / supervisor 推荐筛选，开发中）。

## 流程

1. **`index.html`** → 跳转 **`game-demo.html`**
2. 玩家完成多轮抉择（Reigns 式左右滑 / 按钮），四条状态条变化，得到一种毕业结局
3. 通关获得 **成长点数**；首次达成某结局有额外点数
4. **商店**：消耗点数解锁「导师推荐完整列表」等占位；后续可替换为 **supervisor 推荐筛选** 等真实功能

无旧版「登录 → 选题 → 计分测验」流程；数据暂存浏览器 `localStorage`（键名含 `gradventure_demo_`）。

## 文件

| 文件 | 说明 |
|------|------|
| `game-demo.html` | 单页：标题 / 游玩 / 结局 / 商店 |
| `js/game-demo.js` | 卡牌、状态、结局、点数与商店逻辑 |
| `css/game-demo.css` | 深色 UI、计量条、卡面 |
| `css/styles.css` | 基础样式（与 game-demo 共用） |
| `index.html` | 入口，跳转游戏 |

## 线上预览

部署到 GitHub Pages 后，例如：

`https://<user>.github.io/<repo>/webapp/`  
`https://<user>.github.io/<repo>/webapp/game-demo.html`
