import React from "react";

import { useDrag } from 'react-dnd'
import { Badge, Popover, Segmented } from 'antd'
import { ComponentType, ID, OnDragEnd, PID, Tag, Text as TextType } from "@/types";
import { useComponents } from "@/store";


interface Props {
    name: ComponentType,
    onDragEnd: (obj: OnDragEnd) => void
    id: ID
    pid: PID
}
interface ImageProps {
    text: TextType,
    tag: Tag
}
const Image: React.FC<ImageProps> = ({ text: src, tag }) => (
    <>
        {
            tag === 2 ? <Badge count="队长" ><img src={src} alt={src} className="h-auto max-h-[15px] w-auto" /></Badge> : <img src={src} alt={src} className="h-auto max-h-[15px] w-auto" />
        }
    </>

);
const Text: React.FC<ImageProps> = ({ text }) => (
    <p className="w-full text-center">{text}</p>
);

const ComponentMap = {
    image: Image,
    text: Text,
};

const ComponentItem: React.FC<ImageProps & Props> = ({
    name,
    onDragEnd,
    id,
    pid,
    text,
    tag
}) => {
    const { cards, modifyComponents } = useComponents()
    const [{ isDragging }, drag] = useDrag(() => ({
        type: name,
        end: (_, monitor) => {
            const dropResult: { id: number | string } | null =
                monitor.getDropResult();

            if (!dropResult) return;
            if (onDragEnd) {
                onDragEnd({
                    name,
                    dropResult,
                });
            }
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
            handlerId: monitor.getHandlerId(),
        }),
    }));
    const opacity = isDragging ? 0.4 : 1;
    const Component = ComponentMap[name];
    const rootCard = {
        label: '麦序',
        value: null
    }
    const hallCards = [rootCard, ...cards.filter(item => item.tag === 'hall').map(item => ({
        label: item.title,
        value: item.id,
        key: item.id,
    }))]

    return (
        <Popover trigger="click" placement="right" content={<Segmented<string>
            options={[...hallCards]}
            defaultValue={pid as string}
            onChange={(value) => {
                console.log(value);
                modifyComponents(pid, value, id)
            }}
        />}>
            <div
                ref={drag}
                className="max-w-9/12 mx-auto w-full cursor-move rounded-lg border-[1px] border-dashed border-[gray] bg-white px-2 py-1"
                style={{
                    opacity,
                }}
            >
                <Component text={text} tag={tag} />

            </div></Popover>
    );
};

export {
    Image,
    Text,
    ComponentItem,
    ComponentMap,
}