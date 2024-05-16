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

export const chartBoxUser = {
  color: "#8884d8",
  icon: "/userIcon.svg",
  title: "Total Users",
  number: "867",
  dataKey: "users",
  percentage: 45,
  chartData: [
    { name: "Sun", users: 30 },
    { name: "Mon", users: 200 },
    { name: "Tue", users: 100 },
    { name: "Wed", users: 50 },
    { name: "Thu", users: 20 },
    { name: "Fri", users: 300 },
    { name: "Sat", users: 100 },
  ],
};

export const chartBoxLoans = {
  color: "skyblue",
  icon: "",
  title: "Total Loans",
  number: "2434",
  dataKey: "products",
  percentage: 21,
  chartData: [
    { name: "Sun", products: 400 },
    { name: "Mon", products: 600 },
    { name: "Tue", products: 500 },
    { name: "Wed", products: 700 },
    { name: "Thu", products: 400 },
    { name: "Fri", products: 500 },
    { name: "Sat", products: 450 },
  ],
};
export const chartBoxRevenue = {
  color: "teal",
  icon: "",
  title: "Total Revenue",
  number: "$56.432",
  dataKey: "revenue",
  percentage: -12,
  chartData: [
    { name: "Sun", revenue: 400 },
    { name: "Mon", revenue: 600 },
    { name: "Tue", revenue: 500 },
    { name: "Wed", revenue: 700 },
    { name: "Thu", revenue: 400 },
    { name: "Fri", revenue: 500 },
    { name: "Sat", revenue: 450 },
  ],
};
export const chartBoxConversion = {
  color: "gold",
  icon: "",
  title: "Total Ratio",
  number: "2.6",
  dataKey: "ratio",
  percentage: 12,
  chartData: [
    { name: "Sun", ratio: 400 },
    { name: "Mon", ratio: 600 },
    { name: "Tue", ratio: 500 },
    { name: "Wed", ratio: 700 },
    { name: "Thu", ratio: 400 },
    { name: "Fri", ratio: 500 },
    { name: "Sat", ratio: 450 },
  ],
};

export const barChartBoxRevenue = {
  title: "Profit Earned",
  color: "#8884d8",
  dataKey: "profit",
  chartData: [
    {
      name: "Sun",
      profit: 4000,
    },
    {
      name: "Mon",
      profit: 3000,
    },
    {
      name: "Tue",
      profit: 2000,
    },
    {
      name: "Wed",
      profit: 2780,
    },
    {
      name: "Thu",
      profit: 1890,
    },
    {
      name: "Fri",
      profit: 2390,
    },
    {
      name: "Sat",
      profit: 3490,
    },
  ],
};

export const barChartBoxVisit = {
  title: "Total Visit",
  color: "#FF8042",
  dataKey: "visit",
  chartData: [
    {
      name: "Sun",
      visit: 4000,
    },
    {
      name: "Mon",
      visit: 3000,
    },
    {
      name: "Tue",
      visit: 2000,
    },
    {
      name: "Wed",
      visit: 2780,
    },
    {
      name: "Thu",
      visit: 1890,
    },
    {
      name: "Fri",
      visit: 2390,
    },
    {
      name: "Sat",
      visit: 3490,
    },
  ],
};