import NewMeetUpForm from "../../components/meetups/NewMeetupForm";
import { useRouter } from "next/router";
import { Fragment } from "react";
import Head from "next/head";

function NewMeetUp() {
  const router = useRouter();

  const addMeetUpHandler = async (inputData) => {
    const res = await fetch("/api/new-meetup", {
      method: "POST",
      body: JSON.stringify(inputData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      throw new Error("Could not send request");
    }

    const data = await res.json();

    console.log(data);

    router.push("/");
  };

  return (
    <Fragment>
      <Head>
        <title>Add New MeetUps</title>
        <meta name="description" content="Add to the list of active meetup!" />
      </Head>
      <NewMeetUpForm onAddMeetup={addMeetUpHandler} />
    </Fragment>
  );
}

export default NewMeetUp;
