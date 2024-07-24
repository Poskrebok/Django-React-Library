import { React } from 'react';
import ReportsPage from './views/reports/reports';
import ReadersList from './views/readers/readers_list';
import BookList from './views/books/books_list';
import Main from './views/main';

var routes = [
    {
        path: "/books",
        name: "Books",
        icon: "ni ni-book-bookmark text-info ",
        layout: "/Main",
        filter: "main",
        component: <BookList/>
    },
    {
        path: "/readers",
        name: "Readers",
        icon: "ni ni-circle-08 text-yellow",
        layout: "/Main",
        filter: "main",
        component: <ReadersList/>
    },
    {
        path: "/reports",
        name: "Reports",
        icon: "ni ni-single-copy-04 text-pink",
        layout: "/Main",
        filter: "main",
        component: <ReportsPage/>
    },
    {
        path: "/readers/:readerid",
        name: "Reader profile",
        icon: "ni ni-single-copy-04 text-pink",
        layout: "/Main",
        filter: "aux",
        component: <ReportsPage/>
    },
    {
        path: "/books/:bookid",
        name: "Reader profile",
        icon: "ni ni-single-copy-04 text-pink",
        layout: "/Main",
        filter: "aux",
        component: <ReportsPage/>
    },
];

export default routes;
