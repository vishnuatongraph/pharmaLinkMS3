"use client";

import React, { Fragment, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import Heading from "@/components/common/Heading";
import interactionPlugin from "@fullcalendar/interaction";
import bootstrap5Plugin from "@fullcalendar/bootstrap5";
import timeGridPlugin from "@fullcalendar/timegrid";
import "bootstrap-icons/font/bootstrap-icons.css";
import useRouting from "@/hooks/routing";
import { DASHBOARD_PAGE } from "@/utils/constants/pageName";
import { Dialog, Transition } from "@headlessui/react";
import { EventSourceInput } from "@fullcalendar/core/index.js";
import { FiAlertTriangle } from "react-icons/fi";
import { EducationData } from "@/utils/constants/education";
// import { CalendarApi } from "@fullcalendar/core";

interface Event {
  title: string;
  start: Date | string;
  allDay: boolean;
  id: number;
}
const AvailabilityCalender = () => {
  // const calendarRef = useRef<CalendarApi | null>(null);
  const { pushToPage } = useRouting();
  const [showModal, setShowModal] = useState(false);
  const [allEvents, setAllEvents] = useState<Event[]>([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [idToDelete, setIdToDelete] = useState<number | null>(null);
  const [newEvent, setNewEvent] = useState<Event>({
    title: "",
    start: "",
    allDay: false,
    id: 0,
  });

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setAllEvents([...allEvents, newEvent]);
    setShowModal(false);
    setNewEvent({
      title: "",
      start: "",
      allDay: false,
      id: 0,
    });
  }

  const handleChange = (e: any): void => {
    setNewEvent({
      ...newEvent,
      title: e.target.value,
    });
  };
  function handleDateClick(arg: { date: Date; allDay: boolean; dayEl: any }) {
    var dayEl = arg.dayEl;

    // Change the background color of the cell
    dayEl.style.backgroundColor = "#FFE979";
    setNewEvent({
      ...newEvent,
      start: arg.date,
      allDay: arg.allDay,
      id: new Date().getTime(),
    });
    setShowModal(true);
  }
  function handleCloseModal() {
    setShowModal(false);
    setNewEvent({
      title: "",
      start: "",
      allDay: false,
      id: 0,
    });
    setShowDeleteModal(false);
    setIdToDelete(null);
  }

  function handleDeleteModal(data: { event: { id: string } }) {
    // console.log("Thiiiiiiss");
    setShowDeleteModal(true);
    setIdToDelete(Number(data.event.id));
  }

  function handleDelete() {
    setAllEvents(
      allEvents.filter((event) => Number(event.id) !== Number(idToDelete)),
    );
    setShowDeleteModal(false);
    setIdToDelete(null);
  }

  // const handleSelect = (selectionInfo) => {
  //   const calendar = calendarRef.current.getApi();
  //   const selectedCells = document.querySelectorAll(
  //     ".fc-highlight:not(.fc-non-business)" // Filter out non-business hours if needed
  //   );

  //   // Change the background color of the selected cells
  //   selectedCells.forEach((cell) => {
  //     cell.style.backgroundColor = "yellow";
  //   });

  //   // Continue with the default select callback (optional)
  //   if (calendar.options.select) {
  //     calendar.options.select(selectionInfo);
  //   }
  // };
  const hours = [];
  for (let hour = 0; hour < 24; hour++) {
    hours.push(
      <option key={hour + 1} value={hour + 1}>
        {hour + 1} {hour < 12 ? "AM" : "PM"}
      </option>,
    );
  }

  return (
    <div className=" flex flex-col bg-[#e1e1e1] h-screen">
      <div className="bg-[#e1e1e1] w-full h-[24px] p-10">
        <Heading />
      </div>

      <div className="flex-1 mt-[41px] px-[70px]">
        {/* <div className="h-[70vh]"> */}
        <FullCalendar
          // viewClassNames={}
          //   eventBackgroundColor="red"

          height={"70vh"}
          events={allEvents as EventSourceInput}
          nowIndicator={true}
          selectMirror={true}
          editable={true}
          // ref={calendarRef}
          plugins={[
            dayGridPlugin,
            interactionPlugin,
            bootstrap5Plugin,
            timeGridPlugin,
          ]}
          initialView="dayGridMonth"
          selectable={true}
          headerToolbar={{
            left: "updateAvailablity",
            center: "",
            right: "prev,title,next",
            end: "monthButton",
          }}
          customButtons={{
            updateAvailablity: {
              text: "Update Availability",
              click: function () {
                // console.log("Update Availability clicked");
              },
              themeIcon: "titleButtonIcon",
            },

            title: {
              themeIcon: "heading-calender",
            },
            titleButton: {
              text: "Title",
              click: function () {
                // console.log("Title button clicked");
              },
              themeIcon: "titleButtonIcon", // Add a custom CSS class to the button
            },
            gapButton: {
              text: " ",
              themeIcon: "gapButtonIcon", // Add a custom CSS class to the button
            },
            monthButton: {
              text: "Month",
              click: function () {
                // console.log("Month button clicked");
              },
              themeIcon: "monthButtonIcon", // Add a custom CSS class to the button
            },
          }}
          // direction="rtl"
          // buttonText={{
          //   prev: "Previous",
          //   next: "Next",
          // }}
          themeSystem="bootstrap5" // Use a custom theme to apply the CSS classes
          dateClick={handleDateClick}
          //   select={(info) => {
          //     alert("selected " + info.startStr + " to " + info.endStr);
          //   }}
          // select={handleDateSelect}
          selectAllow={(selectionInfo) => {
            // Define a custom selection constraint if needed
            return selectionInfo.start.getDay() !== 0; // Allow selection only on non-Sundays
          }}
          eventClick={(data) => handleDeleteModal(data)}

          // events={}

          // selectCallback={handleSelect}
        />
        {/* </div> */}
      </div>
      <div className="flex gap-5 mt-8 mb-[100px] justify-center">
        <button
          type="button"
          className=" text-black text-center bg-white rounded-md font-inter text-sm font-medium leading-7 w-[93px] h-[52px]"
          onClick={() => pushToPage(`/${DASHBOARD_PAGE}`)}
        >
          {"Skip"}
        </button>

        <button
          type="submit"
          onClick={() => pushToPage(`/${DASHBOARD_PAGE}`)}
          className="px-4 py-2 flex gap-2 items-center text-white bg-aqua rounded-md font-inter text-sm font-medium leading-7 text-left"
        >
          {EducationData.saveAndContinue}
        </button>
        {/* <SaveContinueBtn /> */}
      </div>

      <Transition.Root show={showModal} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={setShowModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8  sm:max-w-lg sm:p-6">
                  <div>
                    <div className="mt-3 text-center sm:mt-5">
                      {/* <Dialog.Title
                        as="h3"
                        className="text-base font-semibold leading-6 text-gray-900"
                      >
                        Add Event
                      </Dialog.Title> */}
                      {/* <form action="submit" onSubmit={handleSubmit}>
                        <div className="mt-2">
                          <input
                            type="text"
                            name="title"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 
                            shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 
                            focus:ring-2 
                            focus:ring-inset focus:ring-violet-600 
                            sm:text-sm sm:leading-6"
                            value={newEvent.title}
                            onChange={(e) => handleChange(e)}
                            placeholder="Title"
                          />
                        </div>
                        <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                          <button
                            type="submit"
                            className="inline-flex w-full justify-center rounded-md bg-violet-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-violet-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-600 sm:col-start-2 disabled:opacity-25"
                            disabled={newEvent.title === ""}
                          >
                            Create
                          </button>
                          <button
                            type="button"
                            className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0"
                            onClick={handleCloseModal}
                          >
                            Cancel
                          </button>
                        </div>
                      </form> */}

                      <form
                        action="submit"
                        onSubmit={handleSubmit}
                        className="flex flex-col gap-5"
                      >
                        <div className="mt-2">
                          <label
                            htmlFor="shift"
                            className="font-medium text-gray-700 flex items-center text-base"
                          >
                            Shift
                          </label>
                          <select
                            id="shift"
                            name="shift"
                            className=" w-72 h-10 rounded-lg p-2 block border-0  py-1.5 text-gray-900 
                shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 
                focus:ring-2 
                focus:ring-inset focus:ring-violet-600 
                sm:text-sm sm:leading-6"
                            value={newEvent.title}
                            onChange={(e) => handleChange(e)}
                          >
                            <option value="day">Day Shift</option>
                            <option value="night">Night Shift</option>
                          </select>
                        </div>

                        <div className="mt-2">
                          <label
                            htmlFor="availableHours"
                            className="font-medium text-gray-700 flex items-center text-base"
                          >
                            Available Hours
                          </label>

                          <div className="flex gap-2">
                            <select
                              id="availableHours"
                              name="availableHours"
                              className="w-32 h-10 rounded-lg p-2 block  border-0 py-1.5 text-gray-900 
                shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 
                focus:ring-2 
                focus:ring-inset focus:ring-violet-600 
                sm:text-sm sm:leading-6"
                              // value={newEvent}
                              // onChange={(e) => handleChange(e)}
                            >
                              {hours}
                            </select>
                            To
                            <select
                              id="availableHours"
                              name="availableHours"
                              className="w-32 h-10 rounded-lg p-2 block  border-0 py-1.5 text-gray-900 
                shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 
                focus:ring-2 
                focus:ring-inset focus:ring-violet-600 
                sm:text-sm sm:leading-6"
                              // value={newEvent}
                              // onChange={(e) => handleChange(e)}
                            >
                              {hours}
                            </select>
                          </div>
                        </div>

                        <button
                          className="w-72 h-10 top-20 border bg-teal-500  left-20 rounded-lg border-teal-500 px-10 py-17 gap-10 bg-teal-500 text-[#2CBFCA]"
                          // Other attributes and event handlers
                        >
                          Save
                          {/* Button content */}
                        </button>
                        {/* Existing code for the title input field */}

                        <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                          {/* Existing code for the buttons */}
                        </div>
                      </form>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>

      <Transition.Root show={showDeleteModal} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={setShowDeleteModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel
                  className="relative transform overflow-hidden rounded-lg
                   bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg"
                >
                  <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                      <div
                        className="mx-auto flex h-12 w-12 flex-shrink-0 items-center 
                      justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10"
                      >
                        <FiAlertTriangle
                          className="h-6 w-6 text-red-600"
                          aria-hidden="true"
                        />
                      </div>
                      <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                        <Dialog.Title
                          as="h3"
                          className="text-base font-semibold leading-6 text-gray-900"
                        >
                          Delete Event
                        </Dialog.Title>
                        <div className="mt-2">
                          <p className="text-sm text-gray-500">
                            Are you sure you want to delete this event?
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <button
                      type="button"
                      className="inline-flex w-full justify-center rounded-md bg-red px-3 py-2 text-sm 
                      font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                      onClick={handleDelete}
                    >
                      Delete
                    </button>
                    <button
                      type="button"
                      className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 
                      shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                      onClick={handleCloseModal}
                    >
                      Cancel
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  );
};

export default AvailabilityCalender;
