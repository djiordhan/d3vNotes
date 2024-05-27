import useIsAuthenticated from "../useIsAuthenticated";
import { saveData, getData } from '../firebase';
import { ChangeEvent, useEffect, useState } from "react";
import { notyf } from "../utils/notification-utils";
import { saveMarkdownData, getMarkdownData } from '../cache/indexedDB'; 

export interface Markdown {
    raw: string;
}

export interface MarkdownManagerHook {
    mdList: Markdown[];
    current: number | null;
    currentMd: string;
    searchMode: boolean;
    isEditing: boolean;
    isDirty: boolean;
    searchText: string;
    createNew: () => void;
    setIsEditing: (flag: boolean) => void;
    setSearchMode: (flag: boolean) => void;
    setSearchText:  (searchText: string) => void;
    onSelect: (index: number) => void;
    onSaveCancelled: () => void;
    onEdit: (event: ChangeEvent<HTMLTextAreaElement>) => void;
    doSave: () => Promise<void>;
    doDelete: () => Promise<void>;
}

const useMarkdownManager = (): MarkdownManagerHook => {
    const { user } = useIsAuthenticated();
    const [searchText, setSearchText] = useState('');
    const [mdList, setMdList] = useState<Markdown[]>([]);
    const [current, setCurrent] = useState<number | null>(null);
    const [currentMd, setCurrentMd] = useState('');
    const [searchMode, setSearchMode] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [isDirty, setIsDirty] = useState(false);

    const createNew = () => {
        const newMd: Markdown = { raw: '### New Markdown' };
        setMdList([newMd, ...mdList]);
        setCurrent(0);
        setCurrentMd(newMd.raw);
        setIsEditing(true);
        setIsDirty(false);
        setSearchMode(false);
    };

    const onSelect = (index: number) => {
        const selectedMd = mdList[index];
        setCurrent(index);
        setCurrentMd(selectedMd.raw);
        setIsEditing(false);
        setIsDirty(false);
        setSearchMode(false);
    };

    const onSaveCancelled = () => {
        if (current !== null) {
            setCurrentMd(mdList[current].raw);
        }
        setIsDirty(false);
        setIsEditing(false);
    };

    const onEdit = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setCurrentMd(event.target.value);
        setIsDirty(true);
    };

    const doSave = async () => {
        if (current === null) return;
        try {
            const newMarkDownList = [...mdList];
            newMarkDownList[current].raw = currentMd;
            await saveData(user.uid, { markdown: newMarkDownList });
            setMdList(newMarkDownList);
            setIsDirty(false);
            setIsEditing(false);
            notyf.success('Saved!');
        } catch (err) {
            notyf.error('Error!');
            console.error(err);
        }
    };

    const doDelete = async () => {
        if (current === null) return;
        try {
            const newMarkDownList = mdList.filter((_, index) => index !== current);
            await saveData(user.uid, { markdown: newMarkDownList });
            setMdList(newMarkDownList);
            setCurrent(newMarkDownList.length ? 0 : null);
            setCurrentMd(newMarkDownList[0]?.raw || '');
            setIsDirty(false);
            setIsEditing(false);
            setSearchMode(false);
            notyf.success('Deleted!');
        } catch (err) {
            notyf.error('Error!');
            console.error(err);
        }
    };

    useEffect(() => {
        if (user) {
            getData(user.uid).then((data: any) => {
                setMdList(data.markdown);
                setCurrent(0);
                setCurrentMd(data.markdown[0]?.raw || '');
                saveMarkdownData(data.markdown);
            }).catch((error) => {
                console.error(error);
                getMarkdownData().then(cachedData => {
                    if (cachedData) {
                        setMdList(cachedData);
                        setCurrent(0);
                        setCurrentMd(cachedData[0]?.raw || '');
                    }
                });
            });
        }
    }, [user]);

    return {
        mdList,
        current,
        currentMd,
        searchMode,
        isEditing,
        isDirty,
        searchText,
        createNew,
        onSelect,
        onSaveCancelled,
        onEdit,
        doSave,
        doDelete,
        setIsEditing,
        setSearchMode,
        setSearchText,
    };
};

export default useMarkdownManager;