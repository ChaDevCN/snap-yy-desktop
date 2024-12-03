import React, { ReactNode } from "react";
import { Splitter, Result } from "antd";
import { SmileOutlined } from "@ant-design/icons";
import { v4 as uuidv4 } from "uuid";
import { Divider } from "@/components/base";
import { ComponentItem } from "@/components/editor";
import { useComponents, useUI } from "@/store";
import { extractTextRegionsFromImage } from "@/utils";
import { Component, Tag } from "@/types";

const RenderComponents: React.FC<{ components: Component[]; tag: Tag }> = ({
    components,
    tag,
}) => {
    const { modifyComponents } = useComponents();
    return (
        <div className="space-y-1 flex-1">
            {components.map((item) =>
                !item.pId && item.tag === tag ? (
                    <ComponentItem
                        tag={item.tag}
                        name={item.name}
                        pid={item.pId}
                        key={item.id}
                        text={item.text}
                        id={item.id}
                        onDragEnd={(name) => {
                            modifyComponents(item.pId, name.dropResult.id, item.id);
                        }}
                    />
                ) : null
            )}
        </div>
    );
};
const PasteImageInstructions: React.FC<{
    title?: string;
    icon?: ReactNode;
}> = ({ title, icon }) => {
    return (
        <div className="result-container">
            <Result
                icon={icon || null}
                title={
                    <p className="text-lg font-semibold text-center">
                        {title || "点击此处后，"}
                        使用 <kbd className="rounded bg-gray-200 px-2 py-1">
                            Ctrl
                        </kbd> + <kbd className="rounded bg-gray-200 px-2 py-1">V</kbd>{" "}
                        粘贴图片
                    </p>
                }
            />
        </div>
    );
};

const Material = () => {
    const { splitterSize, updateSplitterSize, setCaptain, setRootIamgeUrl, captain } =
        useUI();
    const { addComponents, components } = useComponents();

    const handlePaste = (
        event: React.ClipboardEvent<HTMLDivElement>,
        tag: Tag
    ) => {
        const items = event.clipboardData?.items;

        if (items) {
            for (const item of items) {
                if (item.type.startsWith("image/")) {
                    const blob = item.getAsFile();
                    if (blob) {
                        const url = URL.createObjectURL(blob);
                        if (tag === 1) {
                            setRootIamgeUrl(url);
                            extractTextRegionsFromImage(url, (urls: string[]) => {
                                urls.forEach((imageurl) => {
                                    const uuid = uuidv4();
                                    addComponents({
                                        id: uuid,
                                        name: "image",
                                        text: imageurl,
                                        pId: null,
                                        tag,
                                    })
                                });
                            });
                        } else if (tag === 2) {
                            setCaptain(url);
                        }

                        break;
                    }
                } else if (item.type.startsWith("text/html")) {
                    item.getAsString((htmlString) => {
                        if (htmlString.includes("yy")) {
                            const imgSrcMatch = htmlString.match(/<img[^>]*src="([^"]*)"/i);
                            if (imgSrcMatch && imgSrcMatch[1]) {
                                const imgSrc = imgSrcMatch[1];
                                // updateRootImageUrl(imgSrc);
                            } else {
                                alert("非法图片");
                            }
                        }
                    });
                }
            }
        }
    };

    return (
        <div className="w-[250px] h-full">
            <Splitter
                layout="vertical"
                style={{ boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)" }}
                onResize={updateSplitterSize}
            >
                <Splitter.Panel size={splitterSize[0]}>
                    <div
                        onPaste={(e) => handlePaste(e, 1)}
                        className="flex flex-col justify-start h-full border-1 border-r-green-50"
                    >
                        <Divider title={"麦序池"} />
                        {components &&
                            components.length > 0 &&
                            components.some((item) => item.tag === 1) ? (
                            <RenderComponents components={components} tag={1} />
                        ) : (
                            <div className="flex-1 flex items-center justify-center border-dashed border-2 border-[#d9d9d9] bg-[#fafafa] m-2 active:border-[#4096ff]">
                                <PasteImageInstructions icon={<SmileOutlined />} />
                            </div>
                        )}
                    </div>
                </Splitter.Panel>
                <Splitter.Panel size={splitterSize[1]}>
                    <div className="w-full h-full" onPaste={(e) => handlePaste(e, 2)}>
                        <Divider title={"队长麦序"} borderColor="#fff" />
                        {captain ? (
                            // <RenderComponents components={components} tag={1} />
                            <img src={captain} alt='captain' className="w-full h-auto" />
                        ) : (
                            <div className="flex-1 flex items-center justify-center border-dashed border-2 border-[#d9d9d9] bg-[#fafafa] m-2 active:border-[#4096ff]">
                                <PasteImageInstructions />
                            </div>
                        )}
                    </div>
                </Splitter.Panel>
            </Splitter>
        </div>
    );
};
export default Material;
