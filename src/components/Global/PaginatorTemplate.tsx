"use client";

import { classNames } from 'primereact/utils';
import { MdKeyboardArrowRight } from "react-icons/md";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { PaginatorCurrentPageReportOptions, PaginatorRowsPerPageDropdownOptions,
    PaginatorNextPageLinkOptions, PaginatorPageLinksOptions, PaginatorPrevPageLinkOptions } from 'primereact/paginator';

const paginatorTemplate = {
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
                <span className={classNames('border rounded-sm p-2 mx-1 border-[#F2C94C]')} style={{ userSelect: 'none' }}>
                    ...
                </span>
            );
        }

        return (
            <span className={classNames(`${options.page === options.currentPage ? "bg-[#F2C94C]" : "bg-white"} rounded-sm px-3 py-1 cursor-pointer mx-1 border border-[#F2C94C] `)} onClick={options.onClick}>
                {options.page + 1}
            </span>
        );
    },
    CurrentPageReport: (options: PaginatorCurrentPageReportOptions) => {
        return (
            <div style={{ color: 'var(--text-color)', userSelect: 'none', width: 'auto', textAlign: 'left'}} className='text-sm text-neutral cursor-pointer items-center my-auto mr-auto'>
                {`Showing ${options.first} - ${options.last} from ${options.totalRecords}`}
            </div>
        );
    },
    PrevPageLink: (options: PaginatorPrevPageLinkOptions) => {
        return (
            <span 
                className={classNames('rounded-sm p-2 mx-1 bg-[#F2C94C] cursor-pointer')} 
                onClick={options.onClick} 
            >
                <MdOutlineKeyboardArrowLeft color="black"/>
            </span>
        );
    },
    NextPageLink: (options: PaginatorNextPageLinkOptions) => {
        return (
            <span className={classNames('rounded-sm p-2 mx-1 bg-[#F2C94C] cursor-pointer')} onClick={options.onClick}>
                <MdKeyboardArrowRight color="black"/>
            </span>
        );
    },
};

export default paginatorTemplate;
