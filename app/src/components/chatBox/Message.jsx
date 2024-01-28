import "./chatBox.css";
import moment from 'moment';

export default function Message({message, own}) {
  return (
    <>
       <div className={own ? "message own" : "message"}>
            <div className="messageText">
                <span>{message.text}</span>{""}
                <span>{moment(message?.createdAt).fromNow()}</span>
            </div>
        </div>
    </>
  )
}
