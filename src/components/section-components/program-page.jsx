import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAllProgram } from "../../redux/slice/programSlice";
import { Backdrop, CircularProgress } from "@mui/material";
import { getAllMajor } from "../../redux/slice/majorSlice";
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
  // const [filteredPrograms, setFilteredPrograms] = useState([]);

  const formatCurrency = (value) => {
    return `${value / 1000}k$`; // Định dạng giá trị sang đơn vị $k
  };
  const progressLeft = ((currentValue - 100000) / (2000000 - 100000)) * 100;

  const CategoryCheckboxList = ({ title, items }) => {
    const [selectedItems, setSelectedItems] = useState([]);

    const handleCheckboxChange = (item) => {
      if (selectedItems?.includes(item)) {
        setSelectedItems(
          selectedItems.filter((selectedItem) => selectedItem !== item)
        );
      } else {
        setSelectedItems([...selectedItems, item]);
      }
    };
    return (
      <div className="widget widget_checkbox_list">
        <h4 className="widget-title">{title}</h4>
        {items?.map((item, index) => (
          <label key={index} className="single-checkbox">
            <input
              type="checkbox"
              defaultChecked={item.defaultChecked}
              onChange={() => handleCheckboxChange(item.label)}
            />
            <span className="checkmark" />
            {item.label}
          </label>
        ))}
      </div>
    );
  };

  const categories = [
    {
      title: "Du học các bang",
      items: [
        { label: "California", link: "/blog-details/california" },
        { label: "New York", link: "/blog-details/new-york" },
        // Add more states as needed
      ],
    },
    {
      title: "Trường học",
      items: [
        { label: "Đại học Harvard", link: "/instructor-details/harvard" },
        { label: "Đại học Stanford", link: "/instructor-details/stanford" },
        // Add more universities as needed
      ],
    },
    {
      title: "Học bổng du học",
      items: [
        { label: "Học bổng Fulbright", link: "/scholarship/fulbright" },
        { label: "Học bổng Chevening", link: "/scholarship/chevening" },
        { label: "Học bổng Fulbright", link: "/scholarship/fulbright" },
        { label: "Học bổng Chevening", link: "/scholarship/chevening" },
        { label: "Học bổng Fulbright", link: "/scholarship/fulbright" },
        { label: "Học bổng Chevening", link: "/scholarship/chevening" },
        // Add more scholarships as needed
      ],
    },
    {
      title: "Chuyên ngành",
      items: [
        { label: "Khoa học máy tính", link: "/computer-science" },
        { label: "Kỹ thuật phần mềm", link: "/software-engineering" },
        { label: "Mạng máy tính", link: "/computer-networks" },
        { label: "Trí tuệ nhân tạo", link: "/artificial-intelligence" },
        { label: "An toàn thông tin", link: "/information-security" },

        // Add more majors as needed
      ],
    },
  ];
  const [programName, setProgramName] = useState("");
  const handleInputChangeName = (event) => {
    setProgramName(event.target.value); // Update the program name state with the input value
  };
  const dispatch = useDispatch();
  const programs = useSelector((state) => state?.program?.programs);

  const majors = useSelector((state)=> state.major.allMajor)
  const loading = useSelector((state) => state?.program?.loading);
  // const token = useSelector((state) => state.auth?.token);
  const [selectedMajors, setSelectedMajors] = useState([]);
  console.log("majors",majors)
  useEffect(() => {
    dispatch(getAllProgram(programName)); // Dispatch action with program name
  }, [dispatch, programName]);
  useEffect(() => {
    dispatch(getAllMajor(programName)); // Dispatch action with program name
  }, [dispatch, programName]);
  const [programsPerPage] = useState(8); // Number of programs to display per page
  const indexOfLastProgram = currentPage * programsPerPage;
  const indexOfFirstProgram = indexOfLastProgram - programsPerPage;
  const currentPrograms = programs.slice(
    indexOfFirstProgram,
    indexOfLastProgram
  );
  const handleMajorSelection = (majorId) => {
    setSelectedMajors(prev => {
      if (prev.includes(majorId)) {
        return prev.filter(mId => mId !== majorId);
      } else {
        return [...prev, majorId];
      }
    });
  };
  const filteredPrograms = programs.filter(program =>
    selectedMajors.length === 0 || selectedMajors.includes(program.majorId)
  );
  const majorOptions = majors?.map(major => ({
    id: major.majorId,
    name: major.majorName
  }));
  const [filters, setFilters] = useState({});
  useEffect(() => {
    const newFilters = {
      majors: new Set(),
      universities: new Set(),
      levels: new Set()
    };
    programs.forEach(program => {
      if (program.majorId) newFilters.majors.add(program.majorName);
      if (program.university?.universityName) newFilters.universities.add(program.university.universityName);
      if (program.level) newFilters.levels.add(program.level);
    });
    setFilters({
      majors: Array.from(newFilters.majors),
      universities: Array.from(newFilters.universities),
      levels: Array.from(newFilters.levels)
    });
  }, [programs]);

  const [selectedFilters, setSelectedFilters] = useState({
    majors: [],
    universities: [],
    levels: []
  }); 
  
  const handleCheckboxChange = (category, value) => {
    setSelectedFilters(prev => ({
        ...prev,
        [category]: prev[category] ? toggleItemInArray(prev[category], value) : [value]
    }));
};

