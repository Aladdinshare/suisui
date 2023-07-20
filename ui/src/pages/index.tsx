import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { ConnectButton, useWallet } from '@suiet/wallet-kit';
import Head from 'next/head';
import HamburgerIcon from '../components/HamburgerIcon';
import ChatInput from '../components/ChatInput';
import { PostCard } from '../components/PostCard';
import { SuiObjectLinkButton } from '../components/SuiObjectLinkButton';
import {
  SUITTER_PACKAGE_ID,
  SUITTER_RECENT_POSTS_OBJECT_ID,
} from '../config/constants';
import {
  getRecentPostIdList,
  getRecentPostObjectList,
} from '../suitterLib/client';
import { SuitterPost } from '../suitterLib/types';

import { AiOutlineFire, AiFillWechat } from 'react-icons/ai'; // Import icons

/**
 * WalletConnectButton Component
 * @returns
 */
const WalletConnectButton = () => {
  return <ConnectButton>Connect Wallet</ConnectButton>;
};

/**
 * InformationPart Component
 * @returns
 */
const InformationPart = ({ getPosts }) => {
  const { address } = useWallet();

  return (
    <div className="w-1/4 p-4 text-white">
      <div className="font-bold text-lg mb-4">Suitter</div>
      <div className="font-bold text-lg mb-4">Home</div>
      <div className="text-sm mb-4">
        <span className="flex items-center">
          USER
          <SuiObjectLinkButton id={address!} />
        </span>
      </div>
      <div className="text-sm mb-4">
        <span className="flex items-center">
          PACKAGE_ID
          <SuiObjectLinkButton id={SUITTER_PACKAGE_ID} />
        </span>
      </div>
      <div className="text-sm mb-4">
        <span className="flex items-center">
          RECENT_POSTS
          <SuiObjectLinkButton id={SUITTER_RECENT_POSTS_OBJECT_ID} />
        </span>
      </div>
      <button onClick={getPosts}>get posts</button>
    </div>
  );
};

/**
 * TimeLinePart Component
 * @returns
 */
const TimeLinePart = ({ recentPostList, getPosts  }) => (
  <div className="border-slate-600 border-x-[0.5px] flex flex-col h-screen">
    <div className="font-bold text-lg mb-2 pl-4 text-white">Timeline</div>
    <div className="overflow-auto flex-grow gap-1">
      {recentPostList.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
    <div className="pb-24">
      <ChatInput props={getPosts} />
    </div>
  </div>
);

const DynamicTinderPart = dynamic(() => import('./TinderPart'), {
  ssr: false,
});

/**
 * Page Component
 * @returns
 */
const Page = () => {
  const [recentPostList, setRecentPostList] = useState<SuitterPost[]>([]);
  const { address } = useWallet();
  const [activeTab, setActiveTab] = useState('tinder');

  /**
   * Get recent posts
   */
  const getPosts = async () => {
    const postIdList: any = await getRecentPostIdList();
    const postList: any = await getRecentPostObjectList(postIdList);
    console.log(postList)
    setRecentPostList(postList)
  };

  useEffect(() => {
    getPosts();
  }, []);

  const swiped = (direction, nameToDelete) => {
    console.log('removing: ' + nameToDelete);
    // Handle swipe logic if needed
  };

  const outOfFrame = (name) => {
    console.log(name + ' left the screen!');
    // Handle out of frame logic if needed
  };

  return (
    <main className="flex min-h-screen bg-slate-900">
      <Head>
        <title>Suinder</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>


      {/* Floating hamburger icon */}
      <header className="fixed top-0 right-0 m-2 z-50">
        <HamburgerIcon>
          <InformationPart getPosts={getPosts} />
          <div className="w-1/4 p-4 text-white">
            <div className="font-bold text-lg mb-4">
              <WalletConnectButton />
            </div>
            {/* <div className="font-bold text-lg mb-4">
              <Link href="https://github.com/umi-ag/suitter">GitHub</Link>
            </div> */}
          </div>
        </HamburgerIcon>
      </header>

      <div className="flex-1  border-slate-600 flex flex-col h-screen">
        {/* <div className="overflow-auto flex-grow gap-1"> */}
          <DynamicTinderPart
            swiped={swiped}
            outOfFrame={outOfFrame}
            activeTab={activeTab}
          />
        {/* </div> */}
        {activeTab === 'timeline' && <TimeLinePart recentPostList={recentPostList} />}
      </div>

      {/* FooterTab */}
      <footer className="fixed bottom-0 left-0 right-0 h-16 bg-transparent flex">
        <button
          className={`w-1/2 h-full flex justify-center items-center ${
            activeTab === 'tinder' ? 'bg-blue-500' : 'bg-blue-100'
          } rounded-full`}
          onClick={() => setActiveTab('tinder')}
        >
          <AiOutlineFire size={20} className="text-black" />
        </button>
        <button
          className={`w-1/2 h-full flex justify-center items-center ${
            activeTab === 'timeline' ? 'bg-blue-500' : 'bg-blue-100'
          } rounded-full`}
          onClick={() => setActiveTab('timeline')}
        >
          <AiFillWechat size={20} className="text-black" />
        </button>
      </footer>
    </main>
  );
};

export default Page;
