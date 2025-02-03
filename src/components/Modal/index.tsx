"use client";
import { useState, memo } from "react";

interface ModalProps {
  title?: string;
  onAccept?: (afterClose?: () => void) => void;
  onDecline?: () => void;
  children?: React.ReactNode;
  toggleLabel: string;
  disableButton?: boolean;
  loadButton?: boolean;
}

const Modal = ({
  title = "",
  onAccept = () => {},
  onDecline = () => {},
  children,
  toggleLabel,
  disableButton,
  loadButton,
}: ModalProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => setIsOpen(false);
  const handleOpen = () => setIsOpen(true);

  return (
    <>
      <button
        onClick={handleOpen}
        className="block border border-green-700 text-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none hover:text-white  focus:ring-green-300 font-bold rounded-md text-sm px-2 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
        type="button"
      >
        {toggleLabel}
      </button>

      <div
        className={`${
          isOpen ? "" : "hidden"
        } overflow-y-auto bg-black bg-opacity-55 overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full ${
          loadButton ? "pointer-events-none" : ""
        }`}
        tabIndex={-1}
        aria-hidden={!isOpen}
        onClick={handleClose}
      >
        <div
          className="relative mx-auto top-1/4 p-4 w-full max-w-2xl max-h-full "
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <div className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                {title}
              </h3>
              <button
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                onClick={handleClose}
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>

            <div className="p-4 md:p-5 space-y-4">{children}</div>

            <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
              <button
                disabled={disableButton || loadButton}
                type="button"
                className={`${
                  disableButton || loadButton ? "pointer-events-none" : ""
                } text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800`}
                onClick={async () => {
                  onAccept(handleClose);
                }}
              >
                {loadButton ? "Processing.." : "Confirm"}
              </button>
              <button
                disabled={loadButton}
                type="button"
                className={`${
                  loadButton ? "pointer-events-none" : ""
                } py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-green-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700`}
                onClick={() => {
                  onDecline();
                  handleClose();
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default memo(Modal);
