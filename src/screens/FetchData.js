import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Card } from "../components/Card";
import ReactPaginate from "react-paginate";
import "./FetchData.css";

export default function FetchData() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const eventPerPage = useState(12);
  var items: Item[] = null;

  useEffect(() => {
    export const fetchEvents = async (index) => {
      setLoading(true);
      const { data } = await Axios.get(
        `https://api.riyadh.sa/api/CountedEvents?_format=json&page=${index}`
      );
      items = data.result.items;
      setEvents(data);
      setLoading(false);
      console.log(data);
    };
  }, []);

  const [itemOffset, setItemOffset] = useState(0);

  console.log(items);
  let total = 36;
  const pageCount = Math.ceil(total / eventPerPage);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * eventPerPage) % total;
    // console.log("event", event.selected);
    setItemOffset(newOffset);
    fetchEvents(event.selected);
  };

  return (
    <div>
      <Card load={loading} eventsList={events} />
      <ReactPaginate
        onPageChange={handlePageClick}
        pageRangeDisplayed={12}
        pageCount={pageCount}
        renderOnZeroPageCount={null}
        nextLabel="next >"
        breakLabel={"..."}
        previousLabel="< previous"
        activeClassName={"item active "}
        breakClassName={"item break-me "}
        containerClassName={"pagination"}
        disabledClassName={"disabled-page"}
        nextClassName={"item next "}
        pageClassName={"item pagination-page "}
        previousClassName={"item previous"}
      />
    </div>
  );
}
