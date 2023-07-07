import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { preview } from "../assets";
import { getRandomPrompt } from "../utils";
import { FormFeild, Loader } from "../components";

const CreatePost = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    prompt: "",
    photo: "",
  });
  const [generateingImg, setgenerateingImg] = useState(false);
  const [loading, setloading] = useState(false);

  const generateImg = async () => {
    if (form.prompt)
      try {
        setgenerateingImg(true);
        const response = await fetch(
          "https://dalle-yo1f.onrender.com/api/v1/dalle",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ prompt: form.prompt }),
          }
        );

        const data = await response.json();

        setForm({ ...form, photo: `data:image/jpeg;base64,${data.photo}` });
      } catch (error) {
        alert(error);
      } finally {
        setgenerateingImg(false);
      }
    else {
      alert("please enter a prompt");
    }
  };
  const handleSubmit = () => {};
  const handleChange = (e) => {
    console.log(e.target.name);
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSurpiseMe = () => {
    const randomPrompt = getRandomPrompt(form.prompt);
    setForm({ ...form, prompt: randomPrompt });
  };
  useEffect(() => {
    console.log(form);
  }, [form]);

  return (
    <section className="max-w-7xl mx-auto">
      <div>
        <h1 className="font-extrabold text-black text-[32px]">Create</h1>
        <p className="mt-2 text-[#666e75] text-[14px] max-w[500px]">
          Create images generated by DALL-E
        </p>
      </div>
      <form className="mt-16 max-w-3xl" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-5">
          <FormFeild
            labelName="your name"
            type="text"
            name="name"
            placeholder="Jphn Doe"
            value={form.name}
            handleChange={handleChange}
          />
          <FormFeild
            labelName="Prompt"
            type="text"
            name="prompt"
            placeholder="An Impressionist oil painting of sunflowers in a purple vase…"
            value={form.prompt}
            handleChange={handleChange}
            isSurpriseMe
            handleSurpiseMe={handleSurpiseMe}
          />
          <div className="relative bg-gray-50 border border-gray-300 text-gray-900  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-64 p-3 h-64 flex justify-center items-center">
            {form.photo ? (
              <img
                src={form.photo}
                alt={form.prompt}
                className="w-full h-full object-contain"
              />
            ) : (
              <img
                src={preview}
                alt="preiveiw"
                className="w-9/12 object-contain opacity-40"
              />
            )}

            {generateingImg && (
              <div className="absolute inset-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)] rounded-lg">
                <Loader />
              </div>
            )}
          </div>
        </div>
        <div className="mt-5 flex gap-5">
          <button
            type="button"
            onClick={generateImg}
            className="text-white bg-green-700 font-medium rounded-lg text-sm w-full  sm:w-64 px-5 py-2.5 text-center">
            {generateingImg ? "generating" : "generate"}
          </button>
        </div>
        <div className="mt-10"></div>
      </form>
    </section>
  );
};

export default CreatePost;
