import Head from "next/head";
import { MongoClient } from "mongodb";
import MeetupList from "../components/meetups/MeetupList";
import { Fragment } from "react";

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
  return (
    <Fragment>
      <Head>
        <title>Nextjs Meetup</title>
        <meta
          name="description"
          content="Browse a huge list of highly active React meetups!!"
        />
      </Head>
      <MeetupList meetups={props.meetups} />
    </Fragment>
  );
}
