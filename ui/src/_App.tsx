type Tweet = {
  username: string
  tweetText: string
  avatarUrl: string
}

/**
 * TweetCard Component
 * @param props
 * @returns
 */
const TweetCard = (props: Tweet) => {
  const {
    username,
    tweetText,
    avatarUrl
  } = props

  return (
    <div className="w-[100%] mx-auto bg-white rounded-xl shadow-md overflow-hidden">
      <div className="md:flex">
        <div className="md:flex-shrink-0">
          {/* <img className="h-48 w-full object-cover md:h-full md:w-48" src="https://umi.ag" alt="User avatar" /> */}
          <img
            width={60}
            className="m-10 object-cover"
            src={avatarUrl}
            alt="User avatar"
          />
        </div>

        <div className="p-8">
          <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">{username}</div>
          <p className="mt-2 text-gray-500">{tweetText}</p>
          <div className="mt-4">
            <button className="text-blue-500 hover:text-blue-700">
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7" />
              </svg>
              Retweet
            </button>
            <button className="text-red-500 hover:text-red-700 ml-4">
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7" />
              </svg>
              Like
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

/**
 * Page Component
 * @returns
 */
const Page = () => {
  const data = [
    {
      id: 1,
      username: "umi.ag",
      tweetText: "This is a tweet",
      avatarUrl: "https://umi.ag/logo.png",
    },
    {
      id: 2,
      username: "umi.ag",
      tweetText: "This is a tweet",
      avatarUrl: "https://umi.ag/logo.png",
    },
  ]

  return (
    <>
          {
            data.map((tweet) => (
              <TweetCard key={tweet.id} {...tweet} />
            ))
          }
    </>
  )
}

export default Page;
