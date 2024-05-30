import { useEffect, useState } from "react";
import { BackIcon, CancelIcon, CheckIcon, DeleteIcon, PencilIcon } from "../components/Icons";
import { useMarkdownManagerContext } from "../context/provider";
import { getName } from "../utils/name-utils";
const ToolButton = ({ icon, onClick }: any) => {
    return <button onClick={onClick} className="ml-2 font-bold py-2 px-1 cursor-pointer inline-flex items-center">
        {icon}
    </button>
};

export const Tools = ({ name }: any) => {
    const [toDelete, setToDelete] = useState(null as any);

    const {
        current,
        currentMd,
        onSaveCancelled,
        isEditing,
        isDirty,
        doSave,
        doDelete,
        setIsEditing,
        setSearchMode,
    } = useMarkdownManagerContext();
    
    const hasCurrentIndex = current !== -1 && current !== null;
    const hasDeletetIndex = toDelete !== -1 && toDelete !== null;
    
    useEffect(() => {
        setToDelete(null);
    }, [current]);

    return <div className="w-full h-15 bg-white p-1 fixed z-50 grid grid-cols-2 gap-4 border-b-2 border-cyan-600">
        <div className="justify-items-start text-cyan-600">
            <ToolButton icon={<BackIcon />} onClick={() => setSearchMode(true)} />
            {
                isDirty && hasCurrentIndex &&
                <ToolButton icon={<CheckIcon />} onClick={doSave} />
            }
            {
                isEditing && hasCurrentIndex && !hasDeletetIndex &&
                <ToolButton icon={<CancelIcon />} onClick={onSaveCancelled} />
            }
            {
                !isEditing && hasCurrentIndex && !hasDeletetIndex &&
                <ToolButton icon={<PencilIcon />} onClick={() => setIsEditing(true)} />
            }
            {
                !isEditing && hasCurrentIndex && !hasDeletetIndex &&
                <ToolButton icon={<DeleteIcon />} onClick={() => { setToDelete(current); }} />
            }
            {
                hasDeletetIndex &&
                <div className="flex items-center">
                    <ToolButton icon={<CheckIcon />} onClick={() => {
                        doDelete();
                        setToDelete(null);
                    }} />
                    <ToolButton icon={<CancelIcon />} onClick={() => setToDelete(null)} />
                    <a className="ml-5">Delete <b>{getName(currentMd)}</b>?</a>
                </div>
            }
        </div>
    </div>
};