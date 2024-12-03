import { Card } from "@/components/editor"
import { useComponents } from "@/store"
const Stage = () => {
    const { cards } = useComponents()
    const hallCards = cards.filter(s => s.tag === 'hall')
    return (
        <div className="flex-1 h-full m-4">
            <div className="grid 2xl:grid-cols-4 lg:grid-cols-3 grid-cols-1 gap-2">
                {
                    hallCards.map((item, index) =>
                        <Card id={item.id} key={item.id} title={item.title} isEnd={index === hallCards.length - 1} tag="hall" />
                    )
                }
            </div>
        </div >
    )
}
export default Stage