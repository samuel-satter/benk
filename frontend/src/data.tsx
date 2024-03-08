export const menu = [
  {
    id: 1,
    title: "main",
    listItems: [
      {
        id: 1,
        title: "Homepage",
        url: "/",
        icon: "HomeIcon",
      },
      {
        id: 2,
        title: "Profile",
        url: "/users/1",
        icon: "PersonIcon",
      },
    ],
  },
  {
    id: 2,
    title: "lists",
    listItems: [
      {
        id: 1,
        title: "Users",
        url: "/users",
        icon: "GroupIcon",
      },
      {
        id: 2,
        title: "Products",
        url: "/products",
        icon: "InventoryIcon",
      },
      {
        id: 3,
        title: "Orders",
        url: "/orders",
        icon: "ShoppingCartIcon",
      },
      {
        id: 4,
        title: "Posts",
        url: "/posts",
        icon: "CommentIcon",
      },
    ],
  },
  {
    id: 3,
    title: "general",
    listItems: [
      {
        id: 1,
        title: "Elements",
        url: "/",
        icon: "AppsIcon",
      },
      {
        id: 2,
        title: "Notes",
        url: "/",
        icon: "NoteAltIcon",
      },
      {
        id: 3,
        title: "Forms",
        url: "/",
        icon: "FormatAlignLeftIcon",
      },
      {
        id: 4,
        title: "Calendar",
        url: "/",
        icon: "CalendarMonthIcon",
      },
    ],
  },
  {
    id: 4,
    title: "Maintenance",
    listItems: [
      {
        id: 1,
        title: "Settings",
        url: "/",
        icon: "SettingsIcon",
      },
      {
        id: 2,
        title: "Backups",
        url: "/",
        icon: "BackupIcon",
      },
    ],
  },
  {
    id: 5,
    title: "analytics",
    listItems: [
      {
        id: 1,
        title: "Charts",
        url: "/",
        icon: "BarChartIcon",
      },
      {
        id: 2,
        title: "Logs",
        url: "/",
        icon: "MenuBookIcon",
      },
    ],
  },
];

export interface BoxData {
  color: string;
  icon: string;
  title: string;
  dataKey: string;
  number: number | string;
  percentage: number;
  chartData: object[];
}

export const boxesData: BoxData[] = [
  {
    color: "#ff0000",
    icon: "path/to/icon1.png",
    title: "Box 1",
    dataKey: "uv",
    number: 0,
    percentage: 0,
    chartData: [],
  },
  {
    color: "#00ff00",
    icon: "path/to/icon2.png",
    title: "Box 2",
    dataKey: "pv",
    number: 0,
    percentage: 0,
    chartData: [],
  },
  {
    color: "#00ff23",
    icon: "path/to/icon2.png",
    title: "Box 4",
    dataKey: "pv",
    number: 0,
    percentage: 0,
    chartData: [],
  },
  {
    color: "#fff",
    icon: "path/to/icon2.png",
    title: "Box 5",
    dataKey: "pv",
    number: 0,
    percentage: 0,
    chartData: [],
  },
  {
    color: "#12af23",
    icon: "path/to/icon2.png",
    title: "Box 6",
    dataKey: "pv",
    number: 0,
    percentage: 0,
    chartData: [],
  },
  {
    color: "#45ff23",
    icon: "path/to/icon2.png",
    title: "Box 7",
    dataKey: "pv",
    number: 0,
    percentage: 0,
    chartData: [],
  },
];
