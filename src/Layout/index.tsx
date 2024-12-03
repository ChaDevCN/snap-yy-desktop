import { DndProvider } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"
import Stage from "./Stage"
import Setting from "./Setting"
import Material from "./Material"


const Layout = () => {
    return (
        <DndProvider backend={HTML5Backend}>
            <div className="w-full h-full flex justify-between">
                <Material />
                <Stage />
                <Setting />
            </div>
        </DndProvider>
    )
}
export default Layout