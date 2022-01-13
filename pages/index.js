import MeetUpList from "../components/meetups/MeetupList";
import { MongoClient } from "mongodb";
import Head from "next/head";
import { Fragment } from "react";

function HomePage(props) {
  return (
    <Fragment>
      <Head>
        <title>MeetUps</title>
        <meta
          name="description"
          content="Browse a huge list of active meetup!"
        />
      </Head>
      <MeetUpList meetups={props.meetups} />
    </Fragment>
  );
}

//If you have data that changes frquently and you need the request and response object use getServerSideProps(context).
// export async function getServerSideProps(context) {
//   const req = context.req;

//   const res = context.res;

//   return {
//     props: {
//       meetups: DUMMIE_DATA,
//     },
//   };
// }

export async function getStaticProps() {
  const client = await MongoClient.connect(
    "mongodb+srv://new_user23:kingjames23@cluster0.a8bvu.mongodb.net/meetups?retryWrites=true&w=majority"
  );

  const db = client.db();

  const meetupsCollections = db.collection("meetups");

  const meetups = await meetupsCollections.find().toArray();

  client.close();

  return {
    props: {
      meetups: meetups.map((meetup) => {
        return {
          id: meetup._id.toString(),
          title: meetup.title,
          image: meetup.image,
          address: meetup.address,
          description: meetup.description,
        };
      }),
    },
    revalidate: 1,
  };
}

export default HomePage;
