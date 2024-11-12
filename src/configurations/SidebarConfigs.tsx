import { Pages } from "./HomeConfigs";
import {
    PermContactCalendar as PermContactCalendarIcon,
    Book as BookIcon,
    AssignmentTurnedIn as AssignmentTurnedInIcon,
} from '@mui/icons-material';

export const tabToIconMap = [
    { tabName: 'Students', pageExtension: `/${Pages.STUDENTS}`, icon: <PermContactCalendarIcon /> },
    { tabName: 'Records', pageExtension: `/${Pages.RECORDS}`, icon: <BookIcon /> },
    { tabName: 'Attendance', pageExtension: `/${Pages.ATTENDANCE}`, icon: <AssignmentTurnedInIcon /> },
];