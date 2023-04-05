import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Card } from "../components/Card";
import ReactPaginate from "react-paginate";
import "./FetchData.css";

export default function FetchData() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [eventPerPage, setEventPerPage] = useState(12);
  const [total, setTotal] = useState(0);
  const [pageCount, setPageCount] = useState(0);

  useEffect(() => {
    fetchEvents();
    setLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  var items: Item[] = null;
  const fetchEvents = async (index) => {
    setLoading(true);
    const { data } = await Axios.get(
      `https://api.riyadh.sa/api/CountedEvents?_format=json&page=${index}`
    );
    items = data.result.items;
    setTotal(data.result.counters.total);
    eventPerPage === 0 && setEventPerPage(data.result.items.length);
    setPageCount(Math.ceil(data.result.counters.total / eventPerPage));
    setEvents(data);
    setLoading(false);
  };

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    fetchEvents(event.selected);
  };

  return (
    <div>
      <Card load={loading} eventsList={events} />
      <ReactPaginate
        onPageChange={handlePageClick}
        pageRangeDisplayed={eventPerPage}
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
