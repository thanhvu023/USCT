import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAllProgram, getProgramByUniId } from "../../redux/slice/programSlice";
import { Backdrop, CircularProgress } from "@mui/material";
import { getAllMajor, getMajorById } from "../../redux/slice/majorSlice";
import { getAllUniversity } from "../../redux/slice/universitySlice";

// const handleSliderChange = (event, setCurrentValue) => {
//   setCurrentValue(event.target.value);
// };

// const formatCurrency = (value) => {
//   return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
// };

function ProgramsPage() {
  // const [minPrice, setMinPrice] = useState(100000);
  // const [maxPrice, setMaxPrice] = useState(2000000);
  const [currentValue, setCurrentValue] = useState(100000);
  const [currentPage, setCurrentPage] = useState(1);
  const handleSliderChange = (event) => {
    setCurrentValue(event.target.value);
  };

  const formatCurrency = (value) => {
    return `${value / 1000}k$`; // Định dạng giá trị sang đơn vị $k
  };
  const progressLeft = ((currentValue - 100000) / (2000000 - 100000)) * 100;

  // const CategoryCheckboxList = ({ title, items }) => {
  //   const [selectedItems, setSelectedItems] = useState([]);

  //   const handleCheckboxChange = (item) => {
  //     if (selectedItems.includes(item)) {
  //       setSelectedItems(
  //         selectedItems.filter((selectedItem) => selectedItem !== item)
  //       );
  //     } else {
  //       setSelectedItems([...selectedItems, item]);
  //     }
  //   };
  //   return (
  //     <div className="widget widget_checkbox_list">
  //       <h4 className="widget-title">{title}</h4>
  //       {items.map((item, index) => (
  //         <label key={index} className="single-checkbox">
  //           <input
  //             type="checkbox"
  //             defaultChecked={item.defaultChecked}
  //             onChange={() => handleCheckboxChange(item.label)}
  //           />
  //           <span className="checkmark" />
  //           {item.label}
  //         </label>
  //       ))}
  //     </div>
  //   );
  // };

  // const categories = [
  //   {
  //     title: "Du học các bang",
  //     items: [
  //       { label: "California", link: "/blog-details/california" },
  //       { label: "New York", link: "/blog-details/new-york" },
  //       // Add more states as needed
  //     ],
  //   },
  //   {
  //     title: "Trường học",
  //     items: universities.map(university => ({
  //         label: university.universityId,
  //     })),
  // },
  //   {
  //     title: "Học bổng du học",
  //     items: [
  //       { label: "Học bổng Fulbright", link: "/scholarship/fulbright" },
  //       { label: "Học bổng Chevening", link: "/scholarship/chevening" },
  //       { label: "Học bổng Fulbright", link: "/scholarship/fulbright" },
  //       { label: "Học bổng Chevening", link: "/scholarship/chevening" },
  //       { label: "Học bổng Fulbright", link: "/scholarship/fulbright" },
  //       { label: "Học bổng Chevening", link: "/scholarship/chevening" },
  //       // Add more scholarships as needed
  //     ],
  //   },
  //   {
  //     title: "Chuyên ngành",
  //     items: [
  //       { label: "Khoa học máy tính", link: "/computer-science" },
  //       { label: "Kỹ thuật phần mềm", link: "/software-engineering" },
  //       { label: "Mạng máy tính", link: "/computer-networks" },
  //       { label: "Trí tuệ nhân tạo", link: "/artificial-intelligence" },
  //       { label: "An toàn thông tin", link: "/information-security" },

  //       // Add more majors as needed
  //     ],
  //   },
  // ];
  const truncateString = (str, num) => {
    if (str.length > num) {
      return str.slice(0, num) + "...";
    } else {
      return str;
    }
  };
  
  const [programName, setProgramName] = useState("");
  const handleInputChangeName = (event) => {
    setProgramName(event.target.value); // Update the program name state with the input value
  };
  const dispatch = useDispatch();
  const [majors, setMajors] = useState({});
  const universities = useSelector(state => state.university.universities);
  const [selectedUniversityId, setSelectedUniversityId] = useState([]);
  const programs = useSelector((state) => state?.program?.programs);

  const [expandedDescriptions, setExpandedDescriptions] = useState({});
  const toggleDescription = (programId) => {
    setExpandedDescriptions(prev => ({
        ...prev,
        [programId]: !prev[programId]
    }));
};
 

  const majorId = useSelector((state) => state?.program?.programById?.majorId);
  // const majorDetail = useSelector((state) => state?.major?.majorById);
console.log("programs",programs)

const [showMoreUniversities, setShowMoreUniversities] = useState(false);
const visibleUniversities = universities.slice(0, 10);
const additionalUniversities = universities.slice(10);
const toggleUniversitiesDisplay = () => {
  setShowMoreUniversities(prev => !prev);
};


  useEffect(() => {
    if (majorId) {
      dispatch(getMajorById(majorId));
    }
  }, [dispatch, majorId]);

  useEffect(() => {
    dispatch(getAllUniversity());
}, [dispatch]);

useEffect(() => {
  if (selectedUniversityId) {
    dispatch(getProgramByUniId(selectedUniversityId));
  }
}, [dispatch, selectedUniversityId]);
  useEffect(() => {
    dispatch(getAllMajor()).then((response) => {
      // Assuming response contains the list of all majors
      const majorMap = {};
      response.payload.forEach(major => {
        majorMap[major.majorId] = major.majorName;
      });
      setMajors(majorMap);
    });
  }, [dispatch]);


  
  useEffect(() => {
    dispatch(getAllProgram()); 
  }, [dispatch]);
  const loading = useSelector((state) => state?.program?.loading);

  // const token = useSelector((state) => state.auth?.token);
  useEffect(() => {
    dispatch(getAllProgram(programName)); 
  }, [dispatch, programName]);


  const [programsPerPage] = useState(8); 
  const indexOfLastProgram = currentPage * programsPerPage;
  const indexOfFirstProgram = indexOfLastProgram - programsPerPage;
  const currentPrograms = programs.slice(
    indexOfFirstProgram,
    indexOfLastProgram
  );
  const paginate = (pageNumber) => setCurrentPage(pageNumber);





  
  const filteredPrograms = currentPrograms
  .filter(program => program.status === "Active")
  .filter(program => selectedUniversityId.length === 0 || selectedUniversityId.includes(program.universityId));

  const handleCheckboxChange = (event, universityId) => {
    setSelectedUniversityId(prevIds => {
      if (prevIds.includes(universityId)) {
        return prevIds.filter(id => id !== universityId);
      } else {
        return [...prevIds, universityId];
      }
    });
  };

  return (
    <div className="blog-area pd-top-60 pd-bottom-60">
      <div className="container" >
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={loading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
        <div className="row" >
          <div className="col-lg-8 order-lg-12 m-0">
            <div className="row go-top" >
            {filteredPrograms.map((program, index) => {
                                  const universityName = universities.find(uni => uni.universityId === program.universityId)?.universityName || 'University not found';

 return (
                  <div
                    key={index}
                    className="col-md-6"
                  
                  >
                    <div className="single-course-inner" >
                    <div className="program-card">
                    <div className="thumb">
                      <img src={program.img} alt="Program Image" style={{ width: "100%",height: "150px",objectFit:'cover'}}/>
                      </div>
                      </div>
                      <div className="details">
                      <div className="details-inner">
    <div style={{height:'100px'}}>
      <h5 className="program-name" >
        <Link to={`/program-details/${program.programId}`}>
            {program.nameProgram}
        </Link>
    </h5>
    <h6 className="university-name">{universityName || 'University not found'}</h6>
    </div>
    <div className="program-description">
                                        <strong>Mô tả chương trình: </strong>
                                        <span onClick={() => toggleDescription(program.programId)}>
                                            {expandedDescriptions[program.programId] ? program.description : `${program.description.substring(0, 100)}...`}
                                        </span>
                                    </div>
</div>

                 
             
                  <div className="additional-details">
                        <p><i className="fa fa-laptop" /> <strong>Chuyên ngành chính:</strong> {majors[program.majorId]}</p>
                        <p><i className="fa fa-clipboard" /> <strong>Lộ trình học:</strong> {program.duration}</p>
                        <p><i className="fa fa-language" /> <strong>Trình độ đào tạo:</strong> {program.level}</p>
                        <p><i className="fa fa-calendar"/> <strong>Học kỳ:</strong> 7/15/2024 đến 9/9/2026</p>
                        <p><i className="fa fa-graduation-cap" /> <strong>Loại chương trình:</strong> Du học tự túc</p>
                       
                   </div>
              
                      </div>
                    </div>
                  </div>
 )
            })}
            </div>
            <nav className="td-page-navigation">
              <ul className="pagination">
                {Array(Math.ceil(programs.length / programsPerPage))
                  .fill()
                  .map((_, index) => (
                    <li key={index} className="page-item">
                      <button
                        onClick={() => paginate(index + 1)}
                        className="page-link"
                      >
                        {index + 1}
                      </button>
                    </li>
                  ))}
              </ul>
            </nav>

          </div>
          <div className="col-lg-4 order-lg-1 col-12">
            <div className="td-sidebar mt-5 mt-lg-0">
              <div className="widget widget_search_course">
                <h4 className="widget-title">Tìm kiếm chương trình</h4>
                <form className="search-form single-input-inner">
                  <input
                    type="text"
                    value={programName}
                    onChange={handleInputChangeName}
                    placeholder="Nhập chương trình cần tìm"
                  />
                  <button className="btn btn-base w-100 mt-3" type="submit">
                    <i className="fa fa-search" /> Tìm kiếm
                  </button>
                </form>
              </div>
              <div className="widget widget_catagory">
                <h4 className="widget-title">Thông tin du học</h4>
                <ul className="catagory-items go-top">
                <div className="widget widget_checkbox_list">
  <h4 className="widget-title">Trường học</h4>
  {visibleUniversities.map((university, index) => (
    <label key={index} className="single-checkbox">
      <input
        type="checkbox"
        checked={selectedUniversityId.includes(university.universityId)}
        onChange={(e) => handleCheckboxChange(e, university.universityId)}
      />
      <span className="checkmark" />
      {university.universityName}
    </label>
  ))}
  <button className="show-more-btn" onClick={toggleUniversitiesDisplay}>
    {showMoreUniversities ? "Show Less" : "Show More"}
  </button>
  {showMoreUniversities && additionalUniversities.map((university, index) => (
    <label key={index} className="single-checkbox">
      <input
        type="checkbox"
        checked={selectedUniversityId.includes(university.universityId)}
        onChange={(e) => handleCheckboxChange(e, university.universityId)}
      />
      <span className="checkmark" />
      {university.universityName}
    </label>
  ))}
</div>



                </ul>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProgramsPage;
