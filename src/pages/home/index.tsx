import Navbar from "../../components/navbar";
import axios from "../../api";
import { useEffect, useState } from "react";

interface Resume {
  id: number;
  job_title: string;
  city: string;
  salary: number;
  job_location: string;
  experiance_year: number;
}

interface HomeProps {
    setSearch: (search: string) => void;
    search: string;
  }

const Home: React.FC<HomeProps> = ({ setSearch, search }) => {
  const [resumes, setResumes] = useState<Resume[]>([]);

  useEffect(() => {
    const fetchResumes = async () => {
      try {
        const response = await axios.get('/resume/list?limit=80&page=1');
        setResumes(response.data.resumes);
      } catch (error) {
        console.error('Error fetching resumes:', error);
      }
    };

    fetchResumes();
  }, []);

  const filteredResumes = resumes.filter(resume => 
    resume.salary.toString().toLowerCase().includes(search.toLowerCase()) ||
    resume.job_title.toLowerCase().includes(search.toLowerCase()) ||
    resume.city.toLowerCase().includes(search.toLowerCase()) ||
    resume.job_location.toLowerCase().includes(search.toLowerCase())
    
  );

  // const handelDelete =(id:any) =>{
  //   axios
  //   .delete(`/resumes/{id}?id=${id}`)
  //   .then((response) => {
  //      console.log(response);
  //    })
  //    .catch((error) => {
  //      console.error('Error deleting resume:', error);
  //    });
  // }

  return (
    <div className='hom'>
      <Navbar setSearch={setSearch} search={search} />
      <div className="overflow-auto h-full">
        <div className="container">
          <div className="flex justify-center items-center mt-[150px] py-[20px]">
            <div className="w-[1000px] py-[20px] bg-white px-[20px] rounded-md">
              <div className="flex items-center justify-center gap-4 flex-wrap">
                {filteredResumes.map((resume) => (
                  <div key={resume.id} className="w-[200px] py-[20px] shadow-xl px-[20px] rounded-md cursor-pointer transition-all  hover:scale-[1.03]">
                    <p>Job Title: {resume.job_title}</p>
                    <p>City: {resume.city}</p>
                    <p>Salary: {resume.salary}</p>
                    <p>Job Location: {resume.job_location}</p>
                    <p>Experience Year: {resume.experiance_year}</p>
                    {/* <button onClick={() =>handelDelete(resume.id)} className="bg-red-600 px-[10px] text-white rounded-sm">delet</button> */}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
