import React, { useState, useEffect } from 'react'
import ReactPaginate from 'react-paginate';
import { ArrowLeft, ArrowRight } from 'iconsax-react';
import './react-paginate.css'

function PaginatedItems(props: any) {
    const [offset, setOffset] = useState(0);
    const [data, setData] = useState([]);
    const [perPage] = useState(2);
    const [pageCount, setPageCount] = useState(0)


    const getData = () => {
        // const data = props.data;
        const data = [1,2,3,4,5,6,7,8,9,10];
        const slice = data.slice(offset, offset + perPage);
        // props.setData(slice)
        setPageCount(Math.ceil(data.length / perPage))
    }
    const handlePageClick = (e: any) => {
        const selectedPage = e.selected;
        setOffset(selectedPage + 1)
    };

    useEffect(() => {
        getData()
    }, [offset])

    return (
        <div className="row">
            <div className="col-md-12">
                {/* {data} */}
                <ReactPaginate
                    previousLabel={<div><ArrowLeft size="18" color="#4D506B" /> <span>Previous</span> </div>}
                    nextLabel={<div><span>Next</span> <ArrowRight size="18" color="#4D506B" /></div>}
                    breakLabel={"..."}
                    breakClassName={"break-me"}
                    pageCount={pageCount}
                    marginPagesDisplayed={20}
                    pageRangeDisplayed={5}
                    onPageChange={handlePageClick}
                    containerClassName={"pagination"}
                    activeClassName={"active"} />
            </div>
        </div>
    );
}

export default PaginatedItems;
