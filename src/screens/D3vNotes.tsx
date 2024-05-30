import { Search } from "../components/Search";
import { Tools } from "../components/Tools";
import { Sidebar } from "../components/Sidebar";
import { If, Then, Else } from "react-if";
import MarkdownPreview from '@uiw/react-markdown-preview';
import { useMarkdownManagerContext } from '../context/provider';

export default () => {
    const {   
        currentMd,
        searchMode,
        isEditing,
        onEdit,
    } = useMarkdownManagerContext();

    return <div className="flex h-screen">
        <div className="hidden md:block">
            <Sidebar />
        </div>
        <div className="w-full h-full overflow-scroll" data-color-mode="light">
            <If condition={searchMode}>
                <Then>
                    <Search/>
                </Then>
                <Else>
                    <Tools/>
                    <div className="pt-10">
                        <If condition={isEditing}>
                            <Then>
                                <div className="h-[95vh] w-full p-4">
                                    <textarea
                                        value={currentMd}
                                        onChange={onEdit}
                                        className="resize-none w-full h-full rounded-lg p-4 border border-gray-300 focus:border-cyan-500 focus:outline-none"
                                        placeholder="Type something here..."
                                    ></textarea>
                                </div>
                            </Then>
                            <Else>
                                <MarkdownPreview source={currentMd} className='p-10 rounded-lg mt-50' />
                            </Else>
                        </If>
                    </div>
                </Else>
            </If>
        </div>
    </div>;
};