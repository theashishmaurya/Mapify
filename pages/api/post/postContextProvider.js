import { useUser } from "@auth0/nextjs-auth0";
import { createContext, useEffect, useState } from "react";

export const PostContext = createContext();

const PostContextProvider = ({ children }) => {
  const { user, isLoading, error } = useUser();

  const [postData, setPostData] = useState(
    {
      tittle: "untitled",
      Descriptionn: "None",
      comments: [],
      votes: 0,
      userId: user ? user.sub : null,
      //VotedBy: [UserID]  so that they can't vote again and again
      //LikedBy :[UserID] so that they can't like again and again
    }
    //To emplement liked By
  );
  useEffect(() => {
    if (!isLoading) {
      setPostData({
        tittle: postData.tittle,
        Descriptionn: postData.Descriptionn,
        comments: postData.comments,
        votes: postData.votes,
        userId: user ? user.sub : null,
      });
    }
  }, [isLoading]);

  return (
    <PostContext.Provider value={[postData, setPostData]}>
      {children}
    </PostContext.Provider>
  );
};

export default PostContextProvider;
