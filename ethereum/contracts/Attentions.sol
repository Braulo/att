// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Attentions {
  address public immutable owner;

  struct UserText {
    uint id;
    string value;
    uint256 upvotes;
    uint256 downvotes;
    bool entered;
    address user;
  }

  struct Winner{
    address user;
    string value;
  }

  event TextAdded(
    uint id,
    string value
  );

  event Upvote(
    uint upvotes,
    uint id
  );

  event Downvote(
    uint downvotes,
    uint id
  );

  Winner[] public pastWinners;
  address[] public allUsers;

  Winner public winner;

  bool public firstText = true;
  uint256 public time;
  uint private id;

  mapping(address => UserText) public UserEntries;

  constructor() {
    owner = msg.sender;
  }

  function getAllUsers() external view returns(address[] memory){
    return allUsers;
  }

  function getAllPastWinners() external view returns(Winner[] memory){
    return pastWinners;
  }

  function addTextToAddress(string memory text) public {
    require(UserEntries[msg.sender].entered == false, 'Address has already entered a Text');
    id += 1;
    UserEntries[msg.sender] = UserText(id, text, 0, 0, true, msg.sender);
    allUsers.push(msg.sender);

    if (firstText) {
      winner = Winner(msg.sender, text);
      firstText = false;
      time = block.timestamp;
    }
    
    emit TextAdded(id, text);
  }

  function upvote(address user) public {
    UserEntries[user].upvotes++;
    // User who got an upvote who has more Upvotes than the current winner
    if (UserEntries[user].upvotes > UserEntries[winner.user].upvotes) {
      winner = Winner(user, UserEntries[user].value);
    }

    emit Upvote(UserEntries[user].upvotes, UserEntries[user].id);
  }

  function downvote(address user) public {
    UserEntries[user].downvotes++;
    emit Downvote(UserEntries[user].downvotes, UserEntries[user].id);
  }

  function endMatch() public {
    // Todo => reinballern
    // require(time + 1 minutes <= block.timestamp);
    pastWinners.push(winner);
    reset();
  }

  function reset() private {
    firstText = true;
    time = block.timestamp;
    for (uint256 i = 0; i < allUsers.length; i++) {
      delete UserEntries[allUsers[i]];
    }

    allUsers = new address[](0);
  }
}
