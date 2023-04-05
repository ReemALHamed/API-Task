import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Item, Author } from "../interface/EventsData";
import "./EventDetails.css";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, A11y } from "swiper";

import {
  AccessTime,
  Favorite,
  Visibility,
  PinDrop,
  AdsClick,
  ArrowBack,
  AlternateEmail,
} from "@mui/icons-material";
import { DetailSection } from "../components/DetailSection";
import { TagsCollection } from "../components/TagsCollection";

export const toHoursAndMinutes = (totalMinutes) => {
  const minutes = totalMinutes % 60;
  const h = Math.floor(totalMinutes / 60);
  const hours = h % 24;

  return `${padTo2Digits(hours)}:${padTo2Digits(minutes)}`;
};

export const padTo2Digits = (num) => {
  return num.toString().padStart(2, "0");
};

export const tConvert = (time) => {
  // Check correct time format and split into components
  time = time.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [
    time,
  ];

  if (time.length > 1) {
    // If time format correct
    time = time.slice(1); // Remove full string match value
    time[5] = +time[0] < 12 ? " AM" : " PM"; // Set AM/PM
    time[0] = +time[0] % 12 || 12; // Adjust hours
  }
  return time.join(""); // return adjusted time or original string
};

const showInMapClicked = (lat, lon) => {
  window.open("https://maps.google.com?q=" + lat + "," + lon);
};

const showLinkClicked = (url) => {
  window.open(url);
};

const showEmailClicked = (email) => {
  window.open(`mailto:${email}`);
};

export default function EventDetailsScreen() {
  const { state } = useLocation();
  let item: Item = state;
  let author: Author = item.author;
  const navigate = useNavigate();

  let startDate = new Date(item.start_date * 1000).toDateString();
  let endDate = new Date(item.finish_date * 1000).toDateString();

  const startTime = tConvert(toHoursAndMinutes(item.time.start_time));
  const endTime = tConvert(toHoursAndMinutes(item.time.finish_time));

  return (
    <div className="p-5 lg:p-10">
      <div className="pageContainer flex-col-reverse sm:md:flex-row h-[100vh] lg:h-[60vh]">
        <div className="w-full text-left my-8">
          {/* event details section */}
          <p className=" sm:text-6xl text-4xl font-light ">{item.title}</p>
          <p className=" sm:text-2xl text-xl font-light mt-3 ">
            By {author.user_full_name}
          </p>
          <p className=" sm:text-xl text-l font-light mt-3 ">
            {startDate + "-" + endDate}
          </p>
          <p className=" sm:text-xl text-l font-light mt-3 ">
            <b>Organizer:</b> {item.organizer}
          </p>

          {/* keywords section */}
          <TagsCollection tags={item.tags} />

          {/* optional address section */}
          {item.geofield?.address && (
            <DetailSection
              icon={<PinDrop fontSize="medium" style={{ color: "black" }} />}
              text={
                <span className="underline text-blue-800 italic ml-2">
                  {item.geofield?.address}
                </span>
              }
              onPress={() =>
                showInMapClicked(item.geofield.lat, item.geofield.lon)
              }
              isRow
            />
          )}

          {/* optional email section */}
          {item.email && (
            <DetailSection
              icon={
                <AlternateEmail fontSize="medium" style={{ color: "black" }} />
              }
              text={
                <span className="underline text-blue-800 italic ml-2">
                  {item.email}
                </span>
              }
              onPress={() => showEmailClicked(item.email)}
              isRow
            />
          )}

          {/* likes|views|time section */}
          <div className="flex w-full justify-start mt-8 ">
            <DetailSection
              icon={<Favorite fontSize="medium" style={{ color: "red" }} />}
              text={item.likes.likes + " Likes"}
            />

            <DetailSection
              icon={<Visibility fontSize="medium" style={{ color: "grey" }} />}
              text={item.views.count_views + " Views"}
            />

            <DetailSection
              icon={<AccessTime fontSize="medium" style={{ color: "black" }} />}
              text={startTime + " to " + endTime}
            />
          </div>
        </div>

        {/* image swiper */}
        <Swiper
          className="shadow bg-transparent"
          modules={[Navigation, Pagination, A11y]}
          spaceBetween={0}
          slidesPerView={1}
          pagination={{ clickable: true }}
          scrollbar={{ draggable: true }}
        >
          {item.image.map((img) => {
            return (
              <SwiperSlide key={`KEY-${img.target_id}`}>
                <div
                  className="shadow top-10 right-0 absolute ext-center w-fit min-w-[90px]"
                  style={{
                    color: "white",
                    backgroundColor: "purple",
                    padding: "10px",
                    zIndex: 1,
                    borderRadius: "20px",
                    borderTopRightRadius: "0px",
                    borderBottomRightRadius: "0px",
                  }}
                >
                  {item.category.map((cat) => cat.taxonomy_term_name + "\n")}
                </div>
                <img src={img.preview.thumbnail} alt="thumbnail" />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>

      <hr />

      {/* innerHTML content */}
      <p
        className="mt-5"
        dangerouslySetInnerHTML={{
          __html: item.body,
        }}
      />

      {/* optional additional links section */}
      {!item.body.includes(item.website.uri) && item.website.uri && (
        <button
          onClick={() => showLinkClicked(item.website.uri)}
          className="capitalize rounded-3xl  bg-blue-900 text-white text-lg py-3 px-6 my-10 self-center"
        >
          <AdsClick
            fontSize="medium"
            style={{ color: "white", marginRight: "10px" }}
          />
          Explore More !
        </button>
      )}

      {/* back arrow */}
      <ArrowBack
        onClick={() => navigate(-1)}
        fontSize="large"
        className="shadow top-5 left-5 absolute lg:left-10"
        style={{
          color: "black",
          backgroundColor: "white",
          borderRadius: "3px",
          padding: "5px",
          zIndex: 1,
        }}
      />
    </div>
  );
}
