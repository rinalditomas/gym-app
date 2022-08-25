import axios from "axios";


function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}



const functionToSetTimeOutForErrors = (message, fn) => {

  setTimeout(() => {
    fn(message)
  }, 100000);
}

export {functionToSetTimeOutForErrors, classNames}