import { MongoClient, ObjectId } from "mongodb";
import { Fragment } from "react";
import Head from "next/head";
import MeetupDetail from "../../components/meetups/MeetupDetail";

export async function getStaticPaths() {
  const client = await MongoClient.connect(
    "mongodb+srv://nextjs:nextjs@cluster0.tlggv.mongodb.net/meetups?retryWrites=true&w=majority"
  );

  const db = client.db();

  const meetupsCollection = db.collection("meetups");

  const result = await meetupsCollection.find({}, { _id: 1 }).toArray();

  client.close();
  return {
    fallback: false,
    paths: result.map((meetup) => ({
      params: {
        meetupId: meetup._id.toString()
      }
    }))
  };
}

export async function getStaticProps(context) {
  const meetupId = context.params.meetupId;

  const client = await MongoClient.connect(
    "mongodb+srv://nextjs:nextjs@cluster0.tlggv.mongodb.net/meetups?retryWrites=true&w=majority"
  );

  const db = client.db();

  const meetupsCollection = db.collection("meetups");

  const result = await meetupsCollection.findOne({ _id: ObjectId(meetupId) });

  client.close();
  return {
    props: {
      meetupData: {
        id: result._id.toString(),
        title: result.title,
        image: result.image,
        address: result.address,
        description: result.description
      }
    }
  };
}

export default function MeetupDetails(props) {
  return (
    <Fragment>
      <Head>
        <title>{props.meetupData.title}</title>
        <meta name="description" content={props.meetupData.description} />
      </Head>
      <MeetupDetail
        title={props.meetupData.title}
        image={props.meetupData.image}
        address={props.meetupData.address}
        description={props.meetupData.description}
      />
    </Fragment>
  );
}
