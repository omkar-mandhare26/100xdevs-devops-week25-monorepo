import React from 'react'
import { client } from "@repo/db/client";


const Home = async () => {
  const user = await client.user.findFirst();

  return (
    <div>Home Page
      <div>
        {user?.id}
        <br />
        {user?.username}
        <br />
        {user?.password}
      </div>
    </div>
  )
}

export default Home