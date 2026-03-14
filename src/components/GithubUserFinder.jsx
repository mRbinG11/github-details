import axios from "axios";
import { useState } from "react";

import "./GithubUserFinder.css";

export const GithubUserFinder = () => {
  const searchEndpoint = "https://api.github.com/users/";
  const [username, setUsername] = useState("");
  const [validationStatus, setValidationStatus] = useState(true);
  const [userData, setUserData] = useState({});

  const validateUsername = () => {
    if (!username || username == "") return false;
    return true;
  };

  const searchUser = async () => {
    if (validateUsername()) {
      setValidationStatus(true);
      try {
        let response = await axios.get(searchEndpoint + username);
        let data = response.data;
        setUserData(data);
      } catch (err) {
        console.error(err);
      }
    } else setValidationStatus(false);
  };

  const handleChange = (e) => {
    setUsername(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") searchUser();
  };

  return (
    <div className="card">
      <h1>GitHub User Finder</h1>
      <p>Search a GitHub username to see profile details.</p>
      <div className="input">
        <input
          type="text"
          name="username"
          placeholder="e.g. torvalds, gaearon, octocat"
          value={username}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
        <button onClick={searchUser}>Search</button>
      </div>
      {validationStatus ? (
        userData.login ? (
          <div id="userData">
            <div id="imgDiv">
              <img src={userData.avatar_url} alt="Profile Picture" />
            </div>
            <div id="dataDiv">
              <div id="div1">
                <h2>{userData.name}</h2>
                <p>{`@` + userData.login}</p>
              </div>
              <div id="div2">
                <p>
                  <strong>{userData.public_repos + ` `}</strong>Repos
                </p>
                <p>
                  <strong>{userData.followers + ` `}</strong>Followers
                </p>
                <p>
                  <strong>{userData.following + ` `}</strong>Following
                </p>
              </div>
              <div id="div3">
                <p>{userData.location}</p>
                <p>{userData.company}</p>
                <p>
                  <a href={userData.blog}>Blog</a>
                </p>
                <p>
                  <a href={userData.url}>View on GitHub</a>
                </p>
              </div>
            </div>
          </div>
        ) : (
          <p>No user yet. Try searching for "octocat".</p>
        )
      ) : (
        <p id="errLine">Please enter a GitHub username.</p>
      )}
    </div>
  );
};