function toggleItemInArray(array, item) {
    const index = array.indexOf(item);
    if (index > -1) {
        // Item exists, remove it
        return array.filter(i => i !== item);
    } else {
        // Item does not exist, add it
        return [...array, item];
    }
}

  const renderCheckboxList = (title, items) => (

    <div className="widget widget_checkbox_list">
      <h4 className="widget-title">{title}</h4>
      {items?.map((item, index) => (
        <label key={index} className="single-checkbox">
          <input type="checkbox" onChange={() => handleCheckboxChange(title.toLowerCase(), item)} />
          <span className="checkmark" />
          {item}
        </label>
      ))}
    </div>
  );
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  return (
    <div className="blog-area pd-top-60 pd-bottom-60">
      <div className="container">
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={loading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
        <div className="row">
          <div className="col-lg-8 order-lg-12 m-0">
            <div className="row go-top">
              {currentPrograms
                .filter((program) => program.status === "Active") // Filter programs with active status
                ?.map((program, index) => (
                  <div
                    key={index}
                    className="col-md-6"
                    style={{ height: "381px" }}
                  >
                    <div className="single-course-inner">
                      <div className="thumb">
                        <img src={program.img} alt="img" />
                      </div>
                      <div className="details">
                        <div className="details-inner">
                          <h6>
                            <Link to={`/program-details/${program.programId}`}>
                              {program.nameProgram}
                            </Link>
                          </h6>
                        </div>
                        <div className="emt-course-meta">
                          <div className="row">
                            <div className="col-6">
                              <div className="rating">
                                <span>Lộ trình: {program.duration}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
            <nav className="td-page-navigation">
              <ul className="pagination">
                {Array(Math.ceil(programs.length / programsPerPage))
                  .fill()
                  ?.map((_, index) => (
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
            {/* <nav className="td-page-navigation">
              <ul className="pagination">
                <li className="pagination-arrow">
                  <Link to="#">
                    <i className="fa fa-angle-double-left" />
                  </Link>
                </li>
                <li>
                  <Link to="#">1</Link>
                </li>
                <li>
                  <Link className="active" to="#">
                    2
                  </Link>
                </li>
                <li>
                  <Link to="#">...</Link>
                </li>
                <li>
                  <Link to="#">3</Link>
                </li>
                <li className="pagination-arrow">
                  <Link to="#">
                    <i className="fa fa-angle-double-right" />
                  </Link>
                </li>
              </ul>
            </nav> */}
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
                <div className="td-sidebar mt-5 mt-lg-0">
                <div className="td-sidebar mt-5 mt-lg-0">
        <h4 className="widget-title">Chuyên ngành</h4>
        {majorOptions?.map(major => (
          <label key={major.id} className="single-checkbox">
            <input
              type="checkbox"
              checked={selectedMajors.includes(major.id)}
              onChange={() => handleMajorSelection(major.id)}
            />
            <span className="checkmark" />
            {major.name}
          </label>
        ))}
      </div>
              {filters.universities && renderCheckboxList("Trường đại học", filters.universities)}
              {filters.levels && renderCheckboxList("Trình độ", filters.levels)}
            </div>
                </ul>
              </div>
              <div className="widget widget_checkbox_list">
                <h4 className="widget-title">Trình độ Tiếng Anh</h4>
                <label className="single-checkbox">
                  <input type="checkbox" defaultChecked="checked" />
                  <span className="checkmark" />
                  TOEFL
                </label>
                <label className="single-checkbox">
                  <input type="checkbox" />
                  <span className="checkmark" />
                  IELTS
                </label>
                <label className="single-checkbox">
                  <input type="checkbox" />
                  <span className="checkmark" />
                  GMAT
                </label>
                <label className="single-checkbox">
                  <input type="checkbox" />
                  <span className="checkmark" />
                  SAT
                </label>
                <label className="single-checkbox">
                  <input type="checkbox" />
                  <span className="checkmark" />
                  GRE
                </label>
              </div>
              <div className="widget widget_price" style={{ width: "70%" }}>
                <h4 className="widget-title">Chi Phí Du Học</h4>
                <input
                  type="range"
                  min="100000"
                  max="2000000"
                  value={currentValue}
                  className="custom-range"
                  onChange={handleSliderChange}
                  style={{
                    width: "100%",
                    height: "25px",
                    background: "#ddd",
                    outline: "none",
                    opacity: "0.7",
                    transition: "opacity .2s",
                    position: "relative",
                    backgroundColor: "#007bff",
                    border: "2px solid #007bff",
                  }}
                />
                <div className="d-flex justify-content-between">
                  <span style={{ fontWeight: "bold" }}>$100k</span>
                  <span
                    style={{
                      fontWeight: "bold",
                      fontSize: "1.2rem",
                      color: "#007bff",
                      background: "rgba(0,0,0,0.1)",
                      padding: "10px",
                      borderRadius: "5px",
                      boxShadow: "0 0 5px rgba(0,0,0,0.2)",
                    }}
                  >
                    {formatCurrency(currentValue)}
                  </span>
                  <span style={{ fontWeight: "bold" }}>$2M</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProgramsPage;
