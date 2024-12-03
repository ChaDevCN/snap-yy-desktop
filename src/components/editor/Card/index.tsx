import React from "react";
import { useDrop } from "react-dnd";
import { Card as AntdCard, Popconfirm } from "antd";

import { CloseOutlined } from "@ant-design/icons";

import { useComponents } from "@/store";
import { Card as CardProps, ID, OnDragEnd } from "@/types";

import { ComponentMap, ComponentItem } from "../ComponentItem";

const Remove = ({ index }: { index: ID }) => {
    const { removeCard } = useComponents();
    return (
        <Popconfirm
            placement="topLeft"
            title={"您确定要移除此厅吗"}
            okText="Yes"
            cancelText="No"
            onConfirm={() => removeCard(index)}
        >
            <CloseOutlined />
        </Popconfirm>
    );
};

const Card: React.FC<CardProps & { isEnd?: boolean }> = ({ id, title, tag, isEnd }) => {
    const { components, modifyComponents } = useComponents();
    const [{ isOver }, drop] = useDrop(() => ({
        accept: [...Object.keys(ComponentMap).map((item) => item)],
        drop: (_, monitor) => {
            const didDrop = monitor.didDrop();
            if (didDrop) return { didDrop };
            console.log(_, monitor);
            return {
                id,
            };
        },
        collect: (monitor) => ({
            canDrop: monitor.canDrop(),
            isOver: monitor.isOver(),
        }),
    }));

    return (
        <AntdCard
            ref={drop}
            className={`${isOver ? "active" : ""} max-h-75 min-h-50`}
            key={id}
            title={title}
            extra={isEnd ? <Remove index={id} /> : null}
        >
            <div className="flex flex-col justify-center space-y-1">
                {components
                    .filter((s) => s.pId === id)
                    .map((item) => (
                        <ComponentItem
                            id={item.id}
                            name={item.name}
                            pid={item.pId}
                            text={item.text}
                            key={item.id}
                            tag={item.tag}
                            onDragEnd={(name: OnDragEnd) => {
                                modifyComponents(item.pId, name.dropResult.id, item.id);
                            }}
                        />
                    ))}
            </div>
        </AntdCard>
    );
};

export {
    Card
}
