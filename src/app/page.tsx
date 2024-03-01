import { SpotifyAuthButton } from "@/components/spotify-auth-button";
import clientPromise from "@/lib/mongodb";

const getDbConnection = async () => {
  try {
    await clientPromise;
    // `await clientPromise` will use the default database passed in the MONGODB_URI
    // However you can use another database (e.g. myDatabase) by replacing the `await clientPromise` with the following code:
    //
    // `const client = await clientPromise`
    // `const db = client.db("myDatabase")`
    //
    // Then you can execute queries against your database like so:
    // db.find({}) or any of the MongoDB Node Driver commands

    return {
      props: { isConnected: true },
    };
  } catch (e) {
    console.error(e);
    return {
      props: { isConnected: false },
    };
  }
};

export default async function Home() {
  const { isConnected } = (await getDbConnection()).props;

  return (
    <main className="flex min-h-screen flex-col items-center text-9xl">
      yo
      <div className="flex flex-col text-xl mt-12">
        <p>Please first login with your spotify account</p>
        <p>Then you will be redirected to the albums search page</p>
      </div>
      <SpotifyAuthButton />
      {isConnected ? (
        <h2>You are connected to MongoDB</h2>
      ) : (
        <h2>You are not connected :(</h2>
      )}
    </main>
  );
}
