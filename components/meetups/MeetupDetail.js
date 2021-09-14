import { useRouter } from "next/router";


import classes from "./MeetupDetail.module.css";

export default function MeetupDetail(props) {
  const router = useRouter();

  const meetupId = router.query.meetupId;

  console.log(meetupId);
  return (
    <section className={classes.detail}>
      <img src={props.image} alt={props.id} />
      <h1>{props.title}</h1>
      <p>{props.address}</p>
      <p>{props.description}</p>
    </section>
  );
}
