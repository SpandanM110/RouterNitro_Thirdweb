import React, { useState } from 'react';
import Gemini from 'gemini-pro'; // Ensure you have imported Gemini

const ChatPromptBox = () => {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');

  const handlePromptChange = (e) => {
    setPrompt(e.target.value);
  };

  const generateResponse = async () => {
    const gemini = new Gemini({
      apiKey: '', // Replace with your Gemini API key
      version: '1.5', // Ensure you are using Gemini 1.5 Pro
    });

    try {
      const result = await gemini.textGeneration({
        prompt: prompt,
        max_tokens: 150, // Adjust max_tokens based on your requirements
      });
      setResponse(result.data.choices[0].text);
    } catch (error) {
      console.error('Error generating response:', error);
      setResponse('Error: Failed to generate response.');
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-bold mb-4">ChatGPT-like Text Generation</h2>
      <div className="flex flex-col space-y-4">
        <textarea
          value={prompt}
          onChange={handlePromptChange}
          className="w-full h-40 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-400"
          placeholder="Enter your prompt here..."
        ></textarea>
        <button
          onClick={generateResponse}
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none"
        >
          Generate Response
        </button>
        {response && (
          <div className="border border-gray-200 p-3 rounded-md">
            <p className="text-gray-700">{response}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatPromptBox;
