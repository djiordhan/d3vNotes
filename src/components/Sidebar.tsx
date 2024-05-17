import useIsAuthenticated from "../useIsAuthenticated";
import { logoutUser } from '../firebase';
import { LogoutIcon, LottieAnim, SearchIcon } from "../components/Icons";
import { getName } from "../utils/name-utils";
import { version } from "../../package.json";
import { useMarkdownManagerContext } from '../context/provider';
import { motion } from "framer-motion"

export const Sidebar = () => {

    const { user } = useIsAuthenticated();
    const { mdList, current,searchText, onSelect, createNew, setSearchMode } = useMarkdownManagerContext();

    return <div className="w-100 h-full bg-cyan-600 text-white shadow-lg">
        <div>
            <div className="pl-5 text-2xl font-bold text-center flex flex-row items-center">d3vNotes <LottieAnim /></div>
            <div className="flex flex-row">
                <motion.div
                    initial={{ opacity: 0.5, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                className="m-2 p-2 bg-cyan-700 cursor-pointer rounded-md border-2 border-teal-300 w-full flex flex-row item-center" onClick={() => { setSearchMode(true); console.log("set search mode", searchText);}}>
                    <SearchIcon />
                    Search</motion.div>
                <motion.div 
                    initial={{ opacity: 0.5, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="m-2 p-2 bg-cyan-700 cursor-pointer rounded-md border-2 border-teal-300 w-full" onClick={createNew}><a><span className="bold text-lg">+</span> Create</a>
                </motion.div>
            </div>
        </div>
        <div className="h-4/6 overflow-scroll">
            <ul>
                {
                    mdList.map((md: any, index: number) => {
                        return <li className={(current === index ? 'bg-cyan-700' : '') + " m-2 p-2 rounded-md cursor-pointer"} key={index} onClick={() => {
                            onSelect(index);
                        }}>{md.raw ? getName(md.raw) : 'New Markdown'}
                        </li>
                    })
                }
            </ul>
        </div>
        <div className="h-1/6">
            <div className="flex flex-col items-center">
                <div className="flex flex-row items-center m-2 rounded-lg bg-cyan-700">
                <div className="w-24 px-4">
                    <img src={user?.photoURL} className="shadow rounded-full max-w-full h-auto align-middle border-2 border-white" />
                </div>
                <span className="text-xs">{user?.displayName}</span>
                <button title="Logout" className="font-bold p-5 cursor-pointer items-center text-center" onClick={() => {
                    logoutUser();
                }}>
                    <LogoutIcon />
                </button>
                </div>
                <p className="text-xs text-white">v{version} (<a href="https://github.com/djiordhan/d3vNotes">github</a>)</p>
            </div>
            
        </div>
    </div>;
}