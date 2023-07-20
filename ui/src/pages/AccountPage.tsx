import { ConnectButton, useWallet } from '@suiet/wallet-kit';
import Link from 'next/link';

/**
 * WalletConnectButton コンポーネント
 * @returns
 */
const WalletConnectButton = () => {
  return <ConnectButton>Connect Wallet</ConnectButton>;
};

/**
 * InformationPart コンポーネント
 * @returns
 */
const InformationPart = () => {
  // Your InformationPart component code...
};

/**
 * WalletPart コンポーネント
 * @returns
 */
const WalletPart = () => {
  // Your WalletPart component code...
};

const AccountPage = () => {
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

      {/* Include Component 1 */}
      <InformationPart />
      {/* Include Component 2 */}
      <WalletPart />
    </div>
  );
};

export default AccountPage;
