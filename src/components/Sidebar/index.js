import pending from "../../assets/pending.svg";
import completed from "../../assets/completed.svg";
import deleted from "../../assets/delete.svg";
import profile from "../../assets/profile.svg";

export const sidebarLinks = [
    {
        imgURL: pending,
        route: '/',
        label: 'Pending',
    },
    {
        imgURL: completed,
        route: '/completed',
        label: 'Completed',
    },
    {
        imgURL: deleted,
        route: '/deleted',
        label: 'Deleted',
    },
    {
        imgURL: profile,
        route: '/profile',
        label: 'Profile',
    },
];
