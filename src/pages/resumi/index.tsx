import React, { useState } from 'react';
import axios from 'axios';
import Navbar from '../../components/navbar';
import rasm from '../../assets/images/riz.png';

interface Profile {
  network: string;
  url: string;
  username: string;
}

interface ResumeData {
  basics: {
    email: string;
    experience_year: number;
    image: string;
    job_location: string;
    job_type: string;
    label: string;
    location: {
      city: string;
      countryCode: string;
      region: string;
    };
    name: string;
    phone: string;
    profiles: Profile[];
    salary: number;
    summary: string;
    url: string;
  };
  certificates: {
    date: string;
    issuer: string;
    score: string;
    title: string;
    url: string;
  }[];
  education: {
    area: string;
    courses: string[];
    endDate: string;
    institution: string;
    location: string;
    score: string;
    startDate: string;
    studyType: string;
  }[];
  interests: {
    keywords: string[];
    name: string;
  }[];
  job_location: string;
  labels: {
    education: string;
    experiences: string;
    interests: string;
    languages: string;
    profile: string;
    projects: string;
    since: string;
    skills: string;
    softSkills: string;
  };
  languages: {
    fluency: string;
    language: string;
  }[];
  meta: {
    lang: string;
    template: string;
  };
  projects: {
    description: string;
    name: string;
    url: string;
  }[];
  salary: number;
  skills: {
    keywords: string[];
    level: string;
    name: string;
  }[];
  work: {
    company: string;
    contract_type: string;
    endDate: string;
    location: string;
    position: string;
    skills: string[];
    startDate: string;
    summary: string;
  }[];
}

