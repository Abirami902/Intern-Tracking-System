import React, { useState, useEffect } from 'react';
import { Button, Table } from 'react-bootstrap';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const InternQuestion = () => {
  const [questionDetails, setQuestionDetails] = useState({});
  const [answer, setAnswer] = useState('');
  const { id } = useParams();

  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/viewquestion/viewquestion/${id}`);
        console.log(response.data);
        
        setQuestionDetails(response.data);
      } catch (error) {
        console.error('Error fetching question:', error);
      }
    };

    fetchQuestion();
  }, [id]);

  const handleSendAnswer = async () => {
    try {
      const response = await axios.post(`http://localhost:4000/sendanswer/sendanswer/${id}`, {
        internId: id,
        answer,
        question: questionDetails.question // Include the question here
      });
      console.log('Answer sent:', response.data);
      setAnswer('');
    } catch (error) {
      console.error('Error sending answer:', error);
    }
  };

  return (
    <div className='mx-auto mt-5'>
      <h2>Question Details</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Field</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Question</td>
            <td>{questionDetails.question}</td>
          </tr>
          <tr>
            <td>Deadline</td>
            <td>{new Date(questionDetails.deadline).toLocaleDateString()}</td>
          </tr>
          <tr>
            <td>Document</td>
            <td>
              <a href={`/${questionDetails.documentPath}`} target="_blank" rel="noopener noreferrer">
                View Document
              </a>
            </td>
          </tr>
          <tr>
            <td>Link</td>
            <td>
              <a href={questionDetails.link} target="_blank" rel="noopener noreferrer">
                {questionDetails.link}
              </a>
            </td>
          </tr>
        </tbody>
      </Table>
      <textarea
        rows="4"
        cols="50"
        placeholder="Enter your answer here..."
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
      ></textarea>
      <br />
      <button onClick={handleSendAnswer} className='bg-primary rounded-1'>Send Answer</button>
    
    </div>
  );
}

export default InternQuestion;
