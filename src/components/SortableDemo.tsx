import { useMemo, useState } from "react";
import {
  DndContext,
  type DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { HolderOutlined } from "@ant-design/icons";
import { Card, Space, Tag } from "antd";
import styles from "./SortableDemo.module.scss";

type Item = { id: string; title: string; tag: string };

const initialItems: Item[] = [
  { id: "1", title: "第一項", tag: "待辦" },
  { id: "2", title: "第二項", tag: "進行中" },
  { id: "3", title: "第三項", tag: "完成" },
  { id: "4", title: "第四項", tag: "待辦" },
];

function SortableRow({ item }: { item: Item }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: item.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} className={styles.rowWrap}>
      <Card
        size="small"
        className={`${styles.card} ${isDragging ? styles.cardDragging : ""}`}
        styles={{ body: { padding: "12px 16px" } }}
      >
        <div className={styles.row}>
          <button
            type="button"
            className={styles.handle}
            aria-label="拖曳排序"
            {...attributes}
            {...listeners}
          >
            <HolderOutlined />
          </button>
          <Space direction="vertical" size={0} className={styles.meta}>
            <span className={styles.itemTitle}>{item.title}</span>
            <Tag bordered={false} color="processing">
              {item.tag}
            </Tag>
          </Space>
        </div>
      </Card>
    </div>
  );
}

export function SortableDemo() {
  const [items, setItems] = useState(initialItems);
  const ids = useMemo(() => items.map((i) => i.id), [items]);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const oldIndex = items.findIndex((i) => i.id === active.id);
    const newIndex = items.findIndex((i) => i.id === over.id);
    if (oldIndex === -1 || newIndex === -1) return;
    setItems((prev) => arrayMove(prev, oldIndex, newIndex));
  }

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={ids} strategy={verticalListSortingStrategy}>
        <div className={styles.list}>
          {items.map((item) => (
            <SortableRow key={item.id} item={item} />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}
