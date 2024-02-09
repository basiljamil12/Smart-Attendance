import React, { useState, useEffect } from "react";

function Toast({ toasts }) {
  const [visibleToasts, setVisibleToasts] = useState(
    new Array(toasts.length).fill(true)
  );
  const [fadeToasts, setFadeToasts] = useState(
    new Array(toasts.length).fill(false)
  );

  useEffect(() => {
    toasts.forEach((_, index) => {
      const timer1 = setTimeout(() => {
        setFadeToasts((prevState) => {
          const newArr = [...prevState];
          newArr[index] = true;
          return newArr;
        });
        const timer2 = setTimeout(() => {
          setVisibleToasts((prevState) => {
            const newArr = [...prevState];
            newArr[index] = false;
            return newArr;
          });
        }, 300);
      }, 2000);
      return () => {
        clearTimeout(timer1);
      };
    });
  }, [toasts]);

  const handleClose = (index) => {
    const newFading = [...fadeToasts];
    newFading[index] = true;
    setFadeToasts(newFading);
    setTimeout(() => {
      const newVisibility = [...visibleToasts];
      newVisibility[index] = false;
      setVisibleToasts(newVisibility);
    }, 300);
  };

  return (
    <div className={`fixed top-[10%] right-[10%] md:right-[5%] z-50`}>
      {toasts.map((toast, index) => (
        <div
          key={index}
          className={`${
            fadeToasts[index] ? "opacity-0" : "opacity-100"
          } transition-opacity duration-300 mb-2`}
        >
          {visibleToasts[index] && (
            <>
              {toast.type === "invalid" && (
                <div
                  class="text-toast-invalid bg-toast-invalid-back pointer-events-auto mx-auto mb-4 hidden w-80 md:w-96 max-w-full rounded-2xl bg-clip-padding text-sm shadow-lg shadow-black/5 data-[te-toast-show]:block data-[te-toast-hide]:hidden"
                  id="static-example"
                  role="alert"
                  aria-live="assertive"
                  aria-atomic="true"
                  data-te-autohide="false"
                  data-te-toast-init
                  data-te-toast-show
                >
                  <div class="flex items-center justify-between rounded-t-lg border-b-2 border-toast-invalid-brd bg-clip-padding px-4 pb-2 pt-2.5">
                    <p class="flex items-center font-bold text-success-700">
                      <svg
                        aria-hidden="true"
                        focusable="false"
                        data-prefix="fas"
                        data-icon="times-circle"
                        class="mr-2 h-4 w-4 fill-current"
                        role="img"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                      >
                        <path
                          fill="currentColor"
                          d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm121.6 313.1c4.7 4.7 4.7 12.3 0 17L338 377.6c-4.7 4.7-12.3 4.7-17 0L256 312l-65.1 65.6c-4.7 4.7-12.3 4.7-17 0L134.4 338c-4.7-4.7-4.7-12.3 0-17l65.6-65-65.6-65.1c-4.7-4.7-4.7-12.3 0-17l39.6-39.6c4.7-4.7 12.3-4.7 17 0l65 65.7 65.1-65.6c4.7-4.7 12.3-4.7 17 0l39.6 39.6c4.7 4.7 4.7 12.3 0 17L312 256l65.6 65.1z"
                        ></path>
                      </svg>
                      {toast.title}
                    </p>
                    <div class="flex items-center">
                      <button
                        type="button"
                        class="ml-2 box-content rounded-none border-none opacity-80 hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none"
                        data-te-toast-dismiss
                        aria-label="Close"
                        onClick={() => handleClose(index)}
                      >
                        <span class="w-[1em] focus:opacity-100 disabled:pointer-events-none disabled:select-none disabled:opacity-25 [&.disabled]:pointer-events-none [&.disabled]:select-none [&.disabled]:opacity-25">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            class="h-6 w-6"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </span>
                      </button>
                    </div>
                  </div>
                  <div class="break-words text-left rounded-b-lg bg-success-100 px-4 py-4 text-success-700">
                    {toast.body}
                  </div>
                </div>
              )}
              {toast.type === "error" && (
                <div
                  class="text-toast-error bg-toast-error-back pointer-events-auto w-80 md:w-96 mx-auto mb-4 hidden max-w-full rounded-2xl bg-clip-padding text-sm shadow-lg shadow-black/5 data-[te-toast-show]:block data-[te-toast-hide]:hidden"
                  id="static-example"
                  role="alert"
                  aria-live="assertive"
                  aria-atomic="true"
                  data-te-autohide="false"
                  data-te-toast-init
                  data-te-toast-show
                >
                  <div class="flex items-center justify-between rounded-t-lg border-b-2 border-toast-error-brd bg-clip-padding px-4 pb-2 pt-2.5">
                    <p class="flex items-center font-bold text-success-700">
                      <svg
                        aria-hidden="true"
                        focusable="false"
                        data-prefix="fas"
                        data-icon="exclamation-triangle"
                        class="mr-2 h-4 w-4 fill-current"
                        role="img"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 576 512"
                      >
                        <path
                          fill="currentColor"
                          d="M569.517 440.013C587.975 472.007 564.806 512 527.94 512H48.054c-36.937 0-59.999-40.055-41.577-71.987L246.423 23.985c18.467-32.009 64.72-31.951 83.154 0l239.94 416.028zM288 354c-25.405 0-46 20.595-46 46s20.595 46 46 46 46-20.595 46-46-20.595-46-46-46zm-43.673-165.346l7.418 136c.347 6.364 5.609 11.346 11.982 11.346h48.546c6.373 0 11.635-4.982 11.982-11.346l7.418-136c.375-6.874-5.098-12.654-11.982-12.654h-63.383c-6.884 0-12.356 5.78-11.981 12.654z"
                        ></path>
                      </svg>
                      {toast.title}
                    </p>
                    <div class="flex items-center">
                      <button
                        type="button"
                        class="ml-2 box-content rounded-none border-none opacity-80 hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none"
                        data-te-toast-dismiss
                        aria-label="Close"
                        onClick={() => handleClose(index)}
                      >
                        <span class="w-[1em] focus:opacity-100 disabled:pointer-events-none disabled:select-none disabled:opacity-25 [&.disabled]:pointer-events-none [&.disabled]:select-none [&.disabled]:opacity-25">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            class="h-6 w-6"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </span>
                      </button>
                    </div>
                  </div>
                  <div class="break-words text-left rounded-b-lg bg-success-100 px-4 py-4 text-success-700">
                    {toast.body}
                  </div>
                </div>
              )}
              {toast.type === "success" && (
                <div
                  class="text-toast-success bg-toast-success-back pointer-events-auto mx-auto mb-4 hidden w-80 md:w-96 max-w-full rounded-2xl bg-clip-padding text-sm shadow-lg shadow-black/5 data-[te-toast-show]:block data-[te-toast-hide]:hidden"
                  id="static-example"
                  role="alert"
                  aria-live="assertive"
                  aria-atomic="true"
                  data-te-autohide="false"
                  data-te-toast-init
                  data-te-toast-show
                >
                  <div class="flex items-center justify-between rounded-t-lg border-b-2 border-toast-success-brd bg-clip-padding px-4 pb-2 pt-2.5">
                    <p class="flex items-center font-bold text-success-700">
                      <svg
                        aria-hidden="true"
                        focusable="false"
                        data-prefix="fas"
                        data-icon="check-circle"
                        class="mr-2 h-4 w-4 fill-current"
                        role="img"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                      >
                        <path
                          fill="currentColor"
                          d="M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z"
                        ></path>
                      </svg>
                      {toast.title}
                    </p>
                    <div class="flex items-center">
                      <button
                        type="button"
                        class="ml-2 box-content rounded-none border-none opacity-80 hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none"
                        data-te-toast-dismiss
                        aria-label="Close"
                        onClick={() => handleClose(index)}
                      >
                        <span class="w-[1em] focus:opacity-100 disabled:pointer-events-none disabled:select-none disabled:opacity-25 [&.disabled]:pointer-events-none [&.disabled]:select-none [&.disabled]:opacity-25">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            class="h-6 w-6"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </span>
                      </button>
                    </div>
                  </div>
                  <div class="break-words text-left rounded-b-lg bg-success-100 px-4 py-4 text-success-700">
                    {toast.body}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      ))}
    </div>
  );
}
export default Toast;
