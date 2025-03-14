import React from "react";
import useApiKeyStore from "../store/useApiKeyStore";

const ApiKeyInput: React.FC = () => {
  const { apiKey, setApiKey } = useApiKeyStore();

  return (
    <div className="p-4 border rounded-lg shadow-md bg-gray-100">
      <p className="text-gray-700 font-semibold">
        <span className="text-red-500">⚠ Notice:</span> If you encounter an API
        limit error, please sign up at{" "}
        <a
          href="https://docs.makcorps.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 underline"
        >
          Makcorps API Docs
        </a>{" "}
        and generate a new API key.
      </p>
      <label htmlFor="apiKey" className="block mt-2 text-gray-600 font-medium">
        Enter your API Key:
      </label>
      <input
        type="text"
        id="apiKey"
        value={apiKey}
        onChange={(e) => setApiKey(e.target.value)}
        placeholder="Paste your API key here..."
        className="mt-2 w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
    </div>
  );
};

export default ApiKeyInput;
