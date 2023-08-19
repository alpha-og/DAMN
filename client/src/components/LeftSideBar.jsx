// react imports
import { BsLayoutSidebarInset, BsSearch } from "react-icons/bs";
// redux store imports
import { useDispatch } from "react-redux";
import { useCurrentSubject, useLeftSideBarState } from "../store/getterHooks";
import { toggleLeftSideBarState } from "../store/userSlice";
// component imports
import { TopicPicker } from "./components";
const LeftSideBar = () => {
    const dispatch = useDispatch();
    const selectedSubject = useCurrentSubject();
    const leftSideBarState = useLeftSideBarState();
    return (
        <div
            className={
                leftSideBarState
                    ? "md:relative absolute md:left-0 left-5 right-5 flex flex-col flex-grow-0 flex-shrink-0 md:w-80 h-[85vh] p-4 md:mr-2 z-[1] bg-primary-900 rounded-xl shadow-md border border-accent-400 ease-in-out duration-500"
                    : "absolute -left-full right-full flex flex-col flex-grow-0 flex-shrink-0 h-[85vh] md:w-80 p-4 mr-2 z-[1] bg-primary-900 rounded-xl shadow-md border border-accent-400 ease-in-out duration-500"
            }
        >
            <div className="flex flex-row justify-between items-center p-2 rounded-lg bg-secondary-800 bg-opacity-50">
                <BsSearch
                    className="flex-shrink-0 hover:cursor-pointer"
                    onClick={() => {}}
                    size={16}
                />
                <div className="text-sm">
                    <p>{selectedSubject && selectedSubject.slice(6)}</p>
                </div>
                <BsLayoutSidebarInset
                    size={16}
                    className="hover:cursor-pointer"
                    onClick={() => dispatch(toggleLeftSideBarState())}
                />
            </div>
            {selectedSubject && <TopicPicker />}
        </div>
    );
};

export default LeftSideBar;
