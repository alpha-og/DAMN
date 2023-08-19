// redux store imports
import { useSubjects } from "../store/getterHooks";
// component imports
import { SubjectCard } from "./components";

const SubjectPicker = () => {
    const subjects = useSubjects();
    return (
        <div className="flex flex-row flex-wrap justify-center items-center gap-2 w-full">
            {subjects &&
                subjects.map((subject, index) => (
                    <SubjectCard key={index} subjectName={subject.name} />
                ))}
        </div>
    );
};

export default SubjectPicker;
