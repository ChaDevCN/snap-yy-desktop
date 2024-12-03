import { create } from "zustand";
import { Component, Card, ID, PID } from "@/types";

interface State {
    components: Component[];
    cards: Card[];
}

interface Actions {
    /**
     *  添加组件
     * @param component 组件属性
     * @returns
     */
    addComponents: (component: Component) => void;
    modifyComponents: (pId: PID, newId: ID, id: ID) => void;
    deteleComponets: (id: ID) => void;
    updateCard: (card: Card) => void;
    removeCard: (id: ID) => void;
}

const useComponents = create<State & Actions>((set) => ({
    components: [],
    cards: [],
    addComponents: (component) =>
        set((state) => ({
            components: [...state.components, component],
        })),
    modifyComponents: (pId, newId, id) =>
        set((state) => ({
            components: state.components.map((component) =>
                component.pId === pId && component.id === id
                    ? { ...component, pId: newId }
                    : component
            ),
        })),
    deteleComponets: (id) =>
        set((state) => ({
            components: state.components.filter((s) => s.id !== id),
        })),
    updateCard: (card) =>
        set((state) => {
            const existingIndex = state.cards.findIndex((c) => c.id === card.id);
            if (existingIndex !== -1) {
                const updatedCards = [...state.cards];
                updatedCards[existingIndex] = card;
                return { cards: updatedCards };
            }

            return { cards: [...state.cards, card] };
        }),
    removeCard: (id) =>
        set((state) => ({
            cards: state.cards.filter((s) => s.id !== id),
        })),
}));

export { useComponents };
