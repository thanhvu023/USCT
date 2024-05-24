import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import {
  Backdrop,
  CircularProgress,
  Grid,
  Paper,
  Typography,
  Pagination,
  Autocomplete,
  TextField,
} from "@mui/material";
import {
  getAllUniversity,
  getUniversityByTypeId,
  filterUniversitiesByStates,
  getAllUniversityType,
} from "../../redux/slice/universitySlice";
import { getAllState } from "../../redux/slice/stateSlice";

function UniversityPage() {
  const dispatch = useDispatch();
  const { typeId } = useParams();

  const [universityName, setUniversityName] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedType, setExpandedType] = useState(null);
  const [selectedStates, setSelectedStates] = useState([]);
  const [filteredUniversities, setFilteredUniversities] = useState([]);

  const universitiesPerPage = 6;
  const universityTypes = useSelector(
    (state) => state.university.universityTypes
  );
  const universities = useSelector((state) => state.university.universities);
  const states = useSelector((state) => state.state.states);
  const loading = useSelector((state) => state.university.loading);

  useEffect(() => {
    dispatch(getAllUniversity(universityName));
    dispatch(getAllUniversityType());
    dispatch(getAllState());
    if (typeId) {
      dispatch(getUniversityByTypeId(typeId));
    }
  }, [dispatch, universityName, typeId]);

  const handleInputChangeName = (event) => {
    setUniversityName(event.target.value);
  };

  const indexOfLastUniversity = currentPage * universitiesPerPage;
  const indexOfFirstUniversity = indexOfLastUniversity - universitiesPerPage;
  const currentUniversities = universities.slice(
    indexOfFirstUniversity,
    indexOfLastUniversity
  );
  const filteredCurrentUniversities = filteredUniversities.slice(
    indexOfFirstUniversity,
    indexOfLastUniversity
  );

  const handleChangePage = (event, value) => {
    setCurrentPage(value);
  };

  const handleTypeClick = (typeId) => {
    if (expandedType === typeId) {
      setExpandedType(null);
    } else {
      setExpandedType(typeId);
      dispatch(getUniversityByTypeId(typeId));
    }
  };

  const handleStateChange = (event, value) => {
    setSelectedStates(value);
    const selectedStateIds = value.map((state) => state.stateId);
    if (selectedStateIds.length > 0) {
      const filtered = universities.filter((university) =>
        selectedStateIds.includes(university.stateId)
      );
      setFilteredUniversities(filtered);
    } else {
      setFilteredUniversities(universities);
    }
  };

  const universitiesToDisplay =
    selectedStates.length > 0 ? filteredUniversities : currentUniversities;

    return (
      <div style={{ padding: "24px" ,backgroundColor:'#F1F7FF'}}>
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={loading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
        <Grid container spacing={4} style={{}}>
        <Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Paper elevation={3} sx={{ padding: "16px" }}>
              <Typography variant="h5" align="center" gutterBottom>
Tìm kiếm theo tên
              </Typography>
                <div className="widget widget_search">
                  <form className="search-form">
                    <div className="form-group">
                      <input
                        type="text"
                        placeholder="Tên trường đại học"
                        onChange={handleInputChangeName}
                        value={universityName}
                      />
                    </div>
                    <button className="submit-btn" type="submit">
                      <i className="fa fa-search" />
                    </button>
                  </form>
                </div>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6}>
            <Paper elevation={3} sx={{ padding: "16px" }}>
            <Typography variant="h5" align="center" gutterBottom>
               Tìm kiếm theo Bang
              </Typography>
                <div className="widget widget_search">
                <Autocomplete
                multiple
                options={states}
                getOptionLabel={(option) => option.stateName}
                value={selectedStates}
                onChange={handleStateChange}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="outlined"
                    label="Tìm kiếm theo bang"
                    placeholder="Chọn bang"
                  />
                )}
                sx={{ marginBottom: 2 }}
              />
                </div>
              </Paper>
           
            </Grid>
          </Grid>
        </Grid>
  
          <Grid item xs={12} sm={3}>
            <Paper elevation={3} sx={{ padding: "16px" }}>
              <Typography variant="h5" align="center" gutterBottom>
                Loại Trường
              </Typography>
              <div className="widget widget_catagory">
                <ul className="catagory-items go-top">
                  {universityTypes.map((type) => (
                    <li key={type.universityTypeId}>
                      <Link to="#" onClick={() => handleTypeClick(type.universityTypeId)}>
                        {type.typeName} <i className="fa fa-caret-right" />
                      </Link>
                      {expandedType === type.universityTypeId && (
                        <ul style={{ paddingLeft: "20px" }}>
                          {universities
                            .filter(
                              (university) =>
                                university.universityTypeId === type.universityTypeId
                            )
                            .map((university) => (
                              <li key={university.universityId} style={{ marginTop: "12px" }}>
                                <Link to={`/university-details/${university.universityId}`}>
                                  {university.universityName}
                                </Link>
                              </li>
                            ))}
                        </ul>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </Paper>
          
          </Grid>
  
          <Grid item xs={12} sm={9}>
            <Grid container spacing={4}>
              {universitiesToDisplay.map((university, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Paper elevation={3} sx={{ padding: "16px", height: "100%", backgroundColor:'#F5F6F8' }}>
                  <div className="single-course-inner" >

                  <div className="thumb">
                    <img
                      src={university.img}
                      style={{ width: "100%", height: "200px", objectFit: "cover" }}
                    />
                    </div>
                    <div className="details">
                      <div className="details-inner" style={{height:'209px'}}> 
                    <Typography variant="h6" gutterBottom>
                      {university.universityName}
                    </Typography>
                    <Typography variant="body2" gutterBottom style={{height:'60px'}}>
                      {university.slogan}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" gutterBottom>
                      <a
                        href={university.website}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {university.website}
                      </a>
                    </Typography>
                    <Link
                      className="read-more-text"
                      to={`/university-details/${university.universityId}`}
                    >
                      Thông tin về trường <i className="fa fa-angle-right" />
                    </Link>
                    </div>
                      </div>
                    </div>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Grid>
  
          <Grid item xs={12} justifyContent="center" display="flex">
            <Pagination
              count={Math.ceil(
                (selectedStates.length === 0
                  ? universities.length
                  : filteredUniversities.length) / universitiesPerPage
              )}
              page={currentPage}
              onChange={handleChangePage}
              color="primary"
            />
          </Grid>
        </Grid>
      </div>
    );
}

export default UniversityPage;
