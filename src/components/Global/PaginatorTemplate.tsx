"use client";

import { Button } from 'primereact/button';
import { Ripple } from 'primereact/ripple';
import { Divider } from 'primereact/divider';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { Slider } from 'primereact/slider';
import { Tooltip } from 'primereact/tooltip';
import { classNames } from 'primereact/utils';
import { MdKeyboardArrowRight } from "react-icons/md";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { Paginator, PaginatorPageChangeEvent, PaginatorJumpToPageInputOptions, PaginatorCurrentPageReportOptions, PaginatorRowsPerPageDropdownOptions,
    PaginatorLastPageLinkOptions, PaginatorNextPageLinkOptions, PaginatorPageLinksOptions, PaginatorPrevPageLinkOptions, PaginatorFirstPageLinkOptions } from 'primereact/paginator';

const paginatorTemplate = {
    // layout: 'RowsPerPageDropdown PrevPageLink PageLinks NextPageLink CurrentPageReport',
    layout: 'CurrentPageReport RowsPerPageDropdown PrevPageLink PageLinks NextPageLink ',
    RowsPerPageDropdown: (options: PaginatorRowsPerPageDropdownOptions) => {
        return (
            <div className="invisible">
            {/* <Tooltip target=".slider>.p-slider-handle" content={`${options.value} / page`} position="top" event="focus" /> */}

                {/* <span className="mr-3" style={{ color: 'var(--text-color)', userSelect: 'none' }}>
                    Items per page:{' '}
                </span> */}
                {/* <Slider className="slider" value={options.value} onChange={options.onChange} min={10} max={120} step={30} style={{ width: '10rem' }} /> */}
            </div>
        );
    },
    PageLinks: (options: PaginatorPageLinksOptions) => {
        if ((options.view.startPage === options.page && options.view.startPage !== 0) || (options.view.endPage === options.page && options.page + 1 !== options.totalPages)) {
            const className = classNames(options.className, { 'p-disabled': true });

            return (
                <span className={classNames(options.className, 'border rounded-none border-[#F2C94C]')} style={{ userSelect: 'none' }}>
                    ...
                </span>
            );
        }

        return (
            <button type="button" className={classNames(options.className, `${options.page ? "bg-[#F2C94C]" : "bg-white"} rounded-none border border-[#F2C94C] `)} onClick={options.onClick}>
                {options.page + 1}
                {/* <Ripple /> */}
            </button>
        );
    },
    CurrentPageReport: (options: PaginatorCurrentPageReportOptions) => {
        return (
            <div style={{ color: 'var(--text-color)', userSelect: 'none', width: 'auto', textAlign: 'left'}} className='text-sm text-neutral items-center my-auto mr-auto'>
                {`Showing ${options.first} - ${options.last} from ${options.totalRecords}`}
            </div>
        );
    },
    PrevPageLink: (options: PaginatorPrevPageLinkOptions) => {
        return (
            <span className={classNames(options.className, 'rounded-none bg-[#F2C94C] p-2')} onClick={options.onClick} >
                {/* <span className="p-3">Previous</span>
                <Ripple /> */}
                {/* <MdKeyboardArrowRight color="black"/> */}
                <MdOutlineKeyboardArrowLeft color="black"/>
            </span>
        );
    },
    NextPageLink: (options: PaginatorNextPageLinkOptions) => {
        return (
            <span className={classNames(options.className, 'rounded-none bg-[#F2C94C] p-2')} onClick={options.onClick}>
                {/* <span className="p-3">Previous</span>
                <Ripple /> */}
                {/* <MdKeyboardArrowRight color="black"/> */}
                <MdKeyboardArrowRight color="black"/>
            </span>
        );
    },
};

// export const paginatorTemplate2 = {
//     layout: 'RowsPerPageDropdown PrevPageLink PageLinks NextPageLink ',
//     RowsPerPageDropdown: (options: PaginatorRowsPerPageDropdownOptions) => {
//         return (
//             <div className="flex align-items-center">
//             </div>
//         );
//     },
//     PageLinks: (options: PaginatorPageLinksOptions) => {
//         if ((options.view.startPage === options.page && options.view.startPage !== 0) || (options.view.endPage === options.page && options.page + 1 !== options.totalPages)) {
//             const className = classNames(options.className, { 'p-disabled': true });

//             return (
//                 <span className={classNames(options.className, 'border-round border border-[#CFA31C]')} style={{ userSelect: 'none' }}>
//                     ...
//                 </span>
//             );
//         }

//         return (
//             <button type="button" className={classNames(options.className, 'border-round border border-[#CFA31C] bg-white flex flex-start items-center')} onClick={options.onClick}>
//                 {options.page + 1}
//                 {/* <Ripple /> */}
//             </button>
//         );
//     },
//     PrevPageLink: (options: PaginatorPrevPageLinkOptions) => {
//         return (
//             <button type="button" className={classNames(options.className, 'border-round bg-[#CFA31C] p-2 flex flex-start justify-center')} onClick={options.onClick} disabled={options.disabled}>
//                 <MdOutlineKeyboardArrowLeft color="black"/>
//             </button>
//         );
//     },
//     NextPageLink: (options: PaginatorNextPageLinkOptions) => {
//         return (
//             <button type="button" className={classNames(options.className, 'border-round bg-[#CFA31C] p-2 flex flex-start justify-center items-center')} onClick={options.onClick} disabled={options.disabled}>
//                 <MdKeyboardArrowRight color="black"/>
//             </button>
//         );
//     },
// }

export default paginatorTemplate;