const Resumi: React.FC = () => {
  let isLogin = localStorage.getItem("x-auth-token");



  const [resumeData, setResumeData] = useState<ResumeData>({
    basics: {
      email: "",
      experience_year: 0,
      image: "",
      job_location: "",
      job_type: "full-time",
      label: "",
      location: {
        city: "",
        countryCode: "",
        region: ""
      },
      name: "",
      phone: "",
      profiles: [
        { network: "", url: "", username: "" },
        { network: "", url: "", username: "" },
        { network: "", url: "", username: "" },
      ],
      salary: +"",
      summary: "",
      url: ""
    },
    certificates: [{
      date: "",
      issuer: "",
      score: "",
      title: "",
      url: ""
    }],
    education: [{
      area: "",
      courses: [""],
      endDate: "",
      institution: "",
      location: "",
      score: "",
      startDate: "",
      studyType: ""
    }],
    interests: [{
      keywords: [""],
      name: ""
    }],
    job_location: "offline",
    labels: {
      education: "",
      experiences: "",
      interests: "",
      languages: "",
      profile: "",
      projects: "",
      since: "",
      skills: "",
      softSkills: ""
    },
    languages: [{
      fluency: "",
      language: ""
    }],
    meta: {
      lang: "eng",
      template: "basic"
    },
    projects: [
      { description: "", name: "", url: "" },
      { description: "", name: "", url: "" },
      { description: "", name: "", url: "" },
    ],
    salary: +"",
    skills: [{ keywords: [""], level: "", name: "" }],
    work: [{
      company: "",
      contract_type: "",
      endDate: "",
      location: "",
      position: "",
      skills: [""]  ,
      startDate: "",
      summary: ""
    }]
  });



  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const path = name.split('.');
    let updatedResumeData = { ...resumeData };

    const updateField = (obj: any, pathArray: string[], value: any) => {
      if (pathArray.length === 1) {
        obj[pathArray[0]] = value;
      } else {
        const currentKey = pathArray[0];
        const remainingPath = pathArray.slice(1);

        if (!isNaN(Number(currentKey))) {
          const index = Number(currentKey);
          updateField(obj[index], remainingPath, value);
        } else {
          updateField(obj[currentKey], remainingPath, value);
        }
      }
    };

    updateField(updatedResumeData, path, value);
    setResumeData(updatedResumeData);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
   
    console.log(resumeData);
    
    try {
      const response = await axios.post('https://api.cvmaker.uz/v1/resume/generate-resume', resumeData,{
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${isLogin}`
        }
      });
      console.log('Resume generated:', response.data);
    } catch (error) {
      console.error('Error generating resume:', error);
    }
  };


  const [selectedTemplate, setSelectedTemplate] = useState('basic');

  const renderTemplate = () => {
    switch (selectedTemplate) {
      case 'classic':
        return <div >
          <div className='flex px-[20px] w-[700px]   items-center justify-between py-[10px]'>
           <div className="">
           <h1 className='text-2xl  font-bold text-black'>John32</h1>
              <h2 className='text-xl  font-bold text-black'>Frontend developer</h2>
              <p className='text-black w-[500px] '>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi obcaecati animi repudiandae eos consectetur error ipsum dolore repellendus quis accusamus porro, excepturi at amet quia! Voluptate ex architecto rem porro.</p>
              <ul  className='flex  gap-4  mt-4'>

             
              <li>email</li>
              <li>Link</li>
              <li>Git hub</li>
              <li>uzum.uz</li>
              <li>Parij</li>
              </ul>
          
           </div>
           
           <div className="">
           <img className='w-[100px] h-[100px] rounded-[50%] object-cover' src={rasm} alt="" />
           </div>
           
      </div>
      <div className="w-full h-[2px] bg-black"></div>
      <div className="py-[20px] px-[30px]   flex gap-4">

         <div className="">
           <h1 className='text-2xl  font-bold text-black'>Experiences</h1>
           <h1 className='text-lg  font-bold text-black'>Lorem ipsum dolor sit amet.</h1>
         <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quibusdam, et placeat! Dolorum adipisci qui, labore inventore laudantium perspiciatis velit quod consectetur dolore, libero eveniet, omnis officia. Beatae facilis similique optio.</p>




           <h1 className='text-lg  font-bold text-black'>Lorem ipsum dolor sit amet.</h1>
         <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quibusdam, et placeat! Dolorum adipisci qui, labore inventore laudantium perspiciatis velit quod consectetur dolore, libero eveniet, omnis officia. Beatae facilis similique optio.</p>




           <h1 className='text-lg  font-bold text-black'>Lorem ipsum dolor sit amet.</h1>
         <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quibusdam, et placeat! Dolorum adipisci qui, labore inventore laudantium perspiciatis velit quod consectetur dolore, libero eveniet, omnis officia. Beatae facilis similique optio.</p>
           </div>

           <div className="">


              <h1 className='text-xl  font-bold'>Education</h1>
         <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid nulla maiores sint facere veniam exercitationem, ex soluta! Repellendus, cupiditate doloribus?</p>
         <p className='py-[20px]'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid nulla maiores sint</p>

         <h1 className='text-xl  font-bold'>Certifications</h1>
         <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid nulla maiores sint</p>
         <h1 className='text-xl  font-bold'>Skills</h1>
         <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid nulla maiores sint</p>
         <h1 className='text-xl  font-bold'>Soft Skills</h1>
         <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid nulla maiores sint</p>
         <h1 className='text-xl  font-bold'>Languages</h1>
         <p>salom</p>
         <p>salom</p>
         <p>salom</p>

         <h1 className='text-xl  font-bold'>Hobbies</h1>
         <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid nulla maiores sint</p>
           </div>
      </div>


        </div>;
      case 'simple':
        return <div className='flex'>
          <div className="bg-slate-300 w-[200px] h-full mt-[20px]">
           <div className="py-[20px]">
          <div className="flex justify-center items-center">
          <img className='w-[100px] h-[100px] rounded-[50%] object-cover' src={rasm} alt="" />
          </div>

         <div className="px-[10px] ">
         <h1 className='text-xl  font-bold'>Contact</h1>
         <p>salom</p>
         <p>salom</p>
         <p>salom</p>
         <p>salom</p>
         <p>salom</p>
         <p>salom</p>

         <h1 className='text-xl  font-bold'>Education</h1>
         <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid nulla maiores sint facere veniam exercitationem, ex soluta! Repellendus, cupiditate doloribus?</p>
         <p className='py-[20px]'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid nulla maiores sint</p>

         <h1 className='text-xl  font-bold'>Certifications</h1>
         <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid nulla maiores sint</p>
         <h1 className='text-xl  font-bold'>Skills</h1>
         <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid nulla maiores sint</p>
         <h1 className='text-xl  font-bold'>Soft Skills</h1>
         <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid nulla maiores sint</p>
         <h1 className='text-xl  font-bold'>Languages</h1>
         <p>salom</p>
         <p>salom</p>
         <p>salom</p>

         <h1 className='text-xl  font-bold'>Hobbies</h1>
         <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid nulla maiores sint</p>

         </div>
           </div>
          </div>
          <div className="w-[500px] mt-[20px]">
           <div className="bg-slate-600 py-[20px] px-[30px]">
           <h1 className='text-2xl  font-bold text-white'>John32</h1>
              <h2 className='text-xl  font-bold text-white'>Frontend developer</h2>
              <p className='text-white'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi obcaecati animi repudiandae eos consectetur error ipsum dolore repellendus quis accusamus porro, excepturi at amet quia! Voluptate ex architecto rem porro.</p>
           </div>
           <div className="py-[20px] px-[30px]">
           <h1 className='text-2xl  font-bold text-black'>Experiences</h1>
           <h1 className='text-lg  font-bold text-black'>Lorem ipsum dolor sit amet.</h1>
         <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quibusdam, et placeat! Dolorum adipisci qui, labore inventore laudantium perspiciatis velit quod consectetur dolore, libero eveniet, omnis officia. Beatae facilis similique optio.</p>

         <h1 className='text-2xl  font-bold text-black'>Projects</h1>
         <h1 className='text-lg  font-bold text-black'>Lorem ipsum dolor sit amet.</h1>
         <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quia, in.</p>
           </div>
          </div>
        </div>;
      default:
        return <div className='flex'>
          <div className="bg-slate-300 w-[200px] h-full mt-[20px]">
           <div className="py-[20px]">
          <div className="flex justify-center items-center">
          <img className='w-[100px] h-[100px] rounded-[50%] object-cover' src={rasm} alt="" />
          </div>

         <div className="px-[10px] ">
         <h1 className='text-xl  font-bold'>Contact</h1>
         <p>salom</p>
         <p>salom</p>
         <p>salom</p>
         <p>salom</p>
         <p>salom</p>
         <p>salom</p>

         <h1 className='text-xl  font-bold'>Education</h1>
         <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid nulla maiores sint facere veniam exercitationem, ex soluta! Repellendus, cupiditate doloribus?</p>
         <p className='py-[20px]'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid nulla maiores sint</p>

         <h1 className='text-xl  font-bold'>Certifications</h1>
         <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid nulla maiores sint</p>
         <h1 className='text-xl  font-bold'>Skills</h1>
         <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid nulla maiores sint</p>
         <h1 className='text-xl  font-bold'>Soft Skills</h1>
         <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid nulla maiores sint</p>
         <h1 className='text-xl  font-bold'>Languages</h1>
         <p>salom</p>
         <p>salom</p>
         <p>salom</p>

         <h1 className='text-xl  font-bold'>Hobbies</h1>
         <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid nulla maiores sint</p>

         </div>
           </div>
          </div>
          <div className="w-[500px] mt-[20px]">
           <div className="bg-slate-600 py-[20px] px-[30px]">
           <h1 className='text-2xl  font-bold text-white'>John32</h1>
              <h2 className='text-xl  font-bold text-white'>Frontend developer</h2>
              <p className='text-white'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi obcaecati animi repudiandae eos consectetur error ipsum dolore repellendus quis accusamus porro, excepturi at amet quia! Voluptate ex architecto rem porro.</p>
           </div>
           <div className="py-[20px] px-[30px]">
           <h1 className='text-2xl  font-bold text-black'>Experiences</h1>
           <h1 className='text-lg  font-bold text-black'>Lorem ipsum dolor sit amet.</h1>
         <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quibusdam, et placeat! Dolorum adipisci qui, labore inventore laudantium perspiciatis velit quod consectetur dolore, libero eveniet, omnis officia. Beatae facilis similique optio.</p>

         <h1 className='text-2xl  font-bold text-black'>Projects</h1>
         <h1 className='text-lg  font-bold text-black'>Lorem ipsum dolor sit amet.</h1>
         <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quia, in.</p>
           </div>
          </div>
        </div>;
    }
  };
  return (
    <>
      <Navbar />

      <div className="hom min-h-screen">
        <div className="flex items-center justify-center overflow-auto h-full px-[60px] gap-[20px]">
          <div className="w-[500px] max-w-2xl bg-white shadow-lg rounded-lg p-8 mt-[22.5%] h-full overflow-auto   ">
            <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">Create Your Resume</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="text"
                  name="basics.email"
                  placeholder="Email"
                  value={resumeData.basics.email}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Experience Year</label>
                <input
                  type="number"
                  name="basics.experience_year"
                  placeholder="Experience Year"
                  value={resumeData.basics.experience_year}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Phone</label>
                <input
                  type="text"
                  name="basics.phone"
                  placeholder="Phone"
                  value={resumeData.basics.phone}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>



              <div>
                <label className="block text-sm font-medium text-gray-700">Salary</label>
                <input
                  type="text"
                  name="basics.salary"
                  placeholder="alary"
                  value={resumeData.basics.salary}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Profiles network</label>
                <input
                  type="text"
                  name="basics.profiles.0.network"
                  placeholder="Profiles network"
                  value={resumeData.basics.profiles[0].network}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Profiles url</label>
                <input
                  type="text"
                  name="basics.profiles.1.url"
                  placeholder="Profiles url"
                  value={resumeData.basics.profiles[1].url}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Profiles username</label>
                <input
                  type="text"
                  name="basics.profiles.2.username"
                  placeholder="Profiles username"
                  value={resumeData.basics.profiles[2].username}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-indigo-600 text-white p-2 rounded-md shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                Generate Resume
              </button>
            </form>
          </div>
          <div className="text-black  h-full overflow-auto  w-[700px] mt-[22.5%]  bg-white py-[40px]  rounded-lg">
          <div>
      <nav>
        <ul className='flex items-center gap-4 cursor-pointer'>
          <li onClick={() => setSelectedTemplate('basic')}>Basic</li>
          <li onClick={() => setSelectedTemplate('classic')}>Classic</li>
          <li onClick={() => setSelectedTemplate('simple')}>Simple</li>
        </ul>
      </nav>
      <hr />
      <div className=''>{renderTemplate()}</div>
    </div>
          </div>
        </div>
       
      </div>
    </>
  );
};

export default Resumi;
