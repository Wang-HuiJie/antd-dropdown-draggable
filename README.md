# React 19 + Ant Design + SCSS Modules + dnd-kit

以 [Vite](https://vitejs.dev/) 建置的範例專案：React 19、Ant Design 5、Sass（含 `*.module.scss`）、[@dnd-kit](https://docs.dndkit.com/) 可排序列表示範。

## 需求

- Node.js 建議 **20.19+** 或 **22.12+**（與目前 Vite 工具鏈相容）

## 指令

```bash
npm install
npm run dev
```

```bash
npm run build
npm run preview
```

```bash
npm run lint
```

## 技術重點

- **樣式**：`src/App.module.scss`、`src/components/SortableDemo.module.scss`；Vite 已設定 `css.modules.localsConvention: "camelCase"`。
- **國際化**：`main.tsx` 使用 `antd/locale/zh_TW` 的 `ConfigProvider`。
- **拖曳**：僅在拖曳把手上啟動（`PointerSensor` 搭配 `distance: 6`），避免與卡片內互動衝突。
