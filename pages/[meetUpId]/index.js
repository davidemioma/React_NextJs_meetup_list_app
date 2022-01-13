import MeetUpDetailLayout from "../../components/meetups/MeetupDetail";
import { MongoClient, ObjectId } from "mongodb";
import { Fragment } from "react";
import Head from "next/head";

function MeetUpDetail(props) {
  return (
    <Fragment>
      <Head>
        <title>{props.meetUpData.title}</title>
        <meta name="description" content={props.meetUpData.description} />
      </Head>
      <MeetUpDetailLayout
        image={props.meetUpData.image}
        title={props.meetUpData.title}
        address={props.meetUpData.address}
        description={props.meetUpData.description}
      />
    </Fragment>
  );
}

export async function getStaticPaths() {
  const client = await MongoClient.connect(
    "mongodb+srv://new_user23:kingjames23@cluster0.a8bvu.mongodb.net/meetups?retryWrites=true&w=majority"
  );

  const db = client.db();

  const meetupsCollections = db.collection("meetups");

  const meetups = await meetupsCollections.find({}, { _id: 1 }).toArray();

  client.close();

  return {
    fallback: "blocking",
    paths: meetups.map((meetup) => ({
      params: {
        meetUpId: meetup._id.toString(),
      },
    })),
  };
}

export async function getStaticProps(context) {
  const meetUpId = context.params.meetUpId;

  const client = await MongoClient.connect(
    "mongodb+srv://new_user23:kingjames23@cluster0.a8bvu.mongodb.net/meetups?retryWrites=true&w=majority"
  );

  const db = client.db();

  const meetupsCollections = db.collection("meetups");

  const meetup = await meetupsCollections.findOne({ _id: ObjectId(meetUpId) });

  client.close();

  return {
    props: {
      meetUpData: {
        id: meetup._id.toString(),
        title: meetup.title,
        image: meetup.image,
        address: meetup.address,
        description: meetup.description,
      },
    },
  };
}

export default MeetUpDetail;
