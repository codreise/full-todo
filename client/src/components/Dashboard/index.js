import React, {useState, useEffect} from 'react';
import { authUser } from '../../api/userApi';
import { useNavigate } from 'react-router-dom';
import TodoPage from '../../pages/TodoPage';

const Dashboard = (props) => {
    const [todo, setTodos] = useState(false); // для того, щоб розуміти чи є в нас юзер чи ні
    const navigate = useNavigate();

    useEffect(() => {
        if(!props.user) {
            const token = localStorage.getItem('token');
            if(token) {
                // робимо запит на отримання юзера
                authUser(token)
                .then(userData => {
                    props.sendUser(userData.data);
                }).catch(error => {
                    return navigate('/');
                })
            } else {
                navigate('/');
            }
        } else {
            setTodos(true); // це значить, що юзер в нас є -> вантажимо для нього тудушки
        }
    }, [props.user])

    // якщо юзер є, то показуємо TodoPage
    return (
        <>
            {todo ? <TodoPage /> : null}
        </>
    );
}

export default Dashboard;