/**
 * 拖拽的百分比
 */
export type SplitterSize = string[] | number[];

export type ID = number | string;

export type ImageUrl = string | null;
export type ComponentType = "image" | "text";

export type Text = string;

export type Tag = 1 | 2

export type PID = number | string | null

export interface Component {
    /**
     * 组件唯一标识
     */
    id: ID;
    /**
     * 组件名称
     */
    name: ComponentType;
    /**
     * 文本或url
     */
    text: Text;
    /**
     * card Id
     */
    pId: PID;
    /**
     * tag 
     */
    tag: Tag
}

export type OnDragEnd = {
    name: ComponentType;
    dropResult: {
        id: ID;
    };
};

export type CardType = 'hall' | 'captain' | 'pool'

export type Card = {
    /*
     * 卡片唯一标识
     */

    id: ID
    /**
     * 卡片标题
     */
    title: string
    /**
     *  hall: 大厅
     *  Captain： 队长厅
     *  pool: 麦序
     */
    tag: CardType
}