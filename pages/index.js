import { MongoClient } from "mongodb";
import MeetupList from "../components/meetups/MeetupList";

export async function getStaticProps() {
  const client = await MongoClient.connect(
    "mongodb+srv://nextjs:nextjs@cluster0.tlggv.mongodb.net/meetups?retryWrites=true&w=majority"
  );

  const db = client.db();

  const meetupsCollection = db.collection("meetups");

  const result = await meetupsCollection.find().toArray();
  
  client.close();

  return {
    props: {
      meetups: result.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        description: meetup.description,
        id: meetup._id.toString()
      }))
    },
    revalidate: 10
  };
}

export default function HomePage(props) {
  return <MeetupList meetups={props.meetups} />;
}
