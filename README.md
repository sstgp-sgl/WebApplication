# ApplicationWeb

**Gradventure** — 游戏化留学准备平台（HCI 课程项目）。

## 用户流程（当前）

1. **玩游戏**：Reigns 式卡牌抉择（大一 → 毕业结局），无分数及格线。
2. **商店**：用局内获得的 **成长点数** 解锁奖励内容；后续计划接入 **supervisor 推荐筛选**、SURF/导师相关数据等。

旧版「登录 → 选题 → 计分测验 → 80 分过关」已移除。

## 仓库内容

| 部分 | 说明 |
|------|------|
| **`webapp/`** | 静态前端：`game-demo.html`（卡牌游戏 + 结局 + 商店占位），`index.html` 入口进入游戏 |
| **`docs/`** | Astro 过程作品集，GitHub Actions 部署至 GitHub Pages |
| **`ApplicationWeb/`**（子目录） | 可选 **Bun + PostgreSQL + JWT** 后端 API，见该目录下 `README.md` 与 `AUTH_SETUP.md` |

## 链接（示例）

- 作品集：`https://sstgp-sgl.github.io/WebApplication/`
- 游戏入口：`https://sstgp-sgl.github.io/WebApplication/webapp/` 或 `.../webapp/game-demo.html`

## GitHub Pages

1. Settings → Pages → Source: **GitHub Actions**
2. 工作流构建 Astro 站点后，`docs/public/webapp/` 会随站点同步到线上 `webapp/` 路径（以当前仓库配置为准）。

## 文档

- 作品集：`docs/PORTFOLIO_README.md`
- 后端（子项目）：`ApplicationWeb/README.md`、`ApplicationWeb/BACKEND_SETUP.md`、`ApplicationWeb/AUTH_SETUP.md`

---

**Course**: Human-Computer Interaction  
**Semester**: Spring 2025
