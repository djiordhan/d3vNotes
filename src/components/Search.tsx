import { motion } from "framer-motion"
import MarkdownPreview from '@uiw/react-markdown-preview';
import { useMarkdownManagerContext } from "../context/provider";

export const Search = () => {
    const { mdList, onSelect, searchText, setSearchText } = useMarkdownManagerContext();

    return <div className="container mx-auto w-full p-4">
        <div className="sticky top-10 z-10 w-full">
            <input
                type="text"
                defaultValue={searchText}
                placeholder="Search"
                onChange={(event) => setSearchText(event.target.value)}
                className="text-lg p-2 border-2 border-cyan-700 rounded-md w-full mb-6"
            />
        </div>
        <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full pt-6">
            {mdList
                .map((value, index) => ({ value, index }))
                .filter(({ value: item }: any) => item.raw.toLowerCase().includes(searchText.toLowerCase()))
                .map(({ value: item, index }: any, filteredIndex: number) => (
                <motion.div
                    initial={{ opacity: 0.5, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    key={filteredIndex} className="bg-cyan-100 p-2 rounded-lg w-full h-50 overflow-hidden cursor-pointer" onClick={() => {
                        onSelect(index);
                    }}>
                    <MarkdownPreview source={item.raw.substring(0, 100) + (item.raw.length > 100 ? "..." : "")} className="p-10" />
                </motion.div>
            ))}
        </div>
    </div>
};