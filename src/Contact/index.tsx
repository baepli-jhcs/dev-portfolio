import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { submitMessage } from "../store/slices/contactSlice";
import { pageTransition } from "../transitions";
import { Message } from "../types/message";
import ContactCSS from "./Contact.module.scss";
import Response from "./Response";
export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  // 0 for none, 1 for loading, 2 for success, 3 for error
  const [loadingState, setLoadingState] = useState(0);
  const dispatch = useDispatch();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (loadingState) return;
    const newMessage: Message = {
      name,
      email,
      subject,
      message,
    };
    dispatch(submitMessage(newMessage));
  };

  const contactResponse = useSelector((state: RootState) => state.contact);

  useEffect(() => {
    switch (contactResponse.status) {
      case "loading":
        setLoadingState(1);
        return;
      case "success":
        setLoadingState(2);
        break;
      case "error":
        setLoadingState(3);
        break;
      default:
        return;
    }
    setTimeout(() => {
      setLoadingState(0);
    }, 1750);
  }, [contactResponse, dispatch]);

  return (
    <>
      <motion.div
        className={ContactCSS.container}
        initial="initial"
        animate="animate"
        exit="exit"
        variants={pageTransition}
      >
        <form
          onSubmit={(e) => handleSubmit(e)}
          className={ContactCSS["form-container"]}
          autoComplete="off"
        >
          <h1 className={ContactCSS.header}>
            Contact <div className={ContactCSS.me}>Me!</div>
          </h1>
          <p className={ContactCSS.text}>
            I'm always open to new opportunities and ideas! If you have any
            questions or concerns, feel free to message me below.
          </p>
          <div className={`${ContactCSS.name} ${ContactCSS.input}`}>
            <input
              type="text"
              placeholder="John Doe"
              value={name}
              name="name"
              onChange={(e) => setName(e.target.value)}
              autoComplete="new-password"
              required
            />
            <div className={ContactCSS["red-underline"]} />
          </div>
          <div className={`${ContactCSS.email} ${ContactCSS.input}`}>
            <input
              type="email"
              placeholder="example@gmail.com"
              value={email}
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="new-password"
              required
            />
            <div className={ContactCSS["red-underline"]} />
          </div>
          <div className={`${ContactCSS.subject} ${ContactCSS.input}`}>
            <input
              type="text"
              placeholder="Subject"
              value={subject}
              name="subject"
              onChange={(e) => setSubject(e.target.value)}
              required
            />
            <div className={ContactCSS["red-underline"]} />
          </div>
          <div className={`${ContactCSS.message} ${ContactCSS.input}`}>
            <textarea
              placeholder="Message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            />
            <div className={ContactCSS["red-underline"]} />
          </div>
          <button type="submit" className={ContactCSS.submit}>
            Send Message
          </button>
        </form>
        <AnimatePresence exitBeforeEnter>
          {loadingState !== 0 && <Response loadingState={loadingState} />}
        </AnimatePresence>
      </motion.div>
    </>
  );
}
