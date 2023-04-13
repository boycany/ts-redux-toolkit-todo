import "./App.css";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "./hooks";
import { addTodo, addTimeStamp } from "./slices/todo";
import { useState, useEffect } from "react";
import { useGetTodoListQuery, useGetPostListQuery } from "./services/todoApi";

const Wrapper = styled.div`
    text-align: center;
    padding: 1.5rem;

    @media screen and (min-width: 768px) {
        margin: 0 auto;
        width: 50%;
    }
`;
const Title = styled.h2`
    font-weight: 900;
    margin-top: 2rem;
`;

const NoteInput = styled.input`
    width: 100%;
    height: 40px;
    border-radius: 10px;
    padding-left: 0.5rem;
    box-sizing: border-box;
`;

const SubmitBtn = styled.button`
    width: 100%;
    height: 40px;
    box-sizing: border-box;
    background: #000;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    border-radius: 10px;
    border: 0;
    font-weight: 900;
    margin-top: 1rem;

    :active {
        background: #000000be;
    }
`;

const Item = styled.div`
    margin-top: 1rem;

    > b {
        margin-right: 0.5rem;
    }
`;

function App() {
    const todoReducer = useAppSelector((state) => state.todoReducer);
    const todoList = todoReducer.todoList;

    const [text, setText] = useState("");

    const dispatch = useAppDispatch();

    const { data, error, isLoading } = useGetTodoListQuery('1');
    // console.log('data :>> ', data);
    // console.log('error :>> ', error);
    // console.log('isLoading :>> ', isLoading);

    const { userId = 'N/A', title = 'N/A' } = data || {};

    return (
        <Wrapper>
            <Title>TO DO LIST</Title>
            <NoteInput
                type="text"
                placeholder="Add a note"
                value={text}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setText(e.target.value);
                }}
            />
            <SubmitBtn
                onClick={() => {
                    if (text === "") {
                        alert("Please enter a note");
                        return;
                    }
                    dispatch(addTodo(text));
                    setText("");
                }}
            >
                Submit
            </SubmitBtn>
            <SubmitBtn
                onClick={() => {
                    dispatch(addTimeStamp(Date.now().toString()));
                }}
            >
                Record Timestamp
            </SubmitBtn>
            <Title>List</Title>
            {todoList.map((data, index) => {
                return (
                    <Item key={data + index}>
                        <b>{index + 1}.</b>
                        {data}
                    </Item>
                );
            })}
            <Title>Fetch Api List</Title>
            { isLoading && <p>Loading...</p> }
            { !isLoading && 
                <div>
                    <p>USER ID: {data?.userId}</p>
                    <p>TITLE: {data?.title}</p>
                </div>
            }
        </Wrapper>
    );
}

export default App;
