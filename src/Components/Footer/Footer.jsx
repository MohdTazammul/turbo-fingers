import React from "react";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import "./style.scss";
import { useNavigate } from "react-router-dom";
function Footer() {
  const navigate = useNavigate();
  return (
    <>
      <div id="Footer">
        <div>
          <a
            href="https://tazammul.in"
            target={"_blank"}
          >
            <Avatar
              alt="Linkedin"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzgMRRHk7x1lOHA7vH3M9PTjiMcQmrwo2YsnrTKM3BpW9XxKOsUuUiUMUsgqlhPVBmn-M&usqp=CAU"
            />
          </a>
          <a
            href="https://www.linkedin.com/in/mohd-tazammul/"
            target={"_blank"}
          >
            <Avatar
              alt="Linkedin"
              src="https://cdn3.iconfinder.com/data/icons/inficons/512/linkedin.png"
            />
          </a>
          <a href="https://github.com/MohdTazammul" target={"_blank"}>
            <Avatar src="data:image/png;base64,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" />
          </a>
          <a href="mailto:tazammul1683@gmail.com" target={"_blank"}>
            <Avatar src="https://cdn.icon-icons.com/icons2/730/PNG/512/gmail_icon-icons.com_62758.png" />
          </a>
        </div>
        <div>
          <div>
            <span
              onClick={() =>
                window
                  .open("https://forms.gle/LcFuqnDdNaJ19rzk9", "_blank")
                  .focus()
              }
            >
              Feedback Form
            </span>{" "}
            | <span onClick={() => navigate("/profile")}>Profile Page</span>
          </div>
          <p>
            Built by Mohd Tazammul with <span>&#9829;</span>
          </p>
        </div>
      </div>
      <div id="footer-strip"></div>
    </>
  );
}

export default Footer;
