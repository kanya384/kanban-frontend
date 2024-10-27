import { BrandApplePodcast, Car, Cards, Logout, ServerCog, Users, Vinyl } from 'tabler-icons-react';

export const Items = [
   


    {
        title: "Лиды на модерации",
        isAdmin: false,
        icon: <ServerCog size={24} className="menu-icon"  />,
        href: "/leads",
    },

    {
        title: "Причины модерации",
        isAdmin: true,
        icon: <BrandApplePodcast size={24} className="menu-icon"  />,
        href: "/cause",
    },

    {
        title: "Загрузка записей",
        isAdmin: true,
        icon: <Vinyl size={24} className="menu-icon"  />,
        href: "/amofile",
    },
    {
        title: "Загрузка лида/файла авто",
        isAdmin: true,
        icon: <Car size={24} className="menu-icon"  />,
        href: "/amocar",
    },
    {
        title: "Загрузка лида/файла авто xlsx",
        isAdmin: true,
        icon: <Cards size={24} className="menu-icon"  />,
        href: "/car-excel",
    },
    {
        title: "Учетные записи",
        isAdmin: true,
        icon: <Users size={24} className="menu-icon"  />,
        href: "/user",
    },

    
    
    {
        title: "Выход",
        icon: <Logout size={24} className="menu-icon" />,
        href: "/exit",
    },

]

export const ItemsNotAdmin = [
    {
        title: "Загрузка лида/файла авто",
        isAdmin: true,
        icon: <Car size={24} className="menu-icon"  />,
        href: "/amocar",
    },
    {
        title: "Загрузка лида/файла авто xlsx",
        isAdmin: true,
        icon: <Cards size={24} className="menu-icon"  />,
        href: "/car-excel",
    },
    {
        title: "Выход",
        icon: <Logout size={24} className="menu-icon" />,
        href: "/exit",
    }
]