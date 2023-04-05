import React, { img } from "react";
import "./card.css";
import {
  Link,
  Navigate,
  unstable_HistoryRouter,
  useNavigate,
} from "react-router-dom";

import { Item, Image } from "../interface/EventsData";

export const Card = ({ eventsList, load }) => {
  let items: Item[] = eventsList?.result?.items;
  const navigate = useNavigate();

  if (load || !eventsList || !items) {
    return (
      <div className="min-h-[85vh] relative ">
        <h2 className="loading absolute top-[50%] left-[50%]">Loading ...</h2>
      </div>
    );
  }

  return (
    <div className="card-container">
      {items.map((event) => {
        var innerHTML = event.body.split("</p>");
        let clippedTxt = innerHTML[0].substring(0, 109).concat("</p>");
        let image: Image = event.image[0];
        var date = new Date(event.created * 1000).toDateString();

        return (
          <button
            id="myElement"
            onClick={() => navigate("/EventDetailsScreen", { state: event })}
            key={`KEY-${event.id}`}
            style={{
              backgroundImage: "url(" + image.preview.thumbnail + ")",
              backgroundPosition: "center",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
            }}
            className="card-bg"
          >
            <div className="txt-container">
              <p className="card-txt">{event.title}</p>
              <p className="card-txt" style={{ marginTop: 5 }}>
                {date}
              </p>
              <p
                className="light-txt"
                dangerouslySetInnerHTML={{
                  __html: clippedTxt,
                }}
              />
            </div>
          </button>
        );
      })}
    </div>
  );
};
