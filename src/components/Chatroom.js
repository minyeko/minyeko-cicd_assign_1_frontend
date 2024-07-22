import React, {useEffect, useState} from 'react';
import axios from "axios";
import {BaseUrl} from "./constants";

function ChatRoom(props) {
    const [users, setUsers] = useState([])
    const [selectedUsers, setSelectedUsers] = useState({});
    useEffect(() => {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: BaseUrl + '/api/users/',
            headers: {
                'Authorization': `Token ${localStorage.getItem('token')}`
            }

        };

        axios.request(config)
            .then((response) => {
                console.log('User list ---------------------------');
                console.log(JSON.stringify(response.data));
                setUsers(response.data);
            })
            .catch((error) => {
                console.log('----------//-----------------');
                console.log(error);
            });


    }, []);

    function createChatroom() {

        let data = {
            name: document.getElementById('name').value,
            members: Object.keys(selectedUsers).filter((key) => selectedUsers[key])
        }
        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: BaseUrl + '/api/chatroom/',
            headers: {
                'Authorization': `Token ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            },
            data: data
        };
        axios.request(config)
            .then((response) => {
                console.log(JSON.stringify(response.data));
                alert('Created successfully');
            })
            .catch((error) => {
                console.log(error);
            });

    }

    function handleChange(e) {
        const { name, checked } = e.target;
        setSelectedUsers({ ...selectedUsers, [name]: checked });
    }

    return (
        <div>
            <h1>Chat Room</h1>
            <div>
                <label htmlFor="">Group name</label>
                <input type="text" id="name" placeholder="Enter group name"/>
            </div>
            <br/><br/>
            <div>
                <p>Select members:</p>
                {users.map((user) => (
                <div className="user-list" key={user.id}>
                    <input
                        type="checkbox"
                        name={user.id}
                        checked={selectedUsers[user.id] || false}
                        onChange={handleChange}
                    />
                    <label>{user.username}</label>
                </div>
                 ))}
            </div>
            <div>
                <h2>Selected Items:</h2>
                <ul>
                    {users
                        .filter((option) =>
                            selectedUsers[option.id])
                        .map((option) => (
                            <li key={option.id}>{option.username}</li>
                        ))}
                </ul>
            </div>
            <button onClick={createChatroom}>Create</button>

        </div>
    );
}

export default ChatRoom;