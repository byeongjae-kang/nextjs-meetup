import MeetupDetail from "../../components/meetups/MeetupDetail";

export async function getStaticPaths() {
  return {
    fallback: false,
    paths: [
      {
        params: {
          meetupId: "m1"
        }
      },
      {
        params: {
          meetupId: "m2"
        }
      }
    ]
  };
}

export async function getStaticProps(context) {
  const meetupId = context.params.meetupId;
  console.log(meetupId);

  return {
    props: {
      meetupData: {
        id: "m1",
        title: "The First Meetup",
        image:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Science_World_at_TELUS_World_of_Science.jpg/1599px-Science_World_at_TELUS_World_of_Science.jpg",
        address: "1455 Quebec St, Vancouver, BC V6A 3Z7",
        description: "This is our first meetup"
      }
    }
  };
}

export default function MeetupDetails() {
  return (
    <MeetupDetail
      id="m1"
      title="The First Meetup"
      image="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Science_World_at_TELUS_World_of_Science.jpg/1599px-Science_World_at_TELUS_World_of_Science.jpg"
      address="1455 Quebec St`` Vancouver`` BC V6A 3Z7"
      description="This is our first meetup"
    />
  );
}
