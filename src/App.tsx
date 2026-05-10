import { Layout, Typography, theme } from "antd";
import { SortableDemo } from "./components/SortableDemo";
import styles from "./App.module.scss";

const { Header, Content } = Layout;
const { Title, Paragraph } = Typography;

export default function App() {
  const { token } = theme.useToken();

  return (
    <Layout className={styles.layout} style={{ minHeight: "100vh", background: token.colorBgLayout }}>
      <Header className={styles.header} style={{ background: token.colorBgContainer }}>
        <Title level={3} className={styles.title} style={{ margin: 0 }}>
          React 19 · Ant Design · SCSS Modules · dnd-kit
        </Title>
      </Header>
      <Content className={styles.content}>
        <Paragraph type="secondary" className={styles.intro}>
          下方列表使用 <code>@dnd-kit/sortable</code> 與 Ant Design <code>Card</code>，樣式來自{" "}
          <code>*.module.scss</code>。
        </Paragraph>
        <SortableDemo />
      </Content>
    </Layout>
  );
}
