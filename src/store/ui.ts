
import { create } from 'zustand'
import { SplitterSize, ImageUrl } from '@/types'

interface State {
    splitterSize: SplitterSize;
    captain: ImageUrl;
    rootIamgeUrl: ImageUrl;
}

interface Actions {
    updateSplitterSize: (sizes: SplitterSize) => void;
    resetSplitterSize: () => void
    setCaptain: (imageUrl: ImageUrl) => void
    setRootIamgeUrl: (imageUrl: ImageUrl) => void
}

const defaultSplitterSize = ['70%', '30%']

const useUI = create<State & Actions>((set) => ({
    splitterSize: defaultSplitterSize,
    captain: null,
    rootIamgeUrl: null,
    updateSplitterSize: (size) => set({ splitterSize: size }),
    resetSplitterSize: () => set({ splitterSize: defaultSplitterSize }),
    setCaptain: (imageUrl: ImageUrl) => set({ captain: imageUrl }),
    setRootIamgeUrl: (imageUrl: ImageUrl) => set({ rootIamgeUrl: imageUrl })
}))

export {
    useUI
}