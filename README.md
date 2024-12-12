# snap-yy

## 项目简介

`snap-yy` 是一个基于 React 和 Ant Design 构建的应用程序，旨在提供快速和高效的 UI 组件，支持自定义功能和配置。它使用了最新的前端技术栈，并集成了多种流行工具，提供了现代化的开发体验。

## 技术栈

- **React**: 用于构建用户界面
- **Ant Design**: UI 组件库
- **TailwindCSS**: 实用的 CSS 框架
- **Day.js**: 时间处理库
- **React DnD**: 拖拽功能实现
- **Vite**: 快速构建工具
- **TypeScript**: 增强类型安全
- **Zustand**: 状态管理
- **ESLint & Prettier**: 代码风格检查和格式化

## 功能特性

- 拖拽功能 (`react-dnd`): 支持自定义拖拽组件。
- 随机数生成器：支持指定最小值、最大值和生成次数，并生成不重复的随机数。
- 多种 UI 组件：使用 Ant Design 和 TailwindCSS 提供响应式布局和现代化的组件。
- 时间显示：通过 Day.js 提供动态的时间显示功能，支持实时更新时间。

## 安装与运行

1. **克隆仓库**

   ```bash
   git clone https://github.com/ChaDevCN/snap-yy-desktop.git
   cd snap-yy-desktop
   ```

2. **安装依赖**
   使用 `pnpm` 或 `npm` 安装项目依赖。

   ```bash
   pnpm install
   ```

   或者

   ```bash
   npm install
   ```

3. **开发模式**
   启动开发服务器以查看应用。

   ```bash
   npm run dev
   ```

   默认情况下，应用将运行在 [http://localhost:5173](http://localhost:5173)。

4. **构建项目**
   如果要生成生产环境的构建文件，可以运行：

   ```bash
   npm run build
   ```

5. **预览构建**
   你可以使用以下命令来预览构建后的应用：

   ```bash
   npm run preview
   ```

6. **Tauri**
   如果你需要启动 Tauri 相关命令：
   ```bash
   npm run tauri
   ```

## 在线预览

查看 在线预览 体验 [snap-yy](https://xc.liuchang.plus) 的功能。

## 配置

### Node.js 版本

此项目要求 Node.js 版本 `>=18.15.0`，你可以使用 [nvm](https://github.com/nvm-sh/nvm) 或 [Volta](https://volta.sh/) 管理你的 Node 版本。

## 代码风格

- 使用 [ESLint](https://eslint.org/) 进行代码检查。
- 使用 [Prettier](https://prettier.io/) 进行代码格式化。

## 贡献

欢迎贡献代码！如果你有兴趣帮助改进这个项目，请遵循以下步骤：

1. Fork 这个仓库
2. 创建一个新分支 (`git checkout -b feature/your-feature`)
3. 提交你的更改 (`git commit -am 'Add new feature'`)
4. 推送到分支 (`git push origin feature/your-feature`)
5. 提交 Pull Request

## License

这个项目是开源的，并采用 [MIT License](LICENSE) 许可证。完全开源并可以接受商用。

## 参考

- [React 官方文档](https://reactjs.org/docs/getting-started.html)
- [Ant Design](https://ant.design/docs/react/introduce)
- [TailwindCSS](https://tailwindcss.com/)
- [Day.js](https://day.js.org/)
- [React DnD](https://react-dnd.github.io/react-dnd/)
