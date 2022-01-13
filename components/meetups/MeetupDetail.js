import { loadGetInitialProps } from "next/dist/next-server/lib/utils";
import Card from "../ui/Card";
import classes from "./MeetupDetail.module.css";

function MeetUpDetail(props) {
  return (
    <Card>
      <div className={classes.image}>
        <img src={props.image} alt={props.title} />
      </div>
      <div className={classes.content}>
        <h3>{props.title}</h3>
        <address>{props.address}</address>
        <p>{props.description}</p>
      </div>
    </Card>
  );
}

export default MeetUpDetail;
