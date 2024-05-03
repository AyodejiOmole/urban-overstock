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
            <div className="flex align-items-center">
            {/* <Tooltip target=".slider>.p-slider-handle" content={`${options.value} / page`} position="top" event="focus" /> */}

                {/* <span className="mr-3" style={{ color: 'var(--text-color)', userSelect: 'none' }}>
                    Items per page:{' '}
                </span> */}
                {/* <Slider className="slider" value={options.value} onChange={options.onChange} min={10} max={120} step={30} style={{ width: '10rem' }} /> */}
            </div>
        );
    },
    CurrentPageReport: (options: PaginatorCurrentPageReportOptions) => {
        return (
            <div style={{ color: 'var(--text-color)', userSelect: 'none', width: '100%', textAlign: 'left' }} className='flex flex-end text-sm text-neutral'>
                {`Showing ${options.first} - ${options.last} from ${options.totalRecords}`}
            </div>
        );
    },
    PrevPageLink: (options: PaginatorPrevPageLinkOptions) => {
        return (
            <button type="button" className={classNames(options.className, 'border-round bg-[#CFA31C] p-2')} onClick={options.onClick}>
                {/* <span className="p-3">Previous</span>
                <Ripple /> */}
                <MdKeyboardArrowRight color="black"/>
            </button>
        );
    },
    NextPageLink: (options: PaginatorNextPageLinkOptions) => {
        return (
            <button type="button" className={classNames(options.className, 'border-round bg-[#CFA31C] p-2')} onClick={options.onClick}>
                {/* <span className="p-3">Previous</span>
                <Ripple /> */}
                {/* <MdKeyboardArrowRight color="black"/> */}
                <MdOutlineKeyboardArrowLeft color="black"/>
            </button>
        );
    },
};

export default paginatorTemplate;
