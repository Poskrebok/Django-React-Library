import { React } from 'react';
import ReportsPage from './views/reports/reports';
import ReadersList from './views/readers/readers_list';
import BookList from './views/books/books_list';
import Main from './views/main';
import AuthorList from './views/Authors/author_list';
import BookProfile from './views/books/book_profile';
import ReaderProfile from './views/readers/reader_profile';
import AuthorProfile from './views/Authors/author_profile';
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
        path: "/authors",
        name: "Authors",
        icon: "ni ni-paper-diploma text-green",
        layout: "/Main",
        filter: "main",
        component: <AuthorList/>
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
        component: <ReaderProfile/>
    },
    {
        path: "/books/:bookid",
        name: "Reader profile",
        icon: "ni ni-single-copy-04 text-pink",
        layout: "/Main",
        filter: "aux",
        component: <BookProfile/>
    },
    {
        path: "/authors/:authorid",
        name: "Author profile",
        icon: "ni ni-single-copy-04 text-pink",
        layout: "/Main",
        filter: "aux",
        component: <AuthorProfile/>
    },
];

export default routes;
