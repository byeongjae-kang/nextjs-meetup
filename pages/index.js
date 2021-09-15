import MeetupList from "../components/meetups/MeetupList";

const DUMMY_MEETUPS = [
  {
    id: "m1",
    title: "The First Meetup",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Science_World_at_TELUS_World_of_Science.jpg/1599px-Science_World_at_TELUS_World_of_Science.jpg",
    address: "1455 Quebec St, Vancouver, BC V6A 3Z7",
    description: "This is our first meetup"
  },
  {
    id: "m2",
    title: "The Second Meetup",
    image:
      "https://www.aldergrovestar.com/wp-content/uploads/2020/03/20995280_web1_200318-LAT-Langley-City-Hall-timms_1-1024x683.jpg",
    address: "20399 Douglas Crescent, Langley, BC V3A 4B3",
    description: "This is our second meetup"
  }
];

// export async function getServerSideProps(context) {
//   const req = context.req;
//   const res = context.res;

//   return {
//     props: {
//       meetups: DUMMY_MEETUPS
//     }
//   };
// }

export async function getStaticProps() {
  return {
    props: {
      meetups: DUMMY_MEETUPS
    },
    revalidate: 10
  };
}

export default function HomePage(props) {
  return <MeetupList meetups={props.meetups} />;
}
